"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { marked } from "marked"
import { upload } from "@vercel/blob/client"
import { compressImage } from "@/lib/compress-image"
import { BLOG_CATEGORIES, type BlogPost, type BlogCategory } from "@/data/blog"
import RichTextEditor from "./RichTextEditor"
import { Upload } from "lucide-react"

type Mode = "create" | "edit"

type Props = {
  post?: BlogPost
  mode: Mode
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export default function PostForm({ post, mode }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [slugEdited, setSlugEdited] = useState(mode === "edit")
  const [showPreview, setShowPreview] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const imageInputRef = useRef<HTMLInputElement>(null)

  // Convert legacy markdown to HTML so TipTap loads formatted content
  function toHTML(raw: string) {
    if (!raw || raw.trimStart().startsWith("<")) return raw
    return marked.parse(raw) as string
  }

  const [form, setForm] = useState<BlogPost>({
    slug: post?.slug ?? "",
    title: post?.title ?? "",
    excerpt: post?.excerpt ?? "",
    content: toHTML(post?.content ?? ""),
    date: post?.date ?? new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    readTime: post?.readTime ?? "5 min read",
    category: post?.category ?? "Events",
    image: post?.image ?? "",
    featured: post?.featured ?? false,
    author: post?.author ?? "OVAH Team",
  })

  useEffect(() => {
    if (!slugEdited && mode === "create") {
      setForm((f) => ({ ...f, slug: slugify(f.title) }))
    }
  }, [form.title, slugEdited, mode])

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageUploading(true)
    try {
      const compressed = await compressImage(file)
      const blob = await upload(compressed.name, compressed, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
      })
      set("image", blob.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed.")
    } finally {
      setImageUploading(false)
      e.target.value = ""
    }
  }

  function set<K extends keyof BlogPost>(key: K, value: BlogPost[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.slug || !form.title || !form.content || form.content === "<p></p>") {
      setError("Title, slug, and content are required.")
      return
    }
    setLoading(true)
    setError("")
    try {
      const url = mode === "create" ? "/api/admin/blog" : `/api/admin/blog/${post!.slug}`
      const method = mode === "create" ? "POST" : "PUT"
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? "Save failed.")
        return
      }
      router.push("/admin/blog")
      router.refresh()
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const inputCls =
    "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#29A9DF] bg-white"
  const labelCls = "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1"

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#182858]">
          {mode === "create" ? "New Blog Post" : "Edit Post"}
        </h1>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/blog")}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg bg-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 text-sm font-semibold bg-[#182858] hover:bg-[#182858]/90 text-white rounded-lg disabled:opacity-60 transition"
          >
            {loading ? "Saving…" : mode === "create" ? "Publish Post" : "Save Changes"}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      {/* ── Top fields ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div>
          <label className={labelCls}>Title *</label>
          <input
            className={inputCls}
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. Advancing Safer Communities Across Tanzania"
            required
          />
        </div>

        <div>
          <label className={labelCls}>Slug (URL path) *</label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 shrink-0">/blog/</span>
            <input
              className={inputCls}
              value={form.slug}
              onChange={(e) => {
                setSlugEdited(true)
                set("slug", slugify(e.target.value))
              }}
              placeholder="my-post-title"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className={labelCls}>Category</label>
            <select
              className={inputCls}
              value={form.category}
              onChange={(e) => set("category", e.target.value as BlogCategory)}
            >
              {BLOG_CATEGORIES.filter((c) => c !== "All").map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Date</label>
            <input
              className={inputCls}
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              placeholder="June 2, 2026"
            />
          </div>
          <div>
            <label className={labelCls}>Read time</label>
            <input
              className={inputCls}
              value={form.readTime}
              onChange={(e) => set("readTime", e.target.value)}
              placeholder="5 min read"
            />
          </div>
          <div>
            <label className={labelCls}>Author</label>
            <input
              className={inputCls}
              value={form.author ?? ""}
              onChange={(e) => set("author", e.target.value)}
              placeholder="OVAH Team"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <label className={labelCls}>Featured Image</label>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <div className="flex gap-2">
              <input
                className={`${inputCls} flex-1`}
                value={form.image}
                onChange={(e) => set("image", e.target.value)}
                placeholder="/my-photo.jpg"
              />
              <button
                type="button"
                disabled={imageUploading}
                onClick={() => imageInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-[#29A9DF] hover:bg-[#29A9DF]/90 text-white rounded-lg transition disabled:opacity-60 shrink-0"
              >
                <Upload className="h-3.5 w-3.5" />
                {imageUploading ? "Uploading…" : "Upload"}
              </button>
            </div>
            {form.image && !imageUploading && (
              <img
                src={form.image}
                alt="Preview"
                className="mt-2 h-20 w-full object-cover rounded-lg border border-gray-100"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured}
              onChange={(e) => set("featured", e.target.checked)}
              className="rounded border-gray-300 accent-[#29A9DF] h-4 w-4"
            />
            <label htmlFor="featured" className="text-sm text-gray-700 font-medium">
              Featured post
            </label>
          </div>
        </div>

        <div>
          <label className={labelCls}>Excerpt (shown on blog listing)</label>
          <textarea
            className={`${inputCls} resize-none`}
            rows={2}
            value={form.excerpt}
            onChange={(e) => set("excerpt", e.target.value)}
            placeholder="A short summary of the post…"
          />
        </div>
      </div>

      {/* ── Content editor + preview ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <label className={labelCls}>Content *</label>
          <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg">
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                !showPreview ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Write
            </button>
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                showPreview ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        {showPreview ? (
          <div className="border border-gray-200 rounded-lg bg-white min-h-[420px] px-8 py-6">
            {form.content && form.content !== "<p></p>" ? (
              <div
                className="blog-prose"
                dangerouslySetInnerHTML={{ __html: toHTML(form.content) }}
              />
            ) : (
              <p className="text-gray-400 text-sm italic">Nothing to preview yet — write some content first.</p>
            )}
          </div>
        ) : (
          <RichTextEditor
            content={form.content}
            onChange={(html) => set("content", html)}
          />
        )}
      </div>
    </form>
  )
}
