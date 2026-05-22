import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollegeBySlug } from "@/data/colleges";
import { getPostForView } from "@/server/services/posts";
import { PostContent } from "@/components/public/post-content";
import { MicrositeFooter } from "@/components/public/microsite/microsite-footer";
import { PostHero } from "@/components/public/post/post-hero";
import { PostCoverImage } from "@/components/public/post/post-cover-image";
import { PostArticleFooter } from "@/components/public/post/post-article-footer";

type Params = { params: Promise<{ slug: string; postSlug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, postSlug } = await params;
  const post = await getPostForView({ slug: postSlug, collegeId: slug });
  if (!post) return {};
  return { title: post.title, description: post.excerpt ?? undefined };
}

export default async function CollegePostPage({ params }: Params) {
  const { slug, postSlug } = await params;
  const college = getCollegeBySlug(slug);
  if (!college) notFound();

  const post = await getPostForView({ slug: postSlug, collegeId: college.id });
  if (!post) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PostHero post={post} context={{ variant: "college", college }} />

      {post.coverImageUrl && (
        <PostCoverImage
          src={post.coverImageUrl}
          alt={post.coverImageAlt ?? post.title}
        />
      )}

      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-6 py-12">
          {/* break-words prevents long unbroken strings from overflowing the container */}
          <div className="prose prose-neutral max-w-none wrap-break-word">
            <PostContent doc={post.content} />
          </div>

          <PostArticleFooter
            collegeTags={post.collegeTags}
            currentCollegeId={college.id}
            backHref={`/c/${college.slug}`}
            backLabel={`Back to ${college.shortName}`}
          />
        </article>
      </main>

      <MicrositeFooter college={college} />
    </div>
  );
}
