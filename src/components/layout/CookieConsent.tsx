"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    try {
      const consent = localStorage.getItem("hepsen_cookie_consent");
      if (!consent) {
        // Small delay so it doesn't jarringly pop up on first frame
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage unavailable
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(
        "hepsen_cookie_consent",
        JSON.stringify({ necessary: true, analytics: true, marketing: true, date: new Date().toISOString() })
      );
    } catch {}
    setVisible(false);
  };

  const handleAcceptEssential = () => {
    try {
      localStorage.setItem(
        "hepsen_cookie_consent",
        JSON.stringify({ necessary: true, analytics: false, marketing: false, date: new Date().toISOString() })
      );
    } catch {}
    setVisible(false);
  };

  const handleSaveCustom = () => {
    try {
      localStorage.setItem(
        "hepsen_cookie_consent",
        JSON.stringify({ ...preferences, necessary: true, date: new Date().toISOString() })
      );
    } catch {}
    setShowManageModal(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-6 md:right-auto md:max-w-lg z-50 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-5 shadow-2xl animate-fadeIn">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-700 shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="flex-1 text-xs text-slate-600 leading-relaxed">
            <h4 className="font-bold text-[#0B1F3A] text-sm mb-1">
              Çerez Tercihleriniz
            </h4>
            <p>
              Hepsen Sigorta olarak deneyiminizi iyileştirmek, site trafiğimizi analiz etmek ve size en uygun hizmetleri sunabilmek için yasal mevzuata uygun çerezler kullanıyoruz. Detaylar için{" "}
              <Link href="/cerez-politikasi" className="text-emerald-700 underline font-medium">
                Çerez Politikamızı
              </Link>{" "}
              inceleyebilirsiniz.
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={handleAcceptAll}
            className="text-xs py-2 px-3 flex-1 sm:flex-initial"
          >
            Tümünü Kabul Et
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleAcceptEssential}
            className="text-xs py-2 px-3 flex-1 sm:flex-initial"
          >
            Gereklileri Kabul Et
          </Button>
          <button
            type="button"
            onClick={() => setShowManageModal(true)}
            className="text-xs text-slate-500 hover:text-slate-800 underline px-2 py-1"
          >
            Tercihleri Yönet
          </button>
        </div>
      </div>

      {/* Preferences Modal */}
      {showManageModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-[#0B1F3A] text-lg">Çerez Tercihlerini Yönet</h3>
              <button
                type="button"
                onClick={() => setShowManageModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-800">Zorunlu Çerezler</span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium">
                    Her Zaman Aktif
                  </span>
                </div>
                <p className="text-slate-500">
                  Web sitesinin temel fonksiyonlarının, güvenliğinin ve formların çalışması için gereklidir.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-start justify-between gap-3">
                <div>
                  <span className="font-semibold text-slate-800 block mb-1">Analitik Çerezler</span>
                  <p className="text-slate-500">
                    Sitemizin nasıl kullanıldığını anlamamıza ve performansını artırmamıza yardımcı olur.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-start justify-between gap-3">
                <div>
                  <span className="font-semibold text-slate-800 block mb-1">Pazarlama Çerezleri</span>
                  <p className="text-slate-500">
                    Size ilgi alanlarınıza uygun bilgilendirme ve teklifler sunmamıza imkan tanır.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setShowManageModal(false)}>
                Vazgeç
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveCustom}>
                Tercihlerimi Kaydet
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
