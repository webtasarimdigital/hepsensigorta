import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { PublicShell } from "@/components/layout/PublicShell";
import { SITE_CONFIG } from "@/constants/siteConfig";
import { getSiteSettingsAction } from "@/app/actions/settingsActions";

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
  icons: {
    icon: [
      { url: "/favicon-hepsen-sigorta.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png" },
    ],
    apple: [{ url: "/favicon-hepsen-sigorta.png" }],
    shortcut: ["/favicon-hepsen-sigorta.png"],
  },
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
    images: [
      {
        url: `${SITE_CONFIG.meta.url}/logo-hepsen-sigorta.png`,
        width: 353,
        height: 266,
        alt: "Hepsen Sigorta Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.meta.title,
    description: SITE_CONFIG.meta.description,
    images: [`${SITE_CONFIG.meta.url}/logo-hepsen-sigorta.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettingsAction();

  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["InsuranceAgency", "FinancialService"],
        "@id": `${SITE_CONFIG.meta.url}/#agency`,
        "name": settings.name,
        "legalName": settings.legalName,
        "alternateName": [
          "Allianz Yetkili Acentesi Hepsen Sigorta",
          "Hepsen Sigorta Aracılık Hizmetleri",
          "Hepsen Sigorta Kadıköy"
        ],
        "slogan": settings.slogan,
        "description": SITE_CONFIG.meta.description,
        "url": SITE_CONFIG.meta.url,
        "logo": `${SITE_CONFIG.meta.url}/logo-hepsen-sigorta.png`,
        "image": `${SITE_CONFIG.meta.url}/logo-hepsen-sigorta.png`,
        "telephone": `+${settings.phoneRaw}`,
        "email": settings.emailPrimary,
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": settings.addressFull,
          "addressLocality": "Kadıköy",
          "addressRegion": "İstanbul",
          "postalCode": "34742",
          "addressCountry": "TR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 40.9754,
          "longitude": 29.0963
        },
        "hasMap": "https://maps.google.com/?q=Kozyatağı+Kadıköy+İstanbul",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:30"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Saturday"],
            "opens": "09:30",
            "closes": "14:00"
          }
        ],
        "areaServed": [
          { "@type": "City", "name": "İstanbul" },
          { "@type": "AdministrativeArea", "name": "Kadıköy" },
          { "@type": "AdministrativeArea", "name": "Kozyatağı" },
          { "@type": "Country", "name": "Türkiye" }
        ],
        "founder": {
          "@type": "Person",
          "name": settings.personName,
          "jobTitle": settings.personTitle,
          "worksFor": {
            "@id": `${SITE_CONFIG.meta.url}/#agency`
          }
        },
        "sameAs": [
          "https://instagram.com/hepsensigorta",
          `https://wa.me/${settings.whatsappRaw}`
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Hepsen Sigorta & Emeklilik Hizmetleri",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Bireysel Emeklilik Sistemi (BES)",
                "description": "Devlet katkısı avantajı, 18 yaş altı çocuklara BES ve uzman fon dağılımı danışmanlığı.",
                "url": `${SITE_CONFIG.meta.url}/bireysel-emeklilik`
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Hayat Sigortası",
                "description": "Vefat, maluliyet ve kritik hastalık risklerine karşı aile koruma güvencesi.",
                "url": `${SITE_CONFIG.meta.url}/hayat-sigortasi`
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Tamamlayıcı & Özel Sağlık Sigortası",
                "description": "Özel hastanelerde fark ücreti ödemeden modern tedavi imkanı.",
                "url": `${SITE_CONFIG.meta.url}/saglik-sigortasi`
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Finansal Planlama ve Tasarruf Danışmanlığı",
                "description": "Uzun vadeli tasarruf, bütçe ve emeklilik hedefleri planlaması.",
                "url": `${SITE_CONFIG.meta.url}/finansal-danismanlik`
              }
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_CONFIG.meta.url}/#website`,
        "url": SITE_CONFIG.meta.url,
        "name": "Hepsen Sigorta",
        "description": SITE_CONFIG.meta.description,
        "publisher": {
          "@id": `${SITE_CONFIG.meta.url}/#agency`
        },
        "inLanguage": "tr-TR"
      }
    ]
  };

  return (
    <html lang="tr" className={`${inter.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body className="min-h-screen font-sans antialiased text-[#172033] bg-white selection:bg-emerald-100 selection:text-emerald-900">
        <PublicShell initialSettings={settings}>{children}</PublicShell>
      </body>
    </html>
  );
}
