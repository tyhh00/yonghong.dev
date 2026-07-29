import Link from "next/link";
import { Container, MonoLabel } from "@/components/ui";
import { Reveal, Magnetic } from "@/components/motion";
import { IconArrowUpRight } from "@/components/icons";

/** Teaser band for the interactive 3D world at /world. */
export function WorldCta() {
  return (
    <section className="relative scroll-mt-24 overflow-hidden border-t border-line py-24 sm:py-32">
      {/* isometric block motif */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(30deg, rgb(var(--grid) / var(--grid-opacity)) 1px, transparent 1px), linear-gradient(-30deg, rgb(var(--grid) / var(--grid-opacity)) 1px, transparent 1px)",
          backgroundSize: "42px 24px",
          maskImage:
            "radial-gradient(ellipse at 70% 50%, black 10%, transparent 70%)",
        }}
      />
      <Container className="relative">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <div>
              <MonoLabel index="04">Interactive</MonoLabel>
              <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
                Walk through my work as a{" "}
                <span className="text-accent text-glow">little world.</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-fg-muted">
                A hand-built voxel island where every monument is a chapter.
                Click into Crystara, Kavela, True North and more. The whole
                journey, rendered in blocks.
              </p>
              <Magnetic>
                <Link
                  href="/world"
                  className="focus-ring group mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-fg transition-all duration-300 ease-expo hover:brightness-110"
                >
                  Enter the world
                  <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Magnetic>
            </div>
          </Reveal>

          {/* decorative isometric stack */}
          <Reveal delay={0.1} className="hidden justify-center md:flex">
            <IsoStack />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function IsoStack() {
  // A small CSS/SVG isometric cube cluster — a taste of the world.
  return (
    <svg viewBox="0 0 320 300" className="h-72 w-80" fill="none">
      {cubes.map((c, i) => (
        <g
          key={i}
          className="animate-fade-up"
          style={{ animationDelay: `${i * 90}ms` }}
        >
          <path d={c.top} className="fill-accent/25 stroke-accent" strokeWidth={1} />
          <path d={c.left} className="fill-fg/[0.05] stroke-line" strokeWidth={1} />
          <path d={c.right} className="fill-fg/[0.02] stroke-line" strokeWidth={1} />
        </g>
      ))}
    </svg>
  );
}

// Precomputed isometric cube faces at a few grid positions.
function isoCube(cx: number, cy: number, s = 40, h = 34) {
  const top = `M${cx} ${cy} L${cx + s} ${cy + s / 2} L${cx} ${cy + s} L${cx - s} ${cy + s / 2} Z`;
  const left = `M${cx - s} ${cy + s / 2} L${cx} ${cy + s} L${cx} ${cy + s + h} L${cx - s} ${cy + s / 2 + h} Z`;
  const right = `M${cx + s} ${cy + s / 2} L${cx} ${cy + s} L${cx} ${cy + s + h} L${cx + s} ${cy + s / 2 + h} Z`;
  return { top, left, right };
}
const cubes = [
  isoCube(160, 40),
  isoCube(120, 66),
  isoCube(200, 66),
  isoCube(160, 92),
  isoCube(80, 92),
  isoCube(240, 92),
];
