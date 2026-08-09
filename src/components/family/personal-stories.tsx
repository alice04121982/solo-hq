"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Story } from "@/lib/family-types";

const EASE = [0.16, 1, 0.3, 1] as const;
const GREEN = "#1A3A25";
const GREEN_SOFT = "rgba(26,58,37,0.65)";

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
          <p
            className="text-[11px] font-[600] uppercase tracking-[0.15em] mb-3 font-sans"
            style={{ color: GREEN_SOFT }}
          >
            Personal stories
          </p>
          <h2
            className="font-sans font-bold"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)", lineHeight: 1.1, color: GREEN }}
          >
            In their own words.
          </h2>
          <p className="text-xs font-sans leading-relaxed mt-3" style={{ color: GREEN_SOFT, maxWidth: "60ch" }}>
            Illustrative stories while we collect real, consented accounts. To share
            yours, write to stories@cairnfertility.co.uk.
          </p>
        </motion.div>

        {/* Featured story */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16 flex flex-col md:flex-row md:items-start gap-8 md:gap-12"
        >
          {featured.image && (
            <div className="relative w-full md:w-[340px] shrink-0 aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.imageAlt ?? ""}
                fill
                sizes="(min-width: 768px) 340px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          {/* The rule stays with the text, so a story without a photograph
              still reads as the featured one. */}
          <div className="border-l-2 pl-8 md:pl-12" style={{ borderColor: GREEN }}>
          <p
            className="text-[11px] font-[600] uppercase tracking-[0.15em] mb-4 font-sans"
            style={{ color: GREEN_SOFT }}
          >
            {featured.tag}
          </p>
          <h3
            className="font-sans font-bold mb-5"
            style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)", lineHeight: 1.2, maxWidth: "32ch", color: GREEN }}
          >
            {featured.title}
          </h3>
          <p
            className="text-[17px] font-sans leading-relaxed mb-6"
            style={{ maxWidth: "62ch", color: GREEN }}
          >
            {featured.body}
          </p>
          <p
            className="text-[11px] font-[600] uppercase tracking-[0.15em] font-sans"
            style={{ color: GREEN_SOFT }}
          >
            {featured.name}, {featured.age} &nbsp;·&nbsp; {featured.location} &nbsp;·&nbsp; {featured.treatment}
          </p>
          </div>
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
              {story.image && (
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                  <Image
                    src={story.image}
                    alt={story.imageAlt ?? ""}
                    fill
                    sizes="(min-width: 768px) 480px, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <p
                className="text-[11px] font-[600] uppercase tracking-[0.15em] mb-3 font-sans"
                style={{ color: GREEN_SOFT }}
              >
                {story.tag}
              </p>
              <h3 className="font-sans font-bold text-xl leading-snug mb-4" style={{ color: GREEN }}>
                {story.title}
              </h3>
              <p
                className="text-sm font-sans leading-relaxed mb-5"
                style={{ color: GREEN }}
              >
                {story.body}
              </p>
              <p
                className="text-[11px] font-[600] uppercase tracking-[0.15em] font-sans"
                style={{ color: GREEN_SOFT }}
              >
                {story.name}, {story.age} &nbsp;·&nbsp; {story.location}
              </p>
              <p className="text-xs font-sans mt-1" style={{ color: GREEN_SOFT }}>
                {story.treatment}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
