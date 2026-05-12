import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  turbopack: {
    root: __dirname,
  },
  poweredByHeader: false,
  compress: true,
  async headers() {
    const isDev = process.env.NODE_ENV === "development";

    /** Dev: no upgrade-insecure-requests - it can force https://localhost while next dev is http-only → blank page. No HSTS on localhost. */
    const cspBase =
      "default-src 'self'; " +
      "img-src 'self' data: blob: https://res.cloudinary.com https://images.unsplash.com; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "font-src 'self' https://fonts.gstatic.com data:; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
      "connect-src 'self' https://ipapi.co; " +
      "frame-ancestors 'none'; base-uri 'self'; form-action 'self'";
    const csp = isDev ? cspBase : `${cspBase}; upgrade-insecure-requests`;

    const headers: { key: string; value: string }[] = [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];
    if (!isDev) {
      headers.push({
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload",
      });
    }
    headers.push({ key: "Content-Security-Policy", value: csp });

    return [{ source: "/(.*)", headers }];
  },
  images: {
    qualities: [75, 96],
    localPatterns: [
      {
        pathname: "/uploads/**",
        search: "",
      },
      {
        pathname: "/api/upload/**",
        search: "",
      },
      {
        pathname: "/images/**",
        search: "",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [80, 160, 320, 480, 640],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
