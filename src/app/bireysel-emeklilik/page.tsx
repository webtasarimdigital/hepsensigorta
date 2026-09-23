import type { Metadata } from "next";
import Link from "next/link";
import {
  PiggyBank,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  FileCheck,
  Sparkles,
} from "lucide-react";
import { SERVICES } from "@/constants/services";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { QuickQuoteSection } from "@/components/sections/QuickQuoteSection";
import { getWhatsAppUrl } from "@/constants/siteConfig";

const service = SERVICES.find((s) => s.slug === "bireysel-emeklilik")!;

export const metadata: Metadata = {
  title: "Bireysel Emeklilik Sistemi (BES) Danışmanlığı",
  description: "Devlet katkısı avantajı, 18 yaş altı çocuklara BES ve uzman fon dağılım danışmanlığı ile geleceğinizi güvenceye alın. Allianz Yetkili Acentesi Hepsen Sigorta.",
  keywords: [
    "Bireysel Emeklilik Sistemi",
    "BES Danışmanlığı",
    "Devlet Katkısı",
    "18 Yaş Altı BES",
    "Allianz BES",
    "Kadıköy BES",
    "Kozyatağı Bireysel Emeklilik",
    "Fon Dağılımı Değişikliği",
  ],
};

export default function BireyselEmeklilikPage() {
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
            "name": "Bireysel Emeklilik",
            "item": "https://hepsensigorta.com/bireysel-emeklilik"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Bireysel Emeklilik Sistemi (BES) Danışmanlığı",
        "serviceType": "Bireysel Emeklilik",
        "provider": {
          "@type": "InsuranceAgency",
          "name": "Hepsen Sigorta",
          "url": "https://hepsensigorta.com"
        },
        "description": "Devlet katkısı avantajı, 18 yaş altı çocuklara BES ve uzman fon dağılım danışmanlığı.",
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
            <span className="text-emerald-400 font-medium">Bireysel Emeklilik</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                <PiggyBank className="w-4 h-4" />
                <span>Gelecek Planlaması & Tasarruf Disiplini</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                {service.heroDescription}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
                <Link href="/teklif-al?service=bireysel-emeklilik" className="w-full sm:w-auto">
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

            {/* Quick Overview Pill Card */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-white/15 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-300">Allianz Güvencesi</div>
                  <div className="text-sm font-bold text-white">Resmi Yetkili Acente</div>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Yasal mevzuat oranında devlet katkısı</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>18 yaşından küçük çocuklar için bağımsız hesap</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Yılda 12 kez fon dağılımı güncelleme</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Mevcut BES sözleşmelerini ücretsiz inceleme</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section: Detailed Features */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Key Highlights Grid */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Sistemin Avantajları
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">
                Neden Bireysel Emeklilik?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.keyHighlights.map((hl, i) => (
                <div
                  key={i}
                  className="p-6 sm:p-7 rounded-2xl bg-[#F6F8FA] border border-slate-200/80 hover:border-emerald-500/40 transition-all"
                >
                  <h3 className="text-lg font-bold text-[#0B1F3A] mb-2">
                    {hl.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {hl.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Who is it for? */}
          <div className="bg-[#0B1F3A] rounded-3xl p-8 sm:p-12 text-white">
            <div className="max-w-3xl space-y-6">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Hedef Kitle
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Bireysel Emeklilik Kimler İçin İdealdir?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {service.whoIsItFor.map((w, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-200 leading-snug">{w}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Başvuru ve Takip
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">
                BES Süreci Nasıl İşler?
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
          <div className="max-w-3xl mx-auto pt-6">
            <div className="text-center mb-8 space-y-2">
              <h2 className="text-2xl font-extrabold text-[#0B1F3A]">
                Bireysel Emeklilik Hakkında Sıkça Sorulan Sorular
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Aklınıza takılan sorular ve detaylı yanıtlar
              </p>
            </div>
            <Accordion items={service.faqs} defaultOpenIndex={0} />
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <QuickQuoteSection defaultService="Bireysel Emeklilik" />
    </>
  );
}
