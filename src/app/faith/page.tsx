import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Info } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { StoryImage } from "@/components/story-image";
import { TraditionExplorer } from "@/components/faith/tradition-explorer";
import { ConversationToolkit } from "@/components/faith/conversation-toolkit";
import {
  CONVERSATION_SCENARIOS,
  FAITH_QUESTIONS,
  FAITH_SUPPORT,
  FAITH_TRADITIONS,
  GROUNDING_FACTS,
  OBSERVANCE_NOTES,
} from "@/lib/faith";
import { FAITH_STORIES } from "@/lib/stories";

export const metadata: Metadata = {
  title: "Faith, Culture & IVF | CairnFertility",
  description:
    "Where the major religious traditions stand on IVF, what to ask your own clergy, and how to handle conversations — at home, in your community, and online — that turn against your treatment.",
};

const TEAL = "var(--teal)";
const TEAL_SOFT = "rgba(0, 83, 83, 0.6)";

/** The four rules the section is written under. Stated up front rather than buried. */
const PRINCIPLES = [
  {
    title: "We describe. We don't rule.",
    body: "Nothing here is a religious ruling, and CairnFertility has no standing to give one. We set out what traditions teach so you can have a better conversation with someone who does.",
  },
  {
    title: "No tradition is a monolith.",
    body: "Every entry below names the internal disagreement as well as the mainstream position, because the disagreement is usually the part that matters to the person reading.",
  },
  {
    title: "Everything is sourced.",
    body: "Each tradition links to documents you can open and read yourself — a faith's own texts and UK regulators, not clinics writing about someone else's religion.",
  },
  {
    title: "Belief is yours to work out.",
    body: "Some people here will decide their tradition is right and stop. Some will go ahead anyway. Both are reading this page, and it is written for both.",
  },
];

