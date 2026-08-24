import "server-only";
import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";

/**
 * Shared front-door checks for the public write endpoints.
 *
 * There are no sessions or cookies on this site, so classic CSRF has nothing
 * to steal. What these checks actually buy is that the endpoints can only be
 * driven from this site's own pages: a form on someone else's domain cannot
 * post to them, and neither can a page that has embedded ours in a frame. That
 * matters for endpoints whose cost is a row in a database and a person's time
 * reading it.
 */

const MAX_BODY_BYTES = 8 * 1024;

/**
 * True when the request's Origin is this site's own origin.
 *
 * Compared against the host the request actually arrived on rather than a
 * configured allowlist, deliberately: an allowlist fails closed the day a new
 * domain is attached, and a silently broken application form on a fertility
 * site is a worse outcome than a slightly looser check. A request with no
 * Origin header at all (a curl, a server-to-server call) is allowed through —
 * the header is a browser guarantee, and its absence proves nothing.
 */
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!host) return true;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export type GuardFailure = { response: NextResponse };

function reject(message: string, status: number): GuardFailure {
  return { response: NextResponse.json({ error: message }, { status }) };
}

/**
 * Validates transport-level expectations and parses the body.
 *
 * Returns either the parsed body or a ready-made error response. Errors are
 * deliberately vague: a caller that is misusing the endpoint does not need to
 * be told precisely how.
 */
export async function readJsonBody(
  request: Request
): Promise<{ body: Record<string, unknown> } | GuardFailure> {
  // A cross-origin HTML form can only send urlencoded, plain-text, or
  // multipart bodies. Insisting on JSON means only a same-origin fetch (or a
  // deliberate non-browser client, which same-origin checks never stopped
  // anyway) can reach the handler.
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return reject("Unsupported content type.", 415);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return reject("Request too large.", 413);
  }

  if (!isSameOrigin(request)) {
    return reject("Request not allowed.", 403);
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return reject("Invalid request body.", 400);
  }
  // content-length can lie or be absent; this is the check that actually holds.
  if (raw.length > MAX_BODY_BYTES) {
    return reject("Request too large.", 413);
  }

  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return reject("Invalid request body.", 400);
    }
    return { body: parsed as Record<string, unknown> };
  } catch {
    return reject("Invalid request body.", 400);
  }
}

export function isGuardFailure(
  value: { body: Record<string, unknown> } | GuardFailure
): value is GuardFailure {
  return "response" in value;
}

/** Reads a string field, trimmed, with a hard length cap. */
export function readString(
  body: Record<string, unknown>,
  key: string,
  maxLength: number
): string {
  const value = body[key];
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

/** Reads a string array, keeping only values from an allowed set. */
export function readEnumArray<T extends string>(
  body: Record<string, unknown>,
  key: string,
  allowed: readonly T[],
  maxItems: number
): T[] {
  const value = body[key];
  if (!Array.isArray(value)) return [];
  const seen = new Set<T>();
  for (const item of value) {
    if (typeof item === "string" && (allowed as readonly string[]).includes(item)) {
      seen.add(item as T);
    }
    if (seen.size >= maxItems) break;
  }
  return [...seen];
}

/**
 * Never let a database error reach a caller verbatim: Postgres puts the
 * offending value in the detail of a unique violation, which for this site
 * means an email address in an HTTP response and in the platform's logs.
 */
export function safeLog(context: string, error: unknown): void {
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? String((error as { code: unknown }).code)
      : "unknown";
  console.error(`${context} failed`, { code });
}

/**
 * Runs one Supabase call with the error handling every route needs.
 *
 * Two failure modes collapse into one here: the database returning an error,
 * and the client failing to be built at all (a missing environment variable,
 * which is otherwise an unhandled throw and a bare 500 with no JSON body for
 * the form to read). Both are logged through `safeLog` and surface to the
 * caller as `error`, so no route has to remember to do either.
 */
export async function withSupabase<T>(
  context: string,
  run: (
    client: ReturnType<typeof getSupabaseServerClient>
  ) => PromiseLike<{ data: T; error: unknown }>
): Promise<{ data: T | null; error: unknown }> {
  try {
    const { data, error } = await run(getSupabaseServerClient());
    if (error) {
      safeLog(context, error);
      return { data: null, error };
    }
    return { data, error: null };
  } catch (err) {
    safeLog(context, err);
    return { data: null, error: err };
  }
}
