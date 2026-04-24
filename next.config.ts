import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 96],
    localPatterns: [
      {
        pathname: "/uploads/**",
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
    formats: ["image/webp"],
  },
};

export default nextConfig;
