import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flying Solo — The Definitive Platform for Solo Mums by Choice",
  description:
    "Real costs. Real guidance. Real community. Everything you need to navigate the solo motherhood journey with clarity and confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
