# Legal framework reference (compiled August 2026)

The regulatory landscape legal pages must satisfy, weighted for UK-based
consumer products with global visitors, and for health/fertility products
which carry the highest-sensitivity data class. Re-verify anything marked
(moving) before relying on it — this file is research, not legal advice, and
a solicitor should review pages before a product takes payments or collects
health data at scale.

## 1. The page set and what mandates it

| Page | Driven by |
|---|---|
| Privacy Policy | UK/EU GDPR Arts. 12–14; US state privacy laws (CCPA/CPRA + ~20 states by 2026); FTC Act §5 |
| Cookie Policy + consent for non-essential cookies | PECR (UK) / ePrivacy Directive (EU); ICO & CNIL enforcement; US state opt-outs |
| Terms of Service | Contract law; Consumer Rights Act 2015 (UK); Consumer Rights Directive (EU); ROSCA (US) |
| Medical / product disclaimer | FTC health-claims enforcement; medical-device boundary (below) |
| Consumer Health Data Privacy Policy (separate link) | Washington My Health My Data Act; Nevada SB 370 — only if health data is actually collected |
| Refund / cancellation terms | UK Consumer Contracts Regulations 2013; EU CRD; California AB 2863; ROSCA |
| Accessibility statement | European Accessibility Act (in force June 2025); Equality Act 2010 (UK); ADA Title III case law; WCAG 2.2 AA / EN 301 549 |
| Legal identity / contact ("imprint") | eCommerce Directive Art. 5 (EU); Companies Act 2006 (UK: company name, number, registered office on business websites) |

## 2. Health and fertility data — the strictest regime

- **UK/EU GDPR Article 9.** Data about health, sex life, or fertility is
  special category data. Processing needs **explicit consent** — granular,
  separate from ToS acceptance, as easy to withdraw as to give. Large-scale
  processing requires a DPIA (Art. 35). EU regulators actively probe
  menstruation/fertility apps (Dutch AP, 2026). Fines: up to €20m / 4%
  global turnover.
- **FTC Health Breach Notification Rule** (amended 2024) covers non-HIPAA
  health apps. *Premom* (2023, civil penalty): sharing health data with
  analytics/ad SDKs without consent **is itself a breach**. *Flo Health*
  (2021): policy said "not shared", SDKs shared it — deception. The policy
  must match the actual SDK/tracker surface, audited, not assumed.
- **Washington MHMDA** (private right of action — consumers can sue):
  separate Consumer Health Data Privacy Policy link, opt-in consent to
  collect, separate signed authorization to sell, access/delete rights,
  geofencing ban near care facilities. Nevada SB 370 is similar.
- **California:** CPRA sensitive-PI limits; CMIA extended to reproductive
  health apps (AB 254) — treat such data like medical records. Global
  Privacy Control must be honoured (mandatory in 12+ states by 2026).
- **Post-Dobbs expectation:** state plainly how law-enforcement requests for
  reproductive-health data are handled — require valid legal process,
  challenge overbroad demands, notify the person unless prohibited. The
  strongest answer is architectural: hold nothing to produce.
- **Design rule:** on-device processing of health inputs (never transmitted)
  is the gold standard — it takes the product out of most collection-trigger
  regimes and should be stated prominently as a feature.

## 3. The medical-device boundary (femtech-critical)

- Software marketed for **contraception / preventing pregnancy** is a
  regulated medical device: FDA Class II in the US (Natural Cycles
  precedent), and "control of conception" software under UK MDR 2002 and EU
  MDR. Do not drift into these claims without regulatory clearance.
- Software for **conception planning, education, and clinic comparison** is
  not a device — provided marketing copy stays on that side of the line.
- Disclaimer must state: not a medical provider, not medical advice, no
  clinician–patient relationship, not a medical device, tools are
  informational filters not clinical assessments, consult a qualified
  clinician, emergency-services signposting (999/111 UK), and honest
  provenance/limits of any statistics shown. For fertility products add
  emotional-support signposting (e.g. Fertility Network UK, Samaritans).

