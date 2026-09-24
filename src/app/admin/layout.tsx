"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Bell,
  Settings,
  LogOut,
  ShieldCheck,
  ExternalLink,
  Menu,
  X,
  UserCheck,
} from "lucide-react";
import { logoutAdminAction } from "@/app/actions/adminAuthActions";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    name: "Teklif Talepleri",
    href: "/admin/leads",
    icon: Users,
    badge: "Yeni",
  },
  {
    name: "Blog Yönetimi",
    href: "/admin/blog",
    icon: BookOpen,
  },
  {
    name: "Duyurular",
    href: "/admin/announcements",
    icon: Bell,
  },
  {
    name: "Acente Ayarları",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { settings } = useSiteSettings();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // If on login page, render full screen without admin chrome/sidebar
  if (pathname === "/admin/login") {
    return <div className="w-full min-h-screen bg-[#071326]">{children}</div>;
  }

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logoutAdminAction();
    } catch {
      router.push("/admin/login");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row text-slate-800 antialiased font-sans">
      {/* Mobile Top Header */}
      <header className="lg:hidden bg-[#0B1F3A] text-white px-4 py-3 flex items-center justify-between border-b border-white/10 shrink-0 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2.5">
          <Image
            src="/logo-hepsen-sigorta.png"
            alt="Hepsen Logo"
            width={32}
            height={30}
            className="w-8 h-auto object-contain"
          />
          <div>
            <span className="font-extrabold text-sm text-white tracking-tight">HEPSEN</span>
            <span className="ml-1 text-[10px] font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
              PANEL
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-lg bg-white/10 text-slate-200 hover:text-white focus:outline-none"
            aria-label="Menü"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Admin Sidebar */}
      <aside
        className={cn(
          "w-full lg:w-64 bg-[#0B1F3A] text-white flex flex-col justify-between shrink-0 shadow-2xl transition-all duration-300 z-40",
          "lg:sticky lg:top-0 lg:h-screen",
          mobileSidebarOpen ? "block" : "hidden lg:flex"
        )}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/10 border border-white/15 shrink-0">
                <Image
                  src="/logo-hepsen-sigorta.png"
                  alt="Hepsen Sigorta Logo"
                  width={40}
                  height={38}
                  className="w-9 h-auto object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-base text-white tracking-tight">HEPSEN</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/80">
                    PANEL
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Acente Yönetim Portalı
                </p>
              </div>
            </div>

            {/* Officer Chip */}
            <div className="mt-4 p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-white truncate">
                  {settings.personName}
                </div>
                <div className="text-[10px] text-emerald-400 truncate">
                  {settings.personTitle}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 text-sm font-semibold flex-1">
            <div className="px-3 pt-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Yönetim Menüsü
            </div>

            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all",
                    isActive
                      ? "bg-emerald-600 text-white shadow-sm font-bold"
                      : "text-slate-300 hover:text-white hover:bg-white/10 font-medium"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-emerald-400")} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                        isActive ? "bg-white/20 text-white" : "bg-emerald-500/20 text-emerald-300"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-4 border-t border-white/10 space-y-2 bg-[#08172c]">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
          >
            <span>Siteyi Yeni Sekmede Aç</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-bold transition-colors cursor-pointer border border-red-500/20"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{loggingOut ? "Çıkış Yapılıyor..." : "Güvenli Çıkış Yap"}</span>
          </button>

          <div className="pt-2 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span>Allianz Güvenli Acente Ağı</span>
          </div>
        </div>
      </aside>

      {/* Main Admin Workspace */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
        {/* Desktop Top Header Bar */}
        <div className="hidden lg:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Acente Portalı
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold text-[#0B1F3A]">
              {NAV_ITEMS.find((n) => (n.exact ? pathname === n.href : pathname.startsWith(n.href)))?.name || "Panel"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <span>Siteyi Görüntüle</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 transition-colors border border-red-200 cursor-pointer"
            >
              <LogOut className="w-3 h-3 text-red-600" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>

        {/* Admin Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
