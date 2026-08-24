import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { Section } from "@/components/section";
import { BentoCard } from "@/components/bento-card";
import { CommunityJoinForm } from "@/components/community-join-form";
import { COMMUNITY_RULES, PHONE_NUMBER_NOTICE } from "@/lib/community";
import {
  getCommunityPlatform,
  hashToken,
  isWellFormedToken,
} from "@/lib/community-invite";
import { withSupabase } from "@/lib/api-guard";

/**
 * Where an approved member redeems their invite.
 *
 * The token is in the URL because it arrives by email and there is no other
 * way to carry it. Everything else on this page is built around that fact:
 *
 * - `noindex, nofollow` and no referrer, so the token is never handed to a
 *   search engine or to any other site.
 * - Nothing external loads here. No image CDN, no font from another origin,
 *   nothing that would put this URL in someone else's access log.
 * - Rendering the page is free. Only submitting the form spends the invite,
 *   so mail scanners and link previewers cannot burn it before its owner
 *   arrives.
 */

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your invite | CairnFertility Community",
  robots: { index: false, follow: false, nocache: true },
  referrer: "no-referrer",
};

interface PageProps {
  params: Promise<{ token: string }>;
}

type InviteStatus = "valid" | "used" | "expired" | "revoked" | "unknown" | "error";

async function readInviteStatus(token: string): Promise<InviteStatus> {
  // A malformed token never reaches the database — the shape is checkable
  // here, and a lookup that cannot possibly match is a lookup worth skipping.
  if (!isWellFormedToken(token)) return "unknown";

  const { data, error } = await withSupabase("community invite status", (supabase) =>
    supabase.rpc("community_invite_status", { p_token_hash: hashToken(token) })
  );
  if (error) return "error";
  return (data as InviteStatus) ?? "unknown";
}

/** One message for every way an invite can be dead, for the same reason the
 *  API gives one: a person holding a token should not learn whose it is. */
const DEAD_INVITE = {
  heading: "This invite isn't open any more.",
  body: "Invites work once and expire after seven days, so this one has either been used already or run out of time. If it was yours and you haven't been in yet, reply to the email we sent and we'll send a fresh one — it takes a minute.",
};

const ERROR_INVITE = {
  heading: "We couldn't check your invite.",
  body: "Something on our side is not answering. Your invite has not been used up — please try this link again in a few minutes, and email us if it keeps happening.",
};

export default async function CommunityJoinPage({ params }: PageProps) {
  const { token } = await params;
  const status = await readInviteStatus(token);
  const platform = getCommunityPlatform();

  if (status !== "valid") {
    const copy = status === "error" ? ERROR_INVITE : DEAD_INVITE;
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto px-6 md:px-12 lg:px-16">
          <SiteNav />
        </div>
        <Section band={0} padding="py-20 md:py-28">
          <div className="max-w-2xl">
            <h1
              className="font-sans font-bold text-foreground mb-5"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.08 }}
            >
              {copy.heading}
            </h1>
            <p className="text-lg font-sans text-muted leading-[1.65] mb-10" style={{ maxWidth: "54ch" }}>
              {copy.body}
            </p>
            <Link
              href="/community"
              className="inline-flex items-center justify-center gap-2 rounded-full border px-8 py-3.5 text-sm font-sans transition-colors duration-200 hover:bg-teal-10"
              style={{ borderColor: "var(--teal-35)", color: "var(--teal)" }}
            >
              Back to the community page
            </Link>
          </div>
        </Section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto px-6 md:px-12 lg:px-16">
        <SiteNav />
      </div>

      <Section band={0} padding="py-16 md:py-24">
        <div className="max-w-2xl">
          <p
            className="text-[13px] font-[500] uppercase font-sans mb-6"
            style={{ color: "var(--teal)", letterSpacing: "1.65px" }}
          >
            Your invite
          </p>
          <h1
            className="font-sans font-bold text-foreground mb-6"
            style={{ fontSize: "clamp(2.25rem, 4.5vw, 4rem)", lineHeight: 1.06 }}
          >
            You&rsquo;re in — one last thing.
          </h1>
          <p className="text-lg font-sans text-muted leading-[1.65]" style={{ maxWidth: "56ch" }}>
            Someone read your application and said yes. Before we open the
            door: the rules again, short, and the one thing about group
            messaging you should know before you type your first message.
          </p>
        </div>
      </Section>

      <Section band={1}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <h2
              className="font-sans font-bold text-foreground mb-6"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)", lineHeight: 1.1 }}
            >
              The rules, in short.
            </h2>
            <ul className="space-y-5 mb-10">
              {COMMUNITY_RULES.map((rule) => (
                <li key={rule.title} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                    style={{ background: "var(--lavender-dark)" }}
                  />
                  <p className="text-sm font-sans text-foreground leading-relaxed">
                    {rule.title}
                  </p>
                </li>
              ))}
            </ul>
            <Link
              href="/community/guidelines"
              className="text-sm font-sans text-teal underline decoration-teal/35 underline-offset-4 hover:decoration-teal transition-colors"
            >
              Read them in full
            </Link>

            <div
              className="mt-10 rounded-2xl border p-5"
              style={{ borderColor: "var(--card-border)", background: "var(--card-bg)" }}
            >
              <p className="text-sm font-sans text-foreground leading-relaxed">
                {PHONE_NUMBER_NOTICE}
              </p>
            </div>
          </div>

          <BentoCard className="lg:sticky lg:top-8">
            <div className="p-6 md:p-8">
              <CommunityJoinForm token={token} platform={platform} />
            </div>
          </BentoCard>
        </div>
      </Section>
    </main>
  );
}
