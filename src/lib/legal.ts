/**
 * Legal page content.
 *
 * Every statement in this file is a representation CairnFertility can be
 * held to (regulators enforce against policies that do not match actual
 * behaviour; see FTC v. Flo Health). So the rule for editing this file is:
 * describe what the codebase actually does, and when the codebase changes
 * (analytics added, a form wired up, an API route created), update the
 * relevant sections here in the same pull request.
 *
 * Current facts these pages are written against (verify before editing):
 * - No user accounts, no payments.
 * - No cookies, no analytics, no advertising or tracking of any kind. The
 *   browser makes no third-party calls (connect-src 'self').
 * - One browser-storage key exists: `cairn-community-application`, written
 *   after someone applies to the community. It holds `{ submittedAt,
 *   expiresAt }` (dates only, no name, 30 days) so the page can show the
 *   application was received. See src/lib/community-application.ts.
 * - The waitlist form (/waitlist) sends your email address to a single
 *   Supabase table via one API route (POST /api/waitlist), for occasional
 *   emails about new guides, price changes and IVF funding or law. The table
 *   has row-level security enabled with no policies, so the list cannot be
 *   queried back out over the public API; the anon key can only execute one
 *   insert-only function. See src/app/api/waitlist/route.ts and
 *   supabase/migrations/0001_waitlist_signups.sql.
 * - The community application form (/community) collects a first name,
 *   email, pathway, stage, optional interests, an optional sector
 *   affiliation, and a free-text answer about why the person wants to join.
 *   Reason, pathway AND stage are all special category data under Art. 9
 *   (health, and in some cases sexual orientation). The form has a separate,
 *   unticked consent box covering them; the API rejects submissions without
 *   it and the RPC records `health_data_consent_at`. See
 *   src/app/api/community/apply/route.ts and migrations 0002 and 0003.
 * - Retention is enforced by `public.purge_community_data()`, scheduled
 *   nightly by pg_cron (03:15 UTC) in migration 0004 and also runnable from
 *   scripts/community-admin.ts. The day counts in the privacy policy below
 *   are literals and must match src/lib/retention.ts and that migration.
 * - Approval mints a single-use invite token; only its SHA-256 hash is
 *   stored. Redeeming it reveals the group link and nothing else. No phone
 *   number is collected anywhere on this site.
 * - The community itself runs on WhatsApp (Meta). We send no personal data
 *   to Meta; a member joins with their own account. As admin, the site owner
 *   sees members' phone numbers inside WhatsApp when approving join requests
 *   and matching them to applications, and the policy says so.
 * - The clinic matcher's answers (family type, age, medical history, budget)
 *   are held in browser memory only and never transmitted or stored.
 * - The share-your-story form (/stories/share) drafts an email entirely in
 *   the browser; nothing is transmitted unless the reader sends it from
 *   their own email app. There is no submission backend.
 * - Hosting is Vercel; their edge network processes IP addresses in
 *   standard server logs.
 *
 * Placeholders (grep "_TBC"): OWNER_NAME_TBC and OWNER_ADDRESS_TBC in
 * CONTROLLER; SUPABASE_REGION_TBC and EMAIL_PROVIDER_TBC in the providers
 * list. The build passes with them in place; deployment must not.
 *
 * ICO data protection fee: the site processes health data about applicants
 * and is not obviously within any fee exemption. Run the ICO self-assessment
 * and expect tier 1. Fill ICO_REGISTRATION_NUMBER when registered.
 *
 * The three addresses in CONTACT_EMAILS must be live and forwarding before
 * these pages are pointed at a public domain.
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
 * configured on the domain. A published address that bounces is worse than
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

/**
 * The data controller. An unnamed "individual" is not an identity for the
 * purposes of UK GDPR Art 13(1)(a); fill these before deployment.
 */
export const CONTROLLER = {
  name: "OWNER_NAME_TBC",
  tradingAs: "CairnFertility",
  address: "OWNER_ADDRESS_TBC",
} as const;

/** Set once registered with the ICO; the privacy policy shows it when present. */
export const ICO_REGISTRATION_NUMBER = null as string | null;

