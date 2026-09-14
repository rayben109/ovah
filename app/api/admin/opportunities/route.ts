import { NextRequest, NextResponse } from "next/server"
import { getAllOpportunities, saveOpportunity } from "@/lib/opportunities-store"
import type { Opportunity } from "@/data/opportunities"

export async function GET() {
  const opportunities = await getAllOpportunities()
  return NextResponse.json(opportunities)
}

export async function POST(request: NextRequest) {
  const body: Opportunity = await request.json()

  if (!body.slug || !body.title || !body.category || !body.description) {
    return NextResponse.json(
      { error: "slug, title, category, and description are required" },
      { status: 400 },
    )
  }

  await saveOpportunity({
    ...body,
    createdAt: body.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  return NextResponse.json({ ok: true }, { status: 201 })
}
