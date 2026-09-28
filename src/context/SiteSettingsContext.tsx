"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SiteSettingsData, DEFAULT_SETTINGS, formatPhoneRaw } from "@/types/settings";

interface SiteSettingsContextType {
  settings: SiteSettingsData;
  updateSettingsState: (newSettings: SiteSettingsData) => void;
  getWhatsAppUrl: (message?: string) => string;
  getPhoneHref: () => string;
  getLandlineHref: () => string;
  getEmailHref: (email?: string) => string;
}

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  settings: DEFAULT_SETTINGS,
  updateSettingsState: () => {},
  getWhatsAppUrl: () => `https://wa.me/${formatPhoneRaw(DEFAULT_SETTINGS.whatsappRaw)}`,
  getPhoneHref: () => `tel:+${formatPhoneRaw(DEFAULT_SETTINGS.phoneRaw)}`,
  getLandlineHref: () => `tel:+${formatPhoneRaw(DEFAULT_SETTINGS.landlineRaw)}`,
  getEmailHref: () => `mailto:${DEFAULT_SETTINGS.emailPrimary}`,
});

export function SiteSettingsProvider({
  initialSettings,
  children,
}: {
  initialSettings?: SiteSettingsData;
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<SiteSettingsData>(initialSettings || DEFAULT_SETTINGS);

  useEffect(() => {
    if (initialSettings) {
      setSettings(initialSettings);
    }

    // Always fetch latest settings in the background to ensure real-time accuracy
    const fetchLatest = async () => {
      try {
        const res = await fetch("/api/settings", { cache: "no-store" });
        if (res.ok) {
          const fresh = await res.json();
          if (fresh && fresh.name) {
            setSettings(fresh);
          }
        }
      } catch (err) {
        // Fallback silently to initial settings
      }
    };

    fetchLatest();

    // Re-sync when user tabs back into the page
    window.addEventListener("focus", fetchLatest);
    return () => window.removeEventListener("focus", fetchLatest);
  }, [initialSettings]);

  const updateSettingsState = (newSettings: SiteSettingsData) => {
    setSettings(newSettings);
  };

  const getWhatsAppUrl = (message?: string) => {
    const defaultMsg = "Merhaba, Hepsen Sigorta web sitesinden ulaşıyorum. Bilgi almak istiyorum.";
    const text = encodeURIComponent(message || defaultMsg);
    const rawNumber = formatPhoneRaw(settings.whatsappRaw || settings.whatsapp || DEFAULT_SETTINGS.whatsappRaw);
    return `https://wa.me/${rawNumber}?text=${text}`;
  };

  const getPhoneHref = () => {
    const rawNumber = formatPhoneRaw(settings.phoneRaw || settings.phone || DEFAULT_SETTINGS.phoneRaw);
    return `tel:+${rawNumber}`;
  };

  const getLandlineHref = () => {
    const rawNumber = formatPhoneRaw(settings.landlineRaw || settings.landline || DEFAULT_SETTINGS.landlineRaw);
    return `tel:+${rawNumber}`;
  };

  const getEmailHref = (email?: string) => {
    return `mailto:${email || settings.emailPrimary || DEFAULT_SETTINGS.emailPrimary}`;
  };

  return (
    <SiteSettingsContext.Provider
      value={{
        settings,
        updateSettingsState,
        getWhatsAppUrl,
        getPhoneHref,
        getLandlineHref,
        getEmailHref,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  return context;
}
