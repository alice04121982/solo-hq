/**
 * Legal page content.
 *
 * Every statement in this file is a representation CairnFertility can be
 * held to (regulators enforce against policies that don't match actual
 * behaviour — see FTC v. Flo Health). So the rule for editing this file is:
 * describe what the codebase actually does, and when the codebase changes
 * (analytics added, a waitlist wired up, an API route created), update the
 * relevant sections here in the same pull request.
 *
 * Current facts these pages are written against (verify before editing):
 * - No user accounts, no payments.
 * - No cookies, no analytics, no advertising or tracking of any kind.
 * - The waitlist form (/waitlist) is wired up: submitting it sends your
 *   email address to a single Supabase table via one API route
 *   (POST /api/waitlist), solely so we can email you when the community
 *   feature opens. The table has row-level security enabled and no
 *   read policy, so the list cannot be queried back out over the public
 *   API — only inserted into. See src/app/api/waitlist/route.ts and
 *   src/lib/supabase-server.ts.
 * - The location search sends browser geolocation coordinates to
 *   api.postcodes.io (Ideal Postcodes, UK) to resolve a postcode; we never
 *   see or store the coordinates ourselves.
 * - The clinic matcher's answers (family type, age, medical history, budget)
 *   are held in browser memory only and never transmitted or stored.
 * - The share-your-story form (/stories/share) drafts an email entirely in
 *   the browser; nothing is transmitted unless the reader sends it from
 *   their own email app. There is no submission backend.
 * - Hosting is Vercel; their edge network processes IP addresses in
 *   standard server logs.
 *
 * - The site is published by an individual, not a registered company, and
 *   takes no payments. The Companies Act 2006 website-disclosure duties bite
 *   on companies once trading, so they do not apply yet; if CairnFertility is
 *   ever incorporated, add the registered name, company number and office
 *   address to the privacy and contact pages in the same pull request.
 *
 * TODO before production launch (cannot be invented by an editor):
 * - ICO registration reference, if/when registration applies. (Check the
 *   ICO's own self-assessment: a site with no analytics, no ads and one
 *   waitlist may fall outside the fee entirely.)
 * - The three addresses in CONTACT_EMAILS must be live and forwarding before
 *   these pages are pointed at a public domain.
 */

export interface LegalDefinition {
  term: string;
  description: string;
}

export interface LegalSection {
  heading: string;
  body?: string[];
  bullets?: string[];
  postBody?: string[];
  definitions?: LegalDefinition[];
  callout?: string;
}

export interface LegalPage {
  slug: string;
  label: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  standfirst: string;
  effectiveDate: string;
  sections: LegalSection[];
}

/**
 * Public inboxes, by purpose.
 *
 * All three are aliases forwarding to one mailbox; the split exists so a
 * reader can see where a data request goes as against a story submission,
 * and so they can be routed separately later without rewriting the legal
 * pages. Keep every address here in step with the forwarding rules actually
 * configured on the domain — a published address that bounces is worse than
 * no address at all.
 *
 * cairnfertility.co.uk is held as a defensive registration and redirects
 * here, so addresses on it should forward to the same mailbox rather than
 * being published anywhere.
 */
export const CONTACT_EMAILS = {
  /** General enquiries, corrections, accessibility reports, complaints. */
  general: "hello@cairnfertility.com",
  /** Data protection requests and anything about the privacy policy. */
  privacy: "privacy@cairnfertility.com",
  /** Story and quote submissions from the community. */
  stories: "stories@cairnfertility.com",
} as const;

/** The address shown as the site's primary point of contact. */
export const LEGAL_CONTACT_EMAIL = CONTACT_EMAILS.general;

const EFFECTIVE_DATE = "24 August 2026";

/* ─── Privacy Policy ──────────────────────────────────────────────────────── */

