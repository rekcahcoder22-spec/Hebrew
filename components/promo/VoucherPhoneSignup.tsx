"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function VoucherPhoneSignup({
  context,
  className = "",
}: {
  context: "checkout" | "cart";
  className?: string;
}) {
  const { t } = useLanguage();
  const [phone, setPhone] = useState("");
  const [count, setCount] = useState<number | null>(null);
  const [cap, setCap] = useState(50);
  const [campaignCode, setCampaignCode] = useState<string | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [justSucceeded, setJustSucceeded] = useState(false);
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadStats = useCallback(async () => {
    setLoadingStats(true);
    try {
      const res = await fetch("/api/vouchers/stats", { cache: "no-store" });
      if (!res.ok) throw new Error("stats");
      const data = (await res.json()) as {
        count: number;
        cap: number;
        code?: string;
      };
      setCount(data.count);
      setCap(data.cap);
      if (typeof data.code === "string" && data.code.trim()) {
        setCampaignCode(data.code.trim());
      }
    } catch {
      toast.error(t("voucher.statsError"));
      setCount(0);
    } finally {
      setLoadingStats(false);
    }
  }, [t]);

  useEffect(() => {
    void loadStats();
  }, [loadStats]);

  useEffect(() => {
    return () => {
      if (successTimer.current) clearTimeout(successTimer.current);
    };
  }, []);

  const displayCount = count ?? 0;
  const pct = Math.min(100, Math.round((displayCount / cap) * 100));

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success(t("voucher.copied"));
    } catch {
      toast.error(t("voucher.copyFail"));
    }
  };

  const submit = async () => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 9 || digits.length > 12) {
      toast.error(t("voucher.invalid"));
      return;
    }
    try {
      const res = await fetch("/api/vouchers/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: digits }),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        isNew?: boolean;
        count?: number;
        cap?: number;
        code?: string;
        error?: string;
      } | null;
      if (!res.ok || !data?.ok) {
        if (data?.error === "invalid_phone") {
          toast.error(t("voucher.invalid"));
        } else {
          toast.error(t("voucher.submitError"));
        }
        return;
      }
      setCount(data.count ?? displayCount);
      if (typeof data.cap === "number") setCap(data.cap);
      if (typeof data.code === "string" && data.code.trim()) {
        setCampaignCode(data.code.trim());
      }
      setPhone("");
      setJustSucceeded(true);
      if (successTimer.current) clearTimeout(successTimer.current);
      successTimer.current = setTimeout(() => setJustSucceeded(false), 4500);
      toast.success(
        data.isNew ? t("voucher.successNew") : t("voucher.successDup"),
      );
    } catch {
      toast.error(t("voucher.submitError"));
    }
  };

  return (
    <section
      className={`border border-hb-border bg-hb-black/40 px-3 py-3 sm:px-4 sm:py-3.5 ${className}`}
      aria-labelledby="voucher-phone-signup-title"
    >
      <h3
        id="voucher-phone-signup-title"
        className="font-body text-sm font-semibold text-hb-white"
      >
        {t("voucher.title")}
      </h3>
      <p className="mt-1.5 font-body text-[11px] leading-relaxed text-hb-white/50 sm:text-xs">
        {context === "checkout"
          ? t("voucher.hintCheckout")
          : t("voucher.hintCart")}
      </p>

      {campaignCode && !loadingStats ? (
        <div
          className={`mt-3 border px-3 py-2.5 transition-shadow duration-300 sm:px-4 ${
            justSucceeded
              ? "border-hb-red shadow-[0_0_0_1px_rgba(139,26,26,0.6)]"
              : "border-hb-border/80"
          }`}
        >
          <p className="font-body text-[10px] uppercase tracking-wider text-hb-white/45">
            {t("voucher.publicCode")}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <code className="font-mono text-base font-semibold tracking-wide text-luxury-gold sm:text-lg">
              {campaignCode}
            </code>
            <button
              type="button"
              onClick={() => void copyCode(campaignCode)}
              className="rounded border border-hb-border bg-hb-black px-2.5 py-1 font-body text-[10px] uppercase tracking-wider text-hb-white/80 transition hover:border-hb-red hover:text-hb-white"
            >
              {t("voucher.copy")}
            </button>
          </div>
        </div>
      ) : null}

      <p className="mt-2 border-l-2 border-hb-red/80 pl-2.5 font-body text-[11px] leading-relaxed text-hb-white/60 sm:text-xs">
        {t("voucher.whereCodeSent")}
      </p>
      <div className="mt-3 flex gap-0">
        <input
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t("voucher.placeholder")}
          className="min-w-0 flex-1 border border-hb-border border-r-0 bg-hb-black px-2.5 py-2 font-body text-sm text-hb-white outline-none placeholder:text-hb-white/30 focus:border-hb-red sm:px-3"
        />
        <button
          type="button"
          onClick={() => void submit()}
          className="shrink-0 bg-hb-red px-3 py-2 font-body text-[11px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-hb-red/90 sm:px-4 sm:text-xs"
        >
          {t("voucher.cta")}
        </button>
      </div>
      <div className="mt-3">
        <div
          className="h-1 overflow-hidden rounded-full bg-hb-border"
          role="progressbar"
          aria-valuenow={displayCount}
          aria-valuemin={0}
          aria-valuemax={cap}
          aria-label={t("voucher.progress", { current: displayCount, cap })}
        >
          <div
            className="h-full rounded-full bg-hb-red transition-[width] duration-500"
            style={{ width: `${loadingStats ? 0 : pct}%` }}
          />
        </div>
        <p className="mt-1.5 font-body text-[10px] text-hb-white/40 sm:text-[11px]">
          {loadingStats
            ? "…"
            : t("voucher.progress", { current: displayCount, cap })}
        </p>
      </div>
    </section>
  );
}
