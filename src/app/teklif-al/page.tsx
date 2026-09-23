import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Phone, MessageCircle } from "lucide-react";
import { QuickQuoteSection } from "@/components/sections/QuickQuoteSection";
import { SITE_CONFIG, getPhoneHref, getWhatsAppUrl } from "@/constants/siteConfig";

export const metadata: Metadata = {
  title: "Hızlı Teklif Al | Bireysel Emeklilik, Hayat ve Sağlık Sigortası",
  description: "Bireysel Emeklilik (BES), Hayat Sigortası, Tamamlayıcı Sağlık Sigortası teklifleri için online talep oluşturun. Hepsen Sigorta.",
};

export default function TeklifAlPage() {
  return (
    <>
      {/* Top Banner */}
      <section className="bg-gradient-to-b from-[#0B1F3A] to-[#122849] text-white pt-10 pb-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="inline-flex items-center gap-2 text-xs text-slate-300 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-emerald-400">
              Ana Sayfa
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-emerald-400 font-medium">Hızlı Teklif</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Hızlı Teklif Talebi
          </h1>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            İhtiyacınıza en uygun BES ve sigorta seçeneklerini öğrenmek için aşağıdaki adımları tamamlayınız.
          </p>
        </div>
      </section>

      {/* Quote Form Component */}
      <QuickQuoteSection />

      {/* Fast Help Bar */}
      <section className="py-10 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <p className="text-sm text-slate-600">
            Form doldurmak yerine doğrudan bir danışmanla konuşmak mı istersiniz?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={getPhoneHref()}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0B1F3A] hover:text-emerald-700 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Telefon: {SITE_CONFIG.phone}</span>
            </a>

            <a
              href={getWhatsAppUrl("Merhaba, hızlı teklif için doğrudan yazıyorum.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#20BA5A] px-4 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>WhatsApp ile Hemen Bağlan</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