const PRIVACY: LegalPage = {
  slug: "privacy",
  label: "Privacy Policy",
  title: "Privacy Policy",
  metaTitle: "Privacy Policy | CairnFertility",
  metaDescription:
    "How CairnFertility handles personal data: what little we collect, what never leaves your browser, and the rights you have over your information.",
  standfirst:
    "Fertility is among the most personal subjects there is, so we built this site to know as little about you as possible. This policy explains exactly what that means in practice.",
  effectiveDate: EFFECTIVE_DATE,
  sections: [
    {
      heading: "The short version",
      body: [
        "CairnFertility is an information and comparison site. You do not need an account to use it, and we have deliberately built it without the machinery that usually collects personal data.",
      ],
      bullets: [
        "We set no cookies and run no analytics, advertising, or tracking of any kind.",
        "We have no user accounts and we take no payments. The one thing we do store is your email address, and only if you choose to join our waitlist.",
        "Your answers in our clinic matching tool — including anything about your health — are processed entirely within your own browser. They are never sent to us or to anyone else.",
        "If you use the location search, your coordinates go to one UK postcode-lookup service, with your permission, and are not stored by us.",
        "We never sell personal data, and we never share it for advertising. There are no exceptions to this.",
      ],
      postBody: [
        "The rest of this policy sets out the detail, because you should not have to take a summary on trust.",
      ],
    },
    {
      heading: "Who we are",
      body: [
        "CairnFertility is a UK-based information service that helps people compare IVF clinics and understand fertility treatment. It is published by an independent individual rather than a registered company, and that person is the \"controller\" of the small amount of personal data described in this policy — meaning they decide how and why it is used. If CairnFertility is ever incorporated, we will publish the company's registered details on our [contact page](/contact) and update this policy first.",
        "For anything about this policy or your personal data, email [privacy@cairnfertility.com](mailto:privacy@cairnfertility.com). For anything else, [hello@cairnfertility.com](mailto:hello@cairnfertility.com) reaches us.",
      ],
    },
    {
      heading: "What we collect — and what we deliberately don't",
      body: [
        "Most of this site is plain reading material, and reading it sends us nothing beyond the standard technical information any website receives. Here is every way personal data can arise on this site today:",
      ],
      definitions: [
        {
          term: "Email you send us",
          description:
            "If you email us, we receive your address and whatever you choose to write. We use it only to reply and to keep a record of the correspondence. Please don't include medical details in an email — we are not a medical service and don't need them.",
        },
        {
          term: "The share-your-story form",
          description:
            "Our story form works the same way as writing to us directly: what you type stays in your browser while you draft, and is only sent — by you, from your own email app — when you choose to send it. We have no submission backend, so we cannot see drafts, and an unsent story never reaches us. Stories are published only after we have agreed the final text with you by email, and you can withdraw a story at any time.",
        },
        {
          term: "Joining the waitlist",
          description:
            "If you submit your email on our waitlist page, it is stored, together with the date you joined, in a database hosted by Supabase (in the EU) so we can email you once when the community feature opens. We don't add you to any other list, and this database cannot be browsed or searched back out over the public website — only new emails can be added to it. See 'Who we share data with' below for Supabase's role.",
        },
        {
          term: "Location search (optional)",
          description:
            "If you choose to use \"find clinics near me\", your browser asks your permission first. With it, your device's coordinates are sent to Postcodes.io, a UK postcode-lookup service operated by Ideal Postcodes, purely to convert them into your nearest postcode. The postcode then appears in the page address so results can be shared or bookmarked. We do not store your coordinates, and we cannot see your location history.",
        },
        {
          term: "Clinic matcher answers",
          description:
            "Our matching tool asks about your family type, age range, relevant medical conditions, budget, and willingness to travel. These answers stay in your browser's memory while you use the tool and disappear when you leave the page. They are never transmitted to our servers or to any third party, and we could not retrieve them if we wanted to.",
        },
        {
          term: "Hosting logs",
          description:
            "The site is served by Vercel, our hosting provider. Like all web infrastructure, Vercel's servers process your IP address and standard request information (browser type, pages requested, timestamps) in short-lived operational logs used for security and to keep the site running. See Vercel's own [privacy policy](https://vercel.com/legal/privacy-policy) for details.",
        },
      ],
      postBody: [
        "And what we don't do: no cookies or similar tracking technologies, no analytics services, no advertising networks or pixels, no social-media trackers, no fingerprinting, no accounts, and no marketing lists beyond the single waitlist described above. We don't currently have a general newsletter; if we add one, we will update this policy first and say plainly what signing up involves.",
      ],
    },
    {
      heading: "Health information gets special treatment",
      body: [
        "Data about your health, fertility, or sex life is \"special category data\" under UK data protection law, which sets a much higher bar for handling it. Our position is simple: we designed the site so that this data never reaches us at all.",
        "The clinic matcher necessarily asks health-related questions — that is how it narrows the list of clinics — but the filtering happens on your device, in your browser, and the answers are not sent anywhere. We hold no record that you used the tool, let alone what you answered.",
        "If we ever build a feature that would require health information to leave your browser — an account that saves your progress, for example — we will ask for your explicit, specific consent before any of it is collected, explain exactly where it goes, and update this policy first. We will never treat your continued use of the site as consent for something like that.",
      ],
    },
    {
      heading: "Our legal grounds",
      body: [
        "UK data protection law (the UK GDPR and the Data Protection Act 2018) requires a lawful basis for each use of personal data. Ours are:",
      ],
      definitions: [
        {
          term: "Consent",
          description:
            "The location search runs only after you grant your browser's permission prompt, and you can refuse or revoke it at any time in your browser settings without losing access to anything else on the site. Joining the waitlist is the same: you choose to type your email and submit it, and you can withdraw that consent at any time by asking us to delete it.",
        },
        {
          term: "Legitimate interests",
          description:
            "Replying to emails you send us, and the security and operational logging our hosting provider performs to keep the site available and safe. These uses are minimal, expected, and easy to object to — contact details are below.",
        },
      ],
    },
    {
      heading: "How long we keep things",
      body: [
        "We keep email correspondence for as long as it is genuinely needed to deal with your enquiry and for a reasonable period afterwards, then delete it. Waitlist emails are kept until we either email you about the community feature opening or you ask us to remove you, whichever comes first — we don't hold them indefinitely once that purpose is served. Hosting logs are kept by Vercel on infrastructure timescales (typically days, not months) under their own retention policies.",
      ],
    },
    {
      heading: "Who we share data with",
      body: [
        "We use three service providers, and this list is exhaustive:",
      ],
      bullets: [
        "Vercel Inc. — hosts and serves the website. Vercel is a US company; where visitor data such as IP addresses is processed outside the UK, that transfer is covered by recognised safeguards including the UK Extension to the EU–US Data Privacy Framework and standard contractual clauses.",
        "Supabase Inc. — stores waitlist email addresses in a database hosted in the EU. Supabase is a US company operating EU infrastructure for this data; where any transfer outside the UK/EU occurs, it is covered by standard contractual clauses.",
        "Ideal Postcodes (Postcodes.io) — a UK service that converts coordinates to postcodes, used only when you choose the location search and grant permission.",
      ],
      postBody: [
        "We do not sell personal data, we do not share it for advertising or marketing, and we do not pass it to data brokers. Links to social platforms in our footer are ordinary links: nothing about your visit is sent to those platforms unless you click through, at which point their own policies apply.",
      ],
    },
    {
      heading: "Requests from police, courts, and other authorities",
      body: [
        "Reproductive health is an area where people rightly worry about who can demand data. Our first protection is architectural: we hold almost nothing, so there is almost nothing to hand over — no account records, no saved matcher answers, no browsing histories.",
        "If we ever receive a request from law enforcement or another authority for personal data, we will disclose only what we are legally compelled to provide under valid UK legal process, we will challenge requests that appear overbroad or improper, and we will tell the person affected unless the law prohibits us from doing so.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "You have rights over personal data we hold about you — in practice, that means email correspondence and, if you've joined it, your waitlist entry, since those are the only personal data we keep:",
      ],
      bullets: [
        "Access: ask for a copy of what we hold about you.",
        "Rectification: have inaccurate information corrected.",
        "Erasure: ask us to delete your data.",
        "Restriction and objection: limit or object to how we use it.",
        "Portability: receive your data in a reusable format.",
        "Withdraw consent: for the location search, simply change your browser's permission at any time.",
      ],
      postBody: [
        "To exercise any of these, email [privacy@cairnfertility.com](mailto:privacy@cairnfertility.com). We will respond within one month, as the law requires, and we will never charge for a reasonable request.",
        "If you are unhappy with how we have handled your data, you can complain to the UK Information Commissioner's Office at [ico.org.uk](https://ico.org.uk) or on 0303 123 1113. If you are in the EU, you may also complain to your national data protection authority.",
      ],
    },
    {
      heading: "Visitors outside the UK",
      body: [
        "This site is written for people considering fertility treatment in or from the UK, but anyone may read it. If you visit from the EU or EEA, the rights above apply to you in materially the same form under the EU GDPR.",
        "If you visit from the United States: we do not sell or share personal information as those terms are defined in state privacy laws such as the California Consumer Privacy Act, and we do not collect \"consumer health data\" as defined in laws such as Washington's My Health My Data Act — health-related answers in our tools never leave your device. Because we set no cookies and run no tracking, there is nothing to opt out of; universal opt-out signals such as Global Privacy Control are honoured by default, since the tracking they exist to switch off is not present.",
      ],
    },
    {
      heading: "Children",
      body: [
        "This site is about fertility treatment and is intended for adults. It is not directed at children, and we do not knowingly collect personal data from anyone under 18. If you believe a child has sent us personal information, contact us and we will delete it.",
      ],
    },
    {
      heading: "Changes to this policy",
      body: [
        "When the site gains a feature that changes how personal data is handled, this policy will be updated before the feature goes live, with a new effective date at the top of the page. Material changes will be flagged prominently on the site rather than changed quietly.",
      ],
      callout:
        "The promise behind this policy: this page describes what the site actually does, not what a template says. If you ever spot a difference between the two, tell us and we will fix whichever one is wrong.",
    },
  ],
};

