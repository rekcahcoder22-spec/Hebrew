import type { MetadataRoute } from "next";
import { getBlogSlugs } from "@/lib/blog";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.hebrewstreet.com";

const staticRoutes = [
  "",
  "/shop",
  "/blog",
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

  const blogEntries: MetadataRoute.Sitemap = getBlogSlugs().map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency:
      route === "" || route === "/shop"
        ? ("daily" as const)
        : ("weekly" as const),
    priority:
      route === ""
        ? 1
        : route === "/shop"
          ? 0.95
          : route === "/stores" || route === "/our-story"
            ? 0.85
            : route === "/blog"
              ? 0.8
              : 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
