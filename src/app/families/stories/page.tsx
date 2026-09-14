import type { Metadata } from "next";
import { InnerNav } from "@/components/inner-nav";
import { NewsletterSection } from "@/components/newsletter-section";
import { CTASection } from "@/components/cta-section";
import { buttonVariants, Badge } from "@/components/ui";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Stories | KLEO Fertility",
  description:
    "Real journeys from real families. Every path, every outcome, shared honestly.",
};

const stories = [
  {
    badge: "Solo Mum",
    title: "From 'someday' to mum in 22 months",
    excerpt:
      "I gave myself three months to decide if I was really doing this. I spent those months reading everything I could, most of it terrifyingly medical or suspiciously cheerful.",
    name: "Gemma, 38 · Bristol · Mum to Arlo via donor IUI",
    href: "/families/stories/gemma",
  },
  {
    badge: "Solo Mum",
    title: "I used donor eggs and I'm not ashamed of it",
    excerpt:
      "After three failed IVF cycles with my own eggs, my consultant suggested donor eggs. I was devastated, then slowly curious, then at peace.",
    name: "Natalie, 40 · London · Mum to twins Evi and Rosa",
    href: "/families/stories/natalie",
  },
  {
    badge: "Solo Mum",
    title: "The bit nobody talks about: the two-week wait, alone",
    excerpt:
      "Everyone warns you about the injections, the bloating. No one warns you how hard the two-week wait is when there's no partner to distract you at 2am.",
    name: "Jo, 34 · London · Mum to Lila via IVF",
    href: "/families/stories/jo",
  },
  {
    badge: "Two Mums",
    title: "Reciprocal IVF: who provides eggs, who carries?",
    excerpt:
      "The question sounds simple. The answer took us months. We made the decision by asking ourselves which of us could live with the one we didn't choose.",
    name: "Priya & Meena · London · Expecting via reciprocal IVF",
    href: "/families/stories/priya-and-meena",
  },
  {
    badge: "Solo Dad",
    title: "Surrogacy as a single man: what no one tells you",
    excerpt:
      "I knew surrogacy was possible. I didn't know it would take three years and two surrogacy agencies before I held my son.",
    name: "Marcus, 41 · London · Dad to Eli via surrogacy",
    href: "/families/stories/marcus",
  },
  {
    badge: "Two Dads",
    title: "We chose adoption. It was the right choice.",
    excerpt:
      "Biology mattered to us, until it didn't. Meeting our boys changed everything we thought we knew about what family means.",
    name: "Ben & Kev · London · Dads to two brothers",
    href: "/families/stories/ben-and-kev",
  },
] as const;

export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-bg-secondary">
      <InnerNav />

      {/* Hero */}
      <section className="bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary font-sans mb-5">
            Real families. Real journeys.
          </p>
          <h1
            className="font-display font-bold text-text-primary mb-6"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Stories
          </h1>
          <p
            className="font-sans text-text-secondary leading-relaxed"
            style={{ maxWidth: "52ch", fontSize: "1.125rem" }}
          >
            The most useful thing we can offer isn&apos;t advice. It&apos;s
            honesty. These are real accounts from families who&apos;ve been
            where you are. Every path, every outcome, every feeling.
          </p>
        </div>
      </section>

      {/* Featured story — light purple tint bg */}
      <section
        className="border-y border-border-secondary"
        style={{ backgroundColor: "#f9f5ff" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-brand-secondary font-sans mb-6">
            Founder&apos;s story
          </p>
          <blockquote>
            <p
              className="font-display font-bold text-text-primary mb-8"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                maxWidth: "36ch",
              }}
            >
              &ldquo;I built KLEO because I wished something like it had existed
              when I was starting out. Solo IVF is hard enough without spending
              months finding real information.&rdquo;
            </p>
            <footer className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <p className="font-sans font-medium text-text-primary">
                Alice, 37 · Bristol · Mum to Iris, conceived via IVF cycle 2
              </p>
              <a
                href="/families/stories/alice"
                className="inline-flex items-center gap-1.5 text-text-brand-secondary font-medium font-sans text-sm"
              >
                Read Alice&apos;s story <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Stories grid */}
      <section className="bg-bg-primary border-b border-border-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <a
                key={story.href}
                href={story.href}
                className="group flex flex-col rounded-2xl border border-border-secondary p-6 hover:border-border-brand transition-colors bg-bg-primary"
              >
                <div className="mb-4">
                  <Badge color="gray" type="pill">
                    {story.badge}
                  </Badge>
                </div>
                <h2
                  className="font-display font-bold text-text-primary mb-3"
                  style={{ fontSize: "1.125rem", letterSpacing: "-0.01em" }}
                >
                  {story.title}
                </h2>
                <p className="font-sans text-text-secondary text-sm leading-relaxed flex-1 mb-6">
                  {story.excerpt}
                </p>
                <div className="flex items-center justify-between gap-4 mt-auto">
                  <p className="font-sans text-text-tertiary text-xs">
                    {story.name}
                  </p>
                  <span className="inline-flex items-center gap-1 text-text-brand-secondary text-sm font-medium font-sans shrink-0">
                    Read <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Share your story CTA */}
      <section className="bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary font-sans mb-5">
            Share yours
          </p>
          <h2
            className="font-display font-bold text-text-primary mb-5 mx-auto"
            style={{
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              letterSpacing: "-0.02em",
              maxWidth: "28ch",
            }}
          >
            Your story might be the one someone needs.
          </h2>
          <p
            className="font-sans text-text-secondary leading-relaxed mb-8 mx-auto"
            style={{ maxWidth: "48ch" }}
          >
            We&apos;re always looking for honest accounts from families at every
            stage. If you&apos;d like to share yours (anonymously or not),
            we&apos;d love to hear from you.
          </p>
          <a
            href="/contact"
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            Get in touch <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <NewsletterSection />
      <CTASection />
    </main>
  );
}
