"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MEMBERS = [
  {
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&h=800&q=80&face_pad=2",
    alt: "Gemma, KLEO Fertility member",
    name: "Gemma",
    age: 38,
    location: "Bristol",
    stage: "Mum to Arlo, 14 months · donor IUI",
  },
  {
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=800&q=80",
    alt: "Sarah, KLEO Fertility member",
    name: "Sarah",
    age: 35,
    location: "Manchester",
    stage: "Currently in IVF cycle 2",
  },
  {
    photo: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=600&h=800&q=80",
    alt: "Claire, KLEO Fertility member",
    name: "Claire",
    age: 42,
    location: "Edinburgh",
    stage: "Pregnant, due in August",
  },
  {
    photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&h=800&q=80",
    alt: "Jo, KLEO Fertility member",
    name: "Jo",
    age: 34,
    location: "London",
    stage: "Mum to Lila, 7 months · IVF",
  },
  {
    photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&h=800&q=80",
    alt: "Priya, KLEO Fertility member",
    name: "Priya",
    age: 33,
    location: "London",
    stage: "Preparing for first IUI",
  },
];

function PortraitCard({ photo, alt, name, age, location, stage }: (typeof MEMBERS)[number]) {
  return (
    /* Outer wrapper: fixed width on mobile/tablet, fills the grid column on desktop */
    <div className="flex-shrink-0 w-[230px] sm:w-[260px] lg:w-full rounded-tl-[100px] overflow-hidden">
      {/* Padding-top trick: 133.3% = 4/3 inverted = 3:4 portrait ratio, always reliable */}
      <div className="relative pt-[133.3%]">
        <Image
          src={photo}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="(min-width: 1024px) 20vw, 260px"
        />

        {/* Attribution overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent pt-16 pb-5 px-5">
          <p className="text-white font-semibold text-sm font-sans leading-snug">
            {name}, {age} &nbsp;·&nbsp; {location}
          </p>
          <p className="text-white/70 text-xs font-sans mt-1">{stage}</p>
        </div>
      </div>
    </div>
  );
}

export function MembersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: 1 | -1) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 280, behavior: "smooth" });
  }

  return (
    <section className="bg-bg-brand-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">

        {/* Header */}
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary font-sans mb-4">
              KLEO Fertility members
            </p>
            <h2
              className="font-display font-bold text-text-primary"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                lineHeight: 1.07,
                letterSpacing: "-0.02em",
                maxWidth: "20ch",
              }}
            >
              Life changing moments,{" "}
              <em className="not-italic text-text-brand-secondary">shared.</em>
            </h2>
          </div>

          {/* Navigation arrows — desktop */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              onClick={() => scroll(-1)}
              aria-label="Previous members"
              className="p-2.5 rounded-full border border-border-secondary bg-bg-primary hover:bg-bg-secondary transition-colors duration-150"
            >
              <ChevronLeft className="h-5 w-5 text-fg-secondary" />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Next members"
              className="p-2.5 rounded-full border border-border-secondary bg-bg-primary hover:bg-bg-secondary transition-colors duration-150"
            >
              <ChevronRight className="h-5 w-5 text-fg-secondary" />
            </button>
          </div>
        </div>

        {/* Portrait card strip */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-5 overflow-x-auto lg:grid lg:grid-cols-5 lg:overflow-visible lg:w-full"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {MEMBERS.map((m) => (
            <PortraitCard key={m.name} {...m} />
          ))}
        </div>

      </div>
    </section>
  );
}
