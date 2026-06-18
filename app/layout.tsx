import type { Metadata } from "next";
import Script from "next/script";
import {
  Cinzel,
  Cormorant_Garamond,
  Inter,
  Oswald,
  Space_Mono,
} from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.hebrewstreet.com";

/** Tall condensed display — full Vietnamese glyphs (Bebas Neue lacks VN on Google Fonts). */
const display = Oswald({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
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

/** Helios-style brand mark - sharp stylized serif */
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
    icon: [{ url: "/favicon.png", sizes: "512x512", type: "image/png" }],
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
  title: {
    default: "HEBREW | Local Streetwear Vietnam",
    template: "%s | HEBREW",
  },
  description:
    "HEBREW — không phải để giấu cảm xúc. Là để mặc chúng ra ngoài. Limited drop. 270GSM. Vietnam.",
  keywords: [
    "HEBREW",
    "áo heavyweight 270gsm vietnam",
    "darkwear local brand vietnam",
    "áo oversize dark aesthetic hcm",
  ],
  applicationName: "HEBREW",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "HEBREW",
    title: "HEBREW | Local Streetwear Vietnam",
    description:
      "HEBREW — không phải để giấu cảm xúc. Là để mặc chúng ra ngoài. Limited drop. 270GSM. Vietnam.",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "HEBREW | Local Streetwear Vietnam",
    description:
      "HEBREW — không phải để giấu cảm xúc. Là để mặc chúng ra ngoài. Limited drop. 270GSM. Vietnam.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HEBREW",
    url: siteUrl,
    logo: `${siteUrl}/favicon.png`,
    description:
      "HEBREW — không phải để giấu cảm xúc. Là để mặc chúng ra ngoài. Limited drop. 270GSM. Vietnam.",
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
    description:
      "HEBREW — không phải để giấu cảm xúc. Là để mặc chúng ra ngoài. Limited drop. 270GSM. Vietnam.",
    inLanguage: ["vi", "en"],
    potentialAction: {
      "@type": "ViewAction",
      target: `${siteUrl}/shop`,
    },
  };

  /** Các mục điều hướng chính (bổ sung JSON-LD) — Google có thể dùng kết hợp với liên kết nội bộ để gợi ý sitelinks. */
  const siteNavigationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "SiteNavigationElement",
        position: 1,
        name: "Cửa hàng — Shop sản phẩm",
        url: `${siteUrl}/shop`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 2,
        name: "Lookbook",
        url: `${siteUrl}/lookbook`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 3,
        name: "Giới thiệu",
        url: `${siteUrl}/about`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 4,
        name: "Câu chuyện HEBREW",
        url: `${siteUrl}/our-story`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 5,
        name: "Hệ thống cửa hàng",
        url: `${siteUrl}/stores`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 6,
        name: "Hướng dẫn chọn size",
        url: `${siteUrl}/size-guide`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 7,
        name: "Chính sách giao hàng",
        url: `${siteUrl}/delivery-policy`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 8,
        name: "Blog streetwear & thương hiệu",
        url: `${siteUrl}/blog`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 9,
        name: "Góp ý & hỗ trợ",
        url: `${siteUrl}/feedback`,
      },
    ],
  };

  return (
    <html lang="vi" suppressHydrationWarning>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-NMTNRG1R8M"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-NMTNRG1R8M');
        `}
      </Script>
      <body
        className={`${display.variable} ${spaceMono.variable} ${inter.variable} ${cinzel.variable} ${cormorant.variable} min-h-screen font-body text-hb-white antialiased`}
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
