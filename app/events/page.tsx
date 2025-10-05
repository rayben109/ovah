import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { EventsHeroSection } from "@/components/events/events-hero-section"
import { UpcomingEventsSection } from "@/components/events/upcoming-events-section"
import { PastEventsSection } from "@/components/events/past-events-section"

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <EventsHeroSection />
        <UpcomingEventsSection />
        <PastEventsSection />
      </main>
      <Footer />
    </div>
  )
}
