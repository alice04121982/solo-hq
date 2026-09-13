import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Download, ExternalLink, Tag } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { getGuideBySlug, GUIDES } from "@/lib/guides";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * The words after the support link's colon, per anchor (contract C2: two to
 * four words). Only guides with a supportAnchor render the link.
 */
const SUPPORT_LINK_LABELS: Record<string, string> = {
  crisis: "help right now",
  waiting: "waiting for a result",
  "cycle-fails": "when a cycle fails",
  loss: "miscarriage and loss",
  stopping: "pausing or stopping treatment",
  relationships: "partner, family and friends",
  work: "work",
  money: "money worries",
  counselling: "counselling",
  "peer-support": "peer support",
};

const DISCLAIMER =
  "General information, not medical or financial advice. Your clinic and a regulated adviser can advise on your situation.";

/** Trims a description to `max` characters at a word boundary (G1-30). */
function trimDescription(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).replace(/[,;:]$/, "")}…`;
}

/** A stable id for a section heading, so other pages can deep-link to it. */
function headingId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Not found | CairnFertility" };
  return {
    title: `${guide.title} | CairnFertility`,
    description: trimDescription(guide.intro),
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const supportLabel = guide.supportAnchor ? SUPPORT_LINK_LABELS[guide.supportAnchor] : undefined;

  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <section className="border-b border-border px-6 md:px-12 lg:px-16">
        <div className="mx-auto">
          <SiteNav />
        </div>
      </section>

      {/* Header */}
      <section className="bg-background-alt border-b border-border">
        <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-xs font-[500] uppercase tracking-[0.12em] text-muted hover:text-foreground transition-colors mb-8 font-sans"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All resources
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background border border-teal/20 px-3 py-1 text-[13px] font-[500] uppercase tracking-[0.1em] text-muted font-sans">
              <Tag className="h-3 w-3" />
              {guide.type}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[13px] font-[500] uppercase tracking-[0.1em] text-muted font-sans">
              <Clock className="h-3 w-3" />
              {guide.readTime}
            </span>
          </div>

          <h1
            className="font-sans font-bold text-teal mb-5"
            style={{ fontSize: "clamp(2.5rem, 4vw, 4.5rem)", lineHeight: 1.1 }}
          >
            {guide.title}
          </h1>

          <p className="text-lg font-sans text-muted leading-relaxed">
            {guide.intro}
          </p>

          {guide.supportAnchor && supportLabel && (
            <p className="mt-4 text-[16px] font-sans text-muted leading-relaxed">
              <Link href={`/support#${guide.supportAnchor}`} className="font-[500] text-teal underline underline-offset-4 hover:text-foreground">Looking after yourself</Link>: {supportLabel}.
            </p>
          )}
        </div>
      </section>

      {/* Body */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">
        <div className="space-y-10">
          {guide.sections.map((section) => (
            <div key={section.heading} id={headingId(section.heading)} className="scroll-mt-24">
              <h2 className="font-sans font-bold text-teal mb-4" style={{ fontSize: "clamp(1.625rem, 2.5vw, 2.375rem)", lineHeight: 1.2 }}>
                {section.heading}
              </h2>

              {section.body.map((para, i) => (
                <p key={i} className="text-[16px] font-sans text-foreground/70 leading-relaxed mb-3">
                  {para}
                </p>
              ))}

              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-3 space-y-2 border-l-2 border-border pl-5">
                  {section.bullets.map((item, i) => (
                    <li key={i} className="text-[15px] font-sans text-foreground/70 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {section.postBody && section.postBody.map((para, i) => (
                <p key={i} className="text-[16px] font-sans text-foreground/70 leading-relaxed mt-3">
                  {para}
                </p>
              ))}

              {section.postBullets && section.postBullets.length > 0 && (
                <ul className="mt-3 space-y-2 border-l-2 border-border pl-5">
                  {section.postBullets.map((item, i) => (
                    <li key={i} className="text-[15px] font-sans text-foreground/70 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {section.numbered && section.numbered.length > 0 && (
                <ol className="mt-3 space-y-2 pl-5">
                  {section.numbered.map((item, i) => (
                    <li key={i} className="text-[15px] font-sans text-foreground/70 leading-relaxed list-decimal">
                      {item}
                    </li>
                  ))}
                </ol>
              )}

              {section.callout && (
                <div className="mt-4 rounded-2xl bg-surface-hover border border-teal/15 p-5">
                  <p className="text-[15px] font-sans text-teal leading-relaxed font-[500]">
                    {section.callout}
                  </p>
                  {section.calloutDownload && (
                    <div className="mt-4 pt-4 border-t border-teal/10">
                      <a
                        href={section.calloutDownload}
                        download
                        className="inline-flex items-center gap-2 rounded-full bg-teal text-on-teal px-5 py-2.5 text-sm font-sans font-medium hover:opacity-90 transition-colors"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download template
                      </a>
                    </div>
                  )}
                </div>
              )}

              {section.links && section.links.length > 0 && (
                <ul className="mt-4 space-y-1.5">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-1.5 text-[15px] font-sans font-[500] text-teal underline underline-offset-4 hover:text-foreground"
                      >
                        {link.label}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Key takeaways */}
        {guide.keyTakeaways && guide.keyTakeaways.length > 0 && (
          <div className="mt-12 rounded-2xl bg-cream p-6 md:p-8">
            <h2 className="font-sans font-bold text-teal text-xl mb-5">Key takeaways</h2>
            <ul className="space-y-3">
              {guide.keyTakeaways.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <p className="text-[15px] font-sans text-foreground/70 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Sources and review date */}
        <div className="mt-10">
          <h2 className="font-sans font-bold text-teal text-xl mb-4">Sources</h2>
          <ul className="space-y-2">
            {guide.sources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-1.5 text-[14px] font-sans text-foreground/70 underline underline-offset-4 hover:text-teal"
                >
                  <span>{source.label}</span>
                  <ExternalLink className="h-3 w-3 mt-1 shrink-0" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[13px] font-sans text-muted">Last reviewed {guide.lastReviewed}.</p>
          <p className="mt-1 text-[13px] font-sans text-muted">{DISCLAIMER}</p>
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-[500] text-muted hover:text-foreground transition-colors font-sans"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all resources
          </Link>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
