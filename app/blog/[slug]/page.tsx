import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogArticleBody } from "@/components/blog/BlogArticleBody";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getBlogSlugs,
} from "@/lib/blog";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.hebrewstreet.com";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Bài viết không tồn tại" };

  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const all = getAllBlogPosts();
  const related = all.filter((p) => p.slug !== slug).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "HEBREW",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/favicon.png` },
    },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    inLanguage: "vi",
  };

  return (
    <div className="min-h-screen bg-hb-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="h-[2px] w-full bg-hb-red" />

      <header className="border-b border-hb-border px-6 pb-12 pt-28">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="font-body text-[10px] uppercase tracking-[0.22em] text-hb-white/40 transition hover:text-hb-red"
          >
            ← Blog HEBREW
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="font-body text-[9px] uppercase tracking-[0.2em] text-hb-red">
              {post.category}
            </span>
            <span className="text-hb-white/25">·</span>
            <time
              dateTime={post.publishedAt}
              className="font-body text-[9px] uppercase tracking-[0.15em] text-hb-white/40"
            >
              {formatDate(post.publishedAt)}
            </time>
            <span className="text-hb-white/25">·</span>
            <span className="font-body text-[9px] text-hb-white/40">
              {post.readMinutes} phút đọc
            </span>
          </div>
          <h1 className="mt-4 font-display text-[clamp(32px,5vw,52px)] leading-tight tracking-tight text-hb-white">
            {post.title}
          </h1>
          <p className="mt-4 font-body text-base leading-relaxed tracking-[0.03em] text-hb-white/55">
            {post.excerpt}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="border border-hb-border px-2 py-0.5 font-body text-[9px] uppercase tracking-wider text-hb-white/35"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <BlogArticleBody blocks={post.blocks} />

        <div className="mt-14 flex flex-wrap gap-4 border-t border-hb-border pt-8">
          <Link
            href="/shop"
            className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-hb-red hover:text-luxury-gold"
          >
            Xem sản phẩm →
          </Link>
          <Link
            href="/our-story"
            className="font-body text-[11px] uppercase tracking-[0.24em] text-hb-white/45 hover:text-hb-white"
          >
            Our Story
          </Link>
          <Link
            href="/adore"
            className="font-body text-[11px] uppercase tracking-[0.24em] text-hb-white/45 hover:text-hb-white"
          >
            Collection ADORE
          </Link>
        </div>

        {related.length > 0 ? (
          <section className="mt-16 border-t border-hb-border pt-10">
            <h2 className="font-display text-xl tracking-wide text-hb-white">
              Đọc thêm
            </h2>
            <ul className="mt-6 space-y-4">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="group block border border-hb-border/60 bg-hb-gray/20 px-4 py-3 transition hover:border-hb-red/40"
                  >
                    <p className="font-body text-[9px] uppercase tracking-wider text-hb-red/80">
                      {r.category}
                    </p>
                    <p className="mt-1 font-body text-sm text-hb-white/75 transition group-hover:text-hb-white">
                      {r.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
    </div>
  );
}
