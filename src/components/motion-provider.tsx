"use client";

import { MotionConfig } from "framer-motion";

/* Honours the visitor's reduced-motion setting for every framer-motion
   element in the app, so individual components don't each need to check
   useReducedMotion(). Transform animations are skipped; opacity still fades. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
