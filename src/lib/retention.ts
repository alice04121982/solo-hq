/**
 * Retention schedule for community data, in days.
 *
 * These numbers MIRROR supabase/migrations/0004_community_retention.sql,
 * which is where the schedule is actually enforced (nightly, by pg_cron, and
 * on demand by scripts/community-admin.ts, which repeats them again because
 * it deliberately shares no module with the app). The privacy policy in
 * src/lib/legal.ts states the same periods as literal text.
 *
 * Change all of them together, or the site will promise one thing and the
 * database will do another. `grep -n "30 days\|90 days"` across legal.ts,
 * migration 0004 and this file is the check.
 */
export const RETENTION_DAYS = {
  /** Declined: whole record deleted this many days after the decision. */
  declined: 30,
  /** Pending and never reviewed: whole record deleted this many days after applying. */
  unreviewed: 90,
  /** Approved but the invite was never used: whole record deleted this many days after approval. */
  approvedUnused: 30,
  /** Joined: free text and sector declaration cleared this many days after applying. */
  joinedFreeText: 90,
  /** Removed: everything except email and status cleared this many days after removal. */
  removedDetails: 30,
  /** Invites: deleted this many days after being used, revoked or expiring. */
  spentInvite: 30,
} as const;

/**
 * Invite lifetime. Stated on the site as "seven days" (src/lib/community.ts)
 * and repeated in scripts/community-admin.ts. Change all three together.
 */
export const INVITE_TTL_DAYS = 7;
