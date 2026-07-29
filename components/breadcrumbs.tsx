import Link from "next/link";
import { breadcrumbSchema } from "@/lib/jsonld";
import { JsonLd } from "./json-ld";

/** Visual + structured-data breadcrumbs. First item is usually Home. */
export function Breadcrumbs({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mono-label flex flex-wrap items-center gap-2">
      <JsonLd data={breadcrumbSchema(items)} />
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <span key={it.path} className="flex items-center gap-2">
            {last ? (
              <span className="text-fg-muted" aria-current="page">
                {it.name}
              </span>
            ) : (
              <Link
                href={it.path}
                className="focus-ring text-fg-subtle transition-colors hover:text-fg"
              >
                {it.name}
              </Link>
            )}
            {!last && <span className="text-fg-subtle/50">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
