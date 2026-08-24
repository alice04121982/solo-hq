import type { ReactNode } from "react";
import { ShapeMark, type ShapeName } from "./shapes";

/**
 * A card on the teal band — the treatment from the homepage comparison
 * teaser. White at 7% over the teal reads as a lighter green panel, and the
 * writing on it is pink: `--on-teal` for the value, `--on-teal-muted` for the
 * label, with the shape mark in lime so each card carries one bright note.
 *
 * Use this for anything boxed on a teal surface. Solid white cards belong on
 * light bands only; on teal they punch a hole in the band.
 */
export interface TealCardProps {
  /** Mark in the card's top-left, in lime. */
  mark?: ShapeName;
  /** Large pink line — a stat, a claim, a card title. */
  value?: ReactNode;
  /** Supporting line under the value, in the muted pink. */
  label?: ReactNode;
  /** Arbitrary content instead of the value/label pair. */
  children?: ReactNode;
  className?: string;
}

export function TealCard({
  mark,
  value,
  label,
  children,
  className = "",
}: TealCardProps) {
  return (
    <div
      className={`rounded-2xl p-6 md:p-7 ${className}`}
      style={{ background: "var(--teal-card)" }}
    >
      {mark && (
        <ShapeMark
          name={mark}
          size={20}
          className="mb-3"
          style={{ color: "var(--accent)" }}
        />
      )}
      {value && (
        <p
          className="font-sans font-medium mb-1"
          style={{ fontSize: "clamp(1.5rem, 2vw, 2.25rem)", color: "var(--on-teal)" }}
        >
          {value}
        </p>
      )}
      {label && (
        <p className="text-sm font-sans leading-snug" style={{ color: "var(--on-teal-muted)" }}>
          {label}
        </p>
      )}
      {children}
    </div>
  );
}
