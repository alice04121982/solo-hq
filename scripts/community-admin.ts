/**
 * Community review desk.
 *
 * Run with `npm run community -- <command>` (Node 22.6+ — executes TypeScript
 * directly via type stripping). This is the only thing in the repository that
 * can approve someone, mint an invite, or read what applicants wrote.
 *
 *   npm run community -- list [pending|approved|declined|joined|removed]
 *   npm run community -- show    <email>
 *   npm run community -- approve <email>
 *   npm run community -- decline <email> ["note"]
 *   npm run community -- remove  <email> ["note"]
 *   npm run community -- purge
 *
 * `list` runs the retention purge before it prints, and `purge` runs it on
 * its own. The purge itself lives in the database
 * (supabase/migrations/0004_community_retention.sql) and runs there every
 * night under pg_cron; this script only asks for it and prints the counts.
 *
 * ── Why it is a local script and not an admin page ──
 * An admin page needs authentication, and authentication on a site that
 * otherwise has none is a new attack surface guarding the most sensitive data
 * here: a list of people going through IVF and what they wrote about it. A
 * local script needs no login because it is not reachable. It runs with the
 * service-role key, which bypasses row-level security entirely.
 *
 * ── Handling the secret key ──
 * SUPABASE_SECRET_KEY (an `sb_secret_…` key; the legacy
 * SUPABASE_SERVICE_ROLE_KEY JWT is still accepted) belongs in
 * ~/Developer/cairn/.env.local (git-ignored) and NOWHERE ELSE. Never add it
 * to Vercel, never put it in a folder that syncs to iCloud, never paste it
 * into a chat or an issue, and rotate it in the Supabase dashboard if it is
 * ever exposed. The deployed app has no use for it: the site runs on the
 * publishable key, which cannot read a single row of any of these tables.
 */
import { readFileSync } from "node:fs";
import { createHash, randomBytes } from "node:crypto";

/* ── Config ────────────────────────────────────────────────────────────── */

/** Loads .env.local so the key never has to be typed on a command line, where
 *  it would land in shell history. */
function loadEnvFile(path = ".env.local") {
  let contents: string;
  try {
    contents = readFileSync(path, "utf8");
  } catch {
    return;
  }
  for (const line of contents.split("\n")) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (process.env[key] !== undefined) continue;
    process.env[key] = rawValue.replace(/^["']|["']$/g, "");
  }
}

loadEnvFile();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://cairnfertility.vercel.app";

/** Invite lifetime. Long enough to catch someone on holiday, short enough
 *  that a token sitting in a mailbox or a log stops working soon. Stated on
 *  the site as "seven days" in src/lib/community.ts — change both together. */
const INVITE_TTL_DAYS = 7;

/**
 * Retention schedule, in days. Repeated here for the messages this script
 * prints; it is ENFORCED in public.purge_community_data() (migration 0004)
 * and mirrored for the app in src/lib/retention.ts. This script shares no
 * module with the app on purpose, so the numbers are typed out again. Change
 * all three together, and the privacy policy with them.
 */
const RETENTION_DAYS = {
  declined: 30,
  unreviewed: 90,
  approvedUnused: 30,
  joinedFreeText: 90,
  removedDetails: 30,
  spentInvite: 30,
} as const;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    "SUPABASE_URL and SUPABASE_SECRET_KEY must be set (put them in .env.local)."
  );
  process.exit(1);
}

/* ── Minimal PostgREST client ──────────────────────────────────────────── */

/**
 * Hand-rolled rather than @supabase/supabase-js so this script shares no code
 * path with the deployed app: nothing here can be imported into the site by
 * accident, and the service-role key never touches a module the bundler sees.
 */
async function rest(
  path: string,
  init: RequestInit & { prefer?: string } = {}
): Promise<unknown> {
  const { prefer, ...rest } = init;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...rest,
    headers: {
      apikey: SERVICE_KEY!,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      ...(prefer ? { Prefer: prefer } : {}),
      ...rest.headers,
    },
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Supabase ${res.status}: ${text.slice(0, 500)}`);
  }
  return text ? JSON.parse(text) : null;
}

interface Application {
  id: string;
  created_at: string;
  email: string;
  first_name: string;
  pathway: string;
  stage: string;
  interests: string[];
  reason: string | null;
  affiliation: string | null;
  status: string;
  reviewed_at: string | null;
  review_note: string | null;
  /** Added by migration 0003. Null on rows that predate the consent box. */
  health_data_consent_at?: string | null;
}

/** The one row public.purge_community_data() returns. */
interface PurgeCounts {
  declined_deleted: number;
  unreviewed_deleted: number;
  approved_unused_deleted: number;
  joined_cleared: number;
  removed_cleared: number;
  invites_deleted: number;
}

const encode = (value: string) => encodeURIComponent(value);

async function findByEmail(email: string): Promise<Application> {
  const rows = (await rest(
    `community_applications?email=eq.${encode(email.trim().toLowerCase())}&limit=1`
  )) as Application[];
  if (!rows.length) {
    throw new Error(`No application found for ${email}.`);
  }
  return rows[0];
}

async function setStatus(id: string, status: string, note?: string) {
  await rest(`community_applications?id=eq.${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      status,
      reviewed_at: new Date().toISOString(),
      ...(note ? { review_note: note } : {}),
    }),
    prefer: "return=minimal",
  });
}

