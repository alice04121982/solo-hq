import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import {
  SUPPORT_LAST_CHECKED,
  SUPPORT_SECTIONS,
  type SupportLink,
} from "@/lib/support";

export const metadata: Metadata = {
  title: "Looking after yourself | CairnFertility",
  description:
    "UK crisis lines, fertility counselling, pregnancy loss support and donor conception support, with phone numbers checked against each organisation's own website.",
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
 * Support signposting: crisis lines, counselling, pregnancy loss, donor
 * conception, and treatment choices. Copy and sources live in
 * `src/lib/support.ts`; recheck every number there when SUPPORT_LAST_CHECKED
 * is bumped.
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
          intro="Where to get help during fertility treatment: crisis lines, counselling, and organisations for pregnancy loss and donor conception. All services listed are in the UK."
          introWidth="58ch"
          className="mb-0"
        />
        <p className="text-sm font-sans text-muted leading-relaxed mt-4" style={{ maxWidth: "58ch" }}>
          Numbers and details last checked on {SUPPORT_LAST_CHECKED}.
        </p>
      </Section>

      {SUPPORT_SECTIONS.map((section, i) => (
        <Section key={section.id} band={i + 1} id={section.id} padding="py-16 md:py-20">
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

          {section.items && (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.items.map((item) => (
                <li
                  key={item.name}
                  className="rounded-2xl border p-6"
                  style={{ borderColor: "var(--card-border)", background: "var(--card-bg)" }}
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
        </Section>
      ))}
    </main>
  );
}
