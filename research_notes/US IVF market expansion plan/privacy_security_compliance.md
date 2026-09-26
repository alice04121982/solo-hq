# US Privacy, Security and Data-Protection Law for a Consumer Fertility/IVF Comparison Site (CairnFertility US launch) — status as of September 2026

Research note, 26 Sept 2026. Scope: a UK company running a Next.js/Vercel + Supabase + Upstash site with waitlist and community-application forms, a cost calculator and a "get started" wizard that asks family type, age and treatment needs. Not legal advice. Several web sources (Venable, MoFo, McDermott, WA AG, 4As) were blocked by the research proxy, so some points rely on search-result summaries rather than full-text reads. These are marked. Items marked **[bg]** come from the researcher's background knowledge: the linked primary source was **not fetched in this session**, so the writer should treat them as lower confidence.

Also in the repo: `/home/user/solo-hq/.claude/skills/legal-pages/reference.md` (compiled Aug 2026) already lists the MHMDA/Nevada SB 370 consumer-health-data policy, FTC HBNR, GPC, ADA/WCAG 2.2 and DPF/SCCs for US processors. This note adds to it and does not contradict it.

---

## 1. HIPAA: does it apply, when would it, and what happened to the 2024 reproductive health rule?

### Takeaway
HIPAA almost certainly does **not** apply to CairnFertility as a consumer comparison/information site. It is not a covered entity (provider, health plan or clearinghouse), and it does not handle PHI on behalf of one. The 2024 HIPAA Reproductive Health Privacy Rule was vacated nationwide in *Purl v. HHS* (N.D. Tex., 18 June 2025), and the appeal was dismissed on 10 Sept 2025, so the rule is dead. HHS's 2022–23 guidance on tracking pixels was also partly vacated (*AHA v. Becerra*, 2024). The real US regime for this site is the FTC plus state consumer-health-data laws, not HIPAA.

