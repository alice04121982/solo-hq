# Security review — CairnFertility

Reviewed 19 August 2026, against the `claude/community-onboarding-security-9cwdxb`
branch. Covers the whole site, not only the new community code.

The threat model that shaped it: the valuable thing here is not money, it is
**the fact that a named person is doing IVF**. Nobody breaks into this site to
steal a session — there are no accounts and no payments. They break in to get a
list. So the findings below are weighted by "does this leak who is on that
list", and the architecture that came out of it keeps as little of the list as
possible and puts the rest behind a key the website does not hold.

Severity is: **High** — a realistic path to exposing who is on the list, or to
site compromise. **Medium** — meaningful weakening. **Low** — hardening.
**Info** — worth knowing.

---

## Summary

| # | Finding | Severity | State |
|---|---|---|---|
| 1 | Waitlist API confirmed whether an email was already registered | High | Fixed |
| 2 | Postgres unique-violation errors logged the applicant's email | High | Fixed |
| 3 | No HTTP security headers at all (no CSP, HSTS, framing, referrer) | High | Fixed |
| 4 | 4 high-severity CVEs in production dependencies | High | Fixed |
| 5 | Database schema and access rules existed nowhere in the repo | Medium | Fixed |
| 6 | No rate limiting on any write endpoint | Medium | Fixed (app tier) |
| 7 | Write endpoints accepted cross-origin form posts and unbounded bodies | Medium | Fixed |
| 8 | Supabase project is paused — the waitlist is silently failing in production | High | **Needs you** |
| 9 | Edge rate limiting / WAF not configured | Medium | **Needs you** |
| 10 | WhatsApp exposes members' phone numbers to each other | High (inherent) | **Accepted, disclosed** |
| 11 | Invite tokens travel in a URL, so they reach logs and history | Medium | Mitigated by design |
| 12 | No email provider, so invites are sent by hand | Low | Deliberate for now |
| 13 | `script-src` still allows `'unsafe-inline'` | Low | Accepted, with reasoning |
| 14 | Pre-existing lint errors (`<a>` instead of `<Link>`) | Info | Untouched |

---

## Fixed in this branch

### 1. The waitlist told you whether an email was already on it — High

`POST /api/waitlist` returned `{"status":"already-joined"}` for a duplicate and
`{"status":"joined"}` for a new address. Anyone could take an email address,
post it, and learn from the response whether that person had signed up to a
fertility community. That is a disclosure about someone's reproductive health
to an unauthenticated stranger, available at the rate of one request each.

Fixed at both layers, because either alone could be undone by a future edit:

- `submit_waitlist_signup()` in the database does `on conflict do nothing` and
  returns `void` either way.
- The route returns one response for every non-malformed request.

The same rule is built into the community application endpoint from the start:
a first application, a repeat, and an address that was previously declined all
produce the identical `{"status":"received"}`.

*Cost:* the friendly "you're already on the list" message is gone. Worth it.

### 2. Applicant emails were being written into the hosting logs — High

The old handler did `console.error("waitlist insert failed", error)`. A
Postgres unique violation puts the offending value in `error.details` — so
every duplicate signup wrote the person's email address into Vercel's logs,
where it sat outside the retention promises the privacy policy makes about the
database. Replaced with `safeLog()` (`src/lib/api-guard.ts`), which logs the
error *code* and nothing else. All four endpoints go through it.

### 3. No security headers — High

The site sent no CSP, no HSTS, no framing policy, no referrer policy and no
permissions policy. The concrete risk was not exotic: anyone could iframe the
application form on a lookalike page and harvest what people typed into it.

