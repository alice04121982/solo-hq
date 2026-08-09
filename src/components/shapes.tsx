import type { CSSProperties } from "react";

/**
 * The shape bank.
 *
 * Four marks, each borrowed from the fertility journey itself, so the
 * decoration carries meaning the photography never could:
 *
 *  - Bloom  — a scalloped circle: the egg cell, a flower, a family in the
 *             round. Leads the hero in place of a photo, since no photograph
 *             can show "every kind of family" at once.
 *  - Egg    — a ring with a nucleus: the egg itself, cycles, waiting.
 *  - Cross  — the × you mark on a calendar: tracking days, injections done,
 *             appointments kept.
 *  - Spark  — the four-point star: the day it works.
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

/** Scalloped circle — egg cell / flower. Eight petals over a core. */
export function Bloom(props: ShapeProps) {
  return (
    <svg {...svgProps(props)}>
      <circle cx="50" cy="50" r="32" />
      <circle cx="81" cy="50" r="17" />
      <circle cx="71.92" cy="71.92" r="17" />
      <circle cx="50" cy="81" r="17" />
      <circle cx="28.08" cy="71.92" r="17" />
      <circle cx="19" cy="50" r="17" />
      <circle cx="28.08" cy="28.08" r="17" />
      <circle cx="50" cy="19" r="17" />
      <circle cx="71.92" cy="28.08" r="17" />
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

/** Plain circle — a compositional primitive, used under the marks above. */
export function Dot(props: ShapeProps) {
  return (
    <svg {...svgProps(props)}>
      <circle cx="50" cy="50" r="48" />
    </svg>
  );
}

export type ShapeName = "bloom" | "egg" | "cross" | "spark";

const SHAPES: Record<ShapeName, (props: ShapeProps) => React.JSX.Element> = {
  bloom: Bloom,
  egg: Egg,
  cross: Cross,
  spark: Spark,
};

/** Render a shape by name — for data-driven placements like card lists. */
export function ShapeMark({ name, ...props }: ShapeProps & { name: ShapeName }) {
  const Shape = SHAPES[name];
  return <Shape {...props} />;
}

/**
 * The rotation used wherever a list of items each takes a mark (family
 * cards, stat cards) — indexed with `SHAPE_CYCLE[i % SHAPE_CYCLE.length]`.
 */
export const SHAPE_CYCLE: ShapeName[] = ["bloom", "spark", "egg", "cross"];
