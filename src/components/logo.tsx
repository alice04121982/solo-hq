interface LogoProps {
  height?: number;
  className?: string;
}

export function Logo({ height = 52, className = "" }: LogoProps) {
  const width = Math.round(height * (296 / 170));
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 296 170"
      width={width}
      height={height}
      className={className}
      aria-label="Flying Solo"
    >
      <text x="148" y="78" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontWeight="900" fontSize="70" fill="#0B3D2E">flying</text>
      <text x="148" y="155" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontWeight="900" fontSize="70" fill="#C97B5C">solo</text>
    </svg>
  );
}
