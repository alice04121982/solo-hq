import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { Section } from "@/components/section";
import { FAMILY_SHAPES, ShapeMark } from "@/components/shapes";
import { ArrowRight, BookOpen, Briefcase, Calculator, Compass, ExternalLink, Map, FileText, Heart, Baby } from "lucide-react";
import { FAMILY_TYPES, type FamilyType } from "@/lib/family-types";

interface CategoryResource {
  title: string;
  type: string;
  /** Slug of a guide under /resources. Omit when `href` points elsewhere. */
  slug?: string;
  /** An absolute path, for entries that live outside the guide library. */
  href?: string;
}

export const metadata: Metadata = {
  title: "Resources | CairnFertility",
  description: "Guides, tools, checklists, and templates for solo mums, solo dads, two mums, two dads, and couples going through fertility treatment.",
};

const CATEGORIES: { icon: React.ReactNode; title: string; resources: CategoryResource[] }[] = [
  {
    icon: <Calculator className="h-7 w-7" />,
    title: "Finance & Costs",
    resources: [
      { title: "Funding & payment options: NHS, employers, plans and loans", type: "Hub", href: "/funding" },
      { title: "The complete IVF cost breakdown (2025)", type: "Guide", slug: "complete-solo-ivf-cost-breakdown" },
      { title: "Fertility finance options: loans, grants & employer schemes", type: "Guide", slug: "fertility-finance-options" },
      { title: "Budget spreadsheet template", type: "Template", slug: "ivf-budget-template" },
      { title: "How to ask your employer about fertility benefits", type: "Script", slug: "employer-fertility-benefits" },
    ],
  },
  {
    icon: <Briefcase className="h-7 w-7" />,
    title: "Work & Employment",
    resources: [
      { title: "Your rights at work during fertility treatment", type: "Explainer", href: "/work#rights" },
      { title: "What employers offer, and how to find out what yours does", type: "Guide", href: "/work#find-out" },
      { title: "What to say at work without disclosing more than you want", type: "Scripts", href: "/work#asking" },
      { title: "Weighing fertility benefits when you take a job", type: "Checklist", href: "/work#job-offers" },
    ],
  },
  {
    icon: <Map className="h-7 w-7" />,
    title: "Treatment & Clinics",
    resources: [
      { title: "IUI vs IVF vs donor eggs: which is right for you?", type: "Guide", slug: "iui-vs-ivf-vs-donor-eggs" },
      { title: "Questions to ask at your first consultation", type: "Checklist", slug: "consultation-questions" },
      { title: "Understanding HFEA success rates", type: "Explainer", slug: "understanding-hfea-success-rates" },
      { title: "How to choose a sperm donor", type: "Guide", slug: "how-to-choose-a-sperm-donor" },
    ],
  },
  {
    icon: <Heart className="h-7 w-7" />,
    title: "Emotional Wellbeing",
    resources: [
      { title: "Managing the two-week wait", type: "Guide", slug: "two-week-wait" },
      { title: "When treatment doesn't work: what next?", type: "Guide", slug: "when-treatment-fails" },
      { title: "Finding a fertility-aware therapist", type: "Directory", slug: "finding-fertility-therapist" },
      { title: "Telling friends and family about your journey", type: "Guide", slug: "telling-friends-family" },
    ],
  },
  {
    icon: <FileText className="h-7 w-7" />,
    title: "Legal & Admin",
    resources: [
      { title: "Donor conception and legal parenthood explained", type: "Explainer", slug: "donor-conception-legal-parenthood" },
      { title: "What the HFEA register means for your child", type: "Guide", slug: "hfea-register" },
      { title: "Known donors: legal agreements you need", type: "Guide", slug: "known-donor-legal-agreements" },
      { title: "Maternity leave as a self-employed parent", type: "Guide", slug: "self-employed-maternity-leave" },
    ],
  },
  {
    icon: <Baby className="h-7 w-7" />,
    title: "Pregnancy & Beyond",
    resources: [
      { title: "Pregnancy: building your support team", type: "Guide", slug: "solo-pregnancy-support-team" },
      { title: "Birth partner options", type: "Guide", slug: "birth-partner-options" },
      { title: "Talking to your child about donor conception", type: "Guide", slug: "talking-to-child-donor-conception" },
      { title: "Childcare planning: a parent's guide", type: "Guide", slug: "childcare-planning" },
    ],
  },
  {
    icon: <Compass className="h-7 w-7" />,
    title: "Faith, Culture & Belief",
    resources: [
      { title: "Where the major traditions stand on IVF", type: "Explainer", href: "/faith#traditions" },
      { title: "Handling conversations that are anti-IVF", type: "Scripts", href: "/faith#conversations" },
      { title: "Keeping your practice through a treatment cycle", type: "Guide", href: "/faith#observance" },
      { title: "Faith-aware counselling and support", type: "Directory", href: "/faith#support" },
    ],
  },
  {
    icon: <BookOpen className="h-7 w-7" />,
    title: "Community & Stories",
    resources: [
      { title: "Real stories: families share their journeys", type: "Stories", slug: "real-stories" },
      { title: "Recommended books for every family type", type: "Reading list", slug: "recommended-books" },
      { title: "Online communities worth joining", type: "Directory", slug: "online-communities" },
      { title: "UK support groups: in-person and online", type: "Directory", slug: "uk-support-groups" },
    ],
  },
];

