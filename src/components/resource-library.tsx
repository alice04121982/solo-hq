"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Briefcase, Calculator, Compass, Map, FileText, Heart, Baby } from "lucide-react";
import { GuideTypeBadge } from "./guide-type";
import { ShapeMark, type ShapeName } from "./shapes";

/**
 * The browsable library: every topic as a white card on the cream band, with
 * a format filter keyed to the shape bank. Formats with one entry are grouped
 * with their nearest sibling so the filter row stays scannable; each entry's
 * badge still shows its precise format.
 *
 * The category data lives here rather than in the page because the filter
 * needs client state, and lucide icon elements cannot cross the
 * server→client prop boundary.
 */

interface CategoryResource {
  title: string;
  type: string;
  /** Slug of a guide under /resources. Omit when `href` points elsewhere. */
  slug?: string;
  /** An absolute path, for entries that live outside the guide library. */
  href?: string;
}

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

export const RESOURCE_COUNT = CATEGORIES.reduce((sum, c) => sum + c.resources.length, 0);
export const TOPIC_COUNT = CATEGORIES.length;

/** Format filter groups — the shape bank as a legend over the entry types. */
const FORMAT_GROUPS: { key: string; label: string; mark: ShapeName; types: string[] }[] = [
  { key: "guide", label: "Guides", mark: "bloom", types: ["Guide"] },
  { key: "explainer", label: "Explainers", mark: "egg", types: ["Explainer"] },
  { key: "checklist", label: "Checklists", mark: "cross", types: ["Checklist"] },
  { key: "template", label: "Templates & scripts", mark: "pause", types: ["Template", "Script", "Scripts"] },
  { key: "directory", label: "Directories & lists", mark: "asterisk", types: ["Directory", "Reading list", "Hub"] },
  { key: "stories", label: "Stories", mark: "spark", types: ["Stories"] },
];

/** A category icon, drawn straight onto the card in brand teal. */
function CategoryIcon({ children }: { children: React.ReactNode }) {
  return <span className="shrink-0 text-teal">{children}</span>;
}

export function ResourceLibrary() {
  const [format, setFormat] = useState<string>("all");

  const activeTypes =
    format === "all" ? null : FORMAT_GROUPS.find((g) => g.key === format)?.types ?? null;

  const allEntries = CATEGORIES.flatMap((c) => c.resources);

  return (
    <div>
      {/* Format filter — the shape bank as a legend */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setFormat("all")}
          className={`rounded-full border text-xs font-sans px-4 py-2 transition-colors duration-150 ${
            format === "all"
              ? "border-teal bg-teal text-on-teal"
              : "border-teal/20 text-teal bg-background hover:border-teal/40"
          }`}
        >
          All formats
          <span className={`ml-1.5 ${format === "all" ? "opacity-70" : "text-muted"}`}>
            {allEntries.length}
          </span>
        </button>
        {FORMAT_GROUPS.map((g) => {
          const count = allEntries.filter((r) => g.types.includes(r.type)).length;
          if (count === 0) return null;
          const active = format === g.key;
          return (
            <button
              key={g.key}
              onClick={() => setFormat(active ? "all" : g.key)}
              className={`inline-flex items-center gap-2 rounded-full border text-xs font-sans px-4 py-2 transition-colors duration-150 ${
                active
                  ? "border-teal bg-teal text-on-teal"
                  : "border-teal/20 text-teal bg-background hover:border-teal/40"
              }`}
            >
              <ShapeMark
                name={g.mark}
                size={12}
                style={{ color: active ? "var(--accent)" : "var(--lavender)" }}
              />
              {g.label}
              <span className={active ? "opacity-70" : "text-muted"}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Topic cards — categories with no matching entries collapse away */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
        {CATEGORIES.map((cat) => {
          const visible = activeTypes
            ? cat.resources.filter((r) => activeTypes.includes(r.type))
            : cat.resources;
          if (visible.length === 0) return null;
          return (
            <div key={cat.title} className="flex flex-col rounded-2xl bg-background p-6 md:p-7">
              <div className="flex items-center gap-4 mb-3">
                <CategoryIcon>{cat.icon}</CategoryIcon>
                <div>
                  <h3 className="font-sans font-bold text-teal text-lg leading-snug">{cat.title}</h3>
                  <p className="text-[13px] font-sans text-muted">
                    {visible.length === cat.resources.length
                      ? `${cat.resources.length} resources`
                      : `${visible.length} of ${cat.resources.length} resources`}
                  </p>
                </div>
              </div>
              <ul className="divide-y divide-border">
                {visible.map((r) => (
                  <li key={r.title}>
                    <Link href={r.href ?? `/resources/${r.slug}`} className="flex items-center gap-3 group py-3">
                      <div className="flex-1">
                        <p className="text-sm font-sans text-teal/75 leading-snug group-hover:text-teal transition-colors duration-150">
                          {r.title}
                        </p>
                        <GuideTypeBadge type={r.type} />
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-teal/40 group-hover:text-teal group-hover:translate-x-0.5 transition-all duration-150" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
