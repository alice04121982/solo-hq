import Image from "next/image";

/**
 * A quote rendered as a speech bubble: the tone colour fills a rounded block
 * with a tail dropping from its lower-left corner, and the contributor sits
 * below the tail as if speaking it.
 *
 * Two variants, chosen by whether `avatar` is passed — a plain card carrying
 * the name alone, and one with a small round portrait of the contributor.
 * Everything else is shared, so a quote can gain a photograph later without
 * changing how it is laid out.
 */
export type QuoteTone = "pink" | "cream" | "teal";

/**
 * Tones colour the bubble only. The attribution sits outside it, on whatever
 * band the card is placed in, so it always takes the page's ink.
 */
const TONES: Record<QuoteTone, { bubble: string; quote: string }> = {
  pink: { bubble: "#FDE8F2", quote: "var(--teal)" },
  cream: { bubble: "var(--cream)", quote: "var(--teal)" },
  teal: { bubble: "var(--teal)", quote: "var(--on-teal)" },
};

const META_INK = "rgba(0, 83, 83, 0.6)";

interface QuoteCardProps {
  quote: string;
  name: string;
  /** Attribution detail — age, location, treatment. Joined with dots. */
  meta?: string[];
  /**
   * Round portrait of the contributor. Omit for the plain variant; the name
   * beside it already carries the attribution, so the image is decorative.
   */
  avatar?: string;
  tone?: QuoteTone;
  /** Trailing affordance, e.g. a read-more line when the card is a link. */
  action?: string;
}

export function QuoteCard({
  quote,
  name,
  meta,
  avatar,
  tone = "pink",
  action,
}: QuoteCardProps) {
  const { bubble, quote: quoteColour } = TONES[tone];

  return (
    <figure className="flex flex-col h-full">
      {/* Bubble. `flex-1` makes it absorb the slack in an equal-height row, so
          cards line up on their attribution however unevenly the quotes run.
          That holds while the attributions are the same height — keep `meta`
          short enough not to wrap, or the longer one steals from its bubble. */}
      <div className="relative flex-1 rounded-2xl p-6 md:p-7" style={{ background: bubble }}>
        <blockquote
          className="font-sans text-[15px] leading-[1.6]"
          style={{ color: quoteColour }}
        >
          &ldquo;{quote}&rdquo;
        </blockquote>

        {/* Tail — a right triangle hung off the bottom edge, flush left and
            tapering to a point below, so the bubble reads as spoken. */}
        <span
          aria-hidden
          className="absolute left-8 top-full h-0 w-0"
          style={{
            borderTop: `16px solid ${bubble}`,
            borderRight: "14px solid transparent",
          }}
        />
      </div>

      {/* Attribution sits under the tail, indented to line up with it. */}
      <figcaption className="mt-7 flex items-center gap-3 pl-8">
        {avatar && (
          <span className="relative h-10 w-10 shrink-0 rounded-full overflow-hidden">
            <Image src={avatar} alt="" fill sizes="40px" className="object-cover" />
          </span>
        )}
        <span className="flex flex-col gap-0.5 min-w-0">
          <span
            className="text-[11px] font-[600] uppercase tracking-[0.15em] font-sans"
            style={{ color: "var(--teal)" }}
          >
            {name}
          </span>
          {meta && meta.length > 0 && (
            <span className="text-xs font-sans" style={{ color: META_INK }}>
              {meta.join(" · ")}
            </span>
          )}
          {action && (
            <span className="text-xs font-sans font-medium mt-1" style={{ color: "var(--teal)" }}>
              {action}
            </span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
