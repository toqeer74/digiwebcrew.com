import { getBlogPosts } from "@/lib/content-engine";
import { SITE_URL, SITE_NAME, absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

/** XML-escape text that goes outside CDATA. */
function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * RSS 2.0 feed for the blog.
 *
 * Lives outside the [locale] segment so it is not rewritten to /en/blog/rss.xml
 * — the middleware skips paths containing a dot, which is what makes this work.
 */
export async function GET() {
  const posts = await getBlogPosts();
  const updated = posts[0]?.updated || posts[0]?.date;

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);
      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${esc(url)}</link>
      <guid isPermaLink="true">${esc(url)}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <category><![CDATA[${post.category}]]></category>
      <author><![CDATA[${post.author}]]></author>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE_NAME)} — Insights on Software, AI &amp; Growth</title>
    <link>${esc(`${SITE_URL}/blog`)}</link>
    <description>Practical guides on custom software, AI automation, technical SEO, and conversion, written by the engineers who build and ship them.</description>
    <language>en</language>
    ${updated ? `<lastBuildDate>${new Date(updated).toUTCString()}</lastBuildDate>` : ""}
    <atom:link href="${esc(`${SITE_URL}/blog/rss.xml`)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
