import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { ShapeMark, Spark } from "@/components/shapes";
import { DATA_PROVENANCE } from "@/lib/clinics";
import { CLINIC_EXCLUSIONS } from "@/lib/clinic-exclusions";
import { HFEA } from "@/lib/regulators";

/**
 * The CMA's June 2021 consumer-law guidance for fertility clinics — adopted
 * here as Cairn's editorial standard for presenting prices and success rates.
 */
const CMA_FERTILITY_GUIDANCE_URL =
  "https://www.gov.uk/cma-cases/self-funded-ivf-consumer-law-guidance";

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
            <SectionHeading
              level={1}
              eyebrow="About"
              mark="bloom"
              title="IVF is confusing enough without the guesswork over cost."
              intro="CairnFertility is an independent information and comparison service. We help people considering IVF, whoever they are building a family with or without, understand their options and compare clinics on the numbers that actually matter."
              introWidth="58ch"
              className="mb-0"
            />
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
            <h2 className="font-sans font-bold text-teal mb-4" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
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
            <h2 className="font-sans font-bold text-teal mb-4" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
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
        <SectionHeading eyebrow="Our principles" mark="egg" title="What we build against" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-2xl bg-background p-6 md:p-7">
              <ShapeMark name={v.shape} size={28} className="mb-4" style={{ color: "var(--lavender)" }} />
              <h3 className="font-sans font-semibold text-teal text-lg mb-2">{v.title}</h3>
              <p className="text-sm font-sans text-muted leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Methodology — the editorial standard the numbers are held to, and
          where every figure comes from. This is the public statement behind
          the provenance notes shown beside the finder, matcher and guides. */}
      <Section band={3} id="methodology">
        <SectionHeading eyebrow="Methodology" mark="halves" title="How we check our numbers." className="mb-5" />
        <p className="text-lg font-sans text-muted leading-relaxed mb-4" style={{ maxWidth: "58ch" }}>
          Our editorial standard for presenting prices and success rates is the{" "}
          <a
            href={CMA_FERTILITY_GUIDANCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-teal hover:underline underline-offset-2"
          >
            Competition and Markets Authority&rsquo;s consumer law guidance for fertility
            clinics
            <ExternalLink className="inline h-3.5 w-3.5 ml-1 align-baseline" aria-hidden />
          </a>{" "}
          (June 2021). It was written for clinics, but it is the definitive UK statement of
          what fair price and success-rate information looks like, and we hold our own pages
          to it: all-in costs rather than headline prices, and success rates that always say
          what they measure, which year they cover, and where they come from.
        </p>
        <p className="text-[15px] font-sans text-muted leading-relaxed mb-8" style={{ maxWidth: "58ch" }}>
          In practice, that means:
        </p>
        <ul className="space-y-3 max-w-3xl">
          {[
            `UK success rates come from the ${HFEA.shortName}'s public Choose a Clinic register, the independently verified source, and are labelled with their year and denominator (live births per embryo transfer). Overseas figures are self-reported by each clinic and labelled as not independently verified.`,
            "A success-rate bracket a clinic has not published is shown as \"not published\" — never guessed, estimated, or filled with a zero.",
            `Prices are compiled from ${DATA_PROVENANCE.pricesSourceLabel} and sanity-checked against the HFEA's and NHS's national cost benchmarks. Our comparisons show the estimated all-in cost — medications, consultations, donor material, travel where relevant — beside the headline quote, never instead of it.`,
            `Every price-bearing page shows its verification date. The data was last re-verified on ${new Date(`${DATA_PROVENANCE.pricesVerifiedOn}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}, and an automated check fails our build if it goes stale, so an out-of-date figure cannot sit here quietly.`,
            "Fertility medications are discussed by category with typical cost ranges only. Prescription medicines are never named or promoted here: prescribing decisions belong with your clinician.",
            "Some clinics are deliberately not listed. Where credible reporting or an open regulatory investigation means we cannot stand behind what a clinic tells patients, we leave it out of the finder rather than list it with a caveat, and we say which clinics and why below.",
            "Spotted a figure that looks wrong or out of date? Email stories@cairnfertility.co.uk — corrections go to the top of the list.",
          ].map((item) => (
            <li key={item} className="text-[15px] font-sans text-muted leading-relaxed pl-5 border-l-2 border-border">
              {item}
            </li>
          ))}
        </ul>

        {/* The exclusions themselves, in full. A policy of leaving clinics
            out is only honest if the list is visible and sourced — the same
            standard we hold the numbers to. */}
        <div className="mt-12 rounded-[24px] bg-cream p-6 md:p-8" style={{ maxWidth: "72ch" }}>
          <h3 className="font-sans font-semibold text-foreground text-lg mb-2">
            Clinics we do not list
          </h3>
          <p className="text-[15px] font-sans text-muted leading-relaxed mb-6">
            Leaving a clinic out is not a finding against it, and nothing here is an allegation
            of ours. Each entry records what a named publication has reported, links to it, and
            notes any response on the record. Each is reviewed on the date shown.
          </p>
          <ul className="space-y-6">
            {CLINIC_EXCLUSIONS.map((x) => (
              <li key={x.name} className="pl-5 border-l-2 border-border">
                <p className="font-sans font-semibold text-teal text-[15px] mb-1">
                  {x.name} &mdash; {x.country}
                </p>
                <p className="text-[15px] font-sans text-muted leading-relaxed mb-2">{x.reason}</p>
                {x.response && (
                  <p className="text-[15px] font-sans text-muted leading-relaxed mb-2">
                    <span className="font-medium text-foreground">Their response:</span> {x.response}
                  </p>
                )}
                <p className="text-[13px] font-sans text-muted leading-relaxed">
                  Sources:{" "}
                  {x.sources.map((src, i) => (
                    <span key={src.url}>
                      {i > 0 && "; "}
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-teal hover:underline underline-offset-2"
                      >
                        {src.label}
                        <ExternalLink className="inline h-3 w-3 ml-1 align-baseline" aria-hidden />
                      </a>
                    </span>
                  ))}
                  . Next review{" "}
                  {new Date(`${x.reviewOn}T00:00:00Z`).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                  .
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Our story — the running build-in-the-open log, merged in from the
          old /our-story page (which now redirects here). Sits last so the
          "building now" milestone hands straight off to the waitlist CTA. */}
      <Section band={4} id="story">
        <SectionHeading
          eyebrow="Our story"
          mark="spark"
          markClassName="shape-spin"
          title="We’re building this in the open."
          className="mb-5"
        />
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
                <h3 className="font-sans font-semibold text-teal text-lg leading-snug mb-2">{m.title}</h3>
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
