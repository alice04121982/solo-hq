"use client";

import { motion } from "framer-motion";
import type { Story } from "@/lib/family-types";

const EASE = [0.16, 1, 0.3, 1] as const;

export function PersonalStories({ stories }: { stories: Story[] }) {
  const [featured, ...rest] = stories;

  return (
    <section className="bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-14"
        >
          <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-3 font-sans">
            Personal stories
          </p>
          <h2
            className="font-sans font-bold"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)", lineHeight: 1.1, color: "#1A3A25" }}
          >
            In their own words.
          </h2>
        </motion.div>

        {/* Featured story */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16 border-l-2 border-accent pl-8 md:pl-12"
        >
          <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-accent mb-4 font-sans">
            {featured.tag}
          </p>
          <h3
            className="font-sans font-bold mb-5"
            style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)", lineHeight: 1.2, maxWidth: "32ch", color: "#1A3A25" }}
          >
            {featured.title}
          </h3>
          <p className="text-[17px] font-sans text-muted leading-relaxed mb-6" style={{ maxWidth: "62ch" }}>
            {featured.body}
          </p>
          <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted font-sans">
            {featured.name}, {featured.age} &nbsp;·&nbsp; {featured.location} &nbsp;·&nbsp; {featured.treatment}
          </p>
        </motion.div>

        {/* Secondary stories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
          {rest.map((story, i) => (
            <motion.article
              key={story.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
              className="py-8 border-t border-border"
            >
              <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-accent mb-3 font-sans">
                {story.tag}
              </p>
              <h3 className="font-sans font-bold text-xl leading-snug mb-4" style={{ color: "#1A3A25" }}>
                {story.title}
              </h3>
              <p className="text-sm font-sans text-muted leading-relaxed mb-5">{story.body}</p>
              <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted font-sans">
                {story.name}, {story.age} &nbsp;·&nbsp; {story.location}
              </p>
              <p className="text-xs font-sans text-muted/70 mt-1">{story.treatment}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