/* ─── Terms of Service ────────────────────────────────────────────────────── */

const TERMS: LegalPage = {
  slug: "terms",
  label: "Terms of Service",
  title: "Terms of Service",
  metaTitle: "Terms of Service | CairnFertility",
  metaDescription:
    "The terms that apply when you use CairnFertility: what the service is, what our information can and cannot be relied on for, and where responsibility sits.",
  standfirst:
    "These terms are the agreement between you and CairnFertility when you use this website. We have kept them as plain as the law allows.",
  effectiveDate: EFFECTIVE_DATE,
  sections: [
    {
      heading: "Who we are and what this is",
      body: [
        "CairnFertility (\"we\", \"us\") publishes this website to help people — solo parents by choice, LGBTQ+ families, and couples — understand fertility treatment and compare IVF clinics. It is run by an independent individual in the UK, not a registered company. Contact us at [hello@cairnfertility.com](mailto:hello@cairnfertility.com).",
        "By using the site you accept these terms. If you do not accept them, please do not use the site. Nothing in these terms affects rights you have as a consumer that the law does not allow to be limited or excluded.",
      ],
    },
    {
      heading: "What the service is — and is not",
      body: [
        "This site is an editorial information and comparison service. It is currently free to use, with no accounts and no purchases. What it is not:",
      ],
      bullets: [
        "It is not medical advice, and we are not a healthcare provider. Our [medical disclaimer](/disclaimer) is part of these terms; please read it.",
        "It is not a clinic, an agent, or a broker. We have no commercial relationship with the clinics we list, you cannot book treatment through us, and appearing on this site is not an endorsement by us — nor is it an endorsement of us by any clinic or by the HFEA.",
        "It is not a substitute for a clinic's own current information. Prices, waiting times, eligibility policies, and success rates change; always confirm directly with a clinic before making decisions.",
      ],
    },
    {
      heading: "About our data and how far to trust it",
      body: [
        "We try hard to be accurate, and we are explicit about the provenance of the numbers we publish:",
      ],
      bullets: [
        "UK clinic success rates marked as HFEA-verified are drawn from data published by the Human Fertilisation and Embryology Authority, the UK regulator, at [hfea.gov.uk](https://www.hfea.gov.uk/choose-a-clinic/clinic-search/). The HFEA does not endorse this site.",
        "Figures for overseas clinics are self-reported by the clinics themselves and are not independently verified. We label them as such.",
        "Prices are indicative, move frequently, and rarely include everything you will actually pay. Treat every price on this site as a starting point for your own written quote, never as an offer.",
        "Success rates are population statistics. They vary substantially with age, diagnosis, and protocol, and no published rate is a prediction for any individual.",
      ],
      postBody: [
        "We have adopted the Competition and Markets Authority's [consumer law guidance for fertility clinics](https://www.gov.uk/cma-cases/self-funded-ivf-consumer-law-guidance) (June 2021) as our editorial standard for how prices and success rates are presented, and our [methodology](/about#methodology) explains how we apply it.",
        "Personal stories and quotes on this site are illustrative composites reflecting common experiences in the community. They are not accounts of real, identifiable patients unless expressly stated otherwise.",
      ],
    },
    {
      heading: "Using the site acceptably",
      body: ["You agree not to:"],
      bullets: [
        "use the site unlawfully, or in a way that could harm it or other users — including attempting to breach its security, scrape it at scale, or interfere with its operation;",
        "reproduce our content commercially without permission (personal, non-commercial use — printing a comparison to discuss with your clinic, for instance — is fine and encouraged);",
        "misrepresent this site's content as medical advice, or present it as endorsed by us, a clinic, or a regulator.",
      ],
    },
    {
      heading: "Intellectual property",
      body: [
        "The content of this site — text, design, graphics, and the way our comparisons are compiled and presented — belongs to CairnFertility or its licensors. Underlying public data, such as HFEA statistics, remains public: our rights are in our expression and compilation, not in facts, which belong to everyone.",
      ],
    },
    {
      heading: "Third-party sites",
      body: [
        "We link to clinics, regulators, support organisations, and social platforms. Those sites have their own terms and privacy policies, and we are not responsible for their content or conduct. A link is a signpost, not a guarantee.",
      ],
    },
    {
      heading: "Availability and changes",
      body: [
        "The site is provided \"as available\". We may change, suspend, or withdraw any part of it at any time, and we do not promise it will be uninterrupted or error-free. If we ever introduce paid features or subscriptions, they will come with their own clear terms — including pricing, renewal, cooling-off, and cancellation rights — presented before you pay anything, and cancelling will be as easy as signing up.",
      ],
    },
    {
      heading: "Our responsibility to you",
      body: [
        "Nothing in these terms excludes or limits our liability for death or personal injury caused by our negligence, for fraud or fraudulent misrepresentation, or for anything else that cannot be excluded under the law of England and Wales.",
        "Subject to that: the site is a free information service, and we are not liable for losses arising from reliance on its content in place of professional advice, from decisions about medical treatment (which must always be made with a qualified clinician), from the acts or omissions of any clinic or third party we link to or list, or from events outside our reasonable control. Where we cannot exclude liability, it is limited to what is fair and reasonable for a free editorial service.",
        "If you are using the site as a consumer, you retain every statutory right the law gives you; these terms sit alongside those rights, never above them.",
      ],
    },
    {
      heading: "The legal frame",
      body: [
        "These terms are governed by the law of England and Wales, and the courts of England and Wales have jurisdiction — except that if you live in Scotland, Northern Ireland, or an EU member state, you keep the protection of your local mandatory consumer law and may bring proceedings in your local courts.",
        "If any part of these terms turns out to be unenforceable, the rest continues to apply. If we update these terms, the new version takes effect when posted here, with the date above updated; continuing to use the site after that means you accept the revised terms.",
      ],
      callout:
        "Questions about these terms — or something here that seems unfair or unclear? Email us. Terms written for a fertility community should be understandable by the people in it.",
    },
  ],
};

