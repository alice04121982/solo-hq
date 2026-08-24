# Waiting for a session with internet access

Cairn's remote sessions (Claude Code on the web) have no outbound network:
`hfea.gov.uk`, clinic websites and publisher feeds are all unreachable from
them. These jobs need a local session, or someone with a browser.

Delete an entry when it is done. When nothing is left, the start-of-session
reminder stops on its own.

- **Click-check the media roundup links.** Six of the eight entries in
  `src/lib/news.ts` were compiled from publisher indexes without ever being
  opened: Cyprus Mail, both Progress Educational Trust pieces, the Donor
  Conception Network statement, the older BBC NHS-funding article, and the
  HFEA add-ons page. The two BBC links on the northern Cyprus investigation
  are confirmed. Any that 404 or redirect somewhere unrelated should be fixed
  or dropped, then bump `NEWS_PROVENANCE.listUpdatedOn`.

- **Prove the four news feeds.** `FEEDS` in `scripts/find-news.ts` carries
  `verified: false` on every entry — the URLs follow each publisher's usual
  convention but have never been fetched. Run `npm run find:news` from a
  networked machine: anything that 403s or yields no items needs its URL
  fixed or the feed dropped. Flip `verified` to true once a feed has actually
  returned items.

- **Expand the UK clinic list toward the full HFEA register.** The finder
  lists 8 UK clinics; the register holds roughly 120. The schema in
  `src/types/clinic.ts` already supports them — what is missing is sourced
  data per clinic: headline IVF price, IUI price, treatment list, donor
  anonymity rules, and live birth rates by age bracket with their year and
  denominator. Two things to establish first: whether the HFEA publishes a
  bulk dataset (which would turn ~120 lookups into one import), and whether
  its per-clinic pages carry prices or only success rates. Follow
  `.claude/skills/treatment-data-check/SKILL.md` — in particular, never
  invent a figure, and leave an unpublished bracket absent rather than
  guessing it.
