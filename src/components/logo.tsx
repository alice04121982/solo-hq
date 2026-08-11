interface LogoProps {
  height?: number;
  className?: string;
  onDark?: boolean;
}

/**
 * Lockup: the Waypath cairn mark beside the one-word two-tone wordmark.
 * "Cairn" carries the dark green, "Fertility" the bright green. On light
 * surfaces "Fertility" uses --accent-dark rather than raw lime — lime on
 * white is ~1.6:1 and unreadable; the darker leaf green (~2.2:1) leans on
 * the WCAG logotype exemption but stays legible. On the teal surface the
 * pairing is white (~8.9:1) and full lime (~6.2:1).
 */
export function Logo({ className = "", onDark = false }: LogoProps) {
  const stone = onDark ? "var(--cream)" : "var(--teal)";
  return (
    <span
      className={`inline-flex items-center gap-2 font-sans font-medium tracking-tight ${className}`}
      style={{ fontSize: "1.25rem", letterSpacing: "-0.02em" }}
      aria-label="CairnFertility"
    >
      <svg viewBox="0 0 64 64" width="26" height="26" fill="none" aria-hidden="true">
        <circle cx="32" cy="7" r="4" fill="var(--accent)" />
        <rect x="26" y="14" width="16" height="9" rx="4.5" fill={stone} />
        <rect x="17" y="25" width="24" height="9" rx="4.5" fill={stone} />
        <rect x="20" y="36" width="32" height="9" rx="4.5" fill={stone} />
        <rect x="10" y="47" width="42" height="9" rx="4.5" fill={stone} />
      </svg>
      <span>
        <span style={{ color: onDark ? "var(--background)" : "var(--teal)" }}>
          Cairn
        </span>
        <span style={{ color: onDark ? "var(--accent)" : "var(--accent-dark)" }}>
          Fertility
        </span>
      </span>
    </span>
  );
}
