import "server-only";
import { createHash } from "node:crypto";

/**
 * Invite tokens: the only thing that opens the door to the group.
 *
 * A token is 32 random bytes, base64url-encoded, and the database stores only
 * its SHA-256 hash. That asymmetry is the point — a dump of the invites table
 * is a list of hashes, not a set of working invites, and nobody with read
 * access to the database can let themselves in.
 *
 * No salt and no slow KDF here, deliberately: those defend low-entropy secrets
 * against offline guessing. A 256-bit random token has nothing to guess, and a
 * plain hash keeps redemption a single indexed lookup.
 *
 * Tokens are minted in scripts/community-admin.ts, not here. That script runs
 * with the service-role key and must share no module with the deployed app —
 * the `server-only` import above is what enforces it, since the package throws
 * outside a server render. The two places that construct a token agree by
 * documented contract (32 random bytes, base64url, SHA-256 hex hash), and the
 * `isWellFormedToken` check below is what fails loudly if they ever drift.
 */

export function hashToken(token: string): string {
  return createHash("sha256").update(token, "utf8").digest("hex");
}

/**
 * Tokens arrive in a URL path, so anything that is not a base64url string of
 * the right length is rejected before it reaches the database. Length is
 * checked exactly: 32 bytes always encodes to 43 characters.
 */
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/;

export function isWellFormedToken(token: string): boolean {
  return TOKEN_PATTERN.test(token);
}

/**
 * Where an approved member actually ends up.
 *
 * Server-only, read at request time, and returned by exactly one code path:
 * a successful invite redemption. It must never be imported into a client
 * component, inlined into a page, or given a NEXT_PUBLIC_ name — that would
 * put the group's front door in the JavaScript bundle of a public website.
 */
export function getCommunityInviteUrl(): string {
  const url = process.env.COMMUNITY_INVITE_URL;
  if (!url) {
    throw new Error("COMMUNITY_INVITE_URL is not set.");
  }
  return url;
}

/**
 * The platform's display name, for copy that would otherwise lie when the
 * group moves. Public — it is a word, not a secret.
 */
export function getCommunityPlatform(): string {
  return process.env.NEXT_PUBLIC_COMMUNITY_PLATFORM?.trim() || "WhatsApp";
}
