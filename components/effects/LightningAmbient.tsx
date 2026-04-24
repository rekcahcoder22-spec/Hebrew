"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STRIKE_MIN_MS = 2000;
const STRIKE_MAX_MS = 3200;
const STRIKE_ANIM_MS = 780;

/** Full-viewport ambient lightning — ~2–3s between strikes; respects reduced motion. */
export function LightningAmbient() {
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [strikeKey, setStrikeKey] = useState(0);
  const [boltXPercent, setBoltXPercent] = useState(50);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endAnimRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerStrike = useCallback(() => {
    setBoltXPercent(18 + Math.random() * 64);
    setStrikeKey((k) => k + 1);
    setPlaying(true);
    if (endAnimRef.current) clearTimeout(endAnimRef.current);
    endAnimRef.current = setTimeout(() => {
      setPlaying(false);
      endAnimRef.current = null;
    }, STRIKE_ANIM_MS);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    setReady(true);

    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!ready || reducedMotion) return;

    const schedule = () => {
      const wait =
        STRIKE_MIN_MS + Math.random() * (STRIKE_MAX_MS - STRIKE_MIN_MS);
      timerRef.current = setTimeout(() => {
        triggerStrike();
        schedule();
      }, wait);
    };

    schedule();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (endAnimRef.current) clearTimeout(endAnimRef.current);
    };
  }, [ready, reducedMotion, triggerStrike]);

  if (!ready || reducedMotion || !playing) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[65] overflow-hidden"
      aria-hidden
    >
      <div
        key={`flash-${strikeKey}`}
        className="lightning-flash-layer absolute inset-0 bg-gradient-to-b from-sky-200/[0.07] via-transparent to-indigo-500/[0.04] mix-blend-screen"
      />
      <div
        key={`bolt-${strikeKey}`}
        className="lightning-bolt-layer absolute top-0 flex justify-center"
        style={{
          left: `${boltXPercent}%`,
          transform: "translateX(-50%)",
        }}
      >
        <svg
          viewBox="0 0 120 280"
          className="h-[min(48vh,560px)] w-[clamp(3rem,8vw,5.5rem)] text-white drop-shadow-[0_0_12px_rgba(200,230,255,0.55)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M62 2 L44 108 L72 108 L38 188 L88 142 L52 278"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-95"
          />
          <path
            d="M62 2 L44 108 L72 108 L38 188 L88 142 L52 278"
            stroke="rgba(180,210,255,0.9)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-40 blur-[1px]"
          />
        </svg>
      </div>
    </div>
  );
}
