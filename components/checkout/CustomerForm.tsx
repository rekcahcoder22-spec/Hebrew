"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { CustomerInfo } from "@/types";

const customerSchema = z.object({
  firstName: z.string().min(2, "Nhập họ"),
  lastName: z.string().min(2, "Nhập tên"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().regex(/^[0-9]{9,11}$/, "Số điện thoại không hợp lệ"),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof customerSchema>;

const inputClass =
  "w-full border-0 border-b border-hb-border bg-transparent px-0 py-3 font-body text-sm text-hb-white outline-none transition-colors duration-200 placeholder:text-[10px] placeholder:uppercase placeholder:tracking-widest placeholder:text-hb-white/25 focus:border-b-hb-red";

const labelClass =
  "mb-2 block font-body text-[9px] uppercase tracking-[.2em] text-hb-white/40";

const errorClass = "mt-1 font-body text-[9px] text-hb-red";

export function CustomerForm({
  onNext,
  defaultValues,
}: {
  onNext: (data: CustomerInfo) => void;
  defaultValues?: CustomerInfo;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: defaultValues
      ? {
          firstName: defaultValues.firstName,
          lastName: defaultValues.lastName,
          email: defaultValues.email,
          phone: defaultValues.phone,
          note: defaultValues.note ?? "",
        }
      : undefined,
  });

  const submit = handleSubmit((data) => {
    const payload: CustomerInfo = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      ...(data.note?.trim() ? { note: data.note.trim() } : {}),
    };
    onNext(payload);
  });

  return (
    <form onSubmit={submit} noValidate>
      <h2 className="mb-8 font-display text-4xl tracking-tight text-hb-white">
        THÔNG TIN KHÁCH HÀNG
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="firstName">
            Họ
          </label>
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="HỌ"
            className={inputClass}
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className={errorClass}>{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass} htmlFor="lastName">
            Tên
          </label>
          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            placeholder="TÊN"
            className={inputClass}
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className={errorClass}>{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <label className={labelClass} htmlFor="email">
          Email
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

      <div className="mt-6">
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

      <div className="mt-6">
        <label className={labelClass} htmlFor="note">
          Ghi chú (tuỳ chọn)
        </label>
        <textarea
          id="note"
          rows={3}
          placeholder="GHI CHÚ ĐƠN HÀNG"
          className={`${inputClass} resize-none`}
          {...register("note")}
        />
        {errors.note && <p className={errorClass}>{errors.note.message}</p>}
      </div>

      <button
        type="submit"
        className="mt-8 w-full bg-hb-red py-4 font-body text-[10px] uppercase tracking-[.25em] text-white transition-colors duration-200 hover:bg-red-700"
      >
        TIẾP THEO — GIAO HÀNG →
      </button>
    </form>
  );
}
