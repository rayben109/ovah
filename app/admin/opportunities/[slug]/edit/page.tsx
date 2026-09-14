import { notFound } from "next/navigation"
import OpportunityForm from "@/components/admin/OpportunityForm"
import { getOpportunity } from "@/lib/opportunities-store"

type Props = { params: { slug: string } }

export default async function EditOpportunityPage({ params }: Props) {
  const opportunity = await getOpportunity(params.slug)
  if (!opportunity) return notFound()

  return <OpportunityForm opportunity={opportunity} mode="edit" />
}