`next.config.ts` now sets, on every route: `Content-Security-Policy`,
`Strict-Transport-Security` (2 years, preload-eligible), `X-Frame-Options:
DENY`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`
(everything off except geolocation, which the clinic search needs),
`Cross-Origin-Opener-Policy`, and `X-DNS-Prefetch-Control`. `poweredByHeader`
is off.

Verified against a production build: all pages render with no CSP violations
in Chromium, and static generation is preserved (87 pages still prerendered).

### 4. Four high-severity CVEs in production dependencies — High

`npm audit` reported 4 high-severity advisories reachable in production
(`postcss` — path traversal and arbitrary `.map` file disclosure; `sharp` —
inherited libvips CVEs), all pulled in by Next 16.2.1. Bumped to Next 16.3.1
and applied the safe dev-dependency fixes.

`npm audit` now reports **0 vulnerabilities**, production and dev. Build and
lint pass on the new version.

### 5. The database schema lived only in a web console — Medium

The README claimed row-level security "see `supabase/migrations`". There was no
such directory: the access rules protecting the signup list were unreviewable,
unversioned, and would be lost with the dashboard. They now exist as
`supabase/migrations/0001…` and `0002…`, written to be safe to re-run against
the existing project.

The model they encode is the main structural change in this branch. **The anon
key the website holds has no privileges on any table.** RLS is on with no
policies, plus an explicit `revoke all`. The only things the website can do are
execute four `security definer` functions: submit a signup, submit an
application, check an invite, redeem an invite. It cannot read the waitlist, it
cannot read applications, it cannot approve anyone, and it cannot mint an
invite. Those need the service-role key, which exists only on the reviewer's
machine and is never set on the deployment.

So the blast radius of "someone compromises the website" is now: they can write
rows. Not read them.

Each function pins `search_path`, which is the specific way `security definer`
functions get hijacked, and validates its inputs independently of the API
route — a bug upstream still cannot write junk.

*Verified*, not assumed: the migrations were applied to a local PostgreSQL 16
and exercised as the `anon` role. Select, insert, update and delete on all
three tables are denied; the functions work; a duplicate application is a
silent no-op; an invalid pathway and an oversized field raise; and the invite
lifecycle behaves — wrong email `false`, expired `false`, correct `true`,
replay `false`, status `used`, application `joined`.

### 6. No rate limiting — Medium

Any endpoint could be called without limit. Added `src/lib/rate-limit.ts` and
applied it to all three write endpoints. The apply endpoint uses two tiers: a
generous one on requests (a person who mistypes an email, forgets the checkbox,
then rewrites their answer has done nothing wrong and must not be locked out of
a form they have just written a paragraph into), and a tight one that only a
request about to reach the database can spend. The redeem endpoint limits per
IP *and* per token, because the token is the thing being attacked and it cannot
move between addresses.

**Be clear about what this is worth.** The counters live in one serverless
instance's memory. They stop casual scripted abuse and they will not stop a
determined distributed attacker. See finding 9 for the control that would.

### 7. Write endpoints were open to cross-origin posts and unbounded bodies — Medium

`request.json()` was called with no content-type check, no size limit and no
origin check, so a form on any website could post to them and a large body
would be parsed in full. `readJsonBody()` now requires `application/json`
(which a cross-origin HTML form cannot send), caps bodies at 8 KB against both
the declared and the actual length, and rejects a request whose `Origin` is not
the host it arrived on.

The origin check compares against the request's own host rather than a
configured allowlist, deliberately: an allowlist fails closed the day a new
domain is attached, and a silently broken application form on this site is a
worse outcome than a slightly looser check.

---

## Needs a decision from you

### 8. The Supabase project is paused — High, and live right now

The `solo-hq` Supabase project (`tayunyoosjatxrltcazh`, eu-west-1) is
**INACTIVE**. Free-tier projects pause after inactivity, and a paused project
refuses connections — so `POST /api/waitlist` in production is currently
failing, every signup since it paused has been lost, and the community
application form will fail the same way the moment it ships.

I did not resume it: that is a change to your infrastructure with billing
implications, and it is your call. **Resume it in the Supabase dashboard before
this branch goes live**, then apply the two migration files. Worth considering
a paid tier or an uptime check, since a database that pauses itself is not a
database a signup form can rely on.

### 9. There is no edge rate limiting — Medium

The application-level limiter (finding 6) is a backstop. The real control is
Vercel's firewall, which rejects requests before a function is invoked and
holds across instances. Suggested rules: `/api/community/apply` at ~10 requests
per 10 minutes per IP, `/api/community/join` at ~10 per 10 minutes, and
`/api/waitlist` at ~20 per hour. Enable Attack Challenge Mode if you are ever
targeted. This is dashboard configuration, not code.

### 10. WhatsApp shows members each other's phone numbers — High, and inherent

This is the one thing in the whole design that cannot be engineered away, so it
should be a decision you make on purpose rather than one you inherit. In a
WhatsApp group, every member can see every other member's phone number. For a
group of people going through IVF, that is a real exposure: one approved member
who turns out to be a bad actor walks away with a list of phone numbers of
people who are, verifiably, doing fertility treatment.

Everything reasonable is in place around it — vetting before entry, a rule
against saving or reusing numbers, and disclosure in three places before anyone
joins (application page, group rules, invite redemption). But those are norms,
not controls.

Options, in the order I would consider them:

1. **Stay on WhatsApp and keep groups small.** Vetting and small numbers do
   most of the work. This is what the branch ships, on the assumption that
   reach matters more than perfect privacy for a community that has to start
   somewhere.
2. **Turn on WhatsApp's own admin controls** — "approve new participants" as a
   second gate matching the invite list, and admin-only edits to group info.
   Do this regardless of which option you pick. Verify the current behaviour in
   the app before relying on any specific claim about how Communities hide
   numbers; that has changed across versions and is not something to take on
   trust from documentation.
3. **Move to a platform where numbers are not identity** — Signal usernames, or
   a hosted community tool. Costs reach, buys real privacy. Nothing in this
   branch is WhatsApp-specific: the group link is one environment variable and
   the platform name is another, so switching is a config change, not a rewrite.

### 12. Invites are sent by hand — Low, deliberate

No email provider is configured in this repository, and I did not add one
speculatively. `npm run community -- approve <email>` prints the invite link
for you to send. That is fine at ten members and irritating at a hundred; when
it stops scaling, wire in a provider (Resend or Postmark) and have `approve`
send directly, so the link never sits in your clipboard or your sent folder.

---

## Accepted, with reasoning

### 11. Invite tokens travel in a URL

A token in a URL path is visible to mail servers, browser history, and Vercel's
request logs. That is unavoidable — an emailed link is a GET — so the design
assumes the token will leak and makes a leaked token insufficient:

- Redeeming needs the token **and** the email address it was issued to. A token
  found in a log is not a way in.
- Tokens are single-use, expire in 7 days, and are stored only as a SHA-256
  hash. A database dump is a list of hashes, not a set of working invites.
- The route sends `Referrer-Policy: no-referrer`, `X-Robots-Tag: noindex,
  nofollow, noarchive` and `Cache-Control: no-store`, and the page loads
  nothing from any external origin, so the URL never reaches a third party.
- Rendering the page is free; only submitting spends the invite. Mail scanners
  and link previewers follow links, and a GET that burned the token would leave
  half of all invites dead before their owner clicked.

Verified: the join route returns exactly one `Referrer-Policy: no-referrer`,
and a malformed token is rejected without a database round trip.

### 13. `script-src` still allows `'unsafe-inline'`

A nonce-based CSP requires every page to render dynamically, which for a site
that is almost entirely static reading material means losing static generation
and CDN caching everywhere. What it would buy is protection against injected
inline script — and the thing that makes that attack pay, a session to steal,
does not exist here: no accounts, no cookies, no `dangerouslySetInnerHTML`
anywhere in the codebase, and no user-submitted content is ever rendered back
out as HTML.

So the directives doing the real work are the strict ones: `connect-src` (an
injected script could not exfiltrate anywhere), `form-action`,
`frame-ancestors`, `base-uri 'none'` and `object-src 'none'`.

**Revisit this the day the site grows accounts or renders member-submitted
content.** At that point the trade flips and the upgrade path is a nonce in
`proxy.ts` (Next 16 renamed middleware to Proxy) or `experimental.sri`.

### 14. Pre-existing lint errors

`npm run lint` reports 7 errors and 2 warnings, all `<a>`-instead-of-`<Link>`
and unused-expression issues in files this branch does not touch
(`site-nav.tsx`, `family/*`, `clinic-matcher.tsx`, `cost-calculator.tsx`).
Not security, and out of scope for this branch — flagged so the count is not
mistaken for something introduced here. Every new file added by this branch is
lint-clean.

---

## Checked and found clean

- **No XSS sinks.** No `dangerouslySetInnerHTML`, no `eval`, no `new Function`,
  no `innerHTML` assignment anywhere in `src/`.
- **No SQL injection surface.** Every database call is a parameterised RPC;
  there is no string-built SQL in the app.
- **External links.** All 24 `target="_blank"` links carry
  `rel="noopener noreferrer"`.
- **Secrets.** No `.env` files are committed, `.gitignore` covers `.env*`, and
  no key or token appears in the source. Nothing sensitive is exposed through a
  `NEXT_PUBLIC_` variable — the only one is the platform's display name, which
  is a word, not a secret.
- **Third-party calls from the browser.** Exactly one: `api.postcodes.io`, only
  after an explicit geolocation permission prompt, and it is the only non-self
  origin in `connect-src`. Share buttons build URLs with `encodeURIComponent`.
- **Client-side storage.** The application journey remembers a first name and a
  date, and deliberately not the email, the pathway, the stage or the free-text
  answer — browsers are shared, and someone else opening the page should learn
  nothing beyond "someone applied".
- **CI.** `.github/workflows/data-freshness.yml` has correctly scoped
  permissions, no `pull_request_target`, and reads its untrusted input into a
  variable rather than interpolating it into the script body.
- **Supabase advisors.** The project's security advisor returns no lints.

---

## Re-run this review

```bash
npm audit                 # expect: 0 vulnerabilities
npm run build             # expect: pass, 87 pages prerendered
npm run lint              # expect: only the 9 pre-existing problems above
curl -sSI https://<site>/ | grep -iE 'content-security|strict-transport|x-frame'
```

The database access model is worth re-proving after any migration change:
apply both files to a scratch PostgreSQL, `set role anon`, and confirm that
`select` on all three tables is denied while the four functions work.
