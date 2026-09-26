"use client";

import { useSyncExternalStore } from "react";
import { MARKETS, NO_COUNTERPART_PARAM, type MarketId } from "@/lib/market";

const noSubscribe = () => () => {};
const getParam = () =>
  new URLSearchParams(window.location.search).get(NO_COUNTERPART_PARAM);
const getServerNull = () => null;

/**
 * One line on a market's home page for someone who switched from a page
 * the other market doesn't have, so landing on the home page reads as
 * expected rather than as a broken link. Read from the URL after
 * hydration, so the page itself stays static.
 */
export function MarketArrivalNote({ market }: { market: MarketId }) {
  const value = useSyncExternalStore(noSubscribe, getParam, getServerNull);
  const from: MarketId | null =
    (value === "uk" || value === "us") && value !== market ? value : null;

  if (!from) return null;

  return (
    <p role="status" className="mb-6 text-sm font-sans text-muted">
      That page is only on our {MARKETS[from].shortName} site, so here&rsquo;s the{" "}
      {MARKETS[market].shortName} home page instead.
    </p>
  );
}
