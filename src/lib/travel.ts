/**
 * Cairn travel-cost model for treatment abroad.
 *
 * Route-based estimates, not live prices: what a cycle abroad typically adds
 * in flights and stays, per destination city. Live fares vary by date and are
 * driven by the treatment calendar, not by fare sales, so the site publishes
 * an honest planning range and links out to live searches instead of quoting
 * a single volatile number.
 *
 * Editorial rules for this file:
 * - Every non-UK clinic city in src/lib/clinics.ts must have an entry here;
 *   `npm run check:data` enforces the pairing in both directions.
 * - Ranges are indicative return-fare and nightly-stay figures from a London
 *   departure, checked against airline and hotel booking sites. Any change
 *   must update TRAVEL_PROVENANCE.verifiedOn.
 * - Never present a derived figure without labelling it an estimate.
 */

export interface DestinationTravel {
  /** Matches Clinic.city in src/lib/clinics.ts. */
  city: string;
  country: string;
  /** Typical return fare from London, GBP. */
  returnFlightGbp: { low: number; high: number };
  /** Typical nightly stay near the clinic, GBP. */
  nightlyStayGbp: { low: number; high: number };
  /** Destination phrase for the live flight search link. */
  flightQuery: string;
  /** Practical note a flat estimate can't capture (routes, patient rates). */
  note?: string;
}

/**
 * How many visits a treatment cycle abroad typically needs, and how long
 * each one runs. Monitoring scans are usually done at home with a remote
 * clinic reviewing them; the counted trips are the in-person ones
 * (consultation/collection and transfer), with the final stay the longest.
 */
export const TRAVEL_ASSUMPTIONS = {
  tripsPerCycle: { low: 2, high: 3 },
  nightsPerTrip: { low: 3, high: 7 },
} as const;

export const TRAVEL_PROVENANCE = {
  /** ISO date these ranges were last re-checked against booking sites. */
  verifiedOn: "2026-08-12",
  sourceLabel: "airline and accommodation booking-site ranges from London",
} as const;

export const DESTINATIONS: DestinationTravel[] = [
  {
    city: "Valencia",
    country: "Spain",
    returnFlightGbp: { low: 70, high: 180 },
    nightlyStayGbp: { low: 60, high: 110 },
    flightQuery: "Valencia",
  },
  {
    city: "Alicante",
    country: "Spain",
    returnFlightGbp: { low: 60, high: 160 },
    nightlyStayGbp: { low: 55, high: 100 },
    flightQuery: "Alicante",
  },
  {
    city: "Brno",
    country: "Czech Republic",
    returnFlightGbp: { low: 60, high: 170 },
    nightlyStayGbp: { low: 45, high: 90 },
    flightQuery: "Brno",
    note: "Most patients fly to Vienna or Prague and continue by train or shuttle (roughly 2 hours).",
  },
  {
    city: "Prague",
    country: "Czech Republic",
    returnFlightGbp: { low: 60, high: 160 },
    nightlyStayGbp: { low: 55, high: 105 },
    flightQuery: "Prague",
  },
  {
    city: "Thessaloniki",
    country: "Greece",
    returnFlightGbp: { low: 90, high: 220 },
    nightlyStayGbp: { low: 50, high: 100 },
    flightQuery: "Thessaloniki",
  },
  {
    city: "Copenhagen",
    country: "Denmark",
    returnFlightGbp: { low: 70, high: 180 },
    nightlyStayGbp: { low: 90, high: 160 },
    flightQuery: "Copenhagen",
  },
  {
    city: "Denver",
    country: "United States",
    returnFlightGbp: { low: 450, high: 900 },
    nightlyStayGbp: { low: 90, high: 180 },
    flightQuery: "Denver",
  },
  {
    city: "Cape Town",
    country: "South Africa",
    returnFlightGbp: { low: 550, high: 950 },
    nightlyStayGbp: { low: 50, high: 110 },
    flightQuery: "Cape Town",
  },
  {
    city: "Istanbul",
    country: "Turkey",
    returnFlightGbp: { low: 120, high: 260 },
    nightlyStayGbp: { low: 45, high: 100 },
    flightQuery: "Istanbul",
  },
];

const byCity = new Map(DESTINATIONS.map((d) => [d.city, d]));

export interface TravelEstimate {
  destination: DestinationTravel;
  /** Whole-treatment travel cost across all trips, GBP. */
  low: number;
  high: number;
  /** Midpoint of the range, for ranking and single-figure totals. */
  mid: number;
}

const roundTo50 = (n: number) => Math.round(n / 50) * 50;

/**
 * Flights + stays for a full treatment across TRAVEL_ASSUMPTIONS trips.
 * Returns null for a city with no entry (i.e. UK clinics).
 */
export function travelEstimateForCity(city: string): TravelEstimate | null {
  const destination = byCity.get(city);
  if (!destination) return null;
  const { tripsPerCycle, nightsPerTrip } = TRAVEL_ASSUMPTIONS;
  const low = roundTo50(
    tripsPerCycle.low *
      (destination.returnFlightGbp.low + nightsPerTrip.low * destination.nightlyStayGbp.low)
  );
  const high = roundTo50(
    tripsPerCycle.high *
      (destination.returnFlightGbp.high + nightsPerTrip.high * destination.nightlyStayGbp.high)
  );
  return { destination, low, high, mid: roundTo50((low + high) / 2) };
}

/**
 * Typical European travel estimate: the median of the per-city midpoints,
 * with the widest low/high across Europe as the range. Used where a tool
 * asks "abroad?" without naming a destination (the cost calculator).
 */
export function europeTypicalTravel(): { low: number; high: number; mid: number } {
  const estimates = DESTINATIONS.filter(
    (d) => !["United States", "South Africa"].includes(d.country)
  )
    .map((d) => travelEstimateForCity(d.city)!)
    .sort((a, b) => a.mid - b.mid);
  const mids = estimates.map((e) => e.mid);
  const mid = mids[Math.floor(mids.length / 2)];
  return {
    low: Math.min(...estimates.map((e) => e.low)),
    high: Math.max(...estimates.map((e) => e.high)),
    mid,
  };
}

/** Range formatted for display, e.g. "£450–£1,200". */
export function formatRangeGbp(r: { low: number; high: number }): string {
  return `£${r.low.toLocaleString("en-GB")}–£${r.high.toLocaleString("en-GB")}`;
}

// ── Live-price deep links ─────────────────────────────────────────────────────
//
// Plain search URLs, no API: Google Flights and Booking.com both accept query
// parameters, so the user gets live prices for their own dates without the
// site vouching for a fare it can't guarantee.

export function googleFlightsUrl(destination: DestinationTravel): string {
  return `https://www.google.com/travel/flights?q=${encodeURIComponent(
    `flights from London to ${destination.flightQuery}`
  )}`;
}

export function staySearchUrl(destination: DestinationTravel): string {
  return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(
    `${destination.city}, ${destination.country}`
  )}`;
}
