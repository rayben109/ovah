import type { BlogPost } from "@/data/blog"

const isRedisConfigured = () =>
  !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)

// ── File store (local dev) ────────────────────────────────────────────────────

import fs from "fs/promises"
import path from "path"

const DATA_FILE = path.join(process.cwd(), "data/posts.json")

async function readFile(): Promise<BlogPost[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8")
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function writeFile(posts: BlogPost[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2), "utf-8")
}

// ── Upstash Redis store (Vercel production) ───────────────────────────────────

const KV_SET = "blog:slugs"
const kvKey = (slug: string) => `blog:post:${slug}`

async function getRedis() {
  const { Redis } = await import("@upstash/redis")
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function getAllPosts(): Promise<BlogPost[]> {
  if (isRedisConfigured()) {
    const redis = await getRedis()
    const slugs = await redis.smembers(KV_SET)
    if (!slugs || slugs.length === 0) return []
    const posts = await Promise.all(slugs.map((s) => redis.get<BlogPost>(kvKey(s))))
    return (posts.filter(Boolean) as BlogPost[]).sort(
      (a, b) => Date.parse(b.date) - Date.parse(a.date)
    )
  }
  const posts = await readFile()
  return posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  if (isRedisConfigured()) {
    const redis = await getRedis()
    return redis.get<BlogPost>(kvKey(slug))
  }
  const posts = await readFile()
  return posts.find((p) => p.slug === slug) ?? null
}

export async function savePost(post: BlogPost): Promise<void> {
  if (isRedisConfigured()) {
    const redis = await getRedis()
    await redis.set(kvKey(post.slug), JSON.stringify(post))
    await redis.sadd(KV_SET, post.slug)
    return
  }
  const posts = await readFile()
  const idx = posts.findIndex((p) => p.slug === post.slug)
  if (idx >= 0) {
    posts[idx] = post
  } else {
    posts.unshift(post)
  }
  await writeFile(posts)
}

export async function deletePost(slug: string): Promise<void> {
  if (isRedisConfigured()) {
    const redis = await getRedis()
    await redis.del(kvKey(slug))
    await redis.srem(KV_SET, slug)
    return
  }
  const posts = await readFile()
  await writeFile(posts.filter((p) => p.slug !== slug))
}
