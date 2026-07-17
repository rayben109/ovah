import type { UpcomingEvent, PastEvent } from "@/data/events"

const isRedisConfigured = () =>
  !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)

// ── File store (local dev) ────────────────────────────────────────────────────

import fs from "fs/promises"
import path from "path"

const UPCOMING_FILE = path.join(process.cwd(), "data/upcoming-events.json")
const PAST_FILE = path.join(process.cwd(), "data/past-events.json")

async function readUpcomingFile(): Promise<UpcomingEvent[]> {
  try {
    const raw = await fs.readFile(UPCOMING_FILE, "utf-8")
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function writeUpcomingFile(events: UpcomingEvent[]): Promise<void> {
  await fs.writeFile(UPCOMING_FILE, JSON.stringify(events, null, 2), "utf-8")
}

async function readPastFile(): Promise<PastEvent[]> {
  try {
    const raw = await fs.readFile(PAST_FILE, "utf-8")
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function writePastFile(events: PastEvent[]): Promise<void> {
  await fs.writeFile(PAST_FILE, JSON.stringify(events, null, 2), "utf-8")
}

// ── Upstash Redis store (Vercel production) ───────────────────────────────────

const UPCOMING_SET = "events:upcoming:slugs"
const PAST_SET = "events:past:slugs"
const upcomingKey = (slug: string) => `events:upcoming:${slug}`
const pastKey = (slug: string) => `events:past:${slug}`

async function getRedis() {
  const { Redis } = await import("@upstash/redis")
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })
}

// ── Upcoming Events ───────────────────────────────────────────────────────────

export async function getAllUpcomingEvents(): Promise<UpcomingEvent[]> {
  if (isRedisConfigured()) {
    const redis = await getRedis()
    const slugs = await redis.smembers(UPCOMING_SET)
    if (!slugs || slugs.length === 0) return []
    const events = await Promise.all(slugs.map((s) => redis.get<UpcomingEvent>(upcomingKey(s))))
    return events.filter(Boolean) as UpcomingEvent[]
  }
  return readUpcomingFile()
}

export async function getUpcomingEvent(slug: string): Promise<UpcomingEvent | null> {
  if (isRedisConfigured()) {
    const redis = await getRedis()
    return redis.get<UpcomingEvent>(upcomingKey(slug))
  }
  const events = await readUpcomingFile()
  return events.find((e) => e.slug === slug) ?? null
}

export async function saveUpcomingEvent(event: UpcomingEvent): Promise<void> {
  if (isRedisConfigured()) {
    const redis = await getRedis()
    await redis.set(upcomingKey(event.slug), JSON.stringify(event))
    await redis.sadd(UPCOMING_SET, event.slug)
    return
  }
  const events = await readUpcomingFile()
  const idx = events.findIndex((e) => e.slug === event.slug)
  if (idx >= 0) {
    events[idx] = event
  } else {
    events.unshift(event)
  }
  await writeUpcomingFile(events)
}

export async function deleteUpcomingEvent(slug: string): Promise<void> {
  if (isRedisConfigured()) {
    const redis = await getRedis()
    await redis.del(upcomingKey(slug))
    await redis.srem(UPCOMING_SET, slug)
    return
  }
  const events = await readUpcomingFile()
  await writeUpcomingFile(events.filter((e) => e.slug !== slug))
}

// ── Past Events ───────────────────────────────────────────────────────────────

export async function getAllPastEvents(): Promise<PastEvent[]> {
  if (isRedisConfigured()) {
    const redis = await getRedis()
    const slugs = await redis.smembers(PAST_SET)
    if (!slugs || slugs.length === 0) return []
    const events = await Promise.all(slugs.map((s) => redis.get<PastEvent>(pastKey(s))))
    return events.filter(Boolean) as PastEvent[]
  }
  return readPastFile()
}

export async function getPastEvent(slug: string): Promise<PastEvent | null> {
  if (isRedisConfigured()) {
    const redis = await getRedis()
    return redis.get<PastEvent>(pastKey(slug))
  }
  const events = await readPastFile()
  return events.find((e) => e.slug === slug) ?? null
}

export async function savePastEvent(event: PastEvent): Promise<void> {
  if (isRedisConfigured()) {
    const redis = await getRedis()
    await redis.set(pastKey(event.slug), JSON.stringify(event))
    await redis.sadd(PAST_SET, event.slug)
    return
  }
  const events = await readPastFile()
  const idx = events.findIndex((e) => e.slug === event.slug)
  if (idx >= 0) {
    events[idx] = event
  } else {
    events.unshift(event)
  }
  await writePastFile(events)
}

export async function deletePastEvent(slug: string): Promise<void> {
  if (isRedisConfigured()) {
    const redis = await getRedis()
    await redis.del(pastKey(slug))
    await redis.srem(PAST_SET, slug)
    return
  }
  const events = await readPastFile()
  await writePastFile(events.filter((e) => e.slug !== slug))
}
