"use client";

import dynamic from "next/dynamic";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/components/providers/LanguageProvider";

const LightningAmbient = dynamic(
  () =>
    import("@/components/effects/LightningAmbient").then((m) => m.LightningAmbient),
  { ssr: false },
);

const CartSidebar = dynamic(
  () => import("@/components/layout/CartSidebar").then((m) => m.CartSidebar),
  { ssr: false },
);

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <LightningAmbient />
      <Toaster richColors position="top-right" />
      {children}
      <CartSidebar />
    </LanguageProvider>
  );
}
