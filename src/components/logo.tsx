interface LogoProps {
  height?: number;
  className?: string;
  onDark?: boolean;
}

/**
 * The wordmark is a single ink colour rather than a two-tone lockup. The old
 * lime "Fertility" cleared only ~1.6:1 against white and the pink on the teal
 * only ~6:1, so neither half of the name was dependably legible. Off-black on
 * light surfaces (~15.9:1) and white on the teal (~8.9:1) both clear WCAG AAA.
 */
export function Logo({ className = "", onDark = false }: LogoProps) {
  return (
    <span
      className={`font-sans font-medium tracking-tight ${className}`}
      style={{
        fontSize: "1.25rem",
        letterSpacing: "-0.02em",
        color: onDark ? "#FFFFFF" : "var(--foreground)",
      }}
      aria-label="CairnFertility"
    >
      CairnFertility
    </span>
  );
}
