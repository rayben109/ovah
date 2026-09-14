"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ExternalLink, FileText, Pencil, Trash2 } from "lucide-react"
import type { Opportunity } from "@/data/opportunities"

export function OpportunityListClient({
  opportunities: initial,
}: {
  opportunities: Opportunity[]
}) {
  const router = useRouter()
  const [opportunities, setOpportunities] = useState(initial)
  const [deleting, setDeleting] = useState<string | null>(null)

  async function handleDelete(slug: string, title: string) {
    const confirmed = window.confirm(
      `Delete "${title}"? This cannot be undone.`,
    )
    if (!confirmed) return

    setDeleting(slug)
    try {
      const response = await fetch(`/api/admin/opportunities/${slug}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Delete failed")
      }
      setOpportunities((prev) => prev.filter((item) => item.slug !== slug))
      router.refresh()
    } catch {
      window.alert("Failed to delete this opportunity. Please try again.")
    } finally {
      setDeleting(null)
    }
  }

  if (opportunities.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center">
        <p className="text-gray-400 text-sm">No opportunities yet.</p>
        <Link
          href="/admin/opportunities/new"
          className="inline-block mt-3 text-[#29A9DF] text-sm font-medium hover:underline"
        >
          Add the first one →
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
      {opportunities.map((item) => (
        <div key={item.slug} className="flex items-center gap-4 px-5 py-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-gray-900 text-sm truncate">
                {item.title}
              </span>
              <span className="bg-[#29A9DF]/10 text-[#29A9DF] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide">
                {item.category}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-400 flex-wrap">
              <span>{item.date || "Date not set"}</span>
              <span>{item.deadline || "Deadline not set"}</span>
              {item.applicationLink && (
                <a
                  href={item.applicationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[#29A9DF] hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  Link
                </a>
              )}
              {item.attachmentUrl && (
                <span className="inline-flex items-center gap-1 text-gray-500">
                  <FileText className="h-3 w-3" />
                  Attachment
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={`/admin/opportunities/${item.slug}/edit`}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition"
            >
              <Pencil className="h-3 w-3" />
              Edit
            </Link>
            <button
              onClick={() => handleDelete(item.slug, item.title)}
              disabled={deleting === item.slug}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-red-100 rounded-lg text-red-500 hover:bg-red-50 transition disabled:opacity-50"
            >
              <Trash2 className="h-3 w-3" />
              {deleting === item.slug ? "Deleting…" : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
