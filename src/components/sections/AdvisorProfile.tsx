import React from "react";
import Link from "next/link";
import { UserCheck, ShieldCheck, Phone, Mail, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG, getWhatsAppUrl, getPhoneHref, getEmailHref } from "@/constants/siteConfig";

export function AdvisorProfile() {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Frame */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-emerald-500/20 to-[#0B1F3A]/20 blur-lg" />

              <div className="relative rounded-3xl bg-[#0B1F3A] text-white p-8 sm:p-10 shadow-2xl border border-white/10 overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

                {/* Profile Placeholder Avatar */}
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-3xl font-black shadow-lg mb-6 border-2 border-white/20">
                  MD
                </div>

                <div className="space-y-1 mb-6">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                    Acente Yetkilisi
                  </span>
                  <h3 className="text-2xl font-black text-white">
                    {SITE_CONFIG.personName}
                  </h3>
                  <p className="text-sm font-medium text-slate-300">
                    {SITE_CONFIG.personTitle} • Allianz Yetkili Acentesi
                  </p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-6 border-t border-white/10 pt-4">
                  &ldquo;Bireysel emeklilik ve sigorta ürünlerinde en önemli unsur güvendir. Amacımız sadece bir poliçe düzenlemek değil, yıllar boyu birikimlerinizi ve sağlığınızı gönül rahatlığıyla bize emanet edebileceğiniz bir yol arkadaşlığı kurmaktır.&rdquo;
                </p>

                {/* Contact Links */}
                <div className="space-y-2.5 pt-2 text-xs">
                  <a
                    href={getPhoneHref()}
                    className="flex items-center gap-2 text-slate-200 hover:text-emerald-400 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>{SITE_CONFIG.phone}</span>
                  </a>
                  <a
                    href={getEmailHref(SITE_CONFIG.emailPrimary)}
                    className="flex items-center gap-2 text-slate-200 hover:text-emerald-400 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span>{SITE_CONFIG.emailPrimary}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Philosophy (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200/60">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Hepsen Sigorta Hakkında</span>
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
                Sektördeki karmaşık poliçe maddeleri, anlaşılması güç finansal terimler ve standart paket satışları yerine; her danışanımızın gerçek hayat beklentilerini dinliyoruz. Gelir durumunuza ve risk profilinize en uygun fon dağılımlarını belirliyor, acil durumlarda bütçenizi sarsmayacak doğru sağlık teminatlarını birlikte seçiyoruz.
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
                <span>Birebir Kişisel İletişim</span>
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
                href={getWhatsAppUrl("Merhaba, Merve Hanım ile Bireysel Emeklilik / Sigorta danışmanlığı hakkında görüşmek istiyorum.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="md" className="gap-2">
                  <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                  <span>WhatsApp&apos;tan İletişime Geç</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