/* ─── Cookie Policy ───────────────────────────────────────────────────────── */

const COOKIES: LegalPage = {
  slug: "cookies",
  label: "Cookie Policy",
  title: "Cookie Policy",
  metaTitle: "Cookie Policy | CairnFertility",
  metaDescription:
    "CairnFertility sets no cookies of any kind — no analytics, no advertising, no tracking. This policy explains that in full, and what would have to change first.",
  standfirst:
    "This is an unusual cookie policy, because the honest summary is one sentence long: this site sets no cookies at all.",
  effectiveDate: EFFECTIVE_DATE,
  sections: [
    {
      heading: "The complete list of cookies we use",
      body: [
        "As of the effective date above, CairnFertility sets no cookies. Not strictly-necessary ones, not analytics, not advertising, not preferences. We also use no comparable technologies: no localStorage or sessionStorage tracking, no pixels, no beacons, no fingerprinting, and no third-party analytics or advertising scripts of any kind.",
        "That is why you see no cookie banner here. Consent banners exist to authorise non-essential cookies; a site that sets none has nothing to ask permission for.",
      ],
    },
    {
      heading: "What a cookie is, for completeness",
      body: [
        "A cookie is a small text file a website stores in your browser so it can recognise you between pages or visits. Cookies range from the genuinely necessary (keeping you logged in) to the purely commercial (following you around the internet for advertising). UK law — the Privacy and Electronic Communications Regulations, alongside the UK GDPR — requires your consent before any non-essential cookie is set.",
      ],
    },
    {
      heading: "Things that are not cookies, in case you were wondering",
      definitions: [
        {
          term: "The location permission prompt",
          description:
            "The \"find clinics near me\" search uses your browser's own geolocation permission, granted per site and revocable in your browser settings. No cookie is involved, and nothing is stored on your device by us. Details are in our [privacy policy](/privacy).",
        },
        {
          term: "Hosting infrastructure",
          description:
            "Our hosting provider (Vercel) processes standard server logs to deliver the site securely. That happens on their servers, not through anything placed in your browser.",
        },
        {
          term: "Your browser's own storage",
          description:
            "Browsers cache pages, fonts, and images so sites load faster on a return visit. That caching is your browser's behaviour under your control, not a tracking mechanism of ours.",
        },
      ],
    },
    {
      heading: "If this ever changes",
      body: [
        "If we ever introduce a feature that needs cookies or similar storage — a login session, a saved comparison, or analytics — we will do three things before it ships:",
      ],
      bullets: [
        "update this policy with a full table of every cookie: its name, who sets it, what it does, and how long it lasts;",
        "ask for your consent before any non-essential cookie is set, with \"reject\" exactly as easy as \"accept\";",
        "continue to honour universal opt-out signals such as Global Privacy Control.",
      ],
      postBody: [
        "You can also control or delete cookies for any site through your browser's settings — see your browser's help pages, or the ICO's guidance at [ico.org.uk](https://ico.org.uk/for-the-public/online/cookies/).",
      ],
      callout:
        "If you ever find a cookie set by this site while this policy still says there are none, please tell us at privacy@cairnfertility.com — that would be a bug in the site or in this policy, and either way we will fix it.",
    },
  ],
};

