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
    // 2. Try inserting into Supabase
    let supabaseSaved = false;
    try {
      const supabase = await createClient();
      if (supabase) {
        const { error } = await supabase.from("leads").insert([
          {
            service: data.service,
            full_name: data.fullName.trim(),
            phone: data.phone.trim(),
            email: data.email?.trim() || null,
            city: data.city?.trim() || null,
            preferred_contact: data.preferredContact || "Telefon",
            message: data.message?.trim() || null,
            status: "Yeni",
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
