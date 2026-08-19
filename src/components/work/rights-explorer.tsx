"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CircleSlash, ExternalLink, Scale } from "lucide-react";
import type { RightsEntry, RightsPoint } from "@/lib/work";

const TEAL = "var(--teal)";
const TEAL_SOFT = "rgba(0, 83, 83, 0.6)";

/**
 * Rights, split into what the law gives you and what it does not. The split is
 * the whole point of the component: nearly every published piece on this
 * subject blurs statutory rights into employer policy, and a reader who acts
 * on that blur is the person this page exists for.
 *
 * The first entry is the one almost every reader needs, so it is laid open as
 * a featured card rather than hidden behind a control. The rest ride a
 * carousel — an accordion made four jurisdictions look like one long legal
 * document, and made three of them look optional.
 *
 * Every panel sits on a white card, because the lime fill that marks "this is
 * the law" only holds its edge against white; on the cream band it goes muddy.
 */
export function RightsExplorer({ entries }: { entries: RightsEntry[] }) {
  const [featured, ...rest] = entries;
  if (!featured) return null;

  return (
    <div>
      <FeaturedEntry entry={featured} />
      {rest.length > 0 && <ElsewhereCarousel entries={rest} />}
    </div>
  );
}

/* ── The lead jurisdiction, laid open ────────────────────────────────────── */

function FeaturedEntry({ entry }: { entry: RightsEntry }) {
  return (
    <article
      id={entry.slug}
      className="scroll-mt-24 rounded-3xl border bg-background p-6 md:p-10"
      style={{ borderColor: "var(--border)" }}
    >
      <span
        className="inline-block rounded-full px-3 py-1 text-[11px] font-[700] uppercase tracking-[0.16em] font-sans mb-5"
        style={{ background: "var(--accent)", color: "var(--on-accent)" }}
      >
        Where most readers are
      </span>

      <h3
        className="font-sans font-bold mb-3"
        style={{ fontSize: "clamp(1.875rem, 3vw, 2.75rem)", lineHeight: 1.1, color: TEAL }}
      >
        {entry.name}
      </h3>
      <p
        className="text-[17px] md:text-[18px] font-sans leading-[1.6] text-muted mb-8"
        style={{ maxWidth: "60ch" }}
      >
        {entry.summary}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <LawPanel points={entry.theLaw} />
        <NotLawPanel points={entry.notTheLaw} />
      </div>

      <UsingIt items={entry.useIt} className="mt-8" />
      <Sources sources={entry.sources} className="mt-7" />
    </article>
  );
}

/* ── Everywhere else, as a carousel of cards ─────────────────────────────── */

function ElsewhereCarousel({ entries }: { entries: RightsEntry[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 8);
    setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 8);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows]);

  const step = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-rights-card]");
    const gap = 20;
    track.scrollBy({
      left: direction * ((card?.offsetWidth ?? track.clientWidth) + gap),
      behavior: "smooth",
    });
  };

  const arrowStyle = (enabled: boolean) => ({
    borderColor: "var(--teal-25)",
    color: TEAL,
    opacity: enabled ? 1 : 0.3,
  });

  return (
    <section aria-label="Fertility treatment and employment law outside the UK" className="mt-14 md:mt-16">
      <div className="flex items-end justify-between gap-6 mb-6">
        <div>
          <h3 className="font-sans font-bold text-2xl md:text-3xl mb-2" style={{ color: TEAL }}>
            If you work somewhere else
          </h3>
          <p className="text-[16px] font-sans leading-[1.6] text-muted" style={{ maxWidth: "52ch" }}>
            The same split, jurisdiction by jurisdiction. Swipe through, or use the arrows.
          </p>
        </div>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={() => step(-1)}
            disabled={!canPrev}
            aria-label="Previous jurisdiction"
            className="inline-flex items-center justify-center h-11 w-11 rounded-full border transition-opacity duration-150"
            style={arrowStyle(canPrev)}
          >
            <ArrowLeft className="h-4.5 w-4.5" />
          </button>
          <button
            onClick={() => step(1)}
            disabled={!canNext}
            aria-label="Next jurisdiction"
            className="inline-flex items-center justify-center h-11 w-11 rounded-full border transition-opacity duration-150"
            style={arrowStyle(canNext)}
          >
            <ArrowRight className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={updateArrows}
        className="flex items-start gap-5 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {entries.map((e) => (
          <article
            key={e.slug}
            id={e.slug}
            data-rights-card
            className="scroll-mt-24 flex-none w-[86vw] sm:w-[26rem] lg:w-[calc((100%-1.25rem)/2)] snap-start rounded-3xl border bg-background p-6 md:p-8"
            style={{ borderColor: "var(--border)" }}
          >
            <h4 className="font-sans font-bold text-2xl mb-2.5" style={{ color: TEAL }}>
              {e.name}
            </h4>
            <p className="text-[16px] font-sans leading-[1.6] text-muted mb-6">{e.summary}</p>

            <LawPanel points={e.theLaw} />
            <NotLawPanel points={e.notTheLaw} className="mt-4" />
            <UsingIt items={e.useIt} className="mt-7" />
            <Sources sources={e.sources} className="mt-7" />
          </article>
        ))}
      </div>
    </section>
  );
}

