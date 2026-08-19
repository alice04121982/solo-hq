import { NextResponse } from "next/server";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import {
  isGuardFailure,
  readJsonBody,
  readString,
  safeLog,
  withSupabase,
} from "@/lib/api-guard";
import {
  getCommunityInviteUrl,
  hashToken,
  isWellFormedToken,
} from "@/lib/community-invite";

const INVALID_MESSAGE =
  "That invite link isn't valid any more. Invites work once, expire after seven days, and only open with the email address they were sent to.";

/**
 * Redeems an invite and, only then, hands back the group link.
 *
 * Two things have to be true at once: the token must be live, and the email
 * must be the one it was issued to. That pairing is what makes a leaked token
 * survivable. Invite links travel through email and land in browser history
 * and in the hosting platform's request logs; assuming the token alone will
 * stay secret would be wishful. Needing the address it was issued to means a
 * token found in a log is not a way in.
 *
 * This is a POST for a reason. The link in the invite email is a GET, and GETs
 * get followed by things that are not the recipient — mail scanners, link
 * previewers, corporate security proxies. If GET burned the invite, half of
 * them would be dead before anyone clicked. So GET renders a page, and only a
 * deliberate submit spends the token.
 */
export async function POST(request: Request) {
  const parsed = await readJsonBody(request);
  if (isGuardFailure(parsed)) return parsed.response;
  const { body } = parsed;

  const token = readString(body, "token", 64);
  const email = readString(body, "email", 254).toLowerCase();

  // Two buckets. The per-IP one slows someone working through email guesses
  // from one place; the per-token one holds even if they spread out, because
  // the token is the thing being attacked and it cannot move.
  const perIp = rateLimit(`community-join-ip:${clientKey(request)}`, 10, 10 * 60_000);
  const perToken = rateLimit(
    `community-join-token:${isWellFormedToken(token) ? hashToken(token) : "malformed"}`,
    5,
    15 * 60_000
  );
  if (!perIp.ok || !perToken.ok) {
    const retryAfter = Math.max(perIp.retryAfter, perToken.retryAfter);
    return NextResponse.json(
      { error: "Too many attempts. Please wait a little and try again." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  if (!isWellFormedToken(token) || email === "") {
    return NextResponse.json({ error: INVALID_MESSAGE }, { status: 400 });
  }

  const { data, error } = await withSupabase("community invite redemption", (supabase) =>
    supabase.rpc("redeem_community_invite", {
      p_token_hash: hashToken(token),
      p_email: email,
    })
  );

  if (error) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  if (data !== true) {
    // One message for an expired invite, a used one, an unknown one, and the
    // right token with the wrong email. Distinguishing them would let someone
    // holding a token work out whose it is.
    return NextResponse.json({ error: INVALID_MESSAGE }, { status: 400 });
  }

  let inviteUrl: string;
  try {
    inviteUrl = getCommunityInviteUrl();
  } catch (err) {
    // The invite is already spent at this point, so this needs to be loud: the
    // fix is to set the variable and re-issue that person an invite.
    safeLog("community invite url", err);
    return NextResponse.json(
      {
        error:
          "We couldn't open the door just now. Please email us and we'll sort it out straight away.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ status: "joined", inviteUrl });
}
