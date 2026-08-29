/**
 * Media roundup: find candidate articles, propose them, publish nothing.
 *
 * Run with `npm run find:news` (Node 22.6+ — executes TypeScript directly via
 * type stripping). Fetches the feeds below, keeps anything about fertility
 * treatment, drops what is already on the list, and prints ready-to-paste
 * `NewsItem` blocks for `src/lib/news.ts`.
 *
 * Why it stops there. Every item on /news carries a Cairn-written note saying
 * what the piece changes for someone choosing a clinic, sitting inches from
 * medical guidance. A pipeline that publishes straight from a feed cannot
 * write that note, and its failure mode is a clinic's own press release — or a
 * piece about a clinic we have deliberately removed — appearing on the site
 * unattended. So discovery is automated and publishing stays a human decision:
 * this proposes, a person writes the note and commits.
 *
 * The weekly workflow (.github/workflows/news-candidates.yml) runs it and puts
 * the output in a GitHub issue. It never writes to src/.
 *
 * `--self-test` runs the parser and filter against fixtures and makes no
 * network calls; the workflow runs it before the real thing.
 *
 * `--check-feeds [url...]` fetches each feed and says whether it is still a
 * feed, without proposing anything. Extra URLs given on the command line are
 * checked alongside `FEEDS`, which is how a replacement for a dead feed gets
 * confirmed before it is committed. Run it from CI (the News candidates
 * workflow takes a `check-feeds` mode): a sandbox with no outbound network
 * cannot tell a wrong URL from a right one, and guessing is what put a 404 in
 * this list in the first place.
 */
import { readFileSync } from "node:fs";

/**
 * Feeds to sweep.
 *
 * `verified` records whether the URL has actually been confirmed to serve a
 * feed. The seed list was written in a sandbox with no outbound network and
 * followed each publisher's usual convention; the first real run (2026-08-24)
 * settled which of those guesses were right. Only a verified feed is allowed
 * to return nothing quietly — for the rest, an empty result is more likely a
 * wrong URL than a quiet week. A feed that fails is reported, not swallowed:
 * a silently dead feed is how a roundup stops being a roundup.
 */
interface Feed {
  outlet: string;
  url: string;
  /** Suggested topic for anything from this feed; a human can overrule it. */
  topic: string;
  verified: boolean;
}

const FEEDS: Feed[] = [
  { outlet: "BBC News", url: "https://feeds.bbci.co.uk/news/health/rss.xml", topic: "Safety & regulation", verified: true },
  { outlet: "The Guardian", url: "https://www.theguardian.com/society/fertility-problems/rss", topic: "Costs & funding", verified: true },
  { outlet: "Progress Educational Trust (BioNews)", url: "https://www.progress.org.uk/feed/", topic: "Donor conception", verified: true },
  // hfea.gov.uk serves no feed we could find — /rss/news/ was a guess, and it
  // has 404'd every week since. The regulator is also a GOV.UK organisation,
  // and every GOV.UK organisation page serves its announcements as Atom from
  // the same path with `.atom` on the end. That is a documented convention
  // rather than a guess, but it is still unconfirmed: the sandbox this was
  // written in has no outbound network. `--check-feeds` settles it in CI, and
  // until it does this stays unverified so an empty result is reported.
  { outlet: "HFEA", url: "https://www.gov.uk/government/organisations/human-fertilisation-and-embryology-authority.atom", topic: "Safety & regulation", verified: false },
];

/**
 * What counts as on-topic. Deliberately broad: this feeds a human triage
 * queue, so a false positive costs one glance and a false negative costs a
 * story nobody hears about. Tighten it once a few real runs show what noise
 * actually looks like.
 */
const TOPIC_PATTERN =
  /\b(ivf|fertility|infertility|donor concei|donor conception|sperm donor|egg donor|egg freezing|embryo|hfea|icsi|iui|surrogac\w*|fertility clinic)\b/i;

/** Feed entries older than this are assumed already seen. */
const MAX_AGE_DAYS = Number(process.env.NEWS_MAX_AGE_DAYS ?? 30);

interface Candidate {
  title: string;
  url: string;
  outlet: string;
  topic: string;
  published?: string;
}

// ── Parsing ──
//
// The repo ships no XML parser and this does not warrant a dependency: RSS and
// Atom items are flat enough to pull out by hand. Anything malformed is
// skipped rather than guessed at.

