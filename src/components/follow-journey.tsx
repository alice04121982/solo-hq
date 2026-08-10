"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { isValidEmail, submitFollow, useFollowSignup } from "@/lib/waitlist";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Email capture for the build-log letter, styled for the teal band it sits
 * on — the lighter half of the community journey, for people not ready to
 * put their name on a waitlist yet.
 */
export function FollowJourney() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const signup = useFollowSignup();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("That email doesn't look right — check it and try again.");
      return;
    }
    setError(null);
    setSubmitting(true);
    await submitFollow(email.trim());
    setSubmitting(false);
  };

  if (signup) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex items-start gap-3"
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full mt-0.5"
          style={{ background: "var(--accent)" }}
        >
          <Check className="h-4 w-4" strokeWidth={2.5} style={{ color: "var(--on-accent)" }} />
        </span>
        <div>
          <p className="text-sm font-sans font-medium" style={{ color: "var(--on-teal)" }}>
            You&rsquo;re following along.
          </p>
          <p className="text-sm font-sans leading-relaxed mt-1" style={{ color: "var(--on-teal-muted)" }}>
            The next letter goes to {signup.email}. Fortnightly, honest, and
            easy to leave.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          autoComplete="email"
          aria-label="Email address"
          className="flex-1 rounded-full border bg-transparent px-6 py-3.5 text-sm font-sans placeholder:text-on-teal-muted focus:outline-none focus:border-on-teal transition-colors"
          style={{
            borderColor: "rgba(249,198,218,0.35)",
            color: "var(--on-teal)",
          }}
        />
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-sans font-medium shrink-0 transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
          style={{ background: "var(--accent)", color: "var(--on-accent)" }}
        >
          {submitting ? "Signing you up…" : "Follow Our Journey"}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
      {error && (
        <p role="alert" className="text-sm font-sans" style={{ color: "var(--on-teal)" }}>
          {error}
        </p>
      )}
    </form>
  );
}
