"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error ?? "Login failed");
      }
      localStorage.setItem("hb-admin-auth", "true");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="font-display text-3xl tracking-[0.2em] text-gray-900">
          <span className="text-red-600">HEBREW</span> Admin
        </h1>
        <p className="mt-2 font-mono text-xs text-gray-500">
          Enter the admin password from brand settings.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block font-mono text-[10px] uppercase tracking-widest text-gray-500"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-gray-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
              autoComplete="current-password"
            />
          </div>
          {error && (
            <p className="font-mono text-xs text-red-600">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-red-600 py-3 font-mono text-xs uppercase tracking-widest text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <Link
          href="/"
          className="mt-6 inline-block font-mono text-xs text-gray-400 hover:text-gray-700"
        >
          ← Back to store
        </Link>
      </div>
    </div>
  );
}
