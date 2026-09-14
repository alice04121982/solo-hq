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
  forgetApplication,
  isValidEmail,
  submitApplication,
  useRememberedApplication,
} from "@/lib/community-application";

const EASE = [0.16, 1, 0.3, 1] as const;
const REASON_MIN = 40;
const REASON_MAX = 1500;

/**
 * Wording is a cross-package contract (phase 3 plan, C1). The API returns the
 * same error text for a missing consent flag, and the privacy policy describes
 * this checkbox. Change all three together or none.
 */
const HEALTH_CONSENT_LABEL =
  "I agree that CairnFertility can store what I have written here, together with my path and stage, so that a person can read my application. This includes information about my health, fertility treatment and family type. I can withdraw this and have it deleted at any time by emailing privacy@cairnfertility.com.";
const HEALTH_CONSENT_ERROR =
  "Please tick the consent box so we can store and read your application.";

/**
 * The application form for /community.
 *
 * Three things about it are load-bearing rather than decorative. The free-text
 * answer is the thing a reviewer actually reads, so it is the largest field on
 * the form and the copy around it says why. The health-data consent is its own
 * unticked checkbox, separate from the rules, because the answer, path and
 * stage are special category data and consent to store them has to be asked
 * for on its own. And the rules have to be accepted explicitly, next to a link
 * to the full text, because "I agreed to look after other people here" is the
 * only promise this whole design rests on.
 *
 * No phone number is asked for. That is not an oversight: the site never wants
 * to hold a list of phone numbers belonging to people going through IVF.
 */

const LABEL_CLASS =
  "text-[11px] font-[600] uppercase tracking-[0.15em] text-muted font-sans mb-2.5";

/** A real label when it has a control to point at; a heading-like line otherwise. */
function FieldLabel({ children, htmlFor }: { children: string; htmlFor?: string }) {
  if (htmlFor) {
    return (
      <label htmlFor={htmlFor} className={`block ${LABEL_CLASS}`}>
        {children}
      </label>
    );
  }
  return <p className={LABEL_CLASS}>{children}</p>;
}

/** Same look as FieldLabel, for the chip groups, which are fieldsets. */
function FieldLegend({ children }: { children: string }) {
  return <legend className={`block ${LABEL_CLASS}`}>{children}</legend>;
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
      className={`rounded-full px-4 py-2 text-sm font-sans transition-all duration-150 ${
        selected
          ? "bg-teal text-on-teal"
          : "bg-background text-muted hover:bg-surface-hover hover:text-teal"
      }`}
    >
      {label}
    </button>
  );
}

const INPUT_CLASS =
  "w-full rounded-full border border-border bg-background px-5 py-3 text-sm font-sans text-foreground placeholder:text-muted/70 focus:outline-none focus:border-teal-35 transition-colors";

