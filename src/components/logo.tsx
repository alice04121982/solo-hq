interface LogoProps {
  height?: number;
  className?: string;
  /** Use on dark/brand surfaces — renders in white */
  onDark?: boolean;
}

export function Logo({ height = 44, className = "", onDark = false }: LogoProps) {
  const kleoColor  = onDark ? "#FFFFFF" : "#2E7A51";   /* bg-bg-brand-solid / fg-white */
  const labelColor = onDark ? "rgba(255,255,255,0.70)" : "#6B665F"; /* text-text-secondary */

  // Type scale: "KLEO" ≈ display-xs (24px), "Fertility" ≈ sm (14px)
  const kleoSize    = Math.round(height * 0.55);
  const labelSize   = Math.round(height * 0.29);
  const totalWidth  = Math.round(height * 3.2);

  return (
    <svg
      width={totalWidth}
      height={height}
      viewBox={`0 0 ${totalWidth} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="KLEO Fertility"
      role="img"
      className={className}
    >
      {/* Leaf mark — a simple pair of curved strokes representing growth */}
      <g transform={`translate(0, ${height * 0.1})`}>
        <path
          d={`M${height * 0.18} ${height * 0.72}
              C${height * 0.18} ${height * 0.36}
               ${height * 0.54} ${height * 0.1}
               ${height * 0.54} ${height * 0.1}
              C${height * 0.54} ${height * 0.1}
               ${height * 0.54} ${height * 0.5}
               ${height * 0.18} ${height * 0.72}Z`}
          fill={kleoColor}
          opacity="0.9"
        />
        <path
          d={`M${height * 0.44} ${height * 0.72}
              C${height * 0.44} ${height * 0.38}
               ${height * 0.08} ${height * 0.14}
               ${height * 0.08} ${height * 0.14}
              C${height * 0.08} ${height * 0.14}
               ${height * 0.08} ${height * 0.52}
               ${height * 0.44} ${height * 0.72}Z`}
          fill={kleoColor}
          opacity="0.55"
        />
      </g>

      {/* Wordmark — "KLEO" in serif weight, "Fertility" in sans below */}
      <text
        x={height * 0.72}
        y={height * 0.60}
        fontFamily="Lora, Georgia, serif"
        fontWeight="700"
        fontSize={kleoSize}
        fill={kleoColor}
        letterSpacing="-0.02em"
      >
        KLEO
      </text>
      <text
        x={height * 0.725}
        y={height * 0.92}
        fontFamily="DM Sans, ui-sans-serif, sans-serif"
        fontWeight="500"
        fontSize={labelSize}
        fill={labelColor}
        letterSpacing="0.08em"
      >
        FERTILITY
      </text>
    </svg>
  );
}
