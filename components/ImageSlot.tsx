import Image from "next/image";

type Props = {
  aspectRatio: string;
  label: string;
  hint?: string;
  imageSrc?: string;
  hoverImageSrc?: string;
  imageAlt?: string;
  fit?: "cover" | "contain";
  className?: string;
};

export function ImageSlot({
  aspectRatio,
  label,
  hint,
  imageSrc,
  hoverImageSrc,
  imageAlt,
  fit = "cover",
  className = "",
}: Props) {
  const fitClass = fit === "contain" ? "object-contain" : "object-cover";

  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden border border-dashed border-[#2a2020] bg-[#0f0b0b] ${className}`}
      style={{ aspectRatio }}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt ?? label}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`${fitClass} grayscale transition-opacity duration-300 ${hoverImageSrc ? "opacity-100 group-hover:opacity-0" : "opacity-100"}`}
        />
      ) : null}
      {imageSrc && hoverImageSrc ? (
        <Image
          src={hoverImageSrc}
          alt={`${imageAlt ?? label} back`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`${fitClass} grayscale opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
        />
      ) : null}
      {imageSrc ? (
        <div className="pointer-events-none absolute inset-0 bg-[#0a0a0a]/20" />
      ) : null}
      <div
        className={`flex flex-col items-center gap-3 px-4 text-center ${
          imageSrc ? "opacity-0" : "opacity-100"
        }`}
      >
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-4 w-4 stroke-[#3a2a2a]"
          fill="none"
          strokeWidth="1"
        >
          <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
          <circle cx="9" cy="10" r="1.5" />
          <path d="M20.5 15l-4.5-4.5-5.5 5.5" />
        </svg>
        <p className="font-body text-[9px] uppercase tracking-[0.35em] text-[#3a2a2a]">
          {label}
        </p>
        {hint ? (
          <p className="max-w-[80%] font-editorial text-[11px] italic text-[#2a2020]">
            {hint}
          </p>
        ) : null}
      </div>
    </div>
  );
}
