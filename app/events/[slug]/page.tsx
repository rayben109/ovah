import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getUpcomingEvent } from "@/lib/events-store"
import { EventDetailCard } from "./EventDetailCard"

type Props = { params: { slug: string } }

export const dynamic = "force-dynamic"

export default async function EventDetails({ params }: Props) {
  const event = await getUpcomingEvent(params.slug)
  if (!event) return notFound()

  return (
    <div className="min-h-screen bg-[#FCFDFD]">
      <Navigation />

      <section className="bg-[#182858] py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="mb-3">
            <nav className="text-sm text-gray-300 flex items-center space-x-2">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/events" className="hover:text-white transition-colors">
                Events
              </Link>
              <span>/</span>
              <span className="text-white font-medium">{event.title}</span>
            </nav>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-balance leading-tight">
            {event.title}
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <Link href="/events">
              <Button
                variant="outline"
                className="border-[#182858] text-[#182858] hover:bg-[#182858] hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Events
              </Button>
            </Link>
          </div>
          <EventDetailCard event={event} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
