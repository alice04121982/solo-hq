import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * The server-side Supabase client, used by the API routes and the invite page.
 *
 * It holds the **publishable** key (`sb_publishable_…`), which replaces the
 * legacy anon JWT. Both are equally powerless against this schema: every
 * table in `supabase/migrations` has row-level security on with no policies
 * and an explicit `revoke all` for the anon role. The only things the key may
 * do are execute the handful of `security definer` functions the migrations
 * grant it: submit a waitlist signup, submit an application, check an invite,
 * redeem an invite.
 *
 * That is the whole point of the design: if this key leaks, or an API route is
 * compromised, an attacker still cannot read the waitlist, read applications,
 * approve anyone, or mint an invite. Those need the secret key, which lives
 * only on a reviewer's machine for scripts/community-admin.ts and is never set
 * on the deployed app.
 *
 * The publishable key is preferred over the legacy anon JWT because it can be
 * rotated on its own in the Supabase dashboard, without touching the secret
 * key. `SUPABASE_ANON_KEY` is still read as a fallback so an old environment
 * keeps working, but the legacy JWT keys should be disabled once the new one
 * is set (September 2026 audit, finding F-02).
 */
export function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY must be set.");
  }
  assertNotPrivileged(key);

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Refuses to start if a key that bypasses row-level security has been put in
 * the app's environment. That is the one mistake that would turn "an attacker
 * can write rows" into "an attacker can read the list". Cheap to check,
 * catastrophic to miss. The message names the fix and never the key.
 */
function assertNotPrivileged(key: string): void {
  if (key.startsWith("sb_secret_")) {
    throw new Error("A secret key is set on the app. Use the publishable key.");
  }
  if (!key.startsWith("eyJ")) return;

  let role: unknown;
  try {
    const payload = key.split(".")[1] ?? "";
    role = (JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { role?: unknown })
      .role;
  } catch {
    // Not a parseable JWT: let Supabase reject it with its own error.
    return;
  }
  if (role === "service_role") {
    throw new Error("The service-role key is set on the app. Use the publishable key.");
  }
}
