import Image from "next/image";

const RACING_GREEN = "#0C2318";
const BRIGHT_GREEN = "#72EF8A";
const BODY_TEXT = "rgba(255,255,255,0.80)";
const LABEL_TEXT = "rgba(255,255,255,0.40)";

const PARAGRAPHS: { highlight: string; rest: string }[] = [
  {
    highlight: "Lying awake wondering",
    rest: " if she's brave enough to do this on her own. The one who isn't sure whether she's ready — or whether \"ready\" is even something you can be.",
  },
  {
    highlight: "Just booked her first consultation.",
    rest: " Navigating sperm donors, IVF protocols, and clinic waiting rooms. By herself, but more determined than she knew she could be.",
  },
  {
    highlight: "In the two-week wait,",
    rest: " holding hope and dread in equal measure. The one who got a positive test and had nobody to immediately phone.",
  },
  {
    highlight: "Already a mum.",
    rest: " Up at 3am, proud and exhausted and doing something remarkable — and quietly wondering where her people are.",
  },
];

export function ForEveryoneSection() {
  return (
    <section style={{ background: RACING_GREEN }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">

          {/* ── Left column ─────────────────────────────────────── */}
          <div>
            <p
              className="text-[11px] font-[500] uppercase tracking-[0.2em] font-sans mb-5"
              style={{ color: LABEL_TEXT }}
            >
              For every solo mum by choice
            </p>

            <h2
              className="font-serif font-semibold mb-10"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.25rem)", lineHeight: 1.08, color: "#FFFFFF" }}
            >
              Wherever you are on this path,{" "}
              <em style={{ fontStyle: "italic", color: BRIGHT_GREEN }}>
                Flying Solo is for you.
              </em>
            </h2>

            {/* Two illustrations side by side — explicit height so fill works */}
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
                className="text-[16px] font-sans leading-relaxed"
                style={{ color: BODY_TEXT }}
              >
                <span className="font-semibold" style={{ color: BRIGHT_GREEN }}>
                  {highlight}
                </span>
                {rest}
              </p>
            ))}

            <p
              className="font-serif font-semibold mt-2"
              style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)", lineHeight: 1.25, color: "#FFFFFF" }}
            >
              Flying Solo is for every woman choosing this path.
            </p>

            <div className="w-10 h-1 rounded-full" style={{ background: BRIGHT_GREEN, opacity: 0.5 }} />
          </div>

        </div>
      </div>
    </section>
  );
}
