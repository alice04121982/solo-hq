"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { StoryImage } from "./story-image";
import type { Story } from "@/lib/stories";

/**
 * The homepage stories rail: a scroll-snap track showing three cards at a
 * time on desktop (one on mobile), stepped by the arrow buttons or dragged
 * directly. A carousel rather than a grid so the row can hold a story for
 * every family type without the section growing three rows tall.
 */
export function StoriesCarousel({ stories }: { stories: Story[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 8);
    setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 8);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows]);

  const step = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-story-card]");
    const gap = 24;
    track.scrollBy({
      left: direction * ((card?.offsetWidth ?? track.clientWidth / 3) + gap),
      behavior: "smooth",
    });
  };

  const arrowStyle = (enabled: boolean) => ({
    borderColor: "rgba(0, 83, 83, 0.3)",
    color: "var(--teal)",
    opacity: enabled ? 1 : 0.3,
  });

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={updateArrows}
        className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {stories.map((story) => (
          <Link
            key={story.id}
            data-story-card
            href={`/stories/${story.id}`}
            className="group flex-none w-[85vw] sm:w-[440px] lg:w-[calc((100%-3rem)/3)] snap-start flex flex-col rounded-2xl overflow-hidden border transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
            style={{ borderColor: "var(--border)", background: "#FFFFFF" }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <StoryImage
                src={story.image}
                alt={story.imageAlt}
                label={story.tradition ?? story.familyLabel}
                sizes="(min-width: 1024px) 560px, (min-width: 640px) 440px, 85vw"
              />
            </div>

            <div className="flex flex-col flex-1 gap-3 p-6">
              <h3 className="font-sans font-semibold text-xl" style={{ color: "var(--teal)" }}>
                {story.title}
              </h3>
              <p className="text-base font-sans" style={{ color: "var(--muted)" }}>
                {story.excerpt}
              </p>

              <span
                className="mt-auto pt-3 self-start text-sm font-sans font-medium"
                style={{ color: "var(--teal)" }}
              >
                <span className="rounded-full px-3.5 py-1.5" style={{ background: "var(--cream)" }}>
                  {story.tag}
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Stepper, under the track so it never fights the header's link. */}
      <div className="hidden md:flex items-center justify-end gap-3 mt-8">
        <button
          onClick={() => step(-1)}
          disabled={!canPrev}
          aria-label="Previous stories"
          className="inline-flex items-center justify-center h-12 w-12 rounded-full border transition-opacity duration-150"
          style={arrowStyle(canPrev)}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => step(1)}
          disabled={!canNext}
          aria-label="Next stories"
          className="inline-flex items-center justify-center h-12 w-12 rounded-full border transition-opacity duration-150"
          style={arrowStyle(canNext)}
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
