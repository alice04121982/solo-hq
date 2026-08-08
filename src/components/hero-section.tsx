"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "./site-nav";

const EASE = [0.16, 1, 0.3, 1] as const;

const TRUST_SIGNALS = [
  "True cost: flights + hotels included",
  "Success rates verified where possible",
  "HFEA-licensed UK clinics flagged",
  "Donor sperm & egg options compared",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--teal)" }}>
      {/* Below xl the photo runs to the very top of the section, behind the
          nav, and dissolves into the teal rather than ending on a hard edge —
          so the page opens on the image with the wordmark sitting over it. */}
      <div className="absolute inset-x-0 top-0 aspect-[4/3] xl:hidden pointer-events-none">
        <Image
          src="/photos/hero-mobile.webp"
          alt="A family together at home with their newborn"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Top scrim: the wordmark and burger sit over the photograph, and the
            image cannot be relied on to be dark behind them. */}
        <div
          className="absolute inset-x-0 top-0 h-32"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,55,55,0.6) 0%, rgba(0,55,55,0.28) 55%, rgba(0,55,55,0) 100%)",
          }}
        />
        {/* Bottom fade into the section colour, so the photo has no hard edge */}
        <div
          className="absolute inset-x-0 bottom-0 h-2/3"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,83,83,0) 0%, rgba(0,83,83,0.72) 58%, var(--teal) 100%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <SiteNav theme="dark" />

        <div className="relative pb-20 md:pb-28 xl:pt-32 xl:pb-32">
          {/* Holds open the space the bleeding image occupies below the nav.
              The image itself is out of flow, so without this the copy would
              start under the wordmark. */}
          <div className="h-[calc(75vw-120px)] xl:hidden" aria-hidden />

          {/* From xl the photo is a fixed 580px placed to the right of — and
              overlapping — the copy, as designed; the container caps at 1280px
              so that is the designed width at every width above it. The mask is
              baked into the export, so the notched silhouette needs no
              clip-path — the alpha channel carries it. */}
          <div className="hidden xl:block xl:absolute xl:right-[-52px] xl:top-[162px] xl:w-[580px] pointer-events-none">
            <Image
              src="/photos/hero-desktop.webp"
              alt="A family together at home with their newborn"
              width={1205}
              height={1282}
              sizes="580px"
              className="w-full h-auto object-contain"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative"
          >
            <h1
              className="font-sans font-bold mb-7 max-w-[768px]"
              style={{
                fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)",
                lineHeight: 1.04,
                color: "var(--on-teal)",
              }}
            >
              IVF made clearer, for every kind of family.
            </h1>

            {/* Kept under 30 words — the trust signals below carry the detail
                this used to spell out. */}
            <p
              className="text-[18px] leading-[28px] mb-7 font-sans max-w-[560px]"
              style={{ color: "var(--on-teal-muted)" }}
            >
              Clinics abroad often look cheaper — until you add flights and hotels. We show the{" "}
              <span style={{ color: "var(--on-teal)" }}>true cost</span> beside UK clinics, and
              flag which success rates are verified.
            </p>

            {/* Trust signals — a vertical list, sitting above the CTA */}
            <div className="flex flex-col gap-2 mb-7 max-w-[768px]">
              {TRUST_SIGNALS.map((s) => (
                <span
                  key={s}
                  className="text-sm leading-5 font-sans font-medium flex items-center gap-2"
                  style={{ color: "var(--on-teal-muted)" }}
                >
                  <span
                    className="h-1 w-1 rounded-full inline-block shrink-0"
                    style={{ background: "var(--accent)" }}
                  />
                  {s}
                </span>
              ))}
            </div>

            {/* Primary CTA */}
            <div>
              <a
                href="/get-started"
                className="inline-flex items-center gap-2 rounded-full text-sm font-sans font-medium px-7 py-3.5 transition-opacity duration-200 hover:opacity-90"
                style={{ background: "var(--accent)", color: "#1A3A25" }}
              >
                Get started
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
