"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button, Input } from "@/components/ui";

// Light purple accent — used on dark/solid-brand backgrounds per KLEO token guide.
const ACCENT = "#D6BBFB";

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
    <section className="bg-bg-brand-solid">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* Left — copy */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] font-sans mb-4 text-white opacity-50">
              Stay in the loop
            </p>
            <h2
              className="font-display font-bold text-white mb-4"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              No fluff. Just what you{" "}
              <em className="not-italic" style={{ color: ACCENT }}>actually need</em>{" "}
              to know.
            </h2>
            <p className="text-md leading-relaxed font-sans" style={{ maxWidth: "44ch", color: "rgba(255,255,255,0.70)" }}>
              Clinic updates, success rate data, real stories, and honest advice,
              delivered every two weeks to families at every stage of their journey.
            </p>

            {/* Social proof */}
            <div className="flex items-center gap-3 mt-6">
              <div className="flex -space-x-2">
                {["#D6BBFB", "#B692F6", "#9E77ED", "#7F56D9"].map((c, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2"
                    style={{ background: c, borderColor: "var(--kleo-bg-brand-solid)" }}
                  />
                ))}
              </div>
              <p className="text-sm font-sans" style={{ color: "rgba(255,255,255,0.60)" }}>
                Join <strong className="text-white font-semibold">2,400+</strong> families already subscribed
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <div className="flex items-start gap-4 rounded-2xl border p-6" style={{ borderColor: "rgba(255,255,255,0.20)", background: "rgba(255,255,255,0.10)" }}>
                <div className="rounded-full p-2 shrink-0" style={{ background: "rgba(255,255,255,0.20)" }}>
                  <Check className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-display font-bold text-white text-lg mb-1">
                    You&apos;re in.
                  </p>
                  <p className="text-sm font-sans leading-relaxed" style={{ color: "rgba(255,255,255,0.70)" }}>
                    Welcome to the community. Your first email will arrive within the week. Check your spam just in case.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Your email address"
                      size="md"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="secondary"
                    size="md"
                    loading={loading}
                    iconTrailing={<ArrowRight className="h-3.5 w-3.5" />}
                    className="shrink-0"
                  >
                    Subscribe
                  </Button>
                </div>

                {/* Reassurance */}
                <p className="text-xs font-sans pl-0.5" style={{ color: "rgba(255,255,255,0.50)" }}>
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
                      <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: ACCENT }} />
                      <span className="text-sm font-sans" style={{ color: "rgba(255,255,255,0.75)" }}>{item}</span>
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
