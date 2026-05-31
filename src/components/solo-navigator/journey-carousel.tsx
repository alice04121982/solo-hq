"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { JOURNEY_STAGES } from "@/lib/journey-stages";

export function JourneyCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    const card = firstCardRef.current;
    if (!track || !card) return;
    const gap = 24; // matches gap-6
    track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  }

  return (
    <div className="relative">
      {/* Scroll track */}
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto pb-2"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          /* Hide scrollbar cross-browser */
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Inline style to hide webkit scrollbar */}
        <style>{`.journey-track::-webkit-scrollbar { display: none; }`}</style>

        {JOURNEY_STAGES.map((stage, i) => (
          <div
            key={stage.id}
            ref={i === 0 ? firstCardRef : undefined}
            style={{ scrollSnapAlign: "start", flexShrink: 0 }}
            /* Mobile: 85vw — peek of next; sm: 2 per row; lg: 4 per row */
            className="w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] bg-white border border-border rounded-3xl p-7 flex flex-col"
          >
            {/* Eyebrow */}
            <p
              className="text-[10px] font-[600] uppercase tracking-[0.2em] font-sans mb-5"
              style={{ color: "var(--primary)" }}
            >
              {stage.eyebrow}
            </p>

            {/* Stage number + title */}
            <div className="mb-4">
              <h2
                className="font-serif font-semibold text-foreground leading-tight mb-1.5"
                style={{ fontSize: "clamp(1.25rem, 1.8vw, 1.5rem)" }}
              >
                {stage.title}
              </h2>
              <p className="text-[14px] font-sans text-muted italic">
                &ldquo;{stage.subtitle}&rdquo;
              </p>
            </div>

            {/* Description */}
            <p className="text-[14px] font-sans text-muted leading-relaxed mb-6">
              {stage.description}
            </p>

            {/* Topics */}
            <ul className="space-y-2.5 list-none mb-8 flex-1">
              {stage.topics.map((topic) => (
                <li key={topic} className="flex items-start gap-2.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full shrink-0 mt-[0.55em]"
                    style={{ background: "var(--accent)" }}
                    aria-hidden="true"
                  />
                  <span className="text-[13px] font-sans text-muted leading-relaxed">
                    {topic}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href={`/solo-navigator/accordion#${stage.id}`}
              className="inline-flex items-center gap-1.5 text-[13px] font-sans font-semibold transition-colors duration-150 mt-auto"
              style={{ color: "var(--primary)" }}
            >
              {stage.ctaLabel}
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        ))}

        {/* Right padding sentinel */}
        <div className="shrink-0 w-1 lg:w-6" aria-hidden="true" />
      </div>

      {/* Prev / Next controls — bottom right, matching reference style */}
      <div className="flex items-center justify-end gap-3 mt-8 px-6 md:px-12 lg:px-20">
        <button
          onClick={() => scrollByCard(-1)}
          disabled={!canScrollLeft}
          aria-label="Previous stages"
          className="h-11 w-11 rounded-full border border-border flex items-center justify-center transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            background: canScrollLeft ? "var(--foreground)" : "transparent",
            color: canScrollLeft ? "var(--background)" : "var(--muted)",
            borderColor: canScrollLeft ? "var(--foreground)" : "var(--border)",
          }}
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => scrollByCard(1)}
          disabled={!canScrollRight}
          aria-label="Next stages"
          className="h-11 w-11 rounded-full flex items-center justify-center transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            background: canScrollRight ? "var(--foreground)" : "transparent",
            color: canScrollRight ? "var(--background)" : "var(--muted)",
            border: `1px solid ${canScrollRight ? "var(--foreground)" : "var(--border)"}`,
          }}
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
