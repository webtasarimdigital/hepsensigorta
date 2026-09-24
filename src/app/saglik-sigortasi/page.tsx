import type { Metadata } from "next";
import Link from "next/link";
import {
  HeartPulse,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
  Hospital,
  Activity,
} from "lucide-react";
import { SERVICES } from "@/constants/services";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { QuickQuoteSection } from "@/components/sections/QuickQuoteSection";
import { getWhatsAppUrl } from "@/constants/siteConfig";

const service = SERVICES.find((s) => s.slug === "saglik-sigortasi")!;

export const metadata: Metadata = {
  title: "Özel & Tamamlayıcı Sağlık Sigortası (TSS / ÖSS)",
  description: "Özel hastanelerde SGK fark ücreti ödemeden kaliteli sağlık hizmeti. Tamamlayıcı ve Özel Sağlık Sigortası teklifleri için Allianz Yetkili Acentesi Hepsen Sigorta.",
  keywords: [
    "Tamamlayıcı Sağlık Sigortası",
    "Özel Sağlık Sigortası",
    "TSS Fiyatları",
    "Allianz Sağlık Sigortası",
    "Özel Hastane Fark Ücreti",
    "Kadıköy Sağlık Sigortası",
  ],
};

export default function SaglikSigortasiPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Ana Sayfa",
            "item": "https://www.hepsensigorta.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Sağlık Sigortası",
            "item": "https://www.hepsensigorta.com/saglik-sigortasi"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Tamamlayıcı ve Özel Sağlık Sigortası (TSS / ÖSS)",
        "serviceType": "Sağlık Sigortası",
        "provider": {
          "@type": "InsuranceAgency",
          "name": "Hepsen Sigorta",
          "url": "https://www.hepsensigorta.com"
        },
        "description": "Özel hastanelerde SGK fark ücreti ödemeden modern tedavi imkanı.",
        "areaServed": "Türkiye"
      },
      {
        "@type": "FAQPage",
        "mainEntity": service.faqs.map((f) => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer,
          },
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0B1F3A] to-[#122849] text-white pt-10 pb-16 lg:pt-14 lg:pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-300 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-emerald-400">
              Ana Sayfa
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-emerald-400 font-medium">Sağlık Sigortası</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                <HeartPulse className="w-4 h-4" />
                <span>Modern Özel Hastane Güvencesi</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                {service.heroDescription}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
                <Link href="/teklif-al?service=saglik-sigortasi" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2">
                    <span>Sağlık Sigortası Teklifi Al</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <a
                  href={getWhatsAppUrl(service.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="whatsapp" size="lg" className="w-full sm:w-auto gap-2">
                    <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                    <span>WhatsApp&apos;tan Bilgi Al</span>
                  </Button>
                </a>
              </div>
            </div>

            {/* Quick Box */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-white/15 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-400">
                  <Hospital className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-300">Allianz Sağlık Ağı</div>
                  <div className="text-sm font-bold text-white">Geniş Anlaşmalı Kurumlar</div>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>SGK fark ücreti ödemeden özel hastane konforu</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Yatarak ameliyat ve oda-refakatçi %100 teminat</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Ayakta muayene, tahlil ve görüntüleme hakkı</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Aile bireylerine özel indirimli paketler</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TSS vs ÖSS Comparison Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Comparison Cards */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Doğru Poliçeyi Seçin
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">
                Tamamlayıcı Sağlık mı, Özel Sağlık mı?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Bütçenize ve tercih ettiğiniz hastanelere göre size en uygun modeli belirliyoruz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* TSS Card */}
              <div className="p-8 rounded-3xl bg-[#F6F8FA] border-2 border-emerald-500/30 relative">
                <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
                  En Çok Tercih Edilen (Ekonomik)
                </div>
                <h3 className="text-xl font-bold text-[#0B1F3A] mb-3">
                  Tamamlayıcı Sağlık Sigortası (TSS)
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  SGK güvencesi olan bireyler için tasarlanmıştır. SGK anlaşmalı özel hastanelerde muayene, tahlil ve ameliyatlarda talep edilen yüksek fark ücretlerini sıfırlar.
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Son derece uygun yıllık prim maliyeti</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Yılda 8-10 kez ayakta doktor muayenesi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Limitsiz yatarak tedavi teminatı</span>
                  </li>
                </ul>
              </div>

              {/* OSS Card */}
              <div className="p-8 rounded-3xl bg-[#0B1F3A] text-white relative">
                <div className="inline-block bg-white/10 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full mb-4 border border-white/15">
                  A+ Hastaneler & Kapsamlı
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Özel Sağlık Sigortası (ÖSS)
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  SGK şartı aranmaksızın, Acıbadem, Amerikan Hastanesi ve Memorial gibi A+ sınıfı kurumlar dahil tüm özel sağlık kurumlarında geniş teminat sağlar.
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>En geniş özel hastane ağı</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Yurt dışı tedavi ve doğum teminatı ekleme imkanı</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Yüksek limitli veya limitsiz poliçe alternatifleri</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Privacy Note: No Sensitive Health Data on Form */}
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong>KVKK ve Özel Nitelikli Sağlık Verisi Güvencesi:</strong> Web sitemizdeki formlar üzerinden geçmiş hastalıklarınız, ameliyatlarınız veya sağlık raporlarınız asla talep edilmez. Teklif sürecinde yalnızca yaş ve il bilgisiyle taslak prim çalışılır; detaylı beyanlar resmi acente yetkilimizle güvenli telefon görüşmesinde değerlendirilir.
            </div>
          </div>

          {/* FAQs */}
          <div className="max-w-3xl mx-auto pt-4">
            <div className="text-center mb-8 space-y-2">
              <h2 className="text-2xl font-extrabold text-[#0B1F3A]">
                Sağlık Sigortası Hakkında Sıkça Sorulan Sorular
              </h2>
            </div>
            <Accordion items={service.faqs} defaultOpenIndex={0} />
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <QuickQuoteSection defaultService="Sağlık Sigortası" />
    </>
  );
}
