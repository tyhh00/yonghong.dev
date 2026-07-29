import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Journey } from "@/components/sections/journey";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import { Numbers } from "@/components/sections/numbers";
import { WorldCta } from "@/components/sections/world-cta";
import { ContactCta } from "@/components/sections/contact-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Journey />
      <ProjectsPreview />
      <Numbers />
      <WorldCta />
      <ContactCta />
    </>
  );
}
