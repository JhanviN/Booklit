import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // ✅ Proper way to disable Turbopack in Next.js 16
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
