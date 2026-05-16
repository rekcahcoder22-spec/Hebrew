"use client";

import { FormEvent, useState } from "react";
import {
  HighlightBox,
  SectionHeading,
} from "@/components/layouts/PolicyLayout";
import { HebrewWordButton } from "@/components/ui/HebrewWordMark";
import { useLanguage } from "@/components/providers/LanguageProvider";

type FormState = {
  name: string;
  email: string;
  type: string;
  instagram: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  type: "KOL / Influencer",
  instagram: "",
  message: "",
};

const coopTypes = [
  {
    no: "01",
    category: { en: "CREATOR", vi: "SÁNG TẠO" },
    title: { en: "INFLUENCER / KOL", vi: "INFLUENCER / KOL" },
    desc: {
      en: "Partner with us if you have a strong streetwear aesthetic and an authentic voice. Receive PR products, sales commission, and exclusive pieces.",
      vi: "Hợp tác nếu bạn có gu streetwear rõ và giọng nói chân thực. Nhận sản phẩm PR, hoa hồng bán hàng và các món độc quyền.",
    },
    req: {
      en: "Requirements: 5K+ followers, quality content, authentic niche",
      vi: "Yêu cầu: 5K+ followers, nội dung chất lượng, niche rõ ràng",
    },
  },
  {
    no: "02",
    category: { en: "BUSINESS", vi: "KINH DOANH" },
    title: { en: "AGENT / RESELLER", vi: "ĐẠI LÝ / RESELLER" },
    desc: {
      en: "Become an official HEBREW agent in your city. Attractive margins, marketing support, and regional exclusivity available.",
      vi: "Trở thành đại lý HEBREW chính thức tại thành phố của bạn. Biên lợi nhuận hấp dẫn, hỗ trợ marketing và quyền độc quyền khu vực.",
    },
    req: {
      en: "Requirements: Physical or online storefront, minimum capital",
      vi: "Yêu cầu: Cửa hàng vật lý hoặc online, vốn tối thiểu",
    },
  },
  {
    no: "03",
    category: { en: "CREATIVE", vi: "SÁNG TẠO" },
    title: { en: "PHOTOGRAPHER / VIDEOGRAPHER", vi: "NHIẾP ẢNH / QUAY PHIM" },
    desc: {
      en: "Shoot lookbooks and campaign content for each drop. Project-based fee, credited on all published materials.",
      vi: "Chụp lookbook và nội dung campaign cho mỗi drop. Phí theo dự án, được ghi credit trên mọi ấn phẩm.",
    },
    req: {
      en: "Requirements: Strong portfolio, understanding of streetwear",
      vi: "Yêu cầu: Portfolio mạnh, hiểu streetwear",
    },
  },
  {
    no: "04",
    category: { en: "PARTNERSHIP", vi: "HỢP TÁC" },
    title: { en: "BRAND COLLABORATION", vi: "COLLAB THƯƠNG HIỆU" },
    desc: {
      en: "Limited-edition collabs with aligned local brands. HEBREW is open to Vietnamese brands with a clear identity.",
      vi: "Collab phiên bản giới hạn với thương hiệu local cùng tinh thần. HEBREW mở cửa với brand Việt có bản sắc rõ.",
    },
    req: {
      en: "Requirements: Clear brand identity, aligned values",
      vi: "Yêu cầu: Bản sắc thương hiệu rõ, giá trị đồng điệu",
    },
  },
];

