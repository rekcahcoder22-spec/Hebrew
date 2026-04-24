import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 mt-10 border-l-2 border-hb-red pl-4 font-display text-3xl tracking-wide text-hb-white">
      {children}
    </h2>
  );
}

export function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 font-body text-sm leading-[2.2] tracking-wide text-hb-white/60">
      {children}
    </p>
  );
}

export function HighlightBox({
  children,
  accent = "red",
}: {
  children: React.ReactNode;
  accent?: "red" | "gold";
}) {
  return (
    <div
      className={`mb-6 border border-hb-border bg-hb-gray p-6 font-body text-sm leading-[2.2] text-hb-white/70 ${
        accent === "gold" ? "border-l-2 border-l-hb-gold" : "border-l-2 border-l-hb-red"
      }`}
    >
      {children}
    </div>
  );
}

export function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 flex gap-3">
      <span className="font-body text-sm text-hb-red">—</span>
      <p className="font-body text-sm leading-[2.2] text-hb-white/60">{children}</p>
    </div>
  );
}

export function StepItem({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-start gap-4">
      <span className="min-w-[48px] font-display text-3xl text-hb-red">
        {number}
      </span>
      <p className="font-body text-sm leading-[2.2] text-hb-white/60">{children}</p>
    </div>
  );
}

export function PolicyTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="mb-8 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="border-b border-hb-border bg-hb-gray p-3 text-left font-body text-[9px] uppercase tracking-[.2em] text-hb-white/50"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${row.join("-")}-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td
                  key={`${cell}-${cellIndex}`}
                  className="align-top border-b border-hb-border/50 p-3 font-body text-sm text-hb-white/60"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PolicyLayout({
  title,
  subtitle,
  children,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-hb-black">
      <div className="h-[2px] w-full bg-hb-red" />
      <Navbar />

      <header className="relative overflow-hidden border-b border-hb-border px-6 pb-16 pt-32">
        <div className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center font-display text-[20vw] text-hb-white/[0.02]">
          HEBREW
        </div>
        <div className="relative z-10 mx-auto max-w-6xl">
          <p className="mb-4 font-body text-[9px] uppercase tracking-[.2em] text-hb-white/30">
            HEBREW / {title}
          </p>
          <h1 className="font-display text-[clamp(48px,8vw,96px)] leading-none tracking-tight text-hb-white">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-3 font-body text-xs uppercase tracking-[.2em] text-hb-white/40">
              {subtitle}
            </p>
          ) : null}
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16">{children}</main>
      <Footer />
    </div>
  );
}
