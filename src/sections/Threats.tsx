"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Ban, BellRing, Fish, Frown, MessageSquareWarning, ScanSearch, Siren, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Reveal, Section, SectionHeading } from "@/components/ui";
import { content } from "@/content/ar";
import { cn } from "@/lib/cn";

const { threats } = content;
type ThreatKey = (typeof threats.items)[number]["key"];

const icons: Record<ThreatKey, LucideIcon> = {
  extortion: Siren,
  grooming: Fish,
  bullying: Frown,
  threats: MessageSquareWarning,
  profanity: Ban,
};

export function Threats() {
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState<"scan" | "done">("scan");
  const item = threats.items[active] ?? threats.items[0];
  const Icon = icons[item.key];

  // every time a threat is chosen: scan → detected
  useEffect(() => {
    setPhase("scan");
    const t = setTimeout(() => setPhase("done"), 1300);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <Section className="bg-gradient-to-b from-transparent via-fortress/40 to-transparent">
      <SectionHeading
        eyebrow={threats.eyebrow}
        title={threats.title}
        highlight={threats.highlight}
        subtitle={threats.subtitle}
      />

      <Reveal className="mx-auto max-w-4xl">
        {/* tabs */}
        <div role="tablist" className="mb-8 flex flex-wrap justify-center gap-2">
          {threats.items.map((t, i) => {
            const TabIcon = icons[t.key];
            const selected = i === active;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(i)}
                className={cn(
                  "relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                  selected ? "text-fortress" : "text-mist/70 hover:text-white",
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="threat-pill"
                    className="absolute inset-0 rounded-full bg-amber"
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  />
                )}
                {!selected && <span className="absolute inset-0 rounded-full border border-mist/15" />}
                <TabIcon className="relative size-4" />
                <span className="relative">{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* panel */}
        <div className="surface relative overflow-hidden p-6 sm:p-10">
          <div aria-hidden className="bg-safety absolute inset-0 opacity-60" />
          <AnimatePresence mode="wait">
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="relative grid items-center gap-8 md:grid-cols-[1fr_1.15fr]"
            >
              <div>
                <span className="mb-4 grid size-14 place-items-center rounded-2xl bg-amber/15 text-amber">
                  <Icon className="size-7" />
                </span>
                <h3 className="font-display text-base font-bold leading-snug sm:text-lg">{item.label}</h3>
                <p className="mt-2 text-[13px] leading-7 text-mist/70">{item.desc}</p>
              </div>

              <div className="rounded-3xl border border-mist/10 bg-night/60 p-5">
                {/* incoming message */}
                <div className="relative overflow-hidden rounded-2xl rounded-ee-md bg-white/10 px-4 py-3 text-[15px] leading-relaxed text-mist">
                  “{item.sample}”
                  {phase === "scan" && (
                    <motion.span
                      aria-hidden
                      initial={{ left: "-30%" }}
                      animate={{ left: "110%" }}
                      transition={{ duration: 1.1, ease: "easeInOut" }}
                      className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-amber/40 to-transparent"
                    />
                  )}
                </div>

                <div className="mt-4 min-h-[88px]">
                  <AnimatePresence mode="wait">
                    {phase === "scan" ? (
                      <motion.p
                        key="scan"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-sm text-mist/60"
                      >
                        <ScanSearch className="size-4 animate-pulse text-amber" />
                        {threats.scanning}
                      </motion.p>
                    ) : (
                      <motion.div
                        key="done"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-2.5"
                      >
                        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-amber px-3 py-1 text-xs font-bold text-fortress">
                          {threats.detected} · {item.label}
                        </span>
                        <span className="flex items-center gap-2 text-[13px] text-mist/75">
                          <BellRing className="size-4 text-amber" />
                          {threats.sent}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </Section>
  );
}
