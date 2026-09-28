export interface SiteConfig {
  name: string;
  legalName: string;
  slogan: string;
  personName: string;
  personTitle: string;
  phone: string;
  phoneRaw: string;
  landline: string;
  landlineRaw: string;
  whatsapp: string;
  whatsappRaw: string;
  emailPrimary: string;
  emailContact: string;
  address: {
    line1: string;
    line2: string;
    district: string;
    city: string;
    full: string;
  };
  workingHours: string;
  allianzBadge: {
    title: string;
    description: string;
  };
  legalInfo: {
    tobbLevhaNo: string;
    vergiDairesi: string;
    mersisNo: string;
  };
  socialLinks: {
    linkedin?: string;
    instagram?: string;
  };
  meta: {
    title: string;
    description: string;
    keywords: string[];
    url: string;
  };
}

export const SITE_CONFIG: SiteConfig = {
  name: "Hepsen Sigorta",
  legalName: "Hepsen Sigorta Aracılık Hizmetleri",
  slogan: "Seni Düşünen Sigorta",
  personName: "Merve DOĞAN",
  personTitle: "Fon Yöneticisi",
  phone: "0545 710 14 19",
  phoneRaw: "905457101419",
  landline: "0850 223 98 66",
  landlineRaw: "908502239866",
  whatsapp: "0545 710 14 19",
  whatsappRaw: "905457101419",
  emailPrimary: "merve.dogan@hepsensigorta.com",
  emailContact: "info@hepsensigorta.com",
  address: {
    line1: "Kozyatağı Mah. Bayer Cad. Şakacı Sk.",
    line2: "Baytur Kozyatağı Konutları E Blok D:3",
    district: "Kadıköy",
    city: "İstanbul",
    full: "Kozyatağı Mah. Bayer Cad. Şakacı Sk. Baytur Kozyatağı Konutları E Blok D:3, Kadıköy / İstanbul",
  },
  workingHours: "Pazartesi - Cuma: 09:00 - 18:30 | Cumartesi: 09:30 - 14:00",
  allianzBadge: {
    title: "Allianz Yetkili Acentesi",
    description: "Bireysel Emeklilik, Hayat ve Sağlık ürünlerinde Allianz güvencesi ve yetkisiyle hizmet vermektedir.",
  },
  legalInfo: {
    tobbLevhaNo: "Bilgiler acente sicil levhasında kayıtlıdır",
    vergiDairesi: "Kozyatağı V.D.",
    mersisNo: "",
  },
  socialLinks: {
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
  meta: {
    title: "Hepsen Sigorta | Seni Düşünen Sigorta - Allianz Yetkili Acentesi",
    description: "Bireysel Emeklilik (BES), Hayat Sigortası, Sağlık Sigortası ve Finansal Danışmanlık alanlarında Merve Doğan güvencesiyle yanınızdayız. Kozyatağı Kadıköy'de yüz yüze, Türkiye genelinde uzaktan destek.",
    keywords: [
      "Hepsen Sigorta",
      "Bireysel Emeklilik",
      "BES Danışmanlığı",
      "Hayat Sigortası",
      "Sağlık Sigortası",
      "Finansal Danışmanlık",
      "Kadıköy Sigorta Acentesi",
      "Kozyatağı Bireysel Emeklilik",
      "Allianz Yetkili Acentesi",
      "Merve Doğan Fon Yöneticisi"
    ],
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.hepsensigorta.com",
  },
};

import rawSettings from "./siteSettings.json";

export function formatPhoneRaw(phone?: string): string {
  if (!phone) return "905457101419";
  let cleaned = phone.replace(/\D/g, "");
  if (!cleaned) return "905457101419";
  if (cleaned.startsWith("00")) cleaned = cleaned.slice(2);
  if (cleaned.startsWith("900")) cleaned = "90" + cleaned.slice(3);
  if (cleaned.startsWith("90") && cleaned.length === 12) return cleaned;
  if (cleaned.startsWith("0")) return "90" + cleaned.slice(1);
  if (cleaned.length === 10) return "90" + cleaned;
  if (cleaned.startsWith("90")) return cleaned;
  return "90" + cleaned;
}

export function getWhatsAppUrl(message?: string): string {
  const defaultMsg = "Merhaba, Hepsen Sigorta web sitesinden ulaşıyorum. Bilgi almak istiyorum.";
  const encoded = encodeURIComponent(message || defaultMsg);
  const waRaw = formatPhoneRaw((rawSettings as any).whatsappRaw || rawSettings.whatsapp || SITE_CONFIG.whatsappRaw);
  return `https://wa.me/${waRaw}?text=${encoded}`;
}

export function getPhoneHref(): string {
  const pRaw = formatPhoneRaw((rawSettings as any).phoneRaw || rawSettings.phone || SITE_CONFIG.phoneRaw);
  return `tel:+${pRaw}`;
}

export function getLandlineHref(): string {
  const lRaw = formatPhoneRaw((rawSettings as any).landlineRaw || rawSettings.landline || SITE_CONFIG.landlineRaw);
  return `tel:+${lRaw}`;
}

export function getEmailHref(email?: string): string {
  return `mailto:${email || rawSettings.emailContact || rawSettings.emailPrimary || SITE_CONFIG.emailContact}`;
}
