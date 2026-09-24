"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ArrowRight,
  PiggyBank,
  HeartPulse,
  LineChart,
  CheckCircle2,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { SITE_CONFIG, getWhatsAppUrl, getPhoneHref } from "@/constants/siteConfig";

export function Hero() {
  const [selectedService, setSelectedService] = useState("bireysel-emeklilik");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1F3A] via-[#0D2444] to-[#0B1F3A] text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#50C878_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-36 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading & Value Proposition (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-emerald-400 text-xs sm:text-sm font-medium backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Allianz Yetkili Acentesi • Kadıköy / İstanbul</span>
            </div>

            {/* Main H1 Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.18] text-white">
              Geleceğinizi Güvence Altına Alacak{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-200">
                Doğru Çözümleri
              </span>{" "}
              Birlikte Belirleyelim
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Hepsen Sigorta ile bireysel emeklilik, hayat ve sağlık ihtiyaçlarınız için size uygun seçenekleri birlikte değerlendirelim.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link href="/teklif-al" className="w-full sm:w-auto">
                <Button variant="navy" size="lg" className="w-full sm:w-auto gap-2.5 text-base shadow-lg shadow-[#0B1F3A]/30">
                  <span>Hızlı Teklif Al</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>

              <a
                href={getWhatsAppUrl("Merhaba, Hepsen Sigorta web sitesinden ulaşıyorum. Bilgi almak istiyorum.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="whatsapp"
                  size="lg"
                  className="w-full sm:w-auto gap-2.5 text-base shadow-lg"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                  <span>WhatsApp&apos;tan Bilgi Al</span>
                </Button>
              </a>
            </div>

            {/* Micro Trust Bullets */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300 text-left border-t border-white/10 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Kişiye Özel İhtiyaç Analizi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Allianz Yetkili Acente</span>
              </div>
              <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Ücretsiz Ön Analiz</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Quote Preview Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-2xl text-slate-800 border border-slate-100 relative">
              {/* Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Hızlı Başvuru
                  </span>
                  <h3 className="text-lg font-bold text-[#0B1F3A] mt-1">
                    Size Uygun Çözümü Seçin
                  </h3>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-2xl text-emerald-600">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              {/* Service Selection Radio Pills */}
              <div className="py-4 space-y-2.5">
                <label className="text-xs font-semibold text-slate-600">
                  İlgilendiğiniz Hizmet Alanı:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "bireysel-emeklilik", title: "Bireysel Emeklilik", icon: PiggyBank },
                    { id: "hayat-sigortasi", title: "Hayat Sigortası", icon: ShieldCheck },
                    { id: "saglik-sigortasi", title: "Sağlık Sigortası", icon: HeartPulse },
                    { id: "finansal-danismanlik", title: "Finansal Planlama", icon: LineChart },
                  ].map((srv) => {
                    const Icon = srv.icon;
                    const isSelected = selectedService === srv.id;
                    return (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => setSelectedService(srv.id)}
                        className={`flex items-center gap-2 p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                          isSelected
                            ? "bg-emerald-50/80 border-emerald-500 text-emerald-900 shadow-sm"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-emerald-700" : "text-slate-500"}`} />
                        <span className="truncate">{srv.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Info Box */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-600 mb-5 leading-relaxed">
                {selectedService === "bireysel-emeklilik" && (
                  <p>
                    <strong>BES:</strong> Devlet katkısı avantajı ve profesyonel fon yönetimiyle emeklilik ve çocuk birikimi oluşturun.
                  </p>
                )}
                {selectedService === "hayat-sigortasi" && (
                  <p>
                    <strong>Hayat:</strong> Ailenizin yaşam standardını ve borç yükümlülüklerinizi teminat altına alan koruma kalkanı.
                  </p>
                )}
                {selectedService === "saglik-sigortasi" && (
                  <p>
                    <strong>Sağlık:</strong> Özel hastanelerde SGK fark ücreti ödemeden modern tedavi imkanı (TSS ve ÖSS).
                  </p>
                )}
                {selectedService === "finansal-danismanlik" && (
                  <p>
                    <strong>Danışmanlık:</strong> Gelir, birikim ve sigorta hedeflerinizi uzman gözüyle planlayın.
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <Link
                  href={`/teklif-al?service=${selectedService}`}
                  className="w-full block"
                >
                  <Button variant="primary" size="md" className="w-full justify-center gap-2">
                    <span>Teklif Formuna Devam Et</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
                  <a
                    href={getPhoneHref()}
                    className="flex items-center gap-1.5 text-slate-700 hover:text-emerald-700 font-medium"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Hemen Ara: {SITE_CONFIG.phone}</span>
                  </a>
                  <span>Ücretsiz Ön Analiz</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
