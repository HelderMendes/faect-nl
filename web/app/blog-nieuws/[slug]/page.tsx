import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { POST_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

type PostImage = { asset?: { url?: string; _ref?: string } };

type RelatedPost = {
  title: string;
  slug: { current: string };
  publishedAt?: string;
  mainImage?: PostImage;
};

type OtherPost = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  excerpt?: string;
  mainImage?: PostImage;
};

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  excerpt?: string;
  category?: string;
  mainImage?: PostImage;
  body?: unknown[];
  prevPost?: RelatedPost | null;
  nextPost?: RelatedPost | null;
  otherPosts?: OtherPost[];
};

type BodyBlock = { _type: string; children?: { text?: string }[] };

// ── Helpers ────────────────────────────────────────────────────────────────

function getImageSrc(
  image?: PostImage,
  width = 1200,
  height = 700,
): string | null {
  if (image?.asset?.url) return image.asset.url;
  if (image?.asset?._ref)
    return urlFor(image).width(width).height(height).url();
  return null;
}

function formatDate(iso?: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function estimateReadTime(body?: unknown[]): number {
  if (!body?.length) return 1;
  const text = body
    .filter(
      (b): b is BodyBlock =>
        typeof b === "object" &&
        b !== null &&
        (b as BodyBlock)._type === "block",
    )
    .flatMap((b) => b.children?.map((c) => c.text ?? "") ?? [])
    .join(" ");
  return Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 200));
}

// ── Portable text components (dark theme) ─────────────────────────────────

const bodyComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-cairo text-faect-blue mt-12 mb-4 text-2xl font-bold md:text-4xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-cairo mt-8 mb-3 text-xl font-semibold text-white">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-cairo mt-6 mb-2 text-lg font-semibold text-white/90">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-5 text-[1.05rem] leading-8 text-gray-300">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-faect-blue my-8 border-l-4 pl-6 text-gray-400 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    em: ({ children }) => <em className="text-gray-200 italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={
          value?.href?.startsWith("http") ? "noopener noreferrer" : undefined
        }
        className="text-faect-blue hover:text-faect-light-blue underline underline-offset-2 transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-300">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 list-decimal space-y-2 pl-6 text-gray-300">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="leading-7 text-gray-300">{children}</li>
    ),
    number: ({ children }) => (
      <li className="leading-7 text-gray-300">{children}</li>
    ),
  },
  types: {
    image: ({ value }) => {
      const src =
        value?.asset?.url ||
        (value?.asset?._ref ? urlFor(value).width(900).url() : null);
      if (!src) return null;
      return (
        <div className="my-10 overflow-hidden rounded-2xl">
          <Image
            src={src}
            alt={value?.alt || ""}
            width={900}
            height={500}
            className="h-auto w-full object-cover"
          />
        </div>
      );
    },
    blockCTA: ({ value }) => {
      if (!value?.ctaText || !value?.ctaLink) return null;
      return (
        <div className="my-10">
          <Link
            href={value.ctaLink as string}
            className="font-ui nav-item-sweep inline-block rounded-[8px] border border-white/40 bg-transparent px-10 py-3 text-[1.05rem] font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10"
          >
            {value.ctaText as string}
          </Link>
        </div>
      );
    },
  },
};

