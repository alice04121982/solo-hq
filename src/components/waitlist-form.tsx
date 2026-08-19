"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";

type Status = "idle" | "loading" | "joined" | "error";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const done = status === "joined";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      // The API answers the same way whether this address was new or already
      // on the list — see the note in src/app/api/waitlist/route.ts.
      setStatus("joined");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please check your connection and try again.");
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl bg-background border border-border p-6 md:p-8 flex items-start gap-4">
        <span
          className="flex items-center justify-center h-9 w-9 rounded-full shrink-0"
          style={{ background: "var(--accent)", color: "#1A3A25" }}
        >
          <Check className="h-4.5 w-4.5" />
        </span>
        <div>
          <p className="font-sans font-semibold text-foreground mb-1">
            You&apos;re on the list.
          </p>
          <p className="text-sm font-sans text-muted leading-relaxed">
            We&apos;ll email you when there is something worth telling you. The community itself is open now and takes applications —{" "}
            <a href="/community" className="underline decoration-muted/40 hover:decoration-teal">apply to join</a>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-background border border-border p-6 md:p-8">
      <label htmlFor="waitlist-email" className="block text-[13px] font-[500] uppercase tracking-[0.15em] text-teal mb-3 font-sans">
        Your email
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id="waitlist-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm font-sans text-foreground placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-teal/40"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-sans font-medium transition-opacity duration-200 hover:opacity-90 disabled:opacity-60 shrink-0"
          style={{ background: "var(--accent)", color: "#1A3A25" }}
        >
          {status === "loading" ? "Joining…" : "Join the waitlist"}
          {status !== "loading" && <ArrowRight className="h-3.5 w-3.5" />}
        </button>
      </div>
      {status === "error" && (
        <p className="text-sm font-sans mt-3" style={{ color: "#C4406B" }}>{errorMessage}</p>
      )}
      <p className="text-xs font-sans text-muted mt-4 leading-relaxed">
        We&apos;ll only use this to email you when the community opens. Read how we handle it in our{" "}
        <a href="/privacy" className="underline decoration-muted/40 hover:decoration-teal">privacy policy</a>.
      </p>
    </form>
  );
}
