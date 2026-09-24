"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { SiteSettingsProvider } from "@/context/SiteSettingsContext";
import { SiteSettingsData } from "@/types/settings";

export function PublicShell({
  initialSettings,
  children,
}: {
  initialSettings?: SiteSettingsData;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <SiteSettingsProvider initialSettings={initialSettings}>
        <div className="min-h-screen bg-slate-900 text-slate-100">{children}</div>
      </SiteSettingsProvider>
    );
  }

  return (
    <SiteSettingsProvider initialSettings={initialSettings}>
      <TopBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileBottomNav />
      <FloatingWhatsApp />
      <CookieConsent />
    </SiteSettingsProvider>
  );
}
