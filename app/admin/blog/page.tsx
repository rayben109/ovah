import Link from "next/link"
import { getAllPosts } from "@/lib/blog-store"
import { PostListClient } from "./PostListClient"
import { Plus } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function AdminBlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#182858]">Blog Posts</h1>
          <p className="text-sm text-gray-500 mt-1">{posts.length} post{posts.length !== 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 bg-[#29A9DF] hover:bg-[#29A9DF]/90 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      <PostListClient posts={posts} />
    </div>
  )
}
