import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { SITE_CONFIG } from "@/constants/siteConfig";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B1F3A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.meta.url),
  title: {
    default: SITE_CONFIG.meta.title,
    template: "%s | Hepsen Sigorta",
  },
  description: SITE_CONFIG.meta.description,
  keywords: SITE_CONFIG.meta.keywords,
  authors: [{ name: SITE_CONFIG.personName }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_CONFIG.meta.url,
    title: SITE_CONFIG.meta.title,
    description: SITE_CONFIG.meta.description,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.meta.title,
    description: SITE_CONFIG.meta.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": SITE_CONFIG.name,
    "legalName": SITE_CONFIG.legalName,
    "alternateName": "Allianz Yetkili Acentesi Hepsen Sigorta",
    "description": SITE_CONFIG.meta.description,
    "url": SITE_CONFIG.meta.url,
    "telephone": `+${SITE_CONFIG.phoneRaw}`,
    "email": SITE_CONFIG.emailPrimary,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SITE_CONFIG.address.line1,
      "addressLocality": SITE_CONFIG.address.district,
      "addressRegion": SITE_CONFIG.address.city,
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.9754,
      "longitude": 29.0963
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:30"
    },
    "founder": {
      "@type": "Person",
      "name": SITE_CONFIG.personName,
      "jobTitle": SITE_CONFIG.personTitle
    }
  };

  return (
    <html lang="tr" className={`${inter.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased text-[#172033] bg-white selection:bg-emerald-100 selection:text-emerald-900">
        <TopBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileBottomNav />
        <FloatingWhatsApp />
        <CookieConsent />
      </body>
    </html>
  );
}
