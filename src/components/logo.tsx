interface LogoProps {
  height?: number;
  className?: string;
  /** Use on dark/brand surfaces — renders in white */
  onDark?: boolean;
}

export function Logo({ height = 44, className = "", onDark = false }: LogoProps) {
  const brandColor  = onDark ? "#FFFFFF" : "#7F56D9";   /* kleo-bg-brand-solid / fg-white */
  const labelColor  = onDark ? "rgba(255,255,255,0.60)" : "#535862"; /* kleo-text-tertiary */

  const kleoSize    = Math.round(height * 0.55);
  const labelSize   = Math.round(height * 0.29);
  const totalWidth  = Math.round(height * 3.4);

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
      {/* Mark — two interlocking arcs suggesting connection/support */}
      <g transform={`translate(0, ${height * 0.1})`}>
        <path
          d={`M${height * 0.18} ${height * 0.72}
              C${height * 0.18} ${height * 0.36}
               ${height * 0.54} ${height * 0.1}
               ${height * 0.54} ${height * 0.1}
              C${height * 0.54} ${height * 0.1}
               ${height * 0.54} ${height * 0.5}
               ${height * 0.18} ${height * 0.72}Z`}
          fill={brandColor}
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
          fill={brandColor}
          opacity="0.45"
        />
      </g>

      {/* Wordmark */}
      <text
        x={height * 0.72}
        y={height * 0.60}
        fontFamily="Excon, ui-sans-serif, sans-serif"
        fontWeight="700"
        fontSize={kleoSize}
        fill={brandColor}
        letterSpacing="-0.02em"
      >
        KLEO
      </text>
      <text
        x={height * 0.725}
        y={height * 0.92}
        fontFamily="Excon, ui-sans-serif, sans-serif"
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
