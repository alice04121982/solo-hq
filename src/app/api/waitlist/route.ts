import { NextResponse } from "next/server";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { isGuardFailure, readJsonBody, readString, withSupabase } from "@/lib/api-guard";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * The email-only waitlist behind /waitlist.
 *
 * One response for every outcome that isn't a malformed request. An earlier
 * version answered "already-joined" for a duplicate, which turned this
 * endpoint into a way for anyone with an email address to find out whether
 * that person is waiting to join a fertility community. Being slightly less
 * chatty is worth more than the confirmation message it cost.
 */
export async function POST(request: Request) {
  const limit = rateLimit(`waitlist:${clientKey(request)}`, 5, 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  const parsed = await readJsonBody(request);
  if (isGuardFailure(parsed)) return parsed.response;

  const email = readString(parsed.body, "email", 254).toLowerCase();
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const result = await withSupabase("waitlist signup", (supabase) =>
    supabase.rpc("submit_waitlist_signup", { p_email: email })
  );

  if (result.error) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ status: "joined" });
}
