"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { StoryImage } from "@/components/story-image";
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
      <section className="border-b border-border px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <SiteNav />
        </div>
      </section>

      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-16 pb-10">
        <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
          Real journeys
        </p>
        <h1
          className="font-sans font-bold text-foreground mb-6"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
        >
          Personal stories
        </h1>
        <p className="text-[17px] font-sans text-muted leading-relaxed" style={{ maxWidth: "52ch" }}>
          Honest accounts from people who&apos;ve been through it — the real version, not the brochure.
        </p>
      </section>

      {/* Filter pills */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-10">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full border text-xs font-sans px-4 py-2 transition-colors duration-150 ${
              filter === "all"
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            All stories
          </button>
          {FAMILY_TYPES.map((f) => (
            <button
              key={f.slug}
              onClick={() => setFilter(f.slug)}
              className={`rounded-full border text-xs font-sans px-4 py-2 transition-colors duration-150 ${
                filter === f.slug
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
          <button
            onClick={() => setFilter("faith")}
            className={`rounded-full border text-xs font-sans px-4 py-2 transition-colors duration-150 ${
              filter === "faith"
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            Faith &amp; belief
          </button>
        </div>

        {filter === "faith" && (
          <p className="text-sm font-sans text-muted mt-5" style={{ maxWidth: "58ch" }}>
            More on religion, culture and belief — including where the major traditions
            stand and how to handle conversations that turn against you — is in{" "}
            <Link href="/faith" className="underline underline-offset-2 text-foreground">
              Faith &amp; Culture
            </Link>
            .
          </p>
        )}
      </section>

      {/* Story grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-20">
        {visible.length === 0 && (
          <p className="text-sm font-sans text-muted py-12 border-t border-border">
            No stories yet for this family type — check back soon.
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
                  label={story.tradition ?? story.familyLabel}
                  sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                  className="[filter:saturate(0.85)_sepia(0.06)]"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3 flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-[10px] font-[500] uppercase tracking-[0.12em] text-accent font-sans">
                    {story.familyLabel}
                  </span>
                  <span className="text-[10px] text-muted font-sans">·</span>
                  <span className="text-[10px] font-sans text-muted">{story.treatment}</span>
                  {story.tradition && (
                    <>
                      <span className="text-[10px] text-muted font-sans">·</span>
                      <span className="text-[10px] font-sans text-muted">{story.tradition}</span>
                    </>
                  )}
                </div>

                <h2 className="font-sans font-bold text-foreground text-xl leading-snug">
                  {story.title}
                </h2>

                <p className="text-sm font-sans text-muted leading-relaxed flex-1">
                  {story.excerpt}
                </p>

                <p className="text-[11px] font-[500] uppercase tracking-[0.12em] text-muted font-sans pt-3 border-t border-border">
                  {story.name}, {story.age} &nbsp;·&nbsp; {story.location}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
