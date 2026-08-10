import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { Section } from "@/components/section";
import { ArrowRight, BookOpen, Calculator, ExternalLink, Map, FileText, Heart, Baby } from "lucide-react";
import { FAMILY_TYPES } from "@/lib/family-types";

export const metadata: Metadata = {
  title: "Resources | Cairn Fertility",
  description: "Guides, tools, checklists, and templates for solo mums, solo dads, two mums, two dads, and couples going through fertility treatment.",
};

const CATEGORIES = [
  {
    icon: <Calculator className="h-5 w-5" />,
    title: "Finance & Costs",
    resources: [
      { title: "The complete IVF cost breakdown (2025)", type: "Guide", slug: "complete-solo-ivf-cost-breakdown" },
      { title: "Fertility finance options: loans, grants & employer schemes", type: "Guide", slug: "fertility-finance-options" },
      { title: "Budget spreadsheet template", type: "Template", slug: "ivf-budget-template" },
      { title: "How to ask your employer about fertility benefits", type: "Script", slug: "employer-fertility-benefits" },
    ],
  },
  {
    icon: <Map className="h-5 w-5" />,
    title: "Treatment & Clinics",
    resources: [
      { title: "IUI vs IVF vs donor eggs: which is right for you?", type: "Guide", slug: "iui-vs-ivf-vs-donor-eggs" },
      { title: "Questions to ask at your first consultation", type: "Checklist", slug: "consultation-questions" },
      { title: "Understanding HFEA success rates", type: "Explainer", slug: "understanding-hfea-success-rates" },
      { title: "How to choose a sperm donor", type: "Guide", slug: "how-to-choose-a-sperm-donor" },
    ],
  },
  {
    icon: <Heart className="h-5 w-5" />,
    title: "Emotional Wellbeing",
    resources: [
      { title: "Managing the two-week wait", type: "Guide", slug: "two-week-wait" },
      { title: "When treatment doesn't work: what next?", type: "Guide", slug: "when-treatment-fails" },
      { title: "Finding a fertility-aware therapist", type: "Directory", slug: "finding-fertility-therapist" },
      { title: "Telling friends and family about your journey", type: "Guide", slug: "telling-friends-family" },
    ],
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Legal & Admin",
    resources: [
      { title: "Donor conception and legal parenthood explained", type: "Explainer", slug: "donor-conception-legal-parenthood" },
      { title: "What the HFEA register means for your child", type: "Guide", slug: "hfea-register" },
      { title: "Known donors: legal agreements you need", type: "Guide", slug: "known-donor-legal-agreements" },
      { title: "Maternity leave as a self-employed parent", type: "Guide", slug: "self-employed-maternity-leave" },
    ],
  },
  {
    icon: <Baby className="h-5 w-5" />,
    title: "Pregnancy & Beyond",
    resources: [
      { title: "Pregnancy: building your support team", type: "Guide", slug: "solo-pregnancy-support-team" },
      { title: "Birth partner options", type: "Guide", slug: "birth-partner-options" },
      { title: "Talking to your child about donor conception", type: "Guide", slug: "talking-to-child-donor-conception" },
      { title: "Childcare planning: a parent's guide", type: "Guide", slug: "childcare-planning" },
    ],
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Community & Stories",
    resources: [
      { title: "Real stories: families share their journeys", type: "Stories", slug: "real-stories" },
      { title: "Recommended books for every family type", type: "Reading list", slug: "recommended-books" },
      { title: "Online communities worth joining", type: "Directory", slug: "online-communities" },
      { title: "UK support groups: in-person and online", type: "Directory", slug: "uk-support-groups" },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <section className="border-b border-border px-6 md:px-12 lg:px-16">
        <div className="mx-auto">
          <SiteNav />
        </div>
      </section>

      {/* Header */}
      <Section band={0} padding="pt-16 pb-14 md:pt-24 md:pb-16">
        <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
          Everything you need
        </p>
        <h1
          className="font-sans font-bold text-[#1A3A25] mb-4"
          style={{ fontSize: "clamp(2.75rem, 5vw, 5.5rem)", lineHeight: 1.05 }}
        >
          Resources
        </h1>
        <p className="text-[17px] font-sans text-muted leading-relaxed" style={{ maxWidth: "52ch" }}>
          Guides, checklists, templates, and explainers for solo mums, solo dads, two mums, two dads, and couples going through fertility treatment.
        </p>
      </Section>

      {/* Ways in: the essential external resource, then the family-type filters */}
      <Section band={1}>
        {/* DCN featured link */}
        <div className="mb-14 rounded-2xl border border-border p-6 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="flex-1">
            <p className="text-[10px] font-[600] uppercase tracking-[0.12em] text-muted mb-2 font-sans">
              Essential external resource · All family types
            </p>
            <p className="font-sans font-semibold text-[#1A3A25] text-base mb-1">
              Donor Conception Network
            </p>
            <p className="text-sm font-sans text-muted leading-relaxed" style={{ maxWidth: "52ch" }}>
              The UK's leading support charity for donor-conceived families. Books, workshops, peer support, and guidance on talking to children about their conception. Relevant to solo parents, same-sex couples, and heterosexual couples alike.
            </p>
          </div>
          <a
            href="https://dcnetwork.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 shrink-0 rounded-full border border-[#1A3A25]/20 text-[#1A3A25] px-5 py-2.5 text-sm font-sans font-medium hover:bg-[#1A3A25] hover:text-white transition-colors"
          >
            Visit dcnetwork.org
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Browse by family type */}
        <div>
          <p className="text-[11px] font-[600] uppercase tracking-[0.15em] text-muted mb-5 font-sans">
            Browse by family type
          </p>
          <div className="flex flex-wrap gap-2">
            {FAMILY_TYPES.map((f) => (
              <Link
                key={f.slug}
                href={`/families/${f.slug}#resources`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-sans text-[#1A3A25] hover:bg-[#1A3A25] hover:text-white hover:border-[#1A3A25] transition-colors"
              >
                {f.label}
                <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* Category grid */}
      <Section band={2}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0">
          {CATEGORIES.map((cat) => (
            <div key={cat.title} className="py-10 border-t border-border">
              <div className="text-accent mb-4">{cat.icon}</div>
              <h2 className="font-sans font-bold text-[#1A3A25] text-xl mb-5">{cat.title}</h2>
              <ul className="space-y-3">
                {cat.resources.map((r) => (
                  <li key={r.title}>
                    <Link href={`/resources/${r.slug}`} className="flex items-start gap-3 group">
                      <ArrowRight className="h-3.5 w-3.5 text-border shrink-0 mt-0.5 group-hover:text-accent transition-colors duration-150" />
                      <div>
                        <p className="text-sm font-sans text-[#1A3A25]/70 leading-snug group-hover:text-[#1A3A25] transition-colors duration-150">
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
          ))}
        </div>
      </Section>

      <CTASection />
    </main>
  );
}
