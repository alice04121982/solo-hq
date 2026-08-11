# IVF & Work section — build brief

A proposed `/work` section covering fertility treatment and employment: what your rights
are, what employers actually offer, how to find out, how to ask, and how to weigh fertility
benefits when you are taking a job.

Written August 2026. Nothing here is built yet.

---

## Why this section, and why now

**It is the largest unclaimed money on the site.** `/funding` already says employer benefits
are the most under-claimed route in fertility, and then has one card's worth of room to say
it in. In the USA, half of employers with 500+ staff now cover IVF, rising to 77% of those
with 20,000+ — and reporting on that data repeatedly finds most employees do not know their
own employer covers it.

**It is where people are quietly losing their jobs.** A 2025 international survey found
38% of UK employees undergoing fertility treatment had left or considered leaving their job
because of it, 63% said their employer had no fertility policy, and only 35% found their
manager supportive. CIPD puts UK employers with any fertility policy at around 27%. This is
not a benefits-admin topic; it is one of the main reasons treatment gets abandoned.

**It is the most portable content the site has.** Employment questions are structurally
similar everywhere, the benefit providers are multinational, and none of it depends on the
HFEA. If the site expands (see `international-strategy-brief.md`), this section travels
before anything else does.

**It reaches people earlier than the rest of the site.** Someone comparing job offers, or
deciding whether to tell their manager, is not yet a fertility-clinic reader. This is a
front door.

---

## Structure

Route `/work`, in the nav's More menu, built from `Section` bands like `/faith` and
`/funding`. Content in `src/lib/work.ts` with an editorial-rules header.

### 1. Hero — "What you are owed, and what you have to ask for"

The framing the whole section runs on: a small amount is law, a great deal is policy, and
the gap between them is closed by asking well.

### 2. Your rights (`#rights`)

Country accordion, UK first and fullest. The UK entry must be exact, because this is the
part people act on:

- There is **no statutory right** in Great Britain to time off, paid or unpaid, for
  fertility treatment. Whether you get it depends on your contract and your employer's
  policy.
- Acas guidance treats fertility appointments and treatment-related sickness the same as
  any other medical appointment or sickness under an employer's own policy.
- **Pregnancy protection begins at embryo transfer**, not at the start of a cycle. From
  transfer you have the rights of a pregnant worker, including paid time off for antenatal
  appointments.
- If the transfer is unsuccessful, protection against pregnancy discrimination continues
  for **two weeks** after you are told.
- Refusing time off can still amount to sex discrimination, and repeated Private Member's
  Bills have proposed a statutory right without becoming law. Say clearly which of these is
  law and which is a proposal.

Other entries, all sourced and hedged: **Ireland** (Bank of Ireland and Vodafone Ireland
offer 10 days' fertility leave voluntarily; Labour's Reproductive Health Leave Bill proposes
a statutory 10 days, plus leave for early loss — proposed, not law), **Italy, Greece, Malta,
Portugal, France and Ukraine** (reported to give a statutory right to time off for
treatment — verify each before publishing), **USA** (no fertility-specific leave right;
FMLA, ADA and Title VII do work in the background, and state law varies).

### 3. What employers actually offer (`#what-employers-offer`)

- The shapes: a discount, a contribution, a lifetime fund, full cycle cover, paid leave,
  and support platforms with no treatment money attached. These are not the same thing and
  are frequently confused in job adverts.
- Who runs the schemes: **Carrot, Maven and Progyny** (international), **Fertifa, Peppy and
  Apryl** (UK and Europe).
- The numbers that make the case for asking: Mercer's 2025 survey found IVF covered by 50%
  of US employers with 500+ staff (27% in 2020) and 77% of those with 20,000+ (42% in 2020);
  54% of those covering IVF apply a lifetime cap, median $20,000 — under the cost of one
  cycle. UK adoption is far lower, around a quarter of employers.
- Named UK employers with published fertility provision, e.g. NatWest, Monzo, Centrica,
  Clifford Chance, Co-op. Every entry links to the employer's own published statement, and
  the section carries a visible "last checked" date, because these change without notice.

