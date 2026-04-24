"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { isUploadImagePath } from "@/lib/image";
import { PRODUCT_IMAGE_BLUR_DATA_URL } from "@/lib/lqip";

export type ProgressiveProductImageProps = {
  /** Khi false: chỉ LQIP, không fetch ảnh gốc (lazy theo IO ở parent). */
  shouldLoad: boolean;
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
  unoptimized?: boolean;
  onLoad?: () => void;
  style?: CSSProperties;
};

/**
 * LQIP (blurDataURL) + next/image blur; lazy theo shouldLoad từ Intersection Observer.
 */
export function ProgressiveProductImage({
  shouldLoad,
  src,
  alt,
  fill = true,
  sizes,
  className,
  priority,
  unoptimized,
  onLoad,
  style,
}: ProgressiveProductImageProps) {
  const resolvedUnoptimized =
    typeof unoptimized === "boolean" ? unoptimized : isUploadImagePath(String(src));

  if (!shouldLoad) {
    return (
      <div className="absolute inset-0 overflow-hidden bg-card-well" aria-hidden>
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center opacity-60 blur-2xl"
          style={{ backgroundImage: `url(${PRODUCT_IMAGE_BLUR_DATA_URL})` }}
        />
        <div className="absolute inset-0 animate-pulse bg-blood-ink/20" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      placeholder="blur"
      blurDataURL={PRODUCT_IMAGE_BLUR_DATA_URL}
      unoptimized={resolvedUnoptimized}
      onLoad={onLoad}
      style={style}
    />
  );
}
