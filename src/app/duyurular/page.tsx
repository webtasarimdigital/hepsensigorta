import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Bell, Calendar, Sparkles, ChevronRight, MessageCircle, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/constants/siteConfig";
import { getPublicAnnouncementsAction } from "@/app/actions/announcementActions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Duyurular & Kampanyalar | Hepsen Sigorta",
  description: "Bireysel Emeklilik mevzuat değişiklikleri, sağlık sigortası aile kampanyaları ve güncel duyurular.",
};

export default async function DuyurularPage() {
  const announcements = await getPublicAnnouncementsAction();

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
          {announcements.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 sm:p-16 border border-slate-200 text-center max-w-xl mx-auto space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <Bell className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-[#0B1F3A]">Aktif Duyuru Bulunmuyor</h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Şu anda yayında olan bir kampanya veya mevzuat duyurusu bulunmamaktadır. Güncel fırsatlar için bizi takipte kalın.
              </p>
              <div className="pt-2">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  <span>Ana Sayfaya Dön</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            announcements.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow scroll-mt-24 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(item.created_at).toLocaleDateString("tr-TR")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-0.5 rounded-full text-[11px]">
                      {item.badge}
                    </span>
                    {item.is_featured && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Önemli Bilgilendirme</span>
                      </span>
                    )}
                  </div>
                </div>

                {item.image && (
                  <div className="relative w-full h-52 sm:h-72 rounded-2xl overflow-hidden bg-slate-100 my-2">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      unoptimized={true}
                    />
                  </div>
                )}

                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A]">
                  {item.title}
                </h2>

                {item.content.includes("<") ? (
                  <div
                    className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed [&_blockquote]:border-l-4 [&_blockquote]:border-emerald-500 [&_blockquote]:bg-emerald-50/50 [&_blockquote]:p-3 [&_blockquote]:rounded-r-xl [&_blockquote]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#0B1F3A] [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-[#0B1F3A] [&_h4]:text-base [&_h4]:font-semibold [&_img]:rounded-xl [&_img]:max-w-full [&_img]:my-3"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                ) : (
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {item.content}
                  </p>
                )}

                {item.link && (
                  <div className="pt-1">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline"
                    >
                      <span>İlgili Bağlantıya Git</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-slate-500 font-medium">Hepsen Sigorta Acente Duyurusu</span>
                  <a
                    href={getWhatsAppUrl(`Merhaba, "${item.title}" başlıklı duyurunuz hakkında bilgi almak istiyorum.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="whatsapp" size="sm" className="gap-2">
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Bu Konuda Bilgi Al</span>
                    </Button>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
