import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal-page";
import { LEGAL_PAGES } from "@/lib/legal";

const page = LEGAL_PAGES.cookies;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
};

export default function CookiesPage() {
  return <LegalPageLayout page={page} />;
}
