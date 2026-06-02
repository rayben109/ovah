"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { BLOG_CATEGORIES, type BlogCategory, type BlogPost } from "@/data/blog"

type Props = {
  posts: BlogPost[]
  searchQuery: string
  activeCategory: BlogCategory | "All"
  onCategoryChange: (category: BlogCategory | "All") => void
}

export function BlogPostsSection({ posts, searchQuery, activeCategory, onCategoryChange }: Props) {
  const filtered = posts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q)
    return matchesCategory && matchesSearch
  })

  const featured = filtered.filter((p) => p.featured)
  const recent = filtered.filter((p) => !p.featured)

  return (
    <section className="py-20 bg-[#FCFDFD]">
      <div className="container mx-auto px-4">
        {/* Category filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {BLOG_CATEGORIES.map((category) => (
            <Button
              key={category}
              onClick={() => onCategoryChange(category)}
              variant={activeCategory === category ? "default" : "outline"}
              className={
                activeCategory === category
                  ? "bg-[#29A9DF] hover:bg-[#29A9DF]/90 text-white"
                  : "border-[#29A9DF] text-[#29A9DF] hover:bg-[#29A9DF] hover:text-white"
              }
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-500 text-lg">
              {searchQuery
                ? `No articles found for "${searchQuery}".`
                : "No articles in this category yet. Check back soon!"}
            </p>
          </motion.div>
        )}

        {/* Featured posts */}
        {featured.length > 0 && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-[#182858] mb-8 text-center">Featured Stories</h2>
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {featured.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden group cursor-pointer">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#F16D2E] text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-[#182858] mb-3 text-pretty group-hover:text-[#29A9DF] transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed text-pretty">{post.excerpt}</p>

                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {post.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.readTime}
                          </div>
                        </div>

                        <span className="inline-flex items-center justify-between w-full text-[#29A9DF] group-hover:text-[#182858] font-semibold text-sm">
                          Read Full Story
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recent posts */}
        {recent.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-[#182858] mb-8 text-center">Recent Updates</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {recent.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden group cursor-pointer">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-[#F16D2E] text-white px-2 py-1 rounded-full text-xs font-semibold">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <CardContent className="p-5">
                        <h3 className="text-lg font-bold text-[#182858] mb-2 text-pretty group-hover:text-[#29A9DF] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-3 leading-relaxed text-pretty text-sm line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {post.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </div>
                        </div>

                        <span className="inline-flex items-center justify-between w-full text-[#29A9DF] group-hover:text-[#182858] font-semibold text-sm">
                          Read More
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
