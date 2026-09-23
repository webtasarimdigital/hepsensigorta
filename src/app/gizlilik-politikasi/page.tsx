import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Lock } from "lucide-react";
import { SITE_CONFIG } from "@/constants/siteConfig";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Hepsen Sigorta",
  description: "Hepsen Sigorta kullanıcı gizliliği ve veri güvenliği ilkeleri.",
};

export default function GizlilikPolitikasiPage() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-emerald-700">
            Ana Sayfa
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-medium">Gizlilik Politikası</span>
        </nav>

        <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
          <div className="border-b border-slate-200 pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>Gizlilik & Güvenlik</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#0B1F3A]">
              Gizlilik Politikası
            </h1>
            <p className="text-xs text-slate-500 mt-2">Son güncelleme: 2026</p>
          </div>

          <p className="text-xs text-slate-500 italic bg-slate-50 p-4 rounded-xl border border-slate-200">
            {/* Note: Bu metin bir hukuk danışmanı tarafından sonradan kontrol edilmelidir */}
            Hepsen Sigorta olarak ziyaretçilerimizin ve danışanlarımızın kişisel gizliliğine en üst düzeyde saygı gösteriyor ve verilerinizin güvenliğini sağlıyoruz.
          </p>

          <h2 className="text-xl font-bold text-[#0B1F3A] pt-4">1. Bilgi Toplama ve Kullanımı</h2>
          <p>
            Web sitemizi ziyaret ettiğinizde yalnızca teklif formları ve iletişim kanalları aracılığıyla kendi rızanızla ilettiğiniz bilgiler işleme alınır. Özel nitelikli sağlık verileriniz web sitemiz üzerinden toplanmaz.
          </p>

          <h2 className="text-xl font-bold text-[#0B1F3A] pt-4">2. Veri Güvenliği</h2>
          <p>
            Sitemiz üzerinden paylaşılan tüm veriler SSL şifreleme sertifikası ile korunmakta ve yetkisiz erişimlere karşı endüstri standardı güvenlik önlemleri uygulanmaktadır.
          </p>

          <h2 className="text-xl font-bold text-[#0B1F3A] pt-4">3. İletişim</h2>
          <p>
            Gizlilik politikamız ile ilgili her türlü soru ve talebiniz için <strong>{SITE_CONFIG.emailPrimary}</strong> üzerinden bizimle iletişime geçebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
