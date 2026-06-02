import { NextRequest, NextResponse } from "next/server"
import { COOKIE_NAME } from "@/lib/auth"

export async function POST(request: NextRequest) {
  const { password } = await request.json()

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
  }

  const token = process.env.ADMIN_TOKEN
  if (!token) {
    return NextResponse.json(
      { error: "ADMIN_TOKEN not configured on server" },
      { status: 500 }
    )
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })
  return response
}
