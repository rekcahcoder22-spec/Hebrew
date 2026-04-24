"use client";

import Image from "next/image";

const noiseDataUrl =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E\")";

const STORE_LOCATIONS = [
  {
    city: "Ha Noi",
    image: "/images/locations/hanoi.png",
    note: "Flagship Atmosphere",
  },
  {
    city: "Da Nang",
    image: "/images/locations/da-nang.png",
    note: "Coastal Contrast",
  },
  {
    city: "Sai Gon",
    image: "/images/locations/sai-gon.png",
    note: "Night Energy",
  },
] as const;

export function LookbookSection() {
  return (
    <section className="border-b border-hb-border bg-hb-black px-4 pb-16 pt-8 md:px-8">
      <div className="mb-6 flex items-end justify-between">
        <p className="font-body text-[9px] uppercase tracking-[0.35em] text-hb-gold/85">
          Store Presence
        </p>
        <p className="font-body text-[9px] uppercase tracking-[0.2em] text-hb-white/35">
          Ha Noi / Sai Gon / Ho Chi Minh
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2">
        {STORE_LOCATIONS.map((location, index) => (
          <article
            key={location.city}
            className={`group relative overflow-hidden border border-hb-border bg-void ${
              index === 0
                ? "md:col-span-7 md:row-span-2 min-h-[460px]"
                : "md:col-span-5 min-h-[320px]"
            }`}
          >
            <div className="absolute inset-0">
              <Image
                src={location.image}
                alt={location.city}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-contain object-center grayscale transition duration-700 group-hover:scale-[1.02] [filter:grayscale(1)_contrast(1.12)_brightness(0.78)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(180,40,40,0.2),transparent_45%)]" />
              <div
                className="absolute inset-0 mix-blend-soft-light opacity-40"
                style={{ backgroundImage: noiseDataUrl }}
              />
            </div>

            <div className="relative z-10 flex h-full flex-col justify-end p-5">
              <p className="font-body text-[9px] uppercase tracking-[0.28em] text-hb-gold/80">
                {location.note}
              </p>
              <p className="mt-2 font-display text-3xl tracking-[0.1em] text-hb-white md:text-4xl">
                {location.city}
              </p>
              <div className="mt-3 h-px w-16 bg-hb-gold/65 transition-all duration-500 group-hover:w-24" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
