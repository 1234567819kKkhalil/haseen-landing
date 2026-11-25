import { Gamepad2, HeartHandshake, MessagesSquare } from "lucide-react";

import { GoldDivider, RevealItem, Section, SectionHeading } from "@/components/ui";
import { content } from "@/content/ar";

const { saudi } = content;
const icons = [MessagesSquare, Gamepad2, HeartHandshake];

export function MadeForSaudi() {
  return (
    <Section className="overflow-hidden">
      {/* royal backdrop */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-purple/25 to-transparent" />

      <div className="relative">
        <SectionHeading eyebrow={saudi.eyebrow} title={saudi.title} highlight={saudi.highlight} subtitle={saudi.subtitle} />
        <ul className="grid gap-5 md:grid-cols-3">
          {saudi.cards.map((c, i) => {
            const Icon = icons[i] ?? MessagesSquare;
            return (
              <RevealItem key={c.title} delay={0.1 * i} className="group surface card-hover p-7 text-center">
                <span className="icon-pop mx-auto mb-5 grid size-14 place-items-center rounded-2xl bg-amber/15 text-amber">
                  <Icon className="size-6" />
                </span>
                <h3 className="font-display text-sm font-semibold leading-snug sm:text-base">{c.title}</h3>
                <p className="mt-2 text-xs leading-6 text-mist/65 sm:text-[13px]">{c.text}</p>
              </RevealItem>
            );
          })}
        </ul>
        <GoldDivider className="mt-16" />
      </div>
    </Section>
  );
}
