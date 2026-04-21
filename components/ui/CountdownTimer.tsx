"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const { t } = useLanguage();
  const target = useMemo(() => new Date(targetDate).getTime(), [targetDate]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  const units = [
    { num: pad2(d), suffix: "D", label: t("countdown.days") },
    { num: pad2(h), suffix: "H", label: t("countdown.hours") },
    { num: pad2(m), suffix: "M", label: t("countdown.minutes") },
    { num: pad2(s), suffix: "S", label: t("countdown.seconds") },
  ] as const;

  return (
    <div className="flex flex-wrap items-end justify-center gap-1 sm:gap-2">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-end gap-1 sm:gap-2">
          {i > 0 && (
            <span
              className="select-none pb-3 font-display text-3xl text-white/40 sm:pb-4 sm:text-5xl"
              aria-hidden
            >
              :
            </span>
          )}
          <div className="flex flex-col items-center">
            <div className="flex items-baseline rounded bg-hb-black/20 px-3 py-2 sm:px-4 sm:py-2">
              <span className="font-display text-5xl leading-none text-white sm:text-6xl">
                {u.num}
              </span>
              <span className="font-display text-3xl leading-none text-white sm:text-5xl">
                {u.suffix}
              </span>
            </div>
            <span className="mt-1 font-body text-xs uppercase tracking-widest text-white/70">
              {u.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
