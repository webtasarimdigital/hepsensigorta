"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { SITE_CONFIG, getWhatsAppUrl } from "@/constants/siteConfig";

export function FloatingWhatsApp() {
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(true);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  // Generate contextual WhatsApp message based on current page
  let waMsg = "Merhaba, Hepsen Sigorta web sitesinden ulaşıyorum. Bilgi almak istiyorum.";
  if (pathname.includes("bireysel-emeklilik")) {
    waMsg = "Merhaba, Bireysel Emeklilik (BES) hakkında bilgi almak istiyorum.";
  } else if (pathname.includes("hayat-sigortasi")) {
    waMsg = "Merhaba, Hayat Sigortası hakkında bilgi almak ve teklif değerlendirmek istiyorum.";
  } else if (pathname.includes("saglik-sigortasi")) {
    waMsg = "Merhaba, Sağlık Sigortası hakkında bilgi almak ve teklif değerlendirmek istiyorum.";
  } else if (pathname.includes("finansal-danismanlik")) {
    waMsg = "Merhaba, Finansal Danışmanlık ve tasarruf planlaması hakkında görüşmek istiyorum.";
  }

  return (
    <aside
      aria-label="WhatsApp İletişim Butonu"
      className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-3"
    >
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="relative bg-white text-slate-800 text-xs font-medium py-2.5 px-4 rounded-xl shadow-lg border border-slate-200/90 flex items-center gap-2 animate-fadeIn max-w-[220px]">
          <span>Sorularınız için WhatsApp&apos;tan bize hemen yazabilirsiniz.</span>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 focus:outline-none"
            aria-label="Kapat"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-white" />
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={getWhatsAppUrl(waMsg)}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        title="WhatsApp ile İletişime Geçin"
        aria-label="WhatsApp ile İletişime Geçin"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300"></span>
        </span>
        <WhatsAppIcon className="w-8 h-8 fill-white" />
      </a>
    </aside>
  );
}
