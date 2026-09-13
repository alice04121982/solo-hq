import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { Section, alternatingTone } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import {
  SUPPORT_LAST_CHECKED,
  SUPPORT_SECTIONS,
  type SupportLink,
} from "@/lib/support";

export const metadata: Metadata = {
  title: "Looking after yourself | CairnFertility",
  description:
    "UK crisis lines, the wait for a test result, failed cycles, miscarriage and loss, pausing or stopping, partners and family, work, money, counselling and peer support, with every number checked against the organisation's own website.",
};

const LINK_CLASS =
  "text-sm font-sans font-medium text-teal underline decoration-teal/35 underline-offset-4 hover:decoration-teal transition-colors";

function SupportLinkItem({ link }: { link: SupportLink }) {
  const external = link.href.startsWith("http");
  return (
    <a
      href={link.href}
      className={LINK_CLASS}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {link.label}
    </a>
  );
}

/**
 * The "Looking after yourself" section: ten anchored sections on one page,
 * crisis lines first. Copy and sources live in `src/lib/support.ts`; recheck
 * every number there when SUPPORT_LAST_CHECKED is bumped.
 */
export default function SupportPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <section className="border-b border-border px-6 md:px-12 lg:px-16">
        <div className="mx-auto">
          <SiteNav />
        </div>
      </section>

      {/* Header */}
      <Section band={0} padding="pt-20 pb-16" backdrop={{ shape: "bloom" }}>
        <SectionHeading
          level={1}
          eyebrow="Support"
          title="Looking after yourself"
          intro="Where to get help at each point in treatment: crisis lines, the wait for a result, a failed cycle, loss, deciding whether to carry on, the people around you, work, money, counselling and peer support. All services listed are in the UK."
          introWidth="58ch"
          className="mb-0"
        />
        <p className="text-sm font-sans text-muted leading-relaxed mt-4" style={{ maxWidth: "58ch" }}>
          Numbers and details last checked on {SUPPORT_LAST_CHECKED}.
        </p>

        {/* Jump links */}
        <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
          {SUPPORT_SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-teal/20 px-3.5 py-1.5 text-xs font-sans transition-colors hover:bg-[var(--teal)] hover:text-white hover:border-[var(--teal)]"
              style={{ color: "var(--teal)" }}
            >
              {section.title}
            </a>
          ))}
        </nav>
      </Section>

      {SUPPORT_SECTIONS.map((section, i) => {
        // Cards carry no border: they separate from the band by fill alone,
        // white on a cream band and cream on a white one. Never pink on cream.
        const cardFill =
          alternatingTone(i + 1) === "cream" ? "var(--background)" : "var(--cream)";
        return (
        <Section
          key={section.id}
          band={i + 1}
          id={section.id}
          padding="py-16 md:py-20"
          className="scroll-mt-20"
        >
          <SectionHeading title={section.title} intro={section.intro} className="mb-8" />

          {section.paragraphs?.map((p) => (
            <p
              key={p.slice(0, 48)}
              className="text-base font-sans text-foreground leading-relaxed mb-4"
              style={{ maxWidth: "62ch" }}
            >
              {p}
            </p>
          ))}

          {section.bullets && section.bullets.length > 0 && (
            <ul
              className="list-disc pl-5 mb-6 space-y-3 text-base font-sans text-foreground leading-relaxed"
              style={{ maxWidth: "62ch" }}
            >
              {section.bullets.map((b) => (
                <li key={b.slice(0, 48)}>{b}</li>
              ))}
            </ul>
          )}

          {section.items && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {section.items.map((item) => (
                <li
                  key={item.name}
                  className="rounded-2xl p-6"
                  style={{ background: cardFill }}
                >
                  <h3 className="font-sans font-bold text-[17px] leading-snug text-teal mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm font-sans text-foreground leading-relaxed">{item.body}</p>
                  {item.links && item.links.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                      {item.links.map((link) => (
                        <li key={link.href}>
                          <SupportLinkItem link={link} />
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}

          {section.links && section.links.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {section.links.map((link) => (
                <li key={link.href}>
                  <SupportLinkItem link={link} />
                </li>
              ))}
            </ul>
          )}

          {section.footnote && (
            <p className="text-sm font-sans text-muted leading-relaxed mt-6" style={{ maxWidth: "62ch" }}>
              {section.footnote}
            </p>
          )}
        </Section>
        );
      })}
    </main>
  );
}
