import { NextRequest, NextResponse } from "next/server"
import { getAllPosts, savePost } from "@/lib/blog-store"
import type { BlogPost } from "@/data/blog"

export async function GET() {
  const posts = await getAllPosts()
  return NextResponse.json(posts)
}

export async function POST(request: NextRequest) {
  const body: BlogPost = await request.json()

  if (!body.slug || !body.title || !body.content) {
    return NextResponse.json(
      { error: "slug, title, and content are required" },
      { status: 400 }
    )
  }

  await savePost(body)
  return NextResponse.json({ ok: true }, { status: 201 })
}
