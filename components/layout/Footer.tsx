"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

const customerCareLinks = [
  { href: "/payment-policy", labelKey: "footer.paymentInstructions" },
  { href: "/delivery-policy", labelKey: "footer.deliveryPolicy" },
  { href: "/warranty-policy", labelKey: "footer.warrantyPolicy" },
  { href: "/return-policy", labelKey: "footer.returnPolicy" },
  { href: "/privacy-policy", labelKey: "footer.privacyPolicy" },
  { href: "/adjustment-fees", labelKey: "footer.adjustmentFeeList" },
  { href: "/feedback", labelKey: "footer.feedback" },
];

const aboutLinks = [
  { href: "/our-story", labelKey: "footer.storyOfHebrew" },
  { href: "/stores", labelKey: "footer.storeSystem" },
  { href: "/careers", labelKey: "footer.careers" },
  { href: "/cooperate", labelKey: "footer.cooperateWithHebrew" },
];

const customerLinks = [
  { href: "/care-instructions", labelKey: "footer.careInstructions" },
  { href: "/size-guide", labelKey: "footer.sizeGuide" },
  { href: "/blog", labelKey: "footer.blog" },
];

const socialLinks = [
  { href: "https://www.facebook.com/hebrew.vietnam", label: "FB" },
  { href: "https://www.instagram.com/hebrew.original", label: "IG" },
  { href: "https://www.tiktok.com/@hebrew.original", label: "TK" },
  { href: "https://www.youtube.com", label: "YT" },
  { href: "https://www.pinterest.com", label: "PT" },
];

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-blood-ink bg-void">
      <div className="grid gap-12 px-8 pb-8 pt-16 lg:grid-cols-[2fr,1fr,1fr,1fr]">
        <div>
          <p className="font-display text-5xl tracking-[.08em] text-hb-white">
            HEBREW
          </p>
          <p className="mb-6 mt-2 font-body text-[9px] uppercase tracking-[.2em] text-hb-white/30">
            {t("footer.tagline")}
          </p>
          <p className="mb-6 max-w-md font-body text-xs leading-[2.2] text-hb-white/40">
            {t("footer.description")}
          </p>
          <p className="mb-2 font-body text-[9px] uppercase tracking-[.15em] text-hb-white/30">
            {t("footer.supportHotline")}
          </p>
          <p className="font-body text-xs leading-[2.4] text-hb-white/50">
            — {t("footer.hotline.hanoi")}: 039.327.8668
            <br />
            — {t("footer.hotline.hcm")}: 0794.302.899
            <br />
            — {t("footer.hotline.qualityFeedback")}: 0981.956.116
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
            {t("footer.customerCare")}
          </p>
          {customerCareLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block font-body text-xs leading-[2.8] text-hb-white/50 transition-colors hover:text-hb-white"
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </div>

        <div>
          <p className="mb-5 font-body text-[9px] uppercase tracking-[.25em] text-hb-white/30">
            {t("footer.aboutUs")}
          </p>
          {aboutLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block font-body text-xs leading-[2.8] text-hb-white/50 transition-colors hover:text-hb-white"
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </div>

        <div>
          <p className="mb-5 font-body text-[9px] uppercase tracking-[.25em] text-hb-white/30">
            {t("footer.forCustomers")}
          </p>
          {customerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block font-body text-xs leading-[2.8] text-hb-white/50 transition-colors hover:text-hb-white"
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-hb-border px-8 py-6">
        <p className="flex items-center gap-2 border border-hb-border px-3 py-1.5 font-body text-[8px] tracking-[.1em] text-hb-white/30">
          <span className="mr-2 text-hb-gold">✓</span>
          {t("footer.verifiedByMinistry")}
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
          {t("footer.copyright")}
        </p>
        <p className="font-body text-[9px] tracking-[.1em] text-hb-white/20">
          {t("footer.signature")}
        </p>
      </div>
    </footer>
  );
}
