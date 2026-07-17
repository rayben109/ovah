import Image from "next/image"
import Link from "next/link"
import { Instagram, Play, Images } from "lucide-react"
import type { InstagramPost } from "@/lib/instagram"

const INSTAGRAM_URL = "https://instagram.com/ovahtanzania"
const HANDLE = "@ovahtanzania"

function PostCard({ post }: { post: InstagramPost }) {
  const imgSrc =
    post.media_type === "VIDEO" ? (post.thumbnail_url ?? post.media_url) : post.media_url

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-square overflow-hidden rounded-xl bg-gray-100"
    >
      <Image
        src={imgSrc}
        alt={post.caption?.slice(0, 80) ?? "Instagram post"}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
      />

      {/* Type badge */}
      {post.media_type === "VIDEO" && (
        <div className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1">
          <Play className="h-3 w-3 fill-white" />
        </div>
      )}
      {post.media_type === "CAROUSEL_ALBUM" && (
        <div className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1">
          <Images className="h-3 w-3" />
        </div>
      )}

      {/* Caption overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
        {post.caption && (
          <p className="text-white text-xs leading-snug line-clamp-3">
            {post.caption}
          </p>
        )}
      </div>
    </a>
  )
}

function FallbackCTA() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F16D2E] via-[#F16D2E] to-[#29A9DF] flex items-center justify-center mb-4">
        <Instagram className="h-8 w-8 text-white" />
      </div>
      <p className="text-gray-500 text-sm mb-4 max-w-xs">
        Follow us on Instagram to see our latest events, campaigns, and community highlights.
      </p>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#182858] hover:bg-[#182858]/90 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition"
      >
        <Instagram className="h-4 w-4" />
        Follow {HANDLE}
      </a>
    </div>
  )
}

export function InstagramFeedSection({ posts }: { posts: InstagramPost[] }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 max-w-6xl mx-auto">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F16D2E] to-[#29A9DF] flex items-center justify-center">
                <Instagram className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Instagram
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#182858]">
              Follow Our Journey
            </h2>
            <p className="text-gray-500 mt-1 text-sm">
              Stay connected with our latest events and campaigns
            </p>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#182858] text-[#182858] hover:bg-[#182858] hover:text-white text-sm font-semibold px-5 py-2.5 rounded-full transition self-start sm:self-auto shrink-0"
          >
            <Instagram className="h-4 w-4" />
            {HANDLE}
          </a>
        </div>

        {/* Grid or fallback */}
        <div className="max-w-6xl mx-auto">
          {posts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <FallbackCTA />
          )}
        </div>

        {/* Footer link */}
        {posts.length > 0 && (
          <div className="text-center mt-8">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#29A9DF] hover:text-[#182858] text-sm font-medium transition"
            >
              <Instagram className="h-4 w-4" />
              See more on Instagram →
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
