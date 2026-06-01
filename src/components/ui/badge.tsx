import type { ReactNode } from "react";

export type BadgeColor = "gray" | "brand" | "success" | "error" | "warning";
export type BadgeType = "pill" | "bordered";

export interface BadgeProps {
  color?: BadgeColor;
  /** pill = filled rounded-full (Pill color); bordered = subtle fill + ring (Badge modern) */
  type?: BadgeType;
  /** Show a leading status dot */
  dot?: boolean;
  className?: string;
  children: ReactNode;
}

// KLEO Badge — read-only system-owned status label.
// Use Tag (not yet scaffolded) for user-owned, removable, interactive chips.

const PILL_COLOR: Record<BadgeColor, string> = {
  gray:    "bg-bg-tertiary    text-text-secondary",
  brand:   "bg-bg-brand-primary  text-text-brand-secondary",
  success: "bg-bg-success-primary text-text-success-primary",
  error:   "bg-bg-error-primary   text-text-error-primary",
  warning: "bg-bg-warning-primary text-text-warning-primary",
};

const BORDERED_COLOR: Record<BadgeColor, string> = {
  gray:    "bg-bg-primary     text-text-secondary    ring-border-secondary",
  brand:   "bg-bg-brand-primary  text-text-brand-secondary ring-border-brand",
  success: "bg-bg-success-primary text-text-success-primary ring-border-success-subtle",
  error:   "bg-bg-error-primary   text-text-error-primary   ring-border-error-subtle",
  warning: "bg-bg-warning-primary text-text-warning-primary ring-border-warning-subtle",
};

// Dot is a drawn glyph → fg-* tokens, not text-* (KLEO role separation)
const DOT_COLOR: Record<BadgeColor, string> = {
  gray:    "bg-fg-secondary",
  brand:   "bg-fg-brand-primary",
  success: "bg-fg-success-primary",
  error:   "bg-fg-error-primary",
  warning: "bg-fg-warning-primary",
};

export function Badge({
  color = "gray",
  type = "pill",
  dot = false,
  className = "",
  children,
}: BadgeProps) {
  const colorClasses =
    type === "bordered"
      ? `${BORDERED_COLOR[color]} ring-1 ring-inset`
      : PILL_COLOR[color];

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5",
        "px-2 py-0.5 rounded-full",
        "text-xs font-medium font-sans whitespace-nowrap",
        colorClasses,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full shrink-0 ${DOT_COLOR[color]}`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
