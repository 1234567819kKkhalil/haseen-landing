"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

import { ButtonLink, Container } from "@/components/ui";
import { content } from "@/content/ar";
import { cn } from "@/lib/cn";

import { LogoLockup } from "./LogoLockup";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 pt-3"
    >
      <Container>
        <div
          className={cn(
            "flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-6",
            scrolled
              ? "border-mist/10 bg-night/70 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.8)] backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <a href="#top" aria-label="حصين — الرئيسية">
            <LogoLockup latin={false} />
          </a>
          <nav className="hidden items-center gap-7 lg:flex">
            {content.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative text-[13px] font-medium text-mist/80 transition-colors after:absolute after:-bottom-1.5 after:start-0 after:h-px after:w-0 after:bg-amber after:transition-all hover:text-white hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <ButtonLink href="#download" size="md">
            {content.navCta}
          </ButtonLink>
        </div>
      </Container>
    </motion.header>
  );
}
