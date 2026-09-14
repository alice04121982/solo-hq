import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Info } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { Section } from "@/components/section";
import { HeaderShapes, type HeaderMark } from "@/components/header-shapes";
import { ShapeMark } from "@/components/shapes";
import { StatCard } from "@/components/stat-card";
import { ConversationToolkit } from "@/components/conversation-toolkit";
import { BenefitsAudit } from "@/components/work/benefits-audit";
import { RightsExplorer } from "@/components/work/rights-explorer";
import {
  AFTER_TREATMENT_SIGNPOSTS,
  BENEFIT_SHAPES,
  CASE_SOURCES,
  NAMED_EMPLOYERS,
  PLATFORM_LINE,
  POLICY_ELEMENTS,
  UK_RIGHTS,
  WORK_LAST_REVIEWED,
  WORK_SCENARIOS,
  WORKPLACE_STATS,
} from "@/lib/work";

export const metadata: Metadata = {
  title: "IVF & Work | CairnFertility",
  description:
    "Fertility treatment and employment in the UK: your rights, what employers offer, how to find out what yours does, what to say, and the leave and pay that follow a pregnancy.",
};

const TEAL = "var(--teal)";
const TEAL_SOFT = "rgba(0, 83, 83, 0.6)";

const HERO_MARKS: HeaderMark[] = [
  {
    name: "bloom",
    color: "var(--lavender-light)",
    className:
      "right-0 top-1/2 -translate-y-1/2 translate-x-[55%] md:translate-x-[30%] w-[11rem] md:w-[26rem] lg:w-[34rem]",
    motion: "spin",
    duration: 60,
  },
  {
    name: "egg",
    color: "var(--lavender)",
    className: "hidden md:block right-[25%] top-[10%] w-[4.5rem] lg:w-[6rem]",
    motion: "drift",
    duration: 11,
  },
  {
    name: "spark",
    color: "var(--lavender-dark)",
    className: "hidden md:block right-[7%] bottom-[16%] w-[3rem] lg:w-[4rem]",
    motion: "breathe",
    duration: 7,
    delay: 1.5,
  },
];

