import { client } from "@/sanity/lib/client";
import { POST_QUERY } from "@/sanity/lib/queries";
import { BlockHero } from "@/components/blocks/BlockHero";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug });

  if (!post) {
    notFound();
  }

  return (
    <main className="flex flex-col">
      {/* Post Hero */}
      <BlockHero
        heading={post.hero?.heading || post.title}
        subheading={post.hero?.subheading}
        backgroundImage={post.hero?.backgroundImage || post.mainImage}
        intro01={post.hero?.intro01}
        intro02={post.hero?.intro02}
      />

      {/* Post Body (using existing blocks if present in post.body array) */}
      <article className="min-h-[40vh] bg-white py-20">
        <div className="container mx-auto max-w-4xl px-4 lg:px-8">
          <BlockRenderer blocks={post.body} />
        </div>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(
    `*[_type == "post" && defined(slug.current)].slug.current`,
  );
  return slugs.map((slug) => ({ slug }));
}
