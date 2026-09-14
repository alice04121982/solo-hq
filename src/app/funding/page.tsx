import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { Section } from "@/components/section";
import { ShapeMark } from "@/components/shapes";
import { StatCard } from "@/components/stat-card";
import { FundingRouteExplorer } from "@/components/funding/funding-route-explorer";
import { NHSEligibilityChecker } from "@/components/funding/nhs-eligibility-checker";
import {
  COST_ANCHORS,
  COST_ANCHORS_SOURCE,
  FUNDING_ROUTES,
  LAST_REVIEWED,
  NATION_POLICIES,
  NHS_APPLICATION_STEPS,
  NHS_PITFALLS,
  NICE_POSITION,
  ORDER_OF_OPERATIONS,
  PROTECTIONS,
  QUESTIONS_BEFORE_SIGNING,
} from "@/lib/funding";

export const metadata: Metadata = {
  title: "Funding & Payment Options | CairnFertility",
  description:
    "What fertility treatment is free on the NHS in England, Scotland, Wales and Northern Ireland, how to qualify, and the routes people use to pay for the rest: employer benefits, egg sharing, refund programmes, grants and clinic finance.",
};

const TEAL = "var(--teal)";
const TEAL_SOFT = "rgba(0, 83, 83, 0.6)";

const JUMP_LINKS = [
  { label: "What it costs", href: "#costs" },
  { label: "What's free on the NHS", href: "#nhs" },
  { label: "Check your eligibility", href: "#check" },
  { label: "Every funding route", href: "#routes" },
  { label: "Before you sign", href: "#before-you-sign" },
];


/** Things that should stop a decision, not merely inform it. */
const RED_FLAGS = [
  "Any offer of funded treatment that asks you for a fee to apply.",
  "A refund or multi-cycle programme that will not give you the full written terms to take home.",
  "Medication offered by anyone other than a registered pharmacy, including other patients online.",
  "A credit or insurance product from a firm you cannot find on the FCA register.",
  "A clinic that will not say how its success rate was calculated.",
  "Pressure to decide on a package during the consultation. Nothing on this page needs to be signed the same day.",
];

