# Going beyond the UK — a strategy brief

Written August 2026, in answer to three questions: should CairnFertility cover Europe,
should it cover the USA, and is the American approach so different that the site would
have to be rebuilt to serve it.

Short answer: **the USA before Europe, and Ireland before either.** Europe belongs on the
site as a cross-border treatment layer in English, not as twenty localised sites.

---

## 1. Is the American approach "totally different"?

Structurally, yes. Practically, the site's method survives the move intact.

| | UK | USA |
| --- | --- | --- |
| Who funds treatment | NHS, where you qualify | Employers and state-mandated insurance |
| Who decides | 42 ICBs, each with a written policy | Your health plan document, and whether your plan is fully insured or self-funded |
| The gatekeeping rule | Postcode, plus the donor-insemination requirement | The plan's **definition of infertility** |
| Typical private cost | £5,000–£7,000 a cycle before drugs | $15,000–$30,000 a cycle |
| Per-clinic outcome data | HFEA, public and granular | SART and CDC, public and granular |

**Does health insurance cover fertility treatment?** In the UK, essentially never on an
individual policy — assisted conception is a standard exclusion, and an existing diagnosis
is excluded again as a pre-existing condition. In the USA it frequently does, but through
your employer rather than a policy you buy:

- Around **25 states and DC** have fertility insurance coverage laws; roughly **15 plus DC**
  specifically require IVF cover.
- Those mandates bind **fully insured** plans only. **Self-funded** employer plans — which
  cover most Americans with employer insurance — are exempt, so two colleagues in the same
  state can have completely different answers.
- A federal rule proposed in May 2026 would create fertility benefits as a category of
  "excepted benefits", giving employers a lighter-touch route to offering cover from plan
  years beginning January 2027. It is a proposal, not law.

The part that matters most for this site's audience is the definition question. American
plans have historically gated IVF behind a definition of infertility requiring twelve
months of unprotected heterosexual intercourse — which excludes solo parents and same-sex
couples by construction, not by intent. That is now being dismantled: ASRM redefined
infertility in 2023, and **California's SB 729**, effective for large-group fully insured
plans issued or renewed from January 2026, writes an inclusive definition into law and
covers up to three egg retrievals with unlimited transfers.

That is precisely the story this site already tells about England's ICB policies. Same
shape, different document. The editorial method — *find the written rule that governs you,
read the clause that excludes people like you, here is what to do about it* — is the
transferable asset, and it is worth more than any individual fact on the site.

## 2. Why the USA before Europe

1. **Language.** One market, one language, no translation cost.
2. **Data.** The clinic finder is built on HFEA per-clinic outcomes. The only comparable
   public dataset anywhere is American — SART and the CDC's ART reports. Most of Europe
   publishes national aggregates through ESHRE and nothing per clinic, so the single most
   defensible thing the site owns cannot be rebuilt for France or Germany at all.
3. **Stakes.** At $15,000–$30,000 a cycle with no national safety net, the cost of not
   knowing your options is higher in the USA than anywhere else in the developed world.
   High stakes make guidance valuable and fertility one of the most contested advertising
   categories in health.
4. **Timing.** SB 729, the ASRM definition and the federal proposal all landed inside
   eighteen months, and every one of them is about whether solo and LGBTQ+ patients count
   as infertile. That is this site's exact readership, mid-story.
5. **Content reuse.** Family-type, donor-conception, emotional and faith content moves
   across roughly intact. Funding, legal and clinic content does not — but that is equally
   true of France or Spain, so the USA is not the harder case.

## 3. Why Europe is a different shape of problem

Europe has more IVF cycles than the USA, and it is still the weaker second market:

- **Fragmentation.** Thirty countries, twenty-plus languages, thirty funding regimes and
  thirty sets of donor law. Each country is a full rebuild of the funding and legal
  content, for a fraction of the audience.
- **Generous public funding.** France reimburses four cycles, Belgium six, Israel is
  effectively uncapped. Where the state pays, the funding guidance this site does best is
  worth much less to the reader.
- **No per-clinic data.** The clinic comparison tool has nothing to run on.

What Europe *does* have is a real, underserved, English-language niche: **cross-border
treatment**. UK and Irish patients already travel to Spain, Czechia, Greece and Denmark
for cost, donor availability and access rules that exclude them at home. That is one page
family — where to go, what it costs, who each country admits, and what donor anonymity
means for the child — not twenty country sites. The country cards now on `/funding` are
the first version of it.

## 4. Recommended sequence

| Phase | Market | Why | Main cost |
| --- | --- | --- | --- |
| 1 | **UK, deeper** | The section is one page; funding, work and clinic content can all go further | None new |
| 2 | **Ireland** | English, shares Access Fertility, new public scheme, already travels for treatment | One country's funding and legal detail |
| 3 | **Cross-border Europe** in English | Serves the existing audience rather than a new one | One page family, no localisation |
| 4 | **USA** | Everything in section 2 | Real: US-qualified review, SART data work, separate clinic finder |

## 5. What to do now, before there are more pages

The expensive mistake is not choosing the wrong market. It is writing another twenty pages
that assume the UK and then retrofitting a country dimension.

1. **Add a country key to the content model now.** `src/lib/funding.ts` already carries
   `where` on routes and a country array; make that the pattern rather than the exception,
   and keep facts in data files rather than JSX.
2. **Plan the routing before you need it.** `/funding` (UK), `/funding/us`, `/funding/ie`,
   one page component reading country-scoped data, with `hreflang` and a country switcher.
   Cheap now, painful at twenty pages.
3. **Buy the `.com`.** `cairnfertility.co.uk` signals UK-only to an American reader and to
   search engines. Country-scoped paths on one `.com` beat separate country domains at this
   size.
4. **Treat the clinic finder as UK-and-US-only by design.** Do not promise a global clinic
   comparison the data cannot support. Say what the tool covers.
5. **Get a US reviewer before publishing US insurance content.** Plan documents, ERISA
   pre-emption and state mandates are not a place to reason from first principles.

## 6. Risks worth naming

- **Regulatory volatility.** The US fertility-benefits landscape changed three times in
  eighteen months. Anything published there needs a review date and an owner.
- **Credibility dilution.** The site's authority comes from being specific. A thin US
  section is worse than none, and would undercut the UK content that earns trust.
- **Legal exposure.** Insurance and employment content carries more risk than treatment
  guidance. Keep to "here is the rule and here is the source", never "here is what you
  should do".
