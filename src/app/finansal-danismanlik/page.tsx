import type { Metadata } from "next";
import Link from "next/link";
import {
  LineChart,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  ShieldAlert,
  ChevronRight,
  Compass,
  Coins,
} from "lucide-react";
import { SERVICES } from "@/constants/services";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { QuickQuoteSection } from "@/components/sections/QuickQuoteSection";
import { getWhatsAppUrl } from "@/constants/siteConfig";

const service = SERVICES.find((s) => s.slug === "finansal-danismanlik")!;

export const metadata: Metadata = {
  title: "Finansal Planlama ve Tasarruf Danışmanlığı",
  description: "Uzun vadeli tasarruf planlaması, emeklilik hedefleri ve aile bütçesi risk yönetimi. Merve Doğan liderliğinde Hepsen Sigorta.",
  keywords: [
    "Finansal Danışmanlık",
    "Tasarruf Planlaması",
    "Emeklilik Planlaması",
    "BES Fon Dağılımı",
    "Kadıköy Finansal Planlama",
  ],
};

export default function FinansalDanismanlikPage() {
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
            "item": "https://hepsensigorta.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Finansal Danışmanlık",
            "item": "https://hepsensigorta.com/finansal-danismanlik"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Finansal Planlama ve Tasarruf Danışmanlığı",
        "serviceType": "Finansal Danışmanlık",
        "provider": {
          "@type": "InsuranceAgency",
          "name": "Hepsen Sigorta",
          "url": "https://hepsensigorta.com"
        },
        "description": "Uzun vadeli tasarruf planlaması, emeklilik hedefleri ve aile bütçesi risk yönetimi.",
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
            <span className="text-emerald-400 font-medium">Finansal Danışmanlık</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                <Compass className="w-4 h-4" />
                <span>Bilinçli Tasarruf & Bütüncül Risk Yönetimi</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                {service.heroDescription}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
                <Link href="/teklif-al?service=finansal-danismanlik" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2">
                    <span>Ücretsiz Ön Görüşme Talep Et</span>
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
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-300">Fon Yöneticisi Rehberliği</div>
                  <div className="text-sm font-bold text-white">Merve Doğan İle Birebir</div>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Kişisel tasarruf ve emeklilik check-up&apos;ı</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Mevcut BES sözleşmelerinin optimizasyonu</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Aile bütçesini beklenmedik risklere karşı koruma</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>İstanbul Kozyatağı veya uzaktan online görüşme</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Key Highlights Grid */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Planlama Alanları
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">
                Neler Sunuyoruz?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.keyHighlights.map((hl, i) => (
                <div
                  key={i}
                  className="p-6 sm:p-7 rounded-2xl bg-[#F6F8FA] border border-slate-200/80 hover:border-emerald-500/40 transition-all"
                >
                  <h3 className="text-lg font-bold text-[#0B1F3A] mb-2">{hl.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{hl.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Regulatory Disclaimer Banner */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm leading-relaxed flex items-start gap-3.5">
            <ShieldAlert className="w-6 h-6 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-[#0B1F3A] mb-1">Yasal Bilgilendirme ve Kapsam Sınırı</h4>
              <p>{service.disclaimer}</p>
            </div>
          </div>

          {/* Process Steps */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Görüşme Aşamaları
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">
                Danışmanlık Sürecimiz Nasıl İlerler?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.processSteps.map((s, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
                  <div className="text-2xl font-black text-emerald-600 mb-3">{s.step}</div>
                  <h3 className="text-base font-bold text-[#0B1F3A] mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="max-w-3xl mx-auto pt-4">
            <div className="text-center mb-8 space-y-2">
              <h2 className="text-2xl font-extrabold text-[#0B1F3A]">
                Finansal Danışmanlık Hakkında Sıkça Sorulan Sorular
              </h2>
            </div>
            <Accordion items={service.faqs} defaultOpenIndex={0} />
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <QuickQuoteSection defaultService="Finansal Danışmanlık" />
    </>
  );
}
