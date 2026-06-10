import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BlogContent } from "@/components/blog/blog-content"
import { getAllPosts } from "@/lib/blog-store"

export const revalidate = 60

export const metadata = {
  title: "Blog | OVAH Tanzania",
  description: "Latest updates, stories, and insights from OVAH Tanzania.",
}

export default async function BlogPage() {
  const posts = (await getAllPosts()).filter((p) => !p.hidden)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <BlogContent initialPosts={posts} />
      </main>
      <Footer />
    </div>
  )
}
