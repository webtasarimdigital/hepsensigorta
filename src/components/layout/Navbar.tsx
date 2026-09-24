"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  ArrowRight,
  ChevronDown,
  PiggyBank,
  HeartHandshake,
  HeartPulse,
  LineChart,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { SITE_CONFIG, getWhatsAppUrl, getPhoneHref } from "@/constants/siteConfig";
import { cn } from "@/lib/utils";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const SERVICES_MENU = [
  {
    name: "Bireysel Emeklilik (BES)",
    href: "/bireysel-emeklilik",
    desc: "%30 Devlet Katkısı & Profesyonel Fon Yönetimi",
    icon: PiggyBank,
  },
  {
    name: "Hayat Sigortası",
    href: "/hayat-sigortasi",
    desc: "Aileniz ve Sevdikleriniz İçin Finansal Kalkan",
    icon: HeartHandshake,
  },
  {
    name: "Sağlık Sigortası (TSS / ÖSS)",
    href: "/saglik-sigortasi",
    desc: "Özel Hastanelerde Fark Ödemeden Güvence",
    icon: HeartPulse,
  },
  {
    name: "Finansal Danışmanlık",
    href: "/finansal-danismanlik",
    desc: "Tasarruf, Portföy & Emeklilik Planlama",
    icon: LineChart,
  },
];

