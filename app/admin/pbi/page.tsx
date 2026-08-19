"use client"

import { useEffect, useState } from "react"
import { TrendingUp, ChevronDown, ChevronUp, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import type { InvestorExpression } from "@/lib/investor-store"

const RETURN_LABELS: Record<string, string> = {
  return_capital: "Return of capital",
  return_capital_profit: "Capital + profit",
  revenue_share: "Revenue share",
  social_impact: "Social impact only",
  ownership_transfer: "Ownership transfer",
  combination: "Combination",
  need_more_info: "Needs more info",
}

const INTEREST_LABELS: Record<string, string> = {
  own_bajaji: "Own a Bajaji",
  want_more_info: "Wants more info",
  co_investment: "Co-investment",
  not_now: "Not at this time",
}

const PERIOD_LABELS: Record<string, string> = {
  "12": "12 months",
  "18": "18 months",
  "24": "24 months",
  "24_36": "24–36 months",
  open: "Open to discussion",
}

const SELECTION_LABELS: Record<string, string> = {
  yes_choose: "Yes — wants to choose",
  ovah_recommends: "OVAH to recommend",
  either: "Either works",
}

const STATUS_CONFIG = {
  new:         { label: "New",         color: "bg-red-100 text-red-700",     icon: AlertCircle },
  contacted:   { label: "Contacted",   color: "bg-blue-100 text-blue-700",   icon: Clock },
  in_progress: { label: "In Progress", color: "bg-amber-100 text-amber-700", icon: CheckCircle2 },
  closed:      { label: "Closed",      color: "bg-gray-100 text-gray-500",   icon: XCircle },
}

const NEXT_STATUSES: Record<string, { label: string; value: string }[]> = {
  new:         [{ label: "Mark Contacted",   value: "contacted"   }, { label: "Close", value: "closed" }],
  contacted:   [{ label: "Mark In Progress", value: "in_progress" }, { label: "Close", value: "closed" }],
  in_progress: [{ label: "Close",            value: "closed"      }],
  closed:      [],
}

function Detail({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">{label}</p>
      <p className={`text-gray-800 ${mono ? "font-mono text-xs" : "text-sm"}`}>{value}</p>
    </div>
  )
}

function ExpressionCard({ item, onUpdate }: { item: InvestorExpression; onUpdate: (i: InvestorExpression) => void }) {
  const [open, setOpen] = useState(false)
  const [updating, setUpdating] = useState(false)
  const cfg = STATUS_CONFIG[item.status]
  const Icon = cfg.icon

  async function updateStatus(status: string) {
    setUpdating(true)
    const res = await fetch(`/api/admin/pbi/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    if (res.ok) onUpdate({ ...item, status: status as InvestorExpression["status"] })
    setUpdating(false)
  }

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
          <p className="font-semibold text-[#182858] text-sm">{item.fullName}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {new Date(item.submittedAt).toLocaleString()}
            {item.location ? ` · ${item.location}` : ""}
            {" · "}{INTEREST_LABELS[item.investmentInterest] ?? item.investmentInterest}
          </p>
          <p className="text-xs text-gray-500 mt-1">{item.email} · {item.phone}</p>
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" /> : <ChevronDown className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />}
      </button>

      {open && (
        <div className="border-t border-gray-100 p-5 space-y-4 bg-gray-50">
          <div className="grid sm:grid-cols-2 gap-4">
            <Detail label="Investment interest" value={INTEREST_LABELS[item.investmentInterest] ?? item.investmentInterest} />
            <Detail label="Investment period" value={PERIOD_LABELS[item.investmentPeriod] ?? item.investmentPeriod} />
            <Detail label="Entrepreneur selection" value={SELECTION_LABELS[item.entrepreneurSelection] ?? item.entrepreneurSelection} />
            <Detail label="Report ID" value={item.id} mono />
          </div>

          {item.expectedReturns.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Expected returns</p>
              <div className="flex flex-wrap gap-2">
                {item.expectedReturns.map(r => (
                  <span key={r} className="px-2.5 py-1 rounded-full bg-[#29A9DF]/10 text-[#182858] text-xs font-medium">
                    {RETURN_LABELS[r] ?? r}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-lg border border-[#29A9DF]/30 bg-[#29A9DF]/5 p-3 text-sm space-y-1">
            <p className="text-xs font-semibold text-[#182858] uppercase tracking-wide mb-1">Contact</p>
            <p><span className="text-gray-500">Email: </span><a href={`mailto:${item.email}`} className="underline text-[#182858]">{item.email}</a></p>
            <p><span className="text-gray-500">Phone: </span><a href={`tel:${item.phone}`} className="underline text-[#182858]">{item.phone}</a></p>
            {item.location && <p><span className="text-gray-500">Location: </span>{item.location}</p>}
          </div>

          {item.questions && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Questions from investor</p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap bg-white rounded-lg border border-gray-200 p-3">{item.questions}</p>
            </div>
          )}

          {NEXT_STATUSES[item.status].length > 0 && (
            <div className="flex gap-2 pt-1">
              {NEXT_STATUSES[item.status].map(({ label, value }) => (
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

export default function PBIAdminPage() {
  const [items, setItems] = useState<InvestorExpression[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | InvestorExpression["status"]>("all")

  useEffect(() => {
    fetch("/api/admin/pbi")
      .then(r => r.json())
      .then(setItems)
      .finally(() => setLoading(false))
  }, [])

  function handleUpdate(updated: InvestorExpression) {
    setItems(prev => prev.map(i => i.id === updated.id ? updated : i))
  }

  const filtered = filter === "all" ? items : items.filter(i => i.status === filter)
  const counts = items.reduce((acc, i) => ({ ...acc, [i.status]: (acc[i.status] ?? 0) + 1 }), {} as Record<string, number>)

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <TrendingUp className="h-6 w-6 text-[#182858]" />
        <div>
          <h1 className="text-xl font-bold text-[#182858]">PBI Investor Expressions</h1>
          <p className="text-sm text-gray-500">{items.length} total · {counts.new ?? 0} new</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(["all", "new", "contacted", "in_progress", "closed"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition border ${
              filter === f ? "bg-[#182858] text-white border-[#182858]" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            }`}
          >
            {f === "all"
              ? `All (${items.length})`
              : f === "in_progress"
              ? `In Progress (${counts.in_progress ?? 0})`
              : `${STATUS_CONFIG[f].label} (${counts[f] ?? 0})`}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-gray-400">Loading…</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <TrendingUp className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">{filter === "all" ? "No expressions of interest yet." : `No ${filter.replace("_", " ")} entries.`}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(i => <ExpressionCard key={i.id} item={i} onUpdate={handleUpdate} />)}
        </div>
      )}
    </div>
  )
}
