import { NextRequest, NextResponse } from "next/server"
import { getPastEvent, savePastEvent, deletePastEvent } from "@/lib/events-store"
import type { PastEvent } from "@/data/events"

type Ctx = { params: { slug: string } }

export async function GET(_: NextRequest, { params }: Ctx) {
  const event = await getPastEvent(params.slug)
  if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(event)
}

export async function PUT(request: NextRequest, { params }: Ctx) {
  const body: PastEvent = await request.json()
  if (body.slug !== params.slug) {
    return NextResponse.json({ error: "Slug mismatch" }, { status: 400 })
  }
  await savePastEvent(body)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_: NextRequest, { params }: Ctx) {
  await deletePastEvent(params.slug)
  return NextResponse.json({ ok: true })
}
