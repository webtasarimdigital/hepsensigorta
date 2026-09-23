import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";
import { SITE_CONFIG } from "@/constants/siteConfig";

export const metadata: Metadata = {
  title: "Kullanım Koşulları | Hepsen Sigorta",
  description: "Web sitesi kullanım koşulları ve yasal sorumluluk sınırları.",
};

export default function KullanimKosullariPage() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-emerald-700">
            Ana Sayfa
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-medium">Kullanım Koşulları</span>
        </nav>

        <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
          <div className="border-b border-slate-200 pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Yasal Şartlar</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#0B1F3A]">
              Kullanım Koşulları
            </h1>
            <p className="text-xs text-slate-500 mt-2">Son güncelleme: 2026</p>
          </div>

          <h2 className="text-xl font-bold text-[#0B1F3A] pt-4">1. Genel Bilgilendirme Niteliği</h2>
          <p>
            {SITE_CONFIG.legalName} (&ldquo;Hepsen Sigorta&rdquo;) web sitesinde yer alan tüm içerikler, hesaplama örnekleri ve rehber yazıları genel bilgilendirme amacıyla hazırlanmıştır. Nihai prim, teminat ve hak ediş şartları ilgili sigorta şirketinin (Allianz) poliçe genel ve özel şartlarında belirlenir.
          </p>

          <h2 className="text-xl font-bold text-[#0B1F3A] pt-4">2. Fikri Mülkiyet Hakları</h2>
          <p>
            Bu sitede bulunan marka logoları, grafikler, metinler ve yazılım kodları Hepsen Sigorta&apos;ya ve yetkili iş ortaklarına aittir. İzinsiz kopyalanamaz, çoğaltılamaz veya ticari amaçla kullanılamaz.
          </p>

          <h2 className="text-xl font-bold text-[#0B1F3A] pt-4">3. Sorumluluk Sınırı</h2>
          <p>
            Web sitemizdeki birikim ve bütçe planlaması içerikleri Sermaye Piyasası Kurulu (SPK) lisanslı bir yatırım danışmanlığı faaliyeti niteliği taşımamaktadır.
          </p>
        </div>
      </div>
    </div>
  );
}
