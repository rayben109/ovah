import fs from "fs/promises"
import path from "path"
import type { Opportunity } from "@/data/opportunities"

const isRedisConfigured = () =>
  !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)

const OPPORTUNITIES_FILE = path.join(process.cwd(), "data/opportunities.json")

async function readOpportunitiesFile(): Promise<Opportunity[]> {
  try {
    const raw = await fs.readFile(OPPORTUNITIES_FILE, "utf-8")
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function writeOpportunitiesFile(
  opportunities: Opportunity[],
): Promise<void> {
  await fs.writeFile(
    OPPORTUNITIES_FILE,
    JSON.stringify(opportunities, null, 2),
    "utf-8",
  )
}

const OPPORTUNITIES_SET = "opportunities:slugs"
const opportunitiesKey = (slug: string) => `opportunities:${slug}`

async function getRedis() {
  const { Redis } = await import("@upstash/redis")
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })
}

export async function getAllOpportunities(): Promise<Opportunity[]> {
  if (isRedisConfigured()) {
    const redis = await getRedis()
    const slugs = await redis.smembers(OPPORTUNITIES_SET)
    if (!slugs || slugs.length === 0) return []
    const opportunities = await Promise.all(
      slugs.map((slug) => redis.get<Opportunity>(opportunitiesKey(slug))),
    )
    return opportunities.filter(Boolean) as Opportunity[]
  }

  return readOpportunitiesFile()
}

export async function getOpportunity(
  slug: string,
): Promise<Opportunity | null> {
  if (isRedisConfigured()) {
    const redis = await getRedis()
    return redis.get<Opportunity>(opportunitiesKey(slug))
  }

  const opportunities = await readOpportunitiesFile()
  return opportunities.find((item) => item.slug === slug) ?? null
}

export async function saveOpportunity(opportunity: Opportunity): Promise<void> {
  if (isRedisConfigured()) {
    const redis = await getRedis()
    await redis.set(
      opportunitiesKey(opportunity.slug),
      JSON.stringify(opportunity),
    )
    await redis.sadd(OPPORTUNITIES_SET, opportunity.slug)
    return
  }

  const opportunities = await readOpportunitiesFile()
  const idx = opportunities.findIndex((item) => item.slug === opportunity.slug)
  if (idx >= 0) {
    opportunities[idx] = opportunity
  } else {
    opportunities.unshift(opportunity)
  }
  await writeOpportunitiesFile(opportunities)
}

export async function deleteOpportunity(slug: string): Promise<void> {
  if (isRedisConfigured()) {
    const redis = await getRedis()
    await redis.del(opportunitiesKey(slug))
    await redis.srem(OPPORTUNITIES_SET, slug)
    return
  }

  const opportunities = await readOpportunitiesFile()
  await writeOpportunitiesFile(
    opportunities.filter((item) => item.slug !== slug),
  )
}
