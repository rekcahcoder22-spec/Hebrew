"use client";

import { FormEvent, useState } from "react";
import {
  Paragraph,
  SectionHeading,
} from "@/components/layouts/PolicyLayout";
import { useLanguage } from "@/components/providers/LanguageProvider";

type FeedbackForm = {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
};

const initialForm: FeedbackForm = {
  name: "",
  email: "",
  phone: "",
  type: "Product Quality",
  message: "",
};

function ratingText(rating: number, language: "vi" | "en"): string {
  if (rating === 0) return language === "vi" ? "Chọn mức đánh giá" : "Select a rating";
  if (rating === 1) return language === "vi" ? "Rất không hài lòng" : "Very Dissatisfied";
  if (rating === 2) return language === "vi" ? "Không hài lòng" : "Dissatisfied";
  if (rating === 3) return language === "vi" ? "Bình thường" : "Neutral";
  if (rating === 4) return language === "vi" ? "Hài lòng" : "Satisfied";
  return language === "vi" ? "Rất hài lòng — 🔥" : "Very Satisfied — 🔥";
}

export function FeedbackClient() {
  const { language } = useLanguage();
  const tr = (en: string, vi: string) => (language === "vi" ? vi : en);
  const [formData, setFormData] = useState<FeedbackForm>(initialForm);
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim() ||
      rating === 0
    ) {
      return;
    }
    setIsLoading(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, rating }),
      });
      setSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Paragraph>
        {tr(
          "Your feedback shapes HEBREW. Every comment, complaint, and compliment helps us get better. We read everything.",
          "Mọi góp ý của bạn giúp HEBREW hoàn thiện hơn mỗi ngày. Chúng tôi đọc tất cả phản hồi, từ lời khen đến góp ý cải thiện.",
        )}
      </Paragraph>

      {submitted ? (
        <div className="py-10 text-center">
          <p className="mb-4 font-display text-6xl text-hb-red">✓</p>
          <h2 className="font-display text-4xl text-hb-white">
            {tr("FEEDBACK RECEIVED", "ĐÃ NHẬN GÓP Ý")}
          </h2>
          <Paragraph>
            {tr(
              "Thank you. We take every message seriously.",
              "Cảm ơn bạn. Chúng tôi luôn trân trọng từng phản hồi.",
            )}
          </Paragraph>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <div className="grid gap-4 lg:grid-cols-2">
            <Field
              label={tr("NAME", "HỌ VÀ TÊN")}
              value={formData.name}
              onChange={(value) => setFormData((s) => ({ ...s, name: value }))}
            />
            <Field
              label="EMAIL"
              type="email"
              value={formData.email}
              onChange={(value) => setFormData((s) => ({ ...s, email: value }))}
            />
          </div>

          <Field
            label={tr("PHONE NUMBER", "SỐ ĐIỆN THOẠI")}
            value={formData.phone}
            onChange={(value) => setFormData((s) => ({ ...s, phone: value }))}
          />

          <div>
            <label className="mb-2 block font-body text-[9px] uppercase tracking-[.2em] text-hb-white/40">
              {tr("FEEDBACK TYPE", "LOẠI GÓP Ý")}
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData((s) => ({ ...s, type: e.target.value }))}
              className="w-full border-b border-hb-border bg-transparent px-0 py-3 font-body text-sm text-hb-white outline-none focus:border-b-hb-red"
            >
              {[
                tr("Product Quality", "Chất lượng sản phẩm"),
                tr("Delivery Service", "Dịch vụ giao hàng"),
                tr("Shopping Experience", "Trải nghiệm mua sắm"),
                tr("Website Feedback", "Góp ý website"),
                tr("Other", "Khác"),
              ].map((option) => (
                <option key={option} value={option} className="bg-hb-black">
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-3 block font-body text-[9px] uppercase tracking-[.2em] text-hb-white/40">
              {tr("OVERALL SATISFACTION", "MỨC ĐỘ HÀI LÒNG")}
            </label>
            <div className="mb-2 flex gap-3">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className={`cursor-pointer font-display text-3xl transition-colors ${
                    value <= rating ? "text-hb-gold" : "text-hb-white/15"
                  } hover:text-hb-gold`}
                >
                  ★
                </button>
              ))}
            </div>
            <p className="mt-1 font-body text-[9px] text-hb-white/30">
              {ratingText(rating, language)}
            </p>
          </div>

          <div>
            <label className="mb-2 block font-body text-[9px] uppercase tracking-[.2em] text-hb-white/40">
              {tr("MESSAGE", "NỘI DUNG")}
            </label>
            <textarea
              required
              value={formData.message}
              onChange={(e) =>
                setFormData((s) => ({ ...s, message: e.target.value }))
              }
              placeholder={tr("TELL US WHAT YOU THINK...", "HÃY CHIA SẺ CẢM NHẬN CỦA BẠN...")}
              className="min-h-[160px] w-full border-b border-hb-border bg-transparent px-0 py-3 font-body text-sm text-hb-white outline-none placeholder:text-[10px] placeholder:uppercase placeholder:tracking-widest placeholder:text-hb-white/25 focus:border-b-hb-red"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-hb-red py-4 font-body text-[10px] uppercase tracking-[.25em] text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {isLoading
              ? tr("SENDING...", "ĐANG GỬI...")
              : tr("SUBMIT FEEDBACK →", "GỬI GÓP Ý →")}
          </button>
        </form>
      )}

      <section className="mt-14">
        <SectionHeading>{tr("REACH US DIRECTLY", "LIÊN HỆ TRỰC TIẾP")}</SectionHeading>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              icon: "Z",
              channel: "ZALO",
              details: tr(
                "032.668.9947\nResponse within 30 minutes",
                "032.668.9947\nPhản hồi trong 30 phút",
              ),
            },
            {
              icon: "@",
              channel: "EMAIL",
              details: tr(
                "hebreworiginal@gmail.com\nResponse within 24 hours",
                "hebreworiginal@gmail.com\nPhản hồi trong 24 giờ",
              ),
            },
            {
              icon: "#",
              channel: "HOTLINE",
              details: tr(
                "032.668.9947\nMon–Sun: 8:00 AM – 10:00 PM",
                "032.668.9947\nThứ 2–CN: 08:00 – 22:00",
              ),
            },
          ].map((item) => (
            <div
              key={item.channel}
              className="border border-hb-border bg-hb-gray p-6 text-center transition-colors hover:border-hb-red"
            >
              <p className="mb-3 font-display text-3xl text-hb-red">{item.icon}</p>
              <p className="mb-2 font-display text-xl text-hb-white">{item.channel}</p>
              <p className="whitespace-pre-line font-body text-xs leading-[2.2] text-hb-white/50">
                {item.details}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block font-body text-[9px] uppercase tracking-[.2em] text-hb-white/40">
        {label}
      </label>
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-hb-border bg-transparent px-0 py-3 font-body text-sm text-hb-white outline-none placeholder:text-[10px] placeholder:uppercase placeholder:tracking-widest placeholder:text-hb-white/25 focus:border-b-hb-red"
      />
    </div>
  );
}
