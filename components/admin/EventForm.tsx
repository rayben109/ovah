"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Upload, Plus, X } from "lucide-react"
import type { UpcomingEvent, PastEvent } from "@/data/events"

type Mode = "create" | "edit"

type Props =
  | { kind: "upcoming"; event?: UpcomingEvent; mode: Mode }
  | { kind: "past"; event?: PastEvent; mode: Mode }

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

// ── Upcoming Event Form ───────────────────────────────────────────────────────

function UpcomingEventForm({
  event,
  mode,
}: {
  event?: UpcomingEvent
  mode: Mode
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [slugEdited, setSlugEdited] = useState(mode === "edit")

  const [form, setForm] = useState<UpcomingEvent>({
    slug: event?.slug ?? "",
    title: event?.title ?? "",
    description: event?.description ?? "",
    date: event?.date ?? "",
    time: event?.time ?? "",
    location: event?.location ?? "",
    attendees: event?.attendees ?? "",
    type: event?.type ?? "Training",
    featured: event?.featured ?? false,
    registerLink: event?.registerLink ?? "",
    detailsLink: event?.detailsLink ?? "",
  })

  function set<K extends keyof UpcomingEvent>(key: K, value: UpcomingEvent[K]) {
    setForm((f) => {
      const next = { ...f, [key]: value }
      if (key === "title" && !slugEdited && mode === "create") {
        const s = slugify(value as string)
        next.slug = s
        next.detailsLink = `/events/${s}`
      }
      return next
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.slug || !form.title || !form.description) {
      setError("Title, slug, and description are required.")
      return
    }
    setLoading(true)
    setError("")
    try {
      const url =
        mode === "create"
          ? "/api/admin/events/upcoming"
          : `/api/admin/events/upcoming/${event!.slug}`
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
      router.push("/admin/events")
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
          {mode === "create" ? "New Upcoming Event" : "Edit Upcoming Event"}
        </h1>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/events")}
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
              ? "Publish Event"
              : "Save Changes"}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div>
          <label className={labelCls}>Title *</label>
          <input
            className={inputCls}
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. Gender-Responsive Journalism Training"
            required
          />
        </div>

        <div>
          <label className={labelCls}>Slug (URL path) *</label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 shrink-0">/events/</span>
            <input
              className={inputCls}
              value={form.slug}
              onChange={(e) => {
                setSlugEdited(true)
                const s = slugify(e.target.value)
                setForm((f) => ({ ...f, slug: s, detailsLink: `/events/${s}` }))
              }}
              placeholder="event-title-here"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className={labelCls}>Type</label>
            <input
              className={inputCls}
              value={form.type}
              onChange={(e) => set("type", e.target.value)}
              placeholder="Training"
            />
          </div>
          <div>
            <label className={labelCls}>Date</label>
            <input
              className={inputCls}
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              placeholder="April 10, 2026"
            />
          </div>
          <div>
            <label className={labelCls}>Time</label>
            <input
              className={inputCls}
              value={form.time}
              onChange={(e) => set("time", e.target.value)}
              placeholder="9:00 AM – 5:00 PM"
            />
          </div>
          <div>
            <label className={labelCls}>Expected Attendees</label>
            <input
              className={inputCls}
              value={form.attendees}
              onChange={(e) => set("attendees", e.target.value)}
              placeholder="50 participants"
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Location</label>
          <input
            className={inputCls}
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            placeholder="Venue name, City"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <label className={labelCls}>Register Link</label>
            <input
              className={inputCls}
              value={form.registerLink}
              onChange={(e) => set("registerLink", e.target.value)}
              placeholder="https://forms.google.com/…"
              type="url"
            />
          </div>
          <div className="flex items-center gap-2 pb-2">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured}
              onChange={(e) => set("featured", e.target.checked)}
              className="rounded border-gray-300 accent-[#29A9DF] h-4 w-4"
            />
            <label htmlFor="featured" className="text-sm text-gray-700 font-medium">
              Featured event
            </label>
          </div>
        </div>

        <div>
          <label className={labelCls}>Description *</label>
          <textarea
            className={`${inputCls} resize-none`}
            rows={6}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Describe the event goals, audience, and what participants will gain…"
            required
          />
        </div>
      </div>
    </form>
  )
}

// ── Past Event Form ───────────────────────────────────────────────────────────

function PastEventForm({ event, mode }: { event?: PastEvent; mode: Mode }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [slugEdited, setSlugEdited] = useState(mode === "edit")
  const [imageUploading, setImageUploading] = useState(false)
  const [galleryUploading, setGalleryUploading] = useState(false)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState<PastEvent>({
    slug: event?.slug ?? "",
    title: event?.title ?? "",
    description: event?.description ?? "",
    date: event?.date ?? "",
    location: event?.location ?? "",
    attendees: event?.attendees ?? "",
    impact: event?.impact ?? "",
    image: event?.image ?? "",
    gallery: event?.gallery ?? [],
    reportUrl: event?.reportUrl ?? "",
  })

  function set<K extends keyof PastEvent>(key: K, value: PastEvent[K]) {
    setForm((f) => {
      const next = { ...f, [key]: value }
      if (key === "title" && !slugEdited && mode === "create") {
        next.slug = slugify(value as string)
      }
      return next
    })
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
      const data = await res.json()
      if (data.url) set("image", data.url)
    } finally {
      setImageUploading(false)
      e.target.value = ""
    }
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    setGalleryUploading(true)
    try {
      const urls: string[] = []
      for (const file of files) {
        const fd = new FormData()
        fd.append("file", file)
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
        const data = await res.json()
        if (data.url) urls.push(data.url)
      }
      setForm((f) => ({ ...f, gallery: [...(f.gallery ?? []), ...urls] }))
    } finally {
      setGalleryUploading(false)
      e.target.value = ""
    }
  }

  function removeGalleryItem(idx: number) {
    setForm((f) => ({ ...f, gallery: (f.gallery ?? []).filter((_, i) => i !== idx) }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.slug || !form.title || !form.description) {
      setError("Title, slug, and description are required.")
      return
    }
    setLoading(true)
    setError("")
    try {
      const url =
        mode === "create"
          ? "/api/admin/events/past"
          : `/api/admin/events/past/${event!.slug}`
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
      router.push("/admin/events")
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
          {mode === "create" ? "New Past Event" : "Edit Past Event"}
        </h1>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/events")}
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
              ? "Save Event"
              : "Save Changes"}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      {/* Basic info */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div>
          <label className={labelCls}>Title *</label>
          <input
            className={inputCls}
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. JSI Partners First Quarter Meeting"
            required
          />
        </div>

        <div>
          <label className={labelCls}>Slug (admin ID) *</label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 shrink-0">ID:</span>
            <input
              className={inputCls}
              value={form.slug}
              onChange={(e) => {
                setSlugEdited(true)
                set("slug", slugify(e.target.value))
              }}
              placeholder="event-slug"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>Date</label>
            <input
              className={inputCls}
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              placeholder="Friday, 27th March 2026"
            />
          </div>
          <div>
            <label className={labelCls}>Location</label>
            <input
              className={inputCls}
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              placeholder="Venue, City"
            />
          </div>
          <div>
            <label className={labelCls}>Attendees</label>
            <input
              className={inputCls}
              value={form.attendees}
              onChange={(e) => set("attendees", e.target.value)}
              placeholder="50 participants"
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Description *</label>
          <textarea
            className={`${inputCls} resize-none`}
            rows={5}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Describe what happened at this event…"
            required
          />
        </div>

        <div>
          <label className={labelCls}>Impact Summary</label>
          <input
            className={inputCls}
            value={form.impact ?? ""}
            onChange={(e) => set("impact", e.target.value)}
            placeholder="e.g. 25 students engaged in storytelling competition"
          />
        </div>

        <div>
          <label className={labelCls}>Report URL</label>
          <input
            className={inputCls}
            value={form.reportUrl ?? ""}
            onChange={(e) => set("reportUrl", e.target.value)}
            placeholder="/reports/event-name.pdf or https://…"
          />
        </div>
      </div>

      {/* Media */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
        <h2 className="text-sm font-semibold text-gray-700">Media</h2>

        {/* Featured image */}
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
              value={form.image ?? ""}
              onChange={(e) => set("image", e.target.value)}
              placeholder="/event-photo.jpg"
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
              className="mt-2 h-24 w-full object-cover rounded-lg border border-gray-100"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          )}
        </div>

        {/* Gallery */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className={labelCls}>Gallery Images</label>
            <div className="flex gap-2">
              <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleGalleryUpload}
              />
              <button
                type="button"
                disabled={galleryUploading}
                onClick={() => galleryInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#29A9DF] hover:bg-[#29A9DF]/90 text-white rounded-lg transition disabled:opacity-60"
              >
                <Upload className="h-3 w-3" />
                {galleryUploading ? "Uploading…" : "Upload Photos"}
              </button>
              <button
                type="button"
                onClick={() =>
                  setForm((f) => ({ ...f, gallery: [...(f.gallery ?? []), ""] }))
                }
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg transition"
              >
                <Plus className="h-3 w-3" />
                Add URL
              </button>
            </div>
          </div>

          {(form.gallery ?? []).length === 0 ? (
            <p className="text-xs text-gray-400 italic">No gallery images yet.</p>
          ) : (
            <div className="space-y-2">
              {(form.gallery ?? []).map((url, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    className={`${inputCls} flex-1`}
                    value={url}
                    onChange={(e) => {
                      const g = [...(form.gallery ?? [])]
                      g[idx] = e.target.value
                      setForm((f) => ({ ...f, gallery: g }))
                    }}
                    placeholder="/gallery-image.jpg"
                  />
                  {url && (
                    <img
                      src={url}
                      alt=""
                      className="h-8 w-12 object-cover rounded border border-gray-100 shrink-0"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => removeGalleryItem(idx)}
                    className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition shrink-0"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </form>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function EventForm(props: Props) {
  if (props.kind === "upcoming") {
    return (
      <UpcomingEventForm
        event={props.event as UpcomingEvent | undefined}
        mode={props.mode}
      />
    )
  }
  return (
    <PastEventForm
      event={props.event as PastEvent | undefined}
      mode={props.mode}
    />
  )
}
