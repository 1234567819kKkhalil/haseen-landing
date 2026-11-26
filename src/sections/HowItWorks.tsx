import { ImageIcon, Smartphone, UserPlus, Users } from "lucide-react";
import type { ReactNode } from "react";
import Image from "next/image";

import { RevealItem, Section, SectionHeading } from "@/components/ui";
import { content } from "@/content/ar";
import { cn } from "@/lib/cn";

const { how } = content;
const icons = [UserPlus, Users, Smartphone];
const numerals = ["١", "٢", "٣"];

/**
 * Three steps, each shown as a real app screen inside a phone mockup.
 * Screens live in /public/how (step-1.png …); set `image` in content/ar.ts.
 */
export function HowItWorks() {
  return (
    <Section id="how" className="overflow-hidden">
      <SectionHeading eyebrow={how.eyebrow} title={how.title} highlight={how.highlight} />

      <ol className="relative grid gap-16 md:grid-cols-3 md:gap-8">
        {/* gold thread connecting the step numbers */}
        <span aria-hidden className="rule-gold absolute inset-x-[16%] top-5 hidden md:block" />

        {how.steps.map((step, i) => {
          const Icon = icons[i] ?? UserPlus;
          const middle = i === 1;
          return (
            <RevealItem key={step.title} delay={0.15 * i} className="group relative flex flex-col items-center text-center">
              {/* step number */}
              <span className="relative z-10 mb-8 grid size-10 place-items-center rounded-full border border-amber/50 bg-night font-display text-lg font-bold text-amber shadow-[0_0_0_6px_rgb(18_0_31)]">
                {numerals[i]}
              </span>

              {/* phone */}
              <div
                className={cn(
                  "relative transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-3",
                  middle && "md:-translate-y-6 md:group-hover:-translate-y-9",
                )}
              >
                <div
                  aria-hidden
                  className="absolute -inset-12 bg-[radial-gradient(closest-side,rgb(106_18_176/0.45),transparent)] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                />
                <ScreenPhone image={step.image} alt={step.alt} fallbackIcon={<Icon className="size-8" />} />
              </div>

              <h3 className="mt-8 font-display text-sm leading-snug font-semibold sm:text-base">{step.title}</h3>
              <p className="mt-2 max-w-xs text-xs leading-6 text-mist/65 sm:text-[13px]">{step.text}</p>
            </RevealItem>
          );
        })}
      </ol>
    </Section>
  );
}

/** Phone frame that shows a full app screenshot (the screenshot carries its own status bar). */
function ScreenPhone({
  image,
  alt,
  fallbackIcon,
}: {
  image: string | null;
  alt: string;
  fallbackIcon: ReactNode;
}) {
  return (
    <div className="relative w-[220px] rounded-[2.6rem] bg-gradient-to-b from-white/40 via-white/10 to-white/30 p-[3px] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] sm:w-[240px]">
      <div className="rounded-[2.45rem] bg-ink p-[7px]">
        <div className="relative aspect-[390/844] overflow-hidden rounded-[2.05rem] bg-mist">
          {image ? (
            <Image src={image} alt={alt} fill sizes="240px" className="object-cover object-top" />
          ) : (
            <div className="grid h-full place-items-center bg-gradient-to-b from-mist to-white text-purple/40">
              <span className="flex flex-col items-center gap-2">
                {fallbackIcon}
                <ImageIcon className="size-4" />
              </span>
            </div>
          )}
          {/* Dynamic Island */}
          <span aria-hidden className="absolute top-2 left-1/2 h-5 w-[72px] -translate-x-1/2 rounded-full bg-ink" />
          {/* glass reflection */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/0.18)_0%,transparent_35%)]"
          />
        </div>
      </div>
    </div>
  );
}
