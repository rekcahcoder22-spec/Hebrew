type Props = {
  index: string;
  title: string;
  body: string;
};

export function ManifestoCol({ index, title, body }: Props) {
  return (
    <article className="bg-[#0a0a0a] p-6">
      <p className="font-body text-[9px] uppercase tracking-[0.45em] text-[#8B1A1A]">
        {index}
      </p>
      <h3 className="mt-5 font-editorial text-3xl font-light italic text-[#f0ece8]">
        {title}
      </h3>
      <p className="mt-4 font-body text-sm font-light leading-7 text-[#5a5550]">
        {body}
      </p>
    </article>
  );
}
