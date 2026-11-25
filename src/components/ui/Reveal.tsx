"use client";

import { motion, type HTMLMotionProps, type Transition } from "framer-motion";

interface RevealOptions {
  delay?: number;
  /** Vertical distance (px) the element travels while fading in. */
  distance?: number;
}

const transition = (delay: number): Transition => ({
  duration: 0.6,
  delay,
  ease: [0.22, 1, 0.36, 1],
});

const viewport = { once: true, margin: "-80px" } as const;

/** Fades and lifts its children the first time they enter the viewport. */
export function Reveal({ delay = 0, distance = 28, ...props }: RevealOptions & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={transition(delay)}
      {...props}
    />
  );
}

/** Same as `Reveal`, rendered as an `<li>` so lists stay semantic. */
export function RevealItem({ delay = 0, distance = 28, ...props }: RevealOptions & HTMLMotionProps<"li">) {
  return (
    <motion.li
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={transition(delay)}
      {...props}
    />
  );
}
