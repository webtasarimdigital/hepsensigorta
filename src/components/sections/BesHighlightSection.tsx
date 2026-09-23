import React from "react";
import Link from "next/link";
import { PiggyBank, ArrowRight, MessageCircle, CheckCircle2, TrendingUp, Sparkles, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/constants/siteConfig";

export function BesHighlightSection() {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0B1F3A] to-[#132A4D] rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-xl relative overflow-hidden">
          {/* Background shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Öne Çıkan Uzmanlık: Bireysel Emeklilik</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                Emekliliğinizi Tesadüfe Bırakmayın, Tasarruflarınızı{" "}
                <span className="text-emerald-400">Uzman Fon Yönetimiyle</span> Büyütün
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Bireysel Emeklilik Sistemi (BES), sadece para biriktirmek değil; devlet katkısı ve profesyonel portföy yönetimi ile tasarruflarınızı enflasyona karşı koruma sanatıdır. Mevcut sözleşmeniz varsa fon performansını ücretsiz inceleyelim, yeni başlayacaksanız en uygun planı kuralım.
              </p>

              {/* 4 BES Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Devlet Katkısı Gücü</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Yasal mevzuat çerçevesinde sağlanan devlet katkısı ile her birikiminiz katlanarak büyür.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
                    <PiggyBank className="w-4 h-4" />
                    <span>18 Yaş Altı Çocuklara BES</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Çocuklarınız adına bağımsız hesap açarak üniversite ve kariyer fonunu erken başlatın.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
                    <Shield className="w-4 h-4" />
                    <span>Mevcut BES İncelemesi</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Farklı kurumlardaki sözleşmelerinizin fon dağılımını uzman gözüyle değerlendiriyoruz.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Yılda 12 Fon Değişikliği</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Piyasa döngülerine göre fon dağılımınızı yılda 12 defa güncelleme imkanı sunuyoruz.
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-4">
                <Link href="/teklif-al?service=bireysel-emeklilik" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2">
                    <span>Ücretsiz Ön Görüşme Talep Et</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <a
                  href={getWhatsAppUrl("Merhaba, Hepsen Sigorta web sitesinden ulaşıyorum. Bireysel Emeklilik (BES) hakkında bilgi almak ve seçenekleri değerlendirmek istiyorum.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="whatsapp" size="lg" className="w-full sm:w-auto gap-2">
                    <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                    <span>BES Hakkında WhatsApp&apos;tan Bilgi Al</span>
                  </Button>
                </a>
              </div>
            </div>

            {/* Right Card: Practical BES Highlights (5 cols) */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15 space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3 flex items-center justify-between">
                <span>BES Sözleşmenizde Neden Biz?</span>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full">
                  Allianz Güvencesi
                </span>
              </h3>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Teknik terimlerle boğulmadan sade ve şeffaf anlatım</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Fon Yöneticisi Merve Doğan ile doğrudan birebir iletişim</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Risk toleransınıza uygun dengeli, altın veya hisse ağırlıklı fon sepeti</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Sözleşme açıldıktan sonra düzenli periyotlarla performans takibi</span>
                </li>
              </ul>

              <div className="pt-4 border-t border-white/10 text-center">
                <Link
                  href="/bireysel-emeklilik"
                  className="text-emerald-300 hover:text-emerald-200 text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 underline underline-offset-4"
                >
                  <span>Kapsamlı BES Rehberimizi İnceleyin</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
