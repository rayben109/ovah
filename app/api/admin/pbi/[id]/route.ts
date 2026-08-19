import { NextResponse } from "next/server"
import { getExpression, saveExpression } from "@/lib/investor-store"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { status } = await req.json()
  const valid = ["new", "contacted", "in_progress", "closed"]
  if (!valid.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 })
  }
  const item = await getExpression(params.id)
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
  await saveExpression({ ...item, status })
  return NextResponse.json({ success: true })
}
