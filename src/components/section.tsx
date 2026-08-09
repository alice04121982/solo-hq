import type { ReactNode } from "react";

/**
 * Full-bleed section bands.
 *
 * The homepage reads as a stack of bands, each taking a new background as a
 * new section is introduced, so the page parses as distinct chapters rather
 * than one undifferentiated scroll. Top-level pages carry the same rhythm by
 * numbering their bands; child pages (a family guide, a story, a resource)
 * stay on a single light background so the document they carry reads as one
 * continuous piece.
 *
 * The band is what carries the colour, so it must span the viewport — the
 * `max-w-7xl` gutter lives on the container inside it, never on the
 * `<section>` itself.
 */
export type SectionTone = "white" | "cream" | "teal";

const TONE_BACKGROUND: Record<SectionTone, string> = {
  white: "var(--background)",
  cream: "var(--cream)",
  teal: "var(--teal)",
};

/**
 * The tone for the nth band on a page, counting the hero as 0.
 *
 * Even bands are cream, so every page opens warm beneath the white nav and no
 * two neighbouring bands ever share a background.
 */
function alternatingTone(band: number): SectionTone {
  return band % 2 === 0 ? "cream" : "white";
}

interface SectionProps {
  /**
   * Position in the page's alternating rhythm, hero counted as 0. Renumbering
   * is all it takes to insert a band — the colours follow.
   */
  band?: number;
  /**
   * Fixed background, for bands that carry their own colour rather than
   * taking their turn in the rhythm — the homepage's teal comparison teaser.
   * Wins over `band`.
   */
  tone?: SectionTone;
  id?: string;
  /** Vertical rhythm, overridable for bands that need to sit tighter. */
  padding?: string;
  /** Extra classes on the full-bleed band. */
  className?: string;
  /** Extra classes on the centred container. */
  innerClassName?: string;
  children: ReactNode;
}

export function Section({
  band,
  tone,
  id,
  padding = "py-16 md:py-20",
  className,
  innerClassName,
  children,
}: SectionProps) {
  const resolved = tone ?? (band === undefined ? "white" : alternatingTone(band));

  return (
    <section id={id} className={className} style={{ background: TONE_BACKGROUND[resolved] }}>
      <div
        className={[
          "max-w-7xl mx-auto px-6 md:px-12 lg:px-20",
          padding,
          innerClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </div>
    </section>
  );
}
