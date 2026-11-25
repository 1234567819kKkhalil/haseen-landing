"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

import { LockScreenPhone, StoreButtons } from "@/components/shared";
import { Container } from "@/components/ui";
import { content } from "@/content/ar";

const { hero } = content;
const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pb-28">
      {/* backdrop: royal glow + child-safety icon pattern fading out */}
      <div aria-hidden className="glow-royal absolute inset-0" />
      <div
        aria-hidden
        className="bg-safety absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]"
      />

      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
        {/* copy */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-start">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-4 py-1.5 text-xs font-semibold text-amber"
          >
            <Sparkles className="size-3.5" />
            {hero.eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="text-[1.4rem] leading-[1.4] font-bold text-balance sm:text-3xl sm:leading-[1.35] md:text-[2.15rem]"
          >
            {hero.titleStart} <span className="text-gold">{hero.titleHighlight}</span>
            <br />
            <span className="text-mist/90">{hero.titleEnd}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease }}
            className="mt-4 max-w-md text-[13px] leading-7 text-mist/80 sm:text-sm sm:leading-7"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            id="download"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
            className="mt-9 scroll-mt-32"
          >
            <StoreButtons className="justify-center lg:justify-start" />
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.55 } } }}
            className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 lg:justify-start"
          >
            {hero.bullets.map((b) => (
              <motion.li
                key={b}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                className="flex items-center gap-2 text-[13px] text-mist/75"
              >
                <CheckCircle2 className="size-4 text-amber" />
                {b}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* visual: the parent's lock screen receiving Haseen notifications */}
        <LockScreenPhone />
      </Container>
    </section>
  );
}
