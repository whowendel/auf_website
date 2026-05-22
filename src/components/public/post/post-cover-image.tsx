/**
 * Cover image for post detail pages.
 *
 * Uses a plain <img> tag instead of next/image because cover photo URLs are
 * user-supplied and can come from any domain. next/image requires all external
 * hostnames to be whitelisted upfront, which is impractical for arbitrary URLs.
 */
export function PostCoverImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="overflow-hidden border border-auf-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="h-56 w-full object-cover md:h-72"
        />
      </div>
    </div>
  );
}
