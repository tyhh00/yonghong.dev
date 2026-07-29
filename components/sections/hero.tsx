import Link from "next/link";
import { site } from "@/lib/site";
import { ageFrom } from "@/lib/utils";
import { FlowField } from "@/components/flow-field";
import { Container, MonoLabel } from "@/components/ui";
import { Reveal, MaskText, Magnetic } from "@/components/motion";
import { socialIcons, IconArrowRight, IconArrowUpRight } from "@/components/icons";

export function Hero() {
  const age = ageFrom(site.birthYear);
  return (
    <section className="relative flex min-h-svh flex-col justify-center overflow-hidden pb-16 pt-16">
      <FlowField className="opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />

      {/* corner coordinates — technical detail */}
      <div className="pointer-events-none absolute left-5 top-20 hidden sm:block">
        <span className="mono-label text-fg-subtle">01.396°N</span>
      </div>
      <div className="pointer-events-none absolute right-5 top-20 hidden text-right sm:block">
        <span className="mono-label text-fg-subtle">103.849°E</span>
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl">
          <Reveal>
            <MonoLabel>
              {site.name} · {site.role}
            </MonoLabel>
          </Reveal>

          <h1 className="mt-6 text-balance text-[clamp(2.6rem,11vw,5rem)] font-semibold leading-[0.95] tracking-tight">
            <MaskText text="Building at the" className="block text-fg" />
            <MaskText
              text="frontier of AI."
              className="block text-accent text-glow"
              delay={0.15}
            />
            <MaskText
              text="One real system at a time."
              className="block text-fg-muted"
              delay={0.3}
            />
          </h1>

          <Reveal delay={0.5} className="mt-7 max-w-xl">
            <p className="text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
              I&apos;m {site.alias}, a {age}-year-old engineer from Singapore. I
              taught myself to ship, founded{" "}
              <span className="text-fg">Crystara</span>, and now build autonomous
              agents at <span className="text-fg">True North</span> and{" "}
              <span className="text-fg">Kavela</span>.
            </p>
          </Reveal>

          <Reveal delay={0.62} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link
                href="/#work"
                className="focus-ring group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-all duration-300 ease-expo hover:opacity-90"
              >
                See the work
                <IconArrowRight className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link
                href="/world"
                className="focus-ring group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium transition-all duration-300 ease-expo hover:border-fg/40 hover:bg-fg/[0.03]"
              >
                Enter my world
                <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Magnetic>
          </Reveal>

          <Reveal
            delay={0.74}
            className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="mono-label text-fg-muted">
              Currently · AI Engineer @ True North · Building Kavela · NUS CS Y2
            </span>
            <div className="flex items-center gap-1">
              {site.socials.map((s) => {
                const Icon = socialIcons[s.icon];
                return (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="focus-ring flex h-9 w-9 items-center justify-center rounded-full text-fg-subtle transition-colors hover:text-fg"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
