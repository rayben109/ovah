import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BlogHeroSection } from "@/components/blog/blog-hero-section"
import { BlogPostsSection } from "@/components/blog/blog-posts-section"
import { NewsletterSection } from "@/components/blog/newsletter-section"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <BlogHeroSection />
        <BlogPostsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
