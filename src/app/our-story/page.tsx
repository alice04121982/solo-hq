import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Our Story | CairnFertility",
  description: "Follow along as we build CairnFertility in the open: what's live today, what we're building next, and why.",
};

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

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto px-6 md:px-12 lg:px-16">
        <SiteNav />
      </div>

      {/* Header */}
      <Section band={0} padding="pt-12 pb-16 md:pt-16 md:pb-20">
        <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">Our story</p>
        <h1
          className="font-sans font-bold text-foreground mb-5"
          style={{ fontSize: "clamp(2.75rem, 5vw, 5.5rem)", lineHeight: 1.05, maxWidth: "20ch" }}
        >
          We&rsquo;re building this in the open.
        </h1>
        <p className="text-lg font-sans text-muted leading-relaxed" style={{ maxWidth: "58ch" }}>
          CairnFertility started from a simple frustration: comparing IVF clinics meant piecing together headline prices, scattered success rates, and no clear read on which clinics actually welcome solo parents and LGBTQ+ families. Here&rsquo;s what we&rsquo;ve built so far, and what&rsquo;s coming next.
        </p>
      </Section>

      {/* Milestone timeline */}
      <Section band={1}>
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
