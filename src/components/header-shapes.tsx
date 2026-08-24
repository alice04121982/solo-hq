import { ShapeMark, type ShapeName } from "./shapes";

/**
 * A cluster of oversized marks sitting behind a page header.
 *
 * The single `Section` backdrop places one shape and holds still; a header
 * that leads a page rather than divides it wants a composition — one large
 * mark cropped by the band edge, a couple of small ones off it — and the
 * faintest amount of movement, so the band feels alive without anything on
 * a fertility site ever appearing to hurry.
 *
 * Movement is CSS-only (the loops in globals.css), so this stays a server
 * component and honours `prefers-reduced-motion` without shipping any JS.
 * Placement is a transform, and the loops are transforms too, so each mark
 * is two elements: the outer one positions, the inner one moves.
 */

export type MarkMotion = "spin" | "breathe" | "drift" | "none";

const MOTION_CLASS: Record<MarkMotion, string> = {
  spin: "shape-spin",
  breathe: "shape-breathe",
  drift: "shape-drift",
  none: "",
};

export interface HeaderMark {
  name: ShapeName;
  /** A colour token, e.g. `var(--lavender)`. */
  color: string;
  /** Size and placement classes, resolved against the band. */
  className: string;
  /** Ambient loop. Default "breathe". */
  motion?: MarkMotion;
  /** Stagger, so a cluster never pulses in unison. Seconds. */
  delay?: number;
  /** Override the loop's length. Seconds — the bigger the mark, the slower. */
  duration?: number;
}

export function HeaderShapes({ marks }: { marks: HeaderMark[] }) {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {marks.map((m, i) => (
        <div key={i} className={`absolute ${m.className}`}>
          <div
            className={MOTION_CLASS[m.motion ?? "breathe"]}
            style={{
              animationDelay: m.delay ? `${m.delay}s` : undefined,
              animationDuration: m.duration ? `${m.duration}s` : undefined,
            }}
          >
            <ShapeMark name={m.name} className="w-full h-auto" style={{ color: m.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}
