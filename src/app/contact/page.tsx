import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { LegalPageLayout } from "@/components/legal-page";
import { CopyButton } from "@/components/copy-button";
import { LEGAL_PAGES, CONTACT_EMAILS } from "@/lib/legal";

const page = LEGAL_PAGES.contact;

/** Shown in the order a reader is most likely to need them. */
const INBOXES: { address: string; purpose: string }[] = [
  { address: CONTACT_EMAILS.general, purpose: "Questions, corrections, accessibility, complaints" },
  { address: CONTACT_EMAILS.privacy, purpose: "Data protection requests" },
  { address: CONTACT_EMAILS.stories, purpose: "Sharing your story" },
];

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
};

export default function ContactPage() {
  return (
    <LegalPageLayout page={page}>
      {/* Email card — the only channel that exists today. Three addresses,
          one mailbox behind them, each with its purpose beside it so nobody
          has to guess which one their message belongs in. */}
      <div className="mt-12 rounded-2xl bg-background p-6 md:p-8">
        <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-teal mb-4 font-sans">
          Email us
        </p>
        <ul className="flex flex-col gap-5">
          {INBOXES.map(({ address, purpose }) => (
            <li key={address} className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${address}`}
                  className="inline-flex items-center gap-2.5 rounded-full border border-teal/35 px-5 py-2.5 text-sm font-sans font-[600] text-teal hover:bg-surface-hover transition-colors duration-150"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  {address}
                </a>
                <CopyButton text={address} />
              </div>
              <p className="text-sm font-sans text-muted leading-relaxed">{purpose}</p>
            </li>
          ))}
        </ul>
        <p className="text-sm font-sans text-muted leading-relaxed mt-6 pt-6 border-t border-border" style={{ maxWidth: "56ch" }}>
          All three reach the same place, read by a real person — pick the
          wrong one and nothing is lost. We aim to reply within five working
          days, and always within the statutory deadline for privacy requests.
        </p>
      </div>
    </LegalPageLayout>
  );
}