function SubmittedPanel({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      key="submitted"
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
        className="font-sans font-bold text-teal mb-3"
        style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", lineHeight: 1.15 }}
      >
        It&rsquo;s with us.
      </h3>
      <p
        className="text-sm font-sans text-muted leading-relaxed mb-8"
        style={{ maxWidth: "48ch" }}
      >
        A person reads every application, usually within a week. We will email
        you either way: an invite link that works once and only for you, or a
        short note if the group is not the right fit. Check your junk folder.
        If you applied before, we already have your application and do not
        need another.
      </p>

      <FieldLabel>While you wait</FieldLabel>
      <ul className="space-y-3 mb-8">
        {[
          { label: "Read the group rules in full", href: "/community/guidelines" },
          { label: "Looking after yourself", href: "/support" },
          { label: "Compare clinics", href: "/ivf-finder" },
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
        Not you? Start a new application
      </button>
    </motion.div>
  );
}

export function CommunityApplicationForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [pathway, setPathway] = useState<CommunityPathway | null>(null);
  const [stage, setStage] = useState<CommunityStage | null>(null);
  const [interests, setInterests] = useState<Set<CommunityInterest>>(new Set());
  const [reason, setReason] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [healthConsent, setHealthConsent] = useState(false);
  const [agreed, setAgreed] = useState(false);
  // Honeypot. Hidden from people and from screen readers; bots fill it in.
  const [website, setWebsite] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const application = useRememberedApplication();

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
      setError("That email doesn't look right. Check it and try again.");
      return;
    }
    if (!pathway) {
      setError("Pick the path that fits: 'still deciding' counts.");
      return;
    }
    if (!stage) {
      setError("Let us know where you are in the journey.");
      return;
    }
    if (reason.trim().length < REASON_MIN) {
      setError(
        "Please say a little more about why you'd like to join. A couple of sentences is plenty."
      );
      return;
    }
    if (!healthConsent) {
      setError(HEALTH_CONSENT_ERROR);
      return;
    }
    if (!agreed) {
      setError("Please read and accept the group rules before applying.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await submitApplication({
        firstName: firstName.trim(),
        email: email.trim(),
        pathway,
        stage,
        interests: [...interests],
        reason: reason.trim(),
        affiliation: affiliation.trim(),
        agreedToRules: agreed,
        healthDataConsent: healthConsent,
        // Always empty for a person; the server discards anything that has it.
        website,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    forgetApplication();
    setFirstName("");
    setEmail("");
    setPathway(null);
    setStage(null);
    setInterests(new Set());
    setReason("");
    setAffiliation("");
    setHealthConsent(false);
    setAgreed(false);
  };

  const reasonRemaining = REASON_MIN - reason.trim().length;

  return (
    <div className="p-6 md:p-8">
      <AnimatePresence mode="wait">
        {application ? (
          <SubmittedPanel onReset={reset} />
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
                <FieldLabel htmlFor="apply-first-name">First name</FieldLabel>
                <input
                  id="apply-first-name"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="What should we call you?"
                  autoComplete="given-name"
                  maxLength={80}
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <FieldLabel htmlFor="apply-email">Email</FieldLabel>
                <input
                  id="apply-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  maxLength={254}
                  className={INPUT_CLASS}
                />
              </div>
            </div>

            {/* Honeypot. Off-screen rather than display:none, which some bots
                check for, and hidden from assistive technology. */}
            <div aria-hidden className="absolute w-px h-px overflow-hidden -left-[9999px]">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <fieldset className="mb-7 min-w-0">
              <FieldLegend>Your path</FieldLegend>
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
            </fieldset>

            <fieldset className="mb-7 min-w-0">
              <FieldLegend>Where you are</FieldLegend>
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
            </fieldset>

            <fieldset className="mb-7 min-w-0">
              <FieldLegend>What you want most (optional)</FieldLegend>
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
            </fieldset>

            <div className="mb-7">
              <FieldLabel htmlFor="apply-reason">Why you&rsquo;d like to join</FieldLabel>
              <p
                id="apply-reason-hint"
                className="text-xs font-sans text-muted mb-3"
                style={{ maxWidth: "46ch" }}
              >
                In your own words, a couple of sentences. This is the part a
                person reads, and it is how we tell an applicant from a bot.
                Share only what you&rsquo;re comfortable having read.
              </p>
              <textarea
                id="apply-reason"
                name="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={5}
                maxLength={REASON_MAX}
                aria-describedby="apply-reason-hint apply-reason-count"
                placeholder="Where you are, what you're hoping to find, anything that would help us understand."
                className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-sm font-sans text-foreground placeholder:text-muted/70 focus:outline-none focus:border-teal-35 transition-colors resize-y"
              />
              <p id="apply-reason-count" className="text-xs font-sans text-muted mt-2">
                {reasonRemaining > 0
                  ? `${reasonRemaining} more character${reasonRemaining === 1 ? "" : "s"} to go.`
                  : "That's plenty, thank you."}
              </p>
            </div>

            <div className="mb-7 rounded-2xl border border-border p-5">
              <label htmlFor="apply-health-consent" className="flex items-start gap-3 cursor-pointer">
                <input
                  id="apply-health-consent"
                  name="healthDataConsent"
                  type="checkbox"
                  checked={healthConsent}
                  onChange={(e) => setHealthConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 accent-teal"
                />
                <span className="text-sm font-sans text-foreground leading-relaxed">
                  {HEALTH_CONSENT_LABEL}
                </span>
              </label>
            </div>

            <div className="mb-7">
              <FieldLabel htmlFor="apply-affiliation">
                Do you work in fertility? (optional)
              </FieldLabel>
              <p
                id="apply-affiliation-hint"
                className="text-xs font-sans text-muted mb-3"
                style={{ maxWidth: "46ch" }}
              >
                Clinic, agency, coaching, research, press. Saying yes does not
                rule you out; plenty of members have been on both sides. We
                just ask you to be upfront.
              </p>
              <input
                id="apply-affiliation"
                name="affiliation"
                type="text"
                value={affiliation}
                onChange={(e) => setAffiliation(e.target.value)}
                placeholder="e.g. embryologist, or leave blank"
                maxLength={300}
                aria-describedby="apply-affiliation-hint"
                className={INPUT_CLASS}
              />
            </div>

            <div className="mb-8 rounded-2xl border border-border p-5">
              <label htmlFor="apply-agree-rules" className="flex items-start gap-3 cursor-pointer">
                <input
                  id="apply-agree-rules"
                  name="agreedToRules"
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 accent-teal"
                />
                <span className="text-sm font-sans text-foreground leading-relaxed">
                  I&rsquo;ve read the{" "}
                  <a
                    href="/community/guidelines"
                    className="underline decoration-muted/40 hover:decoration-teal"
                  >
                    group rules
                  </a>{" "}
                  and I agree to them, including that nothing said in the
                  group gets repeated outside it.
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
              {submitting ? "Sending your application…" : "Apply to Join"}
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="text-xs font-sans mt-5 text-muted leading-relaxed">
              We never ask for your phone number here, and we never sell or
              share anything you tell us. What you write is deleted on the
              schedule in our{" "}
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
