import Image from "next/image";

// #72EF8A is a bright brand-band accent used only inside bg-bg-brand-section-deep.
// It has no KLEO token equivalent and is kept as an inline style.
const BRIGHT_GREEN = "#72EF8A";

const PARAGRAPHS: { highlight: string; rest: string }[] = [
  {
    highlight: "Still figuring out the path.",
    rest: " Whether you're considering going solo, exploring donor conception, or researching surrogacy — you're not alone in not having all the answers yet.",
  },
  {
    highlight: "Two mums preparing for reciprocal IVF.",
    rest: " Navigating donor choices, clinic protocols, and who carries first. Together, but still surprised how much there is to learn.",
  },
  {
    highlight: "In the two-week wait,",
    rest: " holding hope and dread in equal measure. Solo, partnered, same-sex or otherwise — this part is hard for everyone.",
  },
  {
    highlight: "Already a parent, doing something remarkable.",
    rest: " Up at 3am — proud, exhausted, and quietly wondering where your people are. Whatever your path here, KLEO is for you.",
  },
];

export function ForEveryoneSection() {
  return (
    <section className="bg-bg-brand-section-deep">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">

          {/* ── Left column ─────────────────────────────────────── */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] font-sans mb-5 text-text-white opacity-40">
              For every family, on every path
            </p>

            <h2
              className="font-serif font-semibold text-text-white mb-10"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.25rem)", lineHeight: 1.08 }}
            >
              Whatever your path,{" "}
              <em className="not-italic" style={{ color: BRIGHT_GREEN }}>
                KLEO Fertility is for you.
              </em>
            </h2>

            <div className="flex items-end gap-3">
              <div className="relative w-1/2 h-52 md:h-64">
                <Image
                  src="/images/illustrations/phase-pregnancy.png"
                  alt="Solo mother journey"
                  fill
                  className="object-contain object-bottom"
                  sizes="(min-width: 768px) 20vw, 40vw"
                />
              </div>
              <div className="relative w-1/2 h-52 md:h-64">
                <Image
                  src="/images/illustrations/phase-life-ahead.png"
                  alt="Solo mother with child"
                  fill
                  className="object-contain object-bottom"
                  sizes="(min-width: 768px) 20vw, 40vw"
                />
              </div>
            </div>
          </div>

          {/* ── Right column ─────────────────────────────────────── */}
          <div className="flex flex-col gap-7 md:pt-16">
            {PARAGRAPHS.map(({ highlight, rest }) => (
              <p
                key={highlight}
                className="text-md font-sans leading-relaxed text-text-white opacity-80"
              >
                <span className="font-semibold opacity-100" style={{ color: BRIGHT_GREEN }}>
                  {highlight}
                </span>
                {rest}
              </p>
            ))}

            <p
              className="font-serif font-semibold text-text-white mt-2"
              style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)", lineHeight: 1.25 }}
            >
              KLEO Fertility is for every family choosing this path.
            </p>

            <div
              className="w-10 h-1 rounded-full opacity-50"
              style={{ background: BRIGHT_GREEN }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
