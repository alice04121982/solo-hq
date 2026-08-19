"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { isValidEmail } from "@/lib/community-application";

/**
 * The last step: confirm who you are, accept the rules again, and get the
 * group link.
 *
 * The email field is not paperwork. An invite link travels through a mail
 * server, sits in a browser history, and appears in the hosting platform's
 * request logs — so the token alone is not treated as proof of anything. The
 * address it was issued to is the second half, and this is where it is asked
 * for.
 *
 * The link that comes back is rendered into the page and never stored: no
 * localStorage, no URL, nothing left behind on a shared device once the tab
 * is closed.
 */
export function CommunityJoinForm({
  token,
  platform,
}: {
  token: string;
  platform: string;
}) {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Enter the email address your invite was sent to.");
      return;
    }
    if (!agreed) {
      setError("Please accept the group rules to go in.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/community/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setInviteUrl(data.inviteUrl as string);
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (inviteUrl) {
    return (
      <div>
        <span
          className="flex h-12 w-12 items-center justify-center rounded-full mb-6"
          style={{ background: "var(--accent)" }}
        >
          <Check className="h-6 w-6" strokeWidth={2.5} style={{ color: "var(--on-accent)" }} />
        </span>
        <h2
          className="font-sans font-bold text-foreground mb-3"
          style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", lineHeight: 1.15 }}
        >
          You&rsquo;re in.
        </h2>
        <p
          className="text-sm font-sans text-muted leading-relaxed mb-8"
          style={{ maxWidth: "48ch" }}
        >
          This button opens the group on your phone. Your invite is now used
          up, so please don&rsquo;t forward this page to anyone — send them to
          apply instead, and they&rsquo;ll get an invite of their own.
        </p>
        <a
          href={inviteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-sans font-medium transition-opacity duration-200 hover:opacity-90"
          style={{ background: "var(--accent)", color: "var(--on-accent)" }}
        >
          Open the group on {platform}
          <ArrowRight className="h-4 w-4" />
        </a>
        <p className="text-xs font-sans text-muted mt-6 leading-relaxed" style={{ maxWidth: "46ch" }}>
          Say hello when you get there — an admin will introduce you. If the
          button doesn&rsquo;t work on this device, open this page on the phone
          you use for {platform} before closing the tab.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label
        htmlFor="join-email"
        className="block text-[11px] font-[600] uppercase tracking-[0.15em] text-muted font-sans mb-2.5"
      >
        The email your invite was sent to
      </label>
      <input
        id="join-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        autoComplete="email"
        maxLength={254}
        className="w-full rounded-full border border-border bg-background px-5 py-3 text-sm font-sans text-foreground placeholder:text-muted/70 focus:outline-none focus:border-teal-35 transition-colors mb-6"
      />

      <div className="mb-7 rounded-2xl border border-border p-5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-teal"
          />
          <span className="text-sm font-sans text-foreground leading-relaxed">
            I agree to the group rules — above all, that nothing said in the
            group gets repeated outside it, and that I will not save or reuse
            anyone&rsquo;s phone number.
          </span>
        </label>
      </div>

      {error && (
        <p role="alert" className="text-sm font-sans mb-4" style={{ color: "var(--lavender-dark)" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-sans font-medium transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
        style={{ background: "var(--accent)", color: "var(--on-accent)" }}
      >
        {submitting ? "Checking…" : "Take me in"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
