"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { BlogPost } from "@/data/blog"
import { Pencil, Trash2, Star } from "lucide-react"

export function PostListClient({ posts: initial }: { posts: BlogPost[] }) {
  const router = useRouter()
  const [posts, setPosts] = useState(initial)
  const [deleting, setDeleting] = useState<string | null>(null)

  async function handleDelete(slug: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    setDeleting(slug)
    try {
      await fetch(`/api/admin/blog/${slug}`, { method: "DELETE" })
      setPosts((p) => p.filter((post) => post.slug !== slug))
      router.refresh()
    } finally {
      setDeleting(null)
    }
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
        <p className="text-gray-400 text-sm">No posts yet.</p>
        <Link
          href="/admin/blog/new"
          className="inline-block mt-3 text-[#29A9DF] text-sm font-medium hover:underline"
        >
          Create your first post →
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
      {posts.map((post) => (
        <div key={post.slug} className="flex items-center gap-4 px-5 py-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900 text-sm truncate">{post.title}</span>
              {post.featured && (
                <Star className="h-3.5 w-3.5 text-[#F16D2E] shrink-0" fill="#F16D2E" />
              )}
            </div>
            <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-400">
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{post.category}</span>
              <span>{post.date}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={`/admin/blog/${post.slug}/edit`}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition"
            >
              <Pencil className="h-3 w-3" />
              Edit
            </Link>
            <button
              onClick={() => handleDelete(post.slug, post.title)}
              disabled={deleting === post.slug}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-red-100 rounded-lg text-red-500 hover:bg-red-50 transition disabled:opacity-50"
            >
              <Trash2 className="h-3 w-3" />
              {deleting === post.slug ? "…" : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
