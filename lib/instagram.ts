import { unstable_cache } from "next/cache"

export type InstagramPost = {
  id: string
  caption?: string
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  media_url: string
  thumbnail_url?: string
  permalink: string
  timestamp: string
}

async function fetchPosts(): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  if (!token) return []

  const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp"
  const url = `https://graph.instagram.com/v20.0/me/media?fields=${fields}&limit=9&access_token=${token}`

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const data = await res.json()
    return (data.data ?? []) as InstagramPost[]
  } catch {
    return []
  }
}

// Cache for 1 hour server-side — works inside force-dynamic routes
export const getInstagramPosts = unstable_cache(fetchPosts, ["instagram-posts"], {
  revalidate: 3600,
})
