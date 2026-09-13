import type { Metadata } from "next";

// Metadata for /stories. Child routes (/stories/share, /stories/[id]) set
// their own.
export const metadata: Metadata = {
  title: "Stories | CairnFertility",
  description:
    "We're collecting real accounts from people at every stage of fertility treatment, including people still trying and people whose treatment didn't work. We publish them only with the writer's consent.",
};

export default function StoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
