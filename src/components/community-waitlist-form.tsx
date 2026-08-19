"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import {
  INTEREST_OPTIONS,
  PATHWAY_OPTIONS,
  STAGE_OPTIONS,
  type CommunityInterest,
  type CommunityPathway,
  type CommunityStage,
} from "@/lib/community";
import {
  clearWaitlistSignup,
  isValidEmail,
  submitWaitlist,
  useWaitlistSignup,
  type WaitlistSignup,
} from "@/lib/waitlist";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The full journey variant of the waitlist signup, for /community: pathway,
 * stage, and interests alongside the email. The plain email-only capture on
 * /waitlist is `WaitlistForm`; both post to the same /api/waitlist list.
 */

function FieldLabel({ children }: { children: string }) {
  return (
    <p className="text-[11px] font-[600] uppercase tracking-[0.15em] text-muted font-sans mb-2.5">
      {children}
    </p>
  );
}

function Chip({
  selected,
  onClick,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-full border px-4 py-2 text-sm font-sans transition-all duration-150 ${
        selected
          ? "border-foreground bg-foreground text-background"
          : "border-border text-muted hover:border-foreground/40 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

function SuccessPanel({
  signup,
  onReset,
}: {
  signup: WaitlistSignup;
  onReset: () => void;
}) {
  const stage = STAGE_OPTIONS.find((o) => o.value === signup.stage)?.label;
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <span
        className="flex h-12 w-12 items-center justify-center rounded-full mb-6"
        style={{ background: "var(--accent)" }}
      >
        <Check className="h-6 w-6" strokeWidth={2.5} style={{ color: "var(--on-accent)" }} />
      </span>

      <h3
        className="font-sans font-bold text-foreground mb-3"
        style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", lineHeight: 1.15 }}
      >
        You&rsquo;re on the list, {signup.firstName}.
      </h3>
      <p className="text-sm font-sans text-muted leading-relaxed mb-8" style={{ maxWidth: "48ch" }}>
        We&rsquo;ve saved your place{stage ? ` under “${stage.toLowerCase()}”` : ""}.
        When the community opens you&rsquo;ll be first in, and what you told us
        decides what we build first. Until then, the only email you&rsquo;ll get
        is the one that lets you in.
      </p>

      <FieldLabel>While you wait</FieldLabel>
      <ul className="space-y-3 mb-8">
        {[
          { label: "Read stories from people on your path", href: "/stories" },
          { label: "Compare clinics with real costs", href: "/ivf-finder" },
          { label: "Get matched to clinics for your situation", href: "/get-started" },
        ].map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="group inline-flex items-center gap-2 text-sm font-sans font-medium text-foreground hover:text-teal transition-colors"
            >
              {l.label}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
            </a>
          </li>
        ))}
      </ul>

      <button
        onClick={onReset}
        className="text-xs font-sans text-muted hover:text-foreground underline underline-offset-4 transition-colors"
      >
        Not you? Sign up with different details
      </button>
    </motion.div>
  );
}

export function CommunityWaitlistForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [pathway, setPathway] = useState<CommunityPathway | null>(null);
  const [stage, setStage] = useState<CommunityStage | null>(null);
  const [interests, setInterests] = useState<Set<CommunityInterest>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  // A returning signup skips straight to the success state — the journey
  // remembers them.
  const signup = useWaitlistSignup();

  const toggleInterest = (i: CommunityInterest) => {
    setInterests((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) {
      setError("Tell us your first name so we know what to call you.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("That email doesn't look right — check it and try again.");
      return;
    }
    if (!pathway) {
      setError("Pick the path that fits — 'still deciding' counts.");
      return;
    }
    if (!stage) {
      setError("Let us know where you are in the journey.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await submitWaitlist({
        firstName: firstName.trim(),
        email: email.trim(),
        pathway,
        stage,
        interests: [...interests],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    clearWaitlistSignup();
    setFirstName("");
    setEmail("");
    setPathway(null);
    setStage(null);
    setInterests(new Set());
  };

  return (
    <div className="p-6 md:p-8">
      <AnimatePresence mode="wait">
        {signup ? (
          <SuccessPanel signup={signup} onReset={reset} />
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
              <div>
                <FieldLabel>First name</FieldLabel>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="What should we call you?"
                  autoComplete="given-name"
                  className="w-full rounded-full border border-teal/20 bg-background px-5 py-3 text-sm font-sans text-foreground placeholder:text-muted/70 focus:outline-none focus:border-teal-35 transition-colors"
                />
              </div>
              <div>
                <FieldLabel>Email</FieldLabel>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-full border border-teal/20 bg-background px-5 py-3 text-sm font-sans text-foreground placeholder:text-muted/70 focus:outline-none focus:border-teal-35 transition-colors"
                />
              </div>
            </div>

            <div className="mb-7">
              <FieldLabel>Your path</FieldLabel>
              <div className="flex flex-wrap gap-2">
                {PATHWAY_OPTIONS.map((o) => (
                  <Chip
                    key={o.value}
                    selected={pathway === o.value}
                    onClick={() => setPathway(o.value)}
                    label={o.label}
                  />
                ))}
              </div>
            </div>

            <div className="mb-7">
              <FieldLabel>Where you are</FieldLabel>
              <div className="flex flex-wrap gap-2">
                {STAGE_OPTIONS.map((o) => (
                  <Chip
                    key={o.value}
                    selected={stage === o.value}
                    onClick={() => setStage(o.value)}
                    label={o.label}
                  />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <FieldLabel>What you want most (optional)</FieldLabel>
              <div className="flex flex-wrap gap-2">
                {INTEREST_OPTIONS.map((o) => (
                  <Chip
                    key={o.value}
                    selected={interests.has(o.value)}
                    onClick={() => toggleInterest(o.value)}
                    label={o.label}
                  />
                ))}
              </div>
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
              {submitting ? "Saving your place…" : "Join the Waitlist"}
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="text-xs font-sans mt-5 text-muted">
              No spam. No toxic positivity. One email when the doors open, and
              you can leave the list any time. How we handle your email is in
              our{" "}
              <a href="/privacy" className="underline decoration-muted/40 hover:decoration-teal">
                privacy policy
              </a>.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
