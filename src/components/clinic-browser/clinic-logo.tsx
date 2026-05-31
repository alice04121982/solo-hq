"use client";

import { useState } from "react";
import Image from "next/image";

interface ClinicLogoProps {
  website: string | null;
  name: string;
  size?: number;
}

function getDomain(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

// Source priority: Clearbit (high quality, may 404) → Google favicon (always works)
function logoSrc(domain: string, attempt: number): string {
  if (attempt === 0) return `https://logo.clearbit.com/${domain}`;
  return `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=128`;
}

export function ClinicLogo({ website, name, size = 72 }: ClinicLogoProps) {
  const [attempt, setAttempt] = useState(0);

  const domain = website ? getDomain(website) : null;

  if (!domain || attempt >= 2) {
    return (
      <div
        className="rounded-xl bg-background-alt border border-border flex items-center justify-center shrink-0"
        style={{ width: size, height: size }}
      >
        <span
          className="font-serif font-semibold text-muted select-none"
          style={{ fontSize: size * 0.3 }}
        >
          {getInitials(name)}
        </span>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl border border-border bg-white overflow-hidden shrink-0 flex items-center justify-center p-1.5"
      style={{ width: size, height: size }}
    >
      <Image
        key={attempt}
        src={logoSrc(domain, attempt)}
        alt={`${name} logo`}
        width={size - 12}
        height={size - 12}
        className="object-contain"
        onError={() => setAttempt((a) => a + 1)}
        unoptimized
      />
    </div>
  );
}
