type Props = {
  quote: string;
  attribution?: string;
};

export function QuoteBlock({ quote, attribution }: Props) {
  return (
    <section className="border-y border-[#1b1b1b] bg-[#0a0a0a] px-6 py-20 text-center md:px-10">
      <p className="mx-auto max-w-4xl font-editorial text-4xl font-light italic leading-tight text-[#f0ece8] md:text-6xl">
        {quote}
      </p>
      {attribution ? (
        <p className="mt-8 font-body text-[9px] uppercase tracking-[0.45em] text-[#8B1A1A]">
          {attribution}
        </p>
      ) : null}
    </section>
  );
}
