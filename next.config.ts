import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "tfpondyiyfjwtbwexedp.supabase.co",
      },
      {
        protocol: "https",
        hostname: "madur.in",
      },
      {
        protocol: "https",
        hostname: "www.madur.in",
      },
      {
        protocol: "http",
        hostname: "localhost",
      }
    ],
  },
};

export default nextConfig;
