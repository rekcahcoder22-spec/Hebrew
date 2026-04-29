import type { Metadata } from "next";
import { LanguageText } from "@/components/i18n/LanguageText";

export const metadata: Metadata = {
  title: "Gioi Thieu",
  description:
    "Gioi thieu ve HEBREW: local streetwear label voi triet ly thiet ke toi gian, ben vung va gioi han theo drop.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About HEBREW",
    description:
      "Tim hieu ve triet ly, chat lieu va ngon ngu thiet ke cua HEBREW.",
    url: "/about",
    type: "article",
  },
};

export default function AboutPage() {
  return (
    <div className="border-b border-hb-border bg-hb-gray px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="font-body text-[10px] uppercase tracking-[0.35em] text-hb-red">
          <LanguageText en="About" vi="Giới thiệu" />
        </p>
        <h1 className="mt-3 font-display text-5xl tracking-[0.12em] text-hb-white">
          HEBREW
        </h1>
        <p className="mt-8 font-body text-sm leading-relaxed text-hb-white/60">
          <LanguageText
            en="Hebrew is an independent label obsessed with weight, drape, and durability. Each release is intentionally small: numbered pieces, honest materials, and silhouettes shaped for real movement — not runway posture."
            vi="Hebrew là thương hiệu độc lập theo đuổi chất liệu, độ rũ và độ bền. Mỗi đợt phát hành đều giới hạn: sản phẩm đánh số, vật liệu trung thực và phom dáng dành cho chuyển động thực tế — không phải để trình diễn."
          />
        </p>
        <p className="mt-4 font-body text-sm leading-relaxed text-hb-white/60">
          <LanguageText
            en="We operate between reverence and rebellion: liturgical references, industrial hardware, and the blunt geometry of the street. If you know, you know. If you do not, that is fine too."
            vi="Chúng tôi vận hành giữa tôn nghiêm và nổi loạn: cảm hứng nghi lễ, chi tiết công nghiệp và hình học thô ráp của đường phố. Nếu bạn hiểu, bạn sẽ hiểu. Nếu chưa, cũng không sao."
          />
        </p>
      </div>
    </div>
  );
}
