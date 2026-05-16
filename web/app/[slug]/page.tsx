import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { BlockRenderer } from "@/components/BlockRenderer";
import { heroConfigs } from "@/config/heroConfigs";
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

  const heroConfig = heroConfigs[slug];

  return (
    <main className="flex flex-col">
      {data.pageBuilder && (
        <BlockRenderer blocks={data.pageBuilder} heroConfig={heroConfig} />
      )}
    </main>
  );
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(
    `*[_type == "page" && defined(slug.current)].slug.current`,
  );
  return slugs.map((slug) => ({ slug }));
}
