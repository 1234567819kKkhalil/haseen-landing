"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Reveal, Section, SectionHeading } from "@/components/ui";
import { content } from "@/content/ar";
import { cn } from "@/lib/cn";

const { faq } = content;

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq">
      <SectionHeading eyebrow={faq.eyebrow} title={faq.title} highlight={faq.highlight} />
      <Reveal className="mx-auto flex max-w-3xl flex-col gap-3">
        {faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.q}
              className={cn(
                "surface overflow-hidden rounded-2xl! transition-colors duration-300",
                isOpen && "border-amber/35",
              )}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start"
              >
                <span className="font-display text-sm font-semibold leading-snug sm:text-[15px]">{item.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border transition-colors",
                    isOpen ? "border-amber bg-amber text-fortress" : "border-mist/20 text-mist/70",
                  )}
                >
                  <Plus className="size-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="px-6 pb-5 text-[13px] leading-7 text-mist/70">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </Reveal>
    </Section>
  );
}