// ── Page ───────────────────────────────────────────────────────────────────

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await client.fetch<Post>(POST_QUERY, { slug });

  if (!post) notFound();

  const heroSrc = getImageSrc(post.mainImage, 1920, 900);
  const readTime = estimateReadTime(post.body);

  return (
    <main className="flex flex-col bg-[#0d1e3b]">
      {/* ── Hero: image only ──────────────────────────────────────────── */}
      <div className="relative h-[55vh] min-h-80 w-full overflow-hidden">
        {heroSrc ? (
          <>
            <Image
              src={heroSrc}
              alt={post.title}
              fill
              className="object-cover object-center"
              priority
            />
            {/* gradient fade into page background */}
            <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-[#0d1e3b]" />
          </>
        ) : (
          <div className="h-full w-full bg-[#0a1628]" />
        )}
      </div>

      {/* ── Main: 2-column ───────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col gap-12 py-14 lg:flex-row lg:gap-20">
          {/* Left: metadata sidebar */}
          <aside className="shrink-0 lg:w-72">
            <div className="flex flex-col gap-5 lg:sticky lg:top-24">
              {/* Back link */}
              <Link
                href="/blog-nieuws"
                className="hover:text-faect-blue inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors"
              >
                <ArrowLeft className="size-4" />
                Terug naar nieuws
              </Link>

              {/* Category */}
              {post.category && (
                <span className="font-ui bg-faect-blue/20 text-faect-blue inline-block w-fit rounded-full px-4 py-1 text-xs font-semibold tracking-widest uppercase">
                  {post.category}
                </span>
              )}

              {/* Title */}
              <h1 className="font-cairo text-2xl leading-tight font-bold text-white md:text-3xl">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-col gap-1.5">
                {post.publishedAt && (
                  <p className="text-sm text-gray-400">
                    {formatDate(post.publishedAt)}
                  </p>
                )}
                <p className="text-sm text-gray-500">{readTime} min leestijd</p>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/10" />

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-sm leading-6 text-gray-400">
                  {post.excerpt}
                </p>
              )}
            </div>
          </aside>

          {/* Right: body */}
          <article className="min-w-0 flex-1">
            {Array.isArray(post.body) && post.body.length > 0 ? (
              <PortableText
                value={post.body as Parameters<typeof PortableText>[0]["value"]}
                components={bodyComponents}
              />
            ) : (
              <p className="text-gray-500 italic">Geen inhoud beschikbaar.</p>
            )}
          </article>
        </div>
      </div>

      {/* ── Prev / Next ───────────────────────────────────────────────── */}
      {(post.prevPost || post.nextPost) && (
        <div className="border-t border-white/10">
          <div className="container mx-auto grid grid-cols-1 gap-0 divide-y divide-white/10 px-4 md:grid-cols-2 md:divide-x md:divide-y-0 lg:px-8">
            {post.prevPost ? (
              <Link
                href={`/blog-nieuws/${post.prevPost.slug.current}`}
                className="group flex items-center gap-4 px-0 py-8 transition-colors hover:bg-white/5 md:px-8"
              >
                <ChevronLeft className="group-hover:text-faect-blue size-5 shrink-0 text-gray-500 transition-colors" />
                <div className="flex flex-col gap-1">
                  <span className="font-ui text-xs font-semibold tracking-widest text-gray-500 uppercase">
                    Vorig
                  </span>
                  <span className="font-cairo line-clamp-2 text-sm font-semibold text-white/80 transition-colors group-hover:text-white">
                    {post.prevPost.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {post.nextPost ? (
              <Link
                href={`/blog-nieuws/${post.nextPost.slug.current}`}
                className="group flex items-center justify-end gap-4 px-0 py-8 text-right transition-colors hover:bg-white/5 md:px-8"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-ui text-xs font-semibold tracking-widest text-gray-500 uppercase">
                    Volgende
                  </span>
                  <span className="font-cairo line-clamp-2 text-sm font-semibold text-white/80 transition-colors group-hover:text-white">
                    {post.nextPost.title}
                  </span>
                </div>
                <ChevronRight className="group-hover:text-faect-blue size-5 shrink-0 text-gray-500 transition-colors" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      )}

      {/* ── De andere nieuws ─────────────────────────────────────────── */}
      {post.otherPosts && post.otherPosts.length > 0 && (
        <section className="border-t border-white/10 py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-10 flex items-end justify-between">
              <h2 className="font-cairo text-2xl font-bold text-white md:text-3xl">
                De andere nieuws
              </h2>
              <Link
                href="/blog-nieuws"
                className="text-faect-blue hover:text-faect-light-blue text-sm font-medium transition-colors"
              >
                Alle artikelen →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {post.otherPosts.map((other) => {
                const thumbSrc = getImageSrc(other.mainImage, 640, 400);
                return (
                  <Link
                    key={other._id}
                    href={`/blog-nieuws/${other.slug.current}`}
                    className="group hover:border-faect-blue/40 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/8"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-48 overflow-hidden bg-white/5">
                      {thumbSrc ? (
                        <Image
                          src={thumbSrc}
                          alt={other.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="bg-faect-blue/10 h-full w-full" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      {other.publishedAt && (
                        <p className="font-ui text-xs font-medium tracking-wider text-gray-500">
                          {formatDate(other.publishedAt)}
                        </p>
                      )}
                      <h3 className="font-cairo group-hover:text-faect-blue line-clamp-2 leading-snug font-bold text-white transition-colors">
                        {other.title}
                      </h3>
                      {other.excerpt && (
                        <p className="line-clamp-3 flex-1 text-sm leading-6 text-gray-400">
                          {other.excerpt}
                        </p>
                      )}
                      <span className="text-faect-blue mt-auto text-sm font-medium transition-all duration-200 group-hover:gap-2">
                        Lees meer →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(
    `*[_type == "post" && defined(slug.current)].slug.current`,
  );
  return slugs.map((slug) => ({ slug }));
}
