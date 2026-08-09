import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/article-layout";
import { QuoteCard } from "@/components/quote-card";
import { ALL_STORIES } from "@/lib/stories";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return ALL_STORIES.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const story = ALL_STORIES.find((s) => s.id === id);
  if (!story) return { title: "Story not found — CairnFertility" };

  return {
    title: `${story.title} — CairnFertility`,
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

  return (
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
      <div className="space-y-6">
        {story.body.split("\n\n").map((para, i) => (
          <p
            key={i}
            className="text-[17px] font-sans leading-[1.75]"
            style={{ color: "var(--foreground)" }}
          >
            {para}
          </p>
        ))}
      </div>

      {/* Treatment summary */}
      <dl
        className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 rounded-2xl p-6"
        style={{ background: "var(--cream)" }}
      >
        {[
          { k: "Family type", v: story.familyLabel },
          { k: "Treatment", v: story.treatment },
          { k: "Location", v: story.location },
        ].map(({ k, v }) => (
          <div key={k}>
            <dt
              className="text-[11px] font-[600] uppercase tracking-[0.12em] font-sans mb-1"
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
            className="font-sans font-semibold text-lg leading-7 mb-5"
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
                  meta={[r.familyLabel]}
                  avatar={r.image}
                  tone="pink"
                  action="Read the story →"
                />
              </Link>
            ))}
          </div>
        </section>
      )}
    </ArticleLayout>
  );
}
