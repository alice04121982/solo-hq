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
      // this app to be redirected. The destination is the account-scoped
      // production domain; if the clean cairnfertility.vercel.app domain is
      // ever added to the Vercel project, point this (and metadataBase in
      // src/app/layout.tsx) at it instead.
      {
        source: "/:path*",
        has: [{ type: "host", value: "solo-hq.vercel.app" }],
        destination:
          "https://cairnfertility-alicecharlottesmith-7723s-projects.vercel.app/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
