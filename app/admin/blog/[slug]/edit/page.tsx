import { notFound } from "next/navigation"
import { getPost } from "@/lib/blog-store"
import PostForm from "@/components/admin/PostForm"

type Props = { params: { slug: string } }

export default async function EditPostPage({ params }: Props) {
  const post = await getPost(params.slug)
  if (!post) notFound()
  return <PostForm post={post} mode="edit" />
}
