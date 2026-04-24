"use client";

import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-void font-body text-hb-white antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
          <h1 className="font-display text-3xl tracking-wide text-hb-white">
            Something went wrong
          </h1>
          <p className="max-w-md text-sm text-hb-white/70">
            {error.message || "An unexpected error occurred."}
          </p>
          <button
            type="button"
            onClick={reset}
            className="border border-hb-border bg-hb-gray px-6 py-2 text-sm uppercase tracking-wider text-hb-white transition hover:border-hb-red hover:text-hb-red"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
