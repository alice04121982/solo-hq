"use client";

import { motion } from "framer-motion";
import { COMMUNITY_QUOTES } from "@/lib/quotes";

const EASE = [0.16, 1, 0.3, 1] as const;

const testimonials = COMMUNITY_QUOTES;

const journeyStories = [
  {
    name: "Alice",
    age: 37,
    tag: "Founder's story",
    title: "From 'someday' to mum of one in 22 months",
    body: "I started researching solo IVF after a relationship ended in my mid-30s. I gave myself three months to decide. I spent those months reading everything I could find, most of it either terrifyingly medical or suspiciously cheerful. I wanted the real version. My daughter Iris was born in 2023 after two IUI rounds and one IVF cycle. I built Cairn because I wished something like it had existed when I was starting out.",
  },
  {
    name: "Natalie",
    age: 40,
    tag: "Donor egg journey",
    title: "I used donor eggs and I'm not ashamed of it",
    body: "After three failed IVF cycles with my own eggs, my consultant suggested donor eggs. I was devastated, then slowly curious, then, after reading a dozen stories from women who'd been exactly here, at peace with it. My twins Evi and Rosa are two and a half.",
  },
  {
    name: "Jo",
    age: 34,
    tag: "First IVF cycle",
    title: "The bit nobody talks about: the two-week wait, alone",
    body: "Everyone warns you about the injections, the bloating, the retrieval. No one warns you how hard the two-week wait is when there's no partner to distract you, no one to catastrophise with at 2am. I found my people in the Cairn community during my wait.",
  },
];

export function TestimonialsSection() {
  const [featured, ...rest] = testimonials;

  return (
    <section className="bg-background-alt">
      <div className="mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">

        {/* Eyebrow + heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-20"
        >
          <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
            Real people. Real journeys.
          </p>
          <h2 className="font-sans font-bold text-foreground" style={{ fontSize: "clamp(2.25rem, 4vw, 4rem)", lineHeight: 1.1, maxWidth: "18ch" }}>
            You&rsquo;re not the first to feel this way.
          </h2>
        </motion.div>

        {/* Featured pull-quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-20 border-l-2 border-accent pl-8 md:pl-12"
        >
          <blockquote
            className="font-serif text-foreground mb-6"
            style={{ fontSize: "clamp(1.625rem, 2.5vw, 2.5rem)", lineHeight: 1.35 }}
          >
            &ldquo;{featured.quote}&rdquo;
          </blockquote>
          <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted font-sans">
            {featured.name} &nbsp;·&nbsp; {featured.location} &nbsp;·&nbsp; {featured.stage}
          </p>
        </motion.div>

        {/* Secondary quotes — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          {rest.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
            >
              <blockquote className="font-serif text-foreground text-lg leading-snug mb-4">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted font-sans">
                {t.name} &nbsp;·&nbsp; {t.location}
              </p>
              <p className="text-xs text-muted mt-1 font-sans">{t.stage}</p>
            </motion.div>
          ))}
        </div>

        {/* Journey stories */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12"
        >
          <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
            Personal stories
          </p>
          <h2 className="font-sans font-bold text-foreground" style={{ fontSize: "clamp(2.25rem, 3.5vw, 3.5rem)", lineHeight: 1.1 }}>
            In their own words.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
          {journeyStories.map((s, i) => (
            <motion.article
              key={s.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className="flex flex-col gap-4"
            >
              <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-teal font-sans">
                {s.tag}
              </p>
              <h3 className="font-sans font-bold text-foreground text-xl leading-snug">
                {s.title}
              </h3>
              <p className="text-sm font-sans text-muted leading-relaxed flex-1">{s.body}</p>
              <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted font-sans pt-4 border-t border-border">
                {s.name}, {s.age}
              </p>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