/* ─── Medical Disclaimer ──────────────────────────────────────────────────── */

const DISCLAIMER: LegalPage = {
  slug: "disclaimer",
  label: "Medical Disclaimer",
  title: "Medical Disclaimer",
  metaTitle: "Medical Disclaimer | CairnFertility",
  metaDescription:
    "CairnFertility is an information service, not a medical provider. What our content can be used for, what it must never replace, and where to get real medical help.",
  standfirst:
    "We publish information to make fertility treatment easier to navigate. It is not medical advice, and this page draws that line as clearly as we can.",
  effectiveDate: EFFECTIVE_DATE,
  sections: [
    {
      heading: "We are not a medical provider",
      body: [
        "CairnFertility is an editorial information and comparison service. We are not a clinic, hospital, or healthcare provider; we are not licensed by the HFEA or any medical regulator; and no doctors review your personal situation through this site. Reading our content, or using our tools, does not create a doctor–patient or any other clinical relationship.",
        "Everything on this site — guides, comparisons, statistics, stories, and tool results — is general information for educational purposes. It is not medical advice, diagnosis, or treatment, and it is not tailored to your medical circumstances, however specific it may seem.",
      ],
    },
    {
      heading: "Our tools are filters, not clinical assessments",
      body: [
        "The clinic matcher and comparison tools take the preferences and facts you enter and use them to sort and filter publicly available information about clinics. That is all they do. They do not assess your fertility, estimate your chances, diagnose any condition, or recommend treatment. They are not a medical device, and their output is a shortlist to discuss with a professional — not a clinical conclusion of any kind.",
        "Nothing on this site should be used to make decisions about contraception, pregnancy, medication, or treatment without a qualified clinician involved.",
      ],
    },
    {
      heading: "The limits of our numbers",
      body: [
        "We are careful with data, and honest about what it cannot tell you:",
      ],
      bullets: [
        "Success rates are historical population statistics. Your own likelihood of success depends on age, diagnosis, protocol, and factors no published statistic captures. A clinic's rate is not a prediction for you.",
        "UK figures labelled HFEA-verified come from the regulator's published data; overseas figures are self-reported by clinics and unverified. We label which is which.",
        "Prices are indicative and dated. The only price that matters is the itemised written quote a clinic gives you.",
        "Medical knowledge moves. We review our content, but any page may lag current clinical guidance.",
      ],
    },
    {
      heading: "Stories are illustrative",
      body: [
        "The personal stories and quotes on this site are illustrative composites, drawn from experiences common in the community, and are not accounts of real, identifiable patients unless expressly stated. They exist to make an unfamiliar journey feel less abstract — never as evidence that any path or clinic will work for you.",
      ],
    },
    {
      heading: "No endorsements, in either direction",
      body: [
        "A clinic appearing on this site is not a recommendation, and we accept no payment for inclusion or placement. Equally, no clinic, regulator, or professional body has endorsed this site. Verify any clinic's current licence and inspection history yourself — for UK clinics, on the HFEA register at [hfea.gov.uk](https://www.hfea.gov.uk/choose-a-clinic/clinic-search/).",
      ],
    },
    {
      heading: "Where to get real help",
      body: [
        "Always talk to your GP or a qualified fertility specialist before starting, stopping, or changing any treatment — and about anything on this site you plan to act on.",
      ],
      bullets: [
        "In a medical emergency, call 999 (UK) or your local emergency number now. Do not rely on any website, including this one.",
        "For urgent but non-emergency medical concerns in the UK, call NHS 111.",
        "Fertility treatment is emotionally hard. If you are struggling, Fertility Network UK ([fertilitynetworkuk.org](https://fertilitynetworkuk.org)) offers free support, and the Samaritans are available day and night on 116 123.",
      ],
      callout:
        "If anything on this site ever seems to conflict with what your doctor tells you, your doctor wins. Every time.",
    },
  ],
};

