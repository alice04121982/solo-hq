import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { Section } from "@/components/section";
import { ShareButtons } from "@/components/share-buttons";
import { FeaturedNews, NewsList } from "@/components/news/news-list";
import { NEWS_ITEMS, NEWS_PROVENANCE, formatNewsDate, newsInOrder } from "@/lib/news";

export const metadata: Metadata = {
  title: "In the media | CairnFertility",
  description:
    "Recent reporting on IVF worth your time: clinic safety and regulation, donor conception, NHS funding and the evidence behind treatment add-ons. Every link goes to the original publisher.",
};

/**
 * /news — a curated roundup of other people's journalism, not our own.
 *
 * Cairn has no newsroom, and a page of invented articles would be worse than
 * no page at all on a site whose whole claim is that its figures are sourced.
 * So this is a reading list: publisher's headline, our note on why it matters,
 * and a link straight out. The content lives in `src/lib/news.ts`; adding an
 * item is one entry in that array.
 */
export default function NewsPage() {
  const [featured, ...rest] = newsInOrder(NEWS_ITEMS);

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
          In the media
        </p>
        <h1
          className="font-sans font-bold text-foreground mb-4"
          style={{ fontSize: "clamp(2.75rem, 5vw, 5.5rem)", lineHeight: 1.05 }}
        >
          Worth reading.
        </h1>
        <p className="text-lg font-sans text-muted leading-relaxed mb-8" style={{ maxWidth: "56ch" }}>
          Reporting on fertility treatment from people who do it for a living, with a note on
          what each piece changes for someone choosing a clinic. We do not write the news, and
          we do not reprint it: every link here goes to the publisher who did the work.
        </p>
        <ShareButtons title="In the media — CairnFertility" />
      </Section>

      {/* Lead item */}
      {featured && (
        <Section band={1}>
          <FeaturedNews item={featured} />
        </Section>
      )}

      {/* The rest, filterable by topic */}
      <Section band={2}>
        <h2
          className="font-sans font-bold text-foreground mb-8"
          style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.1 }}
        >
          More coverage
        </h2>
        <NewsList items={rest} />
      </Section>

      {/* Housekeeping: how the list is kept, and how to get something onto it. */}
      <Section band={3} padding="py-16 md:py-20">
        <div className="rounded-[24px] border border-border bg-background p-6 md:p-8" style={{ maxWidth: "72ch" }}>
          <h2 className="font-sans font-semibold text-foreground text-lg mb-3">
            How this list is kept
          </h2>
          <p className="text-[15px] font-sans text-muted leading-relaxed mb-3">
            Items are chosen because they change something practical for people going through
            treatment: what a clinic is allowed to do, what the NHS will fund, what the evidence
            behind a paid extra actually says. Headlines are the publisher&rsquo;s, verbatim. The
            notes underneath are ours, and they never claim more than the piece they sit under.
            Last updated {formatNewsDate(NEWS_PROVENANCE.listUpdatedOn)}.
          </p>
          <p className="text-[15px] font-sans text-muted leading-relaxed">
            Seen something that belongs here, or one of your own? Send it to{" "}
            <a
              href={`mailto:${NEWS_PROVENANCE.submitEmail}`}
              className="font-medium text-teal hover:underline underline-offset-2"
            >
              {NEWS_PROVENANCE.submitEmail}
            </a>
            . Reporting that affects a clinic we list is also checked against{" "}
            <a
              href="/about#methodology"
              className="font-medium text-teal hover:underline underline-offset-2"
            >
              how we decide what goes in the finder
            </a>
            .
          </p>
        </div>
      </Section>

      <CTASection />
    </main>
  );
}
