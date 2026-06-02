"use client"

import { useState } from "react"
import { BlogHeroSection } from "./blog-hero-section"
import { BlogPostsSection } from "./blog-posts-section"
import { NewsletterSection } from "./newsletter-section"
import type { BlogPost, BlogCategory } from "@/data/blog"

type Props = {
  initialPosts: BlogPost[]
}

export function BlogContent({ initialPosts }: Props) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "All">("All")

  return (
    <>
      <BlogHeroSection searchQuery={searchQuery} onSearch={setSearchQuery} />
      <BlogPostsSection
        posts={initialPosts}
        searchQuery={searchQuery}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <NewsletterSection />
    </>
  )
}
