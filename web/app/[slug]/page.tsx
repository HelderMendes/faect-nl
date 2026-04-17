import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await client.fetch(PAGE_QUERY, { slug });

  if (!data) {
    notFound();
  }

  return (
    <main className="flex flex-col">
      {data.pageBuilder && <BlockRenderer blocks={data.pageBuilder} />}
    </main>
  );
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(
    `*[_type == "page" && defined(slug.current)].slug.current`,
  );
  return slugs.map((slug) => ({ slug }));
}
