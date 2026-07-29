import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost, getPostSlugs } from "@/lib/blog";
import { formatLongDate } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Mdx } from "@/components/mdx";
import { Container, Tag } from "@/components/ui";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <article className="pt-28 pb-24 sm:pt-32">
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.description,
          slug: post.slug,
          date: post.date,
          tags: post.tags,
        })}
      />
      <Container>
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Writing", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]}
        />

        <header className="mx-auto mt-10 max-w-prose">
          <div className="flex flex-wrap items-center gap-3">
            <span className="mono-label text-fg-subtle">
              {formatLongDate(post.date)}
            </span>
            <span className="mono-label text-fg-subtle">·</span>
            <span className="mono-label text-fg-subtle">{post.readingTime}</span>
          </div>
          <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-fg-muted">
            {post.description}
          </p>
          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          )}
        </header>

        <div className="mx-auto mt-12 border-t border-line pt-10">
          <Mdx source={post.content} />
        </div>
      </Container>
    </article>
  );
}
