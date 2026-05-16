import type { Metadata } from "next";
import Link from "next/link";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllBlogPosts } from "@/lib/blog";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.hebrewstreet.com";

const BLOG_DESCRIPTION =
  "Blog HEBREW: streetwear Việt Nam, limited drop, collection ADORE, phối đồ, chăm sóc áo thun và hành trình phát triển local brand từ Đà Nẵng.";

export const metadata: Metadata = {
  title: "Blog | Streetwear, Local Brand & Câu chuyện HEBREW",
  description: BLOG_DESCRIPTION,
  alternates: { canonical: "/blog" },
  keywords: [
    "blog streetwear",
    "HEBREW blog",
    "local brand Việt Nam",
    "streetwear Việt Nam",
    "thương hiệu HEBREW",
  ],
  openGraph: {
    title: "Blog HEBREW | Streetwear & Local Brand Vietnam",
    description:
      "Bài viết về thương hiệu, collection, phối đồ và văn hóa streetwear Việt.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  const blogListJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "HEBREW Blog",
    description: BLOG_DESCRIPTION,
    url: `${siteUrl}/blog`,
    publisher: {
      "@type": "Organization",
      name: "HEBREW",
      url: siteUrl,
    },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      datePublished: p.publishedAt,
      url: `${siteUrl}/blog/${p.slug}`,
      author: { "@type": "Organization", name: p.author },
    })),
  };

  return (
    <div className="min-h-screen bg-hb-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListJsonLd) }}
      />

      <div className="h-[2px] w-full bg-hb-red" />

      <header className="relative overflow-hidden border-b border-hb-border px-6 pb-14 pt-28">
        <div className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-display text-[18vw] text-hb-white/[0.02]">
          HEBREW
        </div>
        <div className="relative z-10 mx-auto max-w-6xl">
          <p className="mb-3 font-body text-[9px] uppercase tracking-[0.25em] text-hb-white/35">
            HEBREW / BLOG
          </p>
          <h1 className="font-display text-[clamp(40px,7vw,80px)] leading-none tracking-tight text-hb-white">
            BLOG
          </h1>
          <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed tracking-[0.04em] text-hb-white/55">
            Câu chuyện thương hiệu, streetwear Việt, limited drop và vài mẹo
            phối đồ — viết cho người thích HEBREW và cho Google hiểu chúng tôi
            là ai.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-14 border border-hb-border bg-hb-gray/30 p-6 text-center sm:p-8">
          <p className="font-body text-sm text-hb-white/55">
            Muốn mua sản phẩm thay vì đọc?
          </p>
          <Link
            href="/shop"
            className="mt-4 inline-block font-body text-[11px] font-semibold uppercase tracking-[0.28em] text-hb-red transition hover:text-luxury-gold"
          >
            Vào cửa hàng →
          </Link>
        </div>
      </main>
    </div>
  );
}
