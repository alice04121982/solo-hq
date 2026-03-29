import type { Metadata } from "next";
import { Yeseva_One } from "next/font/google";
import "./globals.css";

const yesevaOne = Yeseva_One({
  variable: "--font-yeseva",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Solo HQ — The Definitive Platform for Solo Mums by Choice",
  description:
    "Real costs. Real guidance. Real community. Everything you need to navigate the solo motherhood journey with clarity and confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${yesevaOne.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
