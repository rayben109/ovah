import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { marked } from "marked"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getPost } from "@/lib/blog-store"
import { Calendar, Clock, ArrowLeft, User } from "lucide-react"

export const revalidate = 60

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props) {
  const post = await getPost(params.slug)
  if (!post) return {}
  return { title: `${post.title} | OVAH Tanzania`, description: post.excerpt }
}

function toHTML(content: string): string {
  if (content.trimStart().startsWith("<")) return content
  return marked.parse(content) as string
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const htmlContent = toHTML(post.content)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Hero image */}
        <div className="relative h-72 md:h-96 w-full">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-0 right-0 px-4">
            <div className="max-w-3xl mx-auto">
              <span className="bg-[#F16D2E] text-white px-3 py-1 rounded-full text-sm font-semibold">
                {post.category}
              </span>
            </div>
          </div>
        </div>

        {/* Article */}
        <article className="py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#29A9DF] hover:text-[#182858] font-medium mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-[#182858] mb-6 text-pretty leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-10 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
              {post.author && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {post.author}
                </div>
              )}
            </div>

            {/* Content */}
            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[#29A9DF] hover:text-[#182858] font-medium transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
