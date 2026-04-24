"use client";

import { Toaster } from "sonner";
import { LightningAmbient } from "@/components/effects/LightningAmbient";
import { CartSidebar } from "@/components/layout/CartSidebar";
import { LanguageProvider } from "@/components/providers/LanguageProvider";

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
