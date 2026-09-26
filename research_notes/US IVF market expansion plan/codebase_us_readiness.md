# Codebase readiness for a US experience (CairnFertility, /home/user/solo-hq)

Scope: read-only review of the repo at commit `3ef1c71` (26 Sep 2026). All sources are repo files cited as `path:line`. No web research was done; statements about Next.js or US law that are not in the repo are marked as inferences or gaps.

Method note: `node_modules/` is absent, so `node_modules/next/dist/docs/` (which AGENTS.md says to consult) could not be read. The installed version is pinned in the lockfile as next 16.3.5 ([package-lock.json:5540-5541](package-lock.json)). Routing advice below relies on the repo's own patterns and is flagged where it depends on Next.js behaviour that should be checked against those docs once `npm install` has run.

---

## 1. What is UK-specific and hard-coded

### Takeaway
The site is UK-first in its data model, copy and legal set, but it is not UK-only: one US clinic (CCRM Denver) is already in the data and is handled as an "overseas" clinic priced in GBP. The biggest structural blockers are that every price is stored and filtered in GBP, the success-rate model has two sources only (HFEA, or the clinic's own figure), `Region` has no US value, eligibility is per country rather than per state, and all funding, work-rights and legal content is written for UK law with no country key.

### Cited Findings
**Currency (GBP everywhere)**
- `Clinic.pricePerCycleGbp`, `iuiPricePerCycleGbp` and `publishedAllInEstimateGbp` are the only price fields the finder filters and sorts on; overseas prices are converted to GBP, and the local figure is kept only for display in `localPrice` — [src/types/clinic.ts:145-165](src/types/clinic.ts)
- `LocalCurrency` is a closed union `"GBP" | "EUR" | "USD" | "DKK" | "ZAR"` — [src/types/clinic.ts:129](src/types/clinic.ts)
- One FX note for the whole file (ECB rates of 11 Sep 2026, USD 1 = GBP 0.740, rounded to £5) — [src/lib/clinics.ts:57-68](src/lib/clinics.ts)
- The price sort, price-bounds slider and cheapest-price logic all read the `...Gbp` fields — [src/lib/clinics.ts:742-744, 792-805](src/lib/clinics.ts)
- The Get Started matcher has fixed GBP budget bands ("Under £5,000", "£5,000 – £10,000"...), hard-coded maxima, and formats with `£` and `en-GB` — [src/components/clinic-matcher.tsx:60, 127-129, 146, 462-466](src/components/clinic-matcher.tsx)
- Counts of `£`/`GBP` occurrences: guides.ts 35, clinics.ts 35, travel.ts 28, clinic-matcher.tsx 24, funding.ts 11, ivf-finder/[slug]/page.tsx 11, clinic-card.tsx 8, finder-filters.tsx 7 (grep of `src/`).
- Travel model is priced in GBP "from London" and exists only for non-UK cities (`returnFlightGbp`, `nightlyStayGbp`, "UK monitoring scans" in the scope line) — [src/lib/travel.ts:10-31, 48-55](src/lib/travel.ts)

**Regulator / success-rate provenance (HFEA-shaped)**
- `REGULATORS` contains only HFEA; the file says it is "deliberately shaped as a list so other markets slot in"; `HFEA = REGULATORS[0]` is exported as a constant — [src/lib/regulators.ts:1-50](src/lib/regulators.ts)
- `RateVerification = "hfea" | "clinic"`; `byHfeaBand` and `vsNationalAverage` are "UK only" — [src/types/clinic.ts:92-125](src/types/clinic.ts)
- Every clinic has `hfeaLicensed: boolean` as a required field and optional `hfeaNumber`/`licenceExpiry` — [src/types/clinic.ts:140-143](src/types/clinic.ts)
- `Region = "UK" | "Europe" | "Rest of world"` — no US region — [src/types/clinic.ts:56-58](src/types/clinic.ts)
- The only US clinic, CCRM Denver, is `region: "Rest of world"`, `verification: "clinic"` even though its source is the SART clinic summary report, stored as `pricePerCycleGbp: 9370` converted from `$12,660` — [src/lib/clinics.ts:568-606](src/lib/clinics.ts)
- Rate labels are two-valued: `BADGE_HFEA` or `BADGE_CLINIC` ("Clinic's own figure, not checked"); `RATE_CAVEAT` cites HFEA advice; `rateLine()` prints "(HFEA)" or "(clinic's own figure)" — [src/lib/rate-labels.ts:8-35](src/lib/rate-labels.ts). So SART data today renders as "not checked", which undersells it.
- `DATA_PROVENANCE.successRates` has `uk` and `overseas` keys only; benchmarks are HFEA pages — [src/lib/clinics.ts:69-100](src/lib/clinics.ts)
- NHS/HFEA/ICB mention counts: funding.ts 63, guides.ts 59, support.ts 25, clinics.ts 24, family-types.ts 18, funding/page.tsx 15, nhs-eligibility-checker.tsx 11 (grep of `src/`).

**Geography**
- Gazetteer is built around UK postcode areas; distances in miles; `en-GB` number formatting — [src/lib/geo.ts:17-27, 57-63, 74-81](src/lib/geo.ts)
- Only 10 US cities are in the gazetteer (New York, Boston, Chicago, Denver, LA, SF, Seattle, Miami, Houston, Washington) and there is no ZIP-code or state resolution — [src/lib/geo.ts:302-311](src/lib/geo.ts)
- The geo design is privacy-led: everything runs in the browser, no geocoder, CSP permits no other origin — [src/lib/geo.ts:9-16](src/lib/geo.ts)

**Eligibility**
- `COUNTRY_ELIGIBILITY` is keyed by country; the file says "For the United States the law is set state by state, so the entry describes Colorado ... Change the entry if a clinic in another state is added." — [src/lib/country-eligibility.ts:9-12](src/lib/country-eligibility.ts); US entry at [src/lib/country-eligibility.ts:152-180](src/lib/country-eligibility.ts)
- The matcher's travel step is `uk-only` / `europe` / anywhere, so a US user has no "stay in my country/state" option — [src/components/clinic-matcher.tsx:131-135](src/components/clinic-matcher.tsx)

**Funding = NHS**
- `funding.ts` is entirely NHS/ICB/NICE: `NATION_POLICIES` (England, Scotland, Wales, NI), `NICE_POSITION`, `NHS_APPLICATION_STEPS`, `NHS_PITFALLS`, `RouteGroup` starting with `"nhs"`, "MoneyHelper" disclaimer — [src/lib/funding.ts:102-273](src/lib/funding.ts)
- `FundingRoute` has no country/market field — [src/lib/funding.ts:280-301](src/lib/funding.ts)
- `/funding` imports `NHSEligibilityChecker` directly — [src/app/funding/page.tsx:10](src/app/funding/page.tsx); checker applies UK NHS rules (e.g. "NHS policies across the UK do not fund IVF from age 43") — [src/components/funding/nhs-eligibility-checker.tsx:241](src/components/funding/nhs-eligibility-checker.tsx)

**Work, faith, families, how-IVF-works**
- Work rights are one `UK_RIGHTS` entry (Acas, pregnancy discrimination from embryo transfer), but typed as `RightsEntry` with a `slug` — so a `US_RIGHTS` entry fits the existing shape — [src/lib/work.ts:51-75](src/lib/work.ts)
- Family types embed NHS funding-by-family-type and UK surrogacy budgets (£50,000–£60,000) — [src/lib/family-types.ts:83-90, 123-124](src/lib/family-types.ts)
- How IVF works cites HFEA 2024 UK average birth rates as a shared line — [src/app/how-ivf-works/page.tsx:339-357](src/app/how-ivf-works/page.tsx)
- The internal strategy brief itself judges that "Family-type, donor-conception, emotional and faith content moves across roughly intact. Funding, legal and clinic content does not" — [docs/international-strategy-brief.md:211-213](docs/international-strategy-brief.md)

**Spelling / locale**
- `<html lang="en">` (not `en-GB`) in the single root layout — [src/app/layout.tsx:47](src/app/layout.tsx)
- `en-GB` date/number formatting appears in 6 files: clinic-matcher.tsx, about/page.tsx, geo.ts, news.ts, travel.ts, clinics.ts (e.g. `formatCheckedDate` — [src/lib/clinics.ts:808-815](src/lib/clinics.ts))
- UK spelling is throughout content (e.g. "fertilisation", "programme"); the design-system docs also use "colour" (globals.css / skills). No i18n/message-catalogue library is installed — [package.json](package.json)

**Legal pages (UK law)**
- Privacy policy relies on UK GDPR / DPA 2018 lawful bases and Art. 9(2)(a) explicit consent — [src/lib/legal.ts:243-254](src/lib/legal.ts)
- Terms governed by the law of England and Wales — [src/lib/legal.ts:415, 423](src/lib/legal.ts)
- Publisher sentence hard-codes "in the United Kingdom"; ICO registration placeholder; controller name/address still `OWNER_NAME_TBC` / `OWNER_ADDRESS_TBC` — [src/lib/legal.ts:126-141](src/lib/legal.ts)
- Cookie page points to ICO guidance — [src/lib/legal.ts:473](src/lib/legal.ts)
- The header comment says every statement is a representation the site can be held to, citing FTC v. Flo Health — [src/lib/legal.ts:4-9](src/lib/legal.ts)

**check:data script**
- UK-only invariants: UK clinics must be HFEA licensed, carry a centre number, use `verification: "hfea"`, `per embryo transferred`, a Choose-a-Clinic URL regex, and `byHfeaBand` — [scripts/check-data.ts:125-140](scripts/check-data.ts)
- Every clinic's country must have a `COUNTRY_ELIGIBILITY` entry — [scripts/check-data.ts:111-113](scripts/check-data.ts)
- Every non-UK clinic city must have a travel entry (so any US clinic added today would need a "flight from London" estimate) — [scripts/check-data.ts:305-320](scripts/check-data.ts)
- Coordinate bounds checks only exist for UK — [scripts/check-data.ts:105-106, 495](scripts/check-data.ts)
- Staleness: one `STALE_DAYS` (default 120) against `DATA_PROVENANCE.pricesVerifiedOn` — [scripts/check-data.ts:31-52](scripts/check-data.ts)
- The weekly workflow runs Mondays 06:00 UTC and triggers only on changes to clinics.ts, types/clinic.ts, check-data.ts — [.github/workflows/data-freshness.yml](.github/workflows/data-freshness.yml)

### Inferences
- Adding US clinics as more "Rest of world" rows would technically pass `check:data` today (with a Colorado-style country eligibility entry and a London travel entry), but would produce wrong UX for US users: GBP prices, "flights from London", SART figures labelled "not checked", and a single state's law presented as "US law".
- The codebase's habit of keeping facts in `src/lib/*.ts` data files (not JSX) and typing them (`RightsEntry.slug`, `Regulator.countries`, `CountryEligibility.country`) is the main readiness asset; most US work is new data plus a market key, not rewrites of components.
- `hfeaLicensed` being a required boolean on every clinic is a naming leak; it should become a generic `licence`/`regulatorIds` field.

### Gaps
- I did not read every page component line by line (e.g. `src/app/ivf-finder/[slug]/page.tsx`, `comparison-table.tsx`) for embedded UK copy; counts above indicate where to look.
- UK-spelling density across all content was not measured systematically.

---

## 2. Route structure and what needs a US variant

### Takeaway
All routes are flat, unprefixed App Router segments under `src/app/` with a single root layout and no `proxy.ts`/middleware. About half the routes need a US variant (funding, work, legal set, get-started, finder defaults, how-ivf-works figures, resources/guides on cost), and the rest can be shared with market-aware data.

### Cited Findings
- Routes present: `/about`, `/accessibility`, `/api/{waitlist,community/apply,community/join}`, `/community` (+ `/guidelines`, `/join/[token]`), `/contact`, `/cookies`, `/disclaimer`, `/faith`, `/families` (+ `[type]`), `/funding`, `/get-started`, `/how-ivf-works`, `/ivf-finder` (+ `[slug]`), `/news`, `/privacy`, `/resources` (+ `[slug]`), `/stories` (+ `[id]`, `/share`), `/support`, `/terms`, `/waitlist`, `/work` — `find src/app` listing.
- Sitemap enumerates these static routes plus guides, families, stories and every clinic slug, with no alternates/hreflang — [src/app/sitemap.ts:8-38](src/app/sitemap.ts)
- Site is pre-launch noindex: `robots: { index: false }` in root metadata and a disallow-all `robots.ts` — [src/app/layout.tsx:24-27](src/app/layout.tsx), [src/app/robots.ts](src/app/robots.ts)
- No `proxy.ts`/`middleware.ts` exists; the CSP comment explicitly chose static headers over "a nonce in `proxy.ts`" to keep pages statically generated and CDN-cached — [next.config.ts:5-29](next.config.ts). (The file name `proxy.ts` in that comment is consistent with Next 16 renaming middleware to proxy.)
- Dynamic routes use `generateStaticParams` (ivf-finder/[slug], resources/[slug], families/[type], stories/[id]); only the invite page is `force-dynamic` — [src/app/ivf-finder/[slug]/page.tsx:39](src/app/ivf-finder/[slug]/page.tsx), [src/app/community/join/[token]/page.tsx:34](src/app/community/join/[token]/page.tsx)
- The cost calculator is not a standalone route; the resource library lists "Finance & Costs" entries pointing at `/funding` and cost guides — [src/components/resource-library.tsx:28-36](src/components/resource-library.tsx). README says "a cost calculator and a journey map on the homepage" — [README.md:21-22](README.md)
- Redirects are app-level in `next.config.ts` (guide merges, old solo-hq host) — [next.config.ts:138-178](next.config.ts)

**Route-by-route US need (assessment)**

| Route | US variant? | Why (source) |
|---|---|---|
| `/funding` | Full new page | NHS-only data + NHS checker ([src/lib/funding.ts:102-273](src/lib/funding.ts)); US needs state mandates, fully-insured vs self-funded, plan definition of infertility ([docs/international-strategy-brief.md:162-190](docs/international-strategy-brief.md)) |
| `/work` | New rights entry | `UK_RIGHTS` only ([src/lib/work.ts:67](src/lib/work.ts)); US = FMLA/ADA/PWFA/Title VII, employer benefits (not researched here) |
| `/privacy`, `/terms`, `/cookies`, `/disclaimer`, `/accessibility` | Market-specific sections | UK GDPR, England & Wales law, ICO ([src/lib/legal.ts:243, 423, 473](src/lib/legal.ts)) |
| `/ivf-finder`, `/ivf-finder/[slug]` | Shared component, market default filter, USD, SART badge | GBP-only fields; two-value verification ([src/types/clinic.ts:96-165](src/types/clinic.ts)) |
| `/get-started` | Shared wizard, market-specific budget bands and travel step | [src/components/clinic-matcher.tsx:60-135, 462-466](src/components/clinic-matcher.tsx) |
| `/how-ivf-works` | Mostly shared; swap HFEA figures for CDC/SART national figures | [src/app/how-ivf-works/page.tsx:339-357](src/app/how-ivf-works/page.tsx) |
| `/families/[type]` | Shared with market-scoped funding/surrogacy lines | [src/lib/family-types.ts:83-90](src/lib/family-types.ts) |
| `/resources/[slug]` | Some guides market-specific (costs, legal parenthood, HFEA register) | 59 NHS/HFEA refs in guides.ts |
| `/faith`, `/support`, `/stories`, `/news`, `/about` | Largely shared; support signposts are UK charities (support.ts 25 NHS refs) | grep counts |
| `/community`, `/waitlist` | Shared form, but US consent copy and a market field | see section 5 |

### Inferences
- Because pages are static and there is no proxy, a subpath market segment that is statically generated (e.g. `generateStaticParams` returning `["uk","us"]`) fits the current performance/security posture; a proxy that rewrites per-request would be a new moving part.

### Gaps
- Could not confirm Next 16.3's exact i18n / proxy API from local docs (node_modules absent).

---

## 3. Routing options for a US market

### Takeaway
The repo has already bought into one `.com` (canonical) with `.co.uk` redirecting, so the strategy brief's own recommendation — country-scoped paths on one `.com` — is the natural fit. Recommend a `/us` subpath (and eventually `/uk`, or keep UK unprefixed) with a statically generated `[market]` segment, `hreflang` alternates `en-GB`/`en-US`/`x-default`, per-market `lang`, and a dismissible, non-forcing suggestion banner driven by Vercel's country header at most, never stored or sent to a third party.

### Cited Findings
- Canonical domain is already `cairnfertility.com`; `.co.uk` "is held defensively and redirects here" — [src/lib/site.ts:1-10](src/lib/site.ts); also [src/lib/legal.ts:106-108](src/lib/legal.ts). This means the brief's "Buy the .com" step appears done.
- Strategy brief: "`/funding` (UK), `/funding/us`, `/funding/ie`, one page component reading country-scoped data, with `hreflang` and a country switcher" and "Country-scoped paths on one `.com` beat separate country domains at this size" — [docs/international-strategy-brief.md:251-256](docs/international-strategy-brief.md)
- Privacy constraints the routing choice must respect: "connect-src 'self'" so the browser contacts no third party — [next.config.ts:39-44](next.config.ts); the location search is in-browser with no geocoder — [src/lib/geo.ts:9-16](src/lib/geo.ts); legal.ts states "nothing is transmitted, stored, or put in the URL" for location — [src/lib/legal.ts:47-52](src/lib/legal.ts)
- Vercel hosting and IP logs are already disclosed — [src/lib/legal.ts:56-57, 224](src/lib/legal.ts)
- Rate limiter already reads `x-real-ip`/`x-forwarded-for` server-side — [src/lib/rate-limit.ts:116-126](src/lib/rate-limit.ts)
- Site nav/footer have no country/locale switcher (grep of site-nav.tsx and site-footer.tsx for country/locale returned nothing).

**Options compared (analysis grounded in the code above)**

| Option | SEO (hreflang) | Privacy | Code reuse in this repo | Verdict |
|---|---|---|---|---|
| Subpath `/us/...` on `.com` (UK unprefixed or `/uk`) | One domain's authority; hreflang via `metadata.alternates.languages` per page; sitemap alternates | No geo needed to serve; user chooses | High: one `[market]` segment, shared components, data keyed by market | **Recommended** (matches brief) |
| Subdomain `us.cairnfertility.com` | Treated as semi-separate site; hreflang still works cross-host | Same | Medium: same codebase, host-based rewrite needs proxy; HSTS `includeSubDomains` already set ([next.config.ts:78-81](next.config.ts)) | Workable, weaker |
| Separate domains (`.com` US / `.co.uk` UK) | Clear geo signal, split authority | Same | Low: `.co.uk` currently redirects; would reverse the decision in site.ts | Not recommended now |
| Next locale routing (`en-GB`/`en-US`) | Natural hreflang | Same | Market ≠ language here: US vs UK differ by law/data more than words; locale-as-market conflates them | Use market segment, map to locale for `lang`/formatting |
| Geo-IP forced redirect | Harmful (crawlers from US get redirected, UK readers abroad lose content) | Processes location on every request | Needs dynamic proxy, breaks static | **Avoid** |
| Geo-IP suggestion banner (non-forced) | Neutral if crawlers see same content | Acceptable if only the country header is read at edge, not stored/logged/sent; or do it client-side from `Intl`/`navigator.language` with zero IP use | Small component | **Optional**, privacy-reviewed |

### Inferences
- Keeping UK at unprefixed paths avoids redirecting every existing URL and preserves the (pre-launch, noindex) link structure; alternatively move to `/uk` before launch while `robots` still blocks indexing — the pre-launch noindex window ([src/app/layout.tsx:24-27](src/app/layout.tsx)) is the cheapest time to change URL structure.
- The most privacy-conservative banner reads only `navigator.language` (e.g. `en-US`) in the browser and never touches IP; this needs no proxy, keeps pages static, and fits the existing "nothing leaves the browser" promise. Reading Vercel's IP-country header would require a dynamic render or proxy and a privacy-policy update.
- `lang="en"` in the root layout should become `en-GB`/`en-US` per market, which in App Router typically means the `<html>` element sits in a layout under the market segment (root-layout-per-segment pattern) — verify against Next 16 docs.

### Gaps
- Next.js 16.3 local docs on internationalization, `proxy.ts` and multi-region were unavailable (no node_modules). Whether Next 16 offers any built-in App Router i18n routing beyond the documented "[lang] segment + proxy" pattern must be verified after `npm install` at `node_modules/next/dist/docs/`.
- Vercel geo header names/behaviour in 2026 not verified.

---

## 4. Data model changes for US clinics, and extending check:data

### Takeaway
The `Clinic` type needs a market/state dimension, native-currency pricing (USD as a first-class price, not a GBP conversion), a third verification source (SART/CDC) with its own age bands and denominators, per-state insurance/mandate data, network affiliation, and per-field provenance. `check:data` should split into per-market rule sets and gain SART/CDC URL, state, currency and mandate-freshness checks.

### Cited Findings
- Existing US record already shows the mismatch: SART source URL and label, published bands `Under 35 / 35 to 37 / 38 to 40 / 41 to 42 / Over 42` differing from finder brackets, only two brackets mapped, denominator `per intended egg retrieval` — [src/lib/clinics.ts:587-605](src/lib/clinics.ts)
- `RateDenominator` already includes `"per intended egg retrieval"` — [src/types/clinic.ts:86-90](src/types/clinic.ts)
- Finder `AgeBracket`s are `under35, 35-37, 38-39, 40-42, 43-44, 45+` — [src/types/clinic.ts:10-25](src/types/clinic.ts) — these do not align with SART's 38–40 / 41–42 / >42.
- Editorial rules at the top of clinics.ts (verification per region, localPrice conversion, IUI must be priced) — [src/lib/clinics.ts:22-42](src/lib/clinics.ts)
- Exclusion policy is country+name matched and enforced by check:data — [README.md:85-93](README.md), [scripts/check-data.ts:352](scripts/check-data.ts)
- Brief: US funding depends on "whether your plan is fully insured or self-funded" and state mandates bind fully insured plans only; ~25 states + DC have coverage laws, ~15 + DC require IVF cover (brief's own figures, not verified here) — [docs/international-strategy-brief.md:165-181](docs/international-strategy-brief.md)

**Recommended schema additions (proposal)**
- `market: "uk" | "us"` (or reuse `country` with a `Market` map) and `usState?: UsStateCode` on `Clinic`; `Region` gains `"United States"` or regions become market-relative.
- Replace `pricePerCycleGbp` with `price: { amount, currency, kind: "headline" | "package" | "from" }` + `iuiPrice`, keeping a derived GBP/USD only for cross-market comparison; budget filters compare in the viewer's market currency.
- `SuccessReport.verification: "hfea" | "sart" | "cdc" | "clinic"`; add `bySartBand?: Record<"under35"|"age35to37"|"age38to40"|"age41to42"|"over42", { rate; cycles?; }>`, `reportingYear`, `final | preliminary`, `metric` (e.g. live births per intended retrieval, primary transfer outcome). Rate labels gain `BADGE_SART`.
- Licensing: `regulatorIds` / `licence?: { body: "HFEA" | "CDC-reporting" | "SART-member" | "CAP" ..., id, url }` replacing required `hfeaLicensed`.
- `networkAffiliation?: { name, url }` (e.g. multi-site groups; CCRM is one) and `insuranceAccepted?` only if sourced.
- New `src/lib/us-mandates.ts`: per-state `{ state, hasMandate, coversIvf, appliesTo: "fully-insured" | ..., definitionOfInfertility, inclusiveDefinition, effective, sources[], checkedOn, reviewBy, owner }`.
- New `state-eligibility` (or extend `country-eligibility.ts` with `subdivision`) replacing the Colorado-only US entry ([src/lib/country-eligibility.ts:9-12](src/lib/country-eligibility.ts)).
- `DATA_PROVENANCE` becomes per market: `{ uk: {...}, us: { pricesVerifiedOn, successRates: { sart: {url, reportYear}, cdc: {...} }, benchmarks } }`.
- Travel: make `travel.ts` origin-aware (`fromMarket`), or skip travel estimates for in-market US clinics.
- Geo: add US states + major metro places, optional ZIP3 prefixes (bundled, still no geocoder), km/mi formatting by market.

**check:data extensions (proposal)**
- Per-market rule blocks mirroring the UK block: US clinics must have `usState`, `verification ∈ {sart, cdc, clinic}`, SART URL regex (`sartcorsonline.com/rptCSR_PublicMultYear.aspx?clinicpkid=\d+`) when `sart`, `currency: "USD"`, and a state-eligibility entry.
- US coordinate bounds (contiguous US + AK/HI) analogous to [scripts/check-data.ts:105-106](scripts/check-data.ts).
- Separate staleness clocks: UK prices, US prices, SART report year, and each state mandate's `reviewBy` (the brief warns US law changed "three times in eighteen months" — [docs/international-strategy-brief.md:264-265](docs/international-strategy-brief.md)).
- Travel pairing rule only for clinics outside the viewer's market, not "non-UK" ([scripts/check-data.ts:305-320](scripts/check-data.ts)).
- Workflow path filters must include new data files ([.github/workflows/data-freshness.yml](.github/workflows/data-freshness.yml)); the `treatment-data-check` skill needs a US procedure.

### Inferences
- Keeping UK rows unchanged while introducing a discriminated union (`UkSuccessReport | UsSuccessReport | ClinicSuccessReport`) lets `check:data` and TypeScript enforce per-market invariants without touching UK data.

### Gaps
- Exact SART/CDC 2026 report fields, band definitions and licensing terms were not verified (out of scope, no web research).

---

## 5. Supabase schema, privacy, retention, tracking

### Takeaway
Stored data is small: waitlist emails and community applications (with Art. 9 health data and explicit consent), plus hashed invite tokens. The project is in eu-west-1 (Ireland). There is no analytics, pixel or cookie anywhere. That clean baseline is a strong fit for US state consumer-health-data laws, but the legal copy, consent wording and data fields are UK GDPR-only and would need US-specific consent, notices and deletion/rights handling.

### Cited Findings
- `waitlist_signups(id, email, created_at)` — [supabase/migrations/0001_waitlist_signups.sql:14-17](supabase/migrations/0001_waitlist_signups.sql)
- `community_applications(email, first_name, pathway, stage, interests[], reason, affiliation, guidelines_accepted_at, status, reviewed_at, review_note)` and `community_invites(token_hash, expires_at, redeemed_at, revoked_at)` — [supabase/migrations/0002_community_membership.sql:33-77](supabase/migrations/0002_community_membership.sql)
- `p_health_consent` added and recorded as `health_data_consent_at` — [supabase/migrations/0003_community_health_consent.sql:57-65](supabase/migrations/0003_community_health_consent.sql); legal.ts says reason, pathway and stage are special-category (health, sometimes sexual orientation) — [src/lib/legal.ts:26-33](src/lib/legal.ts)
- Retention enforced nightly by pg_cron `purge_community_data()` at 03:15 UTC — [supabase/migrations/0004_community_retention.sql:49-189](supabase/migrations/0004_community_retention.sql); days mirrored in `RETENTION_DAYS` (declined 30, unreviewed 90, approved-unused 30, joined free text 90, removed 30, spent invites 30), invite TTL 7 days — [src/lib/retention.ts:12-32](src/lib/retention.ts)
- Waitlist retention: "until you unsubscribe or ask" — [src/lib/legal.ts:276](src/lib/legal.ts) (no automatic expiry).
- Forms are closed by a code switch and a DB flag (`app_flags.forms_open`) — [src/lib/launch.ts:1-42](src/lib/launch.ts), [supabase/migrations/0005_close_defaults.sql:41-51](supabase/migrations/0005_close_defaults.sql)
- Region: privacy policy says "Our project is hosted in Ireland, in the EU" — [src/lib/legal.ts:287](src/lib/legal.ts); security review names the project `tayunyoosjatxrltcazh`, `eu-west-1`, and INACTIVE (paused) — [docs/security-review.md:195-201](docs/security-review.md). The header comment still lists `SUPABASE_REGION_TBC` as a placeholder — [src/lib/legal.ts:59-61](src/lib/legal.ts) (stale comment; the policy text already names Ireland).
- Access model: anon/publishable key can execute only four security-definer functions and read nothing (RLS on, no policies, revoke all) — [README.md:108-121](README.md)
- Migration 0005 was "Not yet applied" as of the September addendum — [docs/security-review.md:37-41](docs/security-review.md)
- Tracking: legal.ts states "No cookies, no analytics, no advertising or tracking of any kind. The browser makes no third-party calls" — [src/lib/legal.ts:13-14](src/lib/legal.ts). A grep for gtag/analytics/posthog/plausible/pixel/googletagmanager/@vercel/analytics/speed-insights/hotjar/segment across `src`, `next.config.ts`, `package.json` found no tracking code; the only hit is Upstash ratelimit `analytics: false` — [src/lib/rate-limit.ts:38](src/lib/rate-limit.ts). CSP `connect-src 'self'` enforces this at browser level — [next.config.ts:39-44](next.config.ts). Only browser-storage key: `cairn-community-application` (dates only) — [src/lib/legal.ts:15-18](src/lib/legal.ts)
- Matcher answers (family type, age, medical history, budget) held in browser memory only — [src/lib/legal.ts:45-46](src/lib/legal.ts), [src/app/get-started/page.tsx:39-45](src/app/get-started/page.tsx)
- IP handled server-side only for rate limiting; Upstash Redis as store — [src/lib/rate-limit.ts:116-126](src/lib/rate-limit.ts), [README.md:104](README.md)
- The legal-pages skill description says it encodes "the 2026 UK/EU/US legal framework (GDPR, PECR, FTC, state health-data laws)" — `.claude/skills` listing (legal-pages).

**What US state health-privacy law would require here (inference, to confirm with a US reviewer)**
- Washington My Health My Data–style laws treat data like "pathway" (solo/two mums/etc.), "stage" of treatment and free-text reasons as consumer health data, and generally require: a separate consumer health data privacy policy linked from the homepage; separate opt-in consent to collect and a separate one to share; no sale without signed authorization; rights to access/delete including from processors; and restrictions on geofencing around health facilities. Nevada and Connecticut have related provisions. These specifics are not in the repo and should be verified.
- Practical code implications: (a) a US-specific consent checkbox and notice on `/community` and `/waitlist` (the waitlist itself may be low risk, but signing up on a fertility site can itself imply health status); (b) store `market`/`consent_version`/`consent_text_hash` with each application; (c) keep "no pixels, no analytics" as a hard rule for `/us` (the CSP already enforces it; add a CI check); (d) data minimisation: consider making pathway/stage optional or coarser for US applicants; (e) add automatic waitlist expiry; (f) a documented deletion path that covers Supabase, Upstash keys and email; (g) decide whether US data stays in eu-west-1 (acceptable under US law generally, but disclose) or a US project.
- The existing "geo stays in browser, no geocoder" design already avoids precise-location collection, which matters under health-data laws that restrict geofencing.

### Inferences
- Because nothing is tracked, the US privacy gap is mostly documentation and consent UX, not ripping out tooling — a rare, favourable starting point.
- The waitlist has no market column; if US and UK readers get different emails (different law/funding news), a `market` column (non-sensitive) is needed.

### Gaps
- Whether the Supabase project is still paused today was not checked (no live query; out of scope and would touch infra).
- Exact current text of Washington MHMDA, Nevada SB 370, Connecticut, California CCPA/CMIA obligations was not verified (no web research).

---

## 6. What the international strategy brief already decided

### Takeaway
`docs/international-strategy-brief.md` (Aug 2026) covers the US explicitly: it recommends US before Europe but sequences it fourth (UK deeper → Ireland → cross-border Europe → USA), and asks for a country key in the content model, country-scoped paths on one `.com`, a UK+US-only finder, and a US reviewer before insurance content. Some "do now" steps are done (the .com), others are not (no country key in funding data, no routing plan implemented).

### Cited Findings
- "the USA before Europe, and Ireland before either" — [docs/international-strategy-brief.md:153-155](docs/international-strategy-brief.md)
- UK vs US comparison (funding source, gatekeeper = plan's definition of infertility, $15,000–$30,000 a cycle, SART/CDC data) — [docs/international-strategy-brief.md:162-168](docs/international-strategy-brief.md)
- Five reasons for US (language, SART/CDC data, stakes, timing of SB 729/ASRM/federal proposal, content reuse) — [docs/international-strategy-brief.md:197-213](docs/international-strategy-brief.md)
- Phase table: US is phase 4, "Main cost: Real: US-qualified review, SART data work, separate clinic finder" — [docs/international-strategy-brief.md:234-241](docs/international-strategy-brief.md)
- "Do now": country key; `/funding`, `/funding/us`, `/funding/ie` with hreflang and country switcher; buy the .com; finder UK-and-US-only by design; US reviewer — [docs/international-strategy-brief.md:243-260](docs/international-strategy-brief.md)
- Risks: regulatory volatility (needs review date and owner), credibility dilution ("a thin US section is worse than none"), legal exposure (keep to "here is the rule and here is the source") — [docs/international-strategy-brief.md:262-270](docs/international-strategy-brief.md)
- Status check against code: `.com` is canonical — [src/lib/site.ts:4-10](src/lib/site.ts) (done). The brief claims `funding.ts` "already carries `where` on routes and a country array" and that "country cards now on `/funding`" exist — [docs/international-strategy-brief.md:231-232, 248-250](docs/international-strategy-brief.md); but the current `FundingRoute` interface has no `where` or country field ([src/lib/funding.ts:280-301](src/lib/funding.ts)), a grep for `where:` across `src/lib` found nothing, and `/funding` has no Spain/Denmark country cards (grep). So that groundwork is either removed or never landed — **the brief and the code disagree**.
- Finder filters still assume UK/Europe/Rest-of-world regions and a UK-centric travel step, not "UK-and-US-only" — [src/components/ivf-finder/finder-filters.tsx:176-179](src/components/ivf-finder/finder-filters.tsx), [src/components/clinic-matcher.tsx:131-135](src/components/clinic-matcher.tsx)

### Inferences
- If leadership now wants US earlier than phase 4, the brief's "do now" list is still the right engineering prerequisite set; the country-key work is the cheapest and should precede any US page.

### Gaps
- No other doc (security-review, work/faith briefs) addresses US launch specifics; the work-section brief was not read in full.

---

## 7. Phased engineering plan (effort S/M/L)

### Takeaway
Roughly: a foundation phase (market key, routing, locale, provenance) of mostly M items, a data phase dominated by one L item (US clinic data + SART model), a content/legal phase gated on a US reviewer, then launch hardening. UK pages stay intact throughout; UK can remain at unprefixed paths.

### Cited Findings (anchors for each item)
Plan items reference the files cited in sections 1–6.

**Phase 0 — Decisions and prerequisites**
| Item | Effort | Anchor |
|---|---|---|
| Decide URL scheme (UK unprefixed + `/us`, or `/uk` + `/us`) before lifting noindex | S | [src/app/robots.ts](src/app/robots.ts), [src/app/layout.tsx:24-27](src/app/layout.tsx) |
| Run `npm install` and read Next 16.3 docs on i18n, proxy, layouts; record decision | S | AGENTS.md |
| Engage US-qualified reviewer (insurance/ERISA, health-privacy) | S (eng) | [docs/international-strategy-brief.md:259-260](docs/international-strategy-brief.md) |
| Resume Supabase, apply migration 0005 (existing debt) | S | [docs/security-review.md:37-41, 195-207](docs/security-review.md) |

**Phase 1 — Market foundation (no US content yet)**
| Item | Effort | Anchor |
|---|---|---|
| `src/lib/market.ts`: `Market = "uk" \| "us"`, locale (`en-GB`/`en-US`), currency, distance unit, regulator ids | S | new |
| `[market]` segment (or `/us` group) with per-market layout setting `<html lang>`; `generateStaticParams` for markets; keep pages static | M | [src/app/layout.tsx:47](src/app/layout.tsx) |
| hreflang alternates in metadata + sitemap alternates; `x-default` | S–M | [src/app/sitemap.ts](src/app/sitemap.ts) |
| Market switcher in nav/footer; optional client-only suggestion banner from `navigator.language` (no IP) | S | site-nav.tsx, site-footer.tsx |
| Replace hard-coded `en-GB`/`£` formatting with market formatters (6 files, ~150 `£` sites) | M | section 1 counts |
| Add market key to `funding.ts`, `work.ts`, `legal.ts`, `support.ts`, `guides.ts` data (UK values unchanged) | M | [src/lib/funding.ts:280-301](src/lib/funding.ts) |

**Phase 2 — Data model and US clinic data**
| Item | Effort | Anchor |
|---|---|---|
| Clinic type: native currency price, `usState`, generic licence, `verification: "sart"`, SART bands, network | M | [src/types/clinic.ts](src/types/clinic.ts) |
| Rate labels + finder/matcher/comparison support for SART band display and grouping | M | [src/lib/rate-labels.ts](src/lib/rate-labels.ts), `components/ivf-finder/*` |
| Per-market `DATA_PROVENANCE`, finder defaulting to market clinics; matcher budget bands and travel step per market | M | [src/lib/clinics.ts:57-100](src/lib/clinics.ts), [src/components/clinic-matcher.tsx](src/components/clinic-matcher.tsx) |
| `us-mandates.ts` and state-level eligibility replacing Colorado-only entry | M (eng) + L (research) | [src/lib/country-eligibility.ts:152-180](src/lib/country-eligibility.ts) |
| US gazetteer (states, metros, optional ZIP3), km/mi | M | [src/lib/geo.ts](src/lib/geo.ts) |
| Seed US clinic set (e.g. 20–50 clinics in mandate and large-population states) with SART citations and USD prices | L | [src/lib/clinics.ts](src/lib/clinics.ts) |
| Extend `check:data`: per-market rules, SART URL/state/currency checks, US bounds, mandate `reviewBy` staleness, travel rule by market; workflow paths; US section in treatment-data-check skill | M | [scripts/check-data.ts](scripts/check-data.ts), [.github/workflows/data-freshness.yml](.github/workflows/data-freshness.yml) |

**Phase 3 — US content and legal**
| Item | Effort | Anchor |
|---|---|---|
| `/us/funding`: insurance/mandate explorer (fully insured vs self-funded, definition of infertility), replacing NHS checker for US | L | [src/components/funding/nhs-eligibility-checker.tsx](src/components/funding/nhs-eligibility-checker.tsx) |
| `/us/work`: `US_RIGHTS` entry in existing `RightsEntry` shape | M | [src/lib/work.ts:51-75](src/lib/work.ts) |
| How-IVF-works and families: market-scoped national figures and surrogacy/donor lines | M | [src/app/how-ivf-works/page.tsx:339-357](src/app/how-ivf-works/page.tsx), [src/lib/family-types.ts:83-90](src/lib/family-types.ts) |
| Guides: tag each guide by market; write US cost and legal-parenthood guides | M–L | [src/lib/guides.ts](src/lib/guides.ts) |
| Support signposts for US (RESOLVE etc.) | S–M | [src/lib/support.ts](src/lib/support.ts) |
| US legal set: US privacy notice + separate consumer health data policy, US terms/governing-law clause, disclaimer; keep UK set | M (eng) + reviewer | [src/lib/legal.ts](src/lib/legal.ts) |

**Phase 4 — Privacy, forms and launch**
| Item | Effort | Anchor |
|---|---|---|
| Migration: `market`, `consent_version` on waitlist/applications; US health-data consent checkbox; waitlist auto-expiry; update `retention.ts`/0004/legal together | M | [src/lib/retention.ts](src/lib/retention.ts), migrations 0001–0004 |
| CI guard: fail build if any analytics/pixel package or non-self `connect-src` appears | S | [next.config.ts:39-44](next.config.ts) |
| Decide Supabase region for US data (stay eu-west-1 with disclosure, or US project) | S decision / M if split | [src/lib/legal.ts:287](src/lib/legal.ts) |
| Redirects/canonicals if UK paths move; lift noindex per market | S | [next.config.ts:138-178](next.config.ts) |

### Inferences
- Critical path is data and review, not code: the L items are US clinic data and US funding content, both gated on sourcing and a US reviewer. The engineering foundation (Phase 1) is roughly M×4 + S×3 and can ship behind the existing noindex with no user-visible US content.
- Doing Phase 1 before any new UK pages follows the brief's warning that the expensive mistake is "writing another twenty pages that assume the UK and then retrofitting" — [docs/international-strategy-brief.md:245-246](docs/international-strategy-brief.md).

### Gaps
- Effort sizes are engineering judgement from reading the code, not measured; no team velocity data in the repo.
- Target US clinic count and which states to launch with are product decisions not documented in the repo.
