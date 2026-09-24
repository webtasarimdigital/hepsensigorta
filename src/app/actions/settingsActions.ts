"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { createAdminClient, createPublicClient } from "@/lib/supabase/server";
import { SiteSettingsData, DEFAULT_SETTINGS, formatPhoneRaw } from "@/types/settings";

function getLocalJsonPath(): string {
  return path.join(process.cwd(), "src", "constants", "siteSettings.json");
}

function readLocalSettings(): SiteSettingsData {
  try {
    const filePath = getLocalJsonPath();
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(content);
      const phone = parsed.phone || DEFAULT_SETTINGS.phone;
      const landline = parsed.landline || DEFAULT_SETTINGS.landline;
      const whatsapp = parsed.whatsapp || DEFAULT_SETTINGS.whatsapp;
      return {
        ...DEFAULT_SETTINGS,
        ...parsed,
        phoneRaw: formatPhoneRaw(phone),
        landlineRaw: formatPhoneRaw(landline),
        whatsappRaw: formatPhoneRaw(whatsapp),
      };
    }
  } catch (err) {
    console.warn("[readLocalSettings Error]", err);
  }
  return DEFAULT_SETTINGS;
}

function writeLocalSettings(data: SiteSettingsData): void {
  try {
    const filePath = getLocalJsonPath();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("[writeLocalSettings Error]", err);
  }
}

// Map Supabase snake_case DB row to camelCase SiteSettingsData
function mapDbToSettings(row: any): SiteSettingsData {
  const phone = row.phone || DEFAULT_SETTINGS.phone;
  const landline = row.landline || DEFAULT_SETTINGS.landline;
  const whatsapp = row.whatsapp || DEFAULT_SETTINGS.whatsapp;

  return {
    id: "main",
    name: row.name || DEFAULT_SETTINGS.name,
    legalName: row.legal_name || DEFAULT_SETTINGS.legalName,
    slogan: row.slogan || DEFAULT_SETTINGS.slogan,
    personName: row.person_name || DEFAULT_SETTINGS.personName,
    personTitle: row.person_title || DEFAULT_SETTINGS.personTitle,
    phone,
    landline,
    whatsapp,
    emailPrimary: row.email_primary || DEFAULT_SETTINGS.emailPrimary,
    emailContact: row.email_contact || DEFAULT_SETTINGS.emailContact,
    addressFull: row.address_full || DEFAULT_SETTINGS.addressFull,
    workingHours: row.working_hours || DEFAULT_SETTINGS.workingHours,
    tobbLevhaNo: row.tobb_levha_no ?? DEFAULT_SETTINGS.tobbLevhaNo,
    vergiDairesi: row.vergi_dairesi ?? DEFAULT_SETTINGS.vergiDairesi,
    mersisNo: row.mersis_no ?? DEFAULT_SETTINGS.mersisNo,
    phoneRaw: formatPhoneRaw(phone),
    landlineRaw: formatPhoneRaw(landline),
    whatsappRaw: formatPhoneRaw(whatsapp),
  };
}

export async function getSiteSettingsAction(): Promise<SiteSettingsData> {
  try {
    const client = createAdminClient() || createPublicClient();
    if (client) {
      const { data, error } = await client
        .from("site_settings")
        .select("*")
        .eq("id", "main")
        .maybeSingle();

      if (!error && data) {
        return mapDbToSettings(data);
      }
    }
  } catch (err) {
    console.warn("[getSiteSettingsAction Supabase Error]", err);
  }

  // Fallback to local settings JSON or default
  return readLocalSettings();
}

export async function saveSiteSettingsAction(data: Partial<SiteSettingsData>): Promise<{
  success: boolean;
  settings?: SiteSettingsData;
  error?: string;
}> {
  try {
    const current = await getSiteSettingsAction();

    const phone = data.phone !== undefined ? data.phone : current.phone;
    const landline = data.landline !== undefined ? data.landline : current.landline;
    const whatsapp = data.whatsapp !== undefined ? data.whatsapp : current.whatsapp;

    const updated: SiteSettingsData = {
      ...current,
      ...data,
      phone,
      landline,
      whatsapp,
      phoneRaw: formatPhoneRaw(phone),
      landlineRaw: formatPhoneRaw(landline),
      whatsappRaw: formatPhoneRaw(whatsapp),
    };

    // 1. Immediately persist to local json for instant zero-lag updates
    writeLocalSettings(updated);

    // 2. Persist to Supabase if table exists
    try {
      const client = createAdminClient() || createPublicClient();
      if (client) {
        const dbPayload = {
          id: "main",
          name: updated.name,
          legal_name: updated.legalName,
          slogan: updated.slogan,
          person_name: updated.personName,
          person_title: updated.personTitle,
          phone: updated.phone,
          landline: updated.landline,
          whatsapp: updated.whatsapp,
          email_primary: updated.emailPrimary,
          email_contact: updated.emailContact,
          address_full: updated.addressFull,
          working_hours: updated.workingHours,
          tobb_levha_no: updated.tobbLevhaNo,
          vergi_dairesi: updated.vergiDairesi,
          mersis_no: updated.mersisNo,
          updated_at: new Date().toISOString(),
        };

        const { error } = await client
          .from("site_settings")
          .upsert(dbPayload, { onConflict: "id" });

        if (error) {
          console.warn("[saveSiteSettingsAction DB notice]:", error.message);
        }
      }
    } catch (dbErr) {
      console.warn("[saveSiteSettingsAction DB Error]", dbErr);
    }

    // 3. Invalidate Next.js cache so all layouts/pages immediately reflect new settings
    revalidatePath("/", "layout");
    revalidatePath("/iletisim");
    revalidatePath("/hakkimizda");
    revalidatePath("/admin/settings");

    return { success: true, settings: updated };
  } catch (err: any) {
    console.error("[saveSiteSettingsAction Fatal]", err);
    return { success: false, error: err?.message || "Ayarlar kaydedilemedi." };
  }
}
