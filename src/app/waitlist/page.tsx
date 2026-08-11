import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { Section } from "@/components/section";
import { WaitlistForm } from "@/components/waitlist-form";

export const metadata: Metadata = {
  title: "Join the Waitlist | CairnFertility",
  description: "Be first to know when the CairnFertility community opens: find others at your stage, hear from people who've been through it, and local meetups.",
};

export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto px-6 md:px-12 lg:px-16">
        <SiteNav />
      </div>

      <Section band={0} padding="py-12 md:py-16" backdrop={{ shape: "dots" }}>
        <div className="max-w-2xl">
          <span
            className="inline-block text-[11px] font-[700] uppercase tracking-[0.16em] font-sans rounded-full px-3 py-1 mb-5"
            style={{ background: "#C5E600", color: "#1A3A25" }}
          >
            Community waitlist
          </span>
          <h1
            className="font-sans font-bold text-foreground mb-4"
            style={{ fontSize: "clamp(2.75rem, 5vw, 5rem)", lineHeight: 1.06 }}
          >
            You&rsquo;re not doing this alone.
          </h1>
          <p className="text-[16px] font-sans text-muted leading-[1.65]">
            We&apos;re building a place to find others at your stage, hear from people who have been through it, and set up local meetups. Leave your email and you&apos;ll be first to know when it opens.
          </p>
        </div>
      </Section>

      <Section band={1} padding="py-12 md:py-16">
        <div className="max-w-2xl">
          <WaitlistForm />
        </div>
      </Section>
    </main>
  );
}
