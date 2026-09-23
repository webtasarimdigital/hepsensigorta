"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG, getWhatsAppUrl, getPhoneHref } from "@/constants/siteConfig";
import { cn } from "@/lib/utils";

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
          : "bg-white border-b border-slate-100 py-3.5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo size="md" withAllianzBadge />

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1 2xl:gap-2" aria-label="Ana Menü">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150",
                  isActive
                    ? "text-emerald-700 bg-emerald-50/80 font-semibold"
                    : "text-slate-700 hover:text-[#0B1F3A] hover:bg-slate-50"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* WhatsApp Direct Chat */}
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center p-2.5 rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            title="WhatsApp ile Hızlı İletişim"
            aria-label="WhatsApp ile Hızlı İletişim"
          >
            <MessageCircle className="w-5 h-5 fill-emerald-600 text-white" />
          </a>

          {/* Quick Quote CTA */}
          <Link href="/teklif-al">
            <Button variant="primary" size="md" className="gap-2 shadow-sm font-semibold">
              <span>Hızlı Teklif Al</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-emerald-600 bg-emerald-50"
            aria-label="WhatsApp İletişim"
          >
            <MessageCircle className="w-5 h-5 fill-emerald-600 text-white" />
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
