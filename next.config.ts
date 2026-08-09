import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      // The old Flying Solo production domain. Requires solo-hq.vercel.app to
      // stay attached to the renamed Vercel project so requests still reach
      // this app to be redirected.
      {
        source: "/:path*",
        has: [{ type: "host", value: "solo-hq.vercel.app" }],
        destination: "https://cairnfertility.vercel.app/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