### 4. Find out what yours offers (`#find-out`)

The audit: search the benefits portal for *fertility*, *family forming*, *IVF*, *family
building*; check whether the private medical scheme has a fertility module; check the
partner-inclusion rules; ask whether treatment must be at a partner clinic; ask what happens
to the benefit if you leave. In the USA, add the two questions that decide everything: is
the plan fully insured or self-funded, and what definition of infertility does the plan
document use.

**Interactive: `BenefitsAudit`.** Country plus employer size plus situation (solo,
same-sex couple, couple) generates a copyable email to HR asking the right questions in
the right order, disclosing no more than the reader wants to disclose. Reuses `CopyButton`,
same pattern as the faith section's conversation scripts.

### 5. Asking, without telling everyone (`#asking`)

Scripts to be said out loud or sent:

- Asking HR what exists, without stating that you are in treatment.
- Asking a manager for time off, with and without disclosure.
- Asking for flexibility mid-cycle when scan appointments move at 48 hours' notice.
- Handling a manager who responds badly.

The disclosure decision gets its own treatment: what you gain, what you cannot take back,
who else finds out, and what changes legally at embryo transfer.

### 6. Fertility benefits when you are taking a job (`#job-offers`)

The angle nobody covers, and the one most likely to be shared. If half of large employers
in a market cover IVF and most employees do not know, then benefits are a live variable in
choosing between offers — and one you can ask about before signing.

- How to ask a recruiter without signalling that you are about to start treatment, and why
  asking "what family-forming benefits are in the package?" is a normal benefits question.
- What to check before accepting: the lifetime cap, whether it covers donor gametes, any
  waiting period after joining, whether it is available on day one, whether it covers you
  as a solo parent or a same-sex couple, and whether it survives a change of insurer.
- Waiting periods are the trap: a benefit that starts after twelve months is not available
  for the cycle you are planning in March.
- A copyable checklist of offer-stage questions.

### 7. Making the case internally (`#making-the-case`)

For readers whose employer offers nothing: the retention argument in their own numbers,
what a good policy contains, who to approach, and the CIPD guidance to hand them. Keep it
short and practical — this is the smallest audience on the page but the most motivated.

### 8. Stat band and sources

Four figures, sourced and dated: 50% of large US employers cover IVF; ~27% of UK employers
have any fertility policy; 38% of UK employees in treatment have quit or considered it;
63% report no employer policy.

---

## Editorial rules for `src/lib/work.ts`

1. **Separate law from policy in every sentence.** The most damaging error this section can
   make is implying a right that does not exist. Where something is a proposed bill, say so.
2. **Never advise; state the rule and cite it.** Employment law advice is regulated. The
   page tells readers what the position is and points them at Acas, CIPD, Working Families
   or a solicitor.
3. **Date every employer claim.** Benefits are withdrawn as quietly as they are announced.
   Each named employer carries a source link and the section carries a review date.
4. **Assume the reader has not told anyone.** Every script must work for someone who wants
   to disclose nothing, because that is the majority.
5. **No employer is listed as a recommendation**, and no benefits provider pays to appear.

## Risks and dependencies

- **Legal review before launch.** The rights section should be read by a UK employment
  solicitor — the embryo-transfer protection point in particular is easy to state slightly
  wrong and consequential when it is.
- **Maintenance.** Named-employer content decays fastest of anything on the site. Either
  commit to a review cycle or keep the list short and heavily caveated.
- **Scope discipline.** This is not a general employment-rights site. Everything on the page
  must be specific to fertility treatment.

## Phasing

1. **Phase 1** — UK rights, what employers offer, the audit and the asking scripts. Ships
   as a complete page on its own.
2. **Phase 2** — the job-offers section and `BenefitsAudit`, once phase 1 is reviewed.
3. **Phase 3** — Ireland, USA and the European statutory-leave entries, in step with the
   international strategy brief.

## Cross-links to add when it ships

- `/funding` → the employer-benefits route card links to `/work`.
- `/resources` → new "Work & Employment" category.
- `src/lib/guides.ts` → the existing `employer-fertility-benefits` script becomes the short
  version and points at the section.
