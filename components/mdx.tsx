import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { ReactNode } from "react";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

const components = {
  h2: (p: { children?: ReactNode }) => (
    <h2 className="mt-14 scroll-mt-24 text-2xl font-semibold tracking-tight sm:text-3xl" {...p} />
  ),
  h3: (p: { children?: ReactNode }) => (
    <h3 className="mt-10 scroll-mt-24 text-xl font-semibold tracking-tight sm:text-2xl" {...p} />
  ),
  h4: (p: { children?: ReactNode }) => (
    <h4 className="mt-8 scroll-mt-24 text-lg font-semibold tracking-tight" {...p} />
  ),
  p: (p: { children?: ReactNode }) => (
    <p className="mt-5 leading-relaxed text-fg-muted" {...p} />
  ),
  a: ({ href = "", children }: { href?: string; children?: ReactNode }) => {
    const external = href.startsWith("http");
    const cls =
      "font-medium text-fg underline decoration-accent/50 underline-offset-4 transition-colors hover:decoration-accent";
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    ) : (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  },
  ul: (p: { children?: ReactNode }) => (
    <ul className="mt-5 list-disc space-y-2 pl-5 text-fg-muted marker:text-accent" {...p} />
  ),
  ol: (p: { children?: ReactNode }) => (
    <ol className="mt-5 list-decimal space-y-2 pl-5 text-fg-muted marker:text-fg-subtle" {...p} />
  ),
  li: (p: { children?: ReactNode }) => <li className="leading-relaxed" {...p} />,
  blockquote: (p: { children?: ReactNode }) => (
    <blockquote className="mt-6 border-l-2 border-accent pl-5 text-fg italic" {...p} />
  ),
  hr: () => <hr className="my-12 border-line" />,
  strong: (p: { children?: ReactNode }) => (
    <strong className="font-semibold text-fg" {...p} />
  ),
  // Inline vs block code are styled via CSS (.mdx-content) to avoid clobbering
  // the syntax-highlighted <pre><code> that rehype-pretty-code emits.
};

export function Mdx({ source }: { source: string }) {
  return (
    <div className="mdx-content max-w-prose text-[15px] sm:text-base">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
              [
                rehypePrettyCode,
                { theme: "github-dark", keepBackground: false },
              ],
            ],
          },
        }}
      />
    </div>
  );
}
