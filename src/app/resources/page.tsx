import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Resources | KLEO Fertility",
  description: "Guides, tools, checklists, and templates for every path to parenthood: solo, donor conception, same-sex families, and couples. Everything you need to navigate your journey with confidence.",
};

const CATEGORIES = [
  {
    illustration: "/images/illustrations/phase-foundations.png",
    title: "Finance & Costs",
    description: "Understand what treatment costs and how to fund it, whatever path you're on.",
    resources: [
      { title: "The complete IVF cost breakdown (2025)", type: "Guide", slug: "complete-solo-ivf-cost-breakdown" },
      { title: "Fertility finance options: loans, grants & employer schemes", type: "Guide", slug: "fertility-finance-options" },
      { title: "Fertility treatment budget planner", type: "Template", slug: "ivf-budget-template" },
      { title: "How to ask your employer about fertility benefits", type: "Script", slug: "employer-fertility-benefits" },
    ],
  },
  {
    illustration: "/images/illustrations/phase-treatment.png",
    title: "Treatment & Clinics",
    description: "Navigate your treatment options and find the right clinic for your family.",
    resources: [
      { title: "IUI vs IVF vs donor eggs: which is right for you?", type: "Guide", slug: "iui-vs-ivf-vs-donor-eggs" },
      { title: "Reciprocal IVF: a guide for same-sex couples", type: "Guide", slug: "reciprocal-ivf-guide" },
      { title: "Questions to ask at your first consultation", type: "Checklist", slug: "consultation-questions" },
      { title: "Understanding HFEA success rates", type: "Explainer", slug: "understanding-hfea-success-rates" },
    ],
  },
  {
    illustration: "/images/illustrations/phase-resilience.png",
    title: "Emotional Wellbeing",
    description: "Take care of yourself (and each other) through every part of the process.",
    resources: [
      { title: "Managing the two-week wait: a guide for everyone", type: "Guide", slug: "two-week-wait" },
      { title: "When treatment doesn't work: what next?", type: "Guide", slug: "when-treatment-fails" },
      { title: "Finding a fertility-aware therapist", type: "Directory", slug: "finding-fertility-therapist" },
      { title: "Telling friends and family about your fertility journey", type: "Guide", slug: "telling-friends-family" },
    ],
  },
  {
    illustration: "/images/illustrations/phase-decision.png",
    title: "Donor Conception",
    description: "Everything you need to know about using donor sperm, eggs, or embryos.",
    resources: [
      { title: "How to choose a sperm donor", type: "Guide", slug: "how-to-choose-a-sperm-donor" },
      { title: "How to choose an egg donor", type: "Guide", slug: "how-to-choose-an-egg-donor" },
      { title: "Donor conception and legal parenthood explained", type: "Explainer", slug: "donor-conception-legal-parenthood" },
      { title: "Talking to your child about donor conception", type: "Guide", slug: "talking-to-child-donor-conception" },
    ],
  },
  {
    illustration: "/images/illustrations/phase-pregnancy.png",
    title: "Legal & Admin",
    description: "Know your rights and get the paperwork right from the start.",
    resources: [
      { title: "What the HFEA register means for your child", type: "Guide", slug: "hfea-register" },
      { title: "Known donors: legal agreements you need", type: "Guide", slug: "known-donor-legal-agreements" },
      { title: "Parental rights for same-sex couples", type: "Explainer", slug: "parental-rights-same-sex-couples" },
      { title: "Parental leave: your options as a new family", type: "Guide", slug: "parental-leave-options" },
    ],
  },
  {
    illustration: "/images/illustrations/phase-life-ahead.png",
    title: "Community & Stories",
    description: "Real voices from real families, and where to find your people.",
    resources: [
      { title: "Real stories: families share their journeys", type: "Stories", slug: "real-stories" },
      { title: "Books about fertility and family-building", type: "Reading list", slug: "recommended-books" },
      { title: "Online communities worth joining", type: "Directory", slug: "online-communities" },
      { title: "UK support groups: in-person and online", type: "Directory", slug: "uk-support-groups" },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-bg-secondary">
      {/* Nav */}
      <section className="border-b border-border-secondary px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <SiteNav />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-tertiary mb-4 font-sans">
            Everything you need
          </p>
          <h1
            className="font-serif font-semibold text-text-primary mb-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
          >
            Resources
          </h1>
          <p
            className="text-md font-sans text-text-secondary leading-relaxed"
            style={{ maxWidth: "52ch" }}
          >
            Guides, checklists, templates, and explainers for every family,
            on every path to parenthood.
          </p>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              className="rounded-2xl bg-bg-primary border border-border-secondary shadow-sm overflow-hidden flex flex-col"
            >
              {/* Illustration */}
              <div className="relative w-full bg-bg-tertiary" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={cat.illustration}
                  alt={cat.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h2 className="font-serif font-semibold text-text-primary text-xl mb-1">
                  {cat.title}
                </h2>
                <p className="text-sm font-sans text-text-secondary mb-5 leading-relaxed">
                  {cat.description}
                </p>

                <ul className="space-y-3 mt-auto">
                  {cat.resources.map((r) => (
                    <li key={r.title}>
                      <Link
                        href={`/resources/${r.slug}`}
                        className="flex items-start gap-3 group"
                      >
                        <ArrowRight className="h-3.5 w-3.5 text-fg-quaternary shrink-0 mt-0.5 group-hover:text-fg-brand-primary transition-colors duration-150" />
                        <div>
                          <p className="text-sm font-sans text-text-secondary leading-snug group-hover:text-text-primary transition-colors duration-150">
                            {r.title}
                          </p>
                          <span className="text-xs font-medium uppercase tracking-[0.1em] text-text-tertiary font-sans">
                            {r.type}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </main>
  );
}
