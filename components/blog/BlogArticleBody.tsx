import type { BlogBlock } from "@/lib/blog";

export function BlogArticleBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <article className="space-y-6">
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2
              key={i}
              className="mt-10 border-l-2 border-hb-red pl-4 font-display text-2xl tracking-wide text-hb-white first:mt-0"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote
              key={i}
              className="border-l-2 border-luxury-gold/70 bg-hb-gray/50 py-4 pl-5 pr-4 font-editorial text-xl font-light italic leading-relaxed text-hb-white/85"
            >
              {block.text}
            </blockquote>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={i} className="space-y-2 pl-1">
              {block.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 font-body text-sm leading-[2] text-hb-white/65"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-hb-red" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p
            key={i}
            className="font-body text-sm leading-[2.1] tracking-[0.02em] text-hb-white/65"
          >
            {block.text}
          </p>
        );
      })}
    </article>
  );
}
