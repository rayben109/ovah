import Link from "next/link"
import { Plus } from "lucide-react"
import { getAllOpportunities } from "@/lib/opportunities-store"
import { OpportunityListClient } from "./OpportunityListClient"

export const dynamic = "force-dynamic"

export default async function AdminOpportunitiesPage() {
  const opportunities = await getAllOpportunities()

  return (
    <div className="max-w-5xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#182858]">Opportunities</h1>
          <p className="text-sm text-gray-500 mt-1">
            {opportunities.length} opportunities published
          </p>
        </div>

        <Link
          href="/admin/opportunities/new"
          className="flex items-center gap-2 bg-[#29A9DF] hover:bg-[#29A9DF]/90 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
        >
          <Plus className="h-4 w-4" />
          New Opportunity
        </Link>
      </div>

      <OpportunityListClient opportunities={opportunities} />
    </div>
  )
}