### Cited Findings
- On 18 June 2025 the N.D. Texas vacated the HIPAA Privacy Rule to Support Reproductive Health Care Privacy (published 26 April 2024) nationwide, with immediate effect. — [Holland & Knight](https://www.hklaw.com/en/insights/publications/2025/06/hipaas-reproductive-health-rule-is-vacated-nationally); [Quarles](https://www.quarles.com/newsroom/publications/hipaa-reproductive-health-rule-vacated-nationally)
- Grounds: the rule limited providers' ability to comply with state child-abuse reporting and public-health laws, contrary to HIPAA's preemption exception. It also redefined statutory terms and exceeded HHS's authority. The court left in place only the Notice of Privacy Practices amendments tied to substance-use-disorder (Part 2) records. — [Data Privacy + Cybersecurity Insider](https://www.dataprivacyandsecurityinsider.com/2025/07/purl-v-hhs-resetting-the-reproductive-health-privacy-landscape/); [O'Neill Institute, Georgetown](https://oneill.law.georgetown.edu/purls-hipaa-ruling-rolls-back-essential-reproductive-privacy-protections-nationwide/)
- The vacated rule defined "reproductive health care" broadly and expressly included IVF, along with abortion, contraception and others. Its attestation requirement for requests for reproductive health PHI went with it. — [O'Neill Institute](https://oneill.law.georgetown.edu/purls-hipaa-ruling-rolls-back-essential-reproductive-privacy-protections-nationwide/); [Health Law Diagnosis](https://www.healthlawdiagnosis.com/2025/09/appeals-dropped-of-decision-vacating-hipaa-reproductive-health-privacy-rule-confirming-apparent-end-of-the-rule-and-attestation-requirement/)
- The Fifth Circuit dismissed the appeal on 10 Sept 2025, which effectively ended the case. — [ABA Health Law](https://www.americanbar.org/groups/health_law/news/2025/signaling-end-purl-case/)
- *AHA v. Becerra* (N.D. Tex., 20 June 2024) held that OCR exceeded its authority. The court vacated OCR's tracking-technology bulletin to the extent it said HIPAA is triggered when a tracker links an IP address to a visit to an **unauthenticated public page** about health conditions or providers. HHS dropped its appeal in Aug 2024. — [Holland & Knight](https://www.hklaw.com/en/insights/publications/2024/06/american-hospital-assn-v-becerra-are-tracking-tools-ok-again); [AHA News](https://www.aha.org/news/headline/2024-08-29-hhs-will-not-appeal-aha-court-victory-online-tracking-case); [HHS guidance page](https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/hipaa-online-tracking/index.html)
- In July 2023 OCR and the FTC jointly sent warning letters to about 130 hospitals and telehealth providers about the "serious privacy and security risks" of tracking tech. — [Quarles](https://www.quarles.com/newsroom/publications/hhs-ocr-withdraws-tracking-technologies-appeal-in-aha-v-becerra)
- **[bg]** A "business associate" is a person or entity that creates, receives, maintains or transmits PHI **on behalf of** a covered entity to perform a function or service for it, for example hosting patient intake, booking appointments inside the clinic's workflow, patient messaging or billing. — [HHS, Business Associates](https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/business-associates/index.html)

### Inferences
- A consumer entering their own age, family type and treatment needs into CairnFertility's wizard is **not** PHI under HIPAA. CairnFertility is not a covered entity, and it is not acting on a clinic's behalf.
- HIPAA could apply if CairnFertility:
  (a) contracted with US clinics to run their patient intake, scheduling, consult booking or messaging;
  (b) received clinic records (for example outcome data about identifiable patients) to perform a service for the clinic; or
  (c) white-labelled a clinic portal.
  In any of those cases it would need a Business Associate Agreement (BAA), full Security Rule safeguards, and BAAs with its own subprocessors: Vercel, Supabase and Upstash all offer HIPAA/BAA options only on higher-tier plans (verify each).
- Passing a lead to a clinic **at the consumer's own direction** is generally not BA activity. However, it is a "sharing" of consumer health data under MHMDA and state laws, so it needs separate consent (see §3).
- Design recommendation: keep clinic relationships as referral/advertising arrangements with no access to clinic PHI. This keeps HIPAA out of scope.
- Because the Purl vacatur removed the federal "attestation" barrier, clinics' records are now easier for out-of-state law enforcement to reach. That strengthens the case for CairnFertility never holding anything that ties an identifiable person to a clinic or treatment.

### Gaps
- I did not verify whether HHS has proposed a replacement reproductive-privacy rule in 2026. None came up in search results.
- I did not verify current Vercel, Supabase and Upstash BAA tier terms.

---

## 2. FTC: Health Breach Notification Rule, Section 5 health-data cases and the FTC's stance on pixels

### Takeaway
The FTC is the main federal regulator for non-HIPAA health sites.

The 2024 HBNR amendments (effective 29 July 2024) cover health apps and websites. They also count an **unauthorised disclosure**, such as a pixel sending health data to Meta or Google, as a "breach". Whether CairnFertility is a "vendor of personal health records" is arguable, but the FTC reads the definition broadly.

Section 5 cases (GoodRx, BetterHelp, Premom/Easy Healthcare, Flo) show the pattern: sharing health-related user data with ad platforms through SDKs or pixels, contrary to the site's own promises, is deceptive and/or unfair. The remedy is a ban on advertising uses plus penalties.

Under Chair Ferguson (2025–26) the FTC has put less weight on "unfairness" theories. It has still set up a Healthcare Task Force (March 2026) and continues to act on health data shared with ad platforms.

### Cited Findings
- HBNR amendments were published 30 May 2024 and effective 29 July 2024. — [Federal Register](https://www.federalregister.gov/documents/2024/05/30/2024-10855/health-breach-notification-rule); [Alston & Bird](https://www.alston.com/en/insights/publications/2024/08/ftc-updated-health-breach-notification-rule)
- Changes in the amended rule:
  - "Breach of security" now includes an **unauthorised disclosure** of PHR-identifiable health information, not only a hack.
  - A voluntary disclosure that the consumer did not authorise, or that is inconsistent with the company's representations, is a breach.
  - "PHR related entity" now covers entities offering services through a PHR vendor's online services, and "Web sites" now reads "websites, including any online service". The rule states expressly that it applies to health apps and connected devices.
  — [FTC business blog](https://www.ftc.gov/business-guidance/blog/2024/04/updated-ftc-health-breach-notification-rule-puts-new-provisions-place-protect-users-health-apps); [Covington](https://www.covingtondigitalhealth.com/2024/05/ftc-issues-final-rule-to-expand-scope-of-the-health-breach-notification-rule/); [McDermott](https://www.mcdermottlaw.com/insights/ftc-amends-health-breach-notification-rule-to-regulate-health-apps-and-expand-breach-notification-requirements/)
- FTC compliance guide for the rule (notice to individuals, the FTC and, for 500+ residents of a state, the media). — [FTC, Complying with HBNR](https://www.ftc.gov/business-guidance/resources/complying-ftcs-health-breach-notification-rule-0)
- **[bg]** Under the 2024 rule a "personal health record" is an electronic record of PHR-identifiable health information that "has the technical capacity to draw information from multiple sources" and is managed, shared and controlled by or primarily for the individual. Civil penalties run to roughly $53k per violation (inflation-adjusted). Notice is due within 60 calendar days. — [Federal Register](https://www.federalregister.gov/documents/2024/05/30/2024-10855/health-breach-notification-rule)
- **GoodRx (Feb 2023):** the first HBNR enforcement. GoodRx failed to notify users that it had disclosed health information to Facebook, Google and others. It paid a $1.5M civil penalty and is banned from sharing health data for advertising. — [FTC press release](https://www.ftc.gov/news-events/news/press-releases/2023/02/ftc-enforcement-action-bar-goodrx-sharing-consumers-sensitive-health-info-advertising)
- **BetterHelp (final order July 2023):** $7.8M and a ban on sharing health data for advertising. BetterHelp had shared data, including email addresses and intake answers, with Facebook, Snapchat and others. — [FTC press release](https://www.ftc.gov/news-events/news/press-releases/2023/07/ftc-gives-final-approval-order-banning-betterhelp-sharing-sensitive-health-data-advertising)
- **Premom / Easy Healthcare (May–June 2023):** a fertility/ovulation app that shared sensitive data with Google, AppsFlyer and two China-based firms. $100,000 HBNR civil penalty (plus state penalties **[bg]**). This is the most on-point precedent for a fertility product. — [Arnold & Porter](https://www.arnoldporter.com/en/perspectives/blogs/enforcement-edge/2023/06/ftc-settles-with-premom-app-developer); [Fierce Healthcare](https://www.fiercehealthcare.com/regulatory/ftc-claims-fertility-tracking-app-premom-violated-health-breach-notification-rule); [Axios](https://www.axios.com/2023/05/18/ftc-cracks-down-fertility-app-premom-after-goodrx-action)
- **[bg] Flo Health (FTC, 2021 final order):** a period/ovulation app that shared users' health events with Facebook and Google analytics despite promising privacy. The order required notice to users and third-party deletion. It had no monetary penalty, which prompted the Commission's 2021 policy statement that health apps are covered by the HBNR. — [FTC Flo Health case page](https://www.ftc.gov/legal-library/browse/cases-proceedings/192-3133-flo-health-inc)
- **[bg] FTC stance on pixels:** the March 2023 FTC Technology blog "Lurking Beneath the Surface: Hidden Impacts of Pixel Tracking" warns that pixels can send health information to third parties, and that "hashing" identifiers does not anonymise them. — [FTC Tech blog](https://www.ftc.gov/policy/advocacy-research/tech-at-ftc/2023/03/lurking-beneath-surface-hidden-impacts-pixel-tracking)
- **Direction under Ferguson:**
  - Commentators expect less focus on "unfair" disclosure theories and more on data-security failures. — [Wiley](https://www.wileyconnect.com/What-to-Expect-from-New-FTC-Leadership-on-Digital-Health-Care)
  - Chairman Ferguson launched a Healthcare Task Force in March 2026. — [FTC press release](https://www.ftc.gov/news-events/news/press-releases/2026/03/ftc-chairman-andrew-n-ferguson-launches-healthcare-task-force); [Goodwin](https://www.goodwinlaw.com/en/insights/publications/2026/03/alerts-practices-hltc-ftc-launches-healthcare-task-force)
  - The FTC and two states took action against Hims & Hers over subscription and health-data practices. — [McDermott](https://www.mcdermottlaw.com/insights/ftc-two-states-take-aim-at-hims-hers-subscription-and-health-data-practices/) (page blocked; details not verified)

### Inferences
- **HBNR applicability.** A pure comparison site whose wizard results are not stored as a user-managed record drawn from multiple sources is probably **not** a PHR vendor. The risk rises if CairnFertility adds accounts where users save their treatment profile, costs and clinic shortlists, or imports data such as clinic quotes or test results. Conservative posture: design as if the HBNR applies. That means no third-party disclosure of wizard or calculator inputs without express consent, and a breach-response plan with FTC notice mechanics.
- **Section 5 risk** does not depend on HBNR coverage. Any mismatch between the privacy policy and actual tracker behaviour is deception. A pixel or tag that fires on `/get-started` or `/calculator` pages alongside family-type or age answers repeats the BetterHelp/GoodRx fact pattern.
- The FTC orders set the de-facto standard remedy: no health data for advertising, affirmative express consent for any other sharing, and data retention limits.

### Gaps
- I could not confirm the specifics of the FTC Hims & Hers action (date, the pixel allegations and the relief).
- I found no FTC HBNR enforcement action from 2025–26 in the search results.
- The Flo FTC order and pixel-blog details are background knowledge and were not re-fetched.

---

## 3. State consumer health data laws and reproductive-data protections

### Takeaway
The most important law for this site is **Washington's My Health My Data Act (MHMDA)**:
- it applies to any entity, with no revenue threshold;
- it covers data "reasonably linkable" to a consumer that identifies their past, present or future health status, and fertility and IVF interest fall squarely within that;
- it requires separate opt-in consent to collect and to share, and a signed "valid authorization" to sell;
- it bans geofencing within 2,000 ft of health providers;
- it has a **private right of action** through the WA Consumer Protection Act.

Nevada SB 370 and Connecticut's health-data amendments are similar in shape but enforced by the attorney general. Maryland's MODPA goes further, with an outright ban on selling sensitive data and a "strictly necessary" collection standard; it has been enforced since 1 April 2026.

New York's NYHIPA was vetoed in Dec 2025. A narrowed version (S9269/A10357) passed both houses on 3–4 June 2026 and was **awaiting the Governor's action** at the time of writing.

California's AB 254 extends the CMIA (the California health-privacy statute) to "reproductive or sexual health digital services". An IVF information site that facilitates finding care may fall within it.

### Cited Findings
**Washington MHMDA**
- The geofencing ban prohibits a geofence within 2,000 ft of an in-person health care provider used to identify or track consumers, collect data, or send health-related ads. It has **no consent exception**, applies to all persons, and has been in force since 23 July 2023. — [Censinet](https://www.censinet.com/perspectives/washington-my-health-my-data-act-key-requirements); [EPIC](https://epic.org/alive-and-kicking-washington-states-my-health-my-data-act-goes-into-effect-today/)
- There are two tiers of permission: consent to collect or share, and a stricter signed **valid authorization** to sell. The authorization must identify the data, the seller and the buyer, and state the purpose. It must also state that service is not conditioned on it, allow revocation, expire after **one year**, and be retained for **six years**. — [Enzuzo](https://www.enzuzo.com/blog/washington-mhmda); [Stoel Rives FAQ](https://www.stoel.com/insights/publications/faq-washington-states-my-health-my-data-act)
- Controllers must publish a separate Consumer Health Data Privacy Policy. The WA AG's updated FAQ says the homepage link to it must be "separate and distinct" from the general privacy policy link. — [ZwillGen](https://www.zwillgen.com/privacy/washington-mhmda-updated-guidance-health-data-privacy-policy-requirements/); [Cooley](https://cdp.cooley.com/washington-attorney-general-publishes-updated-faq-for-my-health-my-data-act/)
- **[bg]** Other MHMDA points:
  - Regulated entities were covered from 31 March 2024 and small businesses from 30 June 2024.
  - The law covers entities that do business in WA **or** target WA consumers, and it protects non-residents whose data is collected in WA.
  - "Consumer health data" includes data derived or extrapolated from non-health data, such as inferences from browsing.
  - Consumers get access and deletion rights, including an obligation to pass deletion to processors and third parties, and a right to the list of third parties and affiliates.
  - Enforcement is through the WA Consumer Protection Act, with a private right of action for actual damages (trebled up to $25k) plus attorney fees.
  — [Venable](https://www.venable.com/insights/publications/2024/02/washingtons-my-health-my-data-act-are-you) (blocked); [Goodwin](https://www.goodwinlaw.com/en/insights/publications/2024/03/alerts-technology-hltc-my-health-my-data-act-mhmda)
- **Litigation:**
  - The first MHMDA class action was *Maxwell v. Amazon* (W.D. Wash., No. 2:25-cv-00261, filed 10 Feb 2025), about SDK location harvesting. It was later consolidated as the Amazon Ads SDK Litigation and is in early motion practice with no merits ruling.
  - A second suit targets Seattle cannabis retailer Uncle Ike's over website tracking.
  - The known MHMDA cases target website and app tracking.
  — [WilmerHale](https://www.wilmerhale.com/en/insights/blogs/wilmerhale-privacy-and-cybersecurity-law/20250220-first-lawsuit-filed-under-washingtons-my-health-my-data-act); [Washington State Standard](https://washingtonstatestandard.com/2025/02/21/lawsuit-against-amazon-provides-first-test-of-was-health-data-privacy-law/); [Enzuzo](https://www.enzuzo.com/blog/washington-mhmda) (secondary)

**Nevada SB 370, Connecticut and others**
- The consumer-health-data privacy policy duty applies to both the WA MHMDA and Nevada SB 370. — [repo legal reference](/home/user/solo-hq/.claude/skills/legal-pages/reference.md)
- **[bg] Nevada SB 370:** effective 31 March 2024. It is modelled on MHMDA (consent to collect and share, authorization to sell, a 1,750-ft geofence ban) but has **no private right of action**; the AG enforces it. — [Nevada Legislature SB 370](https://www.leg.state.nv.us/App/NELIS/REL/82nd2023/Bill/10448/Overview)
- **[bg] Connecticut SB 3 (2023):** amended the CTDPA with effect from 1 July 2023. It added "consumer health data" as sensitive data (opt-in consent), banned geofences within 1,750 ft of mental, reproductive or sexual health facilities, and made consumer-health-data duties apply to **any** person regardless of CTDPA thresholds. The AG enforces it. — [CT SB 3 PA 23-56](https://www.cga.ct.gov/2023/ACT/PA/PDF/2023PA-00056-R00SB-00003-PA.PDF)

**Maryland MODPA**
- Effective 1 Oct 2025; enforcement began 1 April 2026.
- It bans the **sale of sensitive data outright**, even with consent. Sensitive data may be collected or processed only when "strictly necessary" to provide the requested service.
- Its consumer health data definition covers any health "status".
- Violations are unfair or deceptive trade practices, enforced by the AG.
— [Koley Jessen](https://www.koleyjessen.com/insights/publications/maryland-online-data-privacy-act); [Osano](https://www.osano.com/articles/maryland-online-data-privacy-act-modpa); [OneTrust](https://www.onetrust.com/blog/marylands-online-data-privacy-act-modpa-key-rules-and-requirements/)

**New York NYHIPA**
- The original bill passed in Jan 2025. Gov. Hochul vetoed it in Dec 2025, citing overly broad definitions and scope. — [HIPAA Journal](https://www.hipaajournal.com/new-york-health-information-privacy-act/); [Inside Privacy](https://www.insideprivacy.com/health-privacy/new-york-governor-vetoes-restrictive-health-privacy-law/); [Healthcare Brew](https://www.healthcare-brew.com/stories/2026/01/12/new-york-governor-vetoes-health-data-privacy-bill)
- The revised S9269 (2026) is narrower. It adds exemptions for data already regulated by federal and state law, exempts government, and protects only health data collected while the person is in NY. The Senate passed it on 3 June 2026 and the Assembly on 4 June 2026. — [NYS Focus](https://nysfocus.com/2026/03/26/health-data-bill-abortion-digital-surveillance); [NYC Bar](https://www.nycbar.org/reports/support-revised-ny-health-information-privacy-act-2026/)
- Industry groups (the AAF, in a 23 June 2026 letter) urged a veto. — [AAF letter](https://www.aaf.org/Public/Education-and-Resources/Government-Affairs-Policy/Legislative-Comments-and-Testimony/2026/Articles/Opp-Letter-NY-A10357-S9269-Veto.aspx)
- As of the latest sources found (mid-July 2026), it had not been signed.

**California reproductive-data laws**
- **AB 254** (signed 27 Sept 2023) amends the CMIA. Any business offering a "reproductive or sexual health digital service" is treated as a health care provider under the CMIA. That is an app or **website** that:
  1. collects reproductive or sexual health application information from a consumer;
  2. markets itself as facilitating reproductive or sexual health services; and
  3. uses the information to facilitate those services.
  The CMIA bars disclosure, and use for marketing, without authorization, backed by penalties and a private right of action. — [ArentFox Schiff](https://www.afslaw.com/perspectives/health-care-counsel-blog/california-adopts-privacy-protections-digital-reproductive); [Covington](https://www.covingtondigitalhealth.com/2023/10/california-enacts-amendments-to-the-cmia/); [CalMatters Digital Democracy](https://calmatters.digitaldemocracy.org/bills/ca_202320240ab254)
- **AB 352** requires businesses that store medical information electronically to segregate and restrict access to data on abortion, contraception and gender-affirming care. It bars sharing through an EHR/HIE with out-of-state persons where the data could identify someone seeking legal abortion. Enforcement began 31 Jan 2026. It mainly affects providers and EHR vendors. — [Troutman](https://www.troutman.com/insights/New-California-Law-Imposes-Significant-Data-Management-Requirements-for-Sensitive-Health-Data/); [NatLawReview](https://natlawreview.com/article/californias-new-reproductive-privacy-laws-ab-352-and-ab-254-create-complexities)
- **California AB 45** (effective 1 Jan 2026) outlaws geofencing around health care facilities for ad targeting. — search summary of [4As Health](https://4ashealth.org/2026/09/09/the-evolving-landscape-of-u-s-health-data-privacy-2025-2026/) (page blocked, not verified first-hand)
- **Virginia SB 338** (effective 1 July 2026) bans the commercial sale of precise geolocation data. — same source, not verified first-hand

**Shield laws**
- **[bg]** More than 15 states (including CA, NY, WA, MA, IL, CO, CT, NJ, OR, VT and MD) have reproductive-health "shield" laws. These limit in-state cooperation, subpoena compliance and extradition in out-of-state investigations of legally protected reproductive care, and some bind companies headquartered or incorporated in the state. Many focus on abortion and gender-affirming care, and few name IVF expressly.
- **[bg]** After the Alabama Supreme Court's Feb 2024 *LePage* decision (frozen embryos treated as "children" under the wrongful-death act), IVF-specific legal risk is real in some states.
- No primary source for either point was fetched this session.

### Inferences
- The wizard's answers (family type, which can imply sexual orientation such as same-sex couples; age; treatment needs such as donor eggs, surrogacy or ICSI) are "consumer health data" under MHMDA and NV/CT. They are also "sensitive data" under comprehensive state laws. Even visiting a clinic-comparison page could be an inference of health status under MHMDA.
- Under MHMDA, CairnFertility needs:
  - opt-in consent **before** collecting wizard, calculator or signup answers beyond what is "necessary to provide the requested product" (running a calculation the user asked for is arguably "necessary", but storing or sharing it is not);
  - separate consent to share, for example sending a lead to a clinic;
  - never selling the data;
  - a separate CHD privacy policy link on the homepage.
- California AB 254 is a live risk. "Markets itself as facilitating reproductive health services" plus using wizard inputs to match users to clinics could fit the definition. If CairnFertility is inside it, CMIA authorization is required for any disclosure and there is a private right of action.
- The safest design is to run the calculator and wizard **entirely client-side** with no server persistence. The server should receive only an explicit "send my details to Clinic X" submission made with consent.

### Gaps
- Final outcome of NY S9269: signed or vetoed after July 2026 — not found.
- I did not verify the WA AG FAQ first-hand (site blocked).
- Any additional 2025–26 state consumer-health-data statutes beyond WA, NV, CT, MD and NY: the search did not surface a full list. **[bg]** Some 2025 bills (for example in Vermont) were reportedly considered; not verified.

---

## 4. Comprehensive state privacy laws: sensitive-data opt-in, thresholds, GPC and universal opt-out

### Takeaway
About 20 states have comprehensive privacy laws in effect in 2026; Indiana, Kentucky and Rhode Island took effect on 1 Jan 2026. Nearly all treat health data, sex life and sexual orientation as **sensitive**. That means **opt-in consent** everywhere except California, where the rule is a "limit use" right. Most also require data protection assessments.

Thresholds are usually around 100k consumers, or 25k–35k plus revenue from data sales. A new US launch may fall below them in many states, but not in all: **Texas and Nebraska** use a "not a small business" test, and **Maryland** uses 35k. The CCPA also has a revenue threshold.

At least 11–12 states require honouring **Global Privacy Control** (GPC).

### Cited Findings
- Indiana, Kentucky and Rhode Island took effect on 1 Jan 2026. Each requires privacy notices, opt-in for sensitive data and DPIAs, and each mandates GPC recognition and data minimisation. — [Koley Jessen](https://www.koleyjessen.com/insights/publications/new-state-privacy-laws-effective-january-1-2026-indiana-kentucky-and-rhode-island)
- About 20 state privacy laws are in effect in 2026. — [MultiState](https://www.multistate.us/insider/2026/2/4/all-of-the-comprehensive-privacy-laws-that-take-effect-in-2026)
- Mid-2026 amendments tightened sensitive-data, minors and precise-geolocation rules, and added bans on some sales and limits on profiling. — [Venable 2026 mid-year update](https://www.venable.com/insights/publications/2026/07/2026-mid-year-state-privacy-law-update) (search summary only; page blocked); [Privacy World, Aug 2026](https://www.privacyworld.blog/2026/08/adding-to-the-count-the-latest-in-state-consumer-privacy-laws/)
- 11 or more states require recognition of GPC. — search summary of [Osano](https://www.osano.com/us-data-privacy-laws) / [Enzuzo tracker](https://www.enzuzo.com/blog/us-state-privacy-laws). The repo legal reference says "mandatory in 12+ states by 2026" ([reference.md](/home/user/solo-hq/.claude/skills/legal-pages/reference.md)).
- **[bg] CCPA/CPRA:**
  - Applies to for-profit businesses doing business in CA with more than ~$26.6M gross revenue (inflation-adjusted from $25M), **or** that buy, sell or share personal information of 100k+ consumers, **or** that make 50%+ of revenue from selling or sharing.
  - Health information, sex life and sexual orientation are "sensitive personal information", which carries a "Limit the Use" right. Honouring GPC is required by regulation (see the Sephora 2022 and Honda/Todd Snyder 2025 enforcement).
  - Behavioural-advertising pixels count as "sharing".
  - CPPA regulations on risk assessments, cybersecurity audits and automated decision-making were finalised in 2025, with phased effective dates from 2026.
  — [CPPA regulations](https://cppa.ca.gov/regulations/)
- **[bg]** Texas TDPSA applies to any business that is not an SBA small business, and **sale of sensitive data requires a specific notice**. Nebraska is similar.

### Inferences
- Even where a threshold is not met, applying opt-in consent for all health and sexual-orientation-revealing inputs, honouring GPC as a full opt-out of any sale, sharing or targeted advertising, and publishing state-rights request mechanisms costs little. It also covers the MHMDA/CT regimes, which have no thresholds.
- Treat "family type" answers (such as two mothers or a single father via surrogacy) as sexual-orientation / sex-life sensitive data.

### Gaps
- I did not produce a verified state-by-state threshold and GPC table; the source pages were blocked. Recommend the IAPP US State Privacy Legislation Tracker for the final table.
- I did not verify the exact 2026 CCPA revenue threshold figure.

---

## 5. Tracking-pixel and session-replay litigation (VPPA, CIPA, Meta Pixel) and safe analytics

### Takeaway
Wiretap-style claims under CIPA §631/§632 over pixels and SDKs on health properties are the highest-dollar private exposure.

In *Frasco v. Flo Health* (N.D. Cal.) a jury found **Meta** liable under CIPA in Aug 2025 for intercepting menstrual and ovulation data through the Flo app SDK. Statutory damages are $5,000 per violation, the class is about 1.4–1.6M Californians, and post-trial motions were denied in Sept 2025. Flo itself settled.

California SB 690 cleared the legislature in Sept 2026, but only in a narrowed form. It limits private suits under §638.51 (pen-register/trap-and-trace) for website conduct and leaves §631/§632 wiretap claims untouched.

The VPPA risk is low for a site with no video. The safe choice is first-party, cookieless, self-hosted analytics with no third-party pixels, no session replay on health-flow pages, and no ad-platform conversion APIs.

### Cited Findings
- In Aug 2025 a jury found Meta violated CIPA by eavesdropping on Flo app users' menstrual and ovulation data without consent. — [Lawdragon](https://www.lawdragon.com/news-features/2025-08-25-big-tech-on-trial-jury-finds-meta-liable-for-misusing-women-health-data); [Burr & Forman](https://www.burr.com/newsroom/articles/jury-found-meta-liable-in-flo-privacy-case-what-to-do-if-your-website-or-app-collects-user-health-data); [Bloomberg Law](https://news.bloomberglaw.com/litigation/metas-health-privacy-trial-loss-spotlights-power-of-wiretapping)
- CIPA damages are $5,000 per violation. The estimated 1.4–1.6M class implies more than $7–8B of theoretical exposure. On 15 Sept 2025 Judge Donato denied Meta's motions for decertification, JMOL and a new trial. — [Richt Law](https://richtfirm.com/meta-loses-post-trial-bid-in-landmark-cipa-case-involving-flo-health-app/); [CompliancePoint](https://www.compliancepoint.com/privacy/jury-rules-meta-violated-california-privacy-law-by-collecting-health-data/)
- A $59.5M settlement has been reported involving Flo Health (other defendants). — [OpenClassActions](https://openclassactions.com/news/flo-health-app-privacy-lawsuit.php) (aggregator; lower confidence)
- **SB 690:**
  - The July 2 2026 amendments dropped the broad "commercial business purpose" exemption.
  - The version passed by the legislature only restricts §638.51 pen-register/trap-and-trace claims arising from website conduct to AG enforcement.
  - §631 and §632 are untouched, and those sections carry the bulk of website-tracking suits.
  — [Sidley, Sept 2026](https://www.sidley.com/en/insights/newsupdates/2026/09/californias-sb-690-clears-the-legislature-what-it-means-for-cipa-website-tracking-claims); [Spencer Fane](https://www.spencerfane.com/insight/sb-690-passed-the-legislature-what-does-that-mean-for-pending-cipa-website-tracking-cases/); [NatLawReview](https://natlawreview.com/article/senate-bill-690-amended-california-scales-back-its-proposed-cipa-overhaul); [Skadden, June 2026](https://www.skadden.com/insights/publications/2026/06/cipa-is-still-a-mess)
- At the time of these sources SB 690 had passed the legislature. Whether the Governor signed it (deadline late Sept/Oct 2026) was not confirmed.
- MHMDA suits (Amazon SDK, Uncle Ike's) are also tracking-based. — [WilmerHale](https://www.wilmerhale.com/en/insights/blogs/wilmerhale-privacy-and-cybersecurity-law/20250220-first-lawsuit-filed-under-washingtons-my-health-my-data-act)
- **[bg]** The VPPA applies to "video tape service providers", meaning those delivering prerecorded video. Circuits split over who counts as a "consumer" (2nd Cir. *Salazar v. NBA* broad; 6th Cir. *Salazar v. Paramount* narrow; 2nd Cir. *Solomon v. Flipps* 2025 applied an "ordinary person" standard to PII). It is relevant only if CairnFertility embeds its own video with a Meta pixel.

### Inferences
Safe analytics stack for health pages:
- Server-side, first-party, cookieless, aggregate-only analytics: self-hosted Plausible or Umami, or Vercel Web Analytics, which uses no cookies and hashes visitors daily (verify its current docs).
- Strip query strings and wizard answers from page URLs and events.
- No Meta, TikTok, Google Ads or LinkedIn pixels or CAPI anywhere a health signal exists. Arguably none sitewide, because MHMDA treats a visit to an IVF page as health inference.
- No session replay (Hotjar, FullStory, Clarity, LogRocket) on the wizard, calculator or forms. Session replay is a classic §631 target.
- No third-party chat widgets on health flows.
- Embed video only via privacy-enhanced modes (youtube-nocookie) behind click-to-load, or self-host it.
- Fonts: self-host rather than Google Fonts CDN (IP disclosure; also a German GDPR precedent).

### Gaps
- Final damages figure in *Frasco v. Flo* against Meta (2026) — not found.
- Whether the Governor signed SB 690 — not found.

---

## 6. Law-enforcement access risk to reproductive and fertility data, and mitigations

### Takeaway
With the HIPAA reproductive rule vacated, nothing federal stops subpoenas or warrants for non-HIPAA consumer data. CairnFertility would be an ordinary online service subject to state grand-jury subpoenas, civil discovery and warrants, including geofence and keyword warrants. IVF is not currently criminalised, but embryo-personhood reasoning (Alabama *LePage*, 2024 **[bg]**) and the proximity of fertility data to pregnancy and abortion inference make **minimisation** the only robust defence. The principle is to hold no data that ties an identity to a treatment choice.

### Cited Findings
- The vacatur removed the rule's ban on using or disclosing PHI to investigate or prosecute people over lawful reproductive care, and removed the attestation requirement. — [Epstein Becker Green](https://www.workforcebulletin.com/all-is-not-lost-as-the-sun-sets-on-the-hipaa-reproductive-health-rule); [Health Law Diagnosis](https://www.healthlawdiagnosis.com/2025/09/appeals-dropped-of-decision-vacating-hipaa-reproductive-health-privacy-rule-confirming-apparent-end-of-the-rule-and-attestation-requirement/)
- California AB 352 bars covered entities from cooperating with out-of-state abortion inquiries through EHR/HIE sharing. This is an example of shield-style data rules, but it binds providers and EHR vendors, not a comparison site. — [Troutman](https://www.troutman.com/insights/New-California-Law-Imposes-Significant-Data-Management-Requirements-for-Sensitive-Health-Data/)
- Geofence bans (WA, NV, CT, CA AB 45) limit location-based targeting around clinics. — [Censinet](https://www.censinet.com/perspectives/washington-my-health-my-data-act-key-requirements)
- **[bg]** Warrant canaries have no firm legal footing: courts have not ruled whether the government can compel a false canary. They are a signalling tool rather than a legal shield. Transparency reports (in the style of the EFF "Who Has Your Back") are the norm for credible privacy-first services.

### Inferences
Mitigations, in rough order of value:
1. **Don't collect.** Compute the wizard and calculator client-side, and put results in the URL fragment or local state only, never on the server.
2. **Separate identity from health.** Waitlist signups hold only an email and a coarse region: no answers, no family type, no age. Community applications should minimise free text and warn users not to include health details.
3. **Short retention.** Auto-delete applications after the decision plus N days. Purge Upstash rate-limit keys through TTL (minutes). Keep Vercel and Supabase logs at minimum retention, with no request bodies logged.
4. **Don't store IP addresses** alongside form submissions; rate-limit on a salted, rotating hash.
5. **Encrypt at rest** with application-level encryption for any sensitive column (pgsodium/Vault, or KMS envelope encryption) so a database dump is useless without keys.
6. **Legal-process policy:** require a warrant or court order, notify users unless gagged, challenge overbroad requests, and publish an annual transparency report. A warrant canary is optional.
7. No location collection, no IP geolocation beyond country, and no geofencing.
8. No account system for health profiles, or if one is built, local-first/E2E storage (keys held client-side).
9. Choose US-hosted processors (Vercel, Supabase) with published law-enforcement guidelines. Note that US processors are themselves subject to US legal process, which is a reason to store nothing sensitive at all.

### Gaps
- There is no cited, verified case of IVF-related data being subpoenaed from a consumer site. Risk is inferred from the abortion-data context (e.g. the 2022 Meta/Nebraska messages case **[bg]**).
- I did not verify a current list of state shield laws that cover IVF or "reproductive health care" broadly.

---

## 7. Data residency and cross-border transfers: UK company handling US data, UK GDPR interplay and the DOJ bulk data rule

### Takeaway
No general US data-localisation law stops a UK company from processing US residents' data in the UK or US. The **DOJ Data Security Program** (28 CFR Part 202, under EO 14117) restricts only transactions giving **countries of concern** access to bulk US sensitive data. Those countries are China (including Hong Kong and Macau), Cuba, Iran, North Korea, Russia and Venezuela. For health data, "bulk" means more than **10,000 US persons**, and the rule applies even if data is de-identified or encrypted. The UK is **not** a country of concern. The risk comes from subprocessors, vendors or employees linked to those countries: the Premom case involved data flowing to China-based firms.

Separately, as a UK controller CairnFertility's processing of US users' data is within **UK GDPR** scope (Art. 3(1), establishment), including Art. 9 special-category rules. That means UK GDPR's high bar applies to US data too.

### Cited Findings
- The DSP rule implements EO 14117. The DOJ issued compliance guidance on 11 April 2025. — [White & Case](https://www.whitecase.com/insight-alert/doj-issues-guidance-bulk-sensitive-data-rules); [DOJ NSD Data Security](https://www.justice.gov/nsd/data-security)
- Countries of concern: China (including Hong Kong and Macau), Cuba, Iran, North Korea, Russia and Venezuela, plus "covered persons" they control. There are six sensitive-data categories: omic, biometric, precise geolocation, personal health, personal financial and covered personal identifiers. Personal health data on more than 10,000 US persons counts as bulk. — [Cooley](https://cdp.cooley.com/understanding-and-complying-with-the-dojs-bulk-data-rule/); [Jackson Lewis](https://www.jacksonlewis.com/insights/doj-bulk-data-transfer-rule-are-you-subject-it-and-what-does-it-require)
- The thresholds apply whether data is anonymised, pseudonymised, de-identified or encrypted. — [Jackson Lewis](https://www.jacksonlewis.com/insights/doj-bulk-data-transfer-rule-are-you-subject-it-and-what-does-it-require)
- **[bg]** DSP timing and scope:
  - The rule took effect on 8 April 2025.
  - Due-diligence, audit and reporting obligations for restricted transactions started on 6 Oct 2025.
  - Prohibited transactions include data brokerage with countries of concern or covered persons, **and** data brokerage with any foreign person unless the contract bars onward transfer to countries of concern.
  - Vendor, employment and investment agreements with covered persons are "restricted" transactions subject to CISA security requirements.
  — [EBG road map](https://www.ebglaw.com/insights/publications/dojs-final-rule-on-bulk-data-transfers-a-road-map)
- **[bg]** The Protecting Americans' Data from Foreign Adversaries Act of 2024 (PADFA) bars data brokers from transferring sensitive data, including health data, to foreign-adversary countries or entities they control. The FTC enforces it. — [FTC PADFA page](https://www.ftc.gov/legal-library/browse/statutes/protecting-americans-data-foreign-adversaries-act-2024)
- **[bg]** For transfers from the UK to US processors, the UK Extension to the EU-US Data Privacy Framework (the "UK-US data bridge", in effect since 12 Oct 2023) or the IDTA/Addendum applies. The repo reference already flags DPF/SCCs for Vercel. — [reference.md](/home/user/solo-hq/.claude/skills/legal-pages/reference.md); [ICO](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/)

### Inferences
- CairnFertility is well under the 10k-person bulk threshold, and it does not sell data. Even so, it should:
  - keep its subprocessor list free of vendors headquartered or controlled in countries of concern (check analytics, email, support and dev contractors);
  - add an onward-transfer ban to vendor DPAs;
  - avoid offshore dev contractors with production access in those countries.
- Recommend hosting US data in a US region (Supabase us-east, Vercel iad1, Upstash US). Nothing requires this, but it simplifies US-law analysis and user trust. It also avoids routing US data through the UK. That UK routing would not itself be restricted, though UK GDPR applies regardless because the controller is UK-established.
- UK GDPR Art. 9 already requires explicit consent for health and sex-life data. Designing to that standard satisfies most US opt-in rules at the same time.

### Gaps
- I did not verify whether any 2026 amendments or FAQs to the DSP changed thresholds or the country list.
- I did not check each current subprocessor's corporate ownership.

---

## 8. Accessibility: ADA Title III web litigation and WCAG expectations

### Takeaway
ADA Title III website suits keep rising: about 3,117 federal filings in 2025 (up 27%) and more than 5,000 including state courts. NY, FL, CA and IL lead. There is no DOJ Title III web regulation. Courts and settlements benchmark **WCAG 2.1 AA**, and **WCAG 2.2 AA** is best practice (the repo reference also targets 2.2 AA). A UK company serving US consumers online can be sued, especially in NY and CA, where state law (Unruh Act damages of $4,000 per violation **[bg]**) adds exposure.

### Cited Findings
- 3,117 federal web-accessibility Title III suits in 2025, up 27% on 2024 and the second-highest year on record. More than 5,000 including state courts. — [Level Access](https://www.levelaccess.com/blog/2024-u-s-web-accessibility-litigation-key-trends-and-strategies-for-mitigating-risk/); [ADA QuickScan](https://adaquickscan.com/blog/ada-website-accessibility-lawsuit-news-today-2025) (secondary)
- First half of 2025: 2,014 cases, up 37%. — [EcomBack mid-year 2025](https://www.ecomback.com/ada-website-lawsuits-recap-report/2025-mid-year-ada-website-lawsuit-report); [UsableNet 2025 midyear](https://info.usablenet.com/hubfs/2025-MidYear-Report-FINAL.pdf?hsLang=en)
- Leading states: NY (637), FL (487), CA (380), IL (237). Courts reference WCAG 2.1 AA, and 2.2 AA is best practice. — search summary of [Level Access](https://www.levelaccess.com/blog/2024-u-s-web-accessibility-litigation-key-trends-and-strategies-for-mitigating-risk/)
- **[bg]** DOJ's April 2024 Title II rule (state and local government) adopted WCAG 2.1 AA, with compliance from April 2026/2027. It does not bind private sites but signals the standard DOJ considers adequate. — [DOJ ADA.gov web rule](https://www.ada.gov/resources/2024-03-08-web-rule/)

### Inferences
- Priority areas: the wizard and calculator (keyboard operability, focus management between steps, error identification, accessible sliders and inputs), forms (labels, errors, no CAPTCHA without an accessible alternative, relevant if bot protection is added around Upstash rate limits), colour contrast of the Cairn tokens, and reduced-motion support.
- Avoid accessibility "overlay" widgets. Plaintiffs' firms cite them, and some suits target sites that use them.

### Gaps
- No 2026 year-to-date filing count was found.

---

## 9. Practical hardening checklist for the US launch (synthesis)

### Takeaway
The posture that satisfies MHMDA, NV, CT, MD, CCPA, FTC and UK GDPR at once is: **no third-party trackers, client-side computation of health inputs, separate opt-in consent for anything stored or shared, never sell, minimal retention, and a separate Consumer Health Data Privacy Policy.** Each item below is linked to the law that drives it in §§1–8.

### Cited Findings
- MHMDA consent to collect and share, authorization to sell, the separate homepage CHD policy link and the 2,000-ft geofence ban. — [ZwillGen](https://www.zwillgen.com/privacy/washington-mhmda-updated-guidance-health-data-privacy-policy-requirements/); [Censinet](https://www.censinet.com/perspectives/washington-my-health-my-data-act-key-requirements)
- MODPA's ban on selling sensitive data and its "strictly necessary" standard. — [Osano](https://www.osano.com/articles/maryland-online-data-privacy-act-modpa)
- GPC mandated in at least 11–12 states. — [Koley Jessen](https://www.koleyjessen.com/insights/publications/new-state-privacy-laws-effective-january-1-2026-indiana-kentucky-and-rhode-island)
- HBNR treats unauthorised disclosure as a breach, with notice to the FTC and users. — [FTC guide](https://www.ftc.gov/business-guidance/resources/complying-ftcs-health-breach-notification-rule-0)
- CIPA pixel liability (Flo/Meta verdict). — [Burr & Forman](https://www.burr.com/newsroom/articles/jury-found-meta-liable-in-flo-privacy-case-what-to-do-if-your-website-or-app-collects-user-health-data)

### Inferences (checklist)

**Data collection and flows**
1. Run the cost calculator and "get started" wizard entirely in the browser. Send no answers to the server, logs, analytics or URLs: use state or the URL fragment, not query strings.
2. Where answers must be stored or sent (for example "email me my results" or "connect me with Clinic X"), use unticked opt-in consent specific to that purpose, recipient and data. Keep this separate from the ToS/privacy acceptance, and record timestamp, policy version and consent text hash.
3. The waitlist holds email plus coarse country/state only. Keep it separate from any health answers, and use double opt-in.
4. Community applications: minimise fields, add a "don't include medical details" notice, delete within a fixed period after the decision, and restrict access.
5. Never sell or "share" (CCPA cross-context ads) data, and say so. No data brokers, no lead-gen resale, and no clinic lead payments tied to identifiable health data without MHMDA-grade consent. Consider flat-fee listings instead of per-lead fees.

**Tracking**
6. No third-party ad pixels, CAPI, session replay or third-party chat on any page. Use first-party, cookieless, aggregate analytics with IP truncation and no custom events carrying answers.
7. Honour GPC server-side, via a `Sec-GPC` header check in Next.js middleware, and show "GPC honoured" status. Provide "Your Privacy Choices" and "Limit Use of Sensitive PI" links even if they are functionally no-ops.
8. Self-host fonts and assets. Add a strict CSP that allows only self and required API origins, so an injected tracker cannot load.

**Security**
9. Supabase: RLS on every table; the service-role key only in server code; column-level encryption for any stored sensitive field; PITR and backups with a defined retention; MFA and SSO on the dashboard; network restrictions; audit logs.
10. Vercel: minimum log retention with no request-body logging; protected preview deployments; secrets only in encrypted env vars; SSO/MFA on the team; WAF/bot protection on form routes.
11. Upstash: key rate limits by a salted, rotating hash of the IP, never the raw IP; short TTLs; no PII in keys.
12. Standard web hardening: HSTS with preload, TLS 1.2+, security headers (CSP, frame-ancestors, Referrer-Policy `strict-origin` or `no-referrer` so health URLs don't leak, Permissions-Policy denying geolocation, camera and microphone), dependency and secret scanning, and SAST in CI.
13. Maintain an incident-response plan covering HBNR (60 days to users/FTC, media if 500+ in a state), state breach laws (50 states), and UK GDPR (72 hours to the ICO).

**Governance**
14. A US privacy notice plus a **separate Consumer Health Data Privacy Policy** (WA/NV/CT), with a distinct homepage link. Publish a state-rights request process (access, delete, correct, appeal) that verifies identity with minimal data. Deletion must propagate to processors.
15. Data protection assessments (required by most state laws for sensitive data) and a UK GDPR DPIA.
16. A subprocessor register with DPAs. Screen out countries-of-concern vendors (DOJ DSP) and add onward-transfer bans.
17. A legal-process policy (warrant required, user notice, challenge overbroad requests), an annual transparency report, and optionally a warrant canary.
18. Geography: no geolocation beyond country/state, no geofencing, and no location-based ads near clinics.
19. Accessibility: WCAG 2.2 AA audit of the wizard, calculator and forms before launch, plus an accessibility statement (US and UK).
20. Keep HIPAA out of scope: no clinic intake or booking on a clinic's behalf. If that is ever needed, sign BAAs and upgrade vendors to HIPAA tiers.
21. Marketing: no health-based audience targeting or retargeting. Any ads must be contextual only, with no hashed-email uploads of waitlist users to ad platforms (FTC hashing warning).

### Gaps
- None of these steps has been checked against a US lawyer's advice. Recommend review by US privacy counsel (with WA MHMDA and CA CMIA expertise) before launch, particularly on whether AB 254 applies and whether clinic referral fees count as a "sale".
