import type { Metadata } from "next";
import Link from "next/link";
import { Bell, Calendar, Sparkles, ChevronRight, MessageCircle, ArrowRight } from "lucide-react";
import { DEMO_ANNOUNCEMENTS } from "@/constants/demoData";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/constants/siteConfig";

export const metadata: Metadata = {
  title: "Duyurular & Kampanyalar | Hepsen Sigorta",
  description: "Bireysel Emeklilik mevzuat değişiklikleri, sağlık sigortası aile kampanyaları ve güncel duyurular.",
};

export default function DuyurularPage() {
  const announcements = DEMO_ANNOUNCEMENTS;

  return (
    <>
      <section className="bg-gradient-to-b from-[#0B1F3A] to-[#122849] text-white pt-10 pb-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-slate-300 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-emerald-400">
              Ana Sayfa
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-emerald-400 font-medium">Duyurular</span>
          </nav>

          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <Bell className="w-3.5 h-3.5" />
              <span>Güncel Bilgilendirmeler</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Duyurular & Kampanyalar
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Mevzuat düzenlemeleri, fon bilgilendirmeleri ve acentemizin güncel kampanya duyuruları.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[#F6F8FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {announcements.map((item) => (
            <div
              key={item.id}
              id={item.slug}
              className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow scroll-mt-24 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar className="w-4 h-4" />
                  <span>{item.date}</span>
                </div>
                {item.isFeatured && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Önemli Bilgilendirme</span>
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A]">
                {item.title}
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                {item.content}
              </p>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-slate-500 font-medium">Hepsen Sigorta Acente Duyurusu</span>
                <a
                  href={getWhatsAppUrl(`Merhaba, "${item.title}" başlıklı duyurunuz hakkında bilgi almak istiyorum.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="whatsapp" size="sm" className="gap-2">
                    <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                    <span>Bu Konuda Bilgi Al</span>
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
