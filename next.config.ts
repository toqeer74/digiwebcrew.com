import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Next 16 only honours quality values declared here; anything else falls
    // back to 75. 45 is for decorative art (low-opacity backgrounds) where the
    // compression is imperceptible but the byte saving is not.
    qualities: [45, 60, 75],
    minimumCacheTTL: 31536000,
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "127.0.0.1:3000", "localhost:*", "127.0.0.1:*"],
    },
  },
};

export default nextConfig;
