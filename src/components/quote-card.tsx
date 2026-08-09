import Image from "next/image";

/**
 * A quote rendered as a speech bubble nested in a card: the tone colour fills
 * a rounded panel inside a white card, a tail drops from the panel's lower
 * edge, and the contributor sits on the white below it as if speaking.
 *
 * Two variants, chosen by whether `avatar` is passed — a plain card carrying
 * the name alone, and one with a small round portrait of the contributor.
 * Everything else is shared, so a quote can gain a photograph later without
 * changing how it is laid out.
 */
export type QuoteTone = "pink" | "cream" | "teal";

/**
 * Tones colour the inner panel only; the card around it is always white.
 *
 * The eyebrow takes the same ink as the quote rather than a faded one — at
 * 10px on these fills, anything lighter drops under 4.5:1. Its hierarchy
 * comes from size and tracking instead.
 */
const TONES: Record<QuoteTone, { bubble: string; quote: string }> = {
  pink: { bubble: "var(--lavender)", quote: "var(--teal)" },
  cream: { bubble: "var(--cream)", quote: "var(--teal)" },
  teal: { bubble: "var(--teal)", quote: "var(--on-teal)" },
};

const TAIL = { width: 30, height: 20 };

interface QuoteCardProps {
  quote: string;
  name: string;
  /** Small label at the top of the bubble — the treatment, the family type. */
  eyebrow?: string;
  /** Line under the name. Joined with dots; keep it to one line (see below). */
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
  eyebrow,
  meta,
  avatar,
  tone = "pink",
  action,
}: QuoteCardProps) {
  const { bubble, quote: quoteInk } = TONES[tone];

  // `overflow-hidden` is what lets the bubble run flush to the card's top and
  // sides — it takes the card's rounded corners on the way past, so there is no
  // white gutter framing it. White shows only below the tail, under the quote.
  return (
    <figure
      className="flex flex-col h-full rounded-[28px] border overflow-hidden"
      style={{ background: "var(--background)", borderColor: "var(--border)" }}
    >
      {/* Bubble. `flex-1` makes it absorb the slack in an equal-height row, so
          cards line up on their attribution however unevenly the quotes run.
          That holds while the attributions are the same height — keep `meta`
          short enough not to wrap, or the longer one steals from its bubble. */}
      <div
        className="relative flex-1 px-6 pt-7 pb-8 md:px-7"
        style={{ background: bubble }}
      >
        {eyebrow && (
          <p
            className="text-[10px] font-[700] uppercase tracking-[0.16em] font-sans mb-4"
            style={{ color: quoteInk }}
          >
            {eyebrow}
          </p>
        )}

        {/* No quote marks — the bubble is what says this is speech. */}
        <blockquote
          className="font-sans font-[600]"
          style={{
            color: quoteInk,
            fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
          }}
        >
          {quote}
        </blockquote>

        {/* Tail, dropping off the bubble into the card below it. Drawn as a
            stroked triangle so the tip and shoulders round off the way the
            bubble's own corners do. */}
        <svg
          aria-hidden
          width={TAIL.width}
          height={TAIL.height}
          viewBox="0 0 30 20"
          className="absolute left-[58%] top-full -mt-px"
        >
          <path
            d="M4 1 L26 1 L10 15 Z"
            fill={bubble}
            stroke={bubble}
            strokeWidth="6"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Attribution, on the card's white ground under the tail. */}
      <figcaption className="flex items-end justify-between gap-4 px-6 md:px-7 pt-7 pb-6">
        <span className="flex items-center gap-3 min-w-0">
          {avatar && (
            <span className="relative h-9 w-9 shrink-0 rounded-full overflow-hidden">
              <Image src={avatar} alt="" fill sizes="36px" className="object-cover" />
            </span>
          )}
          <span className="flex flex-col gap-0.5 min-w-0">
            <span
              className="text-[13px] font-sans font-[600] leading-tight"
              style={{ color: "var(--teal)" }}
            >
              {name}
            </span>
            {meta && meta.length > 0 && (
              <span
                className="text-xs font-sans leading-tight"
                style={{ color: "var(--muted)" }}
              >
                {meta.join(" · ")}
              </span>
            )}
          </span>
        </span>

        {action && (
          <span
            className="text-xs font-sans font-medium shrink-0"
            style={{ color: "var(--teal)" }}
          >
            {action}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
