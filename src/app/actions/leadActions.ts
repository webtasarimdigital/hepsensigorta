"use server";

import fs from "fs";
import path from "path";
import os from "os";
import { revalidatePath } from "next/cache";
import { createClient, createAdminClient, createPublicClient } from "@/lib/supabase/server";
import { readCloudJson, writeCloudJson } from "@/lib/supabase/storageStore";

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

function getLocalJsonPath(): string {
  return path.join(process.cwd(), "src", "constants", "leads.json");
}

function getTmpJsonPath(): string {
  return path.join(os.tmpdir(), "hepsen_leads.json");
}

function readLocalLeads(): LeadRecord[] {
  let list: LeadRecord[] = [];

  // 1. Try reading from project leads.json
  try {
    const filePath = getLocalJsonPath();
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      list = JSON.parse(content) as LeadRecord[];
    }
  } catch (err) {
    console.warn("[readLocalLeads Error]", err);
  }

  // 2. Also check /tmp for serverless persistence
  try {
    const tmpPath = getTmpJsonPath();
    if (fs.existsSync(tmpPath)) {
      const content = fs.readFileSync(tmpPath, "utf-8");
      const tmpList = JSON.parse(content) as LeadRecord[];
      const existingIds = new Set(list.map((l) => l.id));
      for (const item of tmpList) {
        if (!existingIds.has(item.id)) {
          list.push(item);
        }
      }
    }
  } catch (tmpErr) {
    console.warn("[readTmpLeads Error]", tmpErr);
  }

  return list.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

function writeLocalLeads(list: LeadRecord[]): void {
  // Write to src/constants/leads.json
  try {
    const filePath = getLocalJsonPath();
    fs.writeFileSync(filePath, JSON.stringify(list, null, 2), "utf-8");
  } catch (err) {
    console.warn("[writeLocalLeads Warning]", err);
  }

  // Write to /tmp/hepsen_leads.json
  try {
    const tmpPath = getTmpJsonPath();
    fs.writeFileSync(tmpPath, JSON.stringify(list, null, 2), "utf-8");
  } catch (tmpErr) {
    console.warn("[writeTmpLeads Warning]", tmpErr);
  }
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

    const newLead: LeadRecord = {
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      service: data.service,
      full_name: data.fullName.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || null,
      city: data.city?.trim() || null,
      preferred_contact: data.preferredContact || "WhatsApp",
      message: data.message?.trim() || null,
      status: "Yeni",
      admin_note: null,
    };

    // 1. Guaranteed Local Write First
    const currentLeads = await getLeadsAction();
    const updatedLeads = [newLead, ...currentLeads.filter((l) => l.id !== newLead.id)];
    
    // Write to Persistent Cloud Storage
    await writeCloudJson("leads.json", updatedLeads);
    // Write locally
    writeLocalLeads(updatedLeads);

    // 2. Try inserting into Supabase leads table
    try {
      const supabaseAdmin = createAdminClient();
      const supabaseClient = await createClient();
      const client = supabaseAdmin || supabaseClient;

      if (client) {
        const { error } = await client.from("leads").insert([newLead]);

        if (!error) {
          supabaseSaved = true;
        } else {
          console.warn("[Supabase Insert Warning]", error.message);
        }
      }
    } catch (dbErr) {
      console.warn("[Database Connection Warning]", dbErr);
    }

    try {
      revalidatePath("/admin");
      revalidatePath("/admin/leads");
    } catch {
      // outside request scope
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

// Fetch all leads for Admin Panel (Dual Storage)
export async function getLeadsAction(): Promise<LeadRecord[]> {
  // 1. Try Supabase Table
  try {
    const supabaseAdmin = createAdminClient();
    const supabaseClient = await createClient();
    const client = supabaseAdmin || supabaseClient || createPublicClient();

    if (client) {
      const { data, error } = await client
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data as LeadRecord[];
      }
    }
  } catch (err) {
    console.warn("[getLeadsAction DB Notice]", err);
  }

  // 2. Read from Persistent Cloud Storage
  try {
    const cloudLeads = await readCloudJson<LeadRecord[] | null>("leads.json", null);
    if (Array.isArray(cloudLeads)) {
      return cloudLeads;
    }
  } catch (cloudErr) {
    console.warn("[getLeadsAction Cloud Notice]", cloudErr);
  }

  return readLocalLeads();
}

// Update Lead Status
export async function updateLeadStatusAction(id: string, status: string) {
  try {
    const currentList = await getLeadsAction();
    const updated = currentList.map((l) =>
      l.id === id ? { ...l, status: status as any } : l
    );
    await writeCloudJson("leads.json", updated);
    writeLocalLeads(updated);

    // Try Supabase
    try {
      const client = createAdminClient() || (await createClient());
      if (client) {
        await client.from("leads").update({ status }).eq("id", id);
      }
    } catch (dbErr) {
      console.warn("[updateLeadStatus Supabase Notice]", dbErr);
    }

    try {
      revalidatePath("/admin");
      revalidatePath("/admin/leads");
    } catch {
      // outside request scope
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// Update Lead Admin Note
export async function updateLeadNoteAction(id: string, admin_note: string) {
  try {
    const currentList = await getLeadsAction();
    const updated = currentList.map((l) =>
      l.id === id ? { ...l, admin_note } : l
    );
    await writeCloudJson("leads.json", updated);
    writeLocalLeads(updated);

    // Try Supabase
    try {
      const client = createAdminClient() || (await createClient());
      if (client) {
        await client.from("leads").update({ admin_note }).eq("id", id);
      }
    } catch (dbErr) {
      console.warn("[updateLeadNote Supabase Notice]", dbErr);
    }

    try {
      revalidatePath("/admin");
      revalidatePath("/admin/leads");
    } catch {
      // outside request scope
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// Delete Lead
export async function deleteLeadAction(id: string) {
  try {
    const currentList = await getLeadsAction();
    const updated = currentList.filter((l) => l.id !== id);
    await writeCloudJson("leads.json", updated);
    writeLocalLeads(updated);

    // Try Supabase
    try {
      const client = createAdminClient() || (await createClient());
      if (client) {
        await client.from("leads").delete().eq("id", id);
      }
    } catch (dbErr) {
      console.warn("[deleteLead Supabase Notice]", dbErr);
    }

    try {
      revalidatePath("/admin");
      revalidatePath("/admin/leads");
    } catch {
      // outside request scope
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
