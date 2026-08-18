import { NextResponse } from "next/server"
import { getAllReports } from "@/lib/report-store"

export async function GET() {
  const reports = await getAllReports()
  return NextResponse.json(reports)
}
