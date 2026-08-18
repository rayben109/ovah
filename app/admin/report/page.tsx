"use client"

import { useEffect, useState } from "react"
import { Heart, ChevronDown, ChevronUp, Clock, CheckCircle2, XCircle, AlertCircle, ArrowRight } from "lucide-react"
import type { SGBVReport } from "@/lib/report-store"

const STATUS_CONFIG = {
  new:          { label: "New",          color: "bg-red-100 text-red-700",     icon: AlertCircle },
  under_review: { label: "Under Review", color: "bg-amber-100 text-amber-700", icon: Clock },
  referred:     { label: "Referred",     color: "bg-blue-100 text-blue-700",   icon: ArrowRight },
  closed:       { label: "Closed",       color: "bg-gray-100 text-gray-500",   icon: XCircle },
}

const NEXT_STATUSES: Record<string, { label: string; value: string }[]> = {
  new:          [{ label: "Mark Under Review", value: "under_review" }, { label: "Mark Referred", value: "referred" }, { label: "Close", value: "closed" }],
  under_review: [{ label: "Mark Referred",     value: "referred"     }, { label: "Close", value: "closed" }],
  referred:     [{ label: "Close",             value: "closed"       }],
  closed:       [],
}

function Detail({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">{label}</p>
      <p className={`text-gray-800 ${mono ? "font-mono text-xs" : "text-sm"}`}>{value}</p>
    </div>
  )
}

function ReportCard({ report, onUpdate }: { report: SGBVReport; onUpdate: (r: SGBVReport) => void }) {
  const [open, setOpen] = useState(false)
  const [updating, setUpdating] = useState(false)
  const cfg = STATUS_CONFIG[report.status]
  const Icon = cfg.icon

  async function updateStatus(status: string) {
    setUpdating(true)
    const res = await fetch(`/api/admin/report/${report.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    if (res.ok) onUpdate({ ...report, status: status as SGBVReport["status"] })
    setUpdating(false)
  }

  const displayName = report.anonymous
    ? "Anonymous"
    : report.reporterName || report.victimName || "Identified"

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        className="w-full flex items-start gap-4 p-5 text-left hover:bg-gray-50 transition"
        onClick={() => setOpen(v => !v)}
      >
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${cfg.color}`}>
          <Icon className="h-3 w-3" />
          {cfg.label}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[#182858] text-sm">{report.violenceTypes.join(", ")}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {new Date(report.submittedAt).toLocaleString()} · {displayName}
            {report.region ? ` · ${report.region}` : ""}
          </p>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{report.incidentDetails}</p>
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" /> : <ChevronDown className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />}
      </button>

      {open && (
        <div className="border-t border-gray-100 p-5 space-y-4 bg-gray-50">
          <div className="grid sm:grid-cols-3 gap-4">
            <Detail label="Reporting for" value={report.reportingFor === "someone_else" ? "Someone else" : "Myself"} />
            <Detail label="Anonymous" value={report.anonymous ? "Yes" : "No"} />
            <Detail label="Sex" value={report.sex ?? "—"} />
            {report.incidentDate && <Detail label="Incident date" value={report.incidentDate} />}
            {report.region && <Detail label="Region" value={report.region} />}
            {report.environment && <Detail label="Environment" value={report.environment + (report.environmentOther ? ` — ${report.environmentOther}` : "")} />}
            {report.perpetratorRelationship && <Detail label="Perpetrator relationship" value={report.perpetratorRelationship + (report.perpetratorRelationshipOther ? ` — ${report.perpetratorRelationshipOther}` : "")} />}
            <Detail label="Report ID" value={report.id} mono />
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Violence type(s)</p>
            <div className="flex flex-wrap gap-2">
              {report.violenceTypes.map(v => (
                <span key={v} className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-medium">{v}</span>
              ))}
              {report.violenceTypesOther && (
                <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-medium">{report.violenceTypesOther}</span>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Incident details</p>
            <p className="text-sm text-gray-700 whitespace-pre-wrap bg-white rounded-lg border border-gray-200 p-3">{report.incidentDetails}</p>
          </div>

          {report.supportNeeded.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Support needed</p>
              <div className="flex flex-wrap gap-2">
                {report.supportNeeded.map(s => (
                  <span key={s} className="px-2.5 py-1 rounded-full bg-[#29A9DF]/10 text-[#182858] text-xs font-medium">{s}</span>
                ))}
                {report.supportNeededOther && (
                  <span className="px-2.5 py-1 rounded-full bg-[#29A9DF]/10 text-[#182858] text-xs font-medium">{report.supportNeededOther}</span>
                )}
              </div>
            </div>
          )}

          {!report.anonymous && (report.reporterName || report.victimName || report.phoneNumber) && (
            <div className="rounded-lg border border-[#29A9DF]/30 bg-[#29A9DF]/5 p-3 text-sm space-y-1">
              <p className="text-xs font-semibold text-[#182858] uppercase tracking-wide mb-1">Contact details</p>
              {report.reporterName && <p><span className="text-gray-500">Reporter: </span>{report.reporterName}</p>}
              {report.victimName   && <p><span className="text-gray-500">Victim: </span>{report.victimName}</p>}
              {report.phoneNumber  && <p><span className="text-gray-500">Phone: </span><a href={`tel:${report.phoneNumber}`} className="underline text-[#182858]">{report.phoneNumber}</a></p>}
            </div>
          )}

          {NEXT_STATUSES[report.status].length > 0 && (
            <div className="flex gap-2 pt-1">
              {NEXT_STATUSES[report.status].map(({ label, value }) => (
                <button
                  key={value}
                  disabled={updating}
                  onClick={() => updateStatus(value)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border border-[#182858] text-[#182858] hover:bg-[#182858] hover:text-white transition disabled:opacity-50"
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function ReportAdminPage() {
  const [reports, setReports] = useState<SGBVReport[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | SGBVReport["status"]>("all")

  useEffect(() => {
    fetch("/api/admin/report")
      .then(r => r.json())
      .then(setReports)
      .finally(() => setLoading(false))
  }, [])

  function handleUpdate(updated: SGBVReport) {
    setReports(prev => prev.map(r => r.id === updated.id ? updated : r))
  }

  const filtered = filter === "all" ? reports : reports.filter(r => r.status === filter)
  const counts = reports.reduce((acc, r) => ({ ...acc, [r.status]: (acc[r.status] ?? 0) + 1 }), {} as Record<string, number>)

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Heart className="h-6 w-6 text-[#182858]" />
        <div>
          <h1 className="text-xl font-bold text-[#182858]">SGBV Case Reports</h1>
          <p className="text-sm text-gray-500">{reports.length} total · {counts.new ?? 0} new</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(["all", "new", "under_review", "referred", "closed"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition border ${
              filter === f ? "bg-[#182858] text-white border-[#182858]" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            }`}
          >
            {f === "all"
              ? `All (${reports.length})`
              : f === "under_review"
              ? `Under Review (${counts.under_review ?? 0})`
              : `${STATUS_CONFIG[f].label} (${counts[f] ?? 0})`}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-gray-400">Loading reports…</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Heart className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">{filter === "all" ? "No reports submitted yet." : `No ${filter.replace("_", " ")} reports.`}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(r => <ReportCard key={r.id} report={r} onUpdate={handleUpdate} />)}
        </div>
      )}
    </div>
  )
}
