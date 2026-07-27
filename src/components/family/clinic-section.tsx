"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ClinicSection({ clinicNote }: { clinicNote: string }) {
  return (
    <section className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
              Clinic comparison
            </p>
            <h2
              className="font-sans font-bold text-foreground mb-4"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}
            >
              Find the right clinic
              <br />
              <span style={{ color: "var(--accent)" }}>
                for your family.
              </span>
            </h2>
            <p className="text-sm font-sans text-muted leading-relaxed mb-8" style={{ maxWidth: "48ch" }}>
              {clinicNote}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/ivf-finder"
                className="inline-flex items-center gap-2 rounded-full bg-accent text-[#1A3A25] px-8 py-3.5 text-sm font-sans font-medium hover:bg-accent-dark transition-colors duration-200"
              >
                Open comparison tool
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="/ivf-finder"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 text-foreground px-8 py-3.5 text-sm font-sans font-medium hover:bg-foreground hover:text-background transition-colors duration-200"
              >
                Search by location
              </a>
            </div>
          </motion.div>

          {/* Stats block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="grid grid-cols-2 gap-px bg-border rounded-xl overflow-hidden"
          >
            {[
              { value: "400+", label: "HFEA-licensed clinics compared" },
              { value: "UK & abroad", label: "including Spain, Czech Republic & Greece" },
              { value: "5 age brackets", label: "success rates from under 35 to 43+" },
              { value: "6 treatment types", label: "IVF, ICSI, IUI, donor egg, donor sperm & double donor" },
            ].map((s) => (
              <div key={s.label} className="bg-background-alt p-6">
                <p
                  className="font-sans font-medium text-foreground mb-1"
                  style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
                >
                  {s.value}
                </p>
                <p className="text-xs font-sans text-muted leading-snug">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
