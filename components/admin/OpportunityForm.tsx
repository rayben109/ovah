"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { upload } from "@vercel/blob/client"
import { compressImage } from "@/lib/compress-image"
import { FileText, Image as ImageIcon, Trash2, Upload } from "lucide-react"
import { opportunityCategories, type Opportunity } from "@/data/opportunities"

type Mode = "create" | "edit"

type Props = {
  opportunity?: Opportunity
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

const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#29A9DF] bg-white"
const labelCls =
  "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1"

export default function OpportunityForm({ opportunity, mode }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [slugEdited, setSlugEdited] = useState(mode === "edit")
  const [uploading, setUploading] = useState(false)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const attachmentInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState<Opportunity>({
    slug: opportunity?.slug ?? "",
    title: opportunity?.title ?? "",
    category: opportunity?.category ?? "Other",
    description: opportunity?.description ?? "",
    date: opportunity?.date ?? "",
    deadline: opportunity?.deadline ?? "",
    applicationLink: opportunity?.applicationLink ?? "",
    imageUrl: opportunity?.imageUrl ?? "",
    attachmentUrl: opportunity?.attachmentUrl ?? "",
    createdAt: opportunity?.createdAt ?? "",
    updatedAt: opportunity?.updatedAt ?? "",
  })

  function setField<K extends keyof Opportunity>(
    key: K,
    value: Opportunity[K],
  ) {
    setForm((prev) => {
      const next = { ...prev, [key]: value }
      if (key === "title" && !slugEdited && mode === "create") {
        next.slug = slugify(value as string)
      }
      return next
    })
  }

  async function uploadAsset(file: File, type: "image" | "attachment") {
    setUploading(true)
    setError("")

    try {
      const fileToUpload = type === "image" ? await compressImage(file) : file
      const blob = await upload(fileToUpload.name, fileToUpload, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
      })

      if (type === "image") {
        setField("imageUrl", blob.url)
      } else {
        setField("attachmentUrl", blob.url)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed."
      setError(
        message.includes("client token") || message.includes("not configured")
          ? "Uploads are unavailable because Blob storage is not configured. Paste a file URL instead, or add BLOB_READ_WRITE_TOKEN and restart the server."
          : message,
      )
    } finally {
      setUploading(false)
    }
  }

  async function handleFileUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "attachment",
  ) {
    const file = e.target.files?.[0]
    if (!file) return
    await uploadAsset(file, type)
    e.target.value = ""
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!form.slug || !form.title || !form.category || !form.description) {
      setError("Title, slug, category, and description are required.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const url =
        mode === "create"
          ? "/api/admin/opportunities"
          : `/api/admin/opportunities/${opportunity!.slug}`

      const method = mode === "create" ? "POST" : "PUT"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error ?? "Failed to save opportunity.")
        return
      }

      router.push("/admin/opportunities")
      router.refresh()
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#182858]">
          {mode === "create" ? "New Opportunity" : "Edit Opportunity"}
        </h1>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/opportunities")}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg bg-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 text-sm font-semibold bg-[#182858] hover:bg-[#182858]/90 text-white rounded-lg disabled:opacity-60 transition"
          >
            {loading
              ? "Saving…"
              : mode === "create"
                ? "Publish Opportunity"
                : "Save Changes"}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
        <div>
          <label className={labelCls}>Title *</label>
          <input
            className={inputCls}
            value={form.title}
            onChange={(e) => setField("title", e.target.value)}
            placeholder="e.g. Call for Vendors: Community Outreach Support"
            required
          />
        </div>

        <div>
          <label className={labelCls}>Slug *</label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 shrink-0">
              /opportunities/
            </span>
            <input
              className={inputCls}
              value={form.slug}
              onChange={(e) => {
                setSlugEdited(true)
                setField("slug", slugify(e.target.value))
              }}
              placeholder="community-outreach-vendor-call"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Category *</label>
            <select
              className={inputCls}
              value={form.category}
              onChange={(e) =>
                setField("category", e.target.value as Opportunity["category"])
              }
            >
              {opportunityCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>Date</label>
            <input
              className={inputCls}
              value={form.date}
              onChange={(e) => setField("date", e.target.value)}
              placeholder="April 10, 2026"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Application / Registration Link</label>
            <input
              className={inputCls}
              value={form.applicationLink}
              onChange={(e) => setField("applicationLink", e.target.value)}
              type="url"
              placeholder="https://example.com/register"
            />
          </div>

          <div>
            <label className={labelCls}>Deadline</label>
            <input
              className={inputCls}
              value={form.deadline}
              onChange={(e) => setField("deadline", e.target.value)}
              placeholder="May 20, 2026"
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Description *</label>
          <textarea
            className={`${inputCls} resize-none`}
            rows={6}
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            placeholder="Add the opportunity details, scope, eligibility, required documents, and any relevant context…"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Featured image</label>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => handleFileUpload(event, "image")}
            />

            <div className="flex gap-2 items-center">
              <input
                className={`${inputCls} flex-1`}
                value={form.imageUrl ?? ""}
                onChange={(e) => setField("imageUrl", e.target.value)}
                placeholder="Image URL or upload a file"
              />
              <button
                type="button"
                disabled={uploading}
                onClick={() => imageInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-[#29A9DF] hover:bg-[#29A9DF]/90 text-white rounded-lg transition disabled:opacity-60 shrink-0"
              >
                <Upload className="h-3.5 w-3.5" />
                {uploading ? "Uploading…" : "Upload"}
              </button>
            </div>

            {form.imageUrl && (
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 p-2">
                <ImageIcon className="h-4 w-4 text-[#29A9DF]" />
                <span className="text-xs text-gray-600 truncate">
                  {form.imageUrl}
                </span>
                <button
                  type="button"
                  onClick={() => setField("imageUrl", "")}
                  className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded"
                  aria-label="Remove image"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          <div>
            <label className={labelCls}>Attachment</label>
            <input
              ref={attachmentInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,image/*"
              className="hidden"
              onChange={(event) => handleFileUpload(event, "attachment")}
            />

            <div className="flex gap-2 items-center">
              <input
                className={`${inputCls} flex-1`}
                value={form.attachmentUrl ?? ""}
                onChange={(e) => setField("attachmentUrl", e.target.value)}
                placeholder="Attachment URL or upload a file"
              />
              <button
                type="button"
                disabled={uploading}
                onClick={() => attachmentInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition disabled:opacity-60 shrink-0"
              >
                <Upload className="h-3.5 w-3.5" />
                {uploading ? "Uploading…" : "Upload"}
              </button>
            </div>

            {form.attachmentUrl && (
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 p-2">
                <FileText className="h-4 w-4 text-[#F16D2E]" />
                <a
                  href={form.attachmentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-gray-600 underline truncate"
                >
                  {form.attachmentUrl}
                </a>
                <button
                  type="button"
                  onClick={() => setField("attachmentUrl", "")}
                  className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded"
                  aria-label="Remove attachment"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}
