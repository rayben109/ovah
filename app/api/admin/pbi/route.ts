import { NextResponse } from "next/server"
import { getAllExpressions } from "@/lib/investor-store"

export async function GET() {
  const items = await getAllExpressions()
  return NextResponse.json(items)
}
