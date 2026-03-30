import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { ArrowRight, BookOpen, Calculator, Map, FileText, Heart, Baby } from "lucide-react";

export const metadata: Metadata = {
  title: "Resources | Flying Solo",
  description:
    "Guides, tools, checklists, and templates for solo mums by choice. Everything you need to navigate your journey with confidence.",
};

const CATEGORIES = [
  {
    icon: <Calculator className="h-6 w-6" />,
    title: "Finance & Costs",
    color: "bg-lime/20 text-charcoal",
    resources: [
      { title: "The complete solo IVF cost breakdown (2025)", type: "Guide" },
      { title: "Fertility finance options: loans, grants & employer schemes", type: "Guide" },
      { title: "Budget spreadsheet template", type: "Template" },
      { title: "How to ask your employer about fertility benefits", type: "Script" },
    ],
  },
  {
    icon: <Map className="h-6 w-6" />,
    title: "Treatment & Clinics",
    color: "bg-lavender-light text-lavender-dark",
    resources: [
      { title: "IUI vs IVF vs donor eggs: which is right for you?", type: "Guide" },
      { title: "Questions to ask at your first consultation", type: "Checklist" },
      { title: "Understanding HFEA success rates", type: "Explainer" },
      { title: "How to choose a sperm donor", type: "Guide" },
    ],
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Emotional Wellbeing",
    color: "bg-warm-white text-navy border border-card-border",
    resources: [
      { title: "Managing the two-week wait alone", type: "Guide" },
      { title: "When treatment doesn't work: what next?", type: "Guide" },
      { title: "Finding a fertility-aware therapist", type: "Directory" },
      { title: "Telling friends and family you're going solo", type: "Guide" },
    ],
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Legal & Admin",
    color: "bg-lavender-light text-lavender-dark",
    resources: [
      { title: "Donor conception and legal parenthood explained", type: "Explainer" },
      { title: "What the HFEA register means for your child", type: "Guide" },
      { title: "Known donors: legal agreements you need", type: "Guide" },
      { title: "Maternity leave as a self-employed solo mum", type: "Guide" },
    ],
  },
  {
    icon: <Baby className="h-6 w-6" />,
    title: "Pregnancy & Beyond",
    color: "bg-lime/20 text-charcoal",
    resources: [
      { title: "Solo pregnancy: building your support team", type: "Guide" },
      { title: "Birth partner options when you're going solo", type: "Guide" },
      { title: "Talking to your child about donor conception", type: "Guide" },
      { title: "Childcare planning: a solo parent's guide", type: "Guide" },
    ],
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Community & Stories",
    color: "bg-warm-white text-navy border border-card-border",
    resources: [
      { title: "Real stories: solo mums share their journeys", type: "Stories" },
      { title: "Books every solo mum by choice should read", type: "Reading list" },
      { title: "Online communities worth joining", type: "Directory" },
      { title: "UK support groups: in-person and online", type: "Directory" },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="bg-background border-b border-card-border px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <SiteNav />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-lavender-dark mb-2">
            Everything you need
          </p>
          <h1 className="text-4xl md:text-5xl text-navy leading-tight">Resources</h1>
          <p className="text-navy/50 mt-3 max-w-lg">
            Guides, checklists, templates, and explainers — built by solo mums who&apos;ve done this.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              className="rounded-[24px] bg-card-bg border border-card-border p-6 flex flex-col gap-4"
            >
              <div className={`h-11 w-11 rounded-2xl flex items-center justify-center ${cat.color}`}>
                {cat.icon}
              </div>
              <h2 className="text-lg font-normal text-navy">{cat.title}</h2>
              <ul className="space-y-2 flex-1">
                {cat.resources.map((r) => (
                  <li key={r.title} className="flex items-start gap-2 group cursor-pointer">
                    <ArrowRight className="h-3.5 w-3.5 text-muted mt-0.5 shrink-0 group-hover:text-navy transition-colors" />
                    <div>
                      <p className="text-sm text-navy/70 leading-snug group-hover:text-navy transition-colors">
                        {r.title}
                      </p>
                      <span className="text-xs text-muted">{r.type}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </main>
  );
}