export default function FaithPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <section className="border-b border-border px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <SiteNav />
        </div>
      </section>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-12">
        <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
          Faith, culture &amp; belief
        </p>
        <h1
          className="font-sans font-bold mb-6"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05, color: TEAL }}
        >
          Faith, culture and IVF.
        </h1>
        <p
          className="text-[18px] font-sans leading-[1.6] text-muted"
          style={{ maxWidth: "58ch" }}
        >
          For a lot of people, the hardest part of fertility treatment isn&rsquo;t the
          injections or the cost. It&rsquo;s reconciling it with what you were raised to
          believe — and then handling everyone who has an opinion about it.
        </p>
        <p
          className="text-[16px] font-sans leading-relaxed text-muted mt-4"
          style={{ maxWidth: "58ch" }}
        >
          This section covers where the major traditions actually stand, what to ask your
          own clergy, and what to say when a conversation turns against you.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {[
            { label: "What's actually at stake", href: "#at-stake" },
            { label: "Where traditions stand", href: "#traditions" },
            { label: "Practical observance", href: "#observance" },
            { label: "Stories", href: "#stories" },
            { label: "Difficult conversations", href: "#conversations" },
            { label: "Support", href: "#support" },
          ].map((l) => (
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
      </section>

      {/* How we've written this */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-20">
        <div className="rounded-2xl p-6 md:p-10" style={{ background: "var(--cream)" }}>
          <p
            className="inline-flex items-center gap-2 text-[10px] font-[700] uppercase tracking-[0.14em] mb-6 font-sans"
            style={{ color: TEAL_SOFT }}
          >
            <Info className="h-3.5 w-3.5" />
            How we&rsquo;ve written this
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7">
            {PRINCIPLES.map((p) => (
              <div key={p.title}>
                <h2 className="font-sans font-bold text-base mb-2" style={{ color: TEAL }}>
                  {p.title}
                </h2>
                <p
                  className="text-[15px] font-sans leading-relaxed"
                  style={{ color: "rgba(0, 83, 83, 0.75)" }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's actually at stake */}
      <section
        id="at-stake"
        className="border-t border-border scroll-mt-20"
        style={{ background: "var(--background-alt)" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <p
            className="text-[11px] font-[600] uppercase tracking-[0.15em] text-muted mb-4 font-sans"
          >
            The reframe
          </p>
          <h2
            className="font-sans font-bold mb-5"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)", lineHeight: 1.1, color: TEAL }}
          >
            &ldquo;Is IVF allowed?&rdquo; is almost never one question.
          </h2>
          <p
            className="text-[17px] font-sans leading-relaxed text-muted mb-12"
            style={{ maxWidth: "62ch" }}
          >
            Traditions rarely answer it as a single yes or no. They answer seven or eight
            smaller ones, and they disagree in different places. Knowing which question is
            being argued about turns a stalled conversation with your clergy — or your
            mother — into a specific one.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-0">
            {FAITH_QUESTIONS.map((q, i) => (
              <div key={q.question} className="py-7 border-t" style={{ borderColor: "var(--border)" }}>
                <p
                  className="text-[10px] font-[700] font-sans mb-3"
                  style={{ color: TEAL_SOFT }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className="font-sans font-bold text-[15px] leading-snug mb-2.5"
                  style={{ color: TEAL }}
                >
                  {q.question}
                </h3>
                <p className="text-[14px] font-sans leading-relaxed text-muted">{q.why}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Traditions */}
      <section id="traditions" className="border-t border-border scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <p className="text-[11px] font-[600] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
            Where traditions stand
          </p>
          <h2
            className="font-sans font-bold mb-5"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)", lineHeight: 1.1, color: TEAL }}
          >
            Nine starting points, none of them the last word.
          </h2>
          <p
            className="text-[17px] font-sans leading-relaxed text-muted mb-12"
            style={{ maxWidth: "62ch" }}
          >
            Each entry sets out the mainstream position, the places where serious people
            inside that tradition disagree, and questions you can take to your own priest,
            imam, rabbi, pandit, granthi or teacher. Sources are linked so you never have
            to take our word for any of it.
          </p>

          <TraditionExplorer traditions={FAITH_TRADITIONS} />

          <p className="text-[13px] font-sans leading-relaxed text-muted mt-8" style={{ maxWidth: "68ch" }}>
            If your tradition isn&rsquo;t here, that is a gap in this page rather than a
            judgement about your tradition. Tell us and we will research it properly and
            add it.
          </p>
        </div>
      </section>

      {/* Practical observance */}
      <section
        id="observance"
        className="border-t border-border scroll-mt-20"
        style={{ background: "var(--background-alt)" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <p className="text-[11px] font-[600] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
            In the clinic
          </p>
          <h2
            className="font-sans font-bold mb-5"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)", lineHeight: 1.1, color: TEAL }}
          >
            Keeping your practice through a cycle.
          </h2>
          <p
            className="text-[17px] font-sans leading-relaxed text-muted mb-12"
            style={{ maxWidth: "62ch" }}
          >
            Most of what disrupts observant patients isn&rsquo;t doctrinal. It&rsquo;s
            scheduling, staffing and ingredients — all of which a clinic can usually
            accommodate, and none of which it will offer unprompted.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0">
            {OBSERVANCE_NOTES.map((n) => (
              <div key={n.title} className="py-8 border-t" style={{ borderColor: "var(--border)" }}>
                <h3 className="font-sans font-bold text-base mb-3" style={{ color: TEAL }}>
                  {n.title}
                </h3>
                <p className="text-[15px] font-sans leading-relaxed text-muted">{n.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories */}
      <section id="stories" className="border-t border-border scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <p className="text-[11px] font-[600] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
            In their own words
          </p>
          <h2
            className="font-sans font-bold mb-5"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)", lineHeight: 1.1, color: TEAL }}
          >
            People who had to hold both.
          </h2>
          <p
            className="text-[17px] font-sans leading-relaxed text-muted mb-12"
            style={{ maxWidth: "62ch" }}
          >
            Faith and treatment, at the same time, in front of families who had views.
            None of these people resolved it neatly. That is rather the point.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {FAITH_STORIES.map((story) => (
              <Link
                key={story.id}
                href={`/stories/${story.id}`}
                className="group flex flex-col gap-4 transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="relative h-52 rounded-xl overflow-hidden bg-background-alt">
                  <StoryImage
                    src={story.image}
                    alt={story.imageAlt}
                    label={story.tradition ?? story.familyLabel}
                    sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                  />
                </div>

                <div className="flex flex-col gap-3 flex-1">
                  <span className="text-[10px] font-[600] uppercase tracking-[0.12em] text-accent font-sans">
                    {story.tag}
                  </span>
                  <h3
                    className="font-sans font-bold text-lg leading-snug"
                    style={{ color: TEAL }}
                  >
                    {story.title}
                  </h3>
                  <p className="text-sm font-sans text-muted leading-relaxed flex-1">
                    {story.excerpt}
                  </p>
                  <p className="text-[11px] font-[600] uppercase tracking-[0.12em] text-muted font-sans pt-3 border-t border-border">
                    {story.name}, {story.age} &nbsp;·&nbsp; {story.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div
            className="mt-14 rounded-2xl border p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-5"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex-1">
              <p
                className="text-[10px] font-[700] uppercase tracking-[0.12em] mb-2 font-sans"
                style={{ color: TEAL_SOFT }}
              >
                We want more of these
              </p>
              <p className="font-sans font-bold text-base mb-1" style={{ color: TEAL }}>
                Navigating treatment alongside your faith?
              </p>
              <p className="text-sm font-sans text-muted leading-relaxed" style={{ maxWidth: "58ch" }}>
                The traditions represented here are not the only ones, and the accounts
                that help most are the ones written by people who lived them. Stories are
                published only with their author&rsquo;s consent, and anonymously if you
                prefer.
              </p>
            </div>
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 shrink-0 rounded-full px-6 py-3 text-sm font-sans font-medium transition-opacity hover:opacity-90"
              style={{ background: "var(--accent)", color: "#1A3A25" }}
            >
              Share your story
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Difficult conversations */}
      <section
        id="conversations"
        className="border-t border-border scroll-mt-20"
        style={{ background: "var(--background-alt)" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <p className="text-[11px] font-[600] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
            When the conversation is against you
          </p>
          <h2
            className="font-sans font-bold mb-5"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)", lineHeight: 1.1, color: TEAL }}
          >
            You do not owe anyone a debate.
          </h2>
          <p
            className="text-[17px] font-sans leading-relaxed text-muted mb-4"
            style={{ maxWidth: "62ch" }}
          >
            Opposition to IVF turns up in doctrine, in culture, in family WhatsApp groups
            and in the comments under anything. Some of it is thoughtful. Much of it
            isn&rsquo;t, and you are not obliged to sort one from the other while you are
            mid-cycle.
          </p>
          <p
            className="text-[17px] font-sans leading-relaxed text-muted mb-12"
            style={{ maxWidth: "62ch" }}
          >
            Pick the situation you&rsquo;re in. Every script below is written to be said
            out loud, and can be copied to your phone.
          </p>

          <ConversationToolkit scenarios={CONVERSATION_SCENARIOS} />

          {/* Reusable lines */}
          {/* Grounding facts */}
          <div className="mt-20 pt-14 border-t" style={{ borderColor: "var(--border)" }}>
            <h3
              className="font-sans font-bold mb-3"
              style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)", lineHeight: 1.2, color: TEAL }}
            >
              Facts you can reach for.
            </h3>
            <p
              className="text-[16px] font-sans leading-relaxed text-muted mb-8"
              style={{ maxWidth: "60ch" }}
            >
              A sincere religious objection can&rsquo;t be fact-checked away, and this
              isn&rsquo;t an attempt to. But a good deal of what circulates about IVF is
              simply wrong about UK law and practice, and it helps to know the difference.
            </p>
            <ul className="space-y-0 max-w-[70ch]">
              {GROUNDING_FACTS.map((g) => (
                <li key={g.fact} className="py-6 border-t" style={{ borderColor: "var(--border)" }}>
                  <p
                    className="text-[16px] font-sans leading-relaxed mb-2"
                    style={{ color: TEAL }}
                  >
                    {g.fact}
                  </p>
                  <a
                    href={g.source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-sans text-muted hover:text-foreground transition-colors"
                  >
                    {g.source.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Safety */}
          <div
            className="mt-14 rounded-2xl p-6 md:p-8"
            style={{ background: "var(--teal)" }}
          >
            <p
              className="text-[10px] font-[700] uppercase tracking-[0.14em] mb-3 font-sans"
              style={{ color: "var(--on-teal-muted)" }}
            >
              When it stops being a disagreement
            </p>
            <p
              className="text-[16px] font-sans leading-relaxed"
              style={{ color: "var(--on-teal)", maxWidth: "64ch" }}
            >
              Everything above assumes people who disagree with you but wish you well.
              That is not always the situation. If someone is controlling your money, your
              medication or your appointments, threatening you, or telling you that you
              will be cut off from your family or community unless you comply, that
              isn&rsquo;t a theological conversation and none of these scripts are the
              right tool. Tell your clinic — they have safeguarding routes — or speak to
              a counsellor independently of everyone involved.
            </p>
          </div>
        </div>
      </section>

      {/* Support */}
      <section id="support" className="border-t border-border scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <p className="text-[11px] font-[600] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
            Where to go next
          </p>
          <h2
            className="font-sans font-bold mb-5"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)", lineHeight: 1.1, color: TEAL }}
          >
            Faith-aware support.
          </h2>
          <p
            className="text-[17px] font-sans leading-relaxed text-muted mb-12"
            style={{ maxWidth: "62ch" }}
          >
            Organisations that will not be surprised by any part of this conversation.
            Where we don&rsquo;t know of a dedicated service for a tradition, we have said
            so rather than inventing one.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0">
            {FAITH_SUPPORT.map((s) => {
              const external = s.href.startsWith("http");
              return (
                <div key={s.name} className="py-8 border-t" style={{ borderColor: "var(--border)" }}>
                  <p
                    className="text-[10px] font-[600] uppercase tracking-[0.12em] mb-3 font-sans"
                    style={{ color: TEAL_SOFT }}
                  >
                    {s.scope}
                  </p>
                  <h3 className="font-sans font-bold text-base mb-2.5" style={{ color: TEAL }}>
                    {s.name}
                  </h3>
                  <p className="text-[15px] font-sans leading-relaxed text-muted mb-4">{s.body}</p>
                  <a
                    href={s.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 text-sm font-sans font-medium transition-opacity hover:opacity-70"
                    style={{ color: TEAL }}
                  >
                    {external ? "Visit" : "Compare clinics"}
                    {external ? (
                      <ExternalLink className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowRight className="h-3.5 w-3.5" />
                    )}
                  </a>
                </div>
              );
            })}
          </div>

          <p
            className="text-[13px] font-sans leading-relaxed text-muted mt-10"
            style={{ maxWidth: "68ch" }}
          >
            CairnFertility is not a religious authority and nothing on this page is
            religious guidance or medical advice. Positions described here are summaries
            of published teaching; your own clergy, and your own clinician, speak for your
            situation in a way that a website cannot.
          </p>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
