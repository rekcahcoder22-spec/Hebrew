"use client";

import { Toaster } from "sonner";
import { CartSidebar } from "@/components/layout/CartSidebar";
import { LanguageProvider } from "@/components/providers/LanguageProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Toaster richColors position="top-right" />
      {children}
      <CartSidebar />
    </LanguageProvider>
  );
}
