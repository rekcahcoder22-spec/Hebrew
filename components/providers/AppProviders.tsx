"use client";

import { Toaster } from "sonner";
import { CartSidebar } from "@/components/layout/CartSidebar";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster richColors position="top-right" />
      {children}
      <CartSidebar />
    </>
  );
}
