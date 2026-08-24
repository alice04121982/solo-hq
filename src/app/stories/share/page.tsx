import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { ShareStoryForm } from "@/components/share-story-form";

export const metadata: Metadata = {
  title: "Share Your Story | Cairn Fertility",
  description:
    "Tell us about your fertility journey — at any stage, under your name or anonymously. Drafted in your browser, sent from your own email, published only with your consent.",
};

/** What happens after the email arrives — shown beside the form. */
const NEXT_STEPS = [
  {
    title: "A person reads it",
    body: "Your email lands in one inbox, read by real people. We aim to reply within five working days.",
  },
  {
    title: "We agree the words together",
    body: "If we'd like to publish it, we send you the edited version first. Nothing appears until you've approved the final text.",
  },
  {
    title: "Your name is your call",
    body: "Under your name, a first name only, or fully anonymous — and you can switch at any time, including after publication.",
  },
  {
    title: "You can withdraw it",
    body: "One email takes your story down, whenever and for whatever reason. It's yours, not ours.",
  },
];

export default function ShareStoryPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <section className="border-b border-border px-6 md:px-12 lg:px-16">
        <div className="mx-auto">
          <SiteNav />
        </div>
      </section>

      {/* Header */}
      <Section band={0} padding="pt-20 pb-16" backdrop={{ shape: "bloom" }}>
        <SectionHeading
          level={1}
          eyebrow="Share your story"
          mark="spark"
          markClassName="shape-spin"
          title="Tell it the way it actually happened."
          intro="The stories on this site are illustrative while we collect real, consented accounts to replace them — and the accounts that help most are written by people who lived them. Whatever stage you're at, however it went, we'd like to hear it."
          introWidth="58ch"
          className="mb-0"
        />
        <p className="text-sm font-sans text-muted leading-relaxed mt-4" style={{ maxWidth: "58ch" }}>
          Prefer to skip the form? Just write to us directly at{" "}
          <a
            href="mailto:stories@cairnfertility.co.uk"
            className="underline underline-offset-2 text-foreground"
          >
            stories@cairnfertility.co.uk
          </a>{" "}
          — it reaches the same inbox.
        </p>
      </Section>

      {/* Form + how it works */}
      <Section band={1} padding="py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20">
          <div className="flex-1 max-w-[720px]">
            <ShareStoryForm />
          </div>

          <aside className="lg:w-[320px] shrink-0">
            <div className="rounded-2xl p-6 md:p-8" style={{ background: "var(--cream)" }}>
              <p className="text-[12px] font-[700] uppercase tracking-[0.14em] mb-6 font-sans text-teal">
                What happens next
              </p>
              <ol className="space-y-6">
                {NEXT_STEPS.map((step, i) => (
                  <li key={step.title}>
                    <p className="text-[12px] font-[700] font-sans mb-1.5" style={{ color: "var(--teal-35)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 className="font-sans font-bold text-[15px] leading-snug mb-1.5 text-teal">
                      {step.title}
                    </h2>
                    <p className="text-sm font-sans leading-relaxed" style={{ color: "rgba(0, 83, 83, 0.75)" }}>
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <p className="text-[13px] font-sans text-muted leading-relaxed mt-6 px-1">
              How we handle anything you send us is set out in our{" "}
              <Link href="/privacy" className="underline underline-offset-2 text-foreground">
                privacy policy
              </Link>
              .
            </p>
          </aside>
        </div>
      </Section>
    </main>
  );
}
