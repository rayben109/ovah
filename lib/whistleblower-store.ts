import fs from "fs/promises"
import path from "path"

export type WhistleblowerReport = {
  id: string
  submittedAt: string
  // Reporter info
  reporterName?: string
  reporterRole?: string
  reporterEmail?: string
  reporterPhone?: string
  anonymous: boolean
  // Concern
  concernTypes: string[]
  otherConcern?: string
  details: string
  // Evidence
  evidenceAvailable: boolean
  evidenceDescription?: string
  // Outcome
  desiredOutcome: string
  status: "new" | "under_review" | "resolved" | "closed"
}

const isRedisConfigured = () =>
  !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)

const DATA_FILE = path.join(process.cwd(), "data/whistleblower-reports.json")
const KV_SET = "whistleblower:ids"
const kvKey = (id: string) => `whistleblower:report:${id}`

async function getRedis() {
  const { Redis } = await import("@upstash/redis")
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })
}

async function readFile(): Promise<WhistleblowerReport[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8")
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function writeFile(reports: WhistleblowerReport[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(reports, null, 2), "utf-8")
}

export async function getAllReports(): Promise<WhistleblowerReport[]> {
  if (isRedisConfigured()) {
    const redis = await getRedis()
    const ids = await redis.smembers(KV_SET)
    if (!ids || ids.length === 0) return []
    const reports = await Promise.all(ids.map((id) => redis.get<WhistleblowerReport>(kvKey(id))))
    return (reports.filter(Boolean) as WhistleblowerReport[]).sort(
      (a, b) => Date.parse(b.submittedAt) - Date.parse(a.submittedAt)
    )
  }
  const reports = await readFile()
  return reports.sort((a, b) => Date.parse(b.submittedAt) - Date.parse(a.submittedAt))
}

export async function getReport(id: string): Promise<WhistleblowerReport | null> {
  if (isRedisConfigured()) {
    const redis = await getRedis()
    return redis.get<WhistleblowerReport>(kvKey(id))
  }
  const reports = await readFile()
  return reports.find((r) => r.id === id) ?? null
}

export async function saveReport(report: WhistleblowerReport): Promise<void> {
  if (isRedisConfigured()) {
    const redis = await getRedis()
    await redis.set(kvKey(report.id), report)
    await redis.sadd(KV_SET, report.id)
    return
  }
  const reports = await readFile()
  const idx = reports.findIndex((r) => r.id === report.id)
  if (idx >= 0) reports[idx] = report
  else reports.push(report)
  await writeFile(reports)
}
