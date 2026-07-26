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
        color: onDark ? "#FFFFFF" : "#1A0810",
      }}
      aria-label="IVFCOMPARE"
    >
      IVF<span style={{ color: "#C5E600" }}>COMPARE</span>
    </span>
  );
}