/** Every page in the set was revised on this date (Phase 3, privacy and legal). */
const REVISED_DATE = "13 September 2026";

const PUBLISHER_SENTENCE = `CairnFertility is published by ${CONTROLLER.name}, trading as ${CONTROLLER.tradingAs}, from ${CONTROLLER.address} in the United Kingdom.`;

const ICO_LINE: string[] = ICO_REGISTRATION_NUMBER
  ? [`Our ICO registration number is ${ICO_REGISTRATION_NUMBER}.`]
  : [];

/* ─── Privacy Policy ──────────────────────────────────────────────────────── */

const PRIVACY: LegalPage = {
  slug: "privacy",
  label: "Privacy Policy",
  title: "Privacy Policy",
  metaTitle: "Privacy Policy | CairnFertility",
  metaDescription:
    "How CairnFertility handles personal data: what we collect, what never leaves your browser, how long we keep it, and the rights you have over your information.",
  standfirst:
    "Fertility is among the most personal subjects there is, so we built this site to know as little about you as possible. This policy explains what that means in practice.",
  effectiveDate: REVISED_DATE,
  sections: [
    {
      heading: "The short version",
      body: [
        "CairnFertility is an information and comparison site. You do not need an account to use it.",
      ],
      bullets: [
        "We set no cookies and run no analytics, advertising or tracking of any kind.",
        "We have no user accounts, no passwords, and we take no payments.",
        "We store your email if you join our list. If you apply to the community we store your first name, email, path, stage, and what you write, and a person reads it. Path, stage and what you write are health-related data. We delete them on the schedule below.",
        "This website never asks for your phone number.",
        "Your answers in our clinic matching tool, including anything about your health, are processed within your own browser. They are never sent to us or to anyone else.",
        "We never sell personal data, and we never share it for advertising.",
      ],
    },
    {
      heading: "Who we are",
      body: [
        `${PUBLISHER_SENTENCE} That person is the controller for the personal data described here.`,
        ...ICO_LINE,
        "For anything about this policy or your personal data, email [privacy@cairnfertility.com](mailto:privacy@cairnfertility.com). For anything else, [hello@cairnfertility.com](mailto:hello@cairnfertility.com) reaches us.",
      ],
    },
    {
      heading: "What we collect, and what we deliberately don't",
      body: [
        "Most of this site is plain reading material, and reading it sends us nothing beyond the standard technical information any website receives. Here is every way personal data can arise on this site today:",
      ],
      definitions: [
        {
          term: "Email you send us",
          description:
            "If you email us, we receive your address and whatever you write. We use it only to reply and to keep a record of the correspondence. Please do not include medical details; we are not a medical service and do not need them.",
        },
        {
          term: "The share-your-story form",
          description:
            "What you type stays in your browser until you send it from your own email app; an unsent story never reaches us. Stories are published only after we have agreed the final text with you by email, and you can withdraw one at any time.",
        },
        {
          term: "Joining the waitlist",
          description:
            "If you submit your email on our keep-in-touch page, it is stored with the date you joined in a database hosted by Supabase, for occasional emails about new guides, price changes and IVF funding or law, each with an unsubscribe link. We add you to no other list, and the database cannot be browsed or searched over the public website; only new emails can be added to it.",
        },
        {
          term: "Applying to join the community",
          description:
            "The form asks for your first name, your email address, which path you are on, what stage you are at, optionally what you are hoping to find and whether you work in the fertility sector, and, in your own words, why you would like to join. It is stored in our Supabase database, read by a person, and not shared with anyone. Your path, stage and what you write are health-related data; the next section explains how we handle them. We never ask for your phone number, address, date of birth or medical records.",
        },
        {
          term: "Your invite, if we approve you",
          description:
            "Approving an application creates a single-use invite link. We store only a cryptographic hash of it, never the link itself, so a working invite cannot be reconstructed from the database. The link expires after seven days, works once, and only opens for someone who can also enter the email address it was issued to.",
        },
        {
          term: "Clinic matcher answers",
          description:
            "Our matching tool asks about your family type, age range, relevant medical conditions, budget and willingness to travel. These answers stay in your browser's memory while you use the tool and disappear when you leave the page. They are never transmitted to our servers or to any third party.",
        },
        {
          term: "Hosting logs",
          description:
            "The site is served by Vercel, our hosting provider. Vercel's servers process your IP address and standard request information (browser type, pages requested, timestamps) in short-lived operational logs used for security and to keep the site running. See Vercel's own [privacy policy](https://vercel.com/legal/privacy-policy) for details.",
        },
      ],
      postBody: [
        "There is no forum, comment box or profile anywhere on this site, and no marketing list beyond the waitlist above. The community is a separate private group on WhatsApp, and nothing said in it is published here.",
      ],
    },
    {
      heading: "Health information gets special treatment",
      body: [
        "Data about your health, fertility or sex life is \"special category data\" under UK data protection law, which sets a higher bar for handling it. Almost everywhere on this site we meet that bar by making sure the data never reaches us.",
        "The clinic matcher, the cost calculator and the clinic finder ask health-related questions, but the filtering happens in your browser and the answers are not sent anywhere. We hold no record that you used them or what you answered.",
        "The community application is different. Your path, your stage and what you write about why you would like to join are special category data: \"two mums\" says something about your sexual orientation, and \"in treatment now\" is information about your health. We store them only because you tick a separate consent box on the form saying we may, and a person reads them to decide on your application. Nothing else on this site is gated behind that consent. You can withdraw it at any time by emailing [privacy@cairnfertility.com](mailto:privacy@cairnfertility.com) and we will delete your application. Your path and stage are kept while you are a member and deleted when you leave or ask; what you wrote is deleted on the schedule in 'How long we keep things' below.",
        "If we ever build a feature that needs health information to leave your browser, we will ask for your explicit consent first and update this policy before it goes live.",
      ],
    },
    {
      heading: "Our legal grounds",
      body: [
        "UK data protection law (the UK GDPR and the Data Protection Act 2018) requires a lawful basis for each use of personal data. Ours are:",
      ],
      definitions: [
        {
          term: "Consent (for the waitlist)",
          description:
            "You choose to type your email and submit it. You can withdraw at any time by using the unsubscribe link in any email or by asking us to delete it.",
        },
        {
          term: "Explicit consent (for the community application)",
          description:
            "Special category data needs explicit consent under Article 9(2)(a) of the UK GDPR. The application form has a separate tick-box, worded to cover your path, stage and what you write, recorded with a timestamp. It is not bundled with agreeing to the group rules, and the form is not accepted without it. You can withdraw it at any time by emailing us and we will delete your application, whether or not you have joined the group. Leaving the group is always yours to do without giving a reason.",
        },
        {
          term: "Legitimate interests",
          description:
            "Replying to emails you send us; the security and operational logging our hosting provider performs to keep the site available and safe; and keeping the email address of anyone removed from the group so that the same address cannot re-apply, which protects the people in the group. You can object to any of these by emailing us.",
        },
      ],
    },
    {
      heading: "How long we keep things",
      body: [
        "Email correspondence is kept for as long as it is needed to deal with your enquiry and for a reasonable period afterwards, then deleted. Hosting logs are kept by Vercel on infrastructure timescales (typically days, not months) under its own retention policies.",
        "Community applications and invites are kept as follows:",
      ],
      bullets: [
        "Declined: the whole record is deleted 30 days after the decision.",
        "Pending and never reviewed: deleted 90 days after applying.",
        "Approved but the invite was never used: deleted 30 days after approval.",
        "Joined: the free text and sector declaration are cleared 90 days after applying. Your first name, email, path and stage are kept while you are a member.",
        "Removed: everything except your email address and your status is cleared 30 days after removal, so that a removed address cannot re-apply.",
        "Invites: deleted 30 days after being used, revoked or expiring.",
        "Waitlist emails: until you unsubscribe or ask.",
      ],
      postBody: [
        "The purge runs automatically every night in our database. If you leave the group, or ask us to delete your application, we delete the record ourselves rather than waiting for the schedule.",
      ],
    },
    {
      heading: "Who we share data with",
      body: ["We use these service providers:"],
      bullets: [
        "Vercel Inc. hosts and serves the website. Vercel is a US company; where visitor data such as IP addresses is processed outside the UK, that transfer is covered by recognised safeguards including the UK Extension to the EU-US Data Privacy Framework and standard contractual clauses.",
        "Supabase Pte. Ltd (Singapore) stores the waitlist and community applications. Our project is hosted in Ireland, in the EU; any transfer outside the UK or EU is covered by standard contractual clauses and the UK International Data Transfer Addendum.",
        "Our email addresses are not yet hosted by a third-party provider. When they are, we will name the provider here and any transfer safeguard that applies, before we start using them.",
      ],
      callout:
        "The community group runs on WhatsApp, and WhatsApp is not on that list because we send it nothing. We do not upload your email, your application, or any contact list to Meta. You join with your own WhatsApp account, under your own agreement with Meta, and from that moment Meta handles your data as your provider rather than ours. In a WhatsApp group, other members can see your phone number. As group admin, we can see members' phone numbers in WhatsApp when we approve join requests and match them to applications. We do not copy them anywhere else. This website never asks for one.",
      postBody: [
        "We do not sell personal data, share it for advertising or marketing, or pass it to data brokers. Links to social platforms in our footer are ordinary links; nothing is sent to those platforms unless you click through.",
      ],
    },
    {
      heading: "Requests from police, courts and other authorities",
      body: [
        "We'd disclose data only where legally required, and would tell you unless the law forbids it.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "You have rights over the personal data we hold about you: email correspondence, your waitlist entry if you have joined it, and your community application if you have made one.",
      ],
      bullets: [
        "Access: ask for a copy of what we hold about you.",
        "Rectification: have inaccurate information corrected.",
        "Erasure: ask us to delete your data.",
        "Restriction and objection: limit or object to how we use it.",
        "Portability: receive your data in a reusable format.",
        "Withdraw consent: email privacy@cairnfertility.com to leave the waitlist or delete your community application.",
      ],
      postBody: [
        "To exercise any of these, email [privacy@cairnfertility.com](mailto:privacy@cairnfertility.com). We will respond within one month, as the law requires, and we will not charge for a reasonable request.",
        "If you are unhappy with how we have handled your data, email [privacy@cairnfertility.com](mailto:privacy@cairnfertility.com) first. We will acknowledge your complaint within 30 days and tell you what we are doing about it.",
        "You can also complain to the UK Information Commissioner's Office at [ico.org.uk](https://ico.org.uk) or on 0303 123 1113. If you are in the EU, you may also complain to your national data protection authority.",
      ],
    },
    {
      heading: "Visitors outside the UK",
      body: [
        "If you visit from outside the UK: we don't sell personal information or use it for advertising, and we set no tracking cookies. If you apply to the community, the health information you choose to share is handled exactly as described above, wherever you live.",
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
        "When the site gains a feature that changes how personal data is handled, this policy will be updated before the feature goes live, with a new effective date at the top of the page. Material changes will be flagged on the site rather than changed quietly.",
      ],
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
  effectiveDate: REVISED_DATE,
  sections: [
    {
      heading: "Who we are and what this is",
      body: [
        `CairnFertility ("we", "us") publishes this website to help people (solo parents by choice, LGBTQ+ families, and couples) understand fertility treatment and compare IVF clinics. ${PUBLISHER_SENTENCE} Contact us at [hello@cairnfertility.com](mailto:hello@cairnfertility.com).`,
        "By using the site you accept these terms. If you do not accept them, please do not use the site. Nothing in these terms affects rights you have as a consumer that the law does not allow to be limited or excluded.",
      ],
    },
    {
      heading: "What the service is, and is not",
      body: [
        "This site is an editorial information and comparison service. It is free to use, with no accounts and no purchases. What it is not:",
      ],
      bullets: [
        "It is not medical advice, and we are not a healthcare provider. Our [medical disclaimer](/disclaimer) is part of these terms; please read it.",
        "It is not a clinic, an agent, or a broker. We have no commercial relationship with the clinics we list, you cannot book treatment through us, and appearing on this site is not an endorsement by us, nor is it an endorsement of us by any clinic or by the HFEA.",
        "It is not a substitute for a clinic's own current information. Prices, waiting times, eligibility policies and success rates change; always confirm directly with a clinic before making decisions.",
      ],
      postBody: [
        "Where our figures come from, and how far to trust them, is set out in the [medical disclaimer](/disclaimer), which forms part of these terms.",
      ],
    },
    {
      heading: "Using the site acceptably",
      body: ["You agree not to:"],
      bullets: [
        "use the site unlawfully, or in a way that could harm it or other users, including attempting to breach its security, scrape it at scale, or interfere with its operation;",
        "reproduce our content commercially without permission (personal, non-commercial use, for instance printing a comparison to discuss with your clinic, is fine and encouraged);",
        "misrepresent this site's content as medical advice, or present it as endorsed by us, a clinic, or a regulator;",
        "apply to the community under false pretences (for a clinic, a brand, a research study, or a press story) or use it to sell, recruit, or promote anything.",
      ],
    },
    {
      heading: "The community group",
      body: [
        "Our community is a private group on WhatsApp, not part of this website. Applying is free, and approval is at our discretion: we read every application and we decline the ones we are not comfortable with, and we may not always be able to give a detailed reason. That discretion exists to protect the people already in the group.",
        "Membership is conditional on the [group rules](/community/guidelines), which you accept when you apply and again when you redeem your invite. The rule that matters most is that nothing said in the group is repeated outside it. We may remove any member at any time for breaking the rules, and we will do so without notice where somebody's safety or privacy is at stake.",
        "Once you are in, WhatsApp is provided by Meta under its own terms; see the [privacy policy](/privacy) for what that means for your phone number. We are not responsible for what individual members say or do, and admins are not a support line.",
      ],
    },
    {
      heading: "Intellectual property",
      body: [
        "The content of this site (text, design, graphics, and the way our comparisons are compiled and presented) belongs to CairnFertility or its licensors. Underlying public data, such as HFEA statistics, remains public: our rights are in our expression and compilation, not in facts, which belong to everyone.",
      ],
    },
    {
      heading: "Third-party sites",
      body: [
        "We link to clinics, regulators, support organisations and social platforms. Those sites have their own terms and privacy policies, and we are not responsible for their content or conduct. A link is a signpost, not a guarantee.",
      ],
    },
    {
      heading: "Availability and changes",
      body: [
        "The site is provided \"as available\". We may change, suspend, or withdraw any part of it at any time, and we do not promise it will be uninterrupted or error-free.",
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
        "These terms are governed by the law of England and Wales, and the courts of England and Wales have jurisdiction, except that if you live in Scotland, Northern Ireland, or an EU member state, you keep the protection of your local mandatory consumer law and may bring proceedings in your local courts.",
        "If any part of these terms turns out to be unenforceable, the rest continues to apply. If we update these terms, the new version takes effect when posted here, with the date above updated; continuing to use the site after that means you accept the revised terms.",
      ],
      callout:
        "Questions about these terms, or something here that seems unfair or unclear? Email [hello@cairnfertility.com](mailto:hello@cairnfertility.com).",
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
    "CairnFertility sets no cookies: no analytics, no advertising, no tracking. The one thing we store in your browser, and what would have to change first.",
  standfirst:
    "This site sets no cookies. This page says what that covers, names the one thing we do store in your browser, and says what would have to change before that did.",
  effectiveDate: REVISED_DATE,
  sections: [
    {
      heading: "The complete list of cookies we use",
      body: [
        "As of the effective date above, CairnFertility sets no cookies: none that are strictly necessary, none for analytics, advertising or preferences, and no pixels, beacons, fingerprinting or third-party scripts of any kind. We store one thing in your browser: if you apply to the community, a key named cairn-community-application records the date you applied, for 30 days, so the page can show your application was received instead of an empty form. It holds no name, email or answers, never leaves your device, and 'Start a new application' clears it.",
        "That is why you see no cookie banner here. Consent banners exist to authorise non-essential cookies; a site that sets none has nothing to ask permission for.",
      ],
    },
    {
      heading: "Things that are not cookies",
      definitions: [
        {
          term: "Hosting infrastructure",
          description:
            "Our hosting provider (Vercel) processes standard server logs to deliver the site securely. That happens on their servers, not through anything placed in your browser.",
        },
      ],
    },
    {
      heading: "If this ever changes",
      body: [
        "If we ever introduce a feature that needs cookies or similar storage (a login session, a saved comparison, or analytics), we will do three things before it ships:",
      ],
      bullets: [
        "update this policy with a full table of every cookie: its name, who sets it, what it does, and how long it lasts;",
        "ask for your consent before any non-essential cookie is set, with \"reject\" exactly as easy as \"accept\";",
        "honour universal opt-out signals such as Global Privacy Control.",
      ],
      postBody: [
        "You can also control or delete cookies for any site through your browser's settings. See your browser's help pages, or the ICO's guidance at [ico.org.uk](https://ico.org.uk/for-the-public/online/cookies/).",
      ],
      callout:
        "If you find a cookie set by this site while this policy says there are none, tell us at privacy@cairnfertility.com and we will fix it.",
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
  effectiveDate: REVISED_DATE,
  sections: [
    {
      heading: "We are not a medical provider",
      body: [
        "CairnFertility is an editorial information and comparison service. We are not a clinic, hospital, or healthcare provider; we are not licensed by the HFEA or any medical regulator; and no doctors review your personal situation through this site. Reading our content, or using our tools, does not create a doctor-patient or any other clinical relationship.",
        "Everything on this site (guides, comparisons, statistics, stories, and tool results) is general information for educational purposes. It is not medical advice, diagnosis, or treatment, and it is not tailored to your medical circumstances, however specific it may seem.",
      ],
    },
    {
      heading: "Our tools are filters, not clinical assessments",
      body: [
        "The clinic matcher and comparison tools take the preferences and facts you enter and use them to sort and filter publicly available information about clinics. They show clinics' published success rates for people in your age band; they cannot predict your individual chance, diagnose any condition, or recommend treatment. They are not a medical device, and their output is a shortlist to discuss with a professional, not a clinical conclusion of any kind.",
        "Nothing on this site should be used to make decisions about contraception, pregnancy, medication, or treatment without a qualified clinician involved.",
      ],
    },
    {
      heading: "The limits of our numbers",
      body: ["What our figures can and cannot tell you:"],
      bullets: [
        "Success rates are historical population statistics. Your own likelihood of success depends on age, diagnosis, protocol, and factors no published statistic captures. A clinic's rate is not a prediction for you.",
        "UK figures labelled as from the HFEA register are copied from the Choose a Clinic pages published by the Human Fertilisation and Embryology Authority at [hfea.gov.uk](https://www.hfea.gov.uk/choose-a-clinic/clinic-search/); the HFEA does not endorse this site. Overseas figures are the clinics' own published figures, which we have not checked against a regulator. We label which is which, and we show no rate where a clinic publishes none or measures something other than births.",
        "Prices are indicative and dated, and rarely include everything you will actually pay. The only price that matters is the itemised written quote a clinic gives you.",
        "Medical knowledge moves. We review our content, but any page may lag current clinical guidance.",
      ],
      postBody: [
        "We have adopted the Competition and Markets Authority's [consumer law guidance for fertility clinics](https://www.gov.uk/cma-cases/self-funded-ivf-consumer-law-guidance) (June 2021) as our editorial standard for how prices and success rates are presented, and our [methodology](/about#methodology) explains how we apply it.",
      ],
    },
    {
      heading: "Personal stories",
      body: [
        "We don't currently publish personal stories or quotes. When we do, they will be real accounts published with the writer's consent.",
      ],
    },
    {
      heading: "No endorsements, in either direction",
      body: [
        "A clinic appearing on this site is not a recommendation, and we accept no payment for inclusion or placement. Equally, no clinic, regulator, or professional body has endorsed this site. Verify any clinic's current licence and inspection history yourself: for UK clinics, on the HFEA register at [hfea.gov.uk](https://www.hfea.gov.uk/choose-a-clinic/clinic-search/).",
      ],
    },
    {
      heading: "Where to get real help",
      body: [
        "Always talk to your GP or a qualified fertility specialist before starting, stopping, or changing any treatment, and about anything on this site you plan to act on.",
      ],
      bullets: [
        "In a medical emergency, call 999 (UK) or your local emergency number now. Do not rely on any website, including this one.",
        "For urgent but non-emergency medical concerns in the UK, call NHS 111.",
        "Fertility treatment can be emotionally hard. Samaritans are available free, any time, on 116 123, and [Looking after yourself](/support) lists crisis lines and counselling.",
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
    "Fertility treatment is navigated by people of every ability, often at a stressful time. This site should work for all of them. Here is where we are.",
  effectiveDate: REVISED_DATE,
  sections: [
    {
      heading: "Our commitment",
      body: [
        "We aim for this website to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA, and we treat accessibility as part of building every page rather than a compliance exercise bolted on afterwards.",
      ],
    },
    {
      heading: "What we have built in so far",
      bullets: [
        "Semantic HTML structure (proper headings, landmarks, lists, and labels) so screen readers can navigate meaningfully.",
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
        "This site has not yet had a formal third-party accessibility audit, and some areas may fall short of our target, particularly the more complex interactive tools such as the clinic comparison table and multi-step matcher, where we are still improving screen-reader announcements and focus handling. Some images sourced from photo libraries may have adequate but imperfect alternative text.",
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
        "In the UK, the Equality Act 2010 requires service providers to make reasonable adjustments for disabled people. If you contact us about an accessibility problem and are unhappy with our response, the Equality Advisory and Support Service (EASS) at [equalityadvisoryservice.com](https://www.equalityadvisoryservice.com) can advise you.",
      ],
      callout: `This statement was prepared on ${REVISED_DATE} and is reviewed whenever the site changes materially, and at least annually.`,
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
  effectiveDate: REVISED_DATE,
  sections: [
    {
      heading: "What we can help with",
      body: [
        `Three addresses, all reaching the same person: ${CONTROLLER.name}, who publishes this site as ${CONTROLLER.tradingAs} from ${CONTROLLER.address}. We are not owned by, or affiliated with, any clinic, and no clinic pays to appear on this site. Use whichever address fits; nothing gets lost if you pick the wrong one.`,
      ],
      definitions: [
        {
          term: "hello@cairnfertility.com",
          description:
            "General questions about the site, our guides, or how our comparisons are put together. Corrections too: if a price, policy, or success rate we publish looks out of date, we want to know. Accessibility problems (see our [accessibility statement](/accessibility)) and complaints about anything we have published or done also belong here.",
        },
        {
          term: "privacy@cairnfertility.com",
          description:
            "Data protection requests and anything about how we handle personal information, as described in our [privacy policy](/privacy). These are answered within the one-month statutory deadline, and usually much faster.",
        },
        {
          term: "stories@cairnfertility.com",
          description:
            "Sharing your own story or experience with the community. Nothing is published without your explicit agreement to what appears and how you are named.",
        },
      ],
      postBody: ["We aim to reply to everything within five working days."],
      callout:
        "If your message is a formal legal or data protection notice, sending it to any of the addresses on this page counts as sending it to us.",
    },
    {
      heading: "What we cannot help with",
      body: [
        "Please do not send us medical questions. We are not clinicians, and it would be wrong of us to answer, however simple the question seems. Your GP, your clinic, or NHS 111 are the right doors for anything medical, and in an emergency it is always 999. For emotional support, see [Looking after yourself](/support).",
        "For the same reason, please keep medical details out of emails to us. We do not need them.",
      ],
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
