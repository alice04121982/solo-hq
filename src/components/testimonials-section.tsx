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
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=80",
  },
  {
    quote:
      "Nobody tells you how much the admin grinds you down. The clinic comparisons here saved me weeks of research and helped me ask the right questions.",
    name: "Sarah, 35",
    location: "Manchester",
    stage: "Currently in IVF cycle 2",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80",
  },
  {
    quote:
      "The cost calculator was the first thing that made me feel like this was financially possible, not just a dream.",
    name: "Priya, 33",
    location: "London",
    stage: "Preparing for first IUI",
    photo: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=100&h=100&q=80",
  },
  {
    quote:
      "I'm 42 and people kept telling me I'd left it too late. This community showed me women who'd had their babies at 43, 44, using donor eggs.",
    name: "Claire, 42",
    location: "Edinburgh",
    stage: "Pregnant — due in August",
    photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=100&h=100&q=80",
  },
];

const journeyStories = [
  {
    name: "Alice",
    age: 37,
    tag: "Founder's story",
    title: "From 'someday' to mum of one in 22 months",
    body: "I started researching solo IVF after a relationship ended in my mid-30s. I gave myself three months to decide. I spent those months reading everything I could find — most of it either terrifyingly medical or suspiciously cheerful. I wanted the real version. My daughter Iris was born in 2023 after two IUI rounds and one IVF cycle. I built Flying Solo because I wished something like it had existed when I was starting out.",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=600&h=280&q=80",
  },
  {
    name: "Natalie",
    age: 40,
    tag: "Donor egg journey",
    title: "I used donor eggs and I'm not ashamed of it",
    body: "After three failed IVF cycles with my own eggs, my consultant suggested donor eggs. I was devastated, then slowly curious, then — after reading a dozen stories from women who'd been exactly here — at peace with it. My twins Evi and Rosa are two and a half.",
    image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=600&h=280&q=80",
  },
  {
    name: "Jo",
    age: 34,
    tag: "First IVF cycle",
    title: "The bit nobody talks about: the two-week wait, alone",
    body: "Everyone warns you about the injections, the bloating, the retrieval. No one warns you how hard the two-week wait is when there's no partner to distract you, no one to catastrophise with at 2am. I found my people in the Flying Solo community during my wait.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=280&q=80",
  },
];

export function TestimonialsSection() {
  const [featured, ...rest] = testimonials;

  return (
    <section
      className="relative bg-lavender overflow-hidden"
      style={{
        "--background":     "var(--lavender)",
        "--background-alt": "#F5F1E6",
        "--foreground":     "var(--navy)",
        "--muted":          "rgba(61,13,27,0.55)",
        "--border":         "rgba(61,13,27,0.12)",
        "--accent":         "var(--navy)",
      } as React.CSSProperties}
    >
      {/* Decorative shapes */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full border-2 border-navy/10" />
        <div className="absolute top-1/2 -right-16 w-48 h-48 rounded-full border border-navy/8" />
        <div
          className="absolute bottom-32 left-1/4 w-36 h-36 bg-navy/5"
          style={{ borderRadius: "40% 60% 30% 70% / 60% 40% 70% 30%" }}
        />
        <div className="absolute top-40 right-1/3 w-3 h-3 rounded-full bg-navy/20" />
        <div className="absolute bottom-48 right-1/4 w-2 h-2 rounded-full bg-navy/15" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">

        {/* Eyebrow + heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-20"
        >
          <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
            Real women. Real journeys.
          </p>
          <h2 className="font-serif font-normal text-foreground" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1, maxWidth: "18ch" }}>
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
            style={{ fontSize: "clamp(1.375rem, 2.5vw, 2rem)", lineHeight: 1.35 }}
          >
            &ldquo;{featured.quote}&rdquo;
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-navy/20">
              <Image src={featured.photo} alt={featured.name} fill className="object-cover" />
            </div>
            <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted font-sans">
              {featured.name} &nbsp;·&nbsp; {featured.location} &nbsp;·&nbsp; {featured.stage}
            </p>
          </div>
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
              <blockquote className="font-serif text-foreground text-lg leading-snug mb-5">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-navy/20">
                  <Image src={t.photo} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted font-sans">
                    {t.name} &nbsp;·&nbsp; {t.location}
                  </p>
                  <p className="text-xs text-muted mt-0.5 font-sans">{t.stage}</p>
                </div>
              </div>
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
          <h2 className="font-serif font-normal text-foreground" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}>
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
              <div className="relative h-52 rounded-2xl overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover"
                  style={{ filter: "saturate(0.85)" }}
                />
              </div>
              <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-accent font-sans mt-1">
                {s.tag}
              </p>
              <h3 className="font-serif font-normal text-foreground text-xl leading-snug">
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
