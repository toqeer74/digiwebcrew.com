/**
 * Renders one or more JSON-LD blocks.
 *
 * Server component — the markup ships in the initial HTML so crawlers that do
 * not execute JavaScript still see the structured data.
 */
export function JsonLd({ schema }: { schema: Record<string, unknown> | Record<string, unknown>[] }) {
  const blocks = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Schemas are built server-side from our own content, never user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
