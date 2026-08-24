import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal-page";
import { LEGAL_PAGES } from "@/lib/legal";

const page = LEGAL_PAGES.privacy;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
};

export default function PrivacyPage() {
  return <LegalPageLayout page={page} />;
}
