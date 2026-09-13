/**
 * Content for /support ("Looking after yourself").
 *
 * Every number and organisation detail here was checked on the organisation's
 * own website, or an official NHS or government source, on
 * SUPPORT_LAST_CHECKED. Sources are listed beside each entry. When you change
 * anything, recheck all of it and bump the date.
 *
 * Deliberately excluded: Fertility Network UK (closed) and the Samaritans
 * email service (closing).
 */

export const SUPPORT_LAST_CHECKED = "13 September 2026";

export interface SupportLink {
  label: string;
  href: string;
}

export interface SupportItem {
  name: string;
  body: string;
  links?: SupportLink[];
}

export interface SupportSection {
  /** Anchor id. Other pages link to /support#crisis and friends. */
  id: "crisis" | "counselling" | "pregnancy-loss" | "donor-conception" | "choices";
  title: string;
  intro?: string;
  items?: SupportItem[];
  paragraphs?: string[];
}

export const SUPPORT_SECTIONS: SupportSection[] = [
  {
    id: "crisis",
    title: "If you need help now",
    items: [
      {
        // Emergency services.
        name: "In immediate danger",
        body: "Call 999 or go to A&E if you are in immediate danger.",
        links: [{ label: "Call 999", href: "tel:999" }],
      },
      {
        // samaritans.org/how-we-can-help/contact-samaritan/talk-us-phone/
        name: "Samaritans",
        body: "Call 116 123, free, any time. Welsh language line: 0808 164 0123.",
        links: [
          { label: "Call 116 123", href: "tel:116123" },
          { label: "Call the Welsh language line", href: "tel:08081640123" },
          {
            label: "Samaritans website",
            href: "https://www.samaritans.org/how-we-can-help/contact-samaritan/talk-us-phone/",
          },
        ],
      },
      {
        // england.nhs.uk/2024/08/nhs-111-offering-crisis-mental-health-support-for-the-first-time/
        name: "England: NHS 111",
        body: "Call NHS 111 and choose the mental health option.",
        links: [{ label: "Call 111", href: "tel:111" }],
      },
      {
        // gov.wales/nhs-111-press-2
        name: "Wales: 111, press 2",
        body: "Call 111 and press 2 to speak to a mental health professional. Free, 24 hours a day.",
        links: [{ label: "Call 111", href: "tel:111" }],
      },
      {
        // nhs24.scot/mental-health-services-at-nhs-24/
        name: "Scotland: NHS 24",
        body: "Call 111 (NHS 24) and choose the mental health option.",
        links: [{ label: "Call 111", href: "tel:111" }],
      },
      {
        // lifelinehelpline.info
        name: "Northern Ireland: Lifeline",
        body: "Call 0808 808 8000, free, 24/7.",
        links: [
          { label: "Call 0808 808 8000", href: "tel:08088088000" },
          { label: "Lifeline website", href: "https://www.lifelinehelpline.info/" },
        ],
      },
      {
        // giveusashout.org/get-help/
        name: "Shout",
        body: "Text SHOUT to 85258, free, 24/7, anywhere in the UK.",
        links: [
          { label: "Text SHOUT to 85258", href: "sms:85258?body=SHOUT" },
          { label: "Shout website", href: "https://giveusashout.org/get-help/" },
        ],
      },
    ],
  },
  {
    id: "counselling",
    title: "Your clinic's counsellor",
    items: [
      {
        // hfea.gov.uk/treatments/explore-all-treatments/getting-emotional-support/
        name: "At your clinic",
        body: "Every clinic licensed by the HFEA must offer you the chance to talk to a counsellor before you start treatment. Some clinics offer this free; others charge.",
        links: [
          {
            label: "HFEA: getting emotional support",
            href: "https://www.hfea.gov.uk/treatments/explore-all-treatments/getting-emotional-support/",
          },
        ],
      },
      {
        // bica.net/find-a-counsellor (listings show each counsellor's level;
        // "The directory listings are for counsellors in private practice").
        name: "British Infertility Counselling Association (BICA)",
        body: "The British Infertility Counselling Association lists fertility counsellors and shows each one's accreditation level. Most work privately.",
        links: [{ label: "Find a counsellor", href: "https://www.bica.net/find-a-counsellor" }],
      },
      {
        // England: england.nhs.uk/mental-health/adults/nhs-talking-therapies/
        // Wales: 111.wales.nhs.uk/counselling/ (self-referral available)
        // Scotland: nhsinform.scot what-is-psychological-therapy (speak to your GP)
        // Northern Ireland: nidirect.gov.uk/articles/mental-health-services (via GP)
        name: "NHS Talking Therapies",
        body: "In England you can refer yourself for free, without seeing your GP. In Wales you can refer yourself or ask your GP. In Scotland and Northern Ireland, ask your GP.",
        links: [
          {
            label: "Find NHS Talking Therapies in England",
            href: "https://www.nhs.uk/nhs-services/mental-health-services/find-nhs-talking-therapies-for-anxiety-and-depression/",
          },
        ],
      },
    ],
  },
  {
    id: "pregnancy-loss",
    title: "After pregnancy loss",
    items: [
      {
        // miscarriageuk.org/how-we-help/helpline/
        name: "Miscarriage UK",
        body: "Formerly the Miscarriage Association. Support after miscarriage, ectopic pregnancy or molar pregnancy. Helpline 0303 003 6464: Monday, Tuesday and Thursday 9am to 4pm; Wednesday and Friday 9am to 8pm.",
        links: [
          { label: "Call 0303 003 6464", href: "tel:03030036464" },
          { label: "Miscarriage UK website", href: "https://www.miscarriageuk.org/" },
        ],
      },
      {
        // petalscharity.org
        name: "Petals",
        body: "Free specialist counselling after pregnancy or baby loss.",
        links: [{ label: "Petals website", href: "https://www.petalscharity.org/" }],
      },
    ],
  },
  {
    id: "donor-conception",
    title: "Donor conception",
    items: [
      {
        // dcnetwork.org
        name: "Donor Conception Network",
        body: "A charity supporting families with children conceived using donor eggs, sperm or embryos, and people thinking about donor conception.",
        links: [{ label: "Donor Conception Network website", href: "https://dcnetwork.org/" }],
      },
    ],
  },
  {
    id: "choices",
    title: "Pausing, stopping or changing route",
    paragraphs: [
      "Pausing treatment, stopping, or changing route (for example to donor eggs, surrogacy, adoption, or not having children) are all real options. A fertility counsellor can help you think them through.",
    ],
  },
];
