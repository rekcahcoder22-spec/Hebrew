import Link from "next/link";
import { cn } from "@/lib/utils";

export function LookbookSection() {
  return (
    <section className="grid border-b border-hb-border md:grid-cols-2">
      <div className="relative min-h-[320px] bg-[url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=80')] bg-cover bg-center" />
      <div className="flex flex-col justify-center bg-hb-black px-8 py-16">
        <p className="font-body text-[10px] uppercase tracking-[0.35em] text-hb-gold">
          Lookbook
        </p>
        <h2 className="mt-3 font-display text-4xl tracking-[0.12em] text-hb-white">
          STREET LITURGY
        </h2>
        <p className="mt-4 font-body text-sm text-hb-white/55">
          Volume 06 — shot on location in Seoul. Oversized silhouettes, low
          light, high contrast.
        </p>
        <div className="mt-8">
          <Link
            href="/lookbook"
            className={cn(
              "inline-flex items-center justify-center border border-hb-border px-5 py-2.5 font-body text-sm uppercase tracking-widest text-hb-white transition-colors hover:border-hb-gold hover:text-hb-gold",
            )}
          >
            Enter lookbook
          </Link>
        </div>
      </div>
    </section>
  );
}
