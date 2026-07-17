import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { EventsHeroSection } from "@/components/events/events-hero-section"
import { UpcomingEventsSection } from "@/components/events/upcoming-events-section"
import { PastEventsSection } from "@/components/events/past-events-section"
import { InstagramFeedSection } from "@/components/events/InstagramFeedSection"
import { getAllUpcomingEvents, getAllPastEvents } from "@/lib/events-store"
import { getInstagramPosts } from "@/lib/instagram"

export const dynamic = "force-dynamic"

export default async function EventsPage() {
  const [upcomingEvents, pastEvents, instagramPosts] = await Promise.all([
    getAllUpcomingEvents(),
    getAllPastEvents(),
    getInstagramPosts(),
  ])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <EventsHeroSection />
        <UpcomingEventsSection events={upcomingEvents} />
        <PastEventsSection events={pastEvents} />
        <InstagramFeedSection posts={instagramPosts} />
      </main>
      <Footer />
    </div>
  )
}
