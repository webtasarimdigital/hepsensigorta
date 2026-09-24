import { SITE_CONFIG } from "@/constants/siteConfig";

export interface SiteSettingsData {
  id?: string;
  name: string;
  legalName: string;
  slogan: string;
  personName: string;
  personTitle: string;
  phone: string;
  landline: string;
  whatsapp: string;
  emailPrimary: string;
  emailContact: string;
  addressFull: string;
  workingHours: string;
  tobbLevhaNo: string;
  vergiDairesi: string;
  mersisNo: string;
  phoneRaw: string;
  landlineRaw: string;
  whatsappRaw: string;
}

export function formatPhoneRaw(phone: string): string {
  if (!phone) return "905457101419";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("90")) return cleaned;
  if (cleaned.startsWith("0")) return "90" + cleaned.slice(1);
  return cleaned ? (cleaned.length === 10 ? "90" + cleaned : cleaned) : "905457101419";
}

export const DEFAULT_SETTINGS: SiteSettingsData = {
  id: "main",
  name: SITE_CONFIG.name,
  legalName: SITE_CONFIG.legalName,
  slogan: SITE_CONFIG.slogan,
  personName: SITE_CONFIG.personName,
  personTitle: SITE_CONFIG.personTitle,
  phone: SITE_CONFIG.phone,
  landline: SITE_CONFIG.landline,
  whatsapp: SITE_CONFIG.whatsapp,
  emailPrimary: SITE_CONFIG.emailPrimary,
  emailContact: SITE_CONFIG.emailContact,
  addressFull: SITE_CONFIG.address.full,
  workingHours: SITE_CONFIG.workingHours,
  tobbLevhaNo: SITE_CONFIG.legalInfo.tobbLevhaNo || "Bilgiler acente sicil levhasında kayıtlıdır",
  vergiDairesi: SITE_CONFIG.legalInfo.vergiDairesi || "Kozyatağı V.D.",
  mersisNo: SITE_CONFIG.legalInfo.mersisNo || "",
  phoneRaw: SITE_CONFIG.phoneRaw,
  landlineRaw: SITE_CONFIG.landlineRaw,
  whatsappRaw: SITE_CONFIG.whatsappRaw,
};
