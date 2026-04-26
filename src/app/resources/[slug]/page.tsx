import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { getGuideBySlug, GUIDES } from "@/lib/guides";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Not found | Flying Solo" };
  return {
    title: `${guide.title} | Flying Solo`,
    description: guide.intro.slice(0, 155),
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <section className="border-b border-border px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <SiteNav />
        </div>
      </section>

      {/* Header */}
      <section className="bg-background-alt border-b border-border">
        <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-xs font-[500] uppercase tracking-[0.12em] text-muted hover:text-foreground transition-colors mb-8 font-sans"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All resources
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background border border-border px-3 py-1 text-[11px] font-[500] uppercase tracking-[0.1em] text-muted font-sans">
              <Tag className="h-3 w-3" />
              {guide.type}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-[500] uppercase tracking-[0.1em] text-muted font-sans">
              <Clock className="h-3 w-3" />
              {guide.readTime}
            </span>
          </div>

          <h1
            className="font-serif font-normal text-foreground mb-5"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.1 }}
          >
            {guide.title}
          </h1>

          <p className="text-[17px] font-sans text-muted leading-relaxed">
            {guide.intro}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <div className="space-y-10">
          {guide.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-serif font-normal text-foreground mb-4" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", lineHeight: 1.2 }}>
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
                <div className="mt-4 rounded-2xl bg-background-alt border border-border p-5">
                  <p className="text-[15px] font-sans text-foreground leading-relaxed font-[500]">
                    {section.callout}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Key takeaways */}
        {guide.keyTakeaways && guide.keyTakeaways.length > 0 && (
          <div className="mt-12 rounded-2xl bg-background-alt border border-border p-6 md:p-8">
            <h2 className="font-serif font-normal text-foreground text-xl mb-5">Key takeaways</h2>
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
