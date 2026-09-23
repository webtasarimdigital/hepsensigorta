"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShieldCheck, FileText } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { SITE_CONFIG, getWhatsAppUrl } from "@/constants/siteConfig";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();

  // If in admin panel, don't show the public mobile navigation
  if (pathname.startsWith("/admin")) {
    return null;
  }

  // Generate contextual WhatsApp message based on current page
  let waMsg = "Merhaba, Hepsen Sigorta web sitesinden ulaşıyorum. Bilgi almak istiyorum.";
  if (pathname.includes("bireysel-emeklilik")) {
    waMsg = "Merhaba, Bireysel Emeklilik (BES) hakkında bilgi almak istiyorum.";
  } else if (pathname.includes("hayat-sigortasi")) {
    waMsg = "Merhaba, Hayat Sigortası hakkında bilgi almak istiyorum.";
  } else if (pathname.includes("saglik-sigortasi")) {
    waMsg = "Merhaba, Sağlık Sigortası hakkında bilgi almak istiyorum.";
  } else if (pathname.includes("finansal-danismanlik")) {
    waMsg = "Merhaba, Finansal Danışmanlık ve planlama hakkında görüşmek istiyorum.";
  }

  const isHome = pathname === "/";
  const isServices = pathname.includes("bireysel-emeklilik") || pathname.includes("hayat-sigortasi") || pathname.includes("saglik-sigortasi") || pathname.includes("finansal-danismanlik");
  const isQuote = pathname === "/teklif-al";

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-safe">
      <div className="grid grid-cols-4 h-16 items-center px-1">
        {/* 1. Ana Sayfa */}
        <Link
          href="/"
          className={cn(
            "flex flex-col items-center justify-center h-full text-[11px] font-medium transition-colors select-none",
            isHome ? "text-[#0B1F3A] font-bold" : "text-slate-500 hover:text-slate-900"
          )}
        >
          <Home className={cn("w-5 h-5 mb-1", isHome ? "text-[#0B1F3A]" : "text-slate-400")} />
          <span>Ana Sayfa</span>
        </Link>

        {/* 2. Hizmetler */}
        <Link
          href="/#hizmetler"
          className={cn(
            "flex flex-col items-center justify-center h-full text-[11px] font-medium transition-colors select-none",
            isServices ? "text-[#0B1F3A] font-bold" : "text-slate-500 hover:text-slate-900"
          )}
        >
          <ShieldCheck className={cn("w-5 h-5 mb-1", isServices ? "text-[#0B1F3A]" : "text-slate-400")} />
          <span>Hizmetler</span>
        </Link>

        {/* 3. WhatsApp (Prominent Green) */}
        <a
          href={getWhatsAppUrl(waMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center h-full text-[11px] font-bold text-[#109347] transition-transform active:scale-95 select-none"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#25D366] text-white shadow-sm mb-0.5">
            <WhatsAppIcon className="w-4 h-4 fill-white" />
          </div>
          <span>WhatsApp</span>
        </a>

        {/* 4. Teklif Al (Prominent Accent) */}
        <Link
          href="/teklif-al"
          className={cn(
            "flex flex-col items-center justify-center h-full text-[11px] font-bold transition-transform active:scale-95 select-none",
            isQuote ? "text-emerald-700" : "text-[#0B1F3A]"
          )}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0B1F3A] text-white shadow-sm mb-0.5">
            <FileText className="w-4 h-4 text-emerald-400" />
          </div>
          <span>Teklif Al</span>
        </Link>
      </div>
    </div>
  );
}