## 4. Cookies and trackers

- Opt-in consent before any non-essential cookie or equivalent
  (localStorage, pixels, fingerprinting) fires — PECR/ePrivacy. "Reject"
  must be as easy as "accept" (ICO/CNIL line). Strictly-necessary cookies
  are exempt but must still be listed.
- Cookie policy enumerates the real inventory: name, setter, purpose,
  lifespan, category. Audit first; an undercounting policy is a
  misrepresentation.
- A product with **zero cookies needs no banner** — say so explicitly; it is
  the strongest possible cookie policy. Distinguish things users may mistake
  for cookies: browser permissions (geolocation), hosting logs, browser
  caching.
- Honour Global Privacy Control; with no tracking, state it is honoured by
  default.

## 5. Subscriptions, refunds, cancellation (when the product charges)

- **US:** ROSCA — clear disclosure, express informed consent, simple
  cancellation. FTC click-to-cancel rule vacated (8th Cir., July 2025) but
  rulemaking restarted 2026 (moving); state auto-renewal laws fill the gap.
  California AB 2863 (from July 2025) is the benchmark: cancel by the same
  method as sign-up, renewal reminders.
- **UK:** Consumer Contracts Regulations 2013 — 14-day cooling-off, refund
  within 14 days; digital content needs express consent + acknowledgment to
  start early and waive it. DMCCA subscription regime applies from spring
  2027 (moving): renewal cooling-off periods and reminder notices — draft
  terms to comply already.
- **EU:** Consumer Rights Directive — 14-day withdrawal, same mechanics.
- Terms for a currently-free product should pre-commit: paid features will
  ship with their own clear pricing/renewal/cancellation terms, and
  cancelling will be as easy as signing up.

## 6. Terms of service — consumer-fairness essentials

- Liability carve-outs that can never be excluded (UK): death/personal
  injury from negligence, fraud. State them; blanket exclusions are
  unenforceable and void the clause (CRA 2015 unfair-terms regime).
- Consumers keep local mandatory protections and local courts (Scotland,
  NI, EU) even under an England & Wales governing-law clause.
- For information products: state data provenance and verification tiers
  (regulator-verified vs self-reported), that prices/rates are indicative,
  no endorsement in either direction, and that illustrative stories are not
  real patients if they aren't.
- Severability, change process (posted date, continued use = acceptance),
  and a working contact.

## 7. Accessibility

- Target WCAG 2.2 AA; EAA in force for products serving EU consumers;
  Equality Act 2010 reasonable adjustments (UK).
- Statement must include: the standard targeted, measures in place, **honest
  known limitations**, a feedback channel with response time, enforcement
  route (EASS in UK), and a statement date + review cadence.

## 8. Other recurring items

- **Children:** state the audience (18+ for fertility-treatment products);
  COPPA "no knowing collection under 13"; GDPR parental-consent thresholds
  (13–16 by country) if minors are in scope.
- **Breach duties:** UK/EU GDPR 72-hour regulator notification; FTC HBNR
  user/FTC/media notice for US health apps.
- **EU AI Act** (obligations phasing through Aug 2026, moving): if the
  product surfaces algorithmic predictions (fertile windows, success
  estimates), disclose that outputs are estimates with error, and keep
  claims out of diagnosis territory.
- **International transfers:** name the mechanism (UK Extension to the
  EU–US Data Privacy Framework, SCCs) for any US processor (e.g. Vercel).
- **Regulator links to cite:** ICO (ico.org.uk, 0303 123 1113), HFEA
  (hfea.gov.uk) for UK fertility, EASS (equalityadvisoryservice.com).

## 9. Reference implementation

CairnFertility (this repo, PR "Build out the legal pages"): six data-driven
pages from `src/lib/legal.ts` rendered by `src/components/legal-page.tsx` —
an example of the audit-first method applied to a no-collection editorial
product, including the health-data on-device stance, the zero-cookie policy
pattern, law-enforcement request wording, and TODO-flagged entity details.
