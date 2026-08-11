import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { Section } from "@/components/section";
import { QuoteCard } from "@/components/quote-card";
import { BentoCard } from "@/components/bento-card";
import { WaitlistForm } from "@/components/waitlist-form";
import { FollowJourney } from "@/components/follow-journey";
import { COMMUNITY_FEATURES } from "@/lib/community";
import { COMMUNITY_QUOTES } from "@/lib/quotes";

export const metadata: Metadata = {
  title: "Join the Community | Cairn Fertility",
  description:
    "A community for everyone doing IVF their own way — find others at your stage, hear from people who've been through it, and set up local meetups. Join the waitlist.",
};

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto px-6 md:px-12 lg:px-16">
        <SiteNav />
      </div>

      {/* Hero */}
      <Section band={0} padding="py-20 md:py-28" backdrop={{ shape: "dots", side: "right" }}>
        <div className="max-w-3xl">
          <p
            className="text-[13px] font-[500] uppercase font-sans mb-6"
            style={{ color: "var(--teal)", letterSpacing: "1.65px" }}
          >
            Join the community
          </p>
          <h1
            className="font-sans font-bold text-foreground mb-6"
            style={{ fontSize: "clamp(2.75rem, 5vw, 5rem)", lineHeight: 1.06 }}
          >
            A community for everyone doing IVF their own way.
          </h1>
          <p className="text-lg font-sans text-muted leading-[1.65] mb-4" style={{ maxWidth: "58ch" }}>
            Solo, same-sex, or together — IVF is easier alongside people who
            get it. We are building that place now: somewhere to find others
            at your stage, ask people who have been through it, and meet up
            in real life.
          </p>
          <p className="text-lg font-sans text-muted leading-[1.65] mb-10" style={{ maxWidth: "58ch" }}>
            It is not open yet. The waitlist is how you get in first — and
            what you tell us when you join decides what we build first.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#waitlist"
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-sans font-medium transition-opacity duration-200 hover:opacity-90"
              style={{ background: "var(--accent)", color: "var(--on-accent)" }}
            >
              Join the Waitlist
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#follow"
              className="inline-flex items-center justify-center gap-2 rounded-full border px-8 py-3.5 text-sm font-sans transition-colors duration-200 hover:bg-teal-10"
              style={{ borderColor: "var(--teal-35)", color: "var(--teal)" }}
            >
              Just follow along for now
            </a>
          </div>
        </div>
      </Section>

      {/* Waitlist: what we're building beside the form itself */}
      <Section band={1} id="waitlist">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <h2
              className="font-sans font-bold text-foreground mb-4"
              style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1 }}
            >
              What we&rsquo;re building.
            </h2>
            <p className="text-sm font-sans text-muted leading-relaxed mb-10" style={{ maxWidth: "48ch" }}>
              Three things, in whatever order the waitlist tells us matters
              most. No engagement tricks, no follower counts — just the
              people and the conversations.
            </p>

            <ol className="space-y-8">
              {COMMUNITY_FEATURES.map((f, i) => (
                <li key={f.title} className="flex items-start gap-4">
                  <span
                    className="font-sans font-medium text-lg leading-none shrink-0 mt-0.5"
                    style={{ color: "var(--lavender-dark)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-sans font-medium text-foreground leading-tight mb-1.5">
                      {f.title}
                    </p>
                    <p className="text-sm font-sans text-muted leading-relaxed" style={{ maxWidth: "46ch" }}>
                      {f.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <BentoCard white className="lg:sticky lg:top-8">
            <WaitlistForm />
          </BentoCard>
        </div>
      </Section>

      {/* Voices — the people already ahead on the path */}
      <Section band={2}>
        <div className="mb-10">
          <h2
            className="font-sans font-bold text-foreground mb-3"
            style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1 }}
          >
            The people you&rsquo;ll meet.
          </h2>
          <p className="text-xs font-sans" style={{ color: "var(--muted)", maxWidth: "60ch" }}>
            Illustrative quotes while we collect real, consented accounts.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {COMMUNITY_QUOTES.slice(0, 3).map((q, i) => (
            <QuoteCard
              key={q.name}
              quote={q.quote}
              name={q.name}
              eyebrow={q.stage}
              meta={[q.location]}
              avatar={q.avatar}
              tone={i === 1 ? "teal" : "pink"}
            />
          ))}
        </div>
      </Section>

      {/* Follow along — the lighter commitment */}
      <Section tone="teal" id="follow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p
              className="text-[13px] font-[500] uppercase font-sans mb-6"
              style={{ color: "var(--accent)", letterSpacing: "1.65px" }}
            >
              Not ready to join?
            </p>
            <h2
              className="font-sans font-bold mb-4"
              style={{
                fontSize: "clamp(2.5rem, 4vw, 4.25rem)",
                lineHeight: 1.1,
                color: "var(--on-teal)",
              }}
            >
              Follow our journey instead.
            </h2>
            <p
              className="text-sm font-sans leading-relaxed"
              style={{ color: "var(--on-teal-muted)", maxWidth: "48ch" }}
            >
              A fortnightly letter on what we&rsquo;re building and what
              we&rsquo;re learning about IVF along the way — clinic pricing,
              policy changes, and stories from the community as it forms. No
              name required, no commitment, unsubscribe any time.
            </p>
          </div>
          <div className="lg:pt-16">
            <FollowJourney />
            <p className="text-xs font-sans mt-5" style={{ color: "var(--on-teal-muted)" }}>
              No spam. No toxic positivity. Just the real stuff, fortnightly.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
