import { NextRequest, NextResponse } from "next/server"
import { getPost, savePost, deletePost } from "@/lib/blog-store"
import type { BlogPost } from "@/data/blog"

type Ctx = { params: { slug: string } }

export async function GET(_: NextRequest, { params }: Ctx) {
  const post = await getPost(params.slug)
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(request: NextRequest, { params }: Ctx) {
  const body: BlogPost = await request.json()
  if (body.slug !== params.slug) {
    return NextResponse.json(
      { error: "Slug mismatch" },
      { status: 400 }
    )
  }
  await savePost(body)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_: NextRequest, { params }: Ctx) {
  await deletePost(params.slug)
  return NextResponse.json({ ok: true })
}
