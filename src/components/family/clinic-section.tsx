"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const GREEN = "#1A3A25";
const GREEN_SOFT = "rgba(26,58,37,0.65)";

export function ClinicSection({ clinicNote }: { clinicNote: string }) {
  return (
    <section className="bg-background border-b border-border">
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
              Clinic comparison
            </p>
            <h2
              className="font-sans font-bold mb-4"
              style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: GREEN }}
            >
              Find the right clinic
              <br />
              for your family.
            </h2>
            <p
              className="text-sm font-sans leading-relaxed mb-8"
              style={{ maxWidth: "48ch", color: GREEN }}
            >
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
                className="inline-flex items-center gap-2 rounded-full border border-[#1A3A25]/20 text-[#1A3A25] px-8 py-3.5 text-sm font-sans font-medium hover:bg-[#1A3A25] hover:text-white transition-colors duration-200"
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
            className="grid grid-cols-2 rounded-xl overflow-hidden"
            style={{ background: "var(--teal)" }}
          >
            {[
              { value: "HFEA data", label: "success rates from the public register" },
              { value: "UK & abroad", label: "including Spain, Czech Republic & Greece" },
              { value: "5 age brackets", label: "success rates from under 35 to 43+" },
              { value: "6 treatment types", label: "IVF, ICSI, IUI, donor egg, donor sperm & double donor" },
            ].map((s) => (
              <div key={s.label} className="p-6" style={{ background: "var(--teal)" }}>
                <p
                  className="font-sans font-bold mb-1.5"
                  style={{ fontSize: "clamp(1.625rem, 2.2vw, 2.25rem)", lineHeight: 1.15, color: "#f9c6da" }}
                >
                  {s.value}
                </p>
                <p
                  className="text-xs font-sans leading-snug"
                  style={{ color: "#c4a0ae" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
