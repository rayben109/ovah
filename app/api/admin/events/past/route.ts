import { NextRequest, NextResponse } from "next/server"
import { getAllPastEvents, savePastEvent } from "@/lib/events-store"
import type { PastEvent } from "@/data/events"

export async function GET() {
  const events = await getAllPastEvents()
  return NextResponse.json(events)
}

export async function POST(request: NextRequest) {
  const body: PastEvent = await request.json()

  if (!body.slug || !body.title || !body.description) {
    return NextResponse.json(
      { error: "slug, title, and description are required" },
      { status: 400 }
    )
  }

  await savePastEvent(body)
  return NextResponse.json({ ok: true }, { status: 201 })
}
