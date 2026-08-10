import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { Section } from "@/components/section";
import { PageHeader } from "@/components/page-header";
import { ResourceLibrary } from "@/components/resource-library";
import { GuideTypeBadge } from "@/components/guide-type";
import { FAMILY_SHAPES, ShapeMark } from "@/components/shapes";
import { ArrowRight, Clock, ExternalLink } from "lucide-react";
import { FAMILY_TYPES } from "@/lib/family-types";
import { getGuideBySlug, GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Resources | Cairn Fertility",
  description: "Guides, tools, checklists, and templates for solo mums, solo dads, two mums, two dads, and couples going through fertility treatment.",
};

/**
 * The three pieces most people need first, each with a photograph — the rest
 * of the library stays shape-coded so the photos read as an invitation, not
 * wallpaper.
 */
const FEATURED = [
  {
    slug: "complete-solo-ivf-cost-breakdown",
    image: "/photos/family-coast.webp",
    imageAlt: "A family walking together along the coast",
  },
  {
    slug: "how-to-choose-a-sperm-donor",
    image: "/photos/family-sunset.webp",
    imageAlt: "A family silhouetted against the sunset",
  },
  {
    slug: "two-week-wait",
    image: "/photos/hands.webp",
    imageAlt: "An adult hand holding a small child's hand",
  },
];

export default function ResourcesPage() {
  const featured = FEATURED.map((f) => ({ ...f, guide: getGuideBySlug(f.slug)! })).filter(
    (f) => f.guide
  );

  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <section className="border-b border-border px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <SiteNav />
        </div>
      </section>

      {/* Header — the asterisk is the reference mark: the library's symbol */}
      <PageHeader
        mark="asterisk"
        eyebrow="Everything you need"
        title="Resources"
        lede={`${GUIDES.length} guides, checklists, templates, and explainers for solo mums, solo dads, two mums, two dads, and couples going through fertility treatment.`}
      />

      {/* Start here — the three most-needed pieces, with photography */}
      <Section band={1}>
        <div className="flex flex-col gap-3 mb-10">
          <p className="text-[11px] font-[600] uppercase tracking-[0.15em] text-teal font-sans flex items-center gap-2">
            <ShapeMark name="spark" size={14} style={{ color: "var(--lavender)" }} />
            Start here
          </p>
          <h2
            className="font-sans font-bold text-foreground"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}
          >
            The three most people read first.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {featured.map(({ slug, image, imageAlt, guide }) => (
            <Link
              key={slug}
              href={`/resources/${slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden border border-border bg-background transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(min-width: 768px) 360px, 100vw"
                  className="object-cover"
                  style={{ filter: "saturate(0.85) sepia(0.06)" }}
                />
              </div>
              <div className="flex flex-col flex-1 gap-3 p-5">
                <div className="flex items-center justify-between gap-3">
                  <GuideTypeBadge type={guide.type} />
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-sans text-muted">
                    <Clock className="h-3 w-3" />
                    {guide.readTime}
                  </span>
                </div>
                <h3 className="font-sans font-semibold text-lg leading-snug text-foreground">
                  {guide.title}
                </h3>
                <p className="text-sm font-sans text-muted leading-relaxed line-clamp-2">
                  {guide.intro}
                </p>
                <span className="mt-auto pt-2 inline-flex items-center gap-1.5 text-xs font-sans font-medium text-teal">
                  Read <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* The full library — filterable by format, every format shape-coded */}
      <Section band={2} backdrop={{ shape: "dots" }}>
        <div className="flex flex-col gap-3 mb-10">
          <p className="text-[11px] font-[600] uppercase tracking-[0.15em] text-teal font-sans flex items-center gap-2">
            <ShapeMark name="asterisk" size={14} style={{ color: "var(--lavender)" }} />
            The library
          </p>
          <h2
            className="font-sans font-bold text-foreground"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}
          >
            Browse every guide.
          </h2>
          <p className="text-sm font-sans text-muted" style={{ maxWidth: "60ch" }}>
            Each format has its own mark: guides to read, checklists to work through,
            templates and scripts to take away, directories that point you onwards.
          </p>
        </div>
        <ResourceLibrary />
      </Section>

      {/* Ways onwards: the essential external resource, then the family pathways */}
      <Section band={3}>
        <div className="mb-14 rounded-2xl border border-border p-6 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="flex-1">
            <p className="text-[10px] font-[600] uppercase tracking-[0.12em] text-muted mb-2 font-sans">
              Essential external resource · All family types
            </p>
            <p className="font-sans font-semibold text-foreground text-base mb-1">
              Donor Conception Network
            </p>
            <p className="text-sm font-sans text-muted leading-relaxed" style={{ maxWidth: "52ch" }}>
              The UK&apos;s leading support charity for donor-conceived families. Books, workshops, peer support, and guidance on talking to children about their conception. Relevant to solo parents, same-sex couples, and heterosexual couples alike.
            </p>
          </div>
          <a
            href="https://dcnetwork.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 shrink-0 rounded-full border border-[var(--teal-20)] text-teal px-5 py-2.5 text-sm font-sans font-medium hover:bg-teal hover:text-white transition-colors"
          >
            Visit dcnetwork.org
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Browse by family type — each pathway wears its own mark */}
        <div>
          <p className="text-[11px] font-[600] uppercase tracking-[0.15em] text-muted mb-5 font-sans">
            Browse by family type
          </p>
          <div className="flex flex-wrap gap-2">
            {FAMILY_TYPES.map((f) => (
              <Link
                key={f.slug}
                href={`/families/${f.slug}#resources`}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--teal-20)] px-4 py-2 text-sm font-sans text-teal hover:bg-teal hover:text-white transition-colors"
              >
                <ShapeMark
                  name={FAMILY_SHAPES[f.slug]}
                  size={12}
                  style={{ color: "var(--lavender)" }}
                />
                {f.label}
                <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <CTASection />
    </main>
  );
}