/* ── Shared parts ────────────────────────────────────────────────────────── */

/**
 * A point reads as a claim you can scan plus the detail behind it, ruled off
 * from the next one. Whole paragraphs stacked in a list is what made this
 * section unreadable.
 */
function PointList({ points, onLime }: { points: RightsPoint[]; onLime?: boolean }) {
  return (
    <ul className="space-y-3.5">
      {points.map((p, i) => (
        <li
          key={p.point}
          className={i === 0 ? "" : "border-t pt-3.5"}
          style={{ borderColor: onLime ? "var(--on-accent-line)" : "var(--border)" }}
        >
          <p
            className="text-[16px] font-sans font-[600] leading-[1.45]"
            style={{ color: onLime ? "var(--on-accent)" : TEAL }}
          >
            {p.point}
          </p>
          {p.detail && (
            <p
              className="text-[15px] font-sans leading-[1.6] mt-1.5"
              style={{ color: onLime ? "var(--on-accent-muted)" : "var(--muted)" }}
            >
              {p.detail}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

function PanelLabel({
  children,
  onLime,
  icon,
}: {
  children: React.ReactNode;
  onLime?: boolean;
  icon: React.ReactNode;
}) {
  return (
    <p
      className="inline-flex items-center gap-2 text-[12px] font-[700] uppercase tracking-[0.14em] mb-4 font-sans"
      style={{ color: onLime ? "var(--on-accent)" : TEAL_SOFT }}
    >
      {icon}
      {children}
    </p>
  );
}

function LawPanel({ points, className }: { points: RightsPoint[]; className?: string }) {
  return (
    <div
      className={`rounded-2xl p-5 md:p-6 ${className ?? ""}`}
      style={{ background: "var(--accent)" }}
    >
      <PanelLabel onLime icon={<Scale className="h-3.5 w-3.5" />}>
        What the law gives you
      </PanelLabel>
      <PointList points={points} onLime />
    </div>
  );
}

function NotLawPanel({ points, className }: { points: RightsPoint[]; className?: string }) {
  return (
    <div
      className={`rounded-2xl border p-5 md:p-6 ${className ?? ""}`}
      style={{ borderColor: "var(--border)" }}
    >
      <PanelLabel icon={<CircleSlash className="h-3.5 w-3.5" />}>What it does not</PanelLabel>
      <PointList points={points} />
    </div>
  );
}

function UsingIt({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={className}>
      <p
        className="text-[12px] font-[700] uppercase tracking-[0.14em] mb-3 font-sans"
        style={{ color: TEAL_SOFT }}
      >
        Using it
      </p>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span
              className="mt-2.5 h-1 w-1 rounded-full shrink-0"
              style={{ background: TEAL, opacity: 0.45 }}
            />
            <p className="text-[15px] font-sans leading-[1.6] text-muted">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Sources({
  sources,
  className,
}: {
  sources: RightsEntry["sources"];
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ""}`}>
      {sources.map((s) => (
        <a
          key={s.href}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-sans transition-colors hover:bg-[var(--teal)] hover:text-white"
          style={{ borderColor: "var(--border)", color: TEAL }}
        >
          {s.label}
          <ExternalLink className="h-3 w-3 shrink-0" />
        </a>
      ))}
    </div>
  );
}
