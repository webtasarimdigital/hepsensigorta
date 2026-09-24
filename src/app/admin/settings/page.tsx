"use client";

import React, { useState, useEffect } from "react";
import { Settings, Save, CheckCircle2, Building, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getSiteSettingsAction, saveSiteSettingsAction } from "@/app/actions/settingsActions";
import { SiteSettingsData, DEFAULT_SETTINGS } from "@/types/settings";
import { useSiteSettings } from "@/context/SiteSettingsContext";

export default function AdminSettingsPage() {
  const { updateSettingsState } = useSiteSettings();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [settings, setSettings] = useState<SiteSettingsData>(DEFAULT_SETTINGS);

  useEffect(() => {
    async function load() {
      try {
        const data = await getSiteSettingsAction();
        setSettings(data);
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);

    try {
      const res = await saveSiteSettingsAction(settings);
      if (res.success && res.settings) {
        setSettings(res.settings);
        updateSettingsState(res.settings);
        setSaved(true);
        setTimeout(() => setSaved(false), 4000);
      } else {
        setErrorMsg(res.error || "Ayarlar kaydedilemedi.");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Beklenmedik bir hata oluştu.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-slate-500 font-medium text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
          <span>Ayarlar yükleniyor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#0B1F3A]">Acente ve Firma Ayarları</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Canlı Senkronize
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Burada güncellediğiniz tüm acente, danışman ve levha bilgileri sitede (Header, Footer, İletişim, WhatsApp) anında dinamik olarak güncellenir.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 animate-fadeIn shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Ayarlar Başarıyla Kaydedildi!</span>
          </div>
        )}

        {errorMsg && (
          <div className="flex items-center gap-1.5 px-4 py-2 bg-rose-50 text-rose-800 text-xs font-bold rounded-xl border border-rose-200 shrink-0">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Contact Info Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <h2 className="text-base font-bold text-[#0B1F3A] pb-3 border-b border-slate-100 flex items-center gap-2">
            <Settings className="w-4 h-4 text-emerald-600" />
            <span>İletişim & Danışman Bilgileri</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Yetkili / Danışman Adı</label>
              <input
                type="text"
                value={settings.personName}
                onChange={(e) => setSettings({ ...settings, personName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
                placeholder="Örn: Merve DOĞAN"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Yetkili Unvanı</label>
              <input
                type="text"
                value={settings.personTitle}
                onChange={(e) => setSettings({ ...settings, personTitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
                placeholder="Örn: Fon Yöneticisi & Danışman"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Cep Telefonu / Danışman Hattı</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 font-mono"
                placeholder="0545 710 14 19"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Sabit / Çağrı Numarası</label>
              <input
                type="text"
                value={settings.landline}
                onChange={(e) => setSettings({ ...settings, landline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 font-mono"
                placeholder="0850 223 98 66"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">WhatsApp Numarası</label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 font-mono"
                placeholder="0545 710 14 19"
                required
              />
              <span className="text-[10px] text-slate-400 block">Sitedeki tüm WhatsApp butonları bu numaraya yönlenir.</span>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Birincil E-posta (İletişim İçin)</label>
              <input
                type="email"
                value={settings.emailPrimary}
                onChange={(e) => setSettings({ ...settings, emailPrimary: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
                placeholder="merve.dogan@hepsensigorta.com"
                required
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-slate-700">Açık Ofis Adresi</label>
              <input
                type="text"
                value={settings.addressFull}
                onChange={(e) => setSettings({ ...settings, addressFull: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
                placeholder="Kozyatağı Mah. Bayer Cad..."
                required
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-slate-700">Çalışma Saatleri</label>
              <input
                type="text"
                value={settings.workingHours}
                onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
                placeholder="Pazartesi - Cuma: 09:00 - 18:30"
                required
              />
            </div>
          </div>
        </div>

        {/* Legal & Regulatory Info Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-[#0B1F3A] flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-600" />
              <span>Resmi Acente Levha & Yasal Sicil Bilgileri</span>
            </h2>
            <span className="text-[11px] text-emerald-700 bg-emerald-50 font-semibold px-2.5 py-1 rounded-lg border border-emerald-200">
              Footer & İletişim Sayfasında Gözükür
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Aşağıdaki alanlara bilgileri girdiğinizde, sitenin alt bilgi (Footer) alanında ve iletişim sayfasında ziyaretçilerin görebileceği resmi acente tescil rozeti otomatik olarak aktif olur.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">TOBB Levha Sicil No</label>
              <input
                type="text"
                placeholder="Örn: G1234-XXXX"
                value={settings.tobbLevhaNo}
                onChange={(e) => setSettings({ ...settings, tobbLevhaNo: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 font-mono"
              />
              <span className="text-[10px] text-slate-400 block">Levha numarası girildiğinde sitede gösterilir.</span>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Vergi Dairesi & No</label>
              <input
                type="text"
                placeholder="Kozyatağı V.D. / 1234567890"
                value={settings.vergiDairesi}
                onChange={(e) => setSettings({ ...settings, vergiDairesi: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
              />
              <span className="text-[10px] text-slate-400 block">Vergi dairesi ve sicil no.</span>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">MERSİS Numarası</label>
              <input
                type="text"
                placeholder="0XXXXXXXXXXXXXXX"
                value={settings.mersisNo}
                onChange={(e) => setSettings({ ...settings, mersisNo: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 font-mono"
              />
              <span className="text-[10px] text-slate-400 block">16 haneli resmi MERSİS numarası.</span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500">
            Değişiklikler kaydedildiğinde tüm siteye anında yansır.
          </div>

          <Button
            variant="primary"
            size="lg"
            type="submit"
            disabled={saving}
            className="gap-2 px-6 shadow-md shadow-emerald-700/20"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Kaydediliyor...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Tüm Ayarları Güncelle</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
