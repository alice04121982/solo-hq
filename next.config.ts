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
      // The old Flying Solo production domain. Vercel redirects it to
      // cairnfertility.vercel.app at platform level (both domains are
      // attached to the project); this app-level rule is a backstop in case
      // that platform redirect is ever removed.
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
