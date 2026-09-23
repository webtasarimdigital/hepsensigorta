import React from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, PhoneCall, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG, getWhatsAppUrl, getPhoneHref } from "@/constants/siteConfig";

export function FinalCtaSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-[#0B1F3A] via-[#11294D] to-[#0B1F3A] text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold border border-white/15">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Allianz Yetkili Acentesi • Hepsen Sigorta</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto">
          Geleceğiniz İçin Bugün Bir Adım Atın,{" "}
          <span className="text-emerald-400">Doğru Poliçeyle</span> Güvende Kalın
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Bireysel Emeklilik, Hayat ve Sağlık Sigortası seçeneklerinizi profesyonel danışmanlık eşliğinde değerlendirin. Ücretsiz ön görüşme ile en avantajlı alternatifleri öğrenin.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
          <Link href="/teklif-al" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2.5 shadow-xl shadow-emerald-950/40">
              <span>Hızlı Teklif Al</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>

          <a
            href={getWhatsAppUrl("Merhaba, Hepsen Sigorta web sitesinden ulaşıyorum. Ücretsiz danışmanlık ve teklif almak istiyorum.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button variant="whatsapp" size="lg" className="w-full sm:w-auto gap-2.5 shadow-xl">
              <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
              <span>WhatsApp&apos;tan Bilgi Al</span>
            </Button>
          </a>

          <a href={getPhoneHref()} className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 border-white/30 text-white hover:bg-white hover:text-[#0B1F3A]">
              <PhoneCall className="w-4 h-4" />
              <span>{SITE_CONFIG.phone}</span>
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
