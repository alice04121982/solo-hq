"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(REDUCED_MOTION).matches;
}

interface AmbientVideoProps {
  /** MP4 source under `public/video/` — the broadly supported format. */
  mp4Src: string;
  /** Optional WebM source, served first where the browser supports it. */
  webmSrc?: string;
  /** Still frame shown before playback and to reduced-motion viewers. */
  poster: string;
  /** What the footage shows, e.g. "An embryologist injecting a sperm cell into an egg". */
  label: string;
  /** Passed to the poster `Image` when the still is rendered. */
  sizes?: string;
  className?: string;
}

/**
 * Silent, looping, decorative footage — the lab clips on how-ivf-works.
 *
 * Autoplays muted and inline; viewers with a reduced-motion preference get
 * the poster frame instead of a moving image. The server renders the poster
 * too, so nothing moves before the preference is known. Fills its
 * positioned parent, like StoryImage. Keep anything the clip communicates
 * in the surrounding copy as well — the footage is illustration, not
 * content.
 */
export function AmbientVideo({
  mp4Src,
  webmSrc,
  poster,
  label,
  sizes,
  className = "",
}: AmbientVideoProps) {
  const reducedMotion = useSyncExternalStore(subscribe, getSnapshot, () => true);

  if (reducedMotion) {
    return (
      <Image
        src={poster}
        alt={label}
        fill
        sizes={sizes}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={label}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    >
      {webmSrc ? <source src={webmSrc} type="video/webm" /> : null}
      <source src={mp4Src} type="video/mp4" />
    </video>
  );
}
