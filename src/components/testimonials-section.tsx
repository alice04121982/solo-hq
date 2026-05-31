"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const EASE = [0.16, 1, 0.3, 1] as const;

const testimonials = [
  {
    quote:
      "I'd spent two years on the fence, terrified of doing it alone. Flying Solo gave me the real numbers, the real timelines, and the community that told me — you can do this. My son Arlo is 14 months old.",
    name: "Gemma, 38",
    location: "Bristol",
    stage: "Mum to Arlo, conceived via donor IUI",
    featured: true,
  },
  {
    quote:
      "Nobody tells you how much the admin grinds you down. The clinic comparisons here saved me weeks of research and helped me ask the right questions.",
    name: "Sarah, 35",
    location: "Manchester",
    stage: "Currently in IVF cycle 2",
  },
  {
    quote:
      "The cost calculator was the first thing that made me feel like this was financially possible, not just a dream.",
    name: "Priya, 33",
    location: "London",
    stage: "Preparing for first IUI",
  },
  {
    quote:
      "I'm 42 and people kept telling me I'd left it too late. This community showed me women who'd had their babies at 43, 44, using donor eggs.",
    name: "Claire, 42",
    location: "Edinburgh",
    stage: "Pregnant — due in August",
  },
];

const journeyStories = [
  {
    name: "Alice",
    age: 37,
    tag: "Founder's story",
    title: "From 'someday' to mum of one in 22 months",
    body: "I started researching solo IVF after a relationship ended in my mid-30s. I gave myself three months to decide. I spent those months reading everything I could find — most of it either terrifyingly medical or suspiciously cheerful. I wanted the real version. My daughter Iris was born in 2023 after two IUI rounds and one IVF cycle. I built Flying Solo because I wished something like it had existed when I was starting out.",
    image: "/images/story-alice.jpg",
    imageAlt: "Alice with her newborn daughter Iris",
  },
  {
    name: "Natalie",
    age: 40,
    tag: "Donor egg journey",
    title: "I used donor eggs and I'm not ashamed of it",
    body: "After three failed IVF cycles with my own eggs, my consultant suggested donor eggs. I was devastated, then slowly curious, then — after reading a dozen stories from women who'd been exactly here — at peace with it. My twins Evi and Rosa are two and a half.",
    image: "/images/story-natalie.jpg",
    imageAlt: "Natalie with her twin daughters Evi and Rosa",
  },
  {
    name: "Jo",
    age: 34,
    tag: "First IVF cycle",
    title: "The bit nobody talks about: the two-week wait, alone",
    body: "Everyone warns you about the injections, the bloating, the retrieval. No one warns you how hard the two-week wait is when there's no partner to distract you, no one to catastrophise with at 2am. I found my people in the Flying Solo community during my wait.",
    image: "/images/story-jo.jpg",
    imageAlt: "Woman in quiet contemplation by the window",
  },
];

export function TestimonialsSection() {
  const [featured, ...rest] = testimonials;

  return (
    <section className="bg-background-alt">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">

        {/* Eyebrow + heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-20"
        >
          <p className="text-[12px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
            Real women. Real journeys.
          </p>
          <h2 className="font-serif font-semibold text-foreground" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1, maxWidth: "18ch" }}>
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
            className="font-serif italic text-foreground mb-6"
            style={{ fontSize: "clamp(1.375rem, 2.5vw, 2rem)", lineHeight: 1.35 }}
          >
            &ldquo;{featured.quote}&rdquo;
          </blockquote>
          <p className="text-[12px] font-[500] uppercase tracking-[0.15em] text-muted font-sans">
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
              <blockquote className="font-serif italic text-foreground text-lg leading-snug mb-4">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <p className="text-[12px] font-[500] uppercase tracking-[0.15em] text-muted font-sans">
                {t.name} &nbsp;·&nbsp; {t.location}
              </p>
              <p className="text-sm text-muted mt-1 font-sans">{t.stage}</p>
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
          <p className="text-[12px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
            Personal stories
          </p>
          <h2 className="font-serif font-semibold text-foreground" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}>
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
              {/* Story image */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-2">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <p className="text-[12px] font-[500] uppercase tracking-[0.15em] text-accent font-sans">
                {s.tag}
              </p>
              <h3 className="font-serif font-semibold text-foreground text-xl leading-snug">
                {s.title}
              </h3>
              <p className="text-[16px] font-sans text-muted leading-relaxed flex-1">{s.body}</p>
              <p className="text-[12px] font-[500] uppercase tracking-[0.15em] text-muted font-sans pt-4 border-t border-border">
                {s.name}, {s.age}
              </p>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
