import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Info } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { Section } from "@/components/section";
import { StatCard } from "@/components/stat-card";
import { FundingRouteExplorer } from "@/components/funding/funding-route-explorer";
import { InternationalFunding } from "@/components/funding/international-funding";
import { NHSEligibilityChecker } from "@/components/funding/nhs-eligibility-checker";
import {
  COST_ANCHORS,
  FUNDING_ROUTES,
  INTERNATIONAL_FUNDING,
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
    "What fertility treatment is free on the NHS and how to qualify, plus every way people pay for the rest: employer benefits, egg sharing, multi-cycle and refund programmes, insurance-backed plans, grants and 0% clinic finance.",
};

const TEAL = "var(--teal)";
const TEAL_SOFT = "rgba(0, 83, 83, 0.6)";

const JUMP_LINKS = [
  { label: "What it costs", href: "#costs" },
  { label: "What's free on the NHS", href: "#nhs" },
  { label: "Check your eligibility", href: "#check" },
  { label: "Every funding route", href: "#routes" },
  { label: "Outside the UK", href: "#outside-uk" },
  { label: "Before you sign", href: "#before-you-sign" },
];


/** Things that should stop a decision, not merely inform it. */
const RED_FLAGS = [
  "Any offer of funded treatment that asks you for a fee to apply.",
  "A refund or multi-cycle programme that will not give you the full written terms to take home.",
  "Medication offered by anyone other than a registered pharmacy, including other patients online.",
  "A credit or insurance product from a firm you cannot find on the FCA register.",
  "A clinic quoting a success rate that is not the HFEA-published figure for patients of your age and diagnosis.",
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
        <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
          Funding &amp; payment options
        </p>
        <h1
          className="font-sans font-bold mb-6"
          style={{ fontSize: "clamp(2.75rem, 5vw, 5.5rem)", lineHeight: 1.05, color: TEAL }}
        >
          Paying for treatment.
        </h1>
        <p className="text-[18px] font-sans leading-[1.6] text-muted" style={{ maxWidth: "58ch" }}>
          Three quarters of IVF in England is now paid for privately, and the people paying are rarely
          told what their options are in any organised way. This page sets them out: what the NHS
          funds and how to qualify, and every route people use for the rest.
        </p>
        <p className="text-[16px] font-sans leading-relaxed text-muted mt-4" style={{ maxWidth: "58ch" }}>
          The detail here is written for the UK, and there is a section on how the same questions are
          answered elsewhere. We take no commission from anyone listed: companies appear because you
          need to know they exist, and each one is listed with what to watch out for.
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

      {/* Order of operations */}
      <Section band={0} padding="pb-20 md:pb-28">
        <div className="rounded-2xl p-6 md:p-10" style={{ background: "var(--lime)" }}>
          <p
            className="inline-flex items-center gap-2 text-[12px] font-[700] uppercase tracking-[0.14em] mb-6 font-sans"
            style={{ color: TEAL_SOFT }}
          >
            <Info className="h-3.5 w-3.5" />
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
        <p className="text-[13px] font-[600] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
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
          donor sperm adds roughly £650–£1,150 a vial at the main banks (premium donors run to about
          £1,700) plus import and handling. That gap between the
          quoted figure and the settled one is what catches most people out.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-0">
          {COST_ANCHORS.map((s, i) => (
            <StatCard key={s.label} value={s.value} label={s.label} delay={i * 0.08} />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/resources/complete-solo-ivf-cost-breakdown"
            className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-sans transition-colors hover:bg-[var(--teal)] hover:text-white"
            style={{ borderColor: "var(--border)", color: TEAL }}
          >
            The full line-by-line cost breakdown
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/resources/ivf-budget-template"
            className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-sans transition-colors hover:bg-[var(--teal)] hover:text-white"
            style={{ borderColor: "var(--border)", color: TEAL }}
          >
            Budget template
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Section>

      {/* NHS */}
      <Section band={2} id="nhs" className="border-t border-border scroll-mt-20">
        <p className="text-[13px] font-[600] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
          What is free on the NHS
        </p>
        <h2
          className="font-sans font-bold mb-5"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: TEAL }}
        >
          NICE recommends. Someone else decides.
        </h2>
        <p className="text-lg font-sans leading-relaxed text-muted mb-6" style={{ maxWidth: "62ch" }}>
          Almost every confusing thing about NHS fertility funding follows from one split: NICE writes
          the clinical recommendation, and the body that holds the budget where you live decides what
          to commission. In England that is 36 Integrated Care Boards with 36 policies (42 until they were merged in April 2026, with further mergers planned for 2027). In Scotland,
          Wales and Northern Ireland there is one set of national criteria each.
        </p>
        <p className="text-lg font-sans leading-relaxed text-muted mb-12" style={{ maxWidth: "62ch" }}>
          It is also worth separating funded treatment from everything else the NHS can do for you.
          Investigations and diagnosis — blood tests, an AMH level, scans, semen analysis where
          relevant, and a referral to a specialist — are usually free even in areas that fund no
          treatment at all, and those results shape which private route makes sense. A GP appointment
          is worth making regardless of what you have been told about your chances.
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
            Where you live changes the offer more than your diagnosis does. These are the national
            positions; in England you still have to read your own board&rsquo;s policy on top.
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
                  Solo parents and two-mum families
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
                      className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-sans transition-colors hover:bg-[var(--teal)] hover:text-white"
                      style={{ borderColor: "var(--border)", color: TEAL }}
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
            Nobody is assessed against NICE. You are assessed against a written document, and you are
            allowed to read it first.
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
            Very few people are refused for the reason they expected. These are the clauses that do
            the work, and every one of them is worth checking before you spend anything privately.
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
        <p className="text-[13px] font-[600] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
          Self-check
        </p>
        <h2
          className="font-sans font-bold mb-5"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: TEAL }}
        >
          Would the usual criteria let you through?
        </h2>
        <p className="text-lg font-sans leading-relaxed text-muted mb-12" style={{ maxWidth: "62ch" }}>
          Six questions against the criteria NHS fertility policies have in common. It cannot tell you
          what your own board has commissioned — nothing on the internet can — but it will tell you
          which clause to look for first, and what it is likely to cost you to clear it.
        </p>

        <NHSEligibilityChecker />
      </Section>

      {/* Routes */}
      <Section band={4} id="routes" className="border-t border-border scroll-mt-20">
        <p className="text-[13px] font-[600] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
          Every funding route
        </p>
        <h2
          className="font-sans font-bold mb-5"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: TEAL }}
        >
          The routes people actually use.
        </h2>
        <p className="text-lg font-sans leading-relaxed text-muted mb-12" style={{ maxWidth: "62ch" }}>
          Grouped by what they actually do to the problem: make it free, make it cheaper, get someone
          else to pay, move the risk of failure onto a company, or move the payment into the future.
          Each one carries what it costs, who is out of pocket if treatment does not work, and the
          questions that route in particular tends to punish people for not asking.
        </p>

        <FundingRouteExplorer routes={FUNDING_ROUTES} />
      </Section>

      {/* Outside the UK */}
      <Section band={5} id="outside-uk" className="border-t border-border scroll-mt-20">
        <p className="text-[13px] font-[600] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
          Outside the UK
        </p>
        <h2
          className="font-sans font-bold mb-5"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: TEAL }}
        >
          The same questions, different answers.
        </h2>
        <p className="text-lg font-sans leading-relaxed text-muted mb-6" style={{ maxWidth: "62ch" }}>
          Every route above exists in some form in every private fertility market — it is the
          companies and the public entitlements that change. Israel funds unlimited cycles regardless
          of relationship status; France reimburses four; the United States has no national
          entitlement at all and leans on employers instead.
        </p>
        <p className="text-lg font-sans leading-relaxed text-muted mb-12" style={{ maxWidth: "62ch" }}>
          Two things travel with you and matter as much as price. Whether a system admits solo
          parents and same-sex couples is a separate question from whether it funds treatment, and
          donor anonymity differs country by country — which is a decision about your child rather
          than about your budget.
        </p>

        <InternationalFunding countries={INTERNATIONAL_FUNDING} />

        <p className="text-[15px] font-sans leading-relaxed text-muted mt-10" style={{ maxWidth: "68ch" }}>
          This is a starting map, not a complete one, and it is deliberately shorter than the UK
          section above because we hold those countries&rsquo; detail to the same standard: sourced
          from that country&rsquo;s own health service and regulator, not from clinics selling
          treatment there. If your country is missing, or an entry here is out of date, tell us and
          we will research it properly and add it.
        </p>
      </Section>

      {/* Before you sign */}
      <Section band={6} id="before-you-sign" className="border-t border-border scroll-mt-20">
        <p className="text-[13px] font-[600] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
          Due diligence
        </p>
        <h2
          className="font-sans font-bold mb-5"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: TEAL }}
        >
          Before you sign anything.
        </h2>
        <p className="text-lg font-sans leading-relaxed text-muted mb-12" style={{ maxWidth: "62ch" }}>
          These are the questions that separate a good package from an expensive one, and they are
          reasonable to ask of any clinic, lender or programme. Ask them by email so the answers are
          in writing.
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
            This is a regulated market, and several of the protections in it are ones patients
            routinely do not know they have.
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
          all change; treat every figure here as a starting point for a question rather than a quote.
          CairnFertility is not a financial adviser, a lender or a clinic, and nothing on this page is
          financial or medical advice. We receive no payment from any organisation named on it.
        </p>
      </Section>

      <CTASection />
    </main>
  );
}
