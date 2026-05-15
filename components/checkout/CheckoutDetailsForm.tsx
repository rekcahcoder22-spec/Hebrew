"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { CustomerInfo, PaymentMethod, ShippingInfo } from "@/types";
import { getCheckoutMethodBaseFee } from "@/lib/checkoutShipping";
import { HebrewWordButton } from "@/components/ui/HebrewWordMark";
import { SHIPPING_MERGED_MARKER } from "@/lib/utils";
import { BANK_TRANSFER_DETAILS } from "@/lib/paymentInfo";

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
    price: getCheckoutMethodBaseFee("standard"),
  },
  {
    id: "express",
    name: "Nhanh",
    desc: "1–2 ngày làm việc",
    price: getCheckoutMethodBaseFee("express"),
  },
  {
    id: "pickup",
    name: "Tại cửa hàng",
    desc: "Đà Nẵng & Hà Tĩnh",
    price: getCheckoutMethodBaseFee("pickup"),
  },
];

const PAYMENT_OPTIONS: {
  id: PaymentMethod;
  titleVi: string;
  titleEn: string;
}[] = [
  {
    id: "bank_transfer",
    titleVi: "Chuyển khoản qua ngân hàng",
    titleEn: "Bank transfer",
  },
  {
    id: "cod",
    titleVi: "Thanh toán khi giao hàng (COD)",
    titleEn: "Cash on delivery (COD)",
  },
  {
    id: "vietqr",
    titleVi: "VietQR (chuyển khoản nhanh)",
    titleEn: "VietQR (instant transfer)",
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
  paymentMethod: z
    .literal("")
    .or(z.enum(["bank_transfer", "cod", "vietqr"]))
    .pipe(
      z.enum(["bank_transfer", "cod", "vietqr"], {
        errorMap: () => ({
          message: "Vui lòng chọn phương thức thanh toán",
        }),
      }),
    ),
  note: z.string().optional(),
});

type FormValues = z.input<typeof checkoutSchema>;

const inputClass =
  "min-w-0 w-full max-w-full border-0 border-b border-hb-border bg-transparent px-0 py-2.5 font-body text-sm text-hb-white outline-none transition-colors duration-200 placeholder:normal-case placeholder:text-xs placeholder:tracking-normal placeholder:text-hb-white/35 focus:border-b-hb-red";

const labelClass =
  "mb-1 block font-body text-[10px] normal-case tracking-wide text-hb-white/55 sm:text-[11px]";

const errorClass =
  "mt-1.5 max-w-full break-words font-body text-xs leading-snug text-hb-red";

