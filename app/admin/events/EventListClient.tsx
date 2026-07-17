"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { UpcomingEvent, PastEvent } from "@/data/events"
import { Pencil, Trash2, Star } from "lucide-react"

type Props =
  | { events: UpcomingEvent[]; kind: "upcoming" }
  | { events: PastEvent[]; kind: "past" }

export function EventListClient({ events: initial, kind }: Props) {
  const router = useRouter()
  const [events, setEvents] = useState(initial)
  const [deleting, setDeleting] = useState<string | null>(null)

  async function handleDelete(slug: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    setDeleting(slug)
    try {
      await fetch(`/api/admin/events/${kind}/${slug}`, { method: "DELETE" })
      setEvents((prev) => prev.filter((e) => e.slug !== slug))
      router.refresh()
    } finally {
      setDeleting(null)
    }
  }

  if (events.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center">
        <p className="text-gray-400 text-sm">No {kind} events yet.</p>
        <Link
          href={`/admin/events/${kind}/new`}
          className="inline-block mt-3 text-[#29A9DF] text-sm font-medium hover:underline"
        >
          Add the first one →
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
      {events.map((event) => {
        const isUpcoming = kind === "upcoming"
        const upcoming = isUpcoming ? (event as UpcomingEvent) : null

        return (
          <div key={event.slug} className="flex items-center gap-4 px-5 py-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900 text-sm truncate">
                  {event.title}
                </span>
                {upcoming?.featured && (
                  <Star className="h-3.5 w-3.5 text-[#F16D2E] shrink-0" fill="#F16D2E" />
                )}
              </div>
              <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-400">
                {upcoming && (
                  <span className="bg-[#29A9DF]/10 text-[#29A9DF] px-2 py-0.5 rounded-full font-medium">
                    {upcoming.type}
                  </span>
                )}
                <span>{event.date}</span>
                <span className="truncate">{event.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/admin/events/${kind}/${event.slug}/edit`}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition"
              >
                <Pencil className="h-3 w-3" />
                Edit
              </Link>
              <button
                onClick={() => handleDelete(event.slug, event.title)}
                disabled={deleting === event.slug}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-red-100 rounded-lg text-red-500 hover:bg-red-50 transition disabled:opacity-50"
              >
                <Trash2 className="h-3 w-3" />
                {deleting === event.slug ? "…" : "Delete"}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
