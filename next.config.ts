import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: !process.env.VERCEL,
    remotePatterns: [
      { protocol: "https", hostname: "logo.clearbit.com" },
      { protocol: "https", hostname: "t3.gstatic.com" },
    ],
  },
};

export default nextConfig;
