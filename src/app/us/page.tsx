import type { Metadata } from "next";
import { ArrowRight, ExternalLink } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { Section } from "@/components/section";
import { MarketArrivalNote } from "@/components/market-arrival-note";
import { CHECKED_STATE_NAMES } from "@/lib/us-coverage";

export const metadata: Metadata = {
  alternates: {
    canonical: "/us",
    languages: { "en-GB": "/", "en-US": "/us", "x-default": "/" },
  },
};

/**
 * What comes first on the US site, in build order. The coverage checker
 * leads because in the US the first question is who pays, and the answer
 * depends on how a health plan is funded before it depends on the state.
 */
const COMING = [
  {
    title: "A coverage checker, in draft now",
    body: `Answer a few questions about your health plan: who provides it, how it's funded, and which state regulates it. You'll see what IVF cover the law requires for a plan like yours. It runs in your browser and stores nothing. ${CHECKED_STATE_NAMES} first, other states to follow.`,
  },
  {
    title: "US clinic costs, in dollars",
    body: "Clinic prices and success rates with the source and date shown on every figure. No clinic can pay to rank higher.",
  },
  {
    title: "State guides, starting with California and New York",
    body: "What each state's law means for solo parents, two mums and two dads: coverage, legal parenthood, donors and embryo storage.",
  },
];

export default function UsHome() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto px-6 md:px-12 lg:px-16">
        <SiteNav />
      </div>

      <Section band={0} padding="py-16 md:py-24" backdrop={{ shape: "dots" }}>
        <div className="max-w-3xl">
          <MarketArrivalNote market="us" />
          <h1
            className="font-sans font-bold text-teal mb-6 text-balance"
            style={{ fontSize: "clamp(2.75rem, 5vw, 5rem)", lineHeight: 1.06 }}
          >
            What will IVF cost you in the US?
          </h1>
          <p className="text-lg font-sans text-muted leading-relaxed" style={{ maxWidth: "62ch" }}>
            In the US, the answer depends on your health plan and your state, and
            it&rsquo;s rarely written down anywhere you can find it. We&rsquo;re
            building Cairn for the US to answer it plainly, for every kind of
            family.
          </p>
          <a
            href="/us/coverage"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-sans font-medium transition-opacity duration-200 hover:opacity-90"
            style={{ background: "var(--accent)", color: "var(--on-accent)" }}
          >
            Check your coverage
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </Section>

      <Section band={1} padding="py-16 md:py-24">
        <h2
          className="font-sans font-bold text-foreground mb-10"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.15 }}
        >
          What&rsquo;s coming first
        </h2>
        <ol className="grid gap-10 md:grid-cols-3 md:gap-12">
          {COMING.map((item) => (
            <li key={item.title}>
              <h3 className="font-sans font-semibold text-teal text-xl mb-3 text-balance">
                {item.title}
              </h3>
              <p className="font-sans text-muted leading-relaxed">{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section band={2} padding="py-16 md:py-24">
        <div className="max-w-3xl">
          <h2
            className="font-sans font-bold text-foreground mb-4"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.15 }}
          >
            Until then
          </h2>
          <p className="font-sans text-muted leading-relaxed mb-8" style={{ maxWidth: "62ch" }}>
            The medical steps of IVF are the same in both countries, and our UK
            guide explains them one at a time. For US insurance questions today,
            RESOLVE, the national infertility association, keeps a state-by-state
            guide.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/how-ivf-works"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-sans font-medium transition-opacity duration-200 hover:opacity-90"
              style={{ background: "var(--accent)", color: "var(--on-accent)" }}
            >
              How IVF works
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="https://resolve.org/learn/financial-resources/insurance-coverage/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-8 py-3.5 text-sm font-sans font-medium text-teal transition-colors duration-200 hover:bg-surface-warm"
              style={{ borderColor: "var(--teal-35)" }}
            >
              RESOLVE coverage guide
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}
