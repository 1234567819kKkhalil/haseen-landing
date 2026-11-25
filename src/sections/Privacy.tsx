import { EyeOff, HandHeart, LockKeyhole, Trash2 } from "lucide-react";

import { ShieldMark } from "@/components/brand/Logo";
import { Reveal, RevealItem, Section, SectionHeading } from "@/components/ui";
import { content } from "@/content/ar";

const { privacy } = content;
const icons = [LockKeyhole, HandHeart, EyeOff, Trash2];

export function Privacy() {
  return (
    <Section id="privacy">
      <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col items-center lg:items-start">
          <SectionHeading align="start" eyebrow={privacy.eyebrow} title={privacy.title} highlight={privacy.highlight} className="mb-8 items-center text-center lg:items-start lg:text-start" />
          <Reveal className="relative hidden lg:block">
            <div aria-hidden className="absolute -inset-16 bg-[radial-gradient(closest-side,rgb(106_18_176/0.45),transparent)]" />
            <ShieldMark className="relative h-56 w-auto animate-float drop-shadow-[0_30px_60px_rgb(106_18_176/0.7)]" />
          </Reveal>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {privacy.cards.map((c, i) => {
            const Icon = icons[i] ?? LockKeyhole;
            return (
              <RevealItem key={c.title} delay={0.08 * i} className="group surface card-hover p-6">
                <span className="icon-pop mb-4 grid size-11 place-items-center rounded-xl bg-amber/15 text-amber">
                  <Icon className="size-5" />
                </span>
                <h3 className="font-display text-sm font-semibold leading-snug sm:text-base">{c.title}</h3>
                <p className="mt-1.5 text-xs leading-6 text-mist/65 sm:text-[13px]">{c.text}</p>
              </RevealItem>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
