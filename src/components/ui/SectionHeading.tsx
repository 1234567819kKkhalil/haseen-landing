import { cn } from "@/lib/cn";

import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "center" | "start";
  className?: string;
}

/** Gold eyebrow between two hairlines, a display heading with a shimmering gold word, muted subtitle. */
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal
      className={cn(
        "mb-14 flex max-w-2xl flex-col gap-4",
        centered ? "mx-auto items-center text-center" : "items-start text-start",
        className,
      )}
    >
      <span className="inline-flex items-center gap-3 text-xs font-semibold text-amber">
        <span className="h-px w-8 bg-gradient-to-r from-amber/70 to-transparent" />
        {eyebrow}
        {centered && <span className="h-px w-8 bg-gradient-to-l from-amber/70 to-transparent" />}
      </span>
      <h2 className="text-lg leading-snug font-bold text-balance sm:text-2xl">
        {title} {highlight && <span className="text-gold">{highlight}</span>}
      </h2>
      {subtitle && <p className="text-[13px] leading-7 text-mist/70 sm:text-sm">{subtitle}</p>}
    </Reveal>
  );
}
