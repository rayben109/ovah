import { NextResponse } from "next/server"
import { getReport, saveReport } from "@/lib/report-store"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { status } = await req.json()
  const valid = ["new", "under_review", "referred", "closed"]
  if (!valid.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 })
  }
  const report = await getReport(params.id)
  if (!report) return NextResponse.json({ error: "Not found" }, { status: 404 })
  await saveReport({ ...report, status })
  return NextResponse.json({ success: true })
}
