"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    // Stub — wire up to your email provider (Mailchimp, Resend, etc.)
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <section className="border-b border-border" style={{ background: "#F6F3ED" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* Left — copy */}
          <div>
            <p className="text-[11px] font-[500] uppercase tracking-[0.2em] text-muted font-sans mb-4">
              Stay in the loop
            </p>
            <h2
              className="font-serif font-semibold text-foreground mb-4"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}
            >
              No fluff. Just what you{" "}
              <em style={{ fontStyle: "italic", color: "var(--primary)" }}>actually need</em>{" "}
              to know.
            </h2>
            <p className="text-[16px] font-sans text-muted leading-relaxed" style={{ maxWidth: "44ch" }}>
              Clinic updates, success rate data, real stories, and honest advice —
              delivered every two weeks to solo mums by choice at every stage of the journey.
            </p>

            {/* Social proof */}
            <div className="flex items-center gap-3 mt-6">
              <div className="flex -space-x-2">
                {["#B5624A", "#2E7A51", "#6B665F", "#1C1C1A"].map((c, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-background"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <p className="text-[13px] font-sans text-muted">
                Join <strong className="text-foreground font-semibold">2,400+</strong> solo mums already subscribed
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-white p-6">
                <div className="rounded-full bg-primary-tint p-2 shrink-0">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-serif font-semibold text-foreground text-lg mb-1">
                    You&apos;re in.
                  </p>
                  <p className="text-sm font-sans text-muted leading-relaxed">
                    Welcome to the community. Your first email will arrive within the week — check your spam just in case.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Your email address"
                    className="flex-1 px-5 py-3.5 text-sm font-sans border border-border rounded-full bg-white text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-3.5 text-sm font-sans font-semibold hover:bg-primary transition-colors duration-200 disabled:opacity-60 whitespace-nowrap shrink-0"
                  >
                    {loading ? "Subscribing…" : (
                      <>
                        Subscribe
                        <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Reassurance */}
                <p className="text-[12px] font-sans text-muted pl-2">
                  No spam, ever. Unsubscribe any time. We&apos;ll never share your details.
                </p>

                {/* What you get */}
                <ul className="space-y-2 mt-1">
                  {[
                    "Clinic success rate updates and new entrants",
                    "Real stories from women at every stage",
                    "Legal changes, funding news & policy updates",
                    "Practical guides you won't find on the NHS",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ background: "var(--primary)" }}
                      />
                      <span className="text-[13px] font-sans text-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
