import type { Metadata } from "next";

// /stories/page.tsx is a client component (it filters in state), so its
// metadata lives here.
export const metadata: Metadata = {
  title: "Stories | CairnFertility",
  description:
    "Illustrative stories of building a family through fertility treatment — solo mums, solo dads, two mums, two dads, and couples — while we collect real, consented accounts.",
};

export default function StoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
