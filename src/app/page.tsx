import { Footer, Header } from "@/components/shared";
import { GoldDivider } from "@/components/ui";
import {
  Faq,
  Family,
  FinalCta,
  Hero,
  HowItWorks,
  MadeForSaudi,
  Privacy,
  Story,
  Threats,
} from "@/sections";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <GoldDivider />
        <Story />
        <Threats />
        <Family />
        <HowItWorks />
        <MadeForSaudi />
        <Privacy />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
