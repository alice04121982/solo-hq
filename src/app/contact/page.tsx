import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { LegalPageLayout } from "@/components/legal-page";
import { CopyButton } from "@/components/copy-button";
import { LEGAL_PAGES, LEGAL_CONTACT_EMAIL } from "@/lib/legal";

const page = LEGAL_PAGES.contact;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
};

export default function ContactPage() {
  return (
    <LegalPageLayout page={page}>
      {/* Email card — the one channel that exists today. */}
      <div className="mt-12 rounded-2xl bg-background border border-border p-6 md:p-8">
        <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-teal mb-3 font-sans">
          Email us
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${LEGAL_CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2.5 rounded-full border border-teal/35 px-5 py-2.5 text-sm font-sans font-[600] text-teal hover:bg-surface-hover transition-colors duration-150"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {LEGAL_CONTACT_EMAIL}
          </a>
          <CopyButton text={LEGAL_CONTACT_EMAIL} />
        </div>
        <p className="text-sm font-sans text-muted leading-relaxed mt-4" style={{ maxWidth: "56ch" }}>
          One inbox, read by real people. We aim to reply within five working
          days — sooner for anything urgent, and always within the statutory
          deadline for privacy requests.
        </p>
      </div>
    </LegalPageLayout>
  );
}
