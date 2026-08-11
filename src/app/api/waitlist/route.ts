import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = typeof body === "object" && body !== null && "email" in body
    ? String((body as { email: unknown }).email).trim().toLowerCase()
    : "";

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from("waitlist_signups").insert({ email });

  if (error) {
    // 23505 = unique_violation — already on the list, not a failure from the
    // signer-upper's point of view.
    if (error.code === "23505") {
      return NextResponse.json({ status: "already-joined" });
    }
    console.error("waitlist insert failed", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ status: "joined" });
}
