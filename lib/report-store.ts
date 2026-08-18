import fs from "fs/promises"
import path from "path"

export type SGBVReport = {
  id: string
  submittedAt: string
  reportingFor: "myself" | "someone_else"
  anonymous: boolean
  reporterName?: string
  victimName?: string
  sex?: "male" | "female"
  phoneNumber?: string
  region?: string
  incidentDate?: string
  environment?: string
  environmentOther?: string
  perpetratorRelationship?: string
  perpetratorRelationshipOther?: string
  violenceTypes: string[]
  violenceTypesOther?: string
  incidentDetails: string
  supportNeeded: string[]
  supportNeededOther?: string
  status: "new" | "under_review" | "referred" | "closed"
}

const isRedisConfigured = () =>
  !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)

const DATA_FILE = path.join(process.cwd(), "data/sgbv-reports.json")
const KV_SET = "sgbv:ids"
const kvKey = (id: string) => `sgbv:report:${id}`

async function getRedis() {
  const { Redis } = await import("@upstash/redis")
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })
}

async function readFile(): Promise<SGBVReport[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8")
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function writeFile(reports: SGBVReport[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(reports, null, 2), "utf-8")
}

export async function getAllReports(): Promise<SGBVReport[]> {
  if (isRedisConfigured()) {
    const redis = await getRedis()
    const ids = await redis.smembers(KV_SET)
    if (!ids || ids.length === 0) return []
    const reports = await Promise.all(ids.map((id) => redis.get<SGBVReport>(kvKey(id))))
    return (reports.filter(Boolean) as SGBVReport[]).sort(
      (a, b) => Date.parse(b.submittedAt) - Date.parse(a.submittedAt)
    )
  }
  const reports = await readFile()
  return reports.sort((a, b) => Date.parse(b.submittedAt) - Date.parse(a.submittedAt))
}

export async function getReport(id: string): Promise<SGBVReport | null> {
  if (isRedisConfigured()) {
    const redis = await getRedis()
    return redis.get<SGBVReport>(kvKey(id))
  }
  const reports = await readFile()
  return reports.find((r) => r.id === id) ?? null
}

export async function saveReport(report: SGBVReport): Promise<void> {
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
