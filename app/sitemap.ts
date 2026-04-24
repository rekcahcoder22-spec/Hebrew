import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hebrew.vn";

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
  "/checkout",
  "/cart",
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
    changeFrequency: route === "" || route === "/shop" ? "daily" : "weekly",
    priority: route === "" ? 1 : route === "/shop" ? 0.9 : 0.7,
  }));
}
