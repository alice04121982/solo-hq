import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { Section } from "@/components/section";
import { ShapeMark } from "@/components/shapes";

export const metadata: Metadata = {
  title: "About | CairnFertility",
  description: "CairnFertility is an independent information service helping solo parents, LGBTQ+ families, and couples compare IVF clinics on cost, success rates, and eligibility.",
};

const VALUES = [
  {
    shape: "bloom" as const,
    title: "Every family, on equal footing",
    body: "Solo mums, solo dads, two mums, two dads, straight couples: the guides, comparisons, and tools here are built for all of it, not retrofitted from a template built for one kind of family.",
  },
  {
    shape: "spark" as const,
    title: "The real cost, not the headline one",
    body: "Clinics abroad often look cheaper until flights and hotels are added. We show the honest, all-in comparison next to UK options so a price is something you can actually plan around.",
  },
  {
    shape: "egg" as const,
    title: "Evidence over hype",
    body: "Success rates are population statistics, not a promise. We label HFEA-verified UK data separately from self-reported overseas figures, and we say plainly when a treatment add-on has no strong evidence behind it.",
  },
  {
    shape: "halves" as const,
    title: "Privacy by design",
    body: "No accounts, no cookies, no tracking. The clinic matcher's answers, including anything about your health, stay in your browser. We built it that way on purpose, not as an afterthought.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto px-6 md:px-12 lg:px-16">
        <SiteNav />
      </div>

      {/* Header */}
      <Section band={0} padding="pt-12 pb-16 md:pt-16 md:pb-20">
        <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">About</p>
        <h1
          className="font-sans font-bold text-foreground mb-5"
          style={{ fontSize: "clamp(2.75rem, 5vw, 5.5rem)", lineHeight: 1.05, maxWidth: "18ch" }}
        >
          IVF is confusing enough without the guesswork over cost.
        </h1>
        <p className="text-lg font-sans text-muted leading-relaxed" style={{ maxWidth: "58ch" }}>
          CairnFertility is an independent information and comparison service. We help people considering IVF, whoever they are building a family with or without, understand their options and compare clinics on the numbers that actually matter.
        </p>
      </Section>

      {/* What we are / aren't */}
      <Section band={1}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <h2 className="font-sans font-bold text-foreground mb-4" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
              What we do
            </h2>
            <ul className="space-y-3">
              {[
                "Compare UK and overseas IVF clinics on true cost, verified success rates, and solo- and LGBTQ+-friendliness.",
                "Publish plain-English guides for every family type and every stage of the process.",
                "Run a clinic matcher that narrows the field to your situation, entirely in your own browser.",
                "Share real, illustrative stories from the community, clearly labelled as composites.",
              ].map((item) => (
                <li key={item} className="text-[15px] font-sans text-muted leading-relaxed pl-5 border-l-2 border-border">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-sans font-bold text-foreground mb-4" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
              What we don&rsquo;t
            </h2>
            <ul className="space-y-3">
              {[
                "We are not a clinic, agent, or broker, and we take no payment for a clinic's inclusion or placement.",
                "We don't give medical advice. Our matcher filters public information; it doesn't assess your fertility.",
                "We don't sell data, run ads, or track you. There's simply nothing here built to do that.",
                "We don't claim a published success rate predicts your own outcome. It doesn't, and no site should say it does.",
              ].map((item) => (
                <li key={item} className="text-[15px] font-sans text-muted leading-relaxed pl-5 border-l-2 border-border">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section band={2} backdrop={{ shape: "dots", side: "left" }}>
        <div className="mb-10">
          <h2
            className="font-sans font-bold text-foreground mb-4"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
          >
            What we build against
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-2xl bg-background border border-border p-6 md:p-7">
              <ShapeMark name={v.shape} size={28} className="mb-4" style={{ color: "var(--lavender)" }} />
              <h3 className="font-sans font-semibold text-foreground text-lg mb-2">{v.title}</h3>
              <p className="text-sm font-sans text-muted leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection />
    </main>
  );
}
