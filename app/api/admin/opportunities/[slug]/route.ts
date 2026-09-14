import { NextRequest, NextResponse } from "next/server"
import {
  deleteOpportunity,
  getOpportunity,
  saveOpportunity,
} from "@/lib/opportunities-store"
import type { Opportunity } from "@/data/opportunities"

type Ctx = { params: { slug: string } }

export async function GET(_: NextRequest, { params }: Ctx) {
  const opportunity = await getOpportunity(params.slug)
  if (!opportunity) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  return NextResponse.json(opportunity)
}

export async function PUT(request: NextRequest, { params }: Ctx) {
  const body: Opportunity = await request.json()
  if (body.slug !== params.slug) {
    return NextResponse.json({ error: "Slug mismatch" }, { status: 400 })
  }

  await saveOpportunity({
    ...body,
    updatedAt: new Date().toISOString(),
  })

  return NextResponse.json({ ok: true })
}

export async function DELETE(_: NextRequest, { params }: Ctx) {
  await deleteOpportunity(params.slug)
  return NextResponse.json({ ok: true })
}
