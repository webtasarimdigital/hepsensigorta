"use client";

import React, { useState } from "react";
import { Settings, Save, CheckCircle2, ShieldCheck, Building } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/constants/siteConfig";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    slogan: SITE_CONFIG.slogan,
    personName: SITE_CONFIG.personName,
    personTitle: SITE_CONFIG.personTitle,
    phone: SITE_CONFIG.phone,
    landline: SITE_CONFIG.landline,
    whatsapp: SITE_CONFIG.whatsapp,
    emailPrimary: SITE_CONFIG.emailPrimary,
    emailContact: SITE_CONFIG.emailContact,
    addressFull: SITE_CONFIG.address.full,
    workingHours: SITE_CONFIG.workingHours,
    tobbLevhaNo: SITE_CONFIG.legalInfo.tobbLevhaNo,
    vergiDairesi: SITE_CONFIG.legalInfo.vergiDairesi,
    mersisNo: SITE_CONFIG.legalInfo.mersisNo,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-[#0B1F3A]">Acente ve Firma Ayarları</h1>
          <p className="text-xs text-slate-500">
            İletişim numaralarını, adres bilgilerini ve acente levha sicil kayıtlarını tek noktadan güncelleyin.
          </p>
        </div>
        {saved && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Ayarlar Başarıyla Kaydedildi!</span>
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
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Yetkili Unvanı</label>
              <input
                type="text"
                value={settings.personTitle}
                onChange={(e) => setSettings({ ...settings, personTitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Cep Telefonu / Danışman Hattı</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Sabit / Çağrı Numarası</label>
              <input
                type="text"
                value={settings.landline}
                onChange={(e) => setSettings({ ...settings, landline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">WhatsApp Numarası</label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Birincil E-posta (Bildirimler İçin)</label>
              <input
                type="email"
                value={settings.emailPrimary}
                onChange={(e) => setSettings({ ...settings, emailPrimary: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-slate-700">Açık Ofis Adresi</label>
              <input
                type="text"
                value={settings.addressFull}
                onChange={(e) => setSettings({ ...settings, addressFull: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-slate-700">Çalışma Saatleri</label>
              <input
                type="text"
                value={settings.workingHours}
                onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Legal & Regulatory Info Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <h2 className="text-base font-bold text-[#0B1F3A] pb-3 border-b border-slate-100 flex items-center gap-2">
            <Building className="w-4 h-4 text-emerald-600" />
            <span>Yasal & Levha Sicil Bilgileri</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">TOBB Levha Sicil No</label>
              <input
                type="text"
                placeholder="Örn: G1234-XXXX"
                value={settings.tobbLevhaNo}
                onChange={(e) => setSettings({ ...settings, tobbLevhaNo: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <span className="text-[10px] text-slate-400 block">Levha numarası verildiğinde buradan girilebilir.</span>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Vergi Dairesi & No</label>
              <input
                type="text"
                placeholder="Kozyatağı V.D. / XXXXXXXXXX"
                value={settings.vergiDairesi}
                onChange={(e) => setSettings({ ...settings, vergiDairesi: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">MERSİS Numarası</label>
              <input
                type="text"
                placeholder="0XXXXXXXXXXXXXXX"
                value={settings.mersisNo}
                onChange={(e) => setSettings({ ...settings, mersisNo: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button variant="primary" size="lg" type="submit" className="gap-2">
            <Save className="w-4 h-4" />
            <span>Tüm Ayarları Güncelle</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
