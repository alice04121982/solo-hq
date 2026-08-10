import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal-page";
import { LEGAL_PAGES } from "@/lib/legal";

const page = LEGAL_PAGES.terms;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
};

export default function TermsPage() {
  return <LegalPageLayout page={page} />;
}
