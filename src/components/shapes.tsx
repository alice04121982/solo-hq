import type { CSSProperties } from "react";

/**
 * The shape bank.
 *
 * Marks borrowed from the fertility journey itself, so the decoration
 * carries meaning the photography never could:
 *
 *  - Bloom    — a scalloped circle: the egg cell, a flower, a family in the
 *               round. Leads the hero in place of a photo, since no photograph
 *               can show "every kind of family" at once.
 *  - Egg      — a ring with a nucleus: the egg itself, cycles, waiting.
 *  - Cross    — the × you mark on a calendar: tracking days, injections done,
 *               appointments kept.
 *  - Spark    — the four-point star: the day it works.
 *  - Asterisk — eight flat-ended spokes.
 *  - Pause    — two square bars: the wait between cycles, plans put on hold.
 *  - Halves   — two offset half-rings that only read whole together.
 *
 * All shapes draw in `currentColor` on a 100×100 viewBox, so colour comes
 * from CSS `color` and size from the `size` prop (or width/height classes).
 * `Dot` is a plain circle — not a fifth mark, just a primitive the hero
 * composition layers under the others.
 */

interface ShapeProps {
  /** Rendered width & height in px. Omit to size via className instead. */
  size?: number;
  className?: string;
  style?: CSSProperties;
}

function svgProps({ size, className, style }: ShapeProps) {
  return {
    viewBox: "0 0 100 100",
    width: size,
    height: size,
    className,
    style,
    fill: "currentColor",
    "aria-hidden": true as const,
  };
}

/** One circle as a path subpath, so unions render seam-free. */
function circlePath(cx: number, cy: number, r: number): string {
  return `M${cx + r} ${cy}a${r} ${r} 0 1 0 ${-2 * r} 0a${r} ${r} 0 1 0 ${2 * r} 0Z`;
}

const BLOOM_PATH = [
  circlePath(50, 50, 32),
  circlePath(81, 50, 17),
  circlePath(71.92, 71.92, 17),
  circlePath(50, 81, 17),
  circlePath(28.08, 71.92, 17),
  circlePath(19, 50, 17),
  circlePath(28.08, 28.08, 17),
  circlePath(50, 19, 17),
  circlePath(71.92, 28.08, 17),
].join("");

/**
 * Scalloped circle — egg cell / flower. Eight petals over a core, drawn as
 * one nonzero-winding path so the union has no internal seams — separate
 * overlapping <circle>s would show their outlines through each other the
 * moment the shape is tinted or faded.
 */
export function Bloom(props: ShapeProps) {
  return (
    <svg {...svgProps(props)}>
      <path d={BLOOM_PATH} />
    </svg>
  );
}

/** Ring with a nucleus — the egg. */
export function Egg(props: ShapeProps) {
  return (
    <svg {...svgProps(props)}>
      <path
        fillRule="evenodd"
        d="M50 6a44 44 0 1 0 .01 0ZM50 25a25 25 0 1 1-.01 0Z"
      />
      <circle cx="50" cy="50" r="16" />
    </svg>
  );
}

/** Rounded × — a day marked off on the calendar. */
export function Cross(props: ShapeProps) {
  return (
    <svg {...svgProps(props)}>
      <path
        d="M27 27 73 73M73 27 27 73"
        stroke="currentColor"
        strokeWidth="26"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/** Four-point star — the day it works. */
export function Spark(props: ShapeProps) {
  return (
    <svg {...svgProps(props)}>
      <path d="M50 2C57 31 69 43 98 50 69 57 57 69 50 98 43 69 31 57 2 50 31 43 43 31 50 2Z" />
    </svg>
  );
}

/**
 * Two half-rings, offset — the Two Dads mark. An open C sits high on the
 * left, a mirrored C sits low on the right, and the two only read as a
 * whole together. Supplied artwork (116×161) scaled to fit the 100×100 box
 * by height and centred horizontally, so it keeps the same 6–94 margins as
 * the other marks.
 */
export function Halves(props: ShapeProps) {
  return (
    <svg {...svgProps(props)}>
      <g transform="translate(18.27 6) scale(0.54966)">
        {/* upper-left C — opens to the right */}
        <path d="M57.5225 0V24.5605H57.5215C39.3172 24.5608 24.5596 39.3181 24.5596 57.5225C24.5596 75.7269 39.3171 90.4851 57.5215 90.4854H57.5225V115.044H57.5215C25.753 115.045 0 89.291 0 57.5225C0 25.7539 25.753 0.000227369 57.5215 0H57.5225Z" />
        {/* lower-right C — opens to the left */}
        <path d="M57.9344 45.0529L57.9335 45.0539V69.6125L57.9344 69.6135C76.1388 69.6137 90.8963 84.371 90.8964 102.575C90.8964 120.78 76.1389 135.538 57.9346 135.538H57.9335V160.098H57.9351C89.7033 160.097 115.456 134.344 115.456 102.575C115.456 70.8069 89.7029 45.0532 57.9344 45.0529Z" />
      </g>
    </svg>
  );
}

/**
 * Pause button — two vertical bars. Deliberately square-cornered: no `rx`,
 * so the edges stay hard against the rounded marks around it.
 */
export function Pause(props: ShapeProps) {
  return (
    <svg {...svgProps(props)}>
      <rect x="14" y="8" width="28" height="84" />
      <rect x="58" y="8" width="28" height="84" />
    </svg>
  );
}

/** Eight-spoke asterisk, flat-ended and chunky — the Solo Dads mark. */
export function Asterisk(props: ShapeProps) {
  return (
    <svg {...svgProps(props)}>
      <path
        d="M50 8v84M8 50h84M20.3 20.3l59.4 59.4M79.7 20.3 20.3 79.7"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="butt"
        fill="none"
      />
    </svg>
  );
}

/** Plain circle — a compositional primitive, used under the marks above. */
export function Dot(props: ShapeProps) {
  return (
    <svg {...svgProps(props)}>
      <circle cx="50" cy="50" r="48" />
    </svg>
  );
}

export type ShapeName =
  | "bloom"
  | "egg"
  | "cross"
  | "spark"
  | "asterisk"
  | "pause"
  | "halves";

const SHAPES: Record<ShapeName, (props: ShapeProps) => React.JSX.Element> = {
  bloom: Bloom,
  egg: Egg,
  cross: Cross,
  spark: Spark,
  asterisk: Asterisk,
  pause: Pause,
  halves: Halves,
};

/** Render a shape by name — for data-driven placements like card lists. */
export function ShapeMark({ name, ...props }: ShapeProps & { name: ShapeName }) {
  const Shape = SHAPES[name];
  return <Shape {...props} />;
}

/**
 * The rotation used where a list of items each takes a mark without the
 * mark meaning anything (stat cards) — indexed with
 * `SHAPE_CYCLE[i % SHAPE_CYCLE.length]`.
 */
export const SHAPE_CYCLE: ShapeName[] = ["bloom", "spark", "egg", "cross"];

/**
 * The fixed mark for each family type — shape-coded identity, one distinct
 * mark per family, used wherever a family is represented by a shape.
 */
export const FAMILY_SHAPES: Record<string, ShapeName> = {
  "solo-mum": "bloom",
  "same-sex-female": "spark",
  "same-sex-male": "halves",
  "single-dad": "asterisk",
  "heterosexual-couple": "pause",
};
