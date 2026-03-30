import Image from "next/image";

interface LogoProps {
  height?: number;
  className?: string;
}

export function Logo({ height = 52, className = "" }: LogoProps) {
  const width = Math.round(height * (296 / 170));
  return (
    <Image
      src="/flying-solo-logo.png"
      alt="Flying Solo"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
