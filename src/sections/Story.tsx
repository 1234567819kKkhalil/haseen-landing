"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { BrainCircuit, Gamepad2, Languages, RotateCcw, ShieldAlert, Target } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { ShieldMark } from "@/components/brand/Logo";
import { PhoneFrame } from "@/components/shared";
import { Reveal, RevealItem, Section, SectionHeading } from "@/components/ui";
import { content } from "@/content/ar";
import { cn } from "@/lib/cn";

const { story } = content;
const pointIcons = [BrainCircuit, Languages, Target];
const STEP_MS = 1500;

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [step, setStep] = useState(0); // number of visible messages; messages.length + 1 => alert
  const [run, setRun] = useState(0);
  const total = story.messages.length;

  useEffect(() => {
    if (!inView) return;
    setStep(0);
    const timers = Array.from({ length: total + 1 }, (_, i) =>
      setTimeout(() => setStep(i + 1), STEP_MS * (i + 1)),
    );
    return () => timers.forEach(clearTimeout);
  }, [inView, run, total]);

  const typing = inView && step < total;
  const nextFrom = story.messages[step]?.from;
  const showAlert = step > total;

  return (
    <Section id="protect" className="overflow-hidden">
      <div aria-hidden className="absolute -top-40 start-1/2 size-[720px] bg-[radial-gradient(closest-side,rgb(106_18_176/0.22),transparent)]" />
      <div className="relative grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="start"
            eyebrow={story.eyebrow}
            title={story.title}
            highlight={story.highlight}
            subtitle={story.subtitle}
            className="mb-10"
          />
          <ul className="flex flex-col gap-4">
            {story.points.map((p, i) => {
              const Icon = pointIcons[i] ?? Target;
              return (
                <RevealItem key={p.title} delay={0.1 * i} className="group surface card-hover flex gap-4 p-5">
                  <span className="icon-pop grid size-11 shrink-0 place-items-center rounded-2xl bg-amber/15 text-amber">
                    <Icon className="size-5" />
                  </span>
                  <span>
                    <span className="block font-display text-sm font-semibold leading-snug sm:text-base">{p.title}</span>
                    <span className="mt-1 block text-xs leading-6 text-mist/65 sm:text-[13px]">{p.text}</span>
                  </span>
                </RevealItem>
              );
            })}
          </ul>
        </div>

        <Reveal className="relative mx-auto" distance={40}>
          <div ref={ref} className="relative">
            <PhoneFrame dark>
              {/* game chat header */}
              <div className="bg-gradient-to-b from-fortress to-ink px-5 pt-11 pb-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-2xl bg-white/10 text-amber">
                    <Gamepad2 className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{story.chatTitle}</p>
                    <p className="text-[11px] text-mist/50">{story.chatSub}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 px-4 pt-4">
                <AnimatePresence>
                  {story.messages.slice(0, step).map((m, i) => (
                    <motion.div
                      key={`${run}-${i}`}
                      initial={{ opacity: 0, y: 14, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        "max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
                        m.from === "child"
                          ? "self-end rounded-es-md bg-orchid text-white"
                          : "self-start rounded-ee-md bg-white/10 text-mist",
                        // the dangerous message gets a gold outline once detected
                        showAlert && i === total - 1 && "ring-2 ring-amber/80",
                      )}
                    >
                      {m.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {typing && (
                  <div
                    className={cn(
                      "flex w-14 items-center justify-center gap-1 rounded-2xl px-3 py-3",
                      nextFrom === "child" ? "self-end bg-orchid/60" : "self-start bg-white/10",
                    )}
                  >
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                        className="size-1.5 rounded-full bg-mist"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Haseen alert drops in like a system notification */}
              <AnimatePresence>
                {showAlert && (
                  <motion.div
                    key={`alert-${run}`}
                    initial={{ opacity: 0, y: -80, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ type: "spring", stiffness: 220, damping: 20 }}
                    className="absolute inset-x-3 top-10 z-20 rounded-2xl border border-amber/40 bg-ink/90 p-3 shadow-[0_20px_50px_-10px_rgb(252_165_3/0.45)]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white">
                        <ShieldMark className="h-7 w-auto" />
                      </span>
                      <div className="min-w-0">
                        <p className="flex items-center gap-1.5 text-[13px] font-semibold text-amber">
                          <ShieldAlert className="size-3.5" />
                          {story.alertTitle}
                        </p>
                        <p className="truncate text-[11px] text-mist/70">{story.alertBody}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </PhoneFrame>

            <button
              type="button"
              onClick={() => setRun((r) => r + 1)}
              className="mx-auto mt-6 flex items-center gap-2 rounded-full border border-mist/15 px-4 py-2 text-xs text-mist/70 transition-colors hover:border-amber/50 hover:text-amber"
            >
              <RotateCcw className="size-3.5" />
              {story.replay}
            </button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
