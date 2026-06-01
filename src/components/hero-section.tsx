"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import Image from "next/image";
import { SiteNav } from "./site-nav";
import { Button, buttonVariants } from "@/components/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  return (
    <section className="relative bg-bg-secondary">
      <div className="px-6 md:px-10">
        <SiteNav />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_45vw] min-h-[88vh]">

        {/* Left — copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE }}
          className="flex flex-col justify-center px-6 md:px-10 py-16 lg:py-24"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-text-tertiary mb-7 font-sans">
            Every path to parenthood
          </p>

          <h1
            className="font-serif font-semibold text-text-primary mb-8"
            style={{
              fontSize: "clamp(2.25rem, 4.5vw, 4rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.018em",
            }}
          >
            Building Your
            <br />
            Family{" "}
            <em className="not-italic text-text-brand-secondary">
              Your
              <br />
              Way
            </em>
          </h1>

          <p className="text-md text-text-secondary leading-relaxed mb-10 font-sans" style={{ maxWidth: "42ch" }}>
            Whether you&apos;re going solo, navigating donor conception, or building
            a same-sex family — KLEO is your honest, practical guide to every
            step of the journey.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/clinics"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Find a clinic
              <ArrowRight className="h-4 w-4" />
            </a>

            <Button
              variant="secondary"
              size="lg"
              iconLeading={
                <span className="h-5 w-5 rounded-full bg-bg-brand-primary flex items-center justify-center">
                  <Play className="h-2.5 w-2.5 text-fg-brand-primary fill-fg-brand-primary" />
                </span>
              }
            >
              Alice&rsquo;s story
            </Button>
          </div>
        </motion.div>

        {/* Right — image, flush to viewport edge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
          className="relative overflow-hidden"
          style={{ minHeight: "420px" }}
        >
          <Image
            src="/images/hero-main.jpg"
            alt="Ultrasound scan among fairy lights and soft textures — the beginning of the solo motherhood journey"
            fill
            className="object-cover"
            style={{ filter: "saturate(0.9) sepia(0.05)" }}
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
