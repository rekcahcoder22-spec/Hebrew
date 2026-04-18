"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";
import { useClientMounted } from "@/hooks/useClientMounted";

const links = [
  { href: "/shop", label: "SHOP" },
  { href: "/shop", label: "DROPS" },
  { href: "/lookbook", label: "LOOKBOOK" },
  { href: "/about", label: "ABOUT" },
];

function BagIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974a1.125 1.125 0 011.119 1.007z"
      />
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const totalItems = useCartStore((s) => s.getTotals().totalItems);
  const mounted = useClientMounted();
  const cartCount = mounted ? totalItems : 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <div className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-px bg-hb-red" />
      <header
        className={cn(
          "fixed left-0 right-0 top-px z-50 w-full transition-colors duration-300",
          scrolled
            ? "border-b border-hb-border bg-hb-black/95 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="font-display text-4xl tracking-[0.4em] text-hb-white"
          >
            HEBREW
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {links.map((l) => (
              <Link
                key={`${l.href}-${l.label}`}
                href={l.href}
                className="font-body text-xs uppercase tracking-widest text-hb-white/90 decoration-hb-red decoration-2 underline-offset-8 transition-colors hover:text-hb-red hover:underline"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="font-body text-xs uppercase tracking-widest text-hb-white/35 hover:text-hb-white/70"
            >
              ADMIN
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleCart}
              className="relative text-hb-white transition hover:text-hb-red"
              aria-label="Open cart"
            >
              <BagIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-hb-red px-0.5 font-body text-[9px] font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <span className="h-px w-6 bg-hb-white" />
              <span className="h-px w-6 bg-hb-white" />
              <span className="h-px w-6 bg-hb-white" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[55] bg-black/60 transition-opacity md:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!mobileOpen}
        onClick={() => setMobileOpen(false)}
      />

      <div
        className={cn(
          "fixed inset-y-0 right-0 z-[56] flex w-[min(100%,22rem)] flex-col bg-hb-black shadow-2xl transition-transform duration-300 ease-out md:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-hb-border px-5 py-4">
          <span className="font-display text-xl tracking-[0.3em] text-hb-white">
            MENU
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="font-body text-xs uppercase tracking-widest text-hb-red"
          >
            Close
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-5 py-8">
          {links.map((l) => (
            <Link
              key={`m-${l.href}-${l.label}`}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="border-b border-hb-border py-4 font-body text-sm uppercase tracking-[0.25em] text-hb-white decoration-hb-red underline-offset-8 hover:text-hb-red hover:underline"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/admin"
            onClick={() => setMobileOpen(false)}
            className="mt-auto border-t border-hb-border pt-6 font-body text-xs uppercase tracking-widest text-hb-white/40"
          >
            Admin
          </Link>
        </nav>
      </div>

      <div className="h-[calc(4rem+1px)] shrink-0" aria-hidden />
    </>
  );
}
