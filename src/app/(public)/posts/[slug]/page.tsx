import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostForView } from "@/server/services/posts";
import { PostContent } from "@/components/public/post-content";
import { PostHero } from "@/components/public/post/post-hero";
import { PostCoverImage } from "@/components/public/post/post-cover-image";
import { PostArticleFooter } from "@/components/public/post/post-article-footer";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostForView({ slug, collegeId: null });
  if (!post) return {};
  return { title: post.title, description: post.excerpt ?? undefined };
}

export default async function UniversityPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPostForView({ slug, collegeId: null });
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-white">
      <PostHero post={post} context={{ variant: "university" }} />

      {post.coverImageUrl && (
        <PostCoverImage
          src={post.coverImageUrl}
          alt={post.coverImageAlt ?? post.title}
        />
      )}

      <article className="mx-auto max-w-4xl px-6 py-12">
        {/* break-words prevents long unbroken strings from overflowing the container */}
        <div className="prose prose-neutral max-w-none wrap-break-word">
          <PostContent doc={post.content} />
        </div>

        <PostArticleFooter
          collegeTags={post.collegeTags}
          backHref="/"
          backLabel="Back to Home"
        />
      </article>
    </div>
  );
}