export function CooperateClient() {
  const { language } = useLanguage();
  const tr = (en: string, vi: string) => (language === "vi" ? vi : en);
  const [formData, setFormData] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;
    setIsLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="mb-16 max-w-2xl font-display text-[clamp(28px,5vw,52px)] leading-tight text-hb-white">
        {tr("LET'S BUILD THINGS", "CÙNG NHAU TẠO NÊN")}
        <br />
        {tr("THAT DIDN'T EXIST BEFORE.", "NHỮNG GIÁ TRỊ MỚI.")}
      </h2>

      <section className="mb-16 grid gap-4 lg:grid-cols-2">
        {coopTypes.map((item) => (
          <article
            key={item.no}
            className="group cursor-pointer border border-hb-border p-8 transition-all duration-200 hover:border-hb-red"
          >
            <p className="mb-4 font-display text-5xl text-hb-white/10 transition-colors group-hover:text-hb-red/20">
              {item.no}
            </p>
            <p className="mb-2 font-body text-[8px] uppercase tracking-[.2em] text-hb-red">
              {tr(item.category.en, item.category.vi)}
            </p>
            <h3 className="mb-3 font-display text-3xl text-hb-white transition-colors group-hover:text-hb-red">
              {tr(item.title.en, item.title.vi)}
            </h3>
            <p className="font-body text-sm leading-[2.2] text-hb-white/50">
              {tr(item.desc.en, item.desc.vi)}
            </p>
            <p className="mt-4 font-body text-[9px] tracking-wide text-hb-white/30">
              {tr(item.req.en, item.req.vi)}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-12">
        <SectionHeading>{tr("SEND A PROPOSAL", "GỬI ĐỀ XUẤT HỢP TÁC")}</SectionHeading>
        {submitted ? (
          <HighlightBox accent="gold">
            {tr(
              "\"We received your proposal. HEBREW will get back to you within 2 to 3 business days. Stay locked in.\"",
              "\"Chúng tôi đã nhận được đề xuất của bạn. HEBREW sẽ phản hồi trong 2 đến 3 ngày làm việc.\"",
            )}
          </HighlightBox>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <label className="mb-2 block font-body text-[9px] uppercase tracking-[.2em] text-hb-white/40">
                  {tr("Name / Brand Name", "Tên cá nhân / Thương hiệu")}
                </label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((s) => ({ ...s, name: e.target.value }))
                  }
                  className="w-full border-b border-hb-border bg-transparent px-0 py-3 font-body text-sm text-hb-white outline-none placeholder:text-[10px] placeholder:uppercase placeholder:tracking-widest placeholder:text-hb-white/25 focus:border-b-hb-red"
                />
              </div>
              <div>
                <label className="mb-2 block font-body text-[9px] uppercase tracking-[.2em] text-hb-white/40">
                  {tr("Contact Email", "Email liên hệ")}
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((s) => ({ ...s, email: e.target.value }))
                  }
                  className="w-full border-b border-hb-border bg-transparent px-0 py-3 font-body text-sm text-hb-white outline-none placeholder:text-[10px] placeholder:uppercase placeholder:tracking-widest placeholder:text-hb-white/25 focus:border-b-hb-red"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block font-body text-[9px] uppercase tracking-[.2em] text-hb-white/40">
                {tr("Type of Cooperation", "Hình thức hợp tác")}
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData((s) => ({ ...s, type: e.target.value }))}
                className="w-full border-b border-hb-border bg-transparent px-0 py-3 font-body text-sm text-hb-white outline-none focus:border-b-hb-red"
              >
                {[
                  "KOL / Influencer",
                  "Agent / Reseller",
                  "Photographer",
                  "Brand Collab",
                  "Other",
                ].map((option) => (
                  <option key={option} value={option} className="bg-hb-black">
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block font-body text-[9px] uppercase tracking-[.2em] text-hb-white/40">
                {tr("Instagram / TikTok handle", "Tài khoản Instagram / TikTok")}
              </label>
              <input
                value={formData.instagram}
                onChange={(e) =>
                  setFormData((s) => ({ ...s, instagram: e.target.value }))
                }
                className="w-full border-b border-hb-border bg-transparent px-0 py-3 font-body text-sm text-hb-white outline-none placeholder:text-[10px] placeholder:uppercase placeholder:tracking-widest placeholder:text-hb-white/25 focus:border-b-hb-red"
              />
            </div>

            <div>
              <label className="mb-2 block font-body text-[9px] uppercase tracking-[.2em] text-hb-white/40">
                {tr("Your proposal", "Nội dung đề xuất")}
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData((s) => ({ ...s, message: e.target.value }))
                }
                className="min-h-[140px] w-full border-b border-hb-border bg-transparent px-0 py-3 font-body text-sm text-hb-white outline-none placeholder:text-[10px] placeholder:uppercase placeholder:tracking-widest placeholder:text-hb-white/25 focus:border-b-hb-red"
              />
            </div>

            <HebrewWordButton type="submit" block disabled={isLoading} className="mt-4">
              {isLoading ? tr("SENDING...", "ĐANG GỬI...") : tr("SEND PROPOSAL →", "GỬI ĐỀ XUẤT →")}
            </HebrewWordButton>
          </form>
        )}
      </section>
    </>
  );
}