const JUMP_LINKS = [
  { label: "Your rights", href: "#rights" },
  { label: "After treatment", href: "#after-treatment" },
  { label: "What employers offer", href: "#what-employers-offer" },
  { label: "Find out what yours does", href: "#find-out" },
  { label: "What to say", href: "#asking" },
  { label: "Making the case", href: "#making-the-case" },
];

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border px-6 md:px-12 lg:px-16">
        <div className="mx-auto">
          <SiteNav />
        </div>
      </section>

      <Section
        band={0}
        padding="pt-20 pb-16 md:pt-28 md:pb-20"
        decoration={<HeaderShapes marks={HERO_MARKS} />}
      >
        <p
          className="text-[13px] font-[600] uppercase tracking-[2px] font-sans flex items-center gap-2 mb-4"
          style={{ color: "var(--teal)" }}
        >
          <ShapeMark name="bloom" size={14} style={{ color: "var(--lavender)" }} />
          IVF &amp; work
        </p>
        <h1
          className="font-sans font-bold mb-6"
          style={{ fontSize: "clamp(2.75rem, 5vw, 5.5rem)", lineHeight: 1.05, color: TEAL }}
        >
          What you&rsquo;re entitled to, and what you can ask for.
        </h1>
        <p className="text-[18px] font-sans leading-[1.6] text-muted" style={{ maxWidth: "58ch" }}>
          A small amount of this is law. A great deal of it is policy: money and time your
          employer may already provide and never mention. Knowing what to ask, in writing, closes
          the gap.
        </p>
        <p className="text-[16px] font-sans leading-relaxed text-muted mt-4" style={{ maxWidth: "58ch" }}>
          Most scripts here work without telling anyone about your treatment; those that rely on
          pregnancy protection say your employer has to know.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {JUMP_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="inline-flex items-center gap-1.5 rounded-full border border-teal/20 px-3.5 py-1.5 text-xs font-sans transition-colors hover:bg-[var(--teal)] hover:text-white hover:border-[var(--teal)]"
              style={{ color: TEAL }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </Section>

      <Section band={1} className="border-t border-border">
        <p
          className="text-[13px] font-[600] uppercase tracking-[2px] font-sans flex items-center gap-2 mb-4"
          style={{ color: "var(--teal)" }}
        >
          <ShapeMark name="spark" size={14} style={{ color: "var(--lavender)" }} />
          Why it can be worth asking
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-0 mt-8">
          {WORKPLACE_STATS.map((s, i) => (
            <div key={s.label}>
              <StatCard value={s.value} label={s.label} delay={i * 0.08} />
              <p className="text-[12px] font-sans leading-snug -mt-4 pb-6" style={{ color: TEAL_SOFT, maxWidth: "30ch" }}>
                Source: {s.source}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section band={2} id="rights" className="border-t border-border scroll-mt-20">
        <p
          className="text-[13px] font-[600] uppercase tracking-[2px] font-sans flex items-center gap-2 mb-4"
          style={{ color: "var(--teal)" }}
        >
          <ShapeMark name="egg" size={14} style={{ color: "var(--lavender)" }} />
          Your rights
        </p>
        <h2
          className="font-sans font-bold mb-5"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: TEAL }}
        >
          Less law than you&rsquo;d expect. More than you&rsquo;re using.
        </h2>
        <p className="text-lg font-sans leading-relaxed text-muted mb-12" style={{ maxWidth: "60ch" }}>
          The one employers most often get wrong: in the UK, pregnancy protection begins at{" "}
          <strong className="font-[600]">embryo transfer</strong>, not when a pregnancy is
          confirmed, and not when treatment starts. It applies once your employer knows.
        </p>

        <RightsExplorer entry={UK_RIGHTS} />

        <div className="mt-10 rounded-2xl p-6 md:p-8" style={{ background: "var(--teal)" }}>
          <p
            className="inline-flex items-center gap-2 text-[12px] font-[700] uppercase tracking-[0.14em] mb-3 font-sans"
            style={{ color: "var(--on-teal-muted)" }}
          >
            <Info className="h-3.5 w-3.5" />
            Where this stops
          </p>
          <p
            className="text-[16px] font-sans leading-relaxed"
            style={{ color: "var(--on-teal)", maxWidth: "64ch" }}
          >
            This is a summary with its sources attached, not legal advice; CairnFertility is not a
            law firm. If something has already gone wrong at work (a refusal, a disciplinary, a
            dismissal), talk to Acas, your union or an employment solicitor before you respond.
            Tribunal claims have strict time limits, currently three months less a day from the
            event (six months less a day where the limit starts on or after 1 October 2026), so
            contact Acas early. Acas and unions are free; some solicitors offer a free first call.
          </p>
        </div>

        <div id="after-treatment" className="mt-14 scroll-mt-24">
          <h3
            className="font-sans font-bold mb-3"
            style={{ fontSize: "clamp(1.625rem, 2.2vw, 2.25rem)", lineHeight: 1.2, color: TEAL }}
          >
            After treatment: leave, pay and childcare.
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0 mt-8">
            {AFTER_TREATMENT_SIGNPOSTS.map((s) => (
              <div key={s.point} className="py-6 border-t" style={{ borderColor: "var(--border)" }}>
                <p className="font-sans font-bold text-[15px] mb-1.5" style={{ color: TEAL }}>
                  {s.point}
                </p>
                <p className="text-[14px] font-sans leading-relaxed text-muted mb-3">{s.detail}</p>
                <a
                  href={s.source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] font-sans underline underline-offset-2"
                  style={{ color: TEAL }}
                >
                  {s.source.label}
                  <ExternalLink className="h-3 w-3 shrink-0" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[15px] font-sans leading-relaxed text-muted mt-10">
          <Link href="/support#work" className="underline underline-offset-2" style={{ color: TEAL }}>
            Looking after yourself
          </Link>
          : work and counselling.
        </p>
      </Section>

      <Section band={3} id="what-employers-offer" className="border-t border-border scroll-mt-20">
        <p
          className="text-[13px] font-[600] uppercase tracking-[2px] font-sans flex items-center gap-2 mb-4"
          style={{ color: "var(--teal)" }}
        >
          <ShapeMark name="cross" size={14} style={{ color: "var(--lavender)" }} />
          What employers offer
        </p>
        <h2
          className="font-sans font-bold mb-5"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: TEAL }}
        >
          Six things called &ldquo;fertility benefits&rdquo;.
        </h2>
        <p className="text-lg font-sans leading-relaxed text-muted mb-12" style={{ maxWidth: "62ch" }}>
          They are announced in near-identical language and differ by thousands of pounds. Work out
          which one you have before you plan around it.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0">
          {BENEFIT_SHAPES.map((b) => (
            <div key={b.title} className="py-8 border-t" style={{ borderColor: "var(--border)" }}>
              <h3 className="font-sans font-bold text-base mb-3" style={{ color: TEAL }}>
                {b.title}
              </h3>
              <p className="text-[15px] font-sans leading-relaxed text-muted mb-3">{b.body}</p>
              <p className="text-[13px] font-sans leading-relaxed" style={{ color: TEAL_SOFT }}>
                {b.worth}
              </p>
            </div>
          ))}
        </div>

        <p className="text-[16px] font-sans leading-relaxed text-muted mt-10" style={{ maxWidth: "62ch" }}>
          {PLATFORM_LINE}
        </p>

        <div className="mt-20">
          <h3
            className="font-sans font-bold mb-3"
            style={{ fontSize: "clamp(1.625rem, 2.2vw, 2.25rem)", lineHeight: 1.2, color: TEAL }}
          >
            Employers with published provision.
          </h3>
          <p className="text-[16px] font-sans leading-relaxed text-muted mb-8" style={{ maxWidth: "62ch" }}>
            A short list on purpose: UK employers whose provision has been publicly reported, with
            the report each entry was read from.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
            {NAMED_EMPLOYERS.map((e) => (
              <div key={e.name} className="py-6 border-t" style={{ borderColor: "var(--border)" }}>
                <p
                  className="text-[12px] font-[600] uppercase tracking-[0.12em] mb-2 font-sans"
                  style={{ color: TEAL_SOFT }}
                >
                  {e.sector}
                </p>
                <h4 className="font-sans font-bold text-base mb-1.5" style={{ color: TEAL }}>
                  {e.name}
                </h4>
                <p className="text-[14px] font-sans leading-relaxed text-muted mb-2">{e.reported}</p>
                <p className="text-[13px] font-sans leading-relaxed" style={{ color: TEAL_SOFT }}>
                  {e.when}:{" "}
                  <a
                    href={e.source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2"
                    style={{ color: TEAL }}
                  >
                    {e.source.label}
                  </a>
                </p>
              </div>
            ))}
          </div>

          <p className="text-[14px] font-sans leading-relaxed text-muted mt-8" style={{ maxWidth: "68ch" }}>
            Checked {WORK_LAST_REVIEWED}. Benefits are withdrawn as quietly as they are announced,
            and caps, eligibility and waiting periods are rarely in the press release. Confirm with
            the employer before relying on any of it.
          </p>
        </div>
      </Section>

      <Section band={4} id="find-out" className="border-t border-border scroll-mt-20">
        <p
          className="text-[13px] font-[600] uppercase tracking-[2px] font-sans flex items-center gap-2 mb-4"
          style={{ color: "var(--teal)" }}
        >
          <ShapeMark name="asterisk" size={14} style={{ color: "var(--lavender)" }} />
          Find out what yours does
        </p>
        <h2
          className="font-sans font-bold mb-5"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: TEAL }}
        >
          The email to send.
        </h2>
        <p className="text-lg font-sans leading-relaxed text-muted mb-4" style={{ maxWidth: "62ch" }}>
          Search your benefits portal for &lsquo;fertility&rsquo;, &lsquo;IVF&rsquo; and
          &lsquo;family forming&rsquo; before you ask anyone. Schemes are often live but
          unadvertised, and a search tells nobody.
        </p>
        <p className="text-lg font-sans leading-relaxed text-muted mb-12" style={{ maxWidth: "62ch" }}>
          Then send one email. The full version asks the five questions that separate a benefit
          that pays for treatment from one that does not, and says nothing about your own plans.
        </p>

        <BenefitsAudit />
      </Section>

      <Section band={5} id="asking" className="border-t border-border scroll-mt-20">
        <p
          className="text-[13px] font-[600] uppercase tracking-[2px] font-sans flex items-center gap-2 mb-4"
          style={{ color: "var(--teal)" }}
        >
          <ShapeMark name="halves" size={14} style={{ color: "var(--lavender)" }} />
          What to say
        </p>
        <h2
          className="font-sans font-bold mb-5"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: TEAL }}
        >
          You decide how much anyone knows.
        </h2>
        <p className="text-lg font-sans leading-relaxed text-muted mb-12" style={{ maxWidth: "62ch" }}>
          Pick the conversation you are having. Every line is written to be said out loud, and the
          last one closes it.
        </p>

        <ConversationToolkit
          compact
          scenarios={WORK_SCENARIOS}
          labels={{
            tablist: "Conversations at work",
            context: "What's usually going on",
            scripts: "Things you can actually say",
          }}
        />
      </Section>

      <Section band={6} id="making-the-case" className="border-t border-border scroll-mt-20">
        <p
          className="text-[13px] font-[600] uppercase tracking-[2px] font-sans flex items-center gap-2 mb-4"
          style={{ color: "var(--teal)" }}
        >
          <ShapeMark name="bloom" size={14} style={{ color: "var(--lavender)" }} />
          If your employer offers nothing
        </p>
        <h2
          className="font-sans font-bold mb-5"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: TEAL }}
        >
          Making the case.
        </h2>
        <p className="text-lg font-sans leading-relaxed text-muted mb-12" style={{ maxWidth: "62ch" }}>
          You are under no obligation to fix your employer while you are in treatment. If you do
          raise it, the retention argument is the one employers respond to; the figures above and
          the CIPD guidance below are the material.
        </p>

        <h3 className="font-sans font-bold text-xl mb-5" style={{ color: TEAL }}>
          What a good policy contains
        </h3>
        <ul className="space-y-3 mb-12 max-w-[70ch]">
          {POLICY_ELEMENTS.map((p) => (
            <li key={p} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
              <p className="text-[16px] font-sans leading-relaxed text-muted">{p}</p>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {CASE_SOURCES.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-sans transition-colors hover:bg-[var(--teal)] hover:text-white"
              style={{ borderColor: "var(--border)", color: TEAL }}
            >
              {s.label}
              <ExternalLink className="h-3 w-3 shrink-0" />
            </a>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border p-6 flex flex-col sm:flex-row sm:items-center gap-5" style={{ borderColor: "var(--border)" }}>
          <div className="flex-1">
            <p className="font-sans font-semibold text-base mb-1" style={{ color: TEAL }}>
              Funding &amp; payment options
            </p>
            <p className="text-sm font-sans text-muted leading-relaxed" style={{ maxWidth: "52ch" }}>
              Employer benefits are one route among several. What the NHS funds, and how people pay
              for the rest.
            </p>
          </div>
          <Link
            href="/funding"
            className="inline-flex items-center gap-2 shrink-0 rounded-full px-6 py-3 text-sm font-sans font-medium transition-opacity hover:opacity-90"
            style={{ background: "var(--accent)", color: "var(--on-accent)" }}
          >
            See funding options
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <p className="text-[15px] font-sans leading-relaxed text-muted mt-14" style={{ maxWidth: "68ch" }}>
          Employment and benefits information last reviewed {WORK_LAST_REVIEWED}. Law, policy and
          employer provision change; treat this as a starting point for a question, not a statement
          of your position. CairnFertility is not a law firm and nothing here is legal advice. We
          receive no payment from any employer or provider named.
        </p>
      </Section>

      <CTASection />
    </main>
  );
}
