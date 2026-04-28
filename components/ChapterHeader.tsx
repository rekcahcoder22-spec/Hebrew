import { EyebrowLabel } from "@/components/EyebrowLabel";

type Props = {
  number: string;
  title: string;
};

export function ChapterHeader({ number, title }: Props) {
  return (
    <header className="mb-8 space-y-3">
      <EyebrowLabel>{number}</EyebrowLabel>
      <div className="flex items-center gap-4">
        <h2 className="font-editorial text-4xl font-light italic text-[#f0ece8] md:text-5xl">
          {title}
        </h2>
        <span className="h-px flex-1 bg-[#8B1A1A]" />
      </div>
    </header>
  );
}
