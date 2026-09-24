"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Building,
} from "lucide-react";
import { SITE_CONFIG, getPhoneHref, getLandlineHref, getEmailHref, getWhatsAppUrl } from "@/constants/siteConfig";
import { Button } from "@/components/ui/Button";
import { submitLeadAction } from "@/app/actions/leadActions";

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    subject: "Bireysel Emeklilik",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitLeadAction({
        service: formData.subject,
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        kvkkConsent: true,
      });
      setSuccess(true);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  const handleSendViaWhatsApp = () => {
    const text = `Merhaba Hepsen Sigorta,\nAdım: ${formData.fullName || "Danışan"}\nTelefonum: ${formData.phone || "Belirtilmedi"}\nKonu: ${formData.subject}\nNotum: ${formData.message || "Bilgi almak istiyorum."}`;
    window.open(getWhatsAppUrl(text), "_blank");
  };

  return (
    <>
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#0B1F3A] to-[#122849] text-white pt-10 pb-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-slate-300 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-emerald-400">
              Ana Sayfa
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-emerald-400 font-medium">İletişim</span>
          </nav>

          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <MapPin className="w-3.5 h-3.5" />
              <span>Kadıköy Kozyatağı Ofisimiz & Kesintisiz İletişim</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Bizimle İletişime Geçin
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Bireysel Emeklilik, Hayat ve Sağlık Sigortası ihtiyaçlarınız için uzman ekibimizle dilediğiniz zaman iletişime geçebilirsiniz.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 sm:py-24 bg-[#F6F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left: Contact Info & Map (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Agency Card */}
              <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-xl font-bold text-[#0B1F3A]">{SITE_CONFIG.name}</h3>
                    <p className="text-xs text-slate-500">{SITE_CONFIG.personName} • {SITE_CONFIG.personTitle}</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Allianz Yetkili Acentesi
                  </span>
                </div>

                <div className="space-y-4 text-sm text-slate-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-slate-900">Ofis Adresi</span>
                      <span className="text-xs text-slate-600 leading-relaxed block">
                        {SITE_CONFIG.address.full}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-semibold block text-slate-900">Yetkili Telefon</span>
                      <a href={getPhoneHref()} className="text-xs text-slate-600 hover:text-emerald-700 font-medium">
                        {SITE_CONFIG.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-slate-400 shrink-0" />
                    <div>
                      <span className="font-semibold block text-slate-900">Sabit / Çağrı Hattı</span>
                      <a href={getLandlineHref()} className="text-xs text-slate-600 hover:text-emerald-700">
                        {SITE_CONFIG.landline}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-semibold block text-slate-900">E-posta</span>
                      <a href={getEmailHref(SITE_CONFIG.emailPrimary)} className="text-xs text-slate-600 hover:text-emerald-700">
                        {SITE_CONFIG.emailPrimary}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-slate-400 shrink-0" />
                    <div>
                      <span className="font-semibold block text-slate-900">Çalışma Saatleri</span>
                      <span className="text-xs text-slate-600">{SITE_CONFIG.workingHours}</span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-2 flex flex-col gap-2.5">
                  <a
                    href={getWhatsAppUrl("Merhaba, Hepsen Sigorta ile iletişime geçmek istiyorum.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="whatsapp" size="md" className="w-full justify-center gap-2">
                      <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                      <span>WhatsApp&apos;tan Randevu Al</span>
                    </Button>
                  </a>

                  <a href={getPhoneHref()}>
                    <Button variant="outline" size="md" className="w-full justify-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>Hemen Ara: {SITE_CONFIG.phone}</span>
                    </Button>
                  </a>
                </div>
              </div>

              {/* Map Box */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm text-center space-y-3">
                <div className="h-44 w-full rounded-2xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center p-4">
                  <Building className="w-8 h-8 text-emerald-600 mb-2" />
                  <span className="font-bold text-[#0B1F3A] text-xs">Baytur Kozyatağı Konutları E Blok D:3</span>
                  <span className="text-[11px] text-slate-500 mt-1">Kozyatağı Metro ve E-5 güzergahında</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Baytur+Kozyatagi+Konutlari+Kadikoy+Istanbul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Google Haritalarda Yol Tarifi Al</span>
                </a>
              </div>
            </div>

            {/* Right: Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-lg">
              {success ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="text-2xl font-black text-[#0B1F3A]">Mesajınız Bize Ulaştı!</h3>
                    <p className="text-sm text-slate-600">
                      Teşekkür ederiz. İlettiğiniz mesaj en kısa sürede danışmanımız tarafından incelenerek sizinle iletişime geçilecektir.
                    </p>
                  </div>
                  <Button variant="secondary" size="md" onClick={() => setSuccess(false)}>
                    Yeni Bir Mesaj Gönder
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-2xl font-black text-[#0B1F3A] mb-1">Bize Mesaj Gönderin</h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Sorularınızı, randevu taleplerinizi veya merak ettiklerinizi aşağıdaki formdan bize iletebilirsiniz.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700">
                        Adınız Soyadınız <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Örn: Merve Kaya"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        Telefon Numaranız <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="05XX XXX XX XX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        E-posta Adresiniz (Opsiyonel)
                      </label>
                      <input
                        type="email"
                        placeholder="ornek@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700">
                        İlgilendiğiniz Konu
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                      >
                        <option value="Bireysel Emeklilik">Bireysel Emeklilik Sistemi (BES)</option>
                        <option value="Hayat Sigortası">Hayat Sigortası</option>
                        <option value="Sağlık Sigortası">Sağlık Sigortası (TSS / ÖSS)</option>
                        <option value="Finansal Danışmanlık">Finansal Danışmanlık & Tasarruf Planı</option>
                        <option value="Diğer">Diğer Konular / Randevu</option>
                      </select>
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700">
                        Mesajınız
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Öğrenmek istediğiniz detayları kısaca yazabilirsiniz..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <Button variant="primary" size="lg" type="submit" isLoading={loading} className="w-full sm:w-auto gap-2">
                      <Send className="w-4 h-4" />
                      <span>Formu Gönder</span>
                    </Button>

                    <button
                      type="button"
                      onClick={handleSendViaWhatsApp}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 underline"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>Form Bilgilerini WhatsApp ile Gönder</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
