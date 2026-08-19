import { NextResponse } from "next/server";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import {
  isGuardFailure,
  readEnumArray,
  readJsonBody,
  readString,
  withSupabase,
} from "@/lib/api-guard";
import {
  INTEREST_VALUES,
  PATHWAY_VALUES,
  STAGE_VALUES,
  type CommunityInterest,
  type CommunityPathway,
  type CommunityStage,
} from "@/lib/community";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Enough that a person has actually said something; short enough not to be a wall. */
const REASON_MIN = 40;
const REASON_MAX = 1500;

/**
 * Links in a "why do you want to join" answer are, without exception so far,
 * spam. Real applicants describe their situation; they do not cite sources.
 */
const LINK_PATTERN = /(https?:\/\/|www\.|\[url|<a\s)/i;

/**
 * Applications to join the community.
 *
 * What this endpoint deliberately does not do is decide anything. It records
 * an application as `pending` and stops. Approval happens elsewhere, by a
 * person, with a key this deployment does not hold — which is why a bug here
 * cannot let anyone into the group.
 *
 * The bot defences below (honeypot, rate limit, link rejection, strict field
 * validation) exist to keep the review queue readable, not to be the security
 * boundary. The security boundary is the human who reads it.
 */
export async function POST(request: Request) {
  // Two tiers, because the two things being limited are different. The outer
  // one is generous: someone who mistypes an email, forgets the checkbox, then
  // writes a longer answer has made three requests and done nothing wrong, and
  // locking them out of a form they have just written a paragraph into is its
  // own kind of harm. The inner one, further down, is tight, and only a
  // request that is about to reach the database ever spends it.
  const attempts = rateLimit(`community-apply:${clientKey(request)}`, 15, 10 * 60_000);
  if (!attempts.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a little and try again." },
      { status: 429, headers: { "Retry-After": String(attempts.retryAfter) } }
    );
  }

  const parsed = await readJsonBody(request);
  if (isGuardFailure(parsed)) return parsed.response;
  const { body } = parsed;

  // Honeypot: a field no human sees and no human fills. Answer as though the
  // application were accepted — a bot that learns it was caught adapts.
  if (readString(body, "website", 200) !== "") {
    return NextResponse.json({ status: "received" });
  }

  const firstName = readString(body, "firstName", 80);
  if (firstName.length === 0) {
    return NextResponse.json(
      { error: "Tell us your first name so we know what to call you." },
      { status: 400 }
    );
  }

  const email = readString(body, "email", 254).toLowerCase();
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: "That email doesn't look right — check it and try again." },
      { status: 400 }
    );
  }

  const pathway = readString(body, "pathway", 40) as CommunityPathway;
  if (!(PATHWAY_VALUES as string[]).includes(pathway)) {
    return NextResponse.json(
      { error: "Pick the path that fits — 'still deciding' counts." },
      { status: 400 }
    );
  }

  const stage = readString(body, "stage", 40) as CommunityStage;
  if (!(STAGE_VALUES as string[]).includes(stage)) {
    return NextResponse.json(
      { error: "Let us know where you are in the journey." },
      { status: 400 }
    );
  }

  const interests = readEnumArray<CommunityInterest>(body, "interests", INTEREST_VALUES, 10);

  const reason = readString(body, "reason", REASON_MAX);
  if (reason.length < REASON_MIN) {
    return NextResponse.json(
      {
        error:
          "Please say a little more about why you'd like to join — a couple of sentences is plenty. A person reads this.",
      },
      { status: 400 }
    );
  }
  if (LINK_PATTERN.test(reason)) {
    return NextResponse.json(
      { error: "Please write this in your own words, without links." },
      { status: 400 }
    );
  }

  const affiliation = readString(body, "affiliation", 300);

  if (body.agreedToRules !== true) {
    return NextResponse.json(
      { error: "Please read and accept the group rules before applying." },
      { status: 400 }
    );
  }

  // Everything below this line writes. A person applies once; four complete,
  // valid applications from one address in ten minutes is a script.
  const writes = rateLimit(`community-apply-write:${clientKey(request)}`, 4, 10 * 60_000);
  if (!writes.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a little and try again." },
      { status: 429, headers: { "Retry-After": String(writes.retryAfter) } }
    );
  }

  const result = await withSupabase("community application", (supabase) =>
    supabase.rpc("submit_community_application", {
      p_email: email,
      p_first_name: firstName,
      p_pathway: pathway,
      p_stage: stage,
      p_interests: interests,
      p_reason: reason,
      p_affiliation: affiliation || null,
    })
  );

  if (result.error) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  // Identical whether this is a first application, a repeat, or an address
  // that was declined before. Nobody gets to probe this endpoint to learn
  // whether a given person is doing IVF.
  return NextResponse.json({ status: "received" });
}
