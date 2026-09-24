"use client";

import React from "react";
import { Phone, Clock, MapPin, ShieldCheck } from "lucide-react";
import { useSiteSettings } from "@/context/SiteSettingsContext";

export function TopBar() {
  const { settings, getPhoneHref, getLandlineHref } = useSiteSettings();

  return (
    <div className="hidden lg:block bg-[#0B1F3A] text-slate-300 text-xs py-2 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Allianz Authorization & Location */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Allianz Yetkili Acentesi</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>Kozyatağı, Kadıköy / İstanbul</span>
          </div>
        </div>

        {/* Right: Working Hours & Phones */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{settings.workingHours}</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={getPhoneHref()}
              className="flex items-center gap-1.5 text-white hover:text-emerald-400 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{settings.phone}</span>
            </a>
            <span className="text-white/20">|</span>
            <a
              href={getLandlineHref()}
              className="text-slate-300 hover:text-white transition-colors"
            >
              Çağrı: {settings.landline}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
