export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  /** Full post body written in Markdown */
  content: string
  date: string
  readTime: string
  category: BlogCategory
  image: string
  featured: boolean
  author?: string
}

export const BLOG_CATEGORIES = [
  "All",
  "Events",
  "Programs",
  "Campaigns",
  "Reports",
  "Innovation",
] as const

export type BlogCategory = (typeof BLOG_CATEGORIES)[number]
