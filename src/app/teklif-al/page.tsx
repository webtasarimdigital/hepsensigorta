import type { Metadata } from "next";
import { Phone, MessageCircle } from "lucide-react";
import { QuickQuoteSection } from "@/components/sections/QuickQuoteSection";
import { SITE_CONFIG, getPhoneHref, getWhatsAppUrl } from "@/constants/siteConfig";

export const metadata: Metadata = {
  title: "Hızlı Teklif Al | Bireysel Emeklilik, Hayat ve Sağlık Sigortası",
  description: "Bireysel Emeklilik (BES), Hayat Sigortası, Tamamlayıcı Sağlık Sigortası teklifleri için online talep oluşturun. Hepsen Sigorta.",
};

interface TeklifAlPageProps {
  searchParams?: Promise<{ service?: string }>;
}

export default async function TeklifAlPage({ searchParams }: TeklifAlPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  let initialService = "Bireysel Emeklilik";

  if (resolvedParams?.service) {
    const s = resolvedParams.service.toLowerCase();
    if (s.includes("hayat")) initialService = "Hayat Sigortası";
    else if (s.includes("saglik") || s.includes("sağlık")) initialService = "Sağlık Sigortası";
    else if (s.includes("finans") || s.includes("tasarruf")) initialService = "Finansal Danışmanlık";
    else if (s.includes("diger") || s.includes("diğer")) initialService = "Diğer / Genel Bilgi";
    else if (s.includes("bes") || s.includes("emekli")) initialService = "Bireysel Emeklilik";
  }

  return (
    <>
      {/* Sol Üst Başlıklı, Kısa Girişli ve Sayfaya Tam Oturan Hızlı Teklif Bölümü */}
      <QuickQuoteSection
        showBreadcrumb
        isH1
        align="left"
        defaultService={initialService}
        title="Hızlı Teklif Talebi"
        badgeText="Hızlı & Ücretsiz Ön Görüşme"
        subtitle="İhtiyacınıza en uygun teklifleri 2 dakikada belirleyin, uzman ekibimiz en avantajlı seçenekleri hemen hazırlasın."
      />

      {/* Fast Help Bar */}
      <section className="py-6 sm:py-7 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-slate-600 font-medium text-center sm:text-left">
            Form doldurmak yerine doğrudan danışmanımızla görüşmek ister misiniz?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={getPhoneHref()}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0B1F3A] hover:text-emerald-700 bg-white hover:bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Telefon: {SITE_CONFIG.phone}</span>
            </a>

            <a
              href={getWhatsAppUrl("Merhaba, hızlı teklif için doğrudan yazıyorum.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#20BA5A] px-4 py-2 rounded-xl transition-colors shadow-sm"
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
