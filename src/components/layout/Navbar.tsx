"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
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

const NAV_LINKS = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Bireysel Emeklilik", href: "/bireysel-emeklilik" },
  { name: "Hayat Sigortası", href: "/hayat-sigortasi" },
  { name: "Sağlık Sigortası", href: "/saglik-sigortasi" },
  { name: "Finansal Danışmanlık", href: "/finansal-danismanlik" },
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "Blog", href: "/blog" },
  { name: "İletişim", href: "/iletisim" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5"
          : "bg-white border-b border-slate-100 py-3"
      )}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        {/* Brand Logo (Clean, no extra badge button) */}
        <Logo size="md" />

        {/* Desktop Navigation (No multi-line text wrapping) */}
        <nav className="hidden xl:flex items-center gap-1 xl:gap-1.5 2xl:gap-2 shrink-0" aria-label="Ana Menü">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-2.5 2xl:px-3 py-1.5 text-xs xl:text-[13px] 2xl:text-sm font-medium rounded-lg transition-colors whitespace-nowrap",
                  isActive
                    ? "text-emerald-700 bg-emerald-50 font-bold"
                    : "text-slate-700 hover:text-[#0B1F3A] hover:bg-slate-50"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action Buttons: Instagram + WhatsApp + Hızlı Teklif Al */}
        <div className="hidden md:flex items-center gap-2 2xl:gap-2.5 shrink-0">
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

          {/* WhatsApp Direct Button */}
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-white bg-[#25D366] hover:bg-[#20BA5A] transition-all duration-200 shadow-sm shadow-[#25D366]/25 hover:scale-105"
            title="WhatsApp ile Hızlı İletişim"
            aria-label="WhatsApp ile Hızlı İletişim"
          >
            <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
          </a>

          {/* Quick Quote CTA (Never wraps) */}
          <Link href="/teklif-al" className="shrink-0">
            <Button variant="primary" size="md" className="gap-2 shadow-sm font-semibold whitespace-nowrap text-xs xl:text-sm px-4 py-2">
              <span>Hızlı Teklif Al</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Button>
          </Link>
        </div>

        {/* Mobile Header Buttons */}
        <div className="flex md:hidden items-center gap-1.5">
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
            <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
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
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-lg">
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

          <div className="grid grid-cols-1 gap-1 pt-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-2.5 rounded-lg text-base font-medium transition-colors",
                    isActive
                      ? "bg-emerald-50 text-emerald-800 font-semibold"
                      : "text-slate-800 hover:bg-slate-50"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <Link href="/teklif-al" className="w-full">
              <Button variant="primary" size="lg" className="w-full justify-center">
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
                <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                <span>WhatsApp&apos;tan Bilgi Al</span>
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
