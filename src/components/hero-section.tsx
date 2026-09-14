import { Play, ArrowRight } from "lucide-react";
import Image from "next/image";
import { SiteNav } from "./site-nav";
import { Button, buttonVariants, Badge } from "@/components/ui";

const EASE = "cubic-bezier(0.16,1,0.3,1)";

export function HeroSection() {
  return (
    <section className="relative bg-bg-primary">
      <div className="px-6 md:px-10">
        <SiteNav />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_45vw] min-h-[88vh]">

        {/* Left — copy */}
        <div
          style={{ animation: `kleo-fade-in-up 0.75s ${EASE} both` }}
          className="flex flex-col justify-center px-6 md:px-10 py-16 lg:py-24"
        >
          <div className="mb-7">
            <Badge color="gray" type="bordered">Solo Parent By Choice</Badge>
          </div>

          <h1
            className="font-display font-bold text-text-primary mb-8"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
            }}
          >
            Building your family
            <br />
            <em className="not-italic text-text-brand-secondary">
              on your own terms
            </em>
          </h1>

          <p className="text-md text-text-secondary leading-relaxed mb-10 font-sans" style={{ maxWidth: "42ch" }}>
            Your comprehensive guide to solo parenthood. From choosing a donor
            and navigating IVF to prepping for birth and thriving as a solo
            parent by choice.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/clinics"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Find a clinic
              <ArrowRight className="h-4 w-4" />
            </a>

            <Button
              variant="secondary"
              size="lg"
              iconLeading={
                <span className="h-5 w-5 rounded-full bg-bg-brand-primary flex items-center justify-center shrink-0">
                  <Play className="h-2.5 w-2.5 text-fg-brand-primary fill-fg-brand-primary" />
                </span>
              }
            >
              Alice&rsquo;s story
            </Button>
          </div>
        </div>

        {/* Right — image with signature KLEO top-left radius */}
        <div
          style={{ animation: `kleo-fade-in 1.1s ${EASE} 0.1s both`, minHeight: "420px" }}
          className="relative overflow-hidden rounded-tl-[200px]"
        >
          <Image
            src="/images/hero-main.jpg"
            alt="A mother with her newborn, the beginning of the solo parenthood journey"
            fill
            className="object-cover"
            priority
          />
        </div>

      </div>
    </section>
  );
}