/* ─── Accessibility Statement ─────────────────────────────────────────────── */

const ACCESSIBILITY: LegalPage = {
  slug: "accessibility",
  label: "Accessibility",
  title: "Accessibility Statement",
  metaTitle: "Accessibility | CairnFertility",
  metaDescription:
    "CairnFertility's accessibility commitment: our WCAG 2.2 AA target, what we've built so far, known limitations, and how to tell us when something doesn't work.",
  standfirst:
    "Fertility treatment is navigated by people of every ability, often at a stressful time. This site should work for all of them. Here is where we are, honestly.",
  effectiveDate: EFFECTIVE_DATE,
  sections: [
    {
      heading: "Our commitment",
      body: [
        "We aim for this website to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA, and we treat accessibility as part of building every page rather than a compliance exercise bolted on afterwards. We want everyone to be able to perceive, navigate, and use every part of this site with whatever technology they rely on.",
      ],
    },
    {
      heading: "What we have built in so far",
      bullets: [
        "Semantic HTML structure — proper headings, landmarks, lists, and labels — so screen readers can navigate meaningfully.",
        "Reduced-motion support: our animations and decorative movement are disabled automatically when your system's \"reduce motion\" preference is on.",
        "A single, highly legible typeface with fluid sizing, generous line spacing, and text that scales with your browser's zoom and font-size settings.",
        "Colour choices managed through a design system tested for contrast between text and its background.",
        "Keyboard operability of navigation and interactive tools, with visible focus.",
        "No autoplaying media, no flashing content, and no time limits on reading or using any tool.",
      ],
    },
    {
      heading: "Known limitations",
      body: [
        "We are honest about the gaps. This site has not yet had a formal third-party accessibility audit, and some areas may fall short of our target — particularly the more complex interactive tools such as the clinic comparison table and multi-step matcher, where we are still improving screen-reader announcements and focus handling. Some images sourced from photo libraries may have adequate but imperfect alternative text.",
        "We are working through these, and an independent audit is planned as the product matures.",
      ],
    },
    {
      heading: "Tell us when something doesn't work",
      body: [
        "If any part of this site is difficult or impossible for you to use, that is a problem we want to hear about. Email [hello@cairnfertility.com](mailto:hello@cairnfertility.com) and tell us what happened, on which page, and the browser and assistive technology you were using. We aim to respond within five working days, and accessibility reports go to the top of the fix list.",
        "If you need any information from this site in a different format, ask and we will do our best to provide it.",
      ],
    },
    {
      heading: "Enforcement and your rights",
      body: [
        "In the UK, the Equality Act 2010 requires service providers to make reasonable adjustments for disabled people. If you contact us about an accessibility problem and are unhappy with our response, the Equality Advisory and Support Service (EASS) at [equalityadvisoryservice.com](https://www.equalityadvisoryservice.com) can advise you. Visitors in the EU have corresponding rights under the European Accessibility Act as implemented in their member state.",
      ],
      callout:
        "This statement was prepared on 10 August 2026 and is reviewed whenever the site changes materially, and at least annually.",
    },
  ],
};

