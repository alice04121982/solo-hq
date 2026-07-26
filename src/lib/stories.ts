import type { FamilyTypeSlug } from "./family-types";

export interface Story {
  id: string;
  familyType: FamilyTypeSlug | "all";
  familyLabel: string;
  name: string;
  age: number;
  location: string;
  tag: string;
  title: string;
  excerpt: string;
  body: string;
  treatment: string;
  image: string;
  imageAlt: string;
}

export const ALL_STORIES: Story[] = [
  {
    id: "alice-iris",
    familyType: "solo-mum",
    familyLabel: "Solo Mum by Choice",
    name: "Alice",
    age: 37,
    location: "Bristol",
    tag: "Solo mum by choice",
    title: "From 'someday' to mum of one in 22 months",
    excerpt: "Two IUI rounds, one IVF cycle, and one very determined woman. Alice's story about trusting herself to make the biggest decision of her life — alone.",
    body: "I started researching solo IVF after a relationship ended in my mid-thirties. I gave myself three months to decide. Two IUI rounds and one IVF cycle later, my daughter Iris was born in 2023. The hardest part wasn't the injections or the waiting — it was trusting myself to make this decision without anyone to share it with.",
    treatment: "IUI × 2, IVF × 1",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Woman smiling warmly holding her baby",
  },
  {
    id: "sarah-priya-maya",
    familyType: "same-sex-female",
    familyLabel: "Same-Sex Female Couple",
    name: "Sarah & Priya",
    age: 35,
    location: "London",
    tag: "Same-sex female couple",
    title: "We both wanted to be part of making her",
    excerpt: "Reciprocal IVF meant one of them provided the eggs and the other carried the pregnancy. Their daughter Maya has both of them in her completely.",
    body: "We agonised over who would carry. Then our consultant mentioned reciprocal IVF and something clicked. Priya provided the eggs, they were fertilised with our chosen donor's sperm, and I carried the embryo. Our daughter Maya was born in 2024. She has Priya's eyes. She has both of us completely.",
    treatment: "Reciprocal IVF",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Two women laughing together",
  },
  {
    id: "natalie-twins",
    familyType: "solo-mum",
    familyLabel: "Solo Mum by Choice",
    name: "Natalie",
    age: 40,
    location: "London",
    tag: "Donor egg IVF",
    title: "I used donor eggs and I'm not ashamed of it",
    excerpt: "After three failed cycles with her own eggs, Natalie chose donor eggs. Her twins Evi and Rosa are two and a half — and she tells them their story regularly.",
    body: "After three failed IVF cycles with my own eggs, my consultant suggested donor eggs. I was devastated, then slowly curious, then — after reading a dozen stories from women who'd been exactly here — at peace with it. My twins Evi and Rosa are two and a half. I tell them their origin story regularly, and they think it's completely normal. Because it is.",
    treatment: "Donor egg IVF",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Woman smiling in warm light",
  },
  {
    id: "tom-marcus-elliot",
    familyType: "same-sex-male",
    familyLabel: "Same-Sex Male Couple",
    name: "Tom & Marcus",
    age: 38,
    location: "London",
    tag: "Same-sex male couple",
    title: "We met our surrogate at a barbecue. She changed our lives.",
    excerpt: "A UK surrogacy journey that took 18 months, built a profound friendship, and ended with their son Elliot — who now calls their surrogate his auntie.",
    body: "We'd been matched through a surrogacy organisation for six months when we met Jo at an introductory event. By the end of the night we knew she was right. Three months later, treatment started. Our son Elliot was born in 2023. Jo is his auntie. It's messier and more beautiful than we expected.",
    treatment: "IVF, UK surrogate",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Two men with a young child, smiling",
  },
  {
    id: "emma-david-isla",
    familyType: "heterosexual-couple",
    familyLabel: "Heterosexual Couple",
    name: "Emma & David",
    age: 34,
    location: "London",
    tag: "Unexplained infertility",
    title: "Two years of trying. Three months of IVF. One daughter.",
    excerpt: "Everything came back 'normal'. Unexplained infertility is its own kind of maddening. First IVF cycle, first transfer — their daughter Isla is 18 months.",
    body: "We tried naturally for two years before getting investigated. Everything came back 'normal'. Unexplained infertility is its own kind of maddening — there's nothing to fix, nothing to point at. Our consultant recommended IVF. First cycle, first transfer. Our daughter Isla is 18 months.",
    treatment: "IVF × 1",
    image: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Couple embracing warmly",
  },
  {
    id: "james-oscar",
    familyType: "single-dad",
    familyLabel: "Solo Dad by Choice",
    name: "James",
    age: 42,
    location: "London",
    tag: "Solo dad by choice",
    title: "I decided at 40. My son was born at 43.",
    excerpt: "Two years of preparation, the right surrogate, one IVF cycle. James on what it means to become a solo father — and why every conversation mattered.",
    body: "The decision took me two years to fully commit to. Not because I doubted it — I've always wanted to be a father — but because I needed to understand what I was doing before I began. The matching process, the legal preparation, the IVF cycle — all of it was manageable because I'd done the groundwork. Oscar is three. He is everything.",
    treatment: "IVF with donor eggs, UK surrogate",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Man smiling warmly, portrait",
  },
];

export const FEATURED_STORIES = ALL_STORIES.slice(0, 3);
