import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const generalSans = localFont({
  src: [
    { path: "./fonts/GeneralSans-Variable.woff2", style: "normal" },
    { path: "./fonts/GeneralSans-VariableItalic.woff2", style: "italic" },
  ],
  variable: "--font-general-sans",
  weight: "100 900",
  display: "swap",
});

const siteDescription =
  "Cairn compares IVF clinics on cost, success rates and eligibility, for solo mums, solo dads, two mums, two dads, and couples.";

export const metadata: Metadata = {
  // Canonical origin for absolute metadata URLs (Open Graph images, etc.).
  // cairnfertility.co.uk is held defensively and redirects here.
  metadataBase: new URL("https://cairnfertility.com"),
  title: "CairnFertility | Compare IVF Clinics",
  description: siteDescription,
  // Pre-launch: keep the site out of search results while photography rights
  // and contact routing are still being settled. Remove this alongside
  // src/app/robots.ts when launching — see that file's note.
  robots: { index: false, follow: false },
  openGraph: {
    title: "CairnFertility | Compare IVF Clinics",
    description: siteDescription,
    siteName: "CairnFertility",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CairnFertility | Compare IVF Clinics",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${generalSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
