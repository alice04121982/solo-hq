"use client";

import { useSyncExternalStore } from "react";
import type {
  CommunityInterest,
  CommunityPathway,
  CommunityStage,
} from "./community";

/**
 * Client-side state for the community waitlist journey.
 *
 * The email is the part that must survive — it goes to POST /api/waitlist
 * (the Supabase-backed table behind the /waitlist page as well, so both
 * forms feed one list). The richer answers — pathway, stage, interests —
 * have no server home yet; they live in localStorage so the journey can
 * remember a returning visitor, and they move server-side when the table
 * grows columns for them.
 */

export interface WaitlistSignup {
  firstName: string;
  email: string;
  pathway: CommunityPathway;
  stage: CommunityStage;
  interests: CommunityInterest[];
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

export function useWaitlistSignup(): WaitlistSignup | null {
  return useSyncExternalStore(
    waitlistStore.subscribe,
    waitlistStore.getSnapshot,
    waitlistStore.getServerSnapshot
  );
}

/**
 * Joins the waitlist for real, then remembers the journey locally.
 * "already-joined" from the API counts as success — being on the list twice
 * is not a failure from the signer-upper's point of view.
 *
 * @throws Error with a user-facing message when the API rejects the signup
 *   or the network fails; nothing is remembered locally in that case.
 */
export async function submitWaitlist(
  signup: Omit<WaitlistSignup, "joinedAt">
): Promise<void> {
  let res: Response;
  let data: { error?: string };
  try {
    res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: signup.email }),
    });
    data = await res.json();
  } catch {
    throw new Error("Something went wrong. Please check your connection and try again.");
  }
  if (!res.ok) {
    throw new Error(data.error ?? "Something went wrong. Please try again.");
  }
  waitlistStore.set({ ...signup, joinedAt: new Date().toISOString() });
}

export function clearWaitlistSignup(): void {
  waitlistStore.set(null);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
