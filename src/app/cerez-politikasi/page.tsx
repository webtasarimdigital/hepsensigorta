import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Cookie } from "lucide-react";

export const metadata: Metadata = {
  title: "Çerez Politikası | Hepsen Sigorta",
  description: "Web sitemizde kullanılan çerezler ve yönetim seçenekleri hakkında bilgilendirme.",
};

export default function CerezPolitikasiPage() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-emerald-700">
            Ana Sayfa
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-medium">Çerez Politikası</span>
        </nav>

        <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
          <div className="border-b border-slate-200 pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Cookie className="w-4 h-4 text-emerald-600" />
              <span>Çerez Yönetimi</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#0B1F3A]">
              Çerez Politikası
            </h1>
            <p className="text-xs text-slate-500 mt-2">Son güncelleme: 2026</p>
          </div>

          <h2 className="text-xl font-bold text-[#0B1F3A] pt-4">1. Çerez Nedir?</h2>
          <p>
            Çerezler (cookies), web sitelerini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır. Sitemizin düzgün çalışmasını sağlamak, performansını ölçmek ve tercihlerinizi hatırlamak için kullanılır.
          </p>

          <h2 className="text-xl font-bold text-[#0B1F3A] pt-4">2. Kullandığımız Çerez Türleri</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li><strong>Zorunlu Çerezler:</strong> Web sitesinin temel fonksiyonlarının ve form güvenliğinin çalışması için zorunludur.</li>
            <li><strong>Analitik Çerezler:</strong> Ziyaretçilerin siteyi nasıl kullandığını anlamamıza yardımcı olur ve performansı optimize etmemizi sağlar.</li>
            <li><strong>İşlevsel Çerezler:</strong> Dil ve çerez onay tercihlerinizi hatırlamamıza yarar.</li>
          </ul>

          <h2 className="text-xl font-bold text-[#0B1F3A] pt-4">3. Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
          <p>
            Tarayıcınızın ayarlarından dilediğiniz zaman çerezleri silebilir veya engelleyebilirsiniz. Ayrıca sitemizdeki çerez bannerı üzerinden tercihlerinizi dilediğiniz zaman güncelleyebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