export default function FundingPage() {
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
        <p
          className="text-[13px] font-[600] uppercase tracking-[2px] font-sans flex items-center gap-2 mb-4"
          style={{ color: "var(--teal)" }}
        >
          <ShapeMark name="bloom" size={14} style={{ color: "var(--lavender)" }} />
          Funding &amp; payment options
        </p>
        <h1
          className="font-sans font-bold mb-6"
          style={{ fontSize: "clamp(2.75rem, 5vw, 5.5rem)", lineHeight: 1.05, color: TEAL }}
        >
          Paying for treatment.
        </h1>
        <p className="text-[18px] font-sans leading-[1.6] text-muted" style={{ maxWidth: "58ch" }}>
          Three quarters of IVF in England is now paid for privately. This page sets out what the NHS
          funds in each UK nation and how to qualify, and the routes people use to pay for the rest.
        </p>
        <p className="text-[16px] font-sans leading-relaxed text-muted mt-4" style={{ maxWidth: "58ch" }}>
          We take no commission from anyone listed; each company appears with what to watch out for.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {JUMP_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-sans text-teal transition-colors hover:bg-teal hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>
      </Section>

      {/* Order of operations */}
      <Section band={0} padding="pb-20 md:pb-28">
        <div className="rounded-2xl p-6 md:p-10" style={{ background: "var(--lime)" }}>
          <p
            className="text-[12px] font-[700] uppercase tracking-[0.14em] mb-6 font-sans"
            style={{ color: TEAL_SOFT }}
          >
            The order matters more than the options
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-7">
            {ORDER_OF_OPERATIONS.map((s, i) => (
              <div key={s.title}>
                <p className="text-[12px] font-[700] font-sans mb-2" style={{ color: TEAL_SOFT }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="font-sans font-bold text-base mb-2" style={{ color: TEAL }}>
                  {s.title}
                </h2>
                <p className="text-[15px] font-sans leading-relaxed" style={{ color: "rgba(0, 83, 83, 0.75)" }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* What it costs */}
      <Section band={1} id="costs" className="border-t border-border scroll-mt-20">
        <p
          className="text-[13px] font-[600] uppercase tracking-[2px] font-sans flex items-center gap-2 mb-4"
          style={{ color: "var(--teal)" }}
        >
          <ShapeMark name="spark" size={14} style={{ color: "var(--lavender)" }} />
          The numbers to hold on to
        </p>
        <h2
          className="font-sans font-bold mb-5"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: TEAL }}
        >
          What you are actually funding.
        </h2>
        <p className="text-lg font-sans leading-relaxed text-muted mb-12" style={{ maxWidth: "62ch" }}>
          Every funding route below is a way of paying one of these bills. The headline price a clinic
          advertises is not one of them: drugs, ICSI, freezing and storage are charged separately, and
          donor sperm adds roughly £1,000–£1,800 a vial at UK-facing banks, plus VAT on imports, a
          family-slot or reservation fee and shipping (bank price lists, September 2026). The gap
          between the quoted figure and the settled one is where the extra cost sits.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-0">
          {COST_ANCHORS.map((s, i) => (
            <StatCard key={s.label} value={s.value} label={s.label} delay={i * 0.08} />
          ))}
        </div>
        <p className="text-[13px] font-sans leading-relaxed text-muted mt-6" style={{ maxWidth: "68ch" }}>
          {COST_ANCHORS_SOURCE} (see{" "}
          <Link href="/about#methodology" className="underline underline-offset-2">
            how we check prices
          </Link>
          ).
        </p>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/resources/complete-solo-ivf-cost-breakdown"
            className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-sans transition-colors hover:bg-[var(--teal)] hover:text-white text-teal"
            style={{ borderColor: "var(--border)" }}
          >
            The full line-by-line cost breakdown
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/resources/ivf-budget-template"
            className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-sans transition-colors hover:bg-[var(--teal)] hover:text-white text-teal"
            style={{ borderColor: "var(--border)" }}
          >
            Budget template
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Section>

      {/* NHS */}
      <Section band={2} id="nhs" className="border-t border-border scroll-mt-20">
        <p
          className="text-[13px] font-[600] uppercase tracking-[2px] font-sans flex items-center gap-2 mb-4"
          style={{ color: "var(--teal)" }}
        >
          <ShapeMark name="egg" size={14} style={{ color: "var(--lavender)" }} />
          What is free on the NHS
        </p>
        <h2
          className="font-sans font-bold mb-5"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: TEAL }}
        >
          NICE recommends. Someone else decides.
        </h2>
        <p className="text-lg font-sans leading-relaxed text-muted mb-12" style={{ maxWidth: "62ch" }}>
          Almost every confusing thing about NHS fertility funding follows from one split: NICE writes
          the clinical recommendation, and the body that holds the budget where you live decides what
          to commission. In England that is 36 Integrated Care Boards with 36 policies (42 until they
          were merged in April 2026, with further mergers planned for 2027). In Scotland, Wales and
          Northern Ireland there is one set of national criteria each.
        </p>

        {/* What NICE says */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0">
          {NICE_POSITION.map((n) => (
            <div key={n.heading} className="py-8 border-t" style={{ borderColor: "var(--border)" }}>
              <h3 className="font-sans font-bold text-base mb-3" style={{ color: TEAL }}>
                {n.heading}
              </h3>
              <p className="text-[15px] font-sans leading-relaxed text-muted">{n.body}</p>
            </div>
          ))}
        </div>

        {/* Nation by nation */}
        <div className="mt-20">
          <h3
            className="font-sans font-bold mb-3"
            style={{ fontSize: "clamp(1.625rem, 2.2vw, 2.25rem)", lineHeight: 1.2, color: TEAL }}
          >
            Four nations, four answers.
          </h3>
          <p className="text-[16px] font-sans leading-relaxed text-muted mb-10" style={{ maxWidth: "62ch" }}>
            Where you live changes the offer more than your diagnosis. These are the national
            positions; in England, read your own board&rsquo;s policy on top.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {NATION_POLICIES.map((n) => (
              <div
                key={n.slug}
                className="rounded-2xl border p-6 md:p-8"
                style={{ borderColor: "var(--border)" }}
              >
                <h4 className="font-sans font-bold text-xl mb-4" style={{ color: TEAL }}>
                  {n.name}
                </h4>

                <p className="text-[12px] font-[700] uppercase tracking-[0.14em] mb-2 font-sans" style={{ color: TEAL_SOFT }}>
                  What is funded
                </p>
                <p className="text-[15px] font-sans leading-relaxed text-muted mb-5">{n.cycles}</p>

                <p className="text-[12px] font-[700] uppercase tracking-[0.14em] mb-2 font-sans" style={{ color: TEAL_SOFT }}>
                  How much treatment is actually NHS-funded
                </p>
                <p className="text-[15px] font-sans leading-relaxed text-muted mb-5">{n.nhsFundedShare}</p>

                <p className="text-[12px] font-[700] uppercase tracking-[0.14em] mb-2 font-sans" style={{ color: TEAL_SOFT }}>
                  Who the donor route covers
                </p>
                <p className="text-[15px] font-sans leading-relaxed text-muted mb-5">{n.donorRoute}</p>

                <p className="text-[12px] font-[700] uppercase tracking-[0.14em] mb-3 font-sans" style={{ color: TEAL_SOFT }}>
                  Criteria to expect
                </p>
                <ul className="space-y-2.5 mb-5">
                  {n.criteria.map((c) => (
                    <li key={c} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1 w-1 rounded-full shrink-0" style={{ background: TEAL, opacity: 0.45 }} />
                      <p className="text-[14px] font-sans leading-relaxed text-muted">{c}</p>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {n.sources.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-sans transition-colors hover:bg-[var(--teal)] hover:text-white text-teal"
                      style={{ borderColor: "var(--border)" }}
                    >
                      {s.label}
                      <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to qualify */}
        <div className="mt-20">
          <h3
            className="font-sans font-bold mb-3"
            style={{ fontSize: "clamp(1.625rem, 2.2vw, 2.25rem)", lineHeight: 1.2, color: TEAL }}
          >
            How to qualify, in order.
          </h3>
          <p className="text-[16px] font-sans leading-relaxed text-muted mb-10" style={{ maxWidth: "62ch" }}>
            Nobody is assessed against NICE. You are assessed against a written policy, and you can
            read it first.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0">
            {NHS_APPLICATION_STEPS.map((s, i) => (
              <div key={s.title} className="py-7 border-t" style={{ borderColor: "var(--border)" }}>
                <p className="text-[12px] font-[700] font-sans mb-3" style={{ color: TEAL_SOFT }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h4 className="font-sans font-bold text-[15px] leading-snug mb-2.5" style={{ color: TEAL }}>
                  {s.title}
                </h4>
                <p className="text-[14px] font-sans leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pitfalls */}
        <div className="mt-20">
          <h3
            className="font-sans font-bold mb-3"
            style={{ fontSize: "clamp(1.625rem, 2.2vw, 2.25rem)", lineHeight: 1.2, color: TEAL }}
          >
            The criteria that catch people out.
          </h3>
          <p className="text-[16px] font-sans leading-relaxed text-muted mb-10" style={{ maxWidth: "62ch" }}>
            These are the clauses that do the work. Check every one before you spend anything
            privately.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0">
            {NHS_PITFALLS.map((p) => (
              <div key={p.title} className="py-8 border-t" style={{ borderColor: "var(--border)" }}>
                <h4 className="font-sans font-bold text-base mb-3" style={{ color: TEAL }}>
                  {p.title}
                </h4>
                <p className="text-[15px] font-sans leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Eligibility checker */}
      <Section band={3} id="check" className="border-t border-border scroll-mt-20">
        <p
          className="text-[13px] font-[600] uppercase tracking-[2px] font-sans flex items-center gap-2 mb-4"
          style={{ color: "var(--teal)" }}
        >
          <ShapeMark name="cross" size={14} style={{ color: "var(--lavender)" }} />
          Self-check
        </p>
        <h2
          className="font-sans font-bold mb-5"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: TEAL }}
        >
          Would the usual criteria let you through?
        </h2>
        <p className="text-lg font-sans leading-relaxed text-muted mb-12" style={{ maxWidth: "62ch" }}>
          A few questions against the criteria NHS fertility policies have in common. It cannot tell
          you what your own board has commissioned, but it will tell you which clause to look for
          first, and what it is likely to cost you to clear it.
        </p>

        <NHSEligibilityChecker />

        <p className="text-[15px] font-sans leading-relaxed text-muted mt-8">
          <Link href="/support#money" className="underline underline-offset-2" style={{ color: TEAL }}>
            Looking after yourself
          </Link>
          : money worries and counselling.
        </p>
      </Section>

      {/* Routes */}
      <Section band={4} id="routes" className="border-t border-border scroll-mt-20">
        <p
          className="text-[13px] font-[600] uppercase tracking-[2px] font-sans flex items-center gap-2 mb-4"
          style={{ color: "var(--teal)" }}
        >
          <ShapeMark name="asterisk" size={14} style={{ color: "var(--lavender)" }} />
          Every funding route
        </p>
        <h2
          className="font-sans font-bold mb-5"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: TEAL }}
        >
          The routes people actually use.
        </h2>
        <p className="text-lg font-sans leading-relaxed text-muted mb-12" style={{ maxWidth: "62ch" }}>
          Grouped by what they do to the bill, each route carries what it costs, who is out of pocket
          if treatment does not work, and the questions worth asking before you commit.
        </p>

        <FundingRouteExplorer routes={FUNDING_ROUTES} />
      </Section>

      {/* Before you sign */}
      <Section band={5} id="before-you-sign" className="border-t border-border scroll-mt-20">
        <p
          className="text-[13px] font-[600] uppercase tracking-[2px] font-sans flex items-center gap-2 mb-4"
          style={{ color: "var(--teal)" }}
        >
          <ShapeMark name="pause" size={14} style={{ color: "var(--lavender)" }} />
          Due diligence
        </p>
        <h2
          className="font-sans font-bold mb-5"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: TEAL }}
        >
          Before you sign anything.
        </h2>
        <p className="text-lg font-sans leading-relaxed text-muted mb-12" style={{ maxWidth: "62ch" }}>
          Reasonable questions for any clinic, lender or programme. Ask them by email so the answers
          are in writing.
        </p>

        <ul className="space-y-0 max-w-[70ch]">
          {QUESTIONS_BEFORE_SIGNING.map((q, i) => (
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

        {/* Protections */}
        <div className="mt-20">
          <h3
            className="font-sans font-bold mb-3"
            style={{ fontSize: "clamp(1.625rem, 2.2vw, 2.25rem)", lineHeight: 1.2, color: TEAL }}
          >
            What you are entitled to.
          </h3>
          <p className="text-[16px] font-sans leading-relaxed text-muted mb-10" style={{ maxWidth: "62ch" }}>
            This is a regulated market. These are the protections in it.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0">
            {PROTECTIONS.map((p) => (
              <div key={p.title} className="py-8 border-t" style={{ borderColor: "var(--border)" }}>
                <h4 className="font-sans font-bold text-base mb-3" style={{ color: TEAL }}>
                  {p.title}
                </h4>
                <p className="text-[15px] font-sans leading-relaxed text-muted mb-3">{p.body}</p>
                {p.source && (
                  <a
                    href={p.source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-sans text-muted hover:text-foreground transition-colors"
                  >
                    {p.source.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Red flags */}
        <div className="mt-14 rounded-2xl p-6 md:p-8" style={{ background: "var(--teal)" }}>
          <p
            className="text-[12px] font-[700] uppercase tracking-[0.14em] mb-4 font-sans"
            style={{ color: "var(--on-teal-muted)" }}
          >
            Walk away from these
          </p>
          <ul className="space-y-3">
            {RED_FLAGS.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span
                  className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ background: "var(--on-teal-muted)" }}
                />
                <p
                  className="text-[15px] font-sans leading-relaxed"
                  style={{ color: "var(--on-teal)", maxWidth: "64ch" }}
                >
                  {f}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[15px] font-sans leading-relaxed text-muted mt-14" style={{ maxWidth: "68ch" }}>
          Funding information last reviewed {LAST_REVIEWED}. Prices, NHS criteria and company terms
          change; treat every figure as a starting point, not a quote. CairnFertility is not a
          financial adviser, lender or clinic; nothing on this page is financial or medical advice,
          and we receive no payment from any organisation named on it.
        </p>
      </Section>

      <CTASection />
    </main>
  );
}
