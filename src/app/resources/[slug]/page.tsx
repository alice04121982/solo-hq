import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Download, Tag } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
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
  if (!guide) return { title: "Not found | Cairn Fertility" };
  return {
    title: `${guide.title} | Cairn Fertility`,
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
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background border border-border px-3 py-1 text-[13px] font-[500] uppercase tracking-[0.1em] text-muted font-sans">
              <Tag className="h-3 w-3" />
              {guide.type}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[13px] font-[500] uppercase tracking-[0.1em] text-muted font-sans">
              <Clock className="h-3 w-3" />
              {guide.readTime}
            </span>
          </div>

          <h1
            className="font-sans font-bold text-foreground mb-5"
            style={{ fontSize: "clamp(2.5rem, 4vw, 4.5rem)", lineHeight: 1.1 }}
          >
            {guide.title}
          </h1>

          <p className="text-lg font-sans text-muted leading-relaxed">
            {guide.intro}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">
        <div className="space-y-10">
          {guide.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-sans font-bold text-foreground mb-4" style={{ fontSize: "clamp(1.625rem, 2.5vw, 2.375rem)", lineHeight: 1.2 }}>
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
                <div className="mt-4 rounded-2xl bg-[#F0F8E8] border border-[#1A3A25]/15 p-5">
                  {section.calloutCopy && (
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <p className="text-[12px] font-[600] uppercase tracking-[0.12em] font-sans text-[#1A3A25]/50">
                        Sample email
                      </p>
                      <CopyButton text={section.callout} />
                    </div>
                  )}
                  <p className="text-[15px] font-sans text-[#1A3A25] leading-relaxed font-[500]">
                    {section.callout}
                  </p>
                  {section.calloutDownload && (
                    <div className="mt-4 pt-4 border-t border-[#1A3A25]/10">
                      <a
                        href={section.calloutDownload}
                        download
                        className="inline-flex items-center gap-2 rounded-full bg-[#1A3A25] text-white px-5 py-2.5 text-sm font-sans font-medium hover:bg-[#142e1e] transition-colors"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download template
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Key takeaways */}
        {guide.keyTakeaways && guide.keyTakeaways.length > 0 && (
          <div className="mt-12 rounded-2xl bg-background-alt border border-border p-6 md:p-8">
            <h2 className="font-sans font-bold text-foreground text-xl mb-5">Key takeaways</h2>
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