function decodeEntities(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;|&#x27;/gi, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function tagContent(block: string, tag: string): string | undefined {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return match ? decodeEntities(match[1]) : undefined;
}

/** Atom puts the URL in an attribute; RSS puts it in the element body. */
function entryLink(block: string): string | undefined {
  const rss = tagContent(block, "link");
  if (rss && /^https?:\/\//.test(rss)) return rss;
  const atom = block.match(/<link[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["']/i)
    ?? block.match(/<link[^>]*href=["']([^"']+)["']/i);
  return atom?.[1];
}

/** ISO date, or undefined when the feed's date cannot be trusted. */
function entryDate(block: string): string | undefined {
  const raw =
    tagContent(block, "pubDate") ??
    tagContent(block, "published") ??
    tagContent(block, "updated") ??
    tagContent(block, "dc:date");
  if (!raw) return undefined;
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString().slice(0, 10);
}

/**
 * The `<item>`/`<entry>` blocks in a document. Separate from `parseFeed` so
 * `--check-feeds` can tell "this is a feed with nothing on topic" apart from
 * "this is not a feed" — a 200 that serves an HTML error page has neither.
 */
export function entryBlocks(xml: string): string[] {
  return xml.match(/<(item|entry)[\s>][\s\S]*?<\/\1>/gi) ?? [];
}

export function parseFeed(xml: string, feed: Feed): Candidate[] {
  const blocks = entryBlocks(xml);
  const out: Candidate[] = [];
  for (const block of blocks) {
    const title = tagContent(block, "title");
    const url = entryLink(block);
    if (!title || !url || !/^https:\/\//.test(url)) continue;
    const summary =
      tagContent(block, "description") ?? tagContent(block, "summary") ?? "";
    if (!TOPIC_PATTERN.test(`${title} ${summary}`)) continue;
    out.push({ title, url: url.split("#")[0], outlet: feed.outlet, topic: feed.topic, published: entryDate(block) });
  }
  return out;
}

// ── Filtering ──

/** Strip tracking noise so the same article is not proposed twice. */
function canonical(url: string): string {
  try {
    const parsed = new URL(url);
    for (const key of [...parsed.searchParams.keys()]) {
      if (/^(utm_|at_|cmp|fbclid|gclid|ito)/i.test(key)) parsed.searchParams.delete(key);
    }
    parsed.hash = "";
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return url;
  }
}

export function isFresh(candidate: Candidate, now: number, maxAgeDays = MAX_AGE_DAYS): boolean {
  if (!candidate.published) return true; // undated: let a human judge it
  const age = (now - new Date(`${candidate.published}T00:00:00Z`).getTime()) / 86_400_000;
  return age <= maxAgeDays;
}

/**
 * Everything already spoken for: what is on the list, and what a previous run
 * already proposed in the open issue. Without the second, a candidate nobody
 * wanted comes back every week until someone gives in.
 */
export function alreadyKnown(newsSource: string, priorIssueBody: string): Set<string> {
  const seen = new Set<string>();
  for (const text of [newsSource, priorIssueBody]) {
    for (const match of text.matchAll(/https:\/\/[^\s"'<>)\]]+/g)) {
      seen.add(canonical(match[0]));
    }
  }
  return seen;
}

/** A slug for the `id` field, in the style of the existing entries. */
function suggestId(candidate: Candidate): string {
  const outlet = candidate.outlet.toLowerCase().replace(/\(.*\)/, "").trim().split(/\s+/)[0];
  const words = candidate.title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 3)
    .slice(0, 6);
  return [outlet.replace(/[^a-z0-9]/g, ""), ...words].join("-");
}

/** A ready-to-paste NewsItem, with the one field a machine must not fill left blank. */
function asNewsItem(candidate: Candidate, addedOn: string): string {
  const lines = [
    "  {",
    `    id: ${JSON.stringify(suggestId(candidate))},`,
    `    title: ${JSON.stringify(candidate.title)},`,
    `    url: ${JSON.stringify(candidate.url)},`,
    `    outlet: ${JSON.stringify(candidate.outlet)},`,
    `    kind: "Article",`,
    `    topic: ${JSON.stringify(candidate.topic)},`,
  ];
  if (candidate.published) lines.push(`    published: ${JSON.stringify(candidate.published)},`);
  lines.push(
    `    addedOn: ${JSON.stringify(addedOn)},`,
    `    // TODO: what did it find, and what does it change for someone choosing a clinic?`,
    `    note: "",`,
    "  },"
  );
  return lines.join("\n");
}

// ── Self-test ──
//
// The parser is the part that breaks silently when a publisher changes their
// feed, and it is the part this sandbox cannot exercise against the real
// thing. Fixtures keep it honest without a test framework the repo does not
// have.

const RSS_FIXTURE = `<?xml version="1.0"?><rss><channel>
<item><title>IVF funding cut in two more regions</title><link>https://example.org/a?utm_source=rss</link>
<description>Integrated care boards reduce cycles.</description><pubDate>Tue, 12 Aug 2026 09:00:00 GMT</pubDate></item>
<item><title><![CDATA[Hospital car parking charges to rise]]></title><link>https://example.org/b</link>
<description>Nothing to do with treatment.</description><pubDate>Tue, 12 Aug 2026 09:00:00 GMT</pubDate></item>
<item><title>Egg &amp; sperm donor rules reviewed</title><link>https://example.org/c</link>
<description>The regulator consults.</description></item>
</channel></rss>`;

const ATOM_FIXTURE = `<?xml version="1.0"?><feed xmlns="http://www.w3.org/2005/Atom">
<entry><title>Fertility clinic inspected after complaints</title>
<link rel="alternate" href="https://example.org/d"/><summary>An HFEA inspection.</summary>
<published>2026-08-01T00:00:00Z</published></entry></feed>`;

function selfTest(): number {
  const failures: string[] = [];
  const check = (label: string, condition: boolean) => {
    if (!condition) failures.push(label);
  };
  const feed = FEEDS[0];

  const rss = parseFeed(RSS_FIXTURE, feed);
  check("RSS: keeps on-topic items and drops the rest", rss.length === 2);
  check("RSS: strips tracking params", canonical(rss[0]?.url ?? "") === "https://example.org/a");
  check("RSS: parses the date", rss[0]?.published === "2026-08-12");
  check("RSS: decodes entities in titles", rss[1]?.title === "Egg & sperm donor rules reviewed");
  check("RSS: leaves an undated item undated", rss[1]?.published === undefined);

  check("RSS: counts every entry, on topic or not", entryBlocks(RSS_FIXTURE).length === 3);
  check(
    "not a feed: an HTML page has no entries",
    entryBlocks("<html><body><h1>Page not found</h1><p>item</p></body></html>").length === 0
  );

  const atom = parseFeed(ATOM_FIXTURE, feed);
  check("Atom: reads the alternate link", atom[0]?.url === "https://example.org/d");
  check("Atom: reads the published date", atom[0]?.published === "2026-08-01");

  const now = new Date("2026-08-20T00:00:00Z").getTime();
  check("age: keeps a recent item", isFresh({ ...rss[0], published: "2026-08-12" }, now));
  check("age: drops a stale one", !isFresh({ ...rss[0], published: "2026-01-01" }, now));
  check("age: keeps an undated one", isFresh({ ...rss[0], published: undefined }, now));

  const known = alreadyKnown('url: "https://example.org/a",', "- https://example.org/d?utm_medium=x");
  check("dedupe: matches the published list", known.has("https://example.org/a"));
  check("dedupe: matches a prior proposal", known.has("https://example.org/d"));

  for (const f of failures) console.error(`FAIL  ${f}`);
  console.log(`\nSelf-test: ${failures.length === 0 ? "all checks passed" : `${failures.length} failure(s)`}.`);
  return failures.length === 0 ? 0 : 1;
}

// ── Run ──

async function fetchFeed(feed: Feed): Promise<{ xml?: string; error?: string }> {
  try {
    const response = await fetch(feed.url, {
      headers: { "user-agent": "CairnFertility news roundup (+https://cairnfertility.co.uk)" },
      signal: AbortSignal.timeout(20_000),
    });
    if (!response.ok) return { error: `HTTP ${response.status}` };
    return { xml: await response.text() };
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

/**
 * Fetch every feed and say what came back. Proposes nothing and writes
 * nothing: this exists so a dead feed can be diagnosed, and a candidate
 * replacement confirmed, without waiting a week for Monday's issue.
 *
 * Exit code is non-zero when a feed is unreachable or is not a feed at all,
 * so a scheduled run of this can fail loudly. A feed that is plainly a feed
 * but has nothing on topic this week is fine and says so.
 */
async function checkFeeds(extraUrls: string[]): Promise<number> {
  const checks: Feed[] = [
    ...FEEDS,
    ...extraUrls.map((url) => ({ outlet: "(command line)", url, topic: "Safety & regulation", verified: false })),
  ];

  let broken = 0;
  for (const feed of checks) {
    const label = `${feed.outlet} — ${feed.url}`;
    const { xml, error } = await fetchFeed(feed);
    if (error || !xml) {
      console.log(`BROKEN     ${label} — ${error ?? "empty response"}`);
      broken += 1;
      continue;
    }
    const entries = entryBlocks(xml).length;
    if (entries === 0) {
      console.log(`NOT A FEED ${label} — fetched ${xml.length} bytes with no <item> or <entry>`);
      broken += 1;
      continue;
    }
    const onTopic = parseFeed(xml, feed).length;
    console.log(`OK         ${label} — ${entries} entries, ${onTopic} on topic`);
  }

  console.log(
    `\n${checks.length} checked, ${broken} to fix.` +
      (broken > 0 ? " Correct the URL in `FEEDS` or drop the feed." : "")
  );
  return broken === 0 ? 0 : 1;
}

async function main(): Promise<number> {
  const today = new Date().toISOString().slice(0, 10);
  const newsSource = readFileSync(new URL("../src/lib/news.ts", import.meta.url), "utf8");
  // The workflow writes the open issue's body here so a candidate already
  // proposed (and passed over) is not proposed again.
  const priorPath = process.env.NEWS_PRIOR_ISSUE_FILE;
  let priorIssueBody = "";
  if (priorPath) {
    try {
      priorIssueBody = readFileSync(priorPath, "utf8");
    } catch {
      /* no prior issue yet */
    }
  }
  const known = alreadyKnown(newsSource, priorIssueBody);

  const candidates: Candidate[] = [];
  const problems: string[] = [];
  const now = Date.now();

  for (const feed of FEEDS) {
    const { xml, error } = await fetchFeed(feed);
    if (error || !xml) {
      problems.push(`${feed.outlet} — ${feed.url} — ${error ?? "empty response"}`);
      continue;
    }
    const parsed = parseFeed(xml, feed);
    if (parsed.length === 0 && !feed.verified) {
      problems.push(`${feed.outlet} — ${feed.url} — reachable but produced no items; check the URL is a feed.`);
    }
    for (const candidate of parsed) {
      if (known.has(canonical(candidate.url))) continue;
      if (!isFresh(candidate, now)) continue;
      known.add(canonical(candidate.url));
      candidates.push(candidate);
    }
  }

  candidates.sort((a, b) => (b.published ?? "").localeCompare(a.published ?? ""));

  // Markdown, because the workflow puts this straight into an issue body.
  const out: string[] = [];
  if (candidates.length === 0) {
    out.push("No new candidates this week.");
  } else {
    out.push(
      `${candidates.length} candidate${candidates.length === 1 ? "" : "s"} for the media roundup.`,
      "",
      "Each block is ready to paste into `NEWS_ITEMS` in `src/lib/news.ts`. Open the link,",
      "write the `note` in Cairn's voice, check `kind` and `topic`, then commit. Anything",
      "not worth listing can simply be left here — it will not be proposed again.",
      ""
    );
    for (const candidate of candidates) {
      out.push(`### ${candidate.title}`, "", `${candidate.outlet} · ${candidate.published ?? "date not given"} · ${candidate.url}`, "", "```ts", asNewsItem(candidate, today), "```", "");
    }
  }
  if (problems.length > 0) {
    out.push("", "### Feeds that did not work", "", ...problems.map((p) => `- ${p}`), "",
      "Fix the URL in `FEEDS` (`scripts/find-news.ts`) or drop the feed. A feed that " +
        "quietly fails looks exactly like a quiet week.");
  }

  console.log(out.join("\n"));
  // A broken feed is not a failed run: the candidates that were found still
  // deserve to reach the issue, and the problem list travels with them.
  return 0;
}

const args = process.argv.slice(2);
const exitCode = args.includes("--self-test")
  ? selfTest()
  : args.includes("--check-feeds")
    ? await checkFeeds(args.filter((a) => /^https?:\/\//.test(a)))
    : await main();
process.exit(exitCode);
