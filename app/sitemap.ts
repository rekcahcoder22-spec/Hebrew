import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.hebrewstreet.com";

const staticRoutes = [
  "",
  "/shop",
  "/about",
  "/our-story",
  "/lookbook",
  "/stores",
  "/careers",
  "/cooperate",
  "/feedback",
  "/size-guide",
  "/care-instructions",
  "/payment-policy",
  "/delivery-policy",
  "/warranty-policy",
  "/return-policy",
  "/privacy-policy",
  "/adjustment-fees",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency:
      route === "" || route === "/shop"
        ? "daily"
        : route === "/stores"
          ? "weekly"
          : "weekly",
    priority:
      route === ""
        ? 1
        : route === "/shop"
          ? 0.95
          : route === "/stores" || route === "/our-story"
            ? 0.85
            : 0.7,
  }));
}
