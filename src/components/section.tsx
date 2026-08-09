import type { ReactNode } from "react";
import { Dot, ShapeMark, type ShapeName } from "./shapes";

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
 * Colour for a backdrop shape sitting directly on each band tone. Always a
 * solid, opaque colour — flat shape-on-colour in the reference's style.
 * Translucent washes are out: overlapping shapes must never show through
 * each other.
 */
const TONE_BACKDROP_COLOR: Record<SectionTone, string> = {
  white: "var(--cream)",
  cream: "var(--lavender-light)",
  teal: "var(--accent)",
};

export interface SectionBackdrop {
  /**
   * A mark from the bank, or "dots" — the treatment for circles: a pair of
   * solid dots cropped by the band's edges, per the reference, rather than
   * one oversized circle.
   */
  shape: ShapeName | "dots";
  /** Which edge the shape bleeds off. Default "right". */
  side?: "left" | "right";
  /** Override the tone-derived colour. */
  color?: string;
}

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
  /**
   * One oversized shape from the bank, sitting on the band colour and
   * cropped by the section edge — background texture in the reference's
   * style, not content.
   */
  backdrop?: SectionBackdrop;
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
  backdrop,
  className,
  innerClassName,
  children,
}: SectionProps) {
  const resolved = tone ?? (band === undefined ? "white" : alternatingTone(band));

  return (
    <section
      id={id}
      className={[backdrop && "relative overflow-hidden", className].filter(Boolean).join(" ")}
      style={{ background: TONE_BACKGROUND[resolved] }}
    >
      {backdrop &&
        (backdrop.shape === "dots" ? (
          // The circle treatment: two solid dots, one cut by the top edge,
          // one cut by the bottom corner — never a translucent overlay.
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ color: backdrop.color ?? TONE_BACKDROP_COLOR[resolved] }}
          >
            <Dot
              className={[
                "absolute top-0 -translate-y-[55%] w-[10rem] md:w-[16rem] h-auto",
                backdrop.side === "left" ? "left-[8%]" : "right-[12%]",
              ].join(" ")}
            />
            <Dot
              className={[
                "absolute bottom-0 translate-y-[40%] w-[6rem] md:w-[10rem] h-auto",
                backdrop.side === "left"
                  ? "left-0 -translate-x-[40%]"
                  : "right-0 translate-x-[40%]",
              ].join(" ")}
            />
          </div>
        ) : (
          <ShapeMark
            name={backdrop.shape}
            className={[
              "absolute top-1/2 -translate-y-1/2 pointer-events-none",
              "w-[20rem] md:w-[32rem] lg:w-[40rem] h-auto",
              backdrop.side === "left"
                ? "left-0 -translate-x-[45%]"
                : "right-0 translate-x-[45%]",
            ].join(" ")}
            style={{ color: backdrop.color ?? TONE_BACKDROP_COLOR[resolved] }}
          />
        ))}
      <div
        className={[
          "relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20",
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
