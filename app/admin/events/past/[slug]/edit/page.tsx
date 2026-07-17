import { notFound } from "next/navigation"
import { getPastEvent } from "@/lib/events-store"
import EventForm from "@/components/admin/EventForm"

type Props = { params: { slug: string } }

export default async function EditPastEventPage({ params }: Props) {
  const event = await getPastEvent(params.slug)
  if (!event) return notFound()
  return <EventForm kind="past" event={event} mode="edit" />
}
