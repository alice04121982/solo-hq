import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Resources | Flying Solo",
  description: "Guides, tools, checklists, and templates for solo mums by choice. Everything you need to navigate your journey with confidence.",
};

const CATEGORIES = [
  {
    illustration: "/images/illustrations/phase-foundations.png",
    title: "Finance & Costs",
    description: "Understand what everything costs and how to fund it.",
    resources: [
      { title: "The complete solo IVF cost breakdown (2025)", type: "Guide", slug: "complete-solo-ivf-cost-breakdown" },
      { title: "Fertility finance options: loans, grants & employer schemes", type: "Guide", slug: "fertility-finance-options" },
      { title: "Budget spreadsheet template", type: "Template", slug: "ivf-budget-template" },
      { title: "How to ask your employer about fertility benefits", type: "Script", slug: "employer-fertility-benefits" },
    ],
  },
  {
    illustration: "/images/illustrations/phase-treatment.png",
    title: "Treatment & Clinics",
    description: "Navigate your options and find the right clinic for you.",
    resources: [
      { title: "IUI vs IVF vs donor eggs: which is right for you?", type: "Guide", slug: "iui-vs-ivf-vs-donor-eggs" },
      { title: "Questions to ask at your first consultation", type: "Checklist", slug: "consultation-questions" },
      { title: "Understanding HFEA success rates", type: "Explainer", slug: "understanding-hfea-success-rates" },
      { title: "How to choose a sperm donor", type: "Guide", slug: "how-to-choose-a-sperm-donor" },
    ],
  },
  {
    illustration: "/images/illustrations/phase-resilience.png",
    title: "Emotional Wellbeing",
    description: "Take care of yourself through every part of the process.",
    resources: [
      { title: "Managing the two-week wait alone", type: "Guide", slug: "two-week-wait" },
      { title: "When treatment doesn't work: what next?", type: "Guide", slug: "when-treatment-fails" },
      { title: "Finding a fertility-aware therapist", type: "Directory", slug: "finding-fertility-therapist" },
      { title: "Telling friends and family you're going solo", type: "Guide", slug: "telling-friends-family" },
    ],
  },
  {
    illustration: "/images/illustrations/phase-decision.png",
    title: "Legal & Admin",
    description: "Know your rights and get the paperwork right from the start.",
    resources: [
      { title: "Donor conception and legal parenthood explained", type: "Explainer", slug: "donor-conception-legal-parenthood" },
      { title: "What the HFEA register means for your child", type: "Guide", slug: "hfea-register" },
      { title: "Known donors: legal agreements you need", type: "Guide", slug: "known-donor-legal-agreements" },
      { title: "Maternity leave as a self-employed solo mum", type: "Guide", slug: "self-employed-maternity-leave" },
    ],
  },
  {
    illustration: "/images/illustrations/phase-pregnancy.png",
    title: "Pregnancy & Beyond",
    description: "From positive test to parenthood — you've got this.",
    resources: [
      { title: "Solo pregnancy: building your support team", type: "Guide", slug: "solo-pregnancy-support-team" },
      { title: "Birth partner options when you're going solo", type: "Guide", slug: "birth-partner-options" },
      { title: "Talking to your child about donor conception", type: "Guide", slug: "talking-to-child-donor-conception" },
      { title: "Childcare planning: a solo parent's guide", type: "Guide", slug: "childcare-planning" },
    ],
  },
  {
    illustration: "/images/illustrations/phase-life-ahead.png",
    title: "Community & Stories",
    description: "Real voices, recommended reads, and where to find your people.",
    resources: [
      { title: "Real stories: solo mums share their journeys", type: "Stories", slug: "real-stories" },
      { title: "Books every solo mum by choice should read", type: "Reading list", slug: "recommended-books" },
      { title: "Online communities worth joining", type: "Directory", slug: "online-communities" },
      { title: "UK support groups: in-person and online", type: "Directory", slug: "uk-support-groups" },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <section className="border-b border-border px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <SiteNav />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[12px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
            Everything you need
          </p>
          <h1
            className="font-serif font-semibold text-foreground mb-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
          >
            Resources
          </h1>
          <p
            className="text-[17px] font-sans text-muted leading-relaxed"
            style={{ maxWidth: "52ch" }}
          >
            Guides, checklists, templates, and explainers — built by solo mums
            who&apos;ve done this.
          </p>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              className="rounded-2xl bg-white border border-border shadow-sm overflow-hidden flex flex-col"
            >
              {/* Illustration */}
              <div className="relative w-full bg-background-alt" style={{ aspectRatio: "16/9" }}>
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
                <h2 className="font-serif font-semibold text-foreground text-xl mb-1">
                  {cat.title}
                </h2>
                <p className="text-sm font-sans text-muted mb-5 leading-relaxed">
                  {cat.description}
                </p>

                <ul className="space-y-3 mt-auto">
                  {cat.resources.map((r) => (
                    <li key={r.title}>
                      <Link
                        href={`/resources/${r.slug}`}
                        className="flex items-start gap-3 group"
                      >
                        <ArrowRight className="h-3.5 w-3.5 text-border shrink-0 mt-0.5 group-hover:text-accent transition-colors duration-150" />
                        <div>
                          <p className="text-sm font-sans text-foreground/70 leading-snug group-hover:text-foreground transition-colors duration-150">
                            {r.title}
                          </p>
                          <span className="text-[11px] font-[500] uppercase tracking-[0.1em] text-muted font-sans">
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
