import { createClient } from "@supabase/supabase-js";

/**
 * Server-only client, used by API routes. The anon key is scoped by RLS to
 * insert-only on waitlist_signups (see supabase/migrations), so it never
 * needs the service role key even though it's read from a server env var.
 */
export function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY must be set.");
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
