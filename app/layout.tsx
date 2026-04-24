import type { Metadata } from "next";
import { Bebas_Neue, Cinzel, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hebrew.vn";

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
  weight: ["300", "400", "500"],
});

/** Helios-style brand mark — sharp stylized serif */
const cinzel = Cinzel({
  subsets: ["latin", "vietnamese"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HEBREW — Vietnamese Streetwear",
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
    title: "HEBREW — Vietnamese Streetwear",
    description:
      "Limited drops. Handcrafted quality. Vietnamese streetwear built for the world.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "HEBREW — Vietnamese Streetwear",
    description:
      "Limited drops. Handcrafted quality. Vietnamese streetwear built for the world.",
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bebas.variable} ${spaceMono.variable} ${inter.variable} ${cinzel.variable} min-h-screen bg-void font-body text-hb-white antialiased`}
        suppressHydrationWarning
      >
        <AppProviders>
          <Navbar />
          <main className="bg-void text-hb-white">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
