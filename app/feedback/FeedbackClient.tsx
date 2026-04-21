"use client";

import { FormEvent, useState } from "react";
import {
  Paragraph,
  SectionHeading,
} from "@/components/layouts/PolicyLayout";

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

function ratingText(rating: number): string {
  if (rating === 0) return "Select a rating";
  if (rating === 1) return "Very Dissatisfied";
  if (rating === 2) return "Dissatisfied";
  if (rating === 3) return "Neutral";
  if (rating === 4) return "Satisfied";
  return "Very Satisfied — 🔥";
}

export function FeedbackClient() {
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
        Your feedback shapes HEBREW. Every comment, complaint, and compliment
        helps us get better. We read everything.
      </Paragraph>

      {submitted ? (
        <div className="py-10 text-center">
          <p className="mb-4 font-display text-6xl text-hb-red">✓</p>
          <h2 className="font-display text-4xl text-hb-white">FEEDBACK RECEIVED</h2>
          <Paragraph>Thank you. We take every message seriously.</Paragraph>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <div className="grid gap-4 lg:grid-cols-2">
            <Field
              label="NAME"
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
            label="PHONE NUMBER"
            value={formData.phone}
            onChange={(value) => setFormData((s) => ({ ...s, phone: value }))}
          />

          <div>
            <label className="mb-2 block font-body text-[9px] uppercase tracking-[.2em] text-hb-white/40">
              FEEDBACK TYPE
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData((s) => ({ ...s, type: e.target.value }))}
              className="w-full border-b border-hb-border bg-transparent px-0 py-3 font-body text-sm text-hb-white outline-none focus:border-b-hb-red"
            >
              {[
                "Product Quality",
                "Delivery Service",
                "Shopping Experience",
                "Website Feedback",
                "Other",
              ].map((option) => (
                <option key={option} value={option} className="bg-hb-black">
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-3 block font-body text-[9px] uppercase tracking-[.2em] text-hb-white/40">
              OVERALL SATISFACTION
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
              {ratingText(rating)}
            </p>
          </div>

          <div>
            <label className="mb-2 block font-body text-[9px] uppercase tracking-[.2em] text-hb-white/40">
              MESSAGE
            </label>
            <textarea
              required
              value={formData.message}
              onChange={(e) =>
                setFormData((s) => ({ ...s, message: e.target.value }))
              }
              placeholder="TELL US WHAT YOU THINK..."
              className="min-h-[160px] w-full border-b border-hb-border bg-transparent px-0 py-3 font-body text-sm text-hb-white outline-none placeholder:text-[10px] placeholder:uppercase placeholder:tracking-widest placeholder:text-hb-white/25 focus:border-b-hb-red"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-hb-red py-4 font-body text-[10px] uppercase tracking-[.25em] text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {isLoading ? "SENDING..." : "SUBMIT FEEDBACK →"}
          </button>
        </form>
      )}

      <section className="mt-14">
        <SectionHeading>REACH US DIRECTLY</SectionHeading>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              icon: "Z",
              channel: "ZALO",
              details: "032.668.9947\nResponse within 30 minutes",
            },
            {
              icon: "@",
              channel: "EMAIL",
              details: "hebreworiginal@gmail.com\nResponse within 24 hours",
            },
            {
              icon: "#",
              channel: "HOTLINE",
              details: "032.668.9947\nMon–Sun: 8:00 AM – 10:00 PM",
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
