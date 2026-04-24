"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type IntroScreenProps = {
  onEnter: () => void;
};

const KEYFRAMES_CSS = `
@keyframes glA {
  0%, 85%, 100% { opacity: 0; transform: translateX(-3px); }
  87% { opacity: 0.9; transform: translateX(-5px); }
  90% { opacity: 0; }
}
@keyframes glB {
  0%, 85%, 100% { opacity: 0; transform: translateX(3px); }
  88% { opacity: 0.9; transform: translateX(5px); }
  91% { opacity: 0; }
}
@keyframes revealUp {
  from { clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%); }
  to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
}
@keyframes linegrow {
  to { transform: scaleX(1); }
}
@keyframes fadeCorner {
  to { opacity: 1; }
}
@keyframes loadbar {
  to { width: 100%; }
}
`;

export function IntroScreen({ onEnter }: IntroScreenProps) {
  const [exiting, setExiting] = useState(false);
  const [count, setCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCount((c) => {
        if (c >= 100) return 100;
        const step = 1 + Math.floor(Math.random() * 7);
        return Math.min(100, c + step);
      });
    }, 60);

    return () => {
      if (timerRef.current != null) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (count >= 100 && timerRef.current != null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [count]);

  const handleEnter = useCallback(() => {
    setExiting(true);
    exitTimerRef.current = setTimeout(() => {
      onEnter();
    }, 700);
  }, [onEnter]);

  useEffect(() => {
    return () => {
      if (exitTimerRef.current != null) clearTimeout(exitTimerRef.current);
    };
  }, []);

  const padded = String(count).padStart(3, "0");

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-hb-black"
      suppressHydrationWarning
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES_CSS }} />

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg,
              transparent, transparent 2px,
              rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg,
              transparent, transparent 60px,
              rgba(255,255,255,0.008) 60px, rgba(255,255,255,0.008) 61px)`,
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute left-0 right-0 top-0 z-[5] h-[2px] origin-left scale-x-0 bg-hb-red"
        style={{
          animation: "linegrow 1s ease forwards",
        }}
      />

      <div
        className="pointer-events-none absolute left-6 top-6 z-[5] h-7 w-7 border-l-[1.5px] border-t-[1.5px] border-hb-red opacity-0"
        style={{ animation: "fadeCorner 0.5s ease 0.6s forwards" }}
      />
      <div
        className="pointer-events-none absolute right-6 top-6 z-[5] h-7 w-7 border-r-[1.5px] border-t-[1.5px] border-hb-red opacity-0"
        style={{ animation: "fadeCorner 0.5s ease 0.6s forwards" }}
      />
      <div
        className="pointer-events-none absolute bottom-6 left-6 z-[5] h-7 w-7 border-b-[1.5px] border-l-[1.5px] border-hb-red opacity-0"
        style={{ animation: "fadeCorner 0.5s ease 0.6s forwards" }}
      />
      <div
        className="pointer-events-none absolute bottom-6 right-6 z-[5] h-7 w-7 border-b-[1.5px] border-r-[1.5px] border-hb-red opacity-0"
        style={{ animation: "fadeCorner 0.5s ease 0.6s forwards" }}
      />

      <div
        className="pointer-events-none absolute right-7 top-7 z-[5] font-body text-[10px] tracking-[.2em] opacity-0"
        style={{ animation: "fadeCorner 0.5s ease 0.8s forwards" }}
      >
        <span className="text-hb-red/70">{padded}</span>
        <span className="text-hb-white/20"> / 100</span>
      </div>

      <div
        className="pointer-events-none absolute bottom-7 left-7 z-[5] font-body text-[9px] uppercase tracking-[.25em] text-hb-white/20 opacity-0"
        style={{ animation: "fadeCorner 0.5s ease 0.9s forwards" }}
      >
        SS — 2026
      </div>
      <div
        className="pointer-events-none absolute bottom-7 right-7 z-[5] font-body text-[9px] uppercase tracking-[.25em] text-hb-white/20 opacity-0"
        style={{ animation: "fadeCorner 0.5s ease 0.9s forwards" }}
      >
        LOCAL BRAND
      </div>

      <div
        className={`pointer-events-none absolute inset-0 z-20 origin-top bg-hb-black transition-transform duration-700 ease-in-out ${
          exiting ? "scale-y-100" : "scale-y-0"
        }`}
      />

      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <span
          className="select-none font-display text-[clamp(120px,30vw,280px)] tracking-[.1em] text-[rgba(192,57,43,0.04)] opacity-0"
          style={{
            animation: "fadeCorner 1s ease 2s forwards",
          }}
        >
          HEBREW
        </span>
      </div>

      <div className="relative z-10 text-center">
        <div
          className="inline-block"
          style={{
            position: "relative",
            animation: "revealUp 1s cubic-bezier(0.77,0,0.18,1) 0.1s both",
          }}
        >
          <h1 className="select-none font-display text-[clamp(80px,18vw,160px)] leading-[.85] tracking-[.06em] text-hb-white">
            HEBREW
          </h1>
          <span
            aria-hidden
            className="pointer-events-none font-display text-[clamp(80px,18vw,160px)] leading-[.85] tracking-[.06em]"
            style={{
              position: "absolute",
              inset: 0,
              fontFamily: "inherit",
              fontSize: "inherit",
              lineHeight: "inherit",
              letterSpacing: "inherit",
              color: "#C0392B",
              clipPath: "polygon(0 32%, 100% 32%, 100% 50%, 0 50%)",
              transform: "translateX(-3px)",
              userSelect: "none",
              animation: "glA 5s 1.5s infinite",
            }}
          >
            HEBREW
          </span>
          <span
            aria-hidden
            className="pointer-events-none font-display text-[clamp(80px,18vw,160px)] leading-[.85] tracking-[.06em]"
            style={{
              position: "absolute",
              inset: 0,
              fontFamily: "inherit",
              fontSize: "inherit",
              lineHeight: "inherit",
              letterSpacing: "inherit",
              color: "#00d4ff",
              clipPath: "polygon(0 55%, 100% 55%, 100% 70%, 0 70%)",
              transform: "translateX(3px)",
              userSelect: "none",
              animation: "glB 5s 1.5s infinite",
            }}
          >
            HEBREW
          </span>
        </div>

        <div
          className="mt-4 flex items-center justify-center gap-4 opacity-0"
          style={{ animation: "fadeCorner 0.6s ease 0.9s forwards" }}
        >
          <div className="h-px w-10 bg-hb-red/50" />
          <p className="font-body text-[9px] uppercase tracking-[.4em] text-hb-white/40">
            ROOTED IN THE STREETS. WRITTEN IN STONE.
          </p>
          <div className="h-px w-10 bg-hb-red/50" />
        </div>

        <button
          type="button"
          onClick={handleEnter}
          className="group mt-10 inline-flex items-center gap-3 border border-hb-red/30 px-6 py-3 font-body text-[9px] uppercase tracking-[.3em] text-hb-white/50 opacity-0 transition-all duration-300 hover:border-hb-red hover:bg-hb-red hover:text-white"
          style={{ animation: "fadeCorner 0.6s ease 1.2s forwards" }}
        >
          <span>ENTER SITE</span>
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 z-[5] h-px bg-hb-red"
        style={{
          width: 0,
          animation: "loadbar 1.8s cubic-bezier(0.77,0,0.18,1) forwards",
        }}
      />
    </div>
  );
}
