"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SiteSettingsData, DEFAULT_SETTINGS } from "@/types/settings";

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
  getWhatsAppUrl: () => `https://wa.me/${DEFAULT_SETTINGS.whatsappRaw}`,
  getPhoneHref: () => `tel:+${DEFAULT_SETTINGS.phoneRaw}`,
  getLandlineHref: () => `tel:+${DEFAULT_SETTINGS.landlineRaw}`,
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
  }, [initialSettings]);

  const updateSettingsState = (newSettings: SiteSettingsData) => {
    setSettings(newSettings);
  };

  const getWhatsAppUrl = (message?: string) => {
    const defaultMsg = "Merhaba, Hepsen Sigorta web sitesinden ulaşıyorum. Bilgi almak istiyorum.";
    const text = encodeURIComponent(message || defaultMsg);
    return `https://wa.me/${settings.whatsappRaw || DEFAULT_SETTINGS.whatsappRaw}?text=${text}`;
  };

  const getPhoneHref = () => {
    return `tel:+${settings.phoneRaw || DEFAULT_SETTINGS.phoneRaw}`;
  };

  const getLandlineHref = () => {
    return `tel:+${settings.landlineRaw || DEFAULT_SETTINGS.landlineRaw}`;
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
