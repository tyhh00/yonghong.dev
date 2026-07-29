import { site } from "@/lib/site";
import { ageFrom } from "@/lib/utils";
import { Container, Section, MonoLabel } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { ImageSlot } from "@/components/placeholder";

const facts = [
  { k: "Based in", v: "Singapore" },
  { k: "Studying", v: "Computer Science, NUS (Y2)" },
  { k: "Working on", v: "AI agents @ True North · Kavela" },
  { k: "Focus", v: "AI systems · Full-stack · Blockchain" },
];

export function About() {
  const age = ageFrom(site.birthYear);
  return (
    <Section id="about" className="border-t border-line">
      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Reveal>
              <MonoLabel index="00">Who</MonoLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <ImageSlot
                alt={`Portrait of ${site.name}`}
                label="Drop portrait here"
                className="mt-6 aspect-[4/5] w-full"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5">
                {facts.map((f) => (
                  <div key={f.k}>
                    <dt className="mono-label">{f.k}</dt>
                    <dd className="mt-1.5 text-sm text-fg">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="md:col-span-7 md:pt-10">
            <Reveal>
              <p className="text-balance text-2xl font-medium leading-snug tracking-tight sm:text-3xl md:text-[2.15rem]">
                I&apos;ve been shipping software since I was fifteen, long
                before anyone paid me to. That head start is the whole story.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 max-w-prose space-y-5 text-[15px] leading-relaxed text-fg-muted sm:text-base">
                <p>
                  At fifteen, I ran a Minecraft server that peaked at 250
                  players. Through a game-development diploma and two years of
                  National
                  Service, I turned downtime into twelve-hour coding days,
                  teaching myself web development, e-commerce, and blockchain
                  from scratch.
                </p>
                <p>
                  That compounded fast. In early 2025 I built{" "}
                  <span className="text-fg">Crystara</span>, the first NFT
                  marketplace on Supra, took first place at its hackathon, and
                  raised a six-figure round. Today, at {age}, I&apos;m an AI
                  engineer at <span className="text-fg">True North</span>,
                  building <span className="text-fg">Kavela</span>, and studying
                  Computer Science at NUS.
                </p>
                <p>
                  The throughline: I don&apos;t wait for permission to build. I
                  find the frontier, teach myself what it takes, and ship
                  something real.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
