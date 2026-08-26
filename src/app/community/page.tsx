import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { Section } from "@/components/section";
import { QuoteCard } from "@/components/quote-card";
import { BentoCard } from "@/components/bento-card";
import { CommunityApplicationForm } from "@/components/community-application-form";
import {
  COMMUNITY_FEATURES,
  JOIN_STEPS,
  PHONE_NUMBER_NOTICE,
  SAFETY_PROMISES,
} from "@/lib/community";
import { getCommunityPlatform } from "@/lib/community-invite";
import { COMMUNITY_QUOTES } from "@/lib/quotes";

export const metadata: Metadata = {
  title: "Join the Community | CairnFertility",
  description:
    "A small, vetted community for everyone doing IVF their own way. Every member is approved by a person, invites work once, and nothing said inside leaves the group. Apply to join.",
};

/**
 * The community page.
 *
 * It used to say "not open yet, join the waitlist". It is open now, and the
 * honest framing has moved rather than gone: applying is not joining, a person
 * reads every application, and not everyone gets in. Copy on this page must
 * keep that true — nothing here may imply instant access or a public link.
 */
export default function CommunityPage() {
  const platform = getCommunityPlatform();

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
            A small, guarded room for people doing IVF.
          </h1>
          <p className="text-lg font-sans text-muted leading-[1.65] mb-4" style={{ maxWidth: "58ch" }}>
            Solo or coupled, straight or queer — IVF is easier alongside
            people who get it. This is a private {platform} group, not a forum: no
            profiles, no comment threads, no strangers scrolling your worst
            week.
          </p>
          <p className="text-lg font-sans text-muted leading-[1.65] mb-10" style={{ maxWidth: "58ch" }}>
            It is open, and it is not open to everyone. Every member applied
            and was read by a person before they got in. That is slower than a
            join button, and it is the entire point.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#apply"
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-sans font-medium transition-opacity duration-200 hover:opacity-90"
              style={{ background: "var(--accent)", color: "var(--on-accent)" }}
            >
              Apply to Join
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/community/guidelines"
              className="inline-flex items-center justify-center gap-2 rounded-full border px-8 py-3.5 text-sm font-sans transition-colors duration-200 hover:bg-teal-10"
              style={{ borderColor: "var(--teal-35)", color: "var(--teal)" }}
            >
              Read the group rules
            </Link>
          </div>
        </div>
      </Section>

      {/* How joining works — set expectations before the form, not after */}
      <Section band={1}>
        <div className="max-w-2xl mb-14">
          <h2
            className="font-sans font-bold text-foreground mb-4"
            style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1 }}
          >
            How you get in.
          </h2>
          <p className="text-sm font-sans text-muted leading-relaxed" style={{ maxWidth: "50ch" }}>
            Four steps, one of which is a person reading what you wrote. There
            is no automatic route in, and there is no link to find.
          </p>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {JOIN_STEPS.map((step, i) => (
            <li key={step.title}>
              <span
                className="font-sans font-medium text-lg leading-none block mb-4"
                style={{ color: "var(--lavender-dark)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-sans font-medium text-foreground leading-tight mb-2">
                {step.title}
              </p>
              <p className="text-sm font-sans text-muted leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* How it's kept safe */}
      <Section tone="teal">
        <div className="max-w-2xl mb-14">
          <p
            className="text-[13px] font-[500] uppercase font-sans mb-6"
            style={{ color: "var(--accent)", letterSpacing: "1.65px" }}
          >
            How it stays safe
          </p>
          <h2
            className="font-sans font-bold mb-4"
            style={{
              fontSize: "clamp(2.5rem, 4vw, 4.25rem)",
              lineHeight: 1.1,
              color: "var(--on-teal)",
            }}
          >
            Nobody wanders in.
          </h2>
          <p
            className="text-sm font-sans leading-relaxed"
            style={{ color: "var(--on-teal-muted)", maxWidth: "52ch" }}
          >
            People going through fertility treatment are a target — for
            clinics, for supplement sellers, and occasionally for worse. Four
            things about how this group works, each of which we have to keep
            true.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {SAFETY_PROMISES.map((promise) => (
            <div key={promise.title}>
              <p
                className="font-sans font-medium leading-tight mb-2"
                style={{ color: "var(--on-teal)" }}
              >
                {promise.title}
              </p>
              <p
                className="text-sm font-sans leading-relaxed"
                style={{ color: "var(--on-teal-muted)", maxWidth: "44ch" }}
              >
                {promise.body}
              </p>
            </div>
          ))}
        </div>

        <p
          className="text-sm font-sans leading-relaxed mt-14 pt-10 border-t"
          style={{
            color: "var(--on-teal-muted)",
            borderColor: "rgba(249, 198, 218, 0.2)",
            maxWidth: "60ch",
          }}
        >
          {PHONE_NUMBER_NOTICE}
        </p>
      </Section>

      {/* Apply: what the group is for, beside the form itself */}
      <Section band={3} id="apply">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <h2
              className="font-sans font-bold text-foreground mb-4"
              style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1 }}
            >
              What it&rsquo;s for.
            </h2>
            <p className="text-sm font-sans text-muted leading-relaxed mb-10" style={{ maxWidth: "48ch" }}>
              Three things. No engagement tricks, no follower counts — just the
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
                    <p className="font-sans font-medium text-teal leading-tight mb-1.5">
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

          <BentoCard className="lg:sticky lg:top-8">
            <CommunityApplicationForm />
          </BentoCard>
        </div>
      </Section>

      {/* Voices — the people already ahead on the path */}
      <Section band={4}>
        <div className="mb-10">
          <h2
            className="font-sans font-bold text-foreground mb-3"
            style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1 }}
          >
            The people you&rsquo;ll meet.
          </h2>
          <p className="text-xs font-sans" style={{ color: "var(--muted)", maxWidth: "60ch" }}>
            Illustrative quotes while we collect real, consented accounts.
            Nothing said inside the group is ever quoted here.
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

      {/* Not ready — the lighter commitment */}
      <Section band={5} id="follow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p
              className="text-[13px] font-[500] uppercase font-sans mb-6"
              style={{ color: "var(--teal)", letterSpacing: "1.65px" }}
            >
              Not ready to join?
            </p>
            <h2
              className="font-sans font-bold text-foreground mb-4"
              style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1 }}
            >
              Follow our journey instead.
            </h2>
            <p className="text-sm font-sans text-muted leading-relaxed" style={{ maxWidth: "48ch" }}>
              We&rsquo;re building this in the open. Our story, on the About
              page, is the running log of what we&rsquo;re making and what
              we&rsquo;re learning about IVF along the way — clinic pricing,
              policy changes, and the community as it grows. No signup, no
              commitment, and applying later is always open.
            </p>
          </div>
          <div className="lg:pt-16 flex flex-col items-start gap-5">
            <Link
              href="/about#story"
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-sans font-medium transition-opacity duration-200 hover:opacity-90"
              style={{ background: "var(--accent)", color: "var(--on-accent)" }}
            >
              Read Our Story
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-xs font-sans text-muted">
              Or find us on the socials in the footer below — same honesty,
              shorter form.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
