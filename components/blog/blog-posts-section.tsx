"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import ComingSoon from "@/components/coming-soon/ComingSoon" 

const blogPosts = [
  {
    title: "International Day of the Girl Child 2024: Girls' Vision for the Future",
    excerpt:
      "On October 12, 2024, OVAH commemorated the International Day of the Girl under the global theme 'Girls' Vision for the Future' with storytelling presentations and awards.",
    date: "October 12, 2024",
    readTime: "5 min read",
    category: "Events",
    image: "/international-day-girl-child-2024.jpg",
    featured: true,
  },
  {
    title: "16 Days of Activism Against Gender-Based Violence 2024",
    excerpt:
      "OVAH participated in the launch of the 16 Days of Activism campaign under the theme 'Towards Beijing +30: UNiTE to End Violence Against Women and Girls.'",
    date: "November 25, 2024",
    readTime: "7 min read",
    category: "Campaigns",
    image: "/16-days-activism-2024.jpg",
    featured: true,
  },
  {
    title: "Jamii Salama Initiative: Creating Safer Public Spaces",
    excerpt:
      "Our outreach targeting 100 public workers, including bus operators and market vendors, to raise awareness about sexual harassment and create safer communities.",
    date: "December 3, 2024",
    readTime: "4 min read",
    category: "Programs",
    image: "/jamii-salama-outreach.jpg",
    featured: false,
  },
  {
    title: "OVAH Annual Report 2024: Year of Impact and Growth",
    excerpt:
      "Reflecting on our achievements in 2024, including reaching over 500,000 people through our Elimika na Mwajuma animation series and training 429 community members.",
    date: "December 15, 2024",
    readTime: "10 min read",
    category: "Reports",
    image: "/annual-report-2024.jpg",
    featured: false,
  },
  {
    title: "Elimika na Mwajuma: The Power of Storytelling for Social Change",
    excerpt:
      "How our co-created educational animations are shifting mindsets and behaviors around sexual and gender-based violence across Tanzania.",
    date: "November 10, 2024",
    readTime: "6 min read",
    category: "Innovation",
    image: "/storytelling-social-change.jpg",
    featured: false,
  },
  {
    title: "SafetYetu Self-Defense Training: Empowering Women and Girls",
    excerpt:
      "Comprehensive self-defense program teaching Karate-Judo techniques, assertiveness, and boundary-setting to build confidence and prevent violence.",
    date: "October 28, 2024",
    readTime: "5 min read",
    category: "Programs",
    image: "/safet-yetu-training.jpg",
    featured: false,
  },
]

const categories = ["All", "Events", "Programs", "Campaigns", "Reports", "Innovation"]
const showComingSoon = true


export function BlogPostsSection() {
  if (showComingSoon) {
    return (
      <ComingSoon
        title="Blog Coming Soon"
        description="We're preparing impactful stories, updates, and insights. Check back soon!"
      />
    )
  }

  return (
    <section className="py-20 bg-[#FCFDFD]">
      <div className="container mx-auto px-4">
        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className={
                category === "All"
                  ? "bg-[#29A9DF] hover:bg-[#29A9DF]/90 text-white"
                  : "border-[#29A9DF] text-[#29A9DF] hover:bg-[#29A9DF] hover:text-white"
              }
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Featured Posts */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-[#182858] mb-8 text-center">Featured Stories</h2>
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {blogPosts
              .filter((post) => post.featured)
              .map((post, index) => (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
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

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {post.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.readTime}
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        className="w-full justify-between text-[#29A9DF] hover:text-[#182858] hover:bg-[#29A9DF]/10 p-0 h-auto font-semibold"
                      >
                        Read Full Story
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* All Posts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-[#182858] mb-8 text-center">Recent Updates</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {blogPosts
              .filter((post) => !post.featured)
              .map((post, index) => (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
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

                      <Button
                        variant="ghost"
                        className="w-full justify-between text-[#29A9DF] hover:text-[#182858] hover:bg-[#29A9DF]/10 p-0 h-auto font-semibold text-sm"
                      >
                        Read More
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* Load More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            variant="outline"
            className="border-[#29A9DF] text-[#29A9DF] hover:bg-[#29A9DF] hover:text-white px-8 py-3 rounded-full font-semibold bg-transparent"
          >
            Load More Articles
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
