import React from "react";
import Link from "next/link";
import { UserCheck, ShieldCheck, Phone, Mail, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  SITE_CONFIG,
  ADVISORS,
  getAdvisorWhatsAppUrl,
  getEmailHref,
} from "@/constants/siteConfig";

export function AdvisorProfile() {
  const merve = ADVISORS[0];
  const elif = ADVISORS[1];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Cards (Merve & Elif) (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. Merve Doğan Card */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl bg-[#0B1F3A] text-white p-7 sm:p-8 shadow-xl border border-white/10 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-2xl font-black shadow-md border-2 border-white/20 shrink-0">
                    {merve.initials}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                      {merve.role}
                    </span>
                    <h3 className="text-xl font-black text-white">
                      {merve.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-300">
                      {merve.title} • Allianz Yetkili Acentesi
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4 border-t border-white/10 pt-3">
                  &ldquo;{merve.quote}&rdquo;
                </p>

                {/* Contact Links & WhatsApp */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs border-t border-white/10">
                  <div className="space-y-1.5">
                    <a
                      href={`tel:+${merve.phoneRaw}`}
                      className="flex items-center gap-2 text-slate-200 hover:text-emerald-400 transition-colors font-mono"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{merve.phone}</span>
                    </a>
                    <a
                      href={getEmailHref(merve.email)}
                      className="flex items-center gap-2 text-slate-200 hover:text-emerald-400 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{merve.email}</span>
                    </a>
                  </div>
                  <a
                    href={getAdvisorWhatsAppUrl(merve.phoneRaw, "Merhaba Merve Hanım, Hepsen Sigorta üzerinden danışmanlık almak istiyorum.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366] text-white font-semibold text-xs hover:bg-[#20bd5a] transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* 2. Elif Çakır Card (Altında) */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl bg-[#0F284A] text-white p-7 sm:p-8 shadow-xl border border-white/10 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-400/15 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-white text-2xl font-black shadow-md border-2 border-white/20 shrink-0">
                    {elif.initials}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                      Fon Yöneticisi & Danışman
                    </span>
                    <h3 className="text-xl font-black text-white">
                      {elif.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-300">
                      {elif.title} • Allianz Yetkili Acentesi
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4 border-t border-white/10 pt-3">
                  &ldquo;{elif.quote}&rdquo;
                </p>

                {/* Contact Links & WhatsApp */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs border-t border-white/10">
                  <div className="space-y-1.5">
                    <a
                      href={`tel:+${elif.phoneRaw}`}
                      className="flex items-center gap-2 text-slate-200 hover:text-emerald-400 transition-colors font-mono"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{elif.phone}</span>
                    </a>
                    <a
                      href={getEmailHref(elif.email)}
                      className="flex items-center gap-2 text-slate-200 hover:text-emerald-400 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{elif.email}</span>
                    </a>
                  </div>
                  <a
                    href={getAdvisorWhatsAppUrl(elif.phoneRaw, "Merhaba Elif Hanım, Hepsen Sigorta üzerinden danışmanlık almak istiyorum.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366] text-white font-semibold text-xs hover:bg-[#20bd5a] transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Philosophy (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200/60">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Hepsen Sigorta Danışman Ekibi</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] tracking-tight leading-tight">
              Seni Düşünen Sigorta Yaklaşımıyla{" "}
              <span className="text-emerald-700">Güvenilir Bir Yol Arkadaşı</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                Hepsen Sigorta; Allianz güvencesiyle Bireysel Emeklilik Sistemi (BES), Hayat Sigortası ve Sağlık Sigortası alanlarında bireylere, ailelere ve kurumlara özel danışmanlık vermek amacıyla kurulmuştur.
              </p>
              <p>
                Sektördeki karmaşık poliçe maddeleri, anlaşılması güç finansal terimler ve standart paket satışları yerine; her danışanımızın gerçek hayat beklentilerini dinliyoruz. Fon Yöneticilerimiz <strong className="text-slate-900 font-semibold">Merve Doğan</strong> ve <strong className="text-slate-900 font-semibold">Elif Çakır</strong> liderliğinde gelir durumunuza ve risk profilinize en uygun fon dağılımlarını belirliyor, acil durumlarda bütçenizi sarsmayacak doğru sağlık teminatlarını birlikte seçiyoruz.
              </p>
              <p>
                İstanbul Kadıköy Kozyatağı&apos;nda bulunan ofisimizde yüz yüze çay eşliğinde görüşebileceğimiz gibi, Türkiye&apos;nin neresinde olursanız olun telefon ve WhatsApp üzerinden aynı samimiyet ve profesyonellikle yanınızdayız.
              </p>
            </div>

            {/* Micro Badge Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0B1F3A] bg-[#F6F8FA] p-3 rounded-xl border border-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Allianz Yetkili Tekli Acentesi</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0B1F3A] bg-[#F6F8FA] p-3 rounded-xl border border-slate-200">
                <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Birebir Uzman Danışmanlık</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Link href="/hakkimizda">
                <Button variant="outline" size="md" className="gap-2">
                  <span>Hakkımızda Detayları</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a
                href={getAdvisorWhatsAppUrl(merve.phoneRaw, "Merhaba Merve Hanım, Hepsen Sigorta hakkında bilgi almak ve görüşmek istiyorum.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="md" className="gap-2">
                  <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                  <span>WhatsApp • Merve Hanım</span>
                </Button>
              </a>
              <a
                href={getAdvisorWhatsAppUrl(elif.phoneRaw, "Merhaba Elif Hanım, Hepsen Sigorta hakkında bilgi almak ve görüşmek istiyorum.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="md" className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                  <MessageCircle className="w-4 h-4 fill-white text-white" />
                  <span>WhatsApp • Elif Hanım</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