/* ─── Contact ─────────────────────────────────────────────────────────────── */

const CONTACT: LegalPage = {
  slug: "contact",
  label: "Contact",
  title: "Contact Us",
  metaTitle: "Contact | CairnFertility",
  metaDescription:
    "How to reach CairnFertility: questions, corrections, story submissions, privacy requests, accessibility problems, and complaints.",
  standfirst:
    "Email is the best way to reach us. Here is where to send what, and what to expect back.",
  effectiveDate: EFFECTIVE_DATE,
  sections: [
    {
      heading: "What we can help with",
      body: [
        "Three addresses, all reaching the same place. Use whichever fits — nothing gets lost if you pick the wrong one.",
      ],
      definitions: [
        {
          term: "hello@cairnfertility.com",
          description:
            "General questions about the site, our guides, or how our comparisons are put together. Corrections too — if a price, policy, or success rate we publish looks out of date, we genuinely want to know. Accessibility problems (see our [accessibility statement](/accessibility)) and complaints about anything we have published or done also belong here.",
        },
        {
          term: "privacy@cairnfertility.com",
          description:
            "Data protection requests and anything about how we handle personal information, as described in our [privacy policy](/privacy). These are answered within the one-month statutory deadline, and usually much faster.",
        },
        {
          term: "stories@cairnfertility.com",
          description:
            "Sharing your own story or experience with the community. We would love to hear it, and nothing is ever published without your explicit agreement to what appears and how you are named.",
        },
      ],
      postBody: [
        "We aim to reply to everything within five working days.",
      ],
    },
    {
      heading: "What we cannot help with",
      body: [
        "Please do not send us medical questions. We are not clinicians, and it would be wrong of us to answer — however simple the question seems. Your GP, your clinic, or NHS 111 are the right doors for anything medical, and in an emergency it is always 999. For emotional support around fertility, Fertility Network UK ([fertilitynetworkuk.org](https://fertilitynetworkuk.org)) is free and understands this world deeply.",
        "For the same reason, please keep medical details out of emails to us where you can — we don't need them, and the less sensitive information sits in inboxes anywhere, the better.",
      ],
    },
    {
      heading: "Who you are writing to",
      body: [
        "CairnFertility is a UK-based, independent information service. We are not owned by, or affiliated with, any clinic, and no clinic pays to appear on this site. It is published by an individual rather than a registered company, so there are no company details to publish; if that ever changes, they will appear here. The addresses above reach the person who makes this site.",
      ],
      callout:
        "If your message is a formal legal or data protection notice, sending it to any of the addresses on this page counts as sending it to us.",
    },
  ],
};

export const LEGAL_PAGES: Record<string, LegalPage> = {
  privacy: PRIVACY,
  terms: TERMS,
  cookies: COOKIES,
  disclaimer: DISCLAIMER,
  accessibility: ACCESSIBILITY,
  contact: CONTACT,
};

/** Ordered list for cross-linking between the legal pages. */
export const LEGAL_PAGE_ORDER = [
  "privacy",
  "terms",
  "cookies",
  "disclaimer",
  "accessibility",
  "contact",
] as const;
