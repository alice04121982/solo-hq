import { createClient } from "@supabase/supabase-js";

// Fallbacks prevent createClient from throwing during Next.js build-time module
// evaluation (e.g. generateStaticParams). Set the real values in Vercel env vars.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
