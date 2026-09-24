"use server";

import { createClient, createAdminClient } from "@/lib/supabase/server";
import { sendLeadNotificationEmail } from "@/lib/mail";

export interface LeadSubmissionInput {
  service: string;
  fullName: string;
  phone: string;
  email?: string;
  city?: string;
  preferredContact?: string;
  message?: string;
  kvkkConsent: boolean;
  marketingConsent?: boolean;
}

export interface LeadRecord {
  id: string;
  created_at: string;
  service: string;
  full_name: string;
  phone: string;
  email: string | null;
  city: string | null;
  preferred_contact: string;
  message: string | null;
  status: "Yeni" | "İletişime Geçildi" | "Görüşme Yapıldı" | "Tamamlandı" | "Uygun Değil";
  admin_note: string | null;
}

export async function submitLeadAction(data: LeadSubmissionInput) {
  // 1. Validation
  if (!data.fullName || data.fullName.trim().length < 3) {
    return { success: false, error: "Lütfen geçerli bir ad soyad giriniz." };
  }

  const cleanPhone = data.phone.replace(/\D/g, "");
  if (cleanPhone.length < 10) {
    return { success: false, error: "Lütfen geçerli bir telefon numarası giriniz." };
  }

  if (!data.service) {
    return { success: false, error: "Lütfen ilgilendiğiniz hizmeti seçiniz." };
  }

  if (!data.kvkkConsent) {
    return { success: false, error: "Lütfen KVKK Aydınlatma Metni'ni onaylayınız." };
  }

  try {
    let supabaseSaved = false;

    // 2. Try inserting into Supabase (Admin client preferred to bypass RLS, fallback to regular client)
    try {
      const supabaseAdmin = createAdminClient();
      const supabaseClient = await createClient();
      const client = supabaseAdmin || supabaseClient;

      if (client) {
        const { error } = await client.from("leads").insert([
          {
            service: data.service,
            full_name: data.fullName.trim(),
            phone: data.phone.trim(),
            email: data.email?.trim() || null,
            city: data.city?.trim() || null,
            preferred_contact: data.preferredContact || "WhatsApp",
            message: data.message?.trim() || null,
            status: "Yeni",
            admin_note: null,
          },
        ]);

        if (!error) {
          supabaseSaved = true;
        } else {
          console.warn("[Supabase Insert Warning]", error.message);
        }
      }
    } catch (dbErr) {
      console.warn("[Database Connection Warning]", dbErr);
    }

    // 3. Send Notification Email
    try {
      await sendLeadNotificationEmail({
        service: data.service,
        fullName: data.fullName.trim(),
        phone: data.phone.trim(),
        email: data.email?.trim(),
        city: data.city?.trim(),
        preferredContact: data.preferredContact,
        message: data.message?.trim(),
      });
    } catch (mailErr) {
      console.warn("[Mail Dispatch Warning]", mailErr);
    }

    return {
      success: true,
      message: "Talebiniz başarıyla alındı. Uzman danışmanımız en kısa sürede sizinle iletişime geçecektir.",
      savedToDb: supabaseSaved,
    };
  } catch (error: any) {
    console.error("[Submit Lead Error]", error);
    return {
      success: false,
      error: "Talebiniz işlenirken beklenmedik bir durum oluştu. Dilerseniz WhatsApp veya telefon ile doğrudan bize ulaşabilirsiniz.",
    };
  }
}

// Fetch all leads from Supabase for Admin Panel
export async function getLeadsAction(): Promise<LeadRecord[]> {
  try {
    const supabaseAdmin = createAdminClient();
    const supabaseClient = await createClient();
    const client = supabaseAdmin || supabaseClient;

    if (!client) {
      return [];
    }

    const { data, error } = await client
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("[getLeadsAction Error]", error.message);
      return [];
    }

    return (data as LeadRecord[]) || [];
  } catch (err) {
    console.warn("[getLeadsAction Error]", err);
    return [];
  }
}

// Update Lead Status
export async function updateLeadStatusAction(id: string, status: string) {
  try {
    const supabaseAdmin = createAdminClient();
    const supabaseClient = await createClient();
    const client = supabaseAdmin || supabaseClient;

    if (!client) return { success: false, error: "Veritabanı bağlantısı yok." };

    const { error } = await client
      .from("leads")
      .update({ status })
      .eq("id", id);

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// Update Lead Admin Note
export async function updateLeadNoteAction(id: string, admin_note: string) {
  try {
    const supabaseAdmin = createAdminClient();
    const supabaseClient = await createClient();
    const client = supabaseAdmin || supabaseClient;

    if (!client) return { success: false, error: "Veritabanı bağlantısı yok." };

    const { error } = await client
      .from("leads")
      .update({ admin_note })
      .eq("id", id);

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// Delete Lead
export async function deleteLeadAction(id: string) {
  try {
    const supabaseAdmin = createAdminClient();
    const supabaseClient = await createClient();
    const client = supabaseAdmin || supabaseClient;

    if (!client) return { success: false, error: "Veritabanı bağlantısı yok." };

    const { error } = await client.from("leads").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
