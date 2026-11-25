import { Container, GoldDivider } from "@/components/ui";
import { content } from "@/content/ar";

import { LogoLockup } from "./LogoLockup";

const { footer } = content;

export function Footer() {
  return (
    <footer className="relative border-t border-mist/10 pt-14 pb-10">
      <Container className="flex flex-col items-center gap-6 text-center">
        <LogoLockup />
        <p className="text-sm text-mist/60">{footer.tagline}</p>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {footer.links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm text-mist/60 transition-colors hover:text-amber">
              {l.label}
            </a>
          ))}
        </nav>
        <GoldDivider className="opacity-60" />
        <p className="text-xs text-mist/40">{footer.rights}</p>
      </Container>
    </footer>
  );
}
