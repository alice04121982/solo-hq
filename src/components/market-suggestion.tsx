"use client";

import { usePathname } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { CountryFlag } from "./country-flag";
import {
  counterpartPath,
  hasMarketChoice,
  marketFromLanguage,
  marketFromPath,
  rememberMarketChoice,
  type Market,
} from "@/lib/market";

const noSubscribe = () => () => {};
const getLanguage = () => navigator.language;
const getServerNull = () => null;
const getServerTrue = () => true;

/**
 * A quiet, one-time offer to switch market, shown under the nav.
 *
 * It reads only the browser's language setting. There is no IP lookup and
 * no redirect: the visitor decides. It shows when the browser says en-US on
 * a UK page (or en-GB on a US page), and never again in this browser once
 * they choose either way or dismiss it.
 */
export function MarketSuggestion({ theme = "light" }: { theme?: "light" | "dark" }) {
  const pathname = usePathname() ?? "/";
  // Browser-only inputs, read with a null server snapshot: the static HTML
  // never contains the strip, so it cannot flash for visitors it doesn't
  // apply to.
  const language = useSyncExternalStore(noSubscribe, getLanguage, getServerNull);
  const chosen = useSyncExternalStore(noSubscribe, hasMarketChoice, getServerTrue);
  const [closed, setClosed] = useState(false);

  const fromLanguage = marketFromLanguage(language ?? undefined);
  const suggested: Market | null =
    !closed && !chosen && fromLanguage && fromLanguage.id !== marketFromPath(pathname).id
      ? fromLanguage
      : null;

  if (!suggested) return null;

  const current = marketFromPath(pathname);
  const { href } = counterpartPath(pathname, suggested);
  const place = suggested.id === "us" ? "the US" : "the UK";
  // White under the teal hero's dark nav. Under the white nav it takes the
  // pale citrus accent rather than cream, because most pages open on a cream
  // band directly below and a cream strip would merge into it.
  const onTeal = theme === "dark";
  const dismiss = () => {
    rememberMarketChoice("dismissed");
    setClosed(true);
  };

  return (
    <aside
      aria-label="Suggested site"
      className={`relative mb-4 rounded-2xl ${onTeal ? "bg-background" : "bg-accent-pale"} py-3 pl-4 pr-12 sm:px-5 flex flex-col gap-3 sm:flex-row sm:items-center`}
    >
      <p className="flex items-start gap-2.5 text-sm font-sans text-foreground leading-snug sm:flex-1">
        <CountryFlag country={suggested.flagCountry} className="mt-[0.2em]" />
        <span>
          Looks like you might be in {place}. We have a separate{" "}
          {suggested.shortName} site for {suggested.shortName} costs and coverage.
        </span>
      </p>
      <div className="grid grid-cols-2 gap-2 -mr-8 sm:mr-0 sm:flex sm:items-center">
        <a
          href={href}
          onClick={() => rememberMarketChoice(suggested.id)}
          className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-sans font-medium transition-opacity duration-200 hover:opacity-90"
          style={{ background: "var(--accent)", color: "var(--on-accent)" }}
        >
          Go to {suggested.shortName} site
          <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
        </a>
        <button
          type="button"
          onClick={() => {
            rememberMarketChoice(current.id);
            setClosed(true);
          }}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-full border px-4 py-2 text-sm font-sans font-medium text-teal transition-opacity duration-200 hover:opacity-70"
          style={{ borderColor: "var(--teal-35)" }}
        >
          Stay on {current.shortName} site
        </button>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute right-2 top-2 rounded-full p-2 text-muted transition-colors duration-200 hover:text-teal sm:static sm:ml-1"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </aside>
  );
}
