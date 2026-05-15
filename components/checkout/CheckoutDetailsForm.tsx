"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { CustomerInfo, ShippingInfo } from "@/types";
import { HebrewWordButton } from "@/components/ui/HebrewWordMark";
import { SHIPPING_MERGED_MARKER } from "@/lib/utils";

const METHODS: {
  id: ShippingInfo["method"];
  name: string;
  desc: string;
  price: number;
}[] = [
  {
    id: "standard",
    name: "Tiêu chuẩn",
    desc: "3–5 ngày làm việc",
    price: 30000,
  },
  {
    id: "express",
    name: "Nhanh",
    desc: "1–2 ngày làm việc",
    price: 50000,
  },
  {
    id: "pickup",
    name: "Tại cửa hàng",
    desc: "Đà Nẵng & Hà Tĩnh",
    price: 0,
  },
];

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Nhập họ và tên"),
  phone: z
    .string()
    .transform((s) => s.replace(/\D/g, ""))
    .refine(
      (digits) => digits.length >= 9 && digits.length <= 12,
      "Số điện thoại không hợp lệ (chỉ gồm số, 9–12 ký tự)",
    ),
  email: z
    .string()
    .trim()
    .refine(
      (v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      "Email không hợp lệ",
    ),
  addressLine: z.string().min(8, "Nhập địa chỉ nhận hàng (số nhà, đường, phường…)"),
  city: z.string().min(2, "Nhập tỉnh / thành phố"),
  method: z.enum(["standard", "express", "pickup"]),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof checkoutSchema>;

const inputClass =
  "w-full border-0 border-b border-hb-border bg-transparent px-0 py-2.5 font-body text-sm text-hb-white outline-none transition-colors duration-200 placeholder:text-[10px] placeholder:uppercase placeholder:tracking-widest placeholder:text-hb-white/25 focus:border-b-hb-red";

const labelClass =
  "mb-1 block font-body text-[8px] uppercase tracking-[.2em] text-hb-white/40";

const errorClass = "mt-1 font-body text-[9px] text-hb-red";

export function CheckoutDetailsForm({
  onSubmit,
  isSubmitting,
  onMethodChange,
  freeShipEligible = false,
  defaultCustomer,
  defaultShipping,
}: {
  onSubmit: (customer: CustomerInfo, shipping: ShippingInfo) => void | Promise<void>;
  isSubmitting: boolean;
  onMethodChange?: (method: ShippingInfo["method"]) => void;
  freeShipEligible?: boolean;
  defaultCustomer?: CustomerInfo | null;
  defaultShipping?: ShippingInfo | null;
}) {
  const fullNameDefault =
    defaultCustomer &&
    [defaultCustomer.firstName, defaultCustomer.lastName]
      .map((s) => s.trim())
      .filter(Boolean)
      .join(" ");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: fullNameDefault ?? "",
      phone: defaultCustomer?.phone ?? "",
      email: defaultCustomer?.email ?? "",
      addressLine: defaultShipping?.address ?? "",
      city: defaultShipping?.city ?? "",
      method: defaultShipping?.method ?? "standard",
      note: defaultCustomer?.note ?? "",
    },
  });

  const method = watch("method");

  useEffect(() => {
    onMethodChange?.(method);
  }, [method, onMethodChange]);

  const submit = handleSubmit(async (data) => {
    const name = data.fullName.trim();
    const customer: CustomerInfo = {
      firstName: name,
      lastName: "",
      email: data.email.trim(),
      phone: data.phone.trim(),
      ...(data.note?.trim() ? { note: data.note.trim() } : {}),
    };
    const shipping: ShippingInfo = {
      address: data.addressLine.trim(),
      city: data.city.trim(),
      district: SHIPPING_MERGED_MARKER,
      ward: SHIPPING_MERGED_MARKER,
      method: data.method,
    };
    await onSubmit(customer, shipping);
  });

  return (
    <form onSubmit={submit} noValidate>
      <h2 className="mb-6 font-display text-3xl tracking-tight text-hb-white md:text-4xl">
        ĐẶT HÀNG
      </h2>
      <p className="mb-6 font-body text-[10px] leading-relaxed text-hb-white/35">
        Điền thông tin nhận hàng và chọn cách ship. Thanh toán khi nhận hàng (COD).
      </p>

      <div>
        <label className={labelClass} htmlFor="fullName">
          Họ và tên
        </label>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          placeholder="HỌ VÀ TÊN"
          className={inputClass}
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className={errorClass}>{errors.fullName.message}</p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="phone">
            Số điện thoại
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="SỐ ĐIỆN THOẠI"
            className={inputClass}
            {...register("phone")}
          />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email <span className="text-hb-white/25">(tuỳ chọn)</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="EMAIL"
            className={inputClass}
            {...register("email")}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>

      <div className="mt-4">
        <label className={labelClass} htmlFor="addressLine">
          Địa chỉ nhận hàng
        </label>
        <textarea
          id="addressLine"
          rows={2}
          autoComplete="street-address"
          placeholder="Số nhà, đường, phường/xã, quận/huyện…"
          className={`${inputClass} resize-none leading-relaxed`}
          {...register("addressLine")}
        />
        {errors.addressLine && (
          <p className={errorClass}>{errors.addressLine.message}</p>
        )}
      </div>

      <div className="mt-4">
        <label className={labelClass} htmlFor="city">
          Tỉnh / Thành phố
        </label>
        <input
          id="city"
          type="text"
          autoComplete="address-level1"
          placeholder="VD: Đà Nẵng, TP.HCM…"
          className={inputClass}
          {...register("city")}
        />
        {errors.city && <p className={errorClass}>{errors.city.message}</p>}
      </div>

      <div className="mt-4">
        <label className={labelClass} htmlFor="note">
          Ghi chú <span className="text-hb-white/25">(tuỳ chọn)</span>
        </label>
        <input
          id="note"
          type="text"
          placeholder="VD: gọi trước khi giao"
          className={inputClass}
          {...register("note")}
        />
      </div>

      <div className="mt-6">
        <h3 className="mb-3 font-body text-[8px] uppercase tracking-[.25em] text-hb-white/35">
          Vận chuyển
        </h3>
        <div className="grid gap-2 sm:grid-cols-3">
          {METHODS.map((m) => {
            const selected = method === m.id;
            const effectivePrice =
              freeShipEligible && (m.id === "standard" || m.id === "express")
                ? 0
                : m.price;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() =>
                  setValue("method", m.id, { shouldValidate: true })
                }
                className={`flex flex-col border px-3 py-3 text-left transition-all ${
                  selected
                    ? "border-hb-red bg-hb-red/5"
                    : "border-hb-border hover:border-hb-white/20"
                }`}
              >
                <span className="font-display text-sm tracking-wide text-hb-white">
                  {m.name}
                </span>
                <span className="mt-0.5 font-body text-[8px] text-hb-white/35">
                  {m.desc}
                </span>
                <span className="mt-2 font-display text-sm text-hb-gold">
                  {effectivePrice === 0 &&
                  freeShipEligible &&
                  (m.id === "standard" || m.id === "express")
                    ? "Miễn phí"
                    : effectivePrice === 0
                      ? "0 ₫"
                      : `${effectivePrice.toLocaleString("vi-VN")} ₫`}
                </span>
              </button>
            );
          })}
        </div>
        <input type="hidden" {...register("method")} />
        {errors.method && (
          <p className={errorClass}>{errors.method.message}</p>
        )}
      </div>

      <HebrewWordButton
        type="submit"
        block
        disabled={isSubmitting}
        className="mt-8"
      >
        {isSubmitting ? (
          <>
            <span
              className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
              aria-hidden
            />
            ĐANG XỬ LÝ…
          </>
        ) : (
          "ĐẶT HÀNG →"
        )}
      </HebrewWordButton>
    </form>
  );
}
