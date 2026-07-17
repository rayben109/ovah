import { notFound } from "next/navigation"
import { getUpcomingEvent } from "@/lib/events-store"
import EventForm from "@/components/admin/EventForm"

type Props = { params: { slug: string } }

export default async function EditUpcomingEventPage({ params }: Props) {
  const event = await getUpcomingEvent(params.slug)
  if (!event) return notFound()
  return <EventForm kind="upcoming" event={event} mode="edit" />
}
