interface LogoProps {
  height?: number;
  className?: string;
  onDark?: boolean;
}

export function Logo({ className = "", onDark = false }: LogoProps) {
  return (
    <span
      className={`font-sans font-medium tracking-tight ${className}`}
      style={{
        fontSize: "1.25rem",
        letterSpacing: "-0.02em",
        color: onDark ? "#f9c6da" : "var(--foreground)",
      }}
      aria-label="CairnFertility"
    >
      Cairn<span style={{ color: onDark ? "#F0A8C4" : "#C5E600" }}>Fertility</span>
    </span>
  );
}
