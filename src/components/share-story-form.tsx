"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { FAMILY_TYPES } from "@/lib/family-types";
import { LEGAL_CONTACT_EMAIL } from "@/lib/legal";

/**
 * The share-your-story form.
 *
 * Deliberately not wired to a server: the site has no API routes and the
 * privacy policy promises that nothing leaves the browser except email the
 * reader sends themselves (see src/lib/legal.ts). So this form is a drafting
 * tool — it assembles a message locally and hands it to the reader's own
 * email app, or their clipboard. If a submission backend is ever added, the
 * privacy policy must change in the same pull request.
 */

const STAGES = [
  "Thinking about starting",
  "In treatment now",
  "Pregnant after treatment",
  "Already a parent",
  "Treatment ended without a baby",
  "Somewhere else entirely",
] as const;

const inputClass =
  "w-full rounded-full border border-border bg-background px-5 py-3 text-sm font-sans text-foreground placeholder:text-muted/70 focus:outline-none focus:border-teal/40 transition-colors";

const labelClass = "block text-sm font-sans font-[600] text-foreground mb-2";
const hintClass = "text-[13px] font-sans text-muted leading-relaxed mt-1.5";

export function ShareStoryForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [pathway, setPathway] = useState("");
  const [stage, setStage] = useState("");
  const [story, setStory] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [consent, setConsent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const ready = story.trim().length > 0 && consent;

  const pathwayLabel =
    FAMILY_TYPES.find((f) => f.slug === pathway)?.label ?? "";

  const subject = "My story for Cairn Fertility";

  const body = [
    "Hi Cairn team,",
    "",
    "I'd like to share my story.",
    "",
    `Name: ${name.trim() || "(not given)"}`,
    `Age: ${age.trim() || "(not given)"}`,
    `Location: ${location.trim() || "(not given)"}`,
    `My pathway: ${pathwayLabel || "(not given)"}`,
    `Where I am in the journey: ${stage || "(not given)"}`,
    `Publish as: ${anonymous ? "Anonymous — please don't use my name" : name.trim() || "(name above)"}`,
    "",
    "My story:",
    "",
    story.trim(),
    "",
    "I understand you'll reply before anything is published, and that nothing goes live until I've confirmed the final version by email.",
  ].join("\n");

  const mailtoHref = `mailto:${LEGAL_CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const handleCopy = async () => {
    if (!ready) {
      setAttempted(true);
      return;
    }
    try {
      await navigator.clipboard.writeText(
        `To: ${LEGAL_CONTACT_EMAIL}\nSubject: ${subject}\n\n${body}`,
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard unavailable — the mailto button still works.
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-7"
      aria-describedby="share-story-privacy"
    >
      {/* Who you are */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
        <div>
          <label htmlFor="ss-name" className={labelClass}>
            Your name
          </label>
          <input
            id="ss-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Or the name you'd like us to use"
            autoComplete="name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="ss-age" className={labelClass}>
            Age <span className="font-[400] text-muted">(optional)</span>
          </label>
          <input
            id="ss-age"
            type="text"
            inputMode="numeric"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="e.g. 38"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="ss-location" className={labelClass}>
            Where you are <span className="font-[400] text-muted">(optional)</span>
          </label>
          <input
            id="ss-location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Leeds"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="ss-pathway" className={labelClass}>
            Your pathway
          </label>
          <select
            id="ss-pathway"
            value={pathway}
            onChange={(e) => setPathway(e.target.value)}
            className={inputClass}
          >
            <option value="">Choose one, if one fits</option>
            {FAMILY_TYPES.map((f) => (
              <option key={f.slug} value={f.slug}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Where you are in the journey */}
      <div>
        <label htmlFor="ss-stage" className={labelClass}>
          Where you are in the journey
        </label>
        <select
          id="ss-stage"
          value={stage}
          onChange={(e) => setStage(e.target.value)}
          className={inputClass}
        >
          <option value="">Choose the closest</option>
          {STAGES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <p className={hintClass}>
          Every stage counts — the beginning, the middle, and the endings that
          didn&rsquo;t go the way anyone hoped.
        </p>
      </div>

      {/* The story */}
      <div>
        <label htmlFor="ss-story" className={labelClass}>
          Your story
        </label>
        <textarea
          id="ss-story"
          value={story}
          onChange={(e) => setStory(e.target.value)}
          rows={10}
          required
          aria-describedby="ss-story-hint"
          placeholder="Tell it the way you'd tell a friend. There's no required length and no required shape."
          className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-sm font-sans text-foreground leading-relaxed placeholder:text-muted/70 focus:outline-none focus:border-teal/40 transition-colors resize-y min-h-[220px]"
        />
        <p id="ss-story-hint" className={hintClass}>
          Only include what you&rsquo;d be comfortable seeing published. You
          don&rsquo;t need to share clinical detail — what treatment felt like
          matters more than the protocol you were on.
        </p>
      </div>

      {/* Anonymity */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded accent-(--teal)"
        />
        <span className="text-sm font-sans text-foreground leading-relaxed">
          Publish my story anonymously.
          <span className="block text-[13px] text-muted mt-0.5">
            We&rsquo;ll strip your name and anything else that could identify
            you before anything appears on the site.
          </span>
        </span>
      </label>

      {/* Consent */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          aria-describedby="ss-consent-hint"
          className="mt-0.5 h-4 w-4 rounded accent-(--teal)"
        />
        <span className="text-sm font-sans text-foreground leading-relaxed">
          I&rsquo;m happy for Cairn Fertility to read this and reply about
          publishing it.
          <span id="ss-consent-hint" className="block text-[13px] text-muted mt-0.5">
            Nothing is published from this email alone. We&rsquo;ll agree the
            final version with you, and you can change your mind at any point —
            before or after it goes live.
          </span>
        </span>
      </label>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
        <a
          href={ready ? mailtoHref : undefined}
          aria-disabled={!ready}
          onClick={(e) => {
            if (!ready) {
              e.preventDefault();
              setAttempted(true);
            }
          }}
          className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-sans font-medium transition-opacity duration-200 ${
            ready ? "hover:opacity-90" : "opacity-50 cursor-not-allowed"
          }`}
          style={{ background: "var(--accent)", color: "var(--on-accent)" }}
        >
          <Mail className="h-4 w-4" aria-hidden />
          Open in your email app
        </a>
        <button
          type="button"
          onClick={handleCopy}
          aria-disabled={!ready}
          className={`inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-sm font-sans font-medium transition-colors duration-200 ${
            ready ? "hover:bg-surface-hover" : "opacity-50 cursor-not-allowed"
          }`}
          style={{ borderColor: "var(--teal-35)", color: "var(--teal)" }}
        >
          {copied ? (
            <Check className="h-4 w-4" aria-hidden />
          ) : (
            <Copy className="h-4 w-4" aria-hidden />
          )}
          {copied ? "Copied" : "Copy the email instead"}
        </button>
      </div>

      {attempted && !ready && (
        <p role="alert" className="text-sm font-sans text-foreground -mt-2">
          {story.trim().length === 0
            ? "Write your story above first — that's the one part we can't do without."
            : "Please tick the consent box first, so we know you're happy for us to read and reply."}
        </p>
      )}

      <p id="share-story-privacy" className="text-[13px] font-sans text-muted leading-relaxed border-t border-border pt-5">
        This form works entirely in your browser: nothing you type here is sent
        to us, or anywhere else, until you send the email yourself from your
        own email app. If your email app cuts the message short, use
        &ldquo;copy&rdquo; and paste it into a new email to {LEGAL_CONTACT_EMAIL}.
      </p>
    </form>
  );
}
