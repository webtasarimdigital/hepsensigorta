import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Bell,
  Settings,
  LogOut,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { SITE_CONFIG } from "@/constants/siteConfig";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-800">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#0B1F3A] text-white flex flex-col justify-between shrink-0 shadow-xl">
        <div>
          {/* Brand & Title */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-black text-lg text-white">HEPSEN</span>
              <span className="font-semibold text-xs text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                PANEL
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {SITE_CONFIG.personName} • {SITE_CONFIG.personTitle}
            </p>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1 text-sm font-medium">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-400" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/admin/leads"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Teklif Talepleri</span>
            </Link>

            <Link
              href="/admin/blog"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Blog Yazıları</span>
            </Link>

            <Link
              href="/admin/announcements"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <Bell className="w-4 h-4 text-emerald-400" />
              <span>Duyurular</span>
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <Settings className="w-4 h-4 text-emerald-400" />
              <span>Acente Ayarları</span>
            </Link>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-2 text-xs">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
          >
            <span>Siteyi Görüntüle</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <div className="px-3 py-1 text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Allianz Yetkili Acentesi</span>
          </div>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
