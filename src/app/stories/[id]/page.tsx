import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/article-layout";
import { QuoteCard } from "@/components/quote-card";
import { ResourcesSection } from "@/components/family/resources-section";
import { ALL_STORIES } from "@/lib/stories";
import { getFamilyType } from "@/lib/family-types";

/** Guides shown under a story with no specific family type. */
const GENERAL_RESOURCES = [
  "consultation-questions",
  "two-week-wait",
  "uk-support-groups",
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return ALL_STORIES.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const story = ALL_STORIES.find((s) => s.id === id);
  if (!story) return { title: "Story not found | CairnFertility" };

  return {
    title: `${story.title} | CairnFertility`,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      images: story.image ? [story.image] : undefined,
      type: "article",
    },
  };
}

export default async function StoryPage({ params }: PageProps) {
  const { id } = await params;
  const story = ALL_STORIES.find((s) => s.id === id);
  if (!story) notFound();

  // Same family type first, so the suggestions are relevant rather than random.
  const related = ALL_STORIES.filter((s) => s.id !== story.id)
    .sort((a, b) => Number(b.familyType === story.familyType) - Number(a.familyType === story.familyType))
    .slice(0, 2);

  // The same guide list the story's family-type page shows, so the reader
  // leaves the story with the practical next steps for that pathway.
  const resources =
    story.familyType === "all"
      ? GENERAL_RESOURCES
      : getFamilyType(story.familyType)?.resources ?? GENERAL_RESOURCES;

  return (
    <>
      <ArticleLayout
        eyebrow={story.tag}
      title={story.title}
      standfirst={story.excerpt}
      meta={[`${story.name}, ${story.age}`, story.location, story.treatment]}
      image={story.image}
      imageAlt={story.imageAlt}
      backHref="/stories"
      backLabel="All stories"
    >
      <p
        className="text-xs font-sans leading-relaxed mb-8 rounded-xl px-4 py-3"
        style={{ background: "var(--lime)", color: "var(--muted)" }}
      >
        This is an illustrative story, written to show what real accounts will look
        like here. It does not describe a real person. To share your own story,{" "}
        <Link href="/stories/share" className="underline underline-offset-2" style={{ color: "var(--foreground)" }}>
          use our story form
        </Link>{" "}
        or write to stories@cairnfertility.co.uk.
      </p>

      <div className="space-y-6">
        {story.body.split("\n\n").map((para, i) => (
          <p
            key={i}
            className="text-lg font-sans leading-[1.75]"
            style={{ color: "var(--foreground)" }}
          >
            {para}
          </p>
        ))}
      </div>

      {/* Treatment summary */}
      <dl
        className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 rounded-2xl p-6"
        style={{ background: "var(--lime)" }}
      >
        {[
          { k: "Family type", v: story.familyLabel },
          { k: "Treatment", v: story.treatment },
          { k: "Location", v: story.location },
        ].map(({ k, v }) => (
          <div key={k}>
            <dt
              className="text-[13px] font-[600] uppercase tracking-[0.12em] font-sans mb-1"
              style={{ color: "rgba(0, 83, 83, 0.6)" }}
            >
              {k}
            </dt>
            <dd className="text-sm font-sans font-medium" style={{ color: "var(--teal)" }}>
              {v}
            </dd>
          </div>
        ))}
      </dl>

      {related.length > 0 && (
        <section className="mt-14">
          <h2
            className="font-sans font-semibold text-xl mb-5"
            style={{ color: "var(--teal)" }}
          >
            More stories
          </h2>
          {/* Each card quotes that story in its own voice, with the
              contributor's own photograph as the avatar. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-stretch">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/stories/${r.id}`}
                className="group block h-full transition-transform duration-200 hover:-translate-y-1"
              >
                <QuoteCard
                  quote={r.quote}
                  name={r.name}
                  eyebrow={r.familyLabel}
                  meta={[r.location]}
                  avatar={r.image}
                  tone="pink"
                  action="Read →"
                />
              </Link>
            ))}
          </div>
        </section>
      )}
      </ArticleLayout>

      {/* The practical follow-on: the same guides this story's pathway page
          recommends, full-bleed after the article. */}
      <ResourcesSection resources={resources} />
    </>
  );
}
