"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/components/providers/LanguageProvider";

const schema = z.object({
  email: z.string().email("Invalid email"),
});

type FormValues = z.infer<typeof schema>;

export function NewsletterSection() {
  const { t } = useLanguage();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormValues) => {
    void data;
    reset();
  };

  return (
    <section className="bg-hb-black px-4 py-16">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-body text-[10px] uppercase tracking-[0.35em] text-hb-gold">
          {t("newsletter.label")}
        </p>
        <h2 className="mt-3 font-display text-3xl tracking-[0.2em] text-hb-white">
          {t("newsletter.title")}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <input
            {...register("email")}
            type="email"
            placeholder={t("newsletter.placeholder")}
            className="flex-1 border border-hb-border bg-hb-gray px-4 py-3 font-body text-sm text-hb-white placeholder:text-hb-white/30 focus:border-hb-gold focus:outline-none"
          />
          <Button type="submit" className="sm:w-auto">
            {t("newsletter.join")}
          </Button>
        </form>
        {errors.email && (
          <p className="mt-2 text-left font-body text-xs text-hb-red">
            {t("newsletter.invalidEmail")}
          </p>
        )}
        {isSubmitSuccessful && (
          <p className="mt-3 font-body text-xs text-emerald-400">
            {t("newsletter.success")}
          </p>
        )}
      </div>
    </section>
  );
}
