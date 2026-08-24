"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { StoryImage } from "@/components/story-image";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { FAMILY_SHAPES, ShapeMark } from "@/components/shapes";
import { ALL_STORIES } from "@/lib/stories";
import { FAMILY_TYPES } from "@/lib/family-types";
import type { FamilyTypeSlug } from "@/lib/family-types";

/** "faith" is a theme rather than a family type, so it filters on its own axis. */
type Filter = "all" | "faith" | FamilyTypeSlug;

export default function StoriesPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible =
    filter === "all"
      ? ALL_STORIES
      : filter === "faith"
        ? ALL_STORIES.filter((s) => s.theme === "faith")
        : ALL_STORIES.filter((s) => s.familyType === filter);

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
          eyebrow="Stories"
          mark="spark"
          markClassName="shape-spin"
          title="Personal stories"
          intro="What the journey looks like at every stage, told the way people tell it."
          introWidth="52ch"
          className="mb-0"
        />
        <p className="text-sm font-sans text-muted leading-relaxed mt-4" style={{ maxWidth: "52ch" }}>
          These are illustrative stories while we collect real, consented accounts to
          replace them. If you would like to share yours,{" "}
          <Link href="/stories/share" className="underline underline-offset-2 text-foreground">
            share your story here
          </Link>{" "}
          or write to stories@cairnfertility.co.uk.
        </p>
      </Section>

      {/* Filters and the grid they drive share a band — they're one control */}
      <Section band={1} padding="py-16 md:py-24">
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full border text-xs font-sans px-4 py-2 transition-colors duration-150 ${
              filter === "all"
                ? "border-teal bg-teal text-on-teal"
                : "border-border text-muted hover:border-teal/40 hover:text-teal"
            }`}
          >
            All stories
          </button>
          {FAMILY_TYPES.map((f) => (
            <button
              key={f.slug}
              onClick={() => setFilter(f.slug)}
              className={`inline-flex items-center gap-2 rounded-full border text-xs font-sans px-4 py-2 transition-colors duration-150 ${
                filter === f.slug
                  ? "border-teal bg-teal text-on-teal"
                  : "border-border text-muted hover:border-teal/40 hover:text-teal"
              }`}
            >
              {/* Each family filter wears the pathway's mark from FAMILY_SHAPES */}
              <ShapeMark name={FAMILY_SHAPES[f.slug]} size={12} style={{ color: "var(--lavender)" }} />
              {f.label}
            </button>
          ))}
          <button
            onClick={() => setFilter("faith")}
            className={`rounded-full border text-xs font-sans px-4 py-2 transition-colors duration-150 ${
              filter === "faith"
                ? "border-teal bg-teal text-on-teal"
                : "border-border text-muted hover:border-teal/40 hover:text-teal"
            }`}
          >
            Faith &amp; belief
          </button>
        </div>

        {filter === "faith" && (
          <p className="text-sm font-sans text-muted -mt-5 mb-10" style={{ maxWidth: "58ch" }}>
            More on religion, culture and belief — including where the major traditions
            stand and how to handle conversations that turn against you — is in{" "}
            <Link href="/faith" className="underline underline-offset-2 text-foreground">
              Faith &amp; Culture
            </Link>
            .
          </p>
        )}

        {visible.length === 0 && (
          <p className="text-sm font-sans text-muted py-12 border-t border-border">
            No stories yet for this family type. Check back soon.
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {visible.map((story) => (
            <Link
              key={story.id}
              href={`/stories/${story.id}`}
              className="group flex flex-col gap-4 transition-transform duration-200 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-56 rounded-xl overflow-hidden bg-background-alt">
                <StoryImage
                  src={story.image}
                  alt={story.imageAlt}
                  label={story.theme === "faith" ? "Faith & Culture" : story.familyLabel}
                  sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                  className="[filter:saturate(0.85)_sepia(0.06)]"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3 flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-[12px] font-[500] uppercase tracking-[0.12em] text-teal font-sans">
                    {story.familyLabel}
                  </span>
                  <span className="text-[12px] text-muted font-sans">·</span>
                  <span className="text-[12px] font-sans text-muted">{story.treatment}</span>
                  {story.theme === "faith" && (
                    <>
                      <span className="text-[12px] text-muted font-sans">·</span>
                      <span className="text-[12px] font-sans text-muted">Faith &amp; Culture</span>
                    </>
                  )}
                </div>

                <h2 className="font-sans font-bold text-teal text-xl leading-snug">
                  {story.title}
                </h2>

                <p className="text-sm font-sans text-muted leading-relaxed flex-1">
                  {story.excerpt}
                </p>

                <p className="text-[13px] font-[500] uppercase tracking-[0.12em] text-muted font-sans pt-3 border-t border-border">
                  {story.name}, {story.age} &nbsp;·&nbsp; {story.location}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </main>
  );
}
