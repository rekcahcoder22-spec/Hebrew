import type { Metadata } from "next";
import {
  Bebas_Neue,
  Cinzel,
  Cormorant_Garamond,
  Inter,
  Space_Mono,
} from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hebrew.vn";
const ogImage = `${siteUrl}/icon.png`;

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-space-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300"],
  style: ["normal", "italic"],
});

/** Helios-style brand mark — sharp stylized serif */
const cinzel = Cinzel({
  subsets: ["latin", "latin-ext"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  creator: "HEBREW",
  publisher: "HEBREW",
  category: "fashion",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  title: {
    default: "HEBREW - Streetwear",
    template: "%s | HEBREW",
  },
  description:
    "HEBREW is a Vietnamese streetwear label with limited drops, handcrafted quality, and bold urban identity.",
  keywords: [
    "HEBREW",
    "Vietnamese streetwear",
    "streetwear Vietnam",
    "limited drop",
    "local brand",
  ],
  applicationName: "HEBREW",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "HEBREW",
    title: "HEBREW - Streetwear",
    description:
      "Limited drops. Handcrafted quality. Vietnamese streetwear built for the world.",
    locale: "en_US",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 1200,
        alt: "HEBREW Streetwear",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HEBREW - Streetwear",
    description:
      "Limited drops. Handcrafted quality. Vietnamese streetwear built for the world.",
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HEBREW",
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    sameAs: [
      "https://www.facebook.com/hebrew.vietnam",
      "https://www.instagram.com/hebrew.original",
      "https://www.tiktok.com/@hebrew.original",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "HEBREW",
    url: siteUrl,
    inLanguage: ["en", "vi"],
    potentialAction: {
      "@type": "ViewAction",
      target: `${siteUrl}/shop`,
    },
  };

  const siteNavigationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      { "@type": "SiteNavigationElement", position: 1, name: "Cua Hang", url: `${siteUrl}/shop` },
      { "@type": "SiteNavigationElement", position: 2, name: "Lookbook", url: `${siteUrl}/lookbook` },
      { "@type": "SiteNavigationElement", position: 3, name: "Gioi Thieu", url: `${siteUrl}/about` },
      { "@type": "SiteNavigationElement", position: 4, name: "Our Story", url: `${siteUrl}/our-story` },
    ],
  };

  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${bebas.variable} ${spaceMono.variable} ${inter.variable} ${cinzel.variable} ${cormorant.variable} min-h-screen font-body text-hb-white antialiased`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationJsonLd) }}
        />
        <AppProviders>
          <Navbar />
          <main className="text-hb-white">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
