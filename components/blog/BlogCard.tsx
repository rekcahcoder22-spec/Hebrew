import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col border border-hb-border bg-hb-gray/40 p-5 transition-colors hover:border-hb-red/50 hover:bg-hb-gray/70"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-body text-[9px] uppercase tracking-[0.22em] text-hb-red">
          {post.category}
        </span>
        <span className="font-body text-[9px] text-hb-white/30">·</span>
        <time
          dateTime={post.publishedAt}
          className="font-body text-[9px] uppercase tracking-[0.15em] text-hb-white/35"
        >
          {formatDate(post.publishedAt)}
        </time>
        <span className="font-body text-[9px] text-hb-white/30">·</span>
        <span className="font-body text-[9px] text-hb-white/35">
          {post.readMinutes} phút đọc
        </span>
      </div>
      <h2 className="mt-3 font-display text-2xl tracking-wide text-hb-white transition-colors group-hover:text-luxury-gold/90">
        {post.title}
      </h2>
      <p className="mt-3 line-clamp-3 flex-1 font-body text-sm leading-relaxed text-hb-white/50">
        {post.excerpt}
      </p>
      <span className="mt-4 font-body text-[10px] uppercase tracking-[0.2em] text-hb-white/40 transition-colors group-hover:text-hb-red">
        Đọc tiếp →
      </span>
    </Link>
  );
}
