import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Rate limiting for the public write endpoints.
 *
 * Counters live in Upstash Redis, shared by every instance and surviving
 * redeploys, so the numbers in the routes mean what they say. Add "Upstash
 * Redis" from the Vercel Marketplace and the two UPSTASH_REDIS_REST_*
 * variables appear on the project; nothing else is needed.
 *
 * If the store is not configured, or is unreachable for a request, the
 * per-instance limiter below takes over rather than letting requests through
 * unlimited. Degraded, never open. That fallback is honest about what it is:
 * counters in the memory of one serverless instance, reset on every cold
 * start. It raises the cost of casual scripted abuse and nothing more, which
 * is why the shared store is the real control. See docs/security-review.md.
 */

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

const limiters = new Map<string, Ratelimit>();

/** One Ratelimit per (limit, window) pair; the key passed to `limit()` is the bucket. */
function sharedLimiter(limit: number, windowMs: number): Ratelimit | null {
  if (!redis) return null;
  const id = `${limit}:${windowMs}`;
  let limiter = limiters.get(id);
  if (!limiter) {
    limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(limit, `${windowMs} ms`),
      prefix: "cairn:rl",
      analytics: false,
    });
    limiters.set(id, limiter);
  }
  return limiter;
}

export interface RateLimitResult {
  ok: boolean;
  /** Seconds until the window resets — sent as Retry-After on a 429. */
  retryAfter: number;
}

/**
 * @param key      Caller-scoped bucket, e.g. `apply:${ip}`. Callers must
 *                 namespace their own keys; this function does not.
 * @param limit    Requests allowed per window.
 * @param windowMs Window length in milliseconds.
 */
export async function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  const shared = sharedLimiter(limit, windowMs);
  if (shared) {
    try {
      const result = await shared.limit(key);
      return {
        ok: result.success,
        retryAfter: result.success
          ? 0
          : Math.max(1, Math.ceil((result.reset - Date.now()) / 1000)),
      };
    } catch {
      // Store unreachable: fall through to the local limiter.
    }
  }
  return localRateLimit(key, limit, windowMs);
}

/* ── Fallback: fixed window, in memory ─────────────────────────────────── */

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

function localRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
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
 * Vercel overwrites `x-forwarded-for` with the real peer, so it cannot be
 * spoofed from outside; `x-real-ip` is the same value without the list. Only
 * ever used as a bucket key — never stored, never logged, never treated as
 * identity. Requests with no usable address share one bucket rather than
 * bypassing the limit.
 */
export function clientKey(request: Request): string {
  const ip =
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return ip && ip.length <= 45 ? ip : "unknown";
}
