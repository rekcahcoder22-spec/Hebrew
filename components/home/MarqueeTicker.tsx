const MARQUEE_TEXT =
  "HEBREW — SS2025 — LIMITED DROPS — LOCALLY MADE — HANDCRAFTED — ";

export function MarqueeTicker() {
  const row = `${MARQUEE_TEXT}${MARQUEE_TEXT}`;
  return (
    <div className="overflow-hidden border-y border-hb-border bg-hb-black py-3">
      <div className="animate-marquee flex w-max whitespace-nowrap font-display text-5xl tracking-widest text-hb-white/90">
        <span className="pr-24">{row}</span>
        <span className="pr-24">{row}</span>
      </div>
    </div>
  );
}
