"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/products/new", label: "New product" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    localStorage.removeItem("hb-admin-auth");
    try {
      await fetch("/api/auth/admin-logout", { method: "POST" });
    } catch {
      // Ignore network failures while logging out locally.
    }
    router.push("/admin/login");
  };

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-gray-800 bg-gray-900 text-white md:w-56 md:border-b-0 md:border-r">
      <div className="px-5 py-6">
        <Link href="/admin" className="blocsk">
          <span className="font-display text-2xl tracking-[0.25em] text-red-600">
            HEBREW
          </span>
          <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-gray-400">
            Admin
          </span>
        </Link>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3 pb-6">
        {items.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2.5 font-mono text-xs uppercase tracking-widest transition",
                active
                  ? "bg-red-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white",
              )}
            >
              {item.label}
            </Link>
          );
        })}
        <Link
          href="/"
          className="mt-4 rounded-md px-3 py-2.5 font-mono text-xs uppercase tracking-widest text-gray-500 hover:bg-gray-800 hover:text-gray-200"
        >
          View store
        </Link>
        <button
          type="button"
          onClick={logout}
          className="mt-auto rounded-md px-3 py-2.5 text-left font-mono text-xs uppercase tracking-widest text-gray-500 hover:bg-gray-800 hover:text-red-400"
        >
          Log out
        </button>
      </nav>
    </aside>
  );
}
