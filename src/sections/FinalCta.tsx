import { ShieldMark } from "@/components/brand/Logo";
import { StoreButtons } from "@/components/shared";
import { Container, Reveal } from "@/components/ui";
import { content } from "@/content/ar";

const { finalCta } = content;

export function FinalCta() {
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[2.5rem] border border-amber/30 bg-gradient-to-b from-orchid via-purple to-fortress px-6 py-16 text-center sm:px-16">
          <div aria-hidden className="bg-safety absolute inset-0 opacity-90" />
                    <div aria-hidden className="absolute inset-x-0 -bottom-48 mx-auto size-[560px] bg-[radial-gradient(closest-side,rgb(252_165_3/0.22),transparent)]" />

          <div className="relative flex flex-col items-center">
            <ShieldMark className="mb-8 h-24 w-auto animate-float drop-shadow-[0_20px_40px_rgb(0_0_0/0.5)]" />
            <h2 className="text-xl leading-snug font-bold text-balance sm:text-2xl">
              {finalCta.title}
              <br />
              <span className="text-gold">{finalCta.highlight}</span>
            </h2>
            <p className="mt-4 max-w-lg text-[13px] leading-7 text-mist/80 sm:text-sm">{finalCta.subtitle}</p>
            <StoreButtons className="mt-10 justify-center" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
