import type { Metadata } from "next";
import { Abhaya_Libre } from "next/font/google";
import "./globals.css";

const abhayaLibre = Abhaya_Libre({
  variable: "--font-abhaya",
  subsets: ["latin"],
  weight: "500",
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
    <html lang="en" className={`${abhayaLibre.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
