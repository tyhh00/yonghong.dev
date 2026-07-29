import Link from "next/link";
import { Container, MonoLabel } from "@/components/ui";
import { Reveal, Magnetic } from "@/components/motion";
import { IconArrowRight } from "@/components/icons";

export function ContactCta() {
  return (
    <section className="relative scroll-mt-24 border-t border-line py-28 sm:py-40">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <MonoLabel className="justify-center">Get in touch</MonoLabel>
          <h2 className="mx-auto mt-6 text-balance text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
            Have something worth building?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
            I&apos;m always up for ambitious problems in AI, systems, and
            product. Tell me what you&apos;re working on.
          </p>
          <div className="mt-10 flex justify-center">
            <Magnetic>
              <Link
                href="/contact"
                className="focus-ring group inline-flex items-center gap-2 rounded-full bg-fg px-7 py-3.5 text-sm font-medium text-bg transition-all duration-300 ease-expo hover:opacity-90"
              >
                Start a conversation
                <IconArrowRight className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5" />
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
