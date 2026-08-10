"use client";

import { useSyncExternalStore } from "react";
import type {
  CommunityInterest,
  CommunityPathway,
  CommunityStage,
} from "./community";

/**
 * Client-side persistence for the community waitlist and the journey letter.
 *
 * There is no backend yet — signups live in localStorage so the journey can
 * be walked end-to-end (including returning to the page already signed up)
 * while the product is pre-launch. `submitWaitlist` / `submitFollow` are the
 * seams a real API slots into: swap their bodies for a fetch and every
 * component stays untouched.
 */

export interface WaitlistSignup {
  firstName: string;
  email: string;
  pathway: CommunityPathway;
  stage: CommunityStage;
  interests: CommunityInterest[];
  joinedAt: string;
}

export interface FollowSignup {
  email: string;
  joinedAt: string;
}

/**
 * A localStorage-backed store shaped for `useSyncExternalStore`: the parsed
 * value is cached so `getSnapshot` returns a stable reference, and every
 * write notifies subscribers. localStorage itself can throw (private mode,
 * storage full) — treated as "no saved signup" on read and as a lost-but-
 * harmless persist on write, so the flow never breaks.
 */
function createSignupStore<T>(key: string) {
  let cache: T | null = null;
  let loaded = false;
  const listeners = new Set<() => void>();

  return {
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot(): T | null {
      if (!loaded) {
        loaded = true;
        try {
          const raw = window.localStorage.getItem(key);
          cache = raw ? (JSON.parse(raw) as T) : null;
        } catch {
          cache = null;
        }
      }
      return cache;
    },
    /** The server never has a signup — the page renders the empty form. */
    getServerSnapshot(): T | null {
      return null;
    },
    set(value: T | null) {
      cache = value;
      loaded = true;
      try {
        if (value === null) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, JSON.stringify(value));
        }
      } catch {
        // The in-memory value still drives the UI; it just won't survive
        // a reload.
      }
      listeners.forEach((l) => l());
    },
  };
}

const waitlistStore = createSignupStore<WaitlistSignup>("cairn-waitlist-signup");
const followStore = createSignupStore<FollowSignup>("cairn-follow-signup");

export function useWaitlistSignup(): WaitlistSignup | null {
  return useSyncExternalStore(
    waitlistStore.subscribe,
    waitlistStore.getSnapshot,
    waitlistStore.getServerSnapshot
  );
}

export function useFollowSignup(): FollowSignup | null {
  return useSyncExternalStore(
    followStore.subscribe,
    followStore.getSnapshot,
    followStore.getServerSnapshot
  );
}

export async function submitWaitlist(
  signup: Omit<WaitlistSignup, "joinedAt">
): Promise<void> {
  await new Promise((r) => setTimeout(r, 600));
  waitlistStore.set({ ...signup, joinedAt: new Date().toISOString() });
}

export function clearWaitlistSignup(): void {
  waitlistStore.set(null);
}

export async function submitFollow(email: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 600));
  followStore.set({ email, joinedAt: new Date().toISOString() });
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
