"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  formatNewsDate,
  hostOf,
  newsInOrder,
  topicsInUse,
  type NewsItem,
  type NewsTopic,
} from "@/lib/news";

/**
 * The media roundup: a list of links out, with a topic filter.
 *
 * Every card is one anchor to the publisher, so the whole card is the link
 * and nothing inside it competes for the click. Each one shows the outlet and
 * the domain it goes to before it is clicked — this is a page full of
 * offsite links, and someone deciding whether to follow one deserves to know
 * where it lands.
 */

/** The one line of metadata above every headline. */
function Byline({ item, tone = "muted" }: { item: NewsItem; tone?: "muted" | "teal" }) {
  const parts = [item.outlet, item.kind, item.published && formatNewsDate(item.published)].filter(
    Boolean
  );
  return (
    <p
      className={`text-[13px] font-[500] uppercase tracking-[0.15em] font-sans ${
        tone === "teal" ? "text-teal" : "text-muted"
      }`}
    >
      {parts.join(" · ")}
    </p>
  );
}

function RelatedLink({ item }: { item: NewsItem }) {
  if (!item.related) return null;
  return (
    <a
      href={item.related.href}
      className="inline-flex items-center gap-1.5 text-sm font-sans text-teal border-b border-teal/30 pb-0.5 transition-colors duration-150 hover:border-teal"
    >
      {item.related.label}
    </a>
  );
}

export function FeaturedNews({ item }: { item: NewsItem }) {
  return (
    <div className="border-l-2 border-accent pl-8 md:pl-12">
      <Byline item={item} tone="teal" />
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block mt-4"
      >
        <h2
          className="font-sans font-bold text-foreground group-hover:text-teal transition-colors duration-150"
          style={{ fontSize: "clamp(2rem, 3vw, 3.25rem)", lineHeight: 1.15, maxWidth: "28ch" }}
        >
          {item.title}
          <ArrowUpRight
            className="inline h-[0.7em] w-[0.7em] ml-2 align-baseline text-teal"
            aria-hidden
          />
        </h2>
      </a>
      <p className="text-lg font-sans text-muted leading-relaxed mt-4 mb-6" style={{ maxWidth: "60ch" }}>
        {item.note}
      </p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-sans text-foreground border-b border-foreground/30 pb-0.5 transition-colors duration-150 hover:border-teal hover:text-teal"
        >
          Read on {hostOf(item.url)} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </a>
        <RelatedLink item={item} />
      </div>
    </div>
  );
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="py-8 border-t border-border flex flex-col">
      <Byline item={item} />
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block mt-3"
      >
        <h3
          className="font-sans font-bold text-foreground text-lg leading-snug group-hover:text-teal transition-colors duration-150"
          style={{ maxWidth: "26ch" }}
        >
          {item.title}
          <ArrowUpRight
            className="inline h-[0.75em] w-[0.75em] ml-1.5 align-baseline text-teal"
            aria-hidden
          />
        </h3>
      </a>
      <p className="text-sm font-sans text-muted leading-relaxed mt-3 mb-4 flex-1">{item.note}</p>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="text-[13px] font-sans text-muted">{hostOf(item.url)}</span>
        <RelatedLink item={item} />
      </div>
    </article>
  );
}

/** Filter chips. "All" is always first and is the default. */
function TopicFilter({
  topics,
  active,
  onChange,
  counts,
}: {
  topics: NewsTopic[];
  active: NewsTopic | "all";
  onChange: (topic: NewsTopic | "all") => void;
  counts: Record<string, number>;
}) {
  const chip = (key: NewsTopic | "all", label: string) => {
    const isActive = active === key;
    return (
      <button
        key={key}
        type="button"
        onClick={() => onChange(key)}
        aria-pressed={isActive}
        className={`rounded-full border px-4 py-2 text-sm font-sans transition-colors duration-150 ${
          isActive
            ? "border-teal bg-teal text-on-teal"
            : "border-border bg-background text-muted hover:bg-surface-hover hover:text-foreground"
        }`}
      >
        {label}
        <span className={isActive ? "opacity-70" : "opacity-60"}> ({counts[key]})</span>
      </button>
    );
  };

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter coverage by topic">
      {chip("all", "All")}
      {topics.map((t) => chip(t, t))}
    </div>
  );
}

export function NewsList({ items }: { items: NewsItem[] }) {
  const [topic, setTopic] = useState<NewsTopic | "all">("all");

  const ordered = useMemo(() => newsInOrder(items), [items]);
  const topics = useMemo(() => topicsInUse(items), [items]);
  const counts = useMemo(() => {
    const byTopic: Record<string, number> = { all: items.length };
    for (const t of topics) byTopic[t] = items.filter((i) => i.topic === t).length;
    return byTopic;
  }, [items, topics]);

  const shown = topic === "all" ? ordered : ordered.filter((i) => i.topic === topic);

  return (
    <div>
      <div className="mb-10">
        <TopicFilter topics={topics} active={topic} onChange={setTopic} counts={counts} />
      </div>

      <p className="sr-only" aria-live="polite">
        {shown.length} {shown.length === 1 ? "item" : "items"} shown.
      </p>

      {shown.length === 0 ? (
        <p className="text-base font-sans text-muted">Nothing on this topic yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0">
          {shown.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
