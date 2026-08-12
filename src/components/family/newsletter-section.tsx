"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const GREEN = "#1A3A25";
const GREEN_SOFT = "rgba(26,58,37,0.65)";

type Status = "idle" | "loading" | "joined" | "already-joined" | "error";

export function NewsletterSection({ familyLabel }: { familyLabel: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const done = status === "joined" || status === "already-joined";

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

      setStatus(data.status === "already-joined" ? "already-joined" : "joined");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please check your connection and try again.");
    }
  }

  return (
    <section className="border-y border-border" style={{ background: "#FAFAFA" }}>
      <div className="mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p
              className="text-[13px] font-[600] uppercase tracking-[0.15em] mb-4 font-sans"
              style={{ color: GREEN_SOFT }}
            >
              Stay informed
            </p>
            <h2
              className="font-sans font-bold mb-4"
              style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: GREEN }}
            >
              The real guide to building your family.
            </h2>
            <p
              className="text-sm font-sans leading-relaxed"
              style={{ maxWidth: "44ch", color: GREEN }}
            >
              Join the list and we&apos;ll email you when new guides and clinic
              comparison updates for {familyLabel.toLowerCase()} go live. No
              noise.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="flex flex-col gap-4"
          >
            {done ? (
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-background p-6">
                <span
                  className="flex items-center justify-center h-9 w-9 rounded-full shrink-0 bg-accent"
                  style={{ color: GREEN }}
                >
                  <Check className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="font-sans font-semibold mb-1" style={{ color: GREEN }}>
                    {status === "joined" ? "You're on the list." : "You're already on the list."}
                  </p>
                  <p className="text-sm font-sans leading-relaxed" style={{ color: GREEN_SOFT }}>
                    We&apos;ll be in touch when there&apos;s something worth reading.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    aria-label="Email address"
                    className="flex-1 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-sans text-[#1A3A25] placeholder:text-muted focus:outline-none focus:border-[#1A3A25]/40 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-[#1A3A25] px-7 py-3.5 text-sm font-sans font-medium hover:bg-accent-dark transition-colors duration-200 shrink-0 disabled:opacity-60"
                  >
                    {status === "loading" ? "Joining…" : "Subscribe"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                {status === "error" && (
                  <p className="text-xs font-sans pl-2 text-red-700" role="alert">
                    {errorMessage}
                  </p>
                )}
                <p className="text-xs font-sans pl-2" style={{ color: GREEN_SOFT }}>
                  No spam. No toxic positivity. Just the real stuff.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
