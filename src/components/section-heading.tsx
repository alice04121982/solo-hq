import type { ReactNode } from "react";
import { ShapeMark, type ShapeName } from "./shapes";

/**
 * The band header — eyebrow, heading, standfirst — in the two colour
 * treatments the site uses, so every band on every page opens the same way.
 *
 * `light` is the "Every family / Find your guide." treatment on the salmon
 * band: a pink shape mark, a teal eyebrow, and the heading in teal. Teal
 * carries the heading on white bands too, so the two light tones read as one
 * family and only the surface changes beneath them.
 *
 * `teal` is the "The full picture, not the brochure version." treatment: a
 * lime pill for the eyebrow, the heading in pink, the standfirst in the
 * muted pink. Never `--foreground`/`--muted` on teal — they disappear.
 */
export type HeadingTone = "light" | "teal";

export interface SectionHeadingProps {
  /** Small uppercase label above the heading. */
  eyebrow?: string;
  /**
   * Mark shown before the eyebrow on light bands, in pink. Ignored on teal,
   * where the eyebrow is a lime pill and a mark would crowd it.
   */
  mark?: ShapeName;
  /** Extra classes on the mark — `shape-spin` and friends. */
  markClassName?: string;
  title: ReactNode;
  /** Standfirst under the heading. */
  intro?: ReactNode;
  tone?: HeadingTone;
  /** Trailing element on the heading row — a "see all" link. */
  action?: ReactNode;
  /** Bottom margin on the whole block. */
  className?: string;
  /** Width cap on the standfirst. Defaults to a comfortable measure. */
  introWidth?: string;
  /**
   * Heading level. `1` for a page's opening band — one per page — which also
   * takes the larger display size. Section headings stay at `2`.
   */
  level?: 1 | 2;
}

const HEADING_SIZE: Record<1 | 2, string> = {
  1: "clamp(2.75rem, 5vw, 5.5rem)",
  2: "clamp(2.5rem, 4vw, 4.25rem)",
};

export function SectionHeading({
  eyebrow,
  mark,
  markClassName,
  title,
  intro,
  tone = "light",
  action,
  className = "mb-10",
  introWidth = "62ch",
  level = 2,
}: SectionHeadingProps) {
  const onTeal = tone === "teal";
  const Title = level === 1 ? "h1" : "h2";

  const heading = (
    <div className="flex flex-col gap-3">
      {eyebrow &&
        (onTeal ? (
          <span
            className="inline-block w-fit text-[11px] font-[700] uppercase tracking-[0.16em] font-sans rounded-full px-3 py-1"
            style={{ background: "var(--accent)", color: "var(--on-accent)" }}
          >
            {eyebrow}
          </span>
        ) : (
          <p
            className="text-[13px] font-[600] uppercase tracking-[2px] font-sans flex items-center gap-2"
            style={{ color: "var(--teal)" }}
          >
            {mark && (
              <ShapeMark
                name={mark}
                size={14}
                className={markClassName}
                style={{ color: "var(--lavender)" }}
              />
            )}
            {eyebrow}
          </p>
        ))}

      <Title
        className="font-sans font-bold"
        style={{
          fontSize: HEADING_SIZE[level],
          lineHeight: level === 1 ? 1.05 : 1.1,
          letterSpacing: "-0.8px",
          color: onTeal ? "var(--on-teal)" : "var(--teal)",
        }}
      >
        {title}
      </Title>

      {intro && (
        <p
          className="text-lg font-sans leading-relaxed mt-2"
          style={{
            color: onTeal ? "var(--on-teal-muted)" : "var(--muted)",
            maxWidth: introWidth,
          }}
        >
          {intro}
        </p>
      )}
    </div>
  );

  if (!action) return <div className={className}>{heading}</div>;

  return (
    <div className={`flex items-end justify-between gap-8 ${className}`}>
      {heading}
      {action}
    </div>
  );
}
