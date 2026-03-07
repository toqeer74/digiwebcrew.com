import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/admin/page-header";
import Link from "next/link";
import { cn } from "@/lib/utils";

type SearchParams = Promise<{ doc?: string }>;

const DOCS: Array<{ key: string; title: string; file: string }> = [
  { key: "architecture", title: "Architecture", file: "architecture-diagrams.md" },
  { key: "motion", title: "Motion System", file: "motion-system.md" },
  { key: "templates", title: "Templates Spec", file: "templates-spec.md" },
];

function readDoc(file: string) {
  const fp = path.join(process.cwd(), "digi", file);
  return fs.readFileSync(fp, "utf-8");
}

export default async function AdminDocsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const { doc } = await searchParams;
  const selectedKey = doc && DOCS.some((d) => d.key === doc) ? doc : DOCS[0].key;
  const selected = DOCS.find((d) => d.key === selectedKey)!;

  let markdown = "";
  try {
    markdown = readDoc(selected.file);
  } catch {
    markdown = "# Document not found";
  }

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        label="Internal Docs"
        title="Digi Specs"
        description="Reference documentation loaded from the digi/ folder."
      />

      <div className="flex flex-wrap gap-2">
        {DOCS.map((d) => (
          <Link
            key={d.key}
            href={{ query: { doc: d.key } }}
            className={cn(
              "h-9 px-4 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all",
              d.key === selectedKey
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white border-border text-muted-foreground hover:bg-secondary"
            )}
          >
            {d.title}
          </Link>
        ))}
      </div>

      <Card className="rounded-[2rem] border-border bg-white shadow-sm p-8">
        <div className="prose dark:prose-invert prose-zinc max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </div>
      </Card>
    </div>
  );
}
