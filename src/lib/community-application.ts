"use client";

import { useSyncExternalStore } from "react";
import type { CommunityInterest, CommunityPathway, CommunityStage } from "./community";

/**
 * Client-side state for the community application journey.
 *
 * What gets remembered on the device is a marker and nothing else: the date
 * the application was sent and the date the marker expires. Not the name, not
 * the email, not the pathway or stage, and not the "why do you want to join"
 * answer. Browsers are shared: a partner, a flatmate or a family member opening
 * this page should learn nothing beyond "an application was sent from this
 * browser". The marker is what lets a returning applicant see that their
 * application was received instead of an empty form, and it is described in
 * the cookie policy under its key name, so the key and the shape here must
 * match that description.
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
   * Explicit consent to store the health-related content of the application
   * (the free-text answer, pathway and stage). Separate from the rules
   * checkbox; the server rejects the application unless it is exactly `true`.
   */
  healthDataConsent: boolean;
  /**
   * Honeypot. Always empty when a person fills the form in; the server treats
   * a non-empty value as a bot and quietly discards the submission.
   */
  website?: string;
}

/**
 * The only part that survives the submit. Both values are ISO 8601 strings.
 * `expiresAt` is `submittedAt` plus REMEMBER_DAYS; after that the marker is
 * treated as absent and removed.
 */
export interface RememberedApplication {
  submittedAt: string;
  expiresAt: string;
}

const STORAGE_KEY = "cairn-community-application";
const REMEMBER_DAYS = 30;
const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Accepts only the current shape, unexpired. Anything else is treated as
 * absent: an expired marker, a value that fails to parse, or a legacy value
 * from before September 2026, which held the applicant's first name and no
 * expiry. Returning null for a legacy value makes the store remove it.
 */
function readRemembered(raw: unknown): RememberedApplication | null {
  if (typeof raw !== "object" || raw === null) return null;
  const value = raw as Record<string, unknown>;
  if ("firstName" in value) return null;
  const { submittedAt, expiresAt } = value;
  if (typeof submittedAt !== "string" || typeof expiresAt !== "string") return null;
  const expires = Date.parse(expiresAt);
  if (Number.isNaN(expires) || expires <= Date.now()) return null;
  return { submittedAt, expiresAt };
}

/**
 * A localStorage-backed store shaped for `useSyncExternalStore`: the parsed
 * value is cached so `getSnapshot` returns a stable reference, and every write
 * notifies subscribers. localStorage itself can throw (private mode, storage
 * full), which is treated as "nothing remembered" on read and as a
 * lost-but-harmless persist on write, so the journey never breaks.
 *
 * `read` validates whatever is found under the key. If it returns null for a
 * value that was present, the stored value is removed rather than left behind.
 */
function createStore<T>(key: string, read: (raw: unknown) => T | null) {
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
          cache = raw ? read(JSON.parse(raw)) : null;
          if (raw && cache === null) {
            window.localStorage.removeItem(key);
          }
        } catch {
          cache = null;
        }
      }
      return cache;
    },
    /** The server never has an application: the page renders the empty form. */
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

const store = createStore<RememberedApplication>(STORAGE_KEY, readRemembered);

export function useRememberedApplication(): RememberedApplication | null {
  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );
}

/**
 * Sends the application, then remembers only that it happened and for how
 * long to remember it.
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
  const submitted = new Date();
  store.set({
    submittedAt: submitted.toISOString(),
    expiresAt: new Date(submitted.getTime() + REMEMBER_DAYS * DAY_MS).toISOString(),
  });
}

export function forgetApplication(): void {
  store.set(null);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
