import type { Metadata } from "next";
import { LanguageText } from "@/components/i18n/LanguageText";

export const metadata: Metadata = {
  title: "Lookbook",
  description:
    "Bo anh lookbook HEBREW: editorial spread, on-body fit va visual language cua cac chapter.",
  alternates: {
    canonical: "/lookbook",
  },
  openGraph: {
    title: "HEBREW Lookbook",
    description:
      "Xem bo anh lookbook moi nhat cua HEBREW voi on-body fit va concept visual.",
    url: "/lookbook",
    type: "article",
  },
};

export default function LookbookPage() {
  return (
    <div className="border-b border-hb-border bg-hb-black px-4 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-body text-[10px] uppercase tracking-[0.35em] text-hb-gold">
          <LanguageText en="Lookbook" vi="Lookbook" />
        </p>
        <h1 className="mt-3 font-display text-5xl tracking-[0.12em] text-hb-white">
          VOLUME 06
        </h1>
        <p className="mt-6 font-body text-sm text-hb-white/55">
          <LanguageText
            en="Editorial spreads and on-body fits from the latest covenant drop. Photography: Seoul, night grade, minimal flash."
            vi="Bộ ảnh editorial và on-body fit từ đợt phát hành mới nhất. Chụp tại Seoul, tông đêm, ánh sáng flash tối giản."
          />
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="aspect-[3/4] bg-[url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900&q=80')] bg-cover bg-center" />
          <div className="aspect-[3/4] bg-[url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80')] bg-cover bg-center" />
          <div className="aspect-[3/4] bg-[url('https://images.unsplash.com/photo-1503341455253-bff604c52c8e?w=900&q=80')] bg-cover bg-center md:col-span-2 md:aspect-[21/9]" />
        </div>
      </div>
    </div>
  );
}
