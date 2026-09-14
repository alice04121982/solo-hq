import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KLEO Fertility: Your Guide to Building the Family You've Always Wanted",
  description:
    "Real guidance for every path to parenthood. Whether you're going solo, using donor conception, or building a same-sex family, KLEO has you covered.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/*
         * Ranade — KLEO's display typeface (Fontshare, free licence).
         * Excon  — KLEO's body typeface (Fontshare, free licence).
         * Both loaded in a single Fontshare request to minimise round-trips.
         * Weights: 400 Regular · 500 Medium · 700 Bold
         * Swap for next/font/local once woff2 files are procured.
         */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=ranade@400,500,700&f[]=excon@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
