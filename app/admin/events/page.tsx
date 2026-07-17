import Link from "next/link"
import { getAllUpcomingEvents, getAllPastEvents } from "@/lib/events-store"
import { EventListClient } from "./EventListClient"
import { Plus } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function AdminEventsPage() {
  const [upcomingEvents, pastEvents] = await Promise.all([
    getAllUpcomingEvents(),
    getAllPastEvents(),
  ])

  return (
    <div className="max-w-4xl space-y-8">
      {/* Upcoming Events */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#182858]">Events</h1>
            <p className="text-sm text-gray-500 mt-1">
              {upcomingEvents.length} upcoming · {pastEvents.length} past
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-700">Upcoming Events</h2>
          <Link
            href="/admin/events/upcoming/new"
            className="flex items-center gap-2 bg-[#29A9DF] hover:bg-[#29A9DF]/90 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
          >
            <Plus className="h-4 w-4" />
            New Upcoming Event
          </Link>
        </div>

        <EventListClient events={upcomingEvents} kind="upcoming" />
      </div>

      {/* Past Events */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-700">Past Events</h2>
          <Link
            href="/admin/events/past/new"
            className="flex items-center gap-2 bg-[#182858] hover:bg-[#182858]/90 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
          >
            <Plus className="h-4 w-4" />
            New Past Event
          </Link>
        </div>

        <EventListClient events={pastEvents} kind="past" />
      </div>
    </div>
  )
}
