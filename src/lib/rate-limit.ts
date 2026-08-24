import "server-only";

/**
 * A small fixed-window rate limiter for the public write endpoints.
 *
 * Honest about what it is: the counters live in the memory of one serverless
 * instance, so a client spread across enough cold starts gets more requests
 * than the numbers below suggest, and a redeploy resets everything. It raises
 * the cost of casual scripted abuse; it is not a defence against a determined
 * distributed attacker.
 *
 * The real control at that level is edge-side, before a function is invoked —
 * Vercel's firewall rate-limit rules on /api/community/*. This limiter is the
 * backstop that works regardless of platform config, and the reason the app
 * degrades safely if that config is ever lost. See docs/security-review.md.
 */

interface Window {
  count: number;
  resetAt: number;
}

const windows = new Map<string, Window>();

/** Stops the map growing without bound on a long-lived instance. */
function sweep(now: number) {
  if (windows.size < 5_000) return;
  for (const [key, w] of windows) {
    if (w.resetAt <= now) windows.delete(key);
  }
}

export interface RateLimitResult {
  ok: boolean;
  /** Seconds until the window resets — sent as Retry-After on a 429. */
  retryAfter: number;
}

/**
 * @param key    Caller-scoped bucket, e.g. `apply:${ip}`. Callers must namespace
 *               their own keys; this function does not.
 * @param limit  Requests allowed per window.
 * @param windowMs Window length in milliseconds.
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = windows.get(key);
  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  existing.count += 1;
  if (existing.count > limit) {
    return { ok: false, retryAfter: Math.ceil((existing.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

/**
 * Best-effort client address for rate-limit bucketing.
 *
 * `x-forwarded-for` is client-controlled in general, but on Vercel the edge
 * rewrites it, so the left-most entry is the real peer. Only ever used as a
 * bucket key — never stored, never logged, never treated as identity. Requests
 * with no usable address share one bucket rather than bypassing the limit.
 */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first && first.length <= 45 ? first : "unknown";
}
