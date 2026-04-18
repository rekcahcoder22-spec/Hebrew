import Link from "next/link";
import { CountdownTimer } from "@/components/ui/CountdownTimer";

export function DropBanner({
  dropTitle,
  dropDate,
}: {
  dropTitle: string;
  dropDate: string;
}) {
  return (
    <section className="bg-hb-red py-8">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="font-display text-4xl uppercase tracking-[0.08em] text-white">
          🔴 LIVE NOW — {dropTitle}
        </p>
        <div className="mt-8 flex justify-center">
          <CountdownTimer targetDate={dropDate} />
        </div>
        <div className="mt-10">
          <Link
            href="/shop"
            className="inline-block bg-white px-8 py-3 font-body uppercase tracking-widest text-hb-black transition hover:bg-hb-gold"
          >
            SHOP THE DROP →
          </Link>
        </div>
      </div>
    </section>
  );
}