const TOTAL_RESOURCES = CATEGORIES.reduce((sum, c) => sum + c.resources.length, 0);

// Same display order as /families: Solo Mums, Solo Dads, Two Mums, Two Dads, Mum and Dad.
const FAMILY_DISPLAY_ORDER = ["solo-mum", "single-dad", "same-sex-female", "same-sex-male", "heterosexual-couple"];

function orderedFamilies(): FamilyType[] {
  return FAMILY_DISPLAY_ORDER.map((slug) => FAMILY_TYPES.find((f) => f.slug === slug)!).filter(Boolean);
}

/**
 * A category icon, drawn straight onto the band in brand teal.
 *
 * No tile behind it: a filled container turns a 20px glyph into a 44px block
 * of colour, which then competes with the card's own heading for the eye. The
 * stroke weight carries it on its own at this size.
 */
function CategoryIcon({ children }: { children: React.ReactNode }) {
  return <span className="shrink-0 text-teal">{children}</span>;
}

export default function ResourcesPage() {
  const families = orderedFamilies();

  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <section className="border-b border-border px-6 md:px-12 lg:px-16">
        <div className="mx-auto">
          <SiteNav />
        </div>
      </section>

      {/* Header — one oversized egg mark bleeding off the band edge */}
      <Section band={0} padding="pt-16 pb-14 md:pt-24 md:pb-18" backdrop={{ shape: "egg" }}>
        <span className="inline-block text-[11px] font-[700] uppercase tracking-[0.16em] font-sans rounded-full px-3 py-1 mb-5 bg-accent text-on-accent">
          The library
        </span>
        <h1
          className="font-sans font-bold text-foreground mb-4"
          style={{ fontSize: "clamp(2.75rem, 5vw, 5.5rem)", lineHeight: 1.05 }}
        >
          Resources
        </h1>
        <p className="text-lg font-sans text-muted leading-relaxed mb-6" style={{ maxWidth: "52ch" }}>
          Guides, checklists, templates, and explainers for solo mums, solo dads, two mums, two dads, and couples going through fertility treatment.
        </p>
        <p className="text-sm font-sans font-medium text-teal">
          {TOTAL_RESOURCES} free resources · {CATEGORIES.length} topics · No sign-up needed
        </p>
      </Section>

      {/* Start here — the two things most people arrive needing */}
      <Section band={1} padding="py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          {/* Funding — the question that gates every other decision */}
          <div className="flex flex-col rounded-2xl bg-cream p-7 md:p-8">
            <div className="flex items-center gap-4 mb-5">
              <CategoryIcon>
                <Calculator className="h-7 w-7" />
              </CategoryIcon>
              <p className="text-[12px] font-[600] uppercase tracking-[0.12em] text-muted font-sans">
                Start here if cost is the question
              </p>
            </div>
            <h2 className="font-sans font-bold text-foreground text-2xl mb-2">
              Funding &amp; payment options
            </h2>
            <p className="text-sm font-sans text-muted leading-relaxed mb-7" style={{ maxWidth: "52ch" }}>
              What is free on the NHS and how to qualify, an eligibility self-check, and every route people use to pay for the rest — employer benefits, egg sharing, multi-cycle and refund programmes, insurance-backed plans, grants and 0% clinic finance.
            </p>
            <Link
              href="/funding"
              className="mt-auto inline-flex items-center gap-2 self-start rounded-full bg-accent text-on-accent px-6 py-3 text-sm font-sans font-[600] hover:bg-accent-dark transition-colors"
            >
              See funding options
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* DCN — the essential external resource for every family type */}
          <div className="flex flex-col rounded-2xl bg-cream p-7 md:p-8">
            <div className="flex items-center gap-4 mb-5">
              <CategoryIcon>
                <Heart className="h-7 w-7" />
              </CategoryIcon>
              <p className="text-[12px] font-[600] uppercase tracking-[0.12em] text-muted font-sans">
                Essential external resource · All family types
              </p>
            </div>
            <h2 className="font-sans font-bold text-foreground text-2xl mb-2">
              Donor Conception Network
            </h2>
            <p className="text-sm font-sans text-muted leading-relaxed mb-7" style={{ maxWidth: "52ch" }}>
              The UK&apos;s leading support charity for donor-conceived families. Books, workshops, peer support, and guidance on talking to children about their conception. Relevant to solo parents, same-sex couples, and heterosexual couples alike.
            </p>
            <a
              href="https://dcnetwork.org"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-2 self-start rounded-full border px-6 py-3 text-sm font-sans font-[600] text-teal hover:bg-surface-hover transition-colors"
              style={{ borderColor: "var(--teal-35)" }}
            >
              Visit dcnetwork.org
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </Section>

      {/* The library — every topic as a white card on the cream band */}
      <Section band={2} padding="py-16 md:py-24">
        <div className="flex flex-col gap-3 mb-10">
          <p className="text-[13px] font-[600] uppercase tracking-[2px] font-sans flex items-center gap-2 text-teal">
            <ShapeMark name="bloom" size={14} style={{ color: "var(--lavender)" }} />
            Browse by topic
          </p>
          <h2
            className="font-sans font-bold text-foreground"
            style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, letterSpacing: "-0.8px" }}
          >
            Everything, organised.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {CATEGORIES.map((cat) => (
            <div key={cat.title} className="flex flex-col rounded-2xl bg-background p-6 md:p-7">
              <div className="flex items-center gap-4 mb-3">
                <CategoryIcon>{cat.icon}</CategoryIcon>
                <div>
                  <h3 className="font-sans font-bold text-foreground text-lg leading-snug">{cat.title}</h3>
                  <p className="text-[13px] font-sans text-muted">
                    {cat.resources.length} resources
                  </p>
                </div>
              </div>
              <ul className="divide-y divide-border">
                {cat.resources.map((r) => (
                  <li key={r.title}>
                    <Link href={r.href ?? `/resources/${r.slug}`} className="flex items-center gap-3 group py-3">
                      <div className="flex-1">
                        <p className="text-sm font-sans text-foreground/75 leading-snug group-hover:text-foreground transition-colors duration-150">
                          {r.title}
                        </p>
                        <span className="text-[12px] font-[500] uppercase tracking-[0.1em] text-muted font-sans">
                          {r.type}
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-teal/40 group-hover:text-teal group-hover:translate-x-0.5 transition-all duration-150" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Browse by family type — shape-coded cards on the teal band */}
      <Section tone="teal" backdrop={{ shape: "dots", side: "left" }}>
        <div className="flex flex-col gap-3 mb-10">
          <span className="self-start inline-block text-[11px] font-[700] uppercase tracking-[0.16em] font-sans rounded-full px-3 py-1 bg-accent text-on-accent">
            Made for your family
          </span>
          <h2
            className="font-sans font-bold text-on-teal"
            style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, letterSpacing: "-0.8px" }}
          >
            Browse by family type.
          </h2>
          <p className="text-lg font-sans leading-relaxed text-on-teal-muted" style={{ maxWidth: "52ch" }}>
            Each family guide ends with a hand-picked reading list for that path — start there if you want only what applies to you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 items-stretch">
          {families.map((family) => (
            <Link
              key={family.slug}
              href={`/families/${family.slug}#resources`}
              className="group flex flex-col gap-4 rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1"
              style={{ background: "rgba(255,255,255,0.07)" }}
            >
              <ShapeMark
                name={FAMILY_SHAPES[family.slug]}
                size={28}
                className="transition-transform duration-300 group-hover:rotate-12"
                style={{ color: "var(--accent)" }}
              />
              <h3 className="font-sans font-semibold text-lg text-on-teal">{family.label}</h3>
              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-[600] font-sans text-on-teal-muted group-hover:text-on-teal transition-colors duration-150">
                View resources <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <CTASection />
    </main>
  );
}
