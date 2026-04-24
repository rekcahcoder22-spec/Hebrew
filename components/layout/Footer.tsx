"use client";

import Link from "next/link";

const customerCareLinks = [
  { href: "/payment-policy", label: "Payment Instructions" },
  { href: "/delivery-policy", label: "Delivery Policy" },
  { href: "/warranty-policy", label: "Warranty Policy" },
  { href: "/return-policy", label: "Return Policy" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/adjustment-fees", label: "Adjustment Fee List" },
  { href: "/feedback", label: "Feedback" },
];

const aboutLinks = [
  { href: "/our-story", label: "The Story of HEBREW" },
  { href: "/stores", label: "Store System" },
  { href: "/careers", label: "Careers" },
  { href: "/cooperate", label: "Cooperate with HEBREW" },
];

const customerLinks = [
  { href: "/care-instructions", label: "Care Instructions" },
  { href: "/size-guide", label: "Size Guide" },
  { href: "/blog", label: "Blog" },
];

const socialLinks = [
  { href: "https://www.facebook.com/hebrew.vietnam", label: "FB" },
  { href: "https://www.instagram.com/hebrew.original", label: "IG" },
  { href: "https://www.tiktok.com/@hebrew.original", label: "TK" },
  { href: "https://www.youtube.com", label: "YT" },
  { href: "https://www.pinterest.com", label: "PT" },
];

export function Footer() {
  return (
    <footer className="border-t border-blood-ink bg-void">
      <div className="grid gap-12 px-8 pb-8 pt-16 lg:grid-cols-[2fr,1fr,1fr,1fr]">
        <div>
          <p className="font-display text-5xl tracking-[.08em] text-hb-white">
            HEBREW
          </p>
          <p className="mb-6 mt-2 font-body text-[9px] uppercase tracking-[.2em] text-hb-white/30">
            ROOTED IN THE STREETS. WRITTEN IN STONE.
          </p>
          <p className="mb-6 max-w-md font-body text-xs leading-[2.2] text-hb-white/40">
            HEBREW creates unique pieces for those who dare to be different and
            worship freedom in their soul. Each product is handcrafted by
            Vietnamese hands with the desire to bring the work to the world.
          </p>
          <p className="mb-2 font-body text-[9px] uppercase tracking-[.15em] text-hb-white/30">
            SUPPORT HOTLINE
          </p>
          <p className="font-body text-xs leading-[2.4] text-hb-white/50">
            — Hanoi: 039.327.8668
            <br />
            — Ho Chi Minh: 0794.302.899
            <br />
            — Quality Feedback: 0981.956.116
          </p>
          <a
            href="mailto:support@hebrew.vn"
            className="mt-2 block font-body text-xs text-hb-red"
          >
            support@hebrew.vn
          </a>
          <div className="mt-6 flex gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 cursor-pointer items-center justify-center border border-hb-border font-body text-[9px] uppercase text-hb-white/40 transition-all hover:border-hb-red hover:text-hb-red"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-5 font-body text-[9px] uppercase tracking-[.25em] text-hb-white/30">
            CUSTOMER CARE
          </p>
          {customerCareLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block font-body text-xs leading-[2.8] text-hb-white/50 transition-colors hover:text-hb-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div>
          <p className="mb-5 font-body text-[9px] uppercase tracking-[.25em] text-hb-white/30">
            ABOUT US
          </p>
          {aboutLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block font-body text-xs leading-[2.8] text-hb-white/50 transition-colors hover:text-hb-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div>
          <p className="mb-5 font-body text-[9px] uppercase tracking-[.25em] text-hb-white/30">
            FOR CUSTOMERS
          </p>
          {customerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block font-body text-xs leading-[2.8] text-hb-white/50 transition-colors hover:text-hb-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-hb-border px-8 py-6">
        <p className="flex items-center gap-2 border border-hb-border px-3 py-1.5 font-body text-[8px] tracking-[.1em] text-hb-white/30">
          <span className="mr-2 text-hb-gold">✓</span>
          VERIFIED BY MINISTRY OF INDUSTRY AND TRADE
        </p>
        <div className="flex gap-2">
          {["COD", "MOMO", "ZALOPAY", "VNPAY", "VISA", "MC"].map((method) => (
            <span
              key={method}
              className="border border-hb-border px-2 py-1 font-body text-[7px] uppercase text-hb-white/30"
            >
              {method}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-hb-border px-8 py-5">
        <p className="font-body text-[9px] tracking-[.1em] text-hb-white/20">
          © 2025 HEBREW. ALL RIGHTS RESERVED.
        </p>
        <p className="font-body text-[9px] tracking-[.1em] text-hb-white/20">
          NO RIGHTS, ONLY DROPS.
        </p>
      </div>
    </footer>
  );
}
