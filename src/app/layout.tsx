import type { Metadata } from "next";
import { Poetsen_One, Google_Sans } from "next/font/google";
import "./globals.css";

const poetsenOne = Poetsen_One({
  variable: "--font-poetsen",
  subsets: ["latin"],
  weight: "400",
});

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
    <html lang="en" className={`${poetsenOne.variable} ${googleSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
