import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { Section } from "@/components/section";
import {
  COMMUNITY_RULES,
  PHONE_NUMBER_NOTICE,
  REMOVAL_GROUNDS,
} from "@/lib/community";

export const metadata: Metadata = {
  title: "Group Rules | CairnFertility Community",
  description:
    "The rules of the CairnFertility community: what stays in the group, how members treat each other, and what gets someone removed.",
};

/**
 * The community's rules, in full.
 *
 * Linked from the application form, from the invite redemption page, and from
 * the community page: the same text in all three places, so nobody can say
 * they agreed to something they never saw. Copy lives in `src/lib/community.ts`.
 *
 * This page is the canonical home of the phone-number notice, anchored at
 * #phone directly under rule 2 so that PHONE_NUMBER_LINE elsewhere can link
 * to it.
 */
export default function CommunityGuidelinesPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto px-6 md:px-12 lg:px-16">
        <SiteNav />
      </div>

      <Section band={0} padding="py-16 md:py-24" backdrop={{ shape: "dots", side: "right" }}>
        <div className="max-w-3xl">
          <p
            className="text-[13px] font-[500] uppercase font-sans mb-6"
            style={{ color: "var(--teal)", letterSpacing: "1.65px" }}
          >
            The group rules
          </p>
          <h1
            className="font-sans font-bold text-foreground mb-6"
            style={{ fontSize: "clamp(2.5rem, 4.5vw, 4.25rem)", lineHeight: 1.06 }}
          >
            Eight rules, and one that matters most.
          </h1>
          <p className="text-lg font-sans text-muted leading-[1.65]" style={{ maxWidth: "58ch" }}>
            People tell this group things they have not told their families.
            That only works if everyone here holds the same line. These are
            short on purpose: a code of conduct nobody finishes reading
            protects nobody.
          </p>
        </div>
      </Section>

      <Section band={1}>
        <ol className="max-w-3xl space-y-10">
          {COMMUNITY_RULES.map((rule, i) => (
            <li key={rule.title} className="flex items-start gap-5">
              <span
                className="font-sans font-medium text-lg leading-none shrink-0 mt-1"
                style={{ color: "var(--lavender-dark)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-sans font-medium text-foreground leading-tight mb-2">
                  {rule.title}
                </h2>
                <p
                  className="text-sm font-sans text-muted leading-relaxed"
                  style={{ maxWidth: "56ch" }}
                >
                  {rule.body}
                </p>
                {i === 1 && (
                  <p
                    id="phone"
                    className="text-sm font-sans text-foreground leading-relaxed mt-4 rounded-2xl p-4"
                    style={{ maxWidth: "56ch", background: "var(--cream)" }}
                  >
                    {PHONE_NUMBER_NOTICE}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
        <p
          className="max-w-3xl text-sm font-sans text-muted leading-relaxed mt-12"
          style={{ maxWidth: "56ch" }}
        >
          This group is peer support, not a support line. If you need help
          urgently, see{" "}
          <Link
            href="/support#crisis"
            className="text-teal underline decoration-teal/35 underline-offset-4 hover:decoration-teal transition-colors"
          >
            Looking after yourself
          </Link>
          .
        </p>
      </Section>

      <Section band={3}>
        <div className="max-w-3xl">
          <h2
            className="font-sans font-bold text-foreground mb-4"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3.25rem)", lineHeight: 1.1 }}
          >
            What gets someone removed.
          </h2>
          <p
            className="text-sm font-sans text-muted leading-relaxed mb-8"
            style={{ maxWidth: "52ch" }}
          >
            Listed so removal is never a surprise. Admins do not debate these,
            and nobody who reports something is asked to justify it.
          </p>
          <ul className="space-y-3 mb-10">
            {REMOVAL_GROUNDS.map((ground) => (
              <li
                key={ground}
                className="flex items-start gap-3 text-sm font-sans text-foreground"
              >
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ background: "var(--lavender-dark)" }}
                />
                {ground}
              </li>
            ))}
          </ul>
          <p
            className="text-sm font-sans text-muted leading-relaxed mb-10"
            style={{ maxWidth: "52ch" }}
          >
            Leaving is always allowed and never needs a reason. If you want
            your application deleted after you&rsquo;ve left, ask and it is
            gone.
          </p>

          <Link
            href="/community#apply"
            className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-sans font-medium transition-opacity duration-200 hover:opacity-90"
            style={{ background: "var(--accent)", color: "var(--on-accent)" }}
          >
            Apply to Join
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </main>
  );
}
