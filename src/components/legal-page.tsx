import type { ReactNode } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { Section } from "@/components/section";
import {
  LEGAL_PAGES,
  LEGAL_PAGE_ORDER,
  type LegalPage,
  type LegalSection,
} from "@/lib/legal";

/**
 * Renders the minimal markdown-style links used in `src/lib/legal.ts` copy:
 * `[text](href)`. Internal paths use next/link; mailto and external URLs
 * render as plain anchors. Everything else in the copy is plain text by
 * design — legal pages should not need richer markup than this.
 */
function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) parts.push(text.slice(cursor, match.index));
    const [, label, href] = match;
    const linkClass =
      "text-teal underline decoration-teal/35 underline-offset-2 hover:decoration-teal transition-colors duration-150";
    if (href.startsWith("/")) {
      parts.push(
        <Link key={`${href}-${match.index}`} href={href} className={linkClass}>
          {label}
        </Link>
      );
    } else {
      const external = !href.startsWith("mailto:");
      parts.push(
        <a
          key={`${href}-${match.index}`}
          href={href}
          className={linkClass}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {label}
        </a>
      );
    }
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <>
      {items.map((p) => (
        <p
          key={p.slice(0, 48)}
          className="text-[16px] font-sans text-foreground/70 leading-relaxed mb-3"
        >
          {renderInline(p)}
        </p>
      ))}
    </>
  );
}

function LegalSectionBlock({ section }: { section: LegalSection }) {
  return (
    <div>
      <h2
        className="font-sans font-bold text-foreground mb-4"
        style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", lineHeight: 1.2 }}
      >
        {section.heading}
      </h2>

      {section.body && <Paragraphs items={section.body} />}

      {section.bullets && (
        <ul className="mt-3 mb-3 space-y-2 border-l-2 border-border pl-5">
          {section.bullets.map((b) => (
            <li
              key={b.slice(0, 48)}
              className="text-[15px] font-sans text-foreground/70 leading-relaxed"
            >
              {renderInline(b)}
            </li>
          ))}
        </ul>
      )}

      {section.definitions && (
        <div className="mt-4 mb-3 space-y-4">
          {section.definitions.map((d) => (
            <div
              key={d.term}
              className="border-l-2 border-border pl-5"
            >
              <p className="text-[15px] font-sans font-[600] text-foreground mb-1">
                {d.term}
              </p>
              <p className="text-[15px] font-sans text-foreground/70 leading-relaxed">
                {renderInline(d.description)}
              </p>
            </div>
          ))}
        </div>
      )}

      {section.postBody && <Paragraphs items={section.postBody} />}

      {section.callout && (
        <div className="mt-5 rounded-2xl bg-background p-4 flex items-start gap-3">
          <AlertTriangle className="h-4 w-4 text-muted shrink-0 mt-0.5" aria-hidden />
          <p className="text-xs text-muted leading-relaxed">
            <strong className="text-teal-ink">Note:</strong>{" "}
            {renderInline(section.callout)}
          </p>
        </div>
      )}
    </div>
  );
}

export function LegalPageLayout({
  page,
  children,
}: {
  page: LegalPage;
  /** Optional extra content rendered after the sections (used by /contact). */
  children?: ReactNode;
}) {
  const siblings = LEGAL_PAGE_ORDER.filter((slug) => slug !== page.slug);

  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <section className="border-b border-border px-6 md:px-12 lg:px-16">
        <div className="mx-auto">
          <SiteNav />
        </div>
      </section>

      {/* Header */}
      <Section band={0} padding="pt-20 pb-16 md:pt-28 md:pb-20">
        <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
          Legal
        </p>
        <h1
          className="font-sans font-bold text-foreground mb-4"
          style={{ fontSize: "clamp(2.75rem, 5vw, 5.5rem)", lineHeight: 1.05 }}
        >
          {page.title}
        </h1>
        <p
          className="text-lg font-sans text-muted leading-relaxed mb-5"
          style={{ maxWidth: "56ch" }}
        >
          {page.standfirst}
        </p>
        <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-teal font-sans">
          Effective {page.effectiveDate}
        </p>
      </Section>

      {/* Document body — a single light background so it reads as one
          continuous piece, per the Section child-page convention. */}
      <section className="bg-background">
        <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">
          <div className="space-y-10">
            {page.sections.map((s) => (
              <LegalSectionBlock key={s.heading} section={s} />
            ))}
          </div>

          {children}

          {/* Cross-links to the rest of the legal set */}
          <div className="mt-14 pt-8 border-t border-border">
            <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
              Related pages
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {siblings.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/${slug}`}
                    className="text-sm font-sans text-foreground border-b border-foreground/30 pb-0.5 hover:border-teal hover:text-teal transition-colors duration-150"
                  >
                    {LEGAL_PAGES[slug].label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
