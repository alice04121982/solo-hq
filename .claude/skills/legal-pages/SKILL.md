---
name: legal-pages
description: Build or update a product's legal pages (privacy policy, terms of service, cookie policy, medical/product disclaimer, accessibility statement, contact) so the product acts legally at all times. Use whenever creating legal pages for a new product, changing anything about what a product collects, stores, shares, or charges, or reviewing existing legal copy. Encodes the audit-first drafting method and the 2026 UK/EU/US legal framework (GDPR, PECR, FTC, state health-data laws) in reference.md.
---

# Legal Pages

How to produce legal pages that keep a product acting legally: audit what the
code actually does, write copy that describes exactly that, and wire the pages
in as maintained parts of the product — not boilerplate bolted on at the end.

**The prime rule: a legal page is a set of enforceable representations.**
Regulators prosecute the gap between what a policy says and what the code
does (FTC v. Flo Health; FTC v. Premom). Template copy that overclaims
("we use analytics cookies" when there are none) or underclaims (silent about
an SDK that shares data) is worse than no page. Truth first, always.

## Process

### 1. Audit the code before writing a word

Establish, with greps and file reads — never assumptions:

- **Data in:** forms, auth, accounts, payment flows, APIs called from the
  client, geolocation, uploads. Check that forms are actually wired — a dead
  waitlist input collects nothing and the policy must not claim otherwise.
- **Data out:** every third-party request (SDKs, fonts, image CDNs, analytics,
  error trackers, payment processors). Each is a disclosure obligation.
- **Storage:** cookies, localStorage, databases, logs. `grep` for
  `document.cookie`, `localStorage`, analytics imports, pixel scripts.
- **Sensitive classes:** health/fertility/sexual life, finances, children,
  precise location, biometrics. These trigger the strictest regimes
  (GDPR Art. 9, Washington MHMDA, California CMIA — see reference.md).
- **Claims made by marketing copy** elsewhere in the product: medical-ish
  claims can reclassify software as a medical device (contraception claims
  especially — see reference.md §3).
- **Commercial mechanics:** prices, subscriptions, trials, renewals, refunds.

Write the audit's findings into a comment block at the top of the legal
content file so the next editor knows what the copy was written against.

### 2. Choose the page set

Baseline for any consumer product: **Privacy Policy, Terms of Service,
Cookie Policy, Accessibility Statement, Contact** (with legal identity).
Add when applicable:

- **Medical/product disclaimer** — any health-adjacent product.
- **Refund/cancellation policy** (may live in ToS but must be conspicuous) —
  anything paid.
- **Consumer Health Data Privacy Policy** (separate, distinctly linked) — if
  health data is actually collected from US consumers (MHMDA requirement).

Footer must link every page; every page cross-links its siblings.

### 3. Draft using the framework

Read `reference.md` in this skill for the current UK/EU/US legal landscape,
per-page section checklists, and the health-data, cookie, subscription, and
medical-device rules. Drafting principles that always apply:

1. **Describe reality, enumerate exhaustively.** "This list is exhaustive"
   is a strong, checkable claim — make it and keep it true.
2. **Plain language** (GDPR Art. 12 requires it). Short summary up top,
   detail below. Write like the product's own voice, not like a template.
3. **Named identity.** Controller/trading name, jurisdiction, working contact
   email on every policy. Never invent entity details, emails, or addresses —
   use what verifiably exists, and leave a `TODO` comment (not visible
   placeholder text) for company number / registered office, flagged to the
   user.
4. **Effective date on every page**, updated with every change, and a stated
   change process ("policy updates ship before the feature does").
5. **Consistency:** third-party lists, contact details, and retention claims
   must match across all pages.
6. **Rights are actionable:** name the regulator (ICO etc.), the response
   deadline, and the exact channel for requests.
7. **Data minimisation is the best clause.** Where possible, prefer the
   architecture that keeps data on-device — then say so prominently; it is
   both the strongest compliance position and a genuine product feature.

### 4. Implement as maintained code

- Copy lives in a data file (e.g. `src/lib/legal.ts`) with a typed section
  model, rendered by one shared layout component — per-page JSX drifts.
- Head the data file with the audit-facts comment and the rule: *when the
  code changes what it collects, this file changes in the same PR.*
- Match the product's design system and conventions (in this repo:
  `cairn-components` and `cairn-color-tokens` skills; single light background
  for document-like child pages; house list and callout styles).
- Metadata (title/description) per page; static prerender; verify the build.

### 5. Self-check before shipping

1. Could every sentence be defended to a regulator by pointing at code?
2. Does anything promise a feature that isn't wired up (or vice versa)?
3. Are non-essential cookies impossible without a consent flow? (No cookies →
   say so plainly; no banner needed.)
4. Health data: does any of it leave the device? If yes, is explicit,
   separate, withdrawable consent implemented *before* collection?
5. Are the pages linked from the footer, cross-linked, dated, and built?
6. Have unresolvable facts (legal entity, ICO registration, dedicated
   privacy inbox) been flagged to the user rather than invented?
