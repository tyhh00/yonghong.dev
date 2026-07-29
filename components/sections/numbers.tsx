import { Container, MonoLabel } from "@/components/ui";
import { Stagger, StaggerItem } from "@/components/motion";
import { ageFrom } from "@/lib/utils";

const stats = [
  { value: "250", label: "Peak concurrent players, age 15" },
  { value: "1st", label: "Supra SuperMovers hackathon" },
  { value: "6-fig", label: "Raised for Crystara" },
  { value: "4+", label: "Products shipped end-to-end" },
];

export function Numbers() {
  const years = ageFrom(2018); // years since the first server
  return (
    <section className="relative scroll-mt-24 border-t border-line py-24 sm:py-32">
      <Container>
        <div className="panel overflow-hidden">
          <div className="grid gap-px bg-line sm:grid-cols-2">
            {/* Left: framing + bar viz */}
            <div className="bg-bg-elev p-8 sm:p-10">
              <MonoLabel index="03">By the numbers</MonoLabel>
              <p className="mt-5 max-w-md text-balance text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
                {years}+ years of building, most of it before it was a job.
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-fg-muted">
                The habit started early and never stopped. A record of shipping
                real things, from a game server to production AI.
              </p>

              {/* years-of-building segmented bar */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <span className="mono-label">2018</span>
                  <span className="mono-label text-accent">
                    Building ever since
                  </span>
                  <span className="mono-label">{new Date().getFullYear()}</span>
                </div>
                <div className="mt-3 flex gap-1">
                  {Array.from({ length: years }).map((_, i) => (
                    <span
                      key={i}
                      className="h-8 flex-1 rounded-[3px] bg-accent"
                      style={{ opacity: 0.35 + (i / years) * 0.65 }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: stat grid */}
            <Stagger className="grid grid-cols-2 gap-px bg-line">
              {stats.map((s) => (
                <StaggerItem
                  key={s.label}
                  className="flex flex-col justify-between bg-bg-elev p-8 sm:p-10"
                >
                  <span className="font-display text-5xl font-semibold leading-none tracking-tight sm:text-6xl">
                    {s.value}
                  </span>
                  <span className="mono-label mt-6 max-w-[18ch] leading-relaxed">
                    {s.label}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Container>
    </section>
  );
}
