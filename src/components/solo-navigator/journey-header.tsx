"use client";

import { usePathname } from "next/navigation";

export function JourneyHeader() {
  const pathname = usePathname();
  const isCarousel = pathname?.includes("/carousel");
  const isAccordion = pathname?.includes("/accordion");

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-10 md:pb-14">
      {/* Eyebrow */}
      <p className="text-[11px] font-[500] uppercase tracking-[0.2em] text-muted font-sans mb-5">
        Solo Navigator
      </p>

      {/* Heading + subhead + switcher row */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
        <div>
          <h1
            className="font-serif font-semibold text-foreground mb-4"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.015em",
              maxWidth: "22ch",
            }}
          >
            Where are you on{" "}
            <em style={{ fontStyle: "italic", color: "var(--primary)" }}>
              your journey?
            </em>
          </h1>
          <p
            className="text-[17px] font-sans text-muted leading-relaxed"
            style={{ maxWidth: "52ch" }}
          >
            From &ldquo;am I really doing this?&rdquo; to thriving as a solo
            family — seven stages, honest information, and a community who
            understands at every step.
          </p>
        </div>

        {/* Variant switcher — visible only during prototyping */}
        <div className="shrink-0">
          <p className="text-[10px] font-[500] uppercase tracking-[0.18em] text-muted font-sans mb-2.5">
            View as
          </p>
          <div className="inline-flex rounded-full border border-border bg-background overflow-hidden">
            <a
              href="/solo-navigator/carousel"
              className={`px-5 py-2 text-[13px] font-sans font-medium transition-colors duration-150 ${
                isCarousel
                  ? "bg-foreground text-background"
                  : "text-muted hover:text-foreground"
              }`}
            >
              Carousel
            </a>
            <a
              href="/solo-navigator/accordion"
              className={`px-5 py-2 text-[13px] font-sans font-medium transition-colors duration-150 ${
                isAccordion
                  ? "bg-foreground text-background"
                  : "text-muted hover:text-foreground"
              }`}
            >
              Accordion
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
