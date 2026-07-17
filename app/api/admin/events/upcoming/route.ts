import { NextRequest, NextResponse } from "next/server"
import { getAllUpcomingEvents, saveUpcomingEvent } from "@/lib/events-store"
import type { UpcomingEvent } from "@/data/events"

export async function GET() {
  const events = await getAllUpcomingEvents()
  return NextResponse.json(events)
}

export async function POST(request: NextRequest) {
  const body: UpcomingEvent = await request.json()

  if (!body.slug || !body.title || !body.description) {
    return NextResponse.json(
      { error: "slug, title, and description are required" },
      { status: 400 }
    )
  }

  await saveUpcomingEvent(body)
  return NextResponse.json({ ok: true }, { status: 201 })
}
