/** Renders a JSON-LD script tag. `data` is any schema.org object. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here (our own structured data).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
