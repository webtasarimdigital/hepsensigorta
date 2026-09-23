"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PiggyBank,
  HeartHandshake,
  HeartPulse,
  LineChart,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Send,
  MessageCircle,
  Phone,
  Mail,
  ShieldAlert,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { submitLeadAction } from "@/app/actions/leadActions";
import { SITE_CONFIG, getWhatsAppUrl } from "@/constants/siteConfig";

const SERVICES_LIST = [
  { id: "Bireysel Emeklilik", label: "Bireysel Emeklilik (BES)", icon: PiggyBank, desc: "Devlet katkısı ve fon yönetimi" },
  { id: "Hayat Sigortası", label: "Hayat Sigortası", icon: HeartHandshake, desc: "Aileniz için finansal kalkan" },
  { id: "Sağlık Sigortası", label: "Sağlık Sigortası (TSS / ÖSS)", icon: HeartPulse, desc: "Özel hastanelerde fark ödemeyin" },
  { id: "Finansal Danışmanlık", label: "Finansal Planlama", icon: LineChart, desc: "Tasarruf ve emeklilik planı" },
  { id: "Diğer / Genel Bilgi", label: "Diğer / Genel Bilgilendirme", icon: HelpCircle, desc: "Özel sigorta talepleriniz" },
];

export interface QuickQuoteSectionProps {
  defaultService?: string;
  showBreadcrumb?: boolean;
  isH1?: boolean;
  title?: string;
  badgeText?: string;
  subtitle?: string;
  hideHeader?: boolean;
}

