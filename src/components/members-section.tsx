import Image from "next/image";

// Unsplash portrait photos — diverse range of women
// face_pad crop centres on faces; fit=crop fills the frame
const MEMBERS = [
  {
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&h=700&q=80&face_pad=2",
    alt: "Gemma, Flying Solo member",
    quote:
      "I spent a year reading everything I could find. Flying Solo was the first place that gave me real numbers, real timelines — and a community of women who said 'me too' without any judgement.",
    name: "Gemma",
    age: 38,
    location: "Bristol",
    stage: "Mum to Arlo, 14 months · donor IUI",
  },
  {
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=700&q=80",
    alt: "Sarah, Flying Solo member",
    quote:
      "The clinic comparison tool saved me weeks of research. I walked into my first consultation knowing exactly what questions to ask. I felt prepared rather than terrified.",
    name: "Sarah",
    age: 35,
    location: "Manchester",
    stage: "Currently in IVF cycle 2",
  },
  {
    photo: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=600&h=700&q=80",
    alt: "Claire, Flying Solo member",
    quote:
      "I'm 42 and everyone kept telling me I'd left it too late. This community showed me women who'd had their babies at 43 and 44. It changed everything about how I saw my own chances.",
    name: "Claire",
    age: 42,
    location: "Edinburgh",
    stage: "Pregnant — due in August",
  },
  {
    photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&h=700&q=80",
    alt: "Jo, Flying Solo member",
    quote:
      "The two-week wait is brutal when you're doing it alone. I found my people here during mine. We were all refreshing the same tests at 3am. Knowing that made it bearable.",
    name: "Jo",
    age: 34,
    location: "London",
    stage: "Mum to Lila, 7 months · IVF",
  },
];

function MemberCard({
  photo,
  alt,
  quote,
  name,
  age,
  location,
  stage,
}: (typeof MEMBERS)[number]) {
  return (
    <div className="flex flex-col">
      {/* Photo */}
      <div className="relative w-full rounded-2xl overflow-hidden mb-5" style={{ aspectRatio: "3/4" }}>
        <Image
          src={photo}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>

      {/* Quote */}
      <blockquote
        className="font-serif italic text-foreground leading-snug mb-4 flex-1"
        style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)" }}
      >
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Attribution */}
      <div className="border-t border-border pt-4 mt-auto">
        <p className="font-sans font-semibold text-foreground text-sm">
          {name}, {age} &nbsp;·&nbsp; {location}
        </p>
        <p className="font-sans text-muted text-[13px] mt-0.5">{stage}</p>
      </div>
    </div>
  );
}

export function MembersSection() {
  return (
    <section className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">

        {/* Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-[11px] font-[500] uppercase tracking-[0.2em] text-muted font-sans mb-4">
              Flying Solo members
            </p>
            <h2
              className="font-serif font-semibold text-foreground"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.07, maxWidth: "20ch" }}
            >
              Life-changing moments,{" "}
              <em style={{ fontStyle: "italic", color: "var(--primary)" }}>
                shared.
              </em>
            </h2>
          </div>
          <p
            className="font-sans text-muted leading-relaxed"
            style={{ maxWidth: "38ch", fontSize: "1rem" }}
          >
            Thousands of women have found their community, their confidence, and their
            path to motherhood through Flying Solo. Here are a few of their stories.
          </p>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {MEMBERS.map((m) => (
            <MemberCard key={m.name} {...m} />
          ))}
        </div>

      </div>
    </section>
  );
}