/* ── Commands ──────────────────────────────────────────────────────────── */

async function list(status = "pending") {
  // Apply the retention schedule before showing anything, so the list never
  // contains a row the policy says should already be gone (for instance if
  // the project was paused and the nightly job did not fire).
  await purge({ quiet: true });

  const rows = (await rest(
    `community_applications?status=eq.${encode(status)}&order=created_at.asc` +
      `&select=email,first_name,pathway,stage,created_at,affiliation,health_data_consent_at`
  )) as Application[];

  if (!rows.length) {
    console.log(`No ${status} applications.`);
    return;
  }
  console.log(`${rows.length} ${status} application(s):\n`);
  for (const row of rows) {
    const flags = [
      row.affiliation ? "⚑ declared sector connection" : "",
      row.health_data_consent_at ? "" : "legacy: no recorded consent",
    ].filter(Boolean);
    const flag = flags.length ? `  ${flags.join("; ")}` : "";
    console.log(
      `  ${row.created_at.slice(0, 10)}  ${row.first_name.padEnd(14)} ` +
        `${row.email.padEnd(32)} ${row.pathway} / ${row.stage}${flag}`
    );
  }
  console.log(`\nRead one in full:  npm run community -- show <email>`);
}

async function show(email: string) {
  const app = await findByEmail(email);
  console.log(`
  Name        ${app.first_name}
  Email       ${app.email}
  Applied     ${app.created_at}
  Pathway     ${app.pathway}
  Stage       ${app.stage}
  Interests   ${app.interests.join(", ") || "—"}
  Sector      ${app.affiliation ?? "not declared"}
  Status      ${app.status}${app.review_note ? ` (${app.review_note})` : ""}

  Why they want to join
  ---------------------
  ${(app.reason ?? "—").replace(/\n/g, "\n  ")}
`);
}

async function approve(email: string) {
  const app = await findByEmail(email);
  if (app.status === "joined") {
    console.log(`${app.email} has already joined. Nothing to do.`);
    return;
  }

  // Same construction as src/lib/community-invite.ts: 32 random bytes, stored
  // only as a SHA-256 hash. The token below is the one copy that will ever
  // exist — it is not recoverable from the database.
  const token = randomBytes(32).toString("base64url");
  const tokenHash = createHash("sha256").update(token, "utf8").digest("hex");
  const expiresAt = new Date(Date.now() + INVITE_TTL_DAYS * 86_400_000);

  await rest("community_invites", {
    method: "POST",
    body: JSON.stringify({
      application_id: app.id,
      token_hash: tokenHash,
      expires_at: expiresAt.toISOString(),
    }),
    prefer: "return=minimal",
  });
  await setStatus(app.id, "approved");

  console.log(`
  Approved ${app.first_name} <${app.email}>.

  Send them this link, to that address and no other. It works once, it
  expires ${expiresAt.toISOString().slice(0, 10)}, and it only opens for
  someone who can also type that email address.

    ${SITE_ORIGIN}/community/join/${token}

  This is the only time the link is shown. If you lose it, run approve again
  to issue a fresh one — old invites keep working until they expire, so
  revoke the lost one with:  npm run community -- remove ${app.email}
`);
}

/**
 * The decline email, ready to paste. The wording is contract C5 in the Phase
 * 3 plan and is repeated in docs/community-runbook.md; change both together.
 * It mentions "within 30 days" because that is RETENTION_DAYS.declined.
 */
function declineEmail(firstName: string): string {
  return (
    `Hello ${firstName}. Thank you for applying to the CairnFertility community. ` +
    `We are not able to offer you a place at the moment. Your application will be ` +
    `deleted within 30 days. If you have questions, reply to this email.`
  );
}

async function decline(email: string, note?: string) {
  const app = await findByEmail(email);
  await setStatus(app.id, "declined", note);
  console.log(`
  Declined ${app.email}. Everything they wrote is deleted automatically
  ${RETENTION_DAYS.declined} days from now by the nightly purge.

  Now tell them. Send this to ${app.email}, from hello@cairnfertility.com,
  and nothing more; do not include the note above.

    Subject: Your CairnFertility community application

    ${declineEmail(app.first_name)}
`);
}