export function CheckoutDetailsForm({
  onSubmit,
  isSubmitting,
  onMethodChange,
  freeShipEligible = false,
  defaultCustomer,
  defaultShipping,
  language = "vi",
}: {
  onSubmit: (customer: CustomerInfo, shipping: ShippingInfo) => void | Promise<void>;
  isSubmitting: boolean;
  onMethodChange?: (method: ShippingInfo["method"]) => void;
  freeShipEligible?: boolean;
  defaultCustomer?: CustomerInfo | null;
  defaultShipping?: ShippingInfo | null;
  language?: "vi" | "en";
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
      paymentMethod: defaultShipping?.paymentMethod ?? "",
      note: defaultCustomer?.note ?? "",
    },
  });

  const method = watch("method");
  const paymentMethod = watch("paymentMethod");

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
      paymentMethod: data.paymentMethod as PaymentMethod,
    };
    await onSubmit(customer, shipping);
  });

  return (
    <form onSubmit={submit} noValidate className="min-w-0 max-w-full">
      <h2 className="mb-4 font-body text-2xl font-bold uppercase tracking-[.06em] text-hb-white sm:text-3xl">
        Đặt hàng
      </h2>
      <p className="mb-5 font-body text-xs leading-relaxed text-hb-white/45 sm:text-sm">
        {language === "vi"
          ? "Điền thông tin nhận hàng, chọn vận chuyển và chọn cách thanh toán trước khi đặt hàng."
          : "Fill in delivery details, choose shipping, and select a payment method before placing your order."}
      </p>

      <div>
        <label className={labelClass} htmlFor="fullName">
          Họ và tên
        </label>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          placeholder="Họ và tên"
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
            placeholder="Số điện thoại"
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
            placeholder="email@vd.com (tuỳ chọn)"
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
          className={`${inputClass} min-h-[4.25rem] resize-y leading-relaxed`}
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
        <h3 className="mb-2 font-body text-[11px] font-medium normal-case tracking-wide text-hb-white/55 sm:text-xs">
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
                className={`flex min-h-0 min-w-0 flex-col border px-2.5 py-2.5 text-left transition-all sm:px-3 sm:py-3 ${
                  selected
                    ? "border-hb-red bg-hb-red/5"
                    : "border-hb-border hover:border-hb-white/20"
                }`}
              >
                <span className="min-w-0 break-words font-body text-sm font-semibold tracking-wide text-hb-white sm:text-base">
                  {m.name}
                </span>
                <span className="mt-0.5 min-w-0 break-words font-body text-[11px] leading-snug text-hb-white/50 sm:text-xs">
                  {m.desc}
                </span>
                <span className="mt-1.5 min-w-0 shrink-0 font-body text-sm font-bold tabular-nums text-luxury-gold sm:text-base">
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

      <div className="mt-6">
        <h3 className="mb-2 font-body text-[11px] font-medium normal-case tracking-wide text-hb-white/55 sm:text-xs">
          {language === "vi" ? "Thanh toán" : "Payment"}
        </h3>
        <div className="space-y-2">
          {PAYMENT_OPTIONS.map((p) => {
            const selected = paymentMethod === p.id;
            const title = language === "vi" ? p.titleVi : p.titleEn;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() =>
                  setValue("paymentMethod", p.id, { shouldValidate: true })
                }
                className={`flex min-w-0 w-full items-start gap-2.5 border px-3 py-2.5 text-left transition-all sm:gap-3 sm:px-3.5 sm:py-3 ${
                  selected
                    ? "border-hb-red bg-hb-red/5"
                    : "border-hb-border hover:border-hb-white/20"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border sm:h-[18px] sm:w-[18px] ${
                    selected ? "border-hb-red" : "border-hb-border"
                  }`}
                  aria-hidden
                >
                  {selected ? (
                    <span className="block h-2 w-2 rounded-full bg-hb-red sm:h-2.5 sm:w-2.5" />
                  ) : null}
                </span>
                <span className="min-w-0 flex-1 break-words font-body text-sm leading-snug text-hb-white sm:text-[15px]">
                  {title}
                </span>
              </button>
            );
          })}
        </div>
        <input type="hidden" {...register("paymentMethod")} />
        {errors.paymentMethod && (
          <p className={errorClass}>{errors.paymentMethod.message}</p>
        )}

        {paymentMethod === "cod" ? (
          <p className="mt-2 border border-hb-border/80 bg-hb-gray/20 px-3 py-2.5 font-body text-xs leading-relaxed text-hb-white/80 sm:text-sm">
            {language === "vi"
              ? "Bạn thanh toán tiền mặt khi nhận được hàng. Đơn COD có thể được xác nhận qua SMS/Zalo trước khi giao."
              : "You pay in cash on delivery. COD orders may be confirmed via SMS/Zalo before dispatch."}
          </p>
        ) : null}

        {paymentMethod === "bank_transfer" || paymentMethod === "vietqr" ? (
          <div className="mt-2 border border-hb-border bg-hb-black/60 px-3 py-3 font-body text-xs leading-relaxed text-hb-white sm:text-sm">
            {paymentMethod === "vietqr" ? (
              <p className="mb-3 text-hb-white/75">
                {language === "vi"
                  ? "Mở app ngân hàng, chọn quét VietQR và chuyển đúng số tiền đơn hàng. Thông tin tài khoản:"
                  : "Open your banking app, scan VietQR, and transfer the order total. Account details:"}
              </p>
            ) : (
              <p className="mb-3 text-hb-white/75">
                {language === "vi"
                  ? "Chuyển khoản đúng số tiền đơn hàng. Nội dung: mã đơn + họ tên (sau khi đặt hàng thành công)."
                  : "Transfer the exact order amount. Reference: order ID + full name (shown after checkout)."}
              </p>
            )}
            <dl className="space-y-2.5">
              <div>
                <dt className="text-[11px] text-hb-white/50 sm:text-xs">
                  {language === "vi" ? "Ngân hàng" : "Bank"}
                </dt>
                <dd className="mt-0.5 break-words text-sm font-semibold text-white sm:text-base">
                  {BANK_TRANSFER_DETAILS.bank}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] text-hb-white/50 sm:text-xs">
                  {language === "vi" ? "Số tài khoản" : "Account number"}
                </dt>
                <dd className="mt-0.5 break-all font-mono text-base font-semibold tracking-wide text-white sm:text-lg">
                  {BANK_TRANSFER_DETAILS.accountNo}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] text-hb-white/50 sm:text-xs">
                  {language === "vi" ? "Chủ tài khoản" : "Account holder"}
                </dt>
                <dd className="mt-0.5 break-words text-sm font-semibold text-white sm:text-base">
                  {BANK_TRANSFER_DETAILS.accountName}
                </dd>
              </div>
            </dl>
          </div>
        ) : null}
      </div>

      <HebrewWordButton
        type="submit"
        block
        disabled={isSubmitting}
        className="mt-6 font-body text-sm font-semibold uppercase tracking-[.14em]"
      >
        {isSubmitting ? (
          <>
            <span
              className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
              aria-hidden
            />
            Đang xử lý…
          </>
        ) : (
          "Đặt hàng →"
        )}
      </HebrewWordButton>
    </form>
  );
}
