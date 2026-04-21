import type { Metadata } from "next";
import { Bebas_Neue, Space_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HEBREW — Streetwear",
  description: "Sacred street. Built in silence.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bebas.variable} ${spaceMono.variable} min-h-screen bg-hb-black font-body text-hb-white antialiased`}
        suppressHydrationWarning
      >
        <AppProviders>
          <Navbar />
          <main className="bg-hb-black text-hb-white">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
