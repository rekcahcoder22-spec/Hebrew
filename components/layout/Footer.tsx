import Link from "next/link";

export function Footer({
  instagramUrl,
  tiktokUrl,
}: {
  instagramUrl: string;
  tiktokUrl: string;
}) {
  return (
    <footer className="border-t border-hb-border bg-hb-gray">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl tracking-[0.2em] text-hb-white">
            HEBREW
          </p>
          <p className="mt-2 max-w-sm font-body text-xs text-hb-white/50">
            Sacred streetwear. Limited runs. No noise.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 font-body text-xs uppercase tracking-widest text-hb-white/60">
          <Link href="/shop" className="hover:text-hb-gold">
            Shop
          </Link>
          <a href={instagramUrl} className="hover:text-hb-gold">
            Instagram
          </a>
          <a href={tiktokUrl} className="hover:text-hb-gold">
            TikTok
          </a>
        </div>
      </div>
      <div className="border-t border-hb-border py-4 text-center font-body text-[10px] uppercase tracking-[0.3em] text-hb-white/30">
        © {new Date().getFullYear()} Hebrew Store
      </div>
    </footer>
  );
}
