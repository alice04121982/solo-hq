import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * The server-side Supabase client, used by the API routes.
 *
 * It holds the **anon** key, and that key can do nothing on its own: every
 * table in `supabase/migrations` has row-level security on with no policies
 * and explicit `revoke all` for the anon role. The only things the anon role
 * may do are execute the handful of `security definer` functions the
 * migrations grant it — submit a waitlist signup, submit an application, check
 * an invite, redeem an invite.
 *
 * That is the whole point of the design: if this key leaks, or an API route is
 * compromised, an attacker still cannot read the waitlist, read applications,
 * approve anyone, or mint an invite. Those need the service-role key, which
 * lives only on a reviewer's machine for scripts/community-admin.ts and is
 * never set on the deployed app.
 *
 * The service-role key must never be added to this file.
 */
export function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY must be set.");
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
