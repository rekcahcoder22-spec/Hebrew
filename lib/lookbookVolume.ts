/** Lookbook VOLUME 06 — ADORE editorial. `intrinsicW/H` giữ tỉ lệ layout (không dùng absolute). */
export type LookbookShot = {
  id: string;
  src: string;
  fallbackSrc: string;
  alt: string;
  intrinsicW: number;
  intrinsicH: number;
  /** Giới hạn cao hiển thị (viewport) */
  maxHeightClass?: string;
  objectPosition?: string;
};

export const LOOKBOOK_VOLUME = {
  number: "06",
  shots: [
    {
      id: "01",
      src: "/images/lookbook/vol06/01-tee2-front.png",
      fallbackSrc: "/images/lookbook/vol06/01-tee2-front.png",
      alt: "HEBREW lookbook — ADORE Part I: The Birth, front graphic",
      intrinsicW: 764,
      intrinsicH: 1024,
      maxHeightClass: "max-h-[min(82vh,880px)]",
      objectPosition: "center center",
    },
    {
      id: "02",
      src: "/images/lookbook/vol06/02-tee3-front.png",
      fallbackSrc: "/images/lookbook/vol06/02-tee3-front.png",
      alt: "HEBREW lookbook — The Crypt, The Inevitable",
      intrinsicW: 764,
      intrinsicH: 1024,
      maxHeightClass: "max-h-[min(70vh,720px)]",
      objectPosition: "center center",
    },
    {
      id: "03",
      src: "/images/lookbook/vol06/03-tee3-front-alt.png",
      fallbackSrc: "/images/lookbook/vol06/03-tee3-front-alt.png",
      alt: "HEBREW lookbook — The Crypt street editorial",
      intrinsicW: 764,
      intrinsicH: 1024,
      maxHeightClass: "max-h-[min(72vh,760px)]",
      objectPosition: "center center",
    },
    {
      id: "04",
      src: "/images/lookbook/vol06/04-tee1-front.png",
      fallbackSrc: "/images/lookbook/vol06/04-tee1-front.png",
      alt: "HEBREW lookbook — HEBREW® oversized tee",
      intrinsicW: 764,
      intrinsicH: 1024,
      maxHeightClass: "max-h-[min(78vh,840px)]",
      objectPosition: "center center",
    },
    {
      id: "05",
      src: "/images/lookbook/vol06/05-tee3-editorial.png",
      fallbackSrc: "/images/lookbook/vol06/05-tee3-editorial.png",
      alt: "HEBREW lookbook — The Crypt golden hour",
      intrinsicW: 764,
      intrinsicH: 1024,
      maxHeightClass: "max-h-[min(74vh,800px)]",
      objectPosition: "center center",
    },
    {
      id: "06",
      src: "/images/lookbook/vol06/06-tee1-street.png",
      fallbackSrc: "/images/lookbook/vol06/06-tee1-street.png",
      alt: "HEBREW lookbook — HEBREW street editorial",
      intrinsicW: 764,
      intrinsicH: 1024,
      maxHeightClass: "max-h-[min(72vh,780px)]",
      objectPosition: "center center",
    },
    {
      id: "07",
      src: "/images/lookbook/vol06/07-tee2-editorial.png",
      fallbackSrc: "/images/lookbook/vol06/07-tee2-editorial.png",
      alt: "HEBREW lookbook — ADORE Part I: The Birth editorial",
      intrinsicW: 764,
      intrinsicH: 1024,
      maxHeightClass: "max-h-[min(74vh,800px)]",
      objectPosition: "center center",
    },
    {
      id: "08",
      src: "/images/lookbook/vol06/08-tee3-back.png",
      fallbackSrc: "/images/lookbook/vol06/08-tee3-back.png",
      alt: "HEBREW lookbook — The Inevitable back print",
      intrinsicW: 764,
      intrinsicH: 1024,
      maxHeightClass: "max-h-[min(72vh,780px)]",
      objectPosition: "center center",
    },
  ] satisfies LookbookShot[],
} as const;
