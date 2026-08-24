"use client";

import { useSyncExternalStore } from "react";
import type { CommunityInterest, CommunityPathway, CommunityStage } from "./community";

/**
 * Client-side state for the community application journey.
 *
 * What gets remembered on the device is deliberately thin: a first name and
 * the date. Not the email, not the pathway, not the stage, and above all not
 * the "why do you want to join" answer — that is somebody's fertility
 * treatment written in their own words, and browsers are shared. A partner, a
 * flatmate, or a family member opening this page should learn nothing beyond
 * "someone applied", and a returning applicant still gets a page that knows
 * them rather than an empty form asking again.
 */

export interface ApplicationInput {
  firstName: string;
  email: string;
  pathway: CommunityPathway;
  stage: CommunityStage;
  interests: CommunityInterest[];
  reason: string;
  affiliation: string;
  agreedToRules: boolean;
  /**
   * Honeypot. Always empty when a person fills the form in; the server treats
   * a non-empty value as a bot and quietly discards the submission.
   */
  website?: string;
}

/** The only part that survives the submit. */
export interface RememberedApplication {
  firstName: string;
  submittedAt: string;
}

const STORAGE_KEY = "cairn-community-application";

/**
 * A localStorage-backed store shaped for `useSyncExternalStore`: the parsed
 * value is cached so `getSnapshot` returns a stable reference, and every write
 * notifies subscribers. localStorage itself can throw (private mode, storage
 * full) — treated as "nothing remembered" on read and as a lost-but-harmless
 * persist on write, so the journey never breaks.
 */
function createStore<T>(key: string) {
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
    /** The server never has an application — the page renders the empty form. */
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
        // The in-memory value still drives the UI; it just won't survive a
        // reload.
      }
      listeners.forEach((l) => l());
    },
  };
}

const store = createStore<RememberedApplication>(STORAGE_KEY);

export function useRememberedApplication(): RememberedApplication | null {
  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );
}

/**
 * Sends the application, then remembers only that it happened.
 *
 * @throws Error with a user-facing message when the API rejects the
 *   application or the network fails; nothing is remembered in that case.
 */
export async function submitApplication(input: ApplicationInput): Promise<void> {
  let res: Response;
  let data: { error?: string };
  try {
    res = await fetch("/api/community/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    data = await res.json();
  } catch {
    throw new Error(
      "Something went wrong. Please check your connection and try again."
    );
  }
  if (!res.ok) {
    throw new Error(data.error ?? "Something went wrong. Please try again.");
  }
  store.set({
    firstName: input.firstName,
    submittedAt: new Date().toISOString(),
  });
}

export function forgetApplication(): void {
  store.set(null);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
