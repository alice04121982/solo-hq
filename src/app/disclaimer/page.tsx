import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal-page";
import { LEGAL_PAGES } from "@/lib/legal";

const page = LEGAL_PAGES.disclaimer;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
};

export default function DisclaimerPage() {
  return <LegalPageLayout page={page} />;
}
