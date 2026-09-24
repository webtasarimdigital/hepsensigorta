"use client";

import React, { useState, useEffect } from "react";
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
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { logoutAdminAction } from "@/app/actions/adminAuthActions";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    name: "Dashboard",
    shortName: "Panel",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    name: "Teklif Talepleri",
    shortName: "Talepler",
    href: "/admin/leads",
    icon: Users,
    badge: "Yeni",
  },
  {
    name: "Blog Yönetimi",
    shortName: "Blog",
    href: "/admin/blog",
    icon: BookOpen,
  },
  {
    name: "Duyurular",
    shortName: "Duyuru",
    href: "/admin/announcements",
    icon: Bell,
  },
  {
    name: "Acente Ayarları",
    shortName: "Ayarlar",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { settings } = useSiteSettings();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Restore desktop sidebar collapsed preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem("hepsen_admin_sidebar_collapsed");
      if (saved !== null) {
        setDesktopCollapsed(saved === "true");
      }
    } catch {}
  }, []);

  const toggleDesktopSidebar = () => {
    const next = !desktopCollapsed;
    setDesktopCollapsed(next);
    try {
      localStorage.setItem("hepsen_admin_sidebar_collapsed", String(next));
    } catch {}
  };

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname]);

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

  const activeItem = NAV_ITEMS.find((n) =>
    n.exact ? pathname === n.href : pathname.startsWith(n.href)
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row text-slate-800 antialiased font-sans">
      {/* ========================================================================= */}
      {/* 1. Mobile Top Sticky Header */}
      {/* ========================================================================= */}
      <header className="lg:hidden bg-[#0B1F3A] text-white px-4 py-2.5 flex items-center justify-between border-b border-white/10 shrink-0 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 rounded-xl bg-white/10 text-emerald-400 hover:bg-white/15 active:scale-95 transition-all cursor-pointer"
            aria-label="Menüyü Aç"
            title="Menüyü Aç"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <Image
              src="/logo-hepsen-sigorta.png"
              alt="Hepsen Logo"
              width={28}
              height={26}
              className="w-7 h-auto object-contain"
            />
            <div>
              <div className="flex items-center gap-1 leading-tight">
                <span className="font-extrabold text-xs text-white tracking-tight">HEPSEN</span>
                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950 px-1 py-0.2 rounded border border-emerald-800">
                  PANEL
                </span>
              </div>
              <p className="text-[10px] text-slate-300 font-semibold truncate max-w-[130px]">
                {activeItem?.name || "Yönetim"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/15 transition-colors"
            title="Siteyi Görüntüle"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-medium">Site</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="p-2 rounded-lg bg-red-500/10 text-red-300 hover:bg-red-500/20 active:scale-95 transition-all cursor-pointer"
            title="Çıkış Yap"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. Mobile Backdrop Overlay */}
      {/* ========================================================================= */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ========================================================================= */}
      {/* 3. Admin Sidebar (Desktop Collapsible & Mobile Slide-over Drawer) */}
      {/* ========================================================================= */}
      <aside
        className={cn(
          "bg-[#0B1F3A] text-white flex flex-col justify-between shrink-0 shadow-2xl transition-all duration-300 z-50",
          // Mobile: Drawer off-canvas slide
          "fixed inset-y-0 left-0 w-72 max-w-[85vw]",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop: Static sticky column, collapsible width
          "lg:translate-x-0 lg:static lg:h-screen lg:sticky lg:top-0",
          desktopCollapsed ? "lg:w-20" : "lg:w-64"
        )}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand Header */}
          <div className={cn("p-4 border-b border-white/10", desktopCollapsed ? "lg:p-3" : "p-5")}>
            <div className="flex items-center justify-between">
              <div className={cn("flex items-center gap-3", desktopCollapsed && "lg:justify-center lg:w-full")}>
                <div className="p-2 rounded-xl bg-white/10 border border-white/15 shrink-0">
                  <Image
                    src="/logo-hepsen-sigorta.png"
                    alt="Hepsen Sigorta Logo"
                    width={36}
                    height={34}
                    className="w-8 h-auto object-contain"
                  />
                </div>
                {(!desktopCollapsed || mobileSidebarOpen) && (
                  <div className={cn("min-w-0", desktopCollapsed && "lg:hidden")}>
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-sm text-white tracking-tight">HEPSEN</span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/80">
                        PANEL
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate">
                      Acente Yönetim Portalı
                    </p>
                  </div>
                )}
              </div>

              {/* Close button for Mobile Drawer */}
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="lg:hidden p-1.5 rounded-lg bg-white/10 text-slate-300 hover:text-white"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Officer Chip */}
            {(!desktopCollapsed || mobileSidebarOpen) ? (
              <div className={cn("mt-3 p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5", desktopCollapsed && "lg:hidden")}>
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
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
            ) : (
              <div className="hidden lg:flex mt-3 justify-center" title={`${settings.personName} (${settings.personTitle})`}>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  <UserCheck className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5 text-sm font-semibold flex-1">
            {(!desktopCollapsed || mobileSidebarOpen) && (
              <div className={cn("px-3 pt-1 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400", desktopCollapsed && "lg:hidden")}>
                Yönetim Menüsü
              </div>
            )}

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
                  title={desktopCollapsed ? item.name : undefined}
                  className={cn(
                    "flex items-center rounded-xl transition-all",
                    desktopCollapsed
                      ? "lg:justify-center lg:p-2.5 px-3 py-2.5 justify-between"
                      : "justify-between px-3 py-2.5",
                    isActive
                      ? "bg-emerald-600 text-white shadow-sm font-bold"
                      : "text-slate-300 hover:text-white hover:bg-white/10 font-medium"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-white" : "text-emerald-400")} />
                    <span className={cn("truncate", desktopCollapsed && "lg:hidden")}>
                      {item.name}
                    </span>
                  </div>
                  {item.badge && (
                    <span
                      className={cn(
                        "text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider",
                        desktopCollapsed && "lg:hidden",
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
        <div className={cn("p-3 border-t border-white/10 space-y-2 bg-[#08172c]", desktopCollapsed ? "lg:p-2" : "p-4")}>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            title={desktopCollapsed ? "Siteyi Yeni Sekmede Aç" : undefined}
            className={cn(
              "flex items-center rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-colors",
              desktopCollapsed ? "lg:justify-center lg:p-2.5 px-3 py-2 justify-between" : "justify-between px-3 py-2"
            )}
          >
            <span className={cn(desktopCollapsed && "lg:hidden")}>Siteyi Yeni Sekmede Aç</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            title={desktopCollapsed ? "Güvenli Çıkış Yap" : undefined}
            className={cn(
              "w-full flex items-center rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-bold transition-colors cursor-pointer border border-red-500/20",
              desktopCollapsed ? "lg:justify-center lg:p-2.5 px-3 py-2 justify-center gap-2" : "justify-center gap-2 px-3 py-2"
            )}
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            <span className={cn(desktopCollapsed && "lg:hidden")}>
              {loggingOut ? "Çıkış Yapılıyor..." : "Güvenli Çıkış"}
            </span>
          </button>

          {/* Desktop Collapse / Expand Toggle Button in Sidebar */}
          <button
            type="button"
            onClick={toggleDesktopSidebar}
            className={cn(
              "hidden lg:flex w-full items-center rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-semibold transition-colors cursor-pointer",
              desktopCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2"
            )}
            title={desktopCollapsed ? "Menüyü Genişlet" : "Menüyü Daralt"}
          >
            <span className={cn(desktopCollapsed && "hidden")}>Sol Menüyü Daralt</span>
            {desktopCollapsed ? (
              <PanelLeftOpen className="w-4 h-4 text-emerald-400" />
            ) : (
              <PanelLeftClose className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {(!desktopCollapsed || mobileSidebarOpen) && (
            <div className={cn("pt-1 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1", desktopCollapsed && "lg:hidden")}>
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <span>Allianz Güvenli Acente Ağı</span>
            </div>
          )}
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 4. Main Admin Workspace */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
        {/* Desktop Top Header Bar */}
        <div className="hidden lg:flex items-center justify-between px-8 py-3.5 bg-white border-b border-slate-200 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleDesktopSidebar}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title={desktopCollapsed ? "Menüyü Genişlet (Görünür Yap)" : "Menüyü Daralt (Geniş Çalışma Alanı)"}
            >
              {desktopCollapsed ? (
                <PanelLeftOpen className="w-5 h-5 text-emerald-600" />
              ) : (
                <PanelLeftClose className="w-5 h-5 text-slate-600" />
              )}
            </button>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Acente Portalı
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold text-[#0B1F3A]">
              {activeItem?.name || "Panel"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <span>Siteyi Görüntüle</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 transition-colors border border-red-200 cursor-pointer"
            >
              <LogOut className="w-3 h-3 text-red-600" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>

        {/* Admin Page Content */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 pb-24 lg:pb-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 5. Mobile Bottom Navigation Bar (Thumb Reach) */}
      {/* ========================================================================= */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0B1F3A] border-t border-white/10 z-30 px-1 py-1.5 flex items-center justify-around shadow-2xl safe-area-bottom">
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
                "flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative flex-1 text-center",
                isActive
                  ? "text-emerald-400 font-bold"
                  : "text-slate-400 hover:text-white font-medium"
              )}
            >
              <div className={cn("p-1 rounded-lg transition-colors", isActive && "bg-white/10")}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
                {item.shortName}
              </span>
              {item.badge && (
                <span className="absolute top-1 right-3 w-1.5 h-1.5 rounded-full bg-emerald-400 ring-2 ring-[#0B1F3A]" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
