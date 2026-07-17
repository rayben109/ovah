import { NextRequest, NextResponse } from "next/server"
import { getUpcomingEvent, saveUpcomingEvent, deleteUpcomingEvent } from "@/lib/events-store"
import type { UpcomingEvent } from "@/data/events"

type Ctx = { params: { slug: string } }

export async function GET(_: NextRequest, { params }: Ctx) {
  const event = await getUpcomingEvent(params.slug)
  if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(event)
}

export async function PUT(request: NextRequest, { params }: Ctx) {
  const body: UpcomingEvent = await request.json()
  if (body.slug !== params.slug) {
    return NextResponse.json({ error: "Slug mismatch" }, { status: 400 })
  }
  await saveUpcomingEvent(body)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_: NextRequest, { params }: Ctx) {
  await deleteUpcomingEvent(params.slug)
  return NextResponse.json({ ok: true })
}
