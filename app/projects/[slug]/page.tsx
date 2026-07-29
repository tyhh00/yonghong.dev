import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProject, projects, projectSlugs } from "@/lib/projects";
import { formatMonthYear } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { creativeWorkSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container, MonoLabel, Tag, ButtonLink, Divider } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { ImageSlot } from "@/components/placeholder";
import { IconCheck, IconArrowRight } from "@/components/icons";

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const p = getProject(params.slug);
  if (!p) return {};
  return buildMetadata({
    title: p.name,
    description: p.summary,
    path: `/projects/${p.slug}`,
    type: "article",
  });
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];
  const period =
    formatMonthYear(project.period.start + "-01") +
    (project.period.end ? ` to ${formatMonthYear(project.period.end + "-01")}` : " · Now");

  return (
    <article className="pt-28 sm:pt-32">
      <JsonLd data={creativeWorkSchema(project)} />
      <Container>
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Work", path: "/#work" },
            { name: project.name, path: `/projects/${project.slug}` },
          ]}
        />

        {/* Hero */}
        <header className="mt-10 border-b border-line pb-12">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <Tag>{project.category}</Tag>
              <Tag>{project.status}</Tag>
              <span className="mono-label text-fg-subtle">{period}</span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 text-balance text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl md:text-7xl">
              {project.name}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-balance text-lg text-fg-muted sm:text-xl">
              {project.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.url && (
                <ButtonLink href={project.url} variant="accent" arrow="up-right">
                  Visit {project.name}
                </ButtonLink>
              )}
              {project.links
                .filter((l) => l.href !== project.url)
                .map((l) => (
                  <ButtonLink key={l.href} href={l.href} variant="ghost" arrow="up-right">
                    {l.label}
                  </ButtonLink>
                ))}
            </div>
          </Reveal>
        </header>

        {/* Cover */}
        <Reveal delay={0.1}>
          <ImageSlot
            src={project.images.cover}
            alt={`${project.name} cover`}
            label={`${project.name} cover image`}
            className="mt-12 aspect-[16/9] w-full"
            priority
          />
        </Reveal>

        {/* Body */}
        <div className="mt-16 grid gap-12 pb-24 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <MonoLabel index="01">Overview</MonoLabel>
            <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-fg-muted sm:text-base">
              {project.synopsis.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="mt-12">
              <MonoLabel index="02">Highlights</MonoLabel>
              <ul className="mt-6 space-y-3">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="text-[15px] leading-relaxed text-fg">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="md:col-span-5">
            <div className="panel p-7 md:sticky md:top-24">
              <MonoLabel tick={false}>Role</MonoLabel>
              <p className="mt-2 text-lg font-medium">{project.role}</p>

              <Divider className="my-6" />

              <MonoLabel tick={false}>Stack</MonoLabel>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>

              {project.metrics && (
                <>
                  <Divider className="my-6" />
                  <MonoLabel tick={false}>Impact</MonoLabel>
                  <dl className="mt-4 space-y-5">
                    {project.metrics.map((m) => (
                      <div key={m.label}>
                        <dt className="font-display text-3xl font-semibold leading-none tracking-tight">
                          {m.value}
                        </dt>
                        <dd className="mono-label mt-2 leading-relaxed">{m.label}</dd>
                      </div>
                    ))}
                  </dl>
                </>
              )}
            </div>
          </aside>
        </div>
      </Container>

      {/* Next project */}
      <div className="border-t border-line">
        <Container>
          <Link
            href={`/projects/${next.slug}`}
            className="focus-ring group flex items-center justify-between gap-4 py-12"
          >
            <div>
              <span className="mono-label text-fg-subtle">Next project</span>
              <p className="mt-2 font-display text-3xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-4xl">
                {next.name}
              </p>
            </div>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover:border-accent group-hover:text-accent">
              <IconArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </Container>
      </div>
    </article>
  );
}
