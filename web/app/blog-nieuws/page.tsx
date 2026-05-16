import { client } from "@/sanity/lib/client";
import { POSTS_QUERY, PAGE_QUERY } from "@/sanity/lib/queries";
import { BlockHero } from "@/components/blocks/BlockHero";
import { heroConfigs } from "@/config/heroConfigs";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  mainImage?: { asset?: { _ref?: string; url?: string } };
};

type PageBlock = {
  _type: string;
  [key: string]: unknown;
};

export default async function NewsPage() {
  const pageData = await client.fetch(PAGE_QUERY, { slug: "blog-nieuws" });
  const posts = await client.fetch(POSTS_QUERY);

  return (
    <main className="flex flex-col">
      {pageData?.pageBuilder ? (
        <BlockHero
          {...pageData.pageBuilder.find(
            (b: PageBlock) => b._type === "blockHero",
          )}
          heroConfig={heroConfigs["blog-nieuws"]}
        />
      ) : (
        <BlockHero
          heading="Nieuws & Insights"
          subheading="Blijf op de hoogte van de laatste ontwikkelingen bij Faect en in de wereld van Microsoft Business Software."
          backgroundImage={{
            asset: { url: "/home/Faect-Header-Home01-1.jpg" },
          }}
          heroConfig={heroConfigs["blog-nieuws"]}
        />
      )}

      <section className="bg-white py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: Post) => (
              <Link
                key={post._id}
                href={`/blog-nieuws/${post.slug.current}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative h-64 w-full">
                  {post.mainImage && (
                    <Image
                      src={urlFor(post.mainImage).width(800).height(600).url()}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <div className="mb-4 flex items-center gap-4">
                    <span className="font-ui text-faect-blue text-sm font-medium">
                      {new Date(post.publishedAt).toLocaleDateString("nl-NL", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h2 className="text-faect-navy group-hover:text-faect-blue mb-4 text-2xl leading-tight font-bold transition-colors">
                    {post.title}
                  </h2>
                  <p className="mb-6 line-clamp-4 text-gray-600">
                    {post.excerpt}
                  </p>
                  <div className="text-faect-blue mt-auto flex items-center gap-2 font-bold transition-transform group-hover:translate-x-1">
                    Lees meer <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
