"use client";

import { useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DATA_PROVENANCE, formatCheckedDate } from "@/lib/clinics";
import { useDialogFocus } from "@/lib/use-dialog-focus";

interface AboutFiguresDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  clinicCount: number;
}

/**
 * Where the finder's figures come from, behind the info icon beside "About
 * these figures". It is the same side drawer the mobile filters use, so it
 * reads as part of the finder rather than a modal interruption, and it says
 * plainly what the list is: every clinic checked so far, added as it is
 * checked, none of them paying to be here.
 */
export function AboutFiguresDrawer({ isOpen, onClose, clinicCount }: AboutFiguresDrawerProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  useDialogFocus(isOpen, drawerRef, onClose, closeRef);

  const sections: { heading: string; body: React.ReactNode }[] = [
    {
      heading: "Which clinics are here",
      body: (
        <>
          {clinicCount} clinics so far, in the UK and abroad, and the list grows as we check
          each new one. Any licensed clinic can be listed. No clinic pays to appear, none can pay
          to appear higher, and we have no commercial relationship with any of them. If a clinic
          you are considering is missing, it has usually not been added yet: tell us at{" "}
          <a
            href="mailto:stories@cairnfertility.com"
            className="font-medium text-teal hover:underline underline-offset-2"
          >
            stories@cairnfertility.com
          </a>
          . A few clinics are deliberately left out; those are listed, with reasons, on the
          About page.
        </>
      ),
    },
    {
      heading: "UK success rates",
      body: (
        <>
          Copied from each clinic&rsquo;s own HFEA Choose a Clinic page, which currently shows
          2023 births per embryo transferred for two age groups: under 38, and 38 and over. The
          HFEA&rsquo;s verdict against the national average is shown with each figure. Rates are
          averages across many patients, not a prediction for you.
        </>
      ),
    },
    {
      heading: "Overseas success rates",
      body: (
        <>
          The clinic&rsquo;s own published figures, not checked by us, and often on a different
          measure. They are never sorted into one list with UK figures, because a higher number on
          a different measure is not a better clinic.
        </>
      ),
    },
    {
      heading: "Prices",
      body: (
        <>
          Headline figures from {DATA_PROVENANCE.pricesSourceLabel}, last checked{" "}
          {formatCheckedDate(DATA_PROVENANCE.pricesVerifiedOn)}. Each card shows its own checked
          date. Drugs, ICSI, donor material and storage are usually charged on top.{" "}
          {DATA_PROVENANCE.fxNote}
        </>
      ),
    },
    {
      heading: "Distances",
      body: (
        <>
          Straight-line miles from the place you typed or from your device&rsquo;s position, to
          roughly the nearest kilometre. They are for ordering the list, not for planning a
          journey. Where you are stays in your browser: it is not sent to us or to anyone else.
        </>
      ),
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-foreground/40"
            onClick={onClose}
          />

          <motion.div
            key="drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-figures-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: [0.32, 0, 0.16, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-[440px] z-50 flex flex-col bg-background border-l border-border-warm"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-warm shrink-0">
              <h2 id="about-figures-title" className="font-sans font-bold text-base text-teal">
                About these figures
              </h2>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close"
                className="p-1 rounded-full text-teal transition-colors hover:bg-surface-hover"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {sections.map((s) => (
                <section key={s.heading}>
                  <h3 className="text-[12px] font-[700] uppercase tracking-[0.12em] text-muted mb-2">
                    {s.heading}
                  </h3>
                  <p className="text-sm text-foreground leading-relaxed">{s.body}</p>
                </section>
              ))}
            </div>

            <div className="px-6 py-4 border-t border-border-warm shrink-0 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <Link
                href="/about#methodology"
                className="font-medium text-teal hover:underline underline-offset-2"
              >
                How we check these figures
              </Link>
              <Link href="/support" className="font-medium text-teal hover:underline underline-offset-2">
                Looking after yourself
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
