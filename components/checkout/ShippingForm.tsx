"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { ShippingInfo } from "@/types";

const shippingSchema = z.object({
  address: z.string().min(5, "Nhập địa chỉ"),
  city: z.string().min(2, "Chọn tỉnh/thành"),
  district: z.string().min(2, "Nhập quận/huyện"),
  ward: z.string().min(2, "Nhập phường/xã"),
  method: z.enum(["standard", "express", "pickup"]),
});

type FormValues = z.infer<typeof shippingSchema>;

const METHODS: {
  id: ShippingInfo["method"];
  name: string;
  desc: string;
  price: number;
}[] = [
  {
    id: "standard",
    name: "GIAO HÀNG TIÊU CHUẨN",
    desc: "3-5 NGÀY LÀM VIỆC",
    price: 30000,
  },
  {
    id: "express",
    name: "GIAO HÀNG NHANH",
    desc: "1-2 NGÀY LÀM VIỆC",
    price: 50000,
  },
  {
    id: "pickup",
    name: "NHẬN TẠI CỬA HÀNG",
    desc: "HÀ NỘI & HỒ CHÍ MINH",
    price: 0,
  },
];

const inputClass =
  "w-full border-0 border-b border-hb-border bg-transparent px-0 py-3 font-body text-sm text-hb-white outline-none transition-colors duration-200 placeholder:text-[10px] placeholder:uppercase placeholder:tracking-widest placeholder:text-hb-white/25 focus:border-b-hb-red";

const labelClass =
  "mb-2 block font-body text-[9px] uppercase tracking-[.2em] text-hb-white/40";

const errorClass = "mt-1 font-body text-[9px] text-hb-red";

export function ShippingForm({
  onNext,
  onBack,
  defaultValues,
  isSubmitting,
  onMethodChange,
}: {
  onNext: (data: ShippingInfo) => void | Promise<void>;
  onBack: () => void;
  defaultValues?: ShippingInfo;
  isSubmitting: boolean;
  onMethodChange?: (method: ShippingInfo["method"]) => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: defaultValues ?? {
      address: "",
      city: "",
      district: "",
      ward: "",
      method: "standard",
    },
  });

  const method = watch("method");

  useEffect(() => {
    onMethodChange?.(method);
  }, [method, onMethodChange]);

  const submit = handleSubmit(async (data) => {
    const payload: ShippingInfo = {
      address: data.address.trim(),
      city: data.city.trim(),
      district: data.district.trim(),
      ward: data.ward.trim(),
      method: data.method,
    };
    await onNext(payload);
  });

  return (
    <form onSubmit={submit} noValidate>
      <h2 className="mb-8 font-display text-4xl tracking-tight text-hb-white">
        ĐỊA CHỈ GIAO HÀNG
      </h2>

      <div>
        <label className={labelClass} htmlFor="address">
          Địa chỉ
        </label>
        <input
          id="address"
          type="text"
          autoComplete="street-address"
          placeholder="Số nhà, tên đường"
          className={inputClass}
          {...register("address")}
        />
        {errors.address && (
          <p className={errorClass}>{errors.address.message}</p>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="city">
            Tỉnh / Thành phố
          </label>
          <input
            id="city"
            type="text"
            autoComplete="address-level1"
            placeholder="TỈNH / THÀNH"
            className={inputClass}
            {...register("city")}
          />
          {errors.city && <p className={errorClass}>{errors.city.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="district">
            Quận / Huyện
          </label>
          <input
            id="district"
            type="text"
            placeholder="QUẬN / HUYỆN"
            className={inputClass}
            {...register("district")}
          />
          {errors.district && (
            <p className={errorClass}>{errors.district.message}</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <label className={labelClass} htmlFor="ward">
          Phường / Xã
        </label>
        <input
          id="ward"
          type="text"
          placeholder="PHƯỜNG / XÃ"
          className={inputClass}
          {...register("ward")}
        />
        {errors.ward && <p className={errorClass}>{errors.ward.message}</p>}
      </div>

      <div className="mt-8">
        <h3 className="mb-4 font-display text-2xl text-hb-white">
          PHƯƠNG THỨC VẬN CHUYỂN
        </h3>
        <div className="space-y-3">
          {METHODS.map((m) => {
            const selected = method === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() =>
                  setValue("method", m.id, { shouldValidate: true })
                }
                className={`flex w-full cursor-pointer items-center justify-between border p-4 transition-all duration-200 ${
                  selected
                    ? "border-hb-red bg-hb-red/5"
                    : "border-hb-border hover:border-hb-border"
                }`}
              >
                <div className="flex min-w-0 flex-1 items-center">
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                      selected ? "border-hb-red" : "border-hb-border"
                    }`}
                  >
                    {selected ? (
                      <span className="block h-2 w-2 rounded-full bg-hb-red" />
                    ) : null}
                  </span>
                  <div className="ml-3 min-w-0 text-left">
                    <p className="font-display text-lg tracking-wide text-hb-white">
                      {m.name}
                    </p>
                    <p className="mt-0.5 font-body text-[9px] tracking-wider text-hb-white/40">
                      {m.desc}
                    </p>
                  </div>
                </div>
                <p className="shrink-0 pl-3 font-display text-xl text-hb-gold">
                  {m.price === 0
                    ? "0 ₫"
                    : `${m.price.toLocaleString("vi-VN")} ₫`}
                </p>
              </button>
            );
          })}
        </div>
        <input type="hidden" {...register("method")} />
        {errors.method && (
          <p className={errorClass}>{errors.method.message}</p>
        )}
      </div>

      <p className="mt-4 text-center font-body text-[9px] tracking-wider text-hb-white/30">
        💳 THANH TOÁN KHI NHẬN HÀNG (COD)
      </p>

      <div className="mt-8 flex gap-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="w-1/3 border border-hb-border bg-transparent py-4 font-body text-[10px] uppercase tracking-[.2em] text-hb-white/50 transition-colors hover:border-hb-white/50 hover:text-hb-white disabled:opacity-40"
        >
          ← QUAY LẠI
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-2/3 items-center justify-center bg-hb-red py-4 font-body text-[10px] uppercase tracking-[.25em] text-white transition-colors hover:bg-red-700 disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <span
                className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                aria-hidden
              />
              ĐANG XỬ LÝ…
            </>
          ) : (
            "ĐẶT HÀNG →"
          )}
        </button>
      </div>
    </form>
  );
}
