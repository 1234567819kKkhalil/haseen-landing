import { Smartphone, UserPlus, Users } from "lucide-react";

import { RevealItem, Section, SectionHeading } from "@/components/ui";
import { content } from "@/content/ar";

const { how } = content;
const icons = [UserPlus, Users, Smartphone];
const numerals = ["١", "٢", "٣"];

export function HowItWorks() {
  return (
    <Section id="how">
      <SectionHeading eyebrow={how.eyebrow} title={how.title} highlight={how.highlight} />

      <ol className="relative grid gap-6 md:grid-cols-3">
        {/* gold thread connecting the steps */}
        <span aria-hidden className="rule-gold absolute inset-x-[16%] top-[4.5rem] hidden md:block" />
        {how.steps.map((step, i) => {
          const Icon = icons[i] ?? UserPlus;
          return (
            <RevealItem key={step.title} delay={0.12 * i} className="group relative flex flex-col items-center text-center">
              {/* number badge */}
              <div className="relative mb-6 grid size-28 place-items-center rounded-3xl overflow-hidden border border-amber/30 bg-gradient-to-b from-orchid/50 to-fortress/40 transition-transform duration-500 group-hover:-translate-y-2">
                <div aria-hidden className="bg-safety absolute inset-0" />
                <span className="relative font-display text-3xl font-bold text-amber">{numerals[i]}</span>
                <span className="absolute bottom-3 grid size-9 place-items-center rounded-xl bg-night/70 text-mist">
                  <Icon className="size-4" />
                </span>
              </div>
              <h3 className="font-display text-sm font-semibold leading-snug sm:text-base">{step.title}</h3>
              <p className="mt-2 max-w-xs text-xs leading-6 text-mist/65 sm:text-[13px]">{step.text}</p>
            </RevealItem>
          );
        })}
      </ol>
    </Section>
  );
}
