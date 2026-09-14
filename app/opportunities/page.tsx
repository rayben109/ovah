import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { OpportunitiesClient } from "@/components/opportunities/opportunities-client"
import { getAllOpportunities } from "@/lib/opportunities-store"

export const dynamic = "force-dynamic"

export default async function OpportunitiesPage() {
  const opportunities = await getAllOpportunities()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-5xl mx-auto mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#29A9DF] mb-4">
            Opportunities
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#182858] mb-6">
            Calls, jobs, internships, and events
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore new opportunities for partnership, learning, employment, and
            engagement across our network.
          </p>
        </div>

        <OpportunitiesClient initialOpportunities={opportunities} />
      </main>
      <Footer />
    </div>
  )
}