async function remove(email: string, note?: string) {
  const app = await findByEmail(email);
  // Revoke first: an unredeemed invite left live would let a removed member
  // walk back in.
  await rest(`community_invites?application_id=eq.${app.id}&redeemed_at=is.null`, {
    method: "PATCH",
    body: JSON.stringify({ revoked_at: new Date().toISOString() }),
    prefer: "return=minimal",
  });
  await setStatus(app.id, "removed", note);
  console.log(`
  Removed ${app.email} and revoked any unused invite.

  This does NOT remove them from the group itself — do that in the ${
    process.env.NEXT_PUBLIC_COMMUNITY_PLATFORM ?? "WhatsApp"
  }
  admin controls now, and rotate the group's join link afterwards if the
  removal was for sharing it.

  Everything except their email and status is cleared ${RETENTION_DAYS.removedDetails} days from
  now by the nightly purge. The email stays so the address cannot re-apply.
`);
}

/**
 * Retention. Asks the database to apply the schedule the privacy policy
 * states (public.purge_community_data, migration 0004) and prints what it
 * did. The same function runs every night under pg_cron, so running this by
 * hand is never required; it is here for "I want it gone now" and for the
 * days after a paused project is resumed.
 *
 * Nothing is computed client-side: the periods live in the database function
 * so the nightly job and this command can never disagree.
 */
async function purge(options: { quiet?: boolean } = {}): Promise<PurgeCounts> {
  const rows = (await rest("rpc/purge_community_data", {
    method: "POST",
    body: "{}",
  })) as PurgeCounts[];
  const counts = rows[0];
  if (!counts) {
    throw new Error("purge_community_data returned no row. Has migration 0004 been applied?");
  }

  const total =
    counts.declined_deleted +
    counts.unreviewed_deleted +
    counts.approved_unused_deleted +
    counts.joined_cleared +
    counts.removed_cleared +
    counts.invites_deleted;

  if (options.quiet) {
    if (total > 0) {
      console.log(`Retention purge applied first: ${total} change(s). Run purge to see them.\n`);
    }
    return counts;
  }

  console.log(`
  Retention purge applied.

    Declined, deleted (${RETENTION_DAYS.declined} days after the decision)        ${counts.declined_deleted}
    Never reviewed, deleted (${RETENTION_DAYS.unreviewed} days after applying)        ${counts.unreviewed_deleted}
    Approved, invite unused, deleted (${RETENTION_DAYS.approvedUnused} days after)   ${counts.approved_unused_deleted}
    Joined, free text cleared (${RETENTION_DAYS.joinedFreeText} days after applying)  ${counts.joined_cleared}
    Removed, details cleared (${RETENTION_DAYS.removedDetails} days after removal)    ${counts.removed_cleared}
    Invites deleted (${RETENTION_DAYS.spentInvite} days after spent or expired)      ${counts.invites_deleted}

  The same purge runs in the database every night at 03:15 UTC.
`);
  return counts;
}

/* ── Dispatch ──────────────────────────────────────────────────────────── */

const [command, ...args] = process.argv.slice(2);

const USAGE = `
  npm run community -- list [status]        applications awaiting review (default: pending); runs the purge first
  npm run community -- show    <email>      read one application in full
  npm run community -- approve <email>      mint a single-use invite and print it
  npm run community -- decline <email> [note]   mark declined and print the email to send
  npm run community -- remove  <email> [note]   revoke invites and mark removed
  npm run community -- purge                apply the retention schedule now (it also runs nightly)
`;

/**
 * One catch for every command, so a failure reads as a sentence rather than a
 * stack trace. Nothing here should ever print a Supabase response verbatim —
 * `rest()` already truncates, and error messages must stay free of applicant
 * data, since this output gets pasted into chats and issues.
 */
async function main() {
  switch (command) {
    case "list":
      await list(args[0]);
      break;
    case "show":
      if (!args[0]) throw new Error("An email address is required.");
      await show(args[0]);
      break;
    case "approve":
      if (!args[0]) throw new Error("An email address is required.");
      await approve(args[0]);
      break;
    case "decline":
      if (!args[0]) throw new Error("An email address is required.");
      await decline(args[0], args[1]);
      break;
    case "remove":
      if (!args[0]) throw new Error("An email address is required.");
      await remove(args[0], args[1]);
      break;
    case "purge":
      await purge();
      break;
    default:
      console.log(USAGE);
      process.exit(command ? 1 : 0);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
