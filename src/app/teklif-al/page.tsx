import type { Metadata } from "next";
import { Phone, MessageCircle } from "lucide-react";
import { QuickQuoteSection } from "@/components/sections/QuickQuoteSection";
import { SITE_CONFIG, getPhoneHref, getWhatsAppUrl } from "@/constants/siteConfig";

export const metadata: Metadata = {
  title: "Hızlı Teklif Al | Bireysel Emeklilik, Hayat ve Sağlık Sigortası",
  description: "Bireysel Emeklilik (BES), Hayat Sigortası, Tamamlayıcı Sağlık Sigortası teklifleri için online talep oluşturun. Hepsen Sigorta.",
};

export default function TeklifAlPage() {
  return (
    <>
      {/* Tek ve Bütünleşik Başlık + Teklif Formu */}
      <QuickQuoteSection
        showBreadcrumb
        isH1
        title="Hızlı Teklif Talebi"
        badgeText="Hızlı & Ücretsiz Ön Görüşme"
        subtitle="İhtiyacınıza en uygun BES, Hayat ve Sağlık Sigortası seçeneklerini öğrenmek için aşağıdaki adımları tamamlayınız. Fon Yöneticisi Merve Doğan ve uzman ekibimiz en uygun seçenekleri hazırlasın."
      />

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
