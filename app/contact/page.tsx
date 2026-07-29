import type { Metadata } from "next";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactForm } from "@/components/contact-form";
import { Container, MonoLabel } from "@/components/ui";
import { socialIcons, IconArrowUpRight } from "@/components/icons";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Get in touch with ${site.name}. Open to ambitious problems in AI, systems, and product.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="pt-28 pb-24 sm:pt-32">
      <Container>
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]}
        />

        <div className="mt-10 grid gap-14 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <MonoLabel index="00">Contact</MonoLabel>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
              Let&apos;s talk.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-fg-muted">
              Whether it&apos;s a role, a collaboration, or an idea worth
              building. Drop me a note. Your message comes straight to my inbox;
              I usually reply within a day or two.
            </p>

            <div className="mt-10 space-y-6">
              <div>
                <MonoLabel tick={false}>Based in</MonoLabel>
                <p className="mt-1.5 text-fg">{site.location}</p>
              </div>
              <div>
                <MonoLabel tick={false}>Elsewhere</MonoLabel>
                <div className="mt-3 flex flex-col gap-2.5">
                  {site.socials.map((s) => {
                    const Icon = socialIcons[s.icon];
                    return (
                      <a
                        key={s.href}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring group inline-flex w-fit items-center gap-2.5 text-sm text-fg-muted transition-colors hover:text-fg"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{s.handle}</span>
                        <IconArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="panel p-7 sm:p-9">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
