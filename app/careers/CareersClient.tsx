"use client";

import {
  HighlightBox,
  SectionHeading,
  StepItem,
} from "@/components/layouts/PolicyLayout";
import { HebrewWordButton } from "@/components/ui/HebrewWordMark";
import { useLanguage } from "@/components/providers/LanguageProvider";

const positions = [
  {
    title: "PRODUCT DESIGNER",
    dept: "CREATIVE",
    tags: ["Full-time", "Da Nang / Ha Tinh", "Experience required"],
    desc: "Design seasonal collections aligned with HEBREW aesthetic.",
  },
  {
    title: "MARKETING & SOCIAL MEDIA",
    dept: "MARKETING",
    tags: ["Full-time", "Remote OK", "1+ year experience"],
    desc: "Grow HEBREW's digital presence and community.",
  },
  {
    title: "RETAIL STAFF",
    dept: "OPERATIONS",
    tags: ["Part-time", "Da Nang & Ha Tinh", "Fashion enthusiast"],
    desc: "Represent HEBREW in-store and deliver an exceptional experience.",
  },
  {
    title: "PHOTOGRAPHER / CONTENT CREATOR",
    dept: "CREATIVE",
    tags: ["Freelance", "Nationwide", "Portfolio required"],
    desc: "Shoot lookbooks and campaign content for each drop.",
  },
  {
    title: "WAREHOUSE & OPERATIONS",
    dept: "OPERATIONS",
    tags: ["Full-time", "Da Nang", "Own transport required"],
    desc: "Manage inventory, packing, and daily warehouse operations.",
  },
];

export function CareersClient() {
  const { language } = useLanguage();
  const tr = (en: string, vi: string) => (language === "vi" ? vi : en);
  return (
    <>
      <HighlightBox>
        {tr(
          "\"HEBREW is looking for individuals who think differently, create boldly, and want to help build a Vietnamese streetwear brand that reaches the world. If you live for the streets, this is your place.\"",
          "\"HEBREW tìm kiếm những cá nhân dám nghĩ khác, dám tạo khác, và muốn cùng xây dựng thương hiệu streetwear Việt vươn tầm thế giới.\"",
        )}
      </HighlightBox>

      <SectionHeading>{tr("OPEN POSITIONS", "VỊ TRÍ ĐANG TUYỂN")}</SectionHeading>
      {positions.map((position) => (
        <article
          key={position.title}
          className="group mb-4 border border-hb-border p-6 transition-all duration-200 hover:border-hb-red"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 font-body text-[8px] uppercase tracking-[.2em] text-hb-red">
                {position.dept}
              </p>
              <h3 className="font-display text-2xl text-hb-white transition-colors group-hover:text-hb-red">
                {position.title}
              </h3>
              <p className="mt-2 font-body text-xs leading-[2] text-hb-white/40">
                {position.desc}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {position.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-hb-border px-2 py-1 font-body text-[8px] uppercase text-hb-white/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <HebrewWordButton
              type="button"
              variant="blood"
              className="whitespace-nowrap"
              onClick={() => {
                window.location.href = `mailto:careers@hebrew.vn?subject=${encodeURIComponent(`Application: ${position.title}`)}`;
              }}
            >
              {tr("APPLY →", "ỨNG TUYỂN →")}
            </HebrewWordButton>
          </div>
        </article>
      ))}

      <section className="mt-12">
        <SectionHeading>{tr("HOW TO APPLY", "CÁCH ỨNG TUYỂN")}</SectionHeading>
        <StepItem number="01">
          {tr(
            "Send your CV + Portfolio (if applicable) to careers@hebrew.vn",
            "Gửi CV + Portfolio (nếu có) về careers@hebrew.vn",
          )}
        </StepItem>
        <StepItem number="02">
          {tr(
            "Subject line: [Position] | [Your Full Name]",
            "Tiêu đề email: [Vị trí] | [Họ và tên]",
          )}
        </StepItem>
        <StepItem number="03">
          {tr(
            "HEBREW will respond within 3 to 5 business days",
            "HEBREW phản hồi trong vòng 3 đến 5 ngày làm việc",
          )}
        </StepItem>
        <StepItem number="04">
          {tr(
            "Interview online or in-person at our store",
            "Phỏng vấn online hoặc trực tiếp tại cửa hàng",
          )}
        </StepItem>
      </section>

      <section className="mt-12 border border-hb-border bg-hb-gray p-10">
        <SectionHeading>{tr("HEBREW CULTURE", "VĂN HÓA HEBREW")}</SectionHeading>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              title: { en: "UNLIMITED CREATIVITY", vi: "SÁNG TẠO KHÔNG GIỚI HẠN" },
              desc: {
                en: "Push boundaries, no templates",
                vi: "Vượt ranh giới, không theo khuôn mẫu",
              },
            },
            {
              title: { en: "YOUNG & DYNAMIC TEAM", vi: "ĐỘI NGŨ TRẺ & NĂNG ĐỘNG" },
              desc: {
                en: "Flat structure, fast decisions",
                vi: "Cơ cấu phẳng, quyết định nhanh",
              },
            },
            {
              title: { en: "GROW WITH THE BRAND", vi: "LỚN CÙNG THƯƠNG HIỆU" },
              desc: {
                en: "Early stage = high opportunity",
                vi: "Giai đoạn đầu = cơ hội lớn",
              },
            },
            {
              title: { en: "HEBREW STAFF DISCOUNT", vi: "ƯU ĐÃI NHÂN VIÊN" },
              desc: {
                en: "Get the drops first",
                vi: "Chạm drop trước mọi người",
              },
            },
          ].map((item) => (
            <div key={item.title.en} className="border-l-2 border-hb-red pl-4">
              <p className="mb-1 font-display text-xl text-hb-white">
                {tr(item.title.en, item.title.vi)}
              </p>
              <p className="font-body text-xs text-hb-white/40">
                {tr(item.desc.en, item.desc.vi)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
