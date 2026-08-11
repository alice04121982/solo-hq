import type { Metadata } from "next";
import Image from "next/image";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { Section } from "@/components/section";
import { ShapeMark, Spark } from "@/components/shapes";

export const metadata: Metadata = {
  title: "About | CairnFertility",
  description:
    "CairnFertility is an independent information service helping solo parents, LGBTQ+ families, and couples compare IVF clinics — built in the open, with the story so far and what's coming next.",
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

const MILESTONES = [
  {
    tag: "Live",
    title: "Comparing UK and overseas clinics",
    body: "The clinic finder and matcher went live first: true-cost comparisons, HFEA-verified success rates where they exist, and filters for solo- and LGBTQ+-friendliness that most comparison sites don't ask about.",
  },
  {
    tag: "Live",
    title: "A guide for every family type",
    body: "Solo mums, solo dads, two mums, two dads, and couples each get their own guide, written for their actual path rather than adapted from a straight-couple template.",
  },
  {
    tag: "Live",
    title: "Real stories, honestly labelled",
    body: "Stories and quotes from the community, built to make an unfamiliar process feel less abstract, clearly marked as illustrative composites rather than presented as verified case studies.",
  },
  {
    tag: "Building now",
    title: "A community, not just a comparison tool",
    body: "The next thing we're building is a place to find other people at your stage, hear from people who've been through it, and find local meetups. That's what the waitlist below is for.",
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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
          <div>
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
          </div>

          {/* Arch-cropped photo — the same geometric mask the hero grid uses,
              with a spark pinned over the corner as on the CTA band. */}
          <div className="relative w-64 md:w-80 justify-self-center lg:justify-self-end">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full">
              <Image
                src="/photos/family-coast.webp"
                alt="Three generations of a family sitting together, looking out at the sea"
                fill
                sizes="(min-width: 768px) 320px, 256px"
                className="object-cover"
              />
            </div>
            <Spark
              size={64}
              className="shape-spin absolute -bottom-4 -left-6"
              style={{ color: "var(--lavender)" }}
            />
          </div>
        </div>
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

      {/* Our story — the running build-in-the-open log, merged in from the
          old /our-story page (which now redirects here). Sits last so the
          "building now" milestone hands straight off to the waitlist CTA. */}
      <Section band={3} id="story">
        <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">Our story</p>
        <h2
          className="font-sans font-bold text-foreground mb-5"
          style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
        >
          We&rsquo;re building this in the open.
        </h2>
        <p className="text-lg font-sans text-muted leading-relaxed mb-6" style={{ maxWidth: "58ch" }}>
          CairnFertility started from a simple frustration: comparing IVF clinics meant piecing together headline prices, scattered success rates, and no clear read on which clinics actually welcome solo parents and LGBTQ+ families. Here&rsquo;s what we&rsquo;ve built so far, and what&rsquo;s coming next.
        </p>
        <div className="max-w-3xl">
          {MILESTONES.map((m, i) => (
            <div
              key={m.title}
              className={`flex flex-col sm:flex-row gap-4 sm:gap-8 py-8 ${i !== 0 ? "border-t border-border" : ""}`}
            >
              <p
                className="text-[13px] font-[600] uppercase tracking-[0.15em] font-sans shrink-0 sm:w-32"
                style={{ color: m.tag === "Live" ? "var(--teal)" : "var(--lavender-dark)" }}
              >
                {m.tag}
              </p>
              <div>
                <h3 className="font-sans font-semibold text-foreground text-lg leading-snug mb-2">{m.title}</h3>
                <p className="text-[15px] font-sans text-muted leading-relaxed" style={{ maxWidth: "56ch" }}>{m.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CTASection />
    </main>
  );
}
