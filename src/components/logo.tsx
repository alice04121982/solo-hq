interface LogoProps {
  height?: number;
  className?: string;
  onDark?: boolean;
}

/**
 * One-word two-tone wordmark: "Cairn" carries the ink, "Fertility" the brand
 * colour. Every half clears WCAG AA at wordmark size on its surface — on
 * light, foreground (~15.9:1) and teal (~8.9:1); on the teal surface, white
 * (~8.9:1) and lime (~6.2:1). The old lime-on-white "Fertility" (~1.6:1) is
 * what a two-tone lockup must never regress to.
 */
export function Logo({ className = "", onDark = false }: LogoProps) {
  return (
    <span
      className={`font-sans font-medium tracking-tight ${className}`}
      style={{ fontSize: "1.25rem", letterSpacing: "-0.02em" }}
      aria-label="CairnFertility"
    >
      <span style={{ color: onDark ? "var(--background)" : "var(--foreground)" }}>
        Cairn
      </span>
      <span style={{ color: onDark ? "var(--accent)" : "var(--teal)" }}>
        Fertility
      </span>
    </span>
  );
}
