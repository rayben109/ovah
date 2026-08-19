import fs from "fs/promises"
import path from "path"

export type InvestorExpression = {
  id: string
  submittedAt: string
  fullName: string
  email: string
  phone: string
  location?: string
  investmentInterest: string
  expectedReturns: string[]
  investmentPeriod: string
  entrepreneurSelection: string
  questions?: string
  status: "new" | "contacted" | "in_progress" | "closed"
}

const isRedisConfigured = () =>
  !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)

const DATA_FILE = path.join(process.cwd(), "data/investor-expressions.json")
const KV_SET = "pbi:investor:ids"
const kvKey = (id: string) => `pbi:investor:${id}`

async function getRedis() {
  const { Redis } = await import("@upstash/redis")
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })
}

async function readFile(): Promise<InvestorExpression[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8")
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function writeFile(items: InvestorExpression[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf-8")
}

export async function getAllExpressions(): Promise<InvestorExpression[]> {
  if (isRedisConfigured()) {
    const redis = await getRedis()
    const ids = await redis.smembers(KV_SET)
    if (!ids || ids.length === 0) return []
    const items = await Promise.all(ids.map((id) => redis.get<InvestorExpression>(kvKey(id))))
    return (items.filter(Boolean) as InvestorExpression[]).sort(
      (a, b) => Date.parse(b.submittedAt) - Date.parse(a.submittedAt)
    )
  }
  const items = await readFile()
  return items.sort((a, b) => Date.parse(b.submittedAt) - Date.parse(a.submittedAt))
}

export async function getExpression(id: string): Promise<InvestorExpression | null> {
  if (isRedisConfigured()) {
    const redis = await getRedis()
    return redis.get<InvestorExpression>(kvKey(id))
  }
  const items = await readFile()
  return items.find((r) => r.id === id) ?? null
}

export async function saveExpression(item: InvestorExpression): Promise<void> {
  if (isRedisConfigured()) {
    const redis = await getRedis()
    await redis.set(kvKey(item.id), item)
    await redis.sadd(KV_SET, item.id)
    return
  }
  const items = await readFile()
  const idx = items.findIndex((r) => r.id === item.id)
  if (idx >= 0) items[idx] = item
  else items.push(item)
  await writeFile(items)
}
