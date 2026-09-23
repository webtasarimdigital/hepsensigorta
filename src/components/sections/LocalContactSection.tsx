import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { SITE_CONFIG, getPhoneHref, getLandlineHref, getEmailHref, getWhatsAppUrl } from "@/constants/siteConfig";
import { Button } from "@/components/ui/Button";

export function LocalContactSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#F6F8FA] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Office & Contact Info (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200/60">
              <MapPin className="w-3.5 h-3.5" />
              <span>Kozyatağı / Kadıköy / İstanbul</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
              Bizimle İletişime Geçin
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              İstanbul&apos;da yüz yüze görüşme veya Türkiye&apos;nin her yerinden uzaktan destek için bizimle iletişime geçebilirsiniz. Kozyatağı ofisimizde çayımızı içebilir ya da telefon ve WhatsApp üzerinden anında bilgi alabilirsiniz.
            </p>

            {/* Contact Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Address */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm sm:col-span-2 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm">
                  <span className="font-bold text-[#0B1F3A] block mb-0.5">Ofis Adresimiz</span>
                  <span className="text-slate-600 leading-relaxed block">
                    {SITE_CONFIG.address.full}
                  </span>
                </div>
              </div>

              {/* Cell Phone */}
              <a
                href={getPhoneHref()}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-500 transition-colors flex items-start gap-3 group"
              >
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 shrink-0 group-hover:bg-[#0B1F3A] group-hover:text-emerald-400 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm">
                  <span className="font-bold text-[#0B1F3A] block mb-0.5">Yetkili / Danışman</span>
                  <span className="text-slate-600 font-semibold">{SITE_CONFIG.phone}</span>
                </div>
              </a>

              {/* Landline */}
              <a
                href={getLandlineHref()}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-500 transition-colors flex items-start gap-3 group"
              >
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 shrink-0 group-hover:bg-[#0B1F3A] group-hover:text-emerald-400 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm">
                  <span className="font-bold text-[#0B1F3A] block mb-0.5">Sabit / Çağrı Hattı</span>
                  <span className="text-slate-600 font-semibold">{SITE_CONFIG.landline}</span>
                </div>
              </a>

              {/* Email */}
              <a
                href={getEmailHref(SITE_CONFIG.emailPrimary)}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-500 transition-colors flex items-start gap-3 sm:col-span-2 group"
              >
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 shrink-0 group-hover:bg-[#0B1F3A] group-hover:text-emerald-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm">
                  <span className="font-bold text-[#0B1F3A] block mb-0.5">E-posta</span>
                  <span className="text-slate-600">{SITE_CONFIG.emailPrimary}</span>
                </div>
              </a>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={getWhatsAppUrl("Merhaba, Kozyatağı ofisinizde yüz yüze görüşme veya uzaktan danışmanlık için randevu almak istiyorum.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="md" className="gap-2">
                  <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                  <span>WhatsApp ile Yazın</span>
                </Button>
              </a>

              <Link href="/iletisim">
                <Button variant="outline" size="md" className="gap-2">
                  <span>İletişim Sayfası</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Map Placeholder & Location Overview (6 cols) */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0B1F3A]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Kozyatağı / Kadıköy Konumu</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  Allianz Yetkili Acentesi
                </span>
              </div>

              {/* Styled Map Container */}
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-center p-6">
                <div className="w-14 h-14 rounded-full bg-[#0B1F3A] text-white flex items-center justify-center shadow-lg mb-3">
                  <MapPin className="w-7 h-7 text-emerald-400" />
                </div>
                <h4 className="font-bold text-[#0B1F3A] text-sm mb-1">
                  Baytur Kozyatağı Konutları
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mb-4">
                  Kozyatağı Mah. Bayer Cad. Şakacı Sk. E Blok D:3 Kadıköy / İstanbul
                </p>
                <a
                  href="https://maps.google.com/?q=Kozyatağı+Kadıköy+İstanbul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-xl transition-colors shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Google Haritalarda Aç</span>
                </a>
              </div>

              <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
                <span>Toplu taşıma ve E-5 & Kozyatağı metrosuna yakın konum</span>
                <span className="font-semibold text-emerald-700">Randevulu Görüşme</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
