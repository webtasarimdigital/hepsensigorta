"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ShieldCheck, ArrowRight, Building, FileText } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { SITE_CONFIG } from "@/constants/siteConfig";

export function Footer() {
  const { settings, getPhoneHref, getLandlineHref, getEmailHref } = useSiteSettings();

  return (
    <footer className="bg-[#0B1F3A] text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand Info & Allianz Badge (2 cols wide on large screens) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" size="md" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {settings.name}, Bireysel Emeklilik Sistemi (BES), Hayat Sigortası, Sağlık Sigortası ve Tasarruf Planlaması alanlarında bireye ve aileye özel çözümler sunan Allianz Yetkili Acentesidir.
            </p>

            {/* Allianz Authorized Agency Card */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 max-w-sm flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-semibold text-white block mb-0.5">
                  Allianz Yetkili Acentesi
                </span>
                <span className="text-slate-400">
                  {SITE_CONFIG.allianzBadge.description}
                </span>
              </div>
            </div>

            {/* Consultant Info */}
            <div className="text-xs text-slate-400 pt-1">
              <span className="text-white font-medium">{settings.personName}</span> — {settings.personTitle}
            </div>
          </div>

          {/* Column 2: Hizmetlerimiz */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              Hizmetlerimiz
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/bireysel-emeklilik"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>Bireysel Emeklilik (BES)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/hayat-sigortasi"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>Hayat Sigortası</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/saglik-sigortasi"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>Sağlık Sigortası (TSS / ÖSS)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/finansal-danismanlik"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>Finansal Danışmanlık</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/teklif-al"
                  className="text-emerald-400 font-medium hover:underline flex items-center gap-1.5 pt-1"
                >
                  <ArrowRight className="w-3 h-3 text-emerald-400" />
                  <span>Hızlı Teklif Talebi</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Kurumsal & Rehber */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              Kurumsal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/hakkimizda" className="hover:text-emerald-400 transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-emerald-400 transition-colors">
                  Sigorta & BES Rehberi (Blog)
                </Link>
              </li>
              <li>
                <Link href="/duyurular" className="hover:text-emerald-400 transition-colors">
                  Duyurular & Kampanyalar
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="hover:text-emerald-400 transition-colors">
                  İletişim & Ulaşım
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-slate-500 hover:text-slate-400 transition-colors text-xs">
                  Acente Yönetim Paneli
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: İletişim & Adres */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              İletişim
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span className="text-slate-400 text-xs leading-relaxed">
                  {settings.addressFull}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={getPhoneHref()}
                  className="text-white hover:text-emerald-400 transition-colors font-medium text-xs sm:text-sm"
                >
                  {settings.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <a
                  href={getLandlineHref()}
                  className="text-slate-300 hover:text-white transition-colors text-xs"
                >
                  Sabit / Çağrı: {settings.landline}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={getEmailHref(settings.emailPrimary)}
                  className="text-slate-300 hover:text-emerald-400 transition-colors text-xs truncate max-w-[200px]"
                >
                  {settings.emailPrimary}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-400 text-xs">
                  {settings.workingHours}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Official Agency Registry & Levha Information */}
        <div className="pt-8 pb-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">
                  Resmi Yetkili Acente Sicil & Levha Bilgileri
                </span>
                <span className="text-[11px] text-slate-400">
                  {settings.legalName} • Allianz Sigorta A.Ş. & Allianz Hayat ve Emeklilik A.Ş. Yetkili Acentesidir
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
              {settings.tobbLevhaNo && (
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">TOBB Levha No:</span>
                  <span className="font-bold text-white tracking-wide bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                    {settings.tobbLevhaNo}
                  </span>
                </div>
              )}
              {settings.vergiDairesi && (
                <div className="flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-slate-400">Vergi Dairesi & No:</span>
                  <span className="font-semibold text-white">
                    {settings.vergiDairesi}
                  </span>
                </div>
              )}
              {settings.mersisNo && (
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-slate-400">MERSİS:</span>
                  <span className="font-mono text-white">
                    {settings.mersisNo}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer */}
        <div className="py-6 border-b border-slate-800/80 text-[11px] text-slate-400/90 leading-relaxed">
          <p>
            <strong>Yasal Bilgilendirme:</strong> {settings.legalName}, Allianz Sigorta A.Ş. ve Allianz Hayat ve Emeklilik A.Ş. yetkili acentesidir. Bu sitede sunulan Bireysel Emeklilik, Hayat ve Sağlık sigortası içerikleri genel bilgilendirme amaçlı olup nihai teminatlar poliçe özel ve genel şartlarında belirtilmiştir. Sitede yer alan tasarruf ve bütçe planlaması içerikleri Sermaye Piyasası Kurulu mevzuatı uyarınca yatırım danışmanlığı veya portföy yöneticiliği faaliyeti teşkil etmez.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Legal Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 {settings.name}. Tüm hakları saklıdır.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/kvkk" className="hover:text-white transition-colors">
              KVKK Aydınlatma Metni
            </Link>
            <Link href="/gizlilik-politikasi" className="hover:text-white transition-colors">
              Gizlilik Politikası
            </Link>
            <Link href="/cerez-politikasi" className="hover:text-white transition-colors">
              Çerez Politikası
            </Link>
            <Link href="/kullanim-kosullari" className="hover:text-white transition-colors">
              Kullanım Koşulları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
