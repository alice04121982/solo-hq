"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "I'd spent two years on the fence, terrified of doing it alone. Flying Solo gave me the real numbers, the real timelines, and the community that told me — you can do this. My son Arlo is 14 months old.",
    name: "Gemma, 38",
    location: "Bristol",
    stage: "Mum to Arlo, conceived via donor IUI",
    highlight: true,
  },
  {
    quote:
      "Nobody tells you how much the admin grinds you down. The clinic comparisons here saved me weeks of research and helped me ask the right questions. I felt like I actually knew what I was doing by the time I walked in.",
    name: "Sarah, 35",
    location: "Manchester",
    stage: "Currently in IVF cycle 2",
  },
  {
    quote:
      "The cost calculator was the first thing that made me feel like this was financially possible, not just a dream. I could see a real plan. I started saving differently after that.",
    name: "Priya, 33",
    location: "London",
    stage: "Preparing for first IUI",
  },
  {
    quote:
      "I'm 42 and people kept telling me I'd left it too late. This community showed me women who'd had their babies at 43, 44, using donor eggs. I stopped listening to the noise and started listening to the facts.",
    name: "Claire, 42",
    location: "Edinburgh",
    stage: "Pregnant — due in August",
  },
];

const journeyStories = [
  {
    name: "Alice",
    age: 37,
    title: "From 'someday' to mum of one in 22 months",
    body: "I started researching solo IVF after a relationship ended in my mid-30s. I gave myself three months to decide. I spent those months reading everything I could find — most of it either terrifyingly medical or suspiciously cheerful. I wanted the real version. My daughter Iris was born in 2023 after two IUI rounds and one IVF cycle. I built Flying Solo because I wished something like it had existed when I was starting out.",
    tag: "Founder's story",
    tagColor: "bg-lime text-charcoal",
  },
  {
    name: "Natalie",
    age: 40,
    title: "I used donor eggs and I'm not ashamed of it",
    body: "After three failed IVF cycles with my own eggs, my consultant suggested donor eggs. I was devastated, then slowly curious, then — after reading a dozen stories from women who'd been exactly here — at peace with it. My twins Evi and Rosa are two and a half. They know their mum wanted them so much she moved mountains to get here.",
    tag: "Donor egg journey",
    tagColor: "bg-lavender-light text-lavender-dark",
  },
  {
    name: "Jo",
    age: 34,
    title: "The bit nobody talks about: the two-week wait, alone",
    body: "Everyone warns you about the injections, the bloating, the retrieval. No one warns you how hard the two-week wait is when there's no partner to distract you, no one to catastrophise with at 2am. I found my people in the Flying Solo community during my wait. They got me through. I got my positive on a Tuesday morning with the cat on my lap.",
    tag: "First IVF cycle",
    tagColor: "bg-warm-white text-muted border border-card-border",
  },
];

export function TestimonialsSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-lavender-dark mb-2">
          Real women. Real journeys.
        </p>
        <h2 className="text-3xl md:text-4xl text-navy leading-tight max-w-lg">
          You&rsquo;re not the first to feel this way.
          <br />
          <span className="text-navy/40">And you won&rsquo;t be the last.</span>
        </h2>
      </motion.div>

      {/* Testimonial quote cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className={`rounded-[24px] p-7 flex flex-col gap-4 ${
              t.highlight
                ? "bg-navy text-white col-span-1 sm:col-span-2"
                : "bg-card-bg border border-card-border"
            }`}
          >
            <Quote
              className={`h-5 w-5 flex-shrink-0 ${
                t.highlight ? "text-lavender" : "text-lavender-dark"
              }`}
            />
            <p
              className={`text-base leading-relaxed ${
                t.highlight ? "text-white/90" : "text-navy/80"
              } ${t.highlight ? "md:text-lg max-w-3xl" : ""}`}
            >
              {t.quote}
            </p>
            <div className="mt-auto pt-2">
              <p
                className={`text-sm font-semibold ${
                  t.highlight ? "text-white" : "text-navy"
                }`}
              >
                {t.name} &middot; {t.location}
              </p>
              <p
                className={`text-xs mt-0.5 ${
                  t.highlight ? "text-white/50" : "text-muted"
                }`}
              >
                {t.stage}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Journey story cards */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-lavender-dark mb-2">
          Personal stories
        </p>
        <h2 className="text-3xl md:text-4xl text-navy leading-tight">
          In their own words.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {journeyStories.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="rounded-[24px] bg-card-bg border border-card-border p-7 flex flex-col gap-4"
          >
            <span
              className={`self-start text-xs font-semibold px-3 py-1 rounded-full ${s.tagColor}`}
            >
              {s.tag}
            </span>
            <h3 className="text-lg font-normal text-navy leading-snug">
              {s.title}
            </h3>
            <p className="text-sm text-navy/60 leading-relaxed flex-1">
              {s.body}
            </p>
            <p className="text-xs text-muted pt-2 border-t border-card-border">
              {s.name}, {s.age}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