export function QuickQuoteSection({
  defaultService,
  showBreadcrumb = false,
  isH1 = false,
  title,
  badgeText = "Hızlı & Ücretsiz Ön Görüşme",
  subtitle,
  hideHeader = false,
}: QuickQuoteSectionProps) {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    service: defaultService || "Bireysel Emeklilik",
    fullName: "",
    phone: "",
    email: "",
    city: "İstanbul",
    preferredContact: "WhatsApp",
    message: "",
    kvkkConsent: false,
    marketingConsent: false,
  });

  const handleNextStep1 = () => {
    if (!formData.service) {
      setErrorMsg("Lütfen ilgilendiğiniz bir hizmeti seçiniz.");
      return;
    }
    setErrorMsg(null);
    setStep(2);
  };

  const handleNextStep2 = () => {
    if (!formData.fullName || formData.fullName.trim().length < 3) {
      setErrorMsg("Lütfen adınızı ve soyadınızı eksiksiz giriniz.");
      return;
    }
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setErrorMsg("Lütfen geçerli bir telefon numarası giriniz (en az 10 hane).");
      return;
    }
    setErrorMsg(null);
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.kvkkConsent) {
      setErrorMsg("Devam etmek için KVKK Aydınlatma Metni'ni onaylamanız gerekmektedir.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await submitLeadAction({
        service: formData.service,
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        preferredContact: formData.preferredContact,
        message: formData.message,
        kvkkConsent: formData.kvkkConsent,
        marketingConsent: formData.marketingConsent,
      });

      if (res.success) {
        setSuccess(true);
      } else {
        setErrorMsg(res.error || "Talebiniz kaydedilirken bir hata oluştu.");
      }
    } catch {
      setErrorMsg("Bir bağlantı hatası oluştu. Lütfen tekrar deneyiniz veya WhatsApp ile iletişime geçiniz.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="teklif-al" className="py-16 sm:py-24 bg-[#0B1F3A] text-white relative overflow-hidden scroll-mt-12">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        {!hideHeader && (
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            {showBreadcrumb && (
              <div className="mb-2">
                <nav className="inline-flex items-center gap-2 text-xs text-slate-300" aria-label="Breadcrumb">
                  <Link href="/" className="hover:text-emerald-400 transition-colors">
                    Ana Sayfa
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-emerald-400 font-medium">Hızlı Teklif</span>
                </nav>
              </div>
            )}

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-white/15">
                {badgeText}
              </div>
            </div>

            {isH1 ? (
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                {title || "Size Özel Teklifi Birlikte Oluşturalım"}
              </h1>
            ) : (
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                {title || "Size Özel Teklifi Birlikte Oluşturalım"}
              </h2>
            )}

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {subtitle ||
                "İhtiyacınızı ve temel bilgilerinizi paylaşın; Fon Yöneticisi Merve Doğan ve uzman ekibimiz en uygun seçenekleri hazırlayıp size dönsün."}
            </p>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl text-slate-800 border border-slate-100">
          {success ? (
            /* Success State */
            <div className="text-center py-8 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-2xl font-black text-[#0B1F3A]">
                  Talebiniz Başarıyla Alındı!
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Teşekkür ederiz Sayın <strong>{formData.fullName}</strong>. <strong>{formData.service}</strong> ile ilgili teklif seçenekleriniz hazırlanarak tercih ettiğiniz iletişim kanalı üzerinden en kısa sürede sizinle paylaşılacaktır.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={getWhatsAppUrl(`Merhaba, az önce web sitenizden ${formData.service} için teklif formu doldurdum. Bilgi alabilir miyim?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="whatsapp" size="lg" className="w-full sm:w-auto gap-2">
                    <WhatsAppIcon className="w-5 h-5 fill-white" />
                    <span>WhatsApp&apos;tan Hemen Yazın</span>
                  </Button>
                </a>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    setSuccess(false);
                    setStep(1);
                  }}
                  className="w-full sm:w-auto"
                >
                  Yeni Bir Talep Gönder
                </Button>
              </div>
            </div>
          ) : (
            /* Multi-Step Wizard */
            <div>
              {/* Stepper Progress Bar */}
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-100">
                {[
                  { num: 1, label: "Hizmet Seçimi" },
                  { num: 2, label: "İletişim Bilgileri" },
                  { num: 3, label: "Onay ve Gönderim" },
                ].map((s) => (
                  <div key={s.num} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        step === s.num
                          ? "bg-[#0B1F3A] text-white ring-4 ring-emerald-500/20"
                          : step > s.num
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                    </div>
                    <span
                      className={`hidden sm:inline text-xs font-semibold ${
                        step === s.num ? "text-[#0B1F3A]" : "text-slate-400"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn">
                  <ShieldAlert className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* STEP 1: SERVICE SELECTION */}
              {step === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h3 className="text-xl font-bold text-[#0B1F3A] mb-1">
                      Hangi konuda bilgi almak istiyorsunuz?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      İhtiyacınıza en uygun sigorta ve birikim branşını seçiniz.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SERVICES_LIST.map((srv) => {
                      const Icon = srv.icon;
                      const isSelected = formData.service === srv.id;
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, service: srv.id })}
                          className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                            isSelected
                              ? "bg-emerald-50/70 border-emerald-500 shadow-sm ring-2 ring-emerald-500/20"
                              : "bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <div
                            className={`p-2.5 rounded-xl shrink-0 ${
                              isSelected ? "bg-emerald-600 text-white" : "bg-white text-slate-600 border border-slate-200"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-[#0B1F3A] leading-tight">
                              {srv.label}
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5">
                              {srv.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button variant="primary" size="lg" onClick={handleNextStep1} className="gap-2">
                      <span>Devam Et: İletişim Bilgileri</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 2: PERSONAL INFORMATION */}
              {step === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h3 className="text-xl font-bold text-[#0B1F3A] mb-1">
                      İletişim Bilgileriniz
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Teklif seçeneklerini size ulaştırabilmemiz için temel bilgilerinizi giriniz.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700">
                        Adınız ve Soyadınız <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Örn: Ahmet Yılmaz"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        Cep Telefonu Numaranız <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        inputMode="tel"
                        placeholder="05XX XXX XX XX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        E-posta Adresiniz (Opsiyonel)
                      </label>
                      <input
                        type="email"
                        inputMode="email"
                        placeholder="ornek@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                      />
                    </div>

                    {/* City */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700">
                        İkamet Ettiğiniz Şehir
                      </label>
                      <input
                        type="text"
                        placeholder="Örn: İstanbul (Kadıköy), Ankara, İzmir..."
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <Button variant="secondary" size="md" onClick={() => setStep(1)} className="gap-1.5">
                      <ArrowLeft className="w-4 h-4" />
                      <span>Geri</span>
                    </Button>
                    <Button variant="primary" size="lg" onClick={handleNextStep2} className="gap-2">
                      <span>Devam Et: Tercihler & Onay</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 3: PREFERENCES & CONSENT */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
                  <div>
                    <h3 className="text-xl font-bold text-[#0B1F3A] mb-1">
                      İletişim Tercihi ve Onay
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Sizinle nasıl iletişime geçmemizi istersiniz?
                    </p>
                  </div>

                  {/* Contact Preference Radios */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">
                      Tercih Edilen İletişim Kanalı:
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { id: "WhatsApp", label: "WhatsApp", icon: MessageCircle },
                        { id: "Telefon", label: "Telefon Görüşmesi", icon: Phone },
                        { id: "E-posta", label: "E-posta", icon: Mail },
                      ].map((ch) => {
                        const Icon = ch.icon;
                        const isSelected = formData.preferredContact === ch.id;
                        return (
                          <button
                            key={ch.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, preferredContact: ch.id })}
                            className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 text-xs font-semibold transition-all ${
                              isSelected
                                ? "bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20"
                                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            <Icon className={`w-4 h-4 ${isSelected ? "text-emerald-700" : "text-slate-500"}`} />
                            <span>{ch.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Optional Note / Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Kısaca İhtiyacınız veya Notunuz (Opsiyonel)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Örn: 2 yaşındaki çocuğum için BES açmak istiyorum / Mevcut BES sözleşmemi inceletmek istiyorum..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white resize-none"
                    />
                  </div>

                  {/* KVKK & Consent Checkboxes */}
                  <div className="space-y-3 pt-2 text-xs text-slate-600 border-t border-slate-100">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formData.kvkkConsent}
                        onChange={(e) => setFormData({ ...formData, kvkkConsent: e.target.checked })}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>
                        <Link href="/kvkk" target="_blank" className="text-emerald-700 font-semibold underline">
                          KVKK Aydınlatma Metni
                        </Link>
                        &apos;ni okudum, kişisel verilerimin bu kapsamda işlenmesini onaylıyorum. <span className="text-red-500">*</span>
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.marketingConsent}
                        onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>
                        Tarafıma sigorta ve emeklilik kampanyaları, mevzuat güncellemeleri ve bilgilendirmeler hakkında ticari elektronik ileti gönderilmesine onay veriyorum (İsteğe bağlı).
                      </span>
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                    <Button variant="secondary" size="md" type="button" onClick={() => setStep(2)} className="gap-1.5">
                      <ArrowLeft className="w-4 h-4" />
                      <span>Geri</span>
                    </Button>
                    <Button variant="primary" size="lg" type="submit" isLoading={loading} className="gap-2">
                      <Send className="w-4 h-4" />
                      <span>Talebimi Gönder</span>
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
