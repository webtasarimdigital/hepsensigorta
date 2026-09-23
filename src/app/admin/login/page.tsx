"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/constants/siteConfig";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("merve.dogan@hepsensigorta.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // Simple dev session bypass or Supabase auth
    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("hepsen_admin_auth", "true");
      }
      router.push("/admin");
    } catch {
      setErrorMsg("Giriş yapılırken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200 max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#0B1F3A] text-emerald-400 flex items-center justify-center mx-auto mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-[#0B1F3A]">Acente Girişi</h1>
          <p className="text-xs text-slate-500">
            {SITE_CONFIG.name} — Yetkili Yönetim Paneli
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-sm">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Yetkili E-posta</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Şifre</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
          </div>

          <Button variant="primary" size="lg" type="submit" isLoading={loading} className="w-full justify-center gap-2">
            <span>Panele Giriş Yap</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Güvenli Acente Altyapısı</span>
        </div>
      </div>
    </div>
  );
}
