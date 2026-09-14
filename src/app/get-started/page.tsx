import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { Section } from "@/components/section";
import { ClinicMatcher } from "@/components/clinic-matcher";

export const metadata = {
  title: "Find Your Clinic | CairnFertility",
  description: "Answer four questions to see clinics that fit your family type, budget and travel range, with every figure's source.",
};

export default function GetStartedPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto px-6 md:px-12 lg:px-16">
        <SiteNav />
      </div>

      {/* Header and wizard read as one centred, full-page journey on the
          brand's dark green. Text takes the on-teal set: lime pill eyebrow,
          pink heading, muted pink standfirst. */}
      <Section tone="teal" padding="py-12 md:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <p className="mb-5 flex justify-center">
            <span
              className="inline-block w-fit text-[11px] font-[700] uppercase tracking-[0.16em] font-sans rounded-full px-3 py-1"
              style={{ background: "var(--accent)", color: "var(--on-accent)" }}
            >
              Clinic matcher
            </span>
          </p>
          <h1
            className="font-sans font-bold mb-4"
            style={{ fontSize: "clamp(2.75rem, 5vw, 5rem)", lineHeight: 1.06, color: "var(--on-teal)" }}
          >
            Find clinics that fit your situation.
          </h1>
          <p className="text-[16px] font-sans leading-[1.65]" style={{ color: "var(--on-teal-muted)" }}>
            Answer four questions and we&apos;ll show you clinics that fit your family type, budget and travel range, with every figure&apos;s source.
          </p>
          <p className="text-[13px] font-sans leading-relaxed mt-4" style={{ color: "var(--on-teal-muted)" }}>
            Your answers stay on your device. The matching runs entirely in your browser, and
            nothing you enter here is sent to us or stored anywhere. See our{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-[var(--on-teal)] transition-colors">
              privacy policy
            </Link>
            .
          </p>
        </div>
      </Section>

      {/* Wizard: sits in a white panel on the dark green band (a content box
          on a tinted band is white, with no border), keeping the wizard's
          light-surface ink and controls legible. It keeps question steps in a
          centred column and lets the results grid span the whole panel. The
          wizard renders its own state-driven backdrop mark, positioned against
          the panel, so the panel crops the bleed. overflow-clip rather than
          overflow-hidden: hidden leaves the panel programmatically scrollable,
          so focus/click scroll-into-view could drag it sideways toward the
          off-screen shape. clip crops without ever becoming scrollable. */}
      <Section tone="teal" padding="pb-16 md:pb-24">
        <div className="relative overflow-clip rounded-[24px] bg-background px-6 py-10 md:px-12 md:py-14">
          <ClinicMatcher />
        </div>
      </Section>
    </main>
  );
}
