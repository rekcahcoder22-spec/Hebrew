"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminChrome } from "@/components/admin/AdminChrome";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (isLogin) {
      setAllowed(true);
      setReady(true);
      return;
    }
    const ok = localStorage.getItem("hb-admin-auth") === "true";
    setAllowed(ok);
    setReady(true);
    if (!ok) {
      router.replace("/admin/login");
    }
  }, [isLogin, pathname, router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 font-mono text-sm text-gray-500">
        Loading…
      </div>
    );
  }

  if (isLogin) {
    return (
      <div className="min-h-screen bg-gray-50 font-mono text-gray-900">
        {children}
      </div>
    );
  }

  if (!allowed) {
    return null;
  }
  return <AdminChrome>{children}</AdminChrome>;
}
