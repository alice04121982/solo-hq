import { Globe } from "lucide-react";

/**
 * A country's flag, drawn as inline SVG.
 *
 * Emoji flags are not an option: Windows ships no flag glyphs, so 🇬🇧 renders
 * as the letters "GB" on a large share of visitors' machines. These are drawn
 * instead — simplified to read at 20×14, which is the size a clinic card uses
 * them at, and never larger than a line of type.
 *
 * The flag is decorative: the country is always written out in text beside it,
 * so every drawing is aria-hidden rather than labelled twice for a screen
 * reader.
 *
 * Countries are matched on the `country` field of a Clinic. Anything not in
 * the bank falls back to a globe rather than to a blank box, so adding a
 * clinic in a new country can never ship a hole in the card.
 */

/** Faithful enough at 20×14; every path is drawn inside that box. */
const FLAGS: Record<string, React.ReactNode> = {
  "United Kingdom": (
    <>
      <rect width="20" height="14" fill="#012169" />
      <path d="M0 0L20 14M20 0L0 14" stroke="#FFFFFF" strokeWidth="3" />
      <path d="M0 0L20 14M20 0L0 14" stroke="#C8102E" strokeWidth="1.4" />
      <path d="M10 0V14M0 7H20" stroke="#FFFFFF" strokeWidth="4.6" />
      <path d="M10 0V14M0 7H20" stroke="#C8102E" strokeWidth="2.6" />
    </>
  ),
  "United States": (
    <>
      <rect width="20" height="14" fill="#FFFFFF" />
      <g fill="#B31942">
        <rect y="0" width="20" height="2" />
        <rect y="4" width="20" height="2" />
        <rect y="8" width="20" height="2" />
        <rect y="12" width="20" height="2" />
      </g>
      <rect width="8.4" height="8" fill="#0A3161" />
      <g fill="#FFFFFF">
        {[1.4, 3.5, 5.6, 7.0].map((cx, col) =>
          [1.3, 3.3, 5.3, 6.7].map((cy, row) =>
            // Offset rows, so the grid reads as staggered stars, not a lattice.
            (col + row) % 2 === 0 ? <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.5" /> : null
          )
        )}
      </g>
    </>
  ),
  Spain: (
    <>
      <rect width="20" height="14" fill="#AA151B" />
      <rect y="3.5" width="20" height="7" fill="#F1BF00" />
    </>
  ),
  Greece: (
    <>
      <rect width="20" height="14" fill="#FFFFFF" />
      <g fill="#0D5EAF">
        <rect y="0" width="20" height="1.556" />
        <rect y="3.111" width="20" height="1.556" />
        <rect y="6.222" width="20" height="1.556" />
        <rect y="9.333" width="20" height="1.556" />
        <rect y="12.444" width="20" height="1.556" />
        <rect width="7.778" height="7.778" />
      </g>
      <g fill="#FFFFFF">
        <rect x="3.111" y="0" width="1.556" height="7.778" />
        <rect x="0" y="3.111" width="7.778" height="1.556" />
      </g>
    </>
  ),
  Turkey: (
    <>
      <rect width="20" height="14" fill="#E30A17" />
      <circle cx="7.4" cy="7" r="3.1" fill="#FFFFFF" />
      <circle cx="8.5" cy="7" r="2.5" fill="#E30A17" />
      <path
        d="M12.60 5.25 L13.02 6.42 L14.26 6.46 L13.28 7.22 L13.63 8.42 L12.60 7.72 L11.57 8.42 L11.92 7.22 L10.94 6.46 L12.18 6.42 Z"
        fill="#FFFFFF"
      />
    </>
  ),
  Denmark: (
    <>
      <rect width="20" height="14" fill="#C8102E" />
      {/* The Nordic cross sits toward the hoist, never centred. */}
      <g fill="#FFFFFF">
        <rect x="4.6" y="0" width="2.2" height="14" />
        <rect x="0" y="5.9" width="20" height="2.2" />
      </g>
    </>
  ),
  "Czech Republic": (
    <>
      <rect width="20" height="14" fill="#FFFFFF" />
      <rect y="7" width="20" height="7" fill="#D7141A" />
      <path d="M0 0 L7 7 L0 14 Z" fill="#11457E" />
    </>
  ),
  "South Africa": (
    <>
      <rect width="20" height="14" fill="#E03C31" />
      <rect y="7" width="20" height="7" fill="#001489" />
      {/* The pall drawn as one stroked path: white fringe, then green over it. */}
      <path
        d="M-1 -1 L7 7 L21 7 M-1 15 L7 7"
        stroke="#FFFFFF"
        strokeWidth="6.2"
        fill="none"
        strokeLinejoin="miter"
      />
      <path
        d="M-1 -1 L7 7 L21 7 M-1 15 L7 7"
        stroke="#007A4D"
        strokeWidth="3.6"
        fill="none"
        strokeLinejoin="miter"
      />
      <path d="M0 2 L5 7 L0 12 Z" fill="#FFB81C" />
      <path d="M0 3.4 L3.6 7 L0 10.6 Z" fill="#000000" />
    </>
  ),
};

interface CountryFlagProps {
  country: string;
  className?: string;
}

export function CountryFlag({ country, className }: CountryFlagProps) {
  const flag = FLAGS[country];

  if (!flag) {
    return (
      <Globe
        className={["h-3.5 w-3.5 shrink-0 opacity-70", className].filter(Boolean).join(" ")}
        aria-hidden
      />
    );
  }

  return (
    <svg
      viewBox="0 0 20 14"
      className={["h-[0.875em] w-[1.25em] shrink-0", className].filter(Boolean).join(" ")}
      // Rounded via clip-path rather than a <clipPath> element: repeating the
      // same flag across 17 cards would repeat the same id 17 times.
      style={{ clipPath: "inset(0 round 2px)" }}
      role="presentation"
      aria-hidden
    >
      {flag}
      {/* A hairline in the card's own ink, so white-heavy flags (Czechia,
          Greece) keep an edge on light fills and on the dark hover fill. */}
      <rect
        x="0.4"
        y="0.4"
        width="19.2"
        height="13.2"
        rx="1.6"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="0.8"
      />
    </svg>
  );
}
