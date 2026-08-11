import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Info } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { Section } from "@/components/section";
import { StatCard } from "@/components/stat-card";
import { ConversationToolkit } from "@/components/conversation-toolkit";
import { CopyButton } from "@/components/copy-button";
import { BenefitsAudit } from "@/components/work/benefits-audit";
import { RightsExplorer } from "@/components/work/rights-explorer";
import {
  AUDIT_STEPS,
  BENEFIT_PROVIDERS,
  BENEFIT_SHAPES,
  CASE_SOURCES,
  NAMED_EMPLOYERS,
  OFFER_CHECKS,
  POLICY_ELEMENTS,
  RIGHTS_BY_COUNTRY,
  WORK_LAST_REVIEWED,
  WORK_SCENARIOS,
  WORKPLACE_STATS,
} from "@/lib/work";

export const metadata: Metadata = {
  title: "IVF & Work | CairnFertility",
  description:
    "Fertility treatment and employment: your legal rights, what employers actually offer, how to find out what yours does, what to say without disclosing more than you want to, and how to weigh fertility benefits when you are taking a job.",
};

const TEAL = "var(--teal)";
const TEAL_SOFT = "rgba(0, 83, 83, 0.6)";

const JUMP_LINKS = [
  { label: "Your rights", href: "#rights" },
  { label: "What employers offer", href: "#what-employers-offer" },
  { label: "Find out what yours does", href: "#find-out" },
  { label: "What to say", href: "#asking" },
  { label: "At the offer stage", href: "#job-offers" },
  { label: "Making the case", href: "#making-the-case" },
];

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <section className="border-b border-border px-6 md:px-12 lg:px-16">
        <div className="mx-auto">
          <SiteNav />
        </div>
      </section>

      {/* Hero */}
      <Section band={0} padding="pt-20 pb-16 md:pt-28 md:pb-20">
        <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
          IVF &amp; work
        </p>
        <h1
          className="font-sans font-bold mb-6"
          style={{ fontSize: "clamp(2.75rem, 5vw, 5.5rem)", lineHeight: 1.05, color: TEAL }}
        >
          What you&rsquo;re owed, and what you have to ask for.
        </h1>
        <p className="text-[18px] font-sans leading-[1.6] text-muted" style={{ maxWidth: "58ch" }}>
          A small amount of this is law. A great deal of it is policy — money and time your
          employer may already provide and never mention. The gap between the two is closed by
          knowing what to ask, and asking it in writing.
        </p>
        <p className="text-[16px] font-sans leading-relaxed text-muted mt-4" style={{ maxWidth: "58ch" }}>
          Every script here is written for someone who has told nobody, because that is most
          people. Disclosure is a choice you make later, if you want to.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {JUMP_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs font-sans transition-colors hover:bg-[var(--teal)] hover:text-white hover:border-[var(--teal)]"
              style={{ color: TEAL }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </Section>

      {/* The numbers */}
      <Section band={1} className="border-t border-border">
        <p className="text-[13px] font-[600] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
          Why this is worth ten minutes
        </p>
        <h2
          className="font-sans font-bold mb-5"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: TEAL }}
        >
          Most people never ask.
        </h2>
        <p className="text-lg font-sans leading-relaxed text-muted mb-12" style={{ maxWidth: "62ch" }}>
          Fertility benefits have grown faster than awareness of them, so the commonest outcome is
          an employee paying for treatment their employer would have funded. The second commonest is
          someone leaving a job they liked because nobody would move a meeting.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-0">
          {WORKPLACE_STATS.map((s, i) => (
            <StatCard key={s.label} value={s.value} label={s.label} delay={i * 0.08} />
          ))}
        </div>
      </Section>

      {/* Rights */}
      <Section band={2} id="rights" className="border-t border-border scroll-mt-20">
        <p className="text-[13px] font-[600] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
          Your rights
        </p>
        <h2
          className="font-sans font-bold mb-5"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: TEAL }}
        >
          Less law than you&rsquo;d expect. More than you&rsquo;re using.
        </h2>
        <p className="text-lg font-sans leading-relaxed text-muted mb-6" style={{ maxWidth: "62ch" }}>
          The single most useful fact on this page, and the one employers most often get wrong: in
          the UK, pregnancy protection begins at <strong className="font-[600]">embryo transfer</strong>,
          not when a pregnancy is confirmed and not when treatment starts. From that point you have
          the rights of a pregnant worker — and if the transfer is unsuccessful, protection continues
          for two weeks after you are told.
        </p>
        <p className="text-lg font-sans leading-relaxed text-muted mb-12" style={{ maxWidth: "62ch" }}>
          Each entry below separates what the law actually gives you from what is policy, proposal or
          goodwill, because almost everything written about this subject blurs the two.
        </p>

        <RightsExplorer entries={RIGHTS_BY_COUNTRY} />

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
            This is a summary of the position with its sources attached, not legal advice, and
            CairnFertility is not a law firm. If something has already gone wrong at work — a
            refusal, a disciplinary, a dismissal — talk to Acas, your union, or an employment
            solicitor before you respond to it. Most of them will do a first conversation free.
          </p>
        </div>
      </Section>

      {/* What employers offer */}
      <Section band={3} id="what-employers-offer" className="border-t border-border scroll-mt-20">
        <p className="text-[13px] font-[600] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
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
          which one you actually have before you plan around it.
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

        {/* Providers */}
        <div className="mt-20">
          <h3
            className="font-sans font-bold mb-3"
            style={{ fontSize: "clamp(1.625rem, 2.2vw, 2.25rem)", lineHeight: 1.2, color: TEAL }}
          >
            Who runs these schemes.
          </h3>
          <p className="text-[16px] font-sans leading-relaxed text-muted mb-10" style={{ maxWidth: "62ch" }}>
            If your employer uses one of these, the platform rather than HR usually holds the detail
            of what you can claim — and its own support team will answer questions your employer
            never sees.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0">
            {BENEFIT_PROVIDERS.map((p) => (
              <div key={p.name} className="py-8 border-t" style={{ borderColor: "var(--border)" }}>
                <p
                  className="text-[12px] font-[600] uppercase tracking-[0.12em] mb-3 font-sans"
                  style={{ color: TEAL_SOFT }}
                >
                  {p.scope}
                </p>
                <h4 className="font-sans font-bold text-base mb-2.5" style={{ color: TEAL }}>
                  {p.name}
                </h4>
                <p className="text-[15px] font-sans leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Named employers */}
        <div className="mt-20">
          <h3
            className="font-sans font-bold mb-3"
            style={{ fontSize: "clamp(1.625rem, 2.2vw, 2.25rem)", lineHeight: 1.2, color: TEAL }}
          >
            Employers with published provision.
          </h3>
          <p className="text-[16px] font-sans leading-relaxed text-muted mb-8" style={{ maxWidth: "62ch" }}>
            A short list on purpose. These are employers whose fertility provision has been publicly
            reported — useful as precedent when you are asking your own employer to catch up, and as
            a starting point if you are job-hunting.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0">
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
                <p className="text-[14px] font-sans leading-relaxed text-muted">{e.reported}</p>
              </div>
            ))}
          </div>

          <p className="text-[14px] font-sans leading-relaxed text-muted mt-8" style={{ maxWidth: "68ch" }}>
            Reported provision as at {WORK_LAST_REVIEWED}. Benefits are withdrawn as quietly as they
            are announced, and the detail — caps, eligibility, waiting periods — is rarely in the
            press release. Confirm directly with the employer before relying on any of it, and never
            accept a job on the strength of a benefit you have not seen documented.
          </p>
        </div>
      </Section>

      {/* Find out */}
      <Section band={4} id="find-out" className="border-t border-border scroll-mt-20">
        <p className="text-[13px] font-[600] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
          Find out what yours does
        </p>
        <h2
          className="font-sans font-bold mb-5"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: TEAL }}
        >
          The audit, and the email.
        </h2>
        <p className="text-lg font-sans leading-relaxed text-muted mb-12" style={{ maxWidth: "62ch" }}>
          Everyone knows to &ldquo;ask HR&rdquo;. Almost nobody knows which questions separate a
          benefit that will pay for treatment from one that will not. Pick where you work, and this
          builds the email — asking all of them, disclosing none of your own plans.
        </p>

        <BenefitsAudit steps={AUDIT_STEPS} />
      </Section>

      {/* Scripts */}
      <Section band={5} id="asking" className="border-t border-border scroll-mt-20">
        <p className="text-[13px] font-[600] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
          What to say
        </p>
        <h2
          className="font-sans font-bold mb-5"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: TEAL }}
        >
          You decide how much anyone knows.
        </h2>
        <p className="text-lg font-sans leading-relaxed text-muted mb-4" style={{ maxWidth: "62ch" }}>
          Treatment runs on a calendar you do not control: scans move at 48 hours&rsquo; notice,
          collection lands when it lands. That unpredictability, rather than the treatment itself, is
          what turns work into a problem — and it can be managed without telling anyone why.
        </p>
        <p className="text-lg font-sans leading-relaxed text-muted mb-12" style={{ maxWidth: "62ch" }}>
          Pick the conversation you are having. Every line is written to be said out loud, and can be
          copied to your phone.
        </p>

        <ConversationToolkit
          scenarios={WORK_SCENARIOS}
          labels={{
            tablist: "Conversations at work",
            context: "What's usually going on",
            notYourJob: "You don't have to",
            scripts: "Things you can actually say",
            exit: "How to close it",
          }}
        />
      </Section>

      {/* Offer stage */}
      <Section band={6} id="job-offers" className="border-t border-border scroll-mt-20">
        <p className="text-[13px] font-[600] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
          At the offer stage
        </p>
        <h2
          className="font-sans font-bold mb-5"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: TEAL }}
        >
          A benefit is part of the salary.
        </h2>
        <p className="text-lg font-sans leading-relaxed text-muted mb-12" style={{ maxWidth: "62ch" }}>
          Employers increasingly put fertility cover in the recruitment pack, which makes it a
          negotiable, comparable part of an offer — and one of the few where the difference between
          two employers can exceed £10,000. Ask before you sign; it is a benefits question like
          pension matching, and you are not declaring anything by asking it.
        </p>

        <ul className="space-y-0 max-w-[70ch]">
          {OFFER_CHECKS.map((q, i) => (
            <li key={q} className="py-6 border-t flex items-start gap-4" style={{ borderColor: "var(--border)" }}>
              <span className="text-[12px] font-[700] font-sans mt-1.5 shrink-0" style={{ color: TEAL_SOFT }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[16px] font-sans leading-relaxed" style={{ color: TEAL }}>
                {q}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-2xl p-5 md:p-6" style={{ background: "var(--lime)" }}>
          <div className="flex items-center justify-between gap-3 mb-3">
            <p
              className="text-[12px] font-[700] uppercase tracking-[0.14em] font-sans"
              style={{ color: TEAL_SOFT }}
            >
              Send this to the recruiter
            </p>
            <CopyButton
              text={
                "Before I confirm, could you send me the benefits documentation — including anything on family forming and fertility? I'd like to check whether it's available from day one, what the cap is, and whether medication and donor gametes are included."
              }
            />
          </div>
          <p className="text-[15px] font-sans leading-relaxed font-[500]" style={{ color: TEAL }}>
            Before I confirm, could you send me the benefits documentation — including anything on
            family forming and fertility? I&rsquo;d like to check whether it&rsquo;s available from
            day one, what the cap is, and whether medication and donor gametes are included.
          </p>
        </div>
      </Section>

      {/* Making the case */}
      <Section band={7} id="making-the-case" className="border-t border-border scroll-mt-20">
        <p className="text-[13px] font-[600] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
          If your employer offers nothing
        </p>
        <h2
          className="font-sans font-bold mb-5"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: TEAL }}
        >
          Making the case.
        </h2>
        <p className="text-lg font-sans leading-relaxed text-muted mb-12" style={{ maxWidth: "62ch" }}>
          You are under no obligation to fix your employer while you are in treatment, and plenty of
          people rightly decide this is not their job. If you do want to raise it, the retention
          argument is the one that lands: more than a third of employees in treatment have left or
          considered leaving, and replacing them costs more than a policy does.
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
            <p className="text-[12px] font-[600] uppercase tracking-[0.12em] text-muted mb-2 font-sans">
              Once you know what you have
            </p>
            <p className="font-sans font-semibold text-base mb-1" style={{ color: TEAL }}>
              Funding &amp; payment options
            </p>
            <p className="text-sm font-sans text-muted leading-relaxed" style={{ maxWidth: "52ch" }}>
              Employer benefits are one route among many. What is free on the NHS and how to qualify,
              plus every way people pay for the rest.
            </p>
          </div>
          <Link
            href="/funding"
            className="inline-flex items-center gap-2 shrink-0 rounded-full px-6 py-3 text-sm font-sans font-medium transition-opacity hover:opacity-90"
            style={{ background: "var(--accent)", color: "#1A3A25" }}
          >
            See funding options
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <p className="text-[15px] font-sans leading-relaxed text-muted mt-14" style={{ maxWidth: "68ch" }}>
          Employment and benefits information last reviewed {WORK_LAST_REVIEWED}. Law, policy and
          employer provision all change; treat everything here as a starting point for a question
          rather than a statement of your own position. CairnFertility is not a law firm and nothing
          on this page is legal advice. We receive no payment from any employer or provider named on
          it.
        </p>
      </Section>

      <CTASection />
    </main>
  );
}