const MAIN_LINKS = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "Blog", href: "/blog" },
  { name: "Duyurular", href: "/duyurular" },
  { name: "İletişim", href: "/iletisim" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  const isServicesActive = SERVICES_MENU.some((srv) => pathname === srv.href);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-white/98 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2"
          : "bg-white border-b border-slate-100 py-2.5 sm:py-3"
      )}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        {/* Brand Logo (Crisp, High-res & Prominent) */}
        <Logo size="md" />

        {/* Desktop Navigation with "Hizmetlerimiz" Dropdown */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0" aria-label="Ana Menü">
          {/* Ana Sayfa */}
          <Link
            href="/"
            className={cn(
              "px-3 py-2 text-sm font-semibold rounded-xl transition-all whitespace-nowrap",
              pathname === "/"
                ? "text-emerald-700 bg-emerald-50/90 font-bold"
                : "text-slate-700 hover:text-[#0B1F3A] hover:bg-slate-100/70"
            )}
          >
            Ana Sayfa
          </Link>

          {/* Hizmetlerimiz Dropdown Menu */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={cn(
                "px-3 py-2 text-sm font-semibold rounded-xl transition-all inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer",
                isServicesActive
                  ? "text-emerald-700 bg-emerald-50/90 font-bold"
                  : "text-slate-700 hover:text-[#0B1F3A] hover:bg-slate-100/70"
              )}
              aria-expanded={dropdownOpen}
            >
              <span>Hizmetlerimiz</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-slate-500 transition-transform duration-200",
                  dropdownOpen && "rotate-180 text-emerald-600"
                )}
              />
            </button>

            {/* Dropdown Panel */}
            {dropdownOpen && (
              <div className="absolute top-full left-0 pt-2 z-50 animate-fadeIn">
                <div className="w-[370px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-2.5 space-y-1">
                  <div className="px-3 pt-2 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Sigorta ve Emeklilik Branşları
                  </div>
                  {SERVICES_MENU.map((service) => {
                    const Icon = service.icon;
                    const isItemActive = pathname === service.href;
                    return (
                      <Link
                        key={service.href}
                        href={service.href}
                        onClick={() => setDropdownOpen(false)}
                        className={cn(
                          "flex items-start gap-3 p-2.5 rounded-xl transition-all group",
                          isItemActive
                            ? "bg-emerald-50 text-emerald-900"
                            : "hover:bg-slate-50 text-slate-800"
                        )}
                      >
                        <div
                          className={cn(
                            "p-2 rounded-lg shrink-0 transition-colors",
                            isItemActive
                              ? "bg-emerald-600 text-white"
                              : "bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white"
                          )}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold leading-tight group-hover:text-emerald-700 transition-colors">
                            {service.name}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                            {service.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}

                  <div className="pt-2 mt-1 border-t border-slate-100">
                    <Link
                      href="/teklif-al"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-50 to-slate-50 hover:from-emerald-100/80 hover:to-slate-100 text-xs font-bold text-emerald-800 transition-colors"
                    >
                      <span>Size Özel Hızlı Teklif Talebi</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Hakkımızda, Blog, Duyurular, İletişim */}
          {MAIN_LINKS.slice(1).map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-semibold rounded-xl transition-all whitespace-nowrap",
                  isActive
                    ? "text-emerald-700 bg-emerald-50/90 font-bold"
                    : "text-slate-700 hover:text-[#0B1F3A] hover:bg-slate-100/70"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action Buttons: Instagram + WhatsApp + Hızlı Teklif Al */}
        <div className="hidden md:flex items-center gap-2 xl:gap-2.5 shrink-0">
          {/* Instagram Button */}
          <a
            href={SITE_CONFIG.socialLinks.instagram || "https://instagram.com/hepsensigorta"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-slate-700 bg-slate-100 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200 border border-slate-200/80 transition-all duration-200 shadow-sm"
            title="Instagram'da Takip Edin"
            aria-label="Instagram Hesabımız"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>

          {/* WhatsApp Direct Button with authentic WhatsApp logo */}
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-white bg-[#25D366] hover:bg-[#20BA5A] transition-all duration-200 shadow-sm shadow-[#25D366]/25 hover:scale-105"
            title="WhatsApp ile Hızlı İletişim"
            aria-label="WhatsApp ile Hızlı İletişim"
          >
            <WhatsAppIcon className="w-5 h-5 fill-white" />
          </a>

          {/* Quick Quote CTA */}
          <Link href="/teklif-al" className="shrink-0">
            <Button
              variant="navy"
              size="md"
              className="gap-2 shadow-sm font-semibold whitespace-nowrap text-xs xl:text-sm px-4 py-2.5 rounded-xl"
            >
              <span>Hızlı Teklif Al</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Button>
          </Link>
        </div>

        {/* Mobile Header Buttons */}
        <div className="flex lg:hidden items-center gap-1.5">
          <a
            href={SITE_CONFIG.socialLinks.instagram || "https://instagram.com/hepsensigorta"}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-700 bg-slate-100 border border-slate-200"
            aria-label="Instagram"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-white bg-[#25D366] shadow-sm"
            aria-label="WhatsApp İletişim"
          >
            <WhatsAppIcon className="w-4 h-4 fill-white" />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Menüyü Aç/Kapat"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-fadeIn shadow-xl">
          <div className="py-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Allianz Yetkili Acentesi
            </span>
            <a
              href={getPhoneHref()}
              className="text-xs font-semibold text-[#0B1F3A] flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              {SITE_CONFIG.phone}
            </a>
          </div>

          <div className="space-y-1">
            <Link
              href="/"
              className={cn(
                "block px-3.5 py-2.5 rounded-xl text-base font-semibold transition-colors",
                pathname === "/" ? "bg-emerald-50 text-emerald-800" : "text-slate-800 hover:bg-slate-50"
              )}
            >
              Ana Sayfa
            </Link>

            {/* Mobile Services Accordion */}
            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2 space-y-1">
              <button
                type="button"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between px-2 py-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                <span>Hizmetlerimiz</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-slate-400 transition-transform",
                    mobileServicesOpen && "rotate-180"
                  )}
                />
              </button>

              {mobileServicesOpen && (
                <div className="space-y-1 pt-1">
                  {SERVICES_MENU.map((srv) => {
                    const Icon = srv.icon;
                    const isItemActive = pathname === srv.href;
                    return (
                      <Link
                        key={srv.href}
                        href={srv.href}
                        className={cn(
                          "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors",
                          isItemActive
                            ? "bg-white text-emerald-700 font-bold shadow-sm"
                            : "text-slate-700 hover:bg-white/80"
                        )}
                      >
                        <Icon className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{srv.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {MAIN_LINKS.slice(1).map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-3.5 py-2.5 rounded-xl text-base font-semibold transition-colors",
                    isActive ? "bg-emerald-50 text-emerald-800" : "text-slate-800 hover:bg-slate-50"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <Link href="/teklif-al" className="w-full">
              <Button variant="navy" size="lg" className="w-full justify-center">
                Hızlı Teklif Al
              </Button>
            </Link>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button variant="whatsapp" size="lg" className="w-full justify-center gap-2">
                <WhatsAppIcon className="w-5 h-5 fill-white" />
                <span>WhatsApp&apos;tan Bilgi Al</span>
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
