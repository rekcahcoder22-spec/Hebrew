/** Lookbook VOLUME 06 — local + fallback Unsplash. `intrinsicW/H` giữ tỉ lệ layout (không dùng absolute). */
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

const U8 =
  "https://images.unsplash.com/photo-1635650804263-1a1941e14df5?auto=format&w=1600&q=85&fit=crop";

export const LOOKBOOK_VOLUME = {
  number: "06",
  shots: [
    {
      id: "01",
      src: "/images/lookbook/vol06/01-hero-louvers.png",
      fallbackSrc:
        "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&w=1600&q=85",
      alt: "HEBREW lookbook — hoodie industrial louvers",
      intrinsicW: 1600,
      intrinsicH: 2000,
      maxHeightClass: "max-h-[min(82vh,880px)]",
      objectPosition: "center 30%",
    },
    {
      id: "02",
      src: "/images/lookbook/vol06/02-beanie-profile.png",
      fallbackSrc:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&w=1200&q=85",
      alt: "HEBREW lookbook — beanie profile",
      intrinsicW: 1200,
      intrinsicH: 1500,
      maxHeightClass: "max-h-[min(70vh,720px)]",
      objectPosition: "center center",
    },
    {
      id: "03",
      src: "/images/lookbook/vol06/03-tattoo-industrial.png",
      fallbackSrc:
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&w=1400&q=85",
      alt: "HEBREW lookbook — industrial editorial",
      intrinsicW: 1400,
      intrinsicH: 1750,
      maxHeightClass: "max-h-[min(72vh,760px)]",
      objectPosition: "center center",
    },
    {
      id: "04",
      src: "/images/lookbook/vol06/04-street-crouch.png",
      fallbackSrc:
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&w=1600&q=85",
      alt: "HEBREW lookbook — streetwear urban",
      intrinsicW: 1600,
      intrinsicH: 2000,
      maxHeightClass: "max-h-[min(78vh,840px)]",
      objectPosition: "center 20%",
    },
    {
      id: "05",
      src: "/images/lookbook/vol06/05-graffiti-alley.png",
      fallbackSrc:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&w=2000&q=85",
      alt: "HEBREW lookbook — wide editorial spread",
      intrinsicW: 2400,
      intrinsicH: 1000,
      maxHeightClass: "max-h-[min(42vh,480px)]",
      objectPosition: "center center",
    },
    {
      id: "06",
      src: "/images/lookbook/vol06/06-motion-madworld.png",
      fallbackSrc:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&w=1400&q=85",
      alt: "HEBREW lookbook — motion editorial",
      intrinsicW: 1400,
      intrinsicH: 1400,
      maxHeightClass: "max-h-[min(60vh,640px)]",
      objectPosition: "center center",
    },
    {
      id: "07",
      src: "/images/lookbook/vol06/07-pacbell-steps.png",
      fallbackSrc:
        "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&w=1400&q=85",
      alt: "HEBREW lookbook — concrete street pose",
      intrinsicW: 1400,
      intrinsicH: 1750,
      maxHeightClass: "max-h-[min(74vh,800px)]",
      objectPosition: "center 25%",
    },
    {
      id: "08",
      src: U8,
      fallbackSrc: U8,
      alt: "HEBREW lookbook — dark streetwear portrait",
      intrinsicW: 1600,
      intrinsicH: 2000,
      maxHeightClass: "max-h-[min(72vh,780px)]",
      objectPosition: "center center",
    },
  ] satisfies LookbookShot[],
} as const;
