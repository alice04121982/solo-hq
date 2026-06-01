"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Logo } from "./logo";
import { buttonVariants } from "@/components/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CTASection() {
  return (
    <section className="bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-2xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-tertiary mb-6 font-sans">
            Join the community
          </p>

          <h2
            className="font-serif font-semibold text-text-primary mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1 }}
          >
            You&rsquo;re not doing this alone.
            <br />
            <em className="not-italic text-text-brand-secondary">
              Even if you&rsquo;re doing it solo.
            </em>
          </h2>

          <p className="text-md font-sans text-text-secondary leading-relaxed mb-10" style={{ maxWidth: "50ch" }}>
            Join thousands of solo mums by choice who are navigating the journey
            with honest information, real-world costs, and a community that
            actually gets it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/join"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Join the Club
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/newsletter"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              Follow Our Journey
            </a>
          </div>

          <p className="text-xs font-sans text-text-quaternary mt-6">
            No spam. No toxic positivity. Just the real stuff.
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="border-t border-border-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Logo height={32} />
          <p className="text-xs font-sans text-text-tertiary">
            &copy; {new Date().getFullYear()} KLEO Fertility. Made with grit and grace in the UK.
          </p>
        </div>
      </div>
    </section>
  );
}
