import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { Section } from "@/components/section";
import { CoverageChecker } from "@/components/us/coverage-checker";

export const metadata: Metadata = {
  title: "IVF Coverage Checker | CairnFertility US",
  description:
    "Find out whether the law requires your health plan to cover IVF. A few questions about where your cover comes from, with the source for every rule.",
  alternates: {
    canonical: "/us/coverage",
    languages: { "en-GB": "/funding", "en-US": "/us/coverage" },
  },
};

export default function CoverageCheckerPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto px-6 md:px-12 lg:px-16">
        <SiteNav />
      </div>

      {/* Same frame as the UK clinic matcher on /get-started: header and
          wizard as one centred journey on the dark green, the wizard in a
          white panel so its light-surface controls stay legible. */}
      <Section tone="teal" padding="py-12 md:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1
            className="font-sans font-bold mb-4 text-balance"
            style={{ fontSize: "clamp(2.75rem, 5vw, 5rem)", lineHeight: 1.06, color: "var(--on-teal)" }}
          >
            Does your plan have to cover IVF?
          </h1>
          <p className="text-[16px] font-sans leading-[1.65]" style={{ color: "var(--on-teal-muted)" }}>
            A few questions about where your health cover comes from. You&rsquo;ll see what the law
            requires of a plan like yours, with the source for every rule.
          </p>
          <p className="text-[13px] font-sans leading-relaxed mt-4" style={{ color: "var(--on-teal-muted)" }}>
            Your answers stay on your device. The checker runs entirely in your browser, and
            nothing you enter is sent to us or stored anywhere. See our{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-[var(--on-teal)] transition-colors">
              privacy policy
            </Link>
            .
          </p>
        </div>
      </Section>

      <Section tone="teal" padding="pb-16 md:pb-24">
        <div className="relative overflow-clip rounded-[24px] bg-background px-6 py-10 md:px-12 md:py-14">
          <CoverageChecker />
        </div>
      </Section>
    </main>
  );
}
