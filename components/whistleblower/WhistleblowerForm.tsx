"use client"

import { useState } from "react"
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react"

const CONCERN_TYPES = [
  "Misconduct or unethical behaviour",
  "Financial fraud or misuse of funds",
  "Safeguarding concern",
  "Harassment or discrimination",
  "Conflict of interest",
  "Policy or donor requirement violation",
  "Other",
]

type Status = "idle" | "submitting" | "success" | "error"

export default function WhistleblowerForm() {
  const [anonymous, setAnonymous] = useState(true)
  const [status, setStatus] = useState<Status>("idle")
  const [form, setForm] = useState({
    concernType: "",
    description: "",
    incidentDate: "",
    personsInvolved: "",
    location: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    declaration: false,
  })

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.declaration) return
    setStatus("submitting")
    try {
      const res = await fetch("/api/whistleblower", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, anonymous }),
      })
      if (!res.ok) throw new Error()
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-100 bg-green-50 p-10 text-center space-y-3">
        <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
        <h3 className="text-xl font-bold text-green-800">Report Submitted</h3>
        <p className="text-green-700 text-sm max-w-md mx-auto">
          Your report has been received and will be reviewed by authorised OVAH personnel.
          {!anonymous && form.contactEmail && " We will follow up via the contact details you provided."}
          {anonymous && " As you submitted anonymously, no follow-up will be sent."}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Anonymity toggle */}
      <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-gray-50">
        <button
          type="button"
          onClick={() => setAnonymous(true)}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition border ${
            anonymous ? "bg-[#182858] text-white border-[#182858]" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
          }`}
        >
          Submit Anonymously
        </button>
        <button
          type="button"
          onClick={() => setAnonymous(false)}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition border ${
            !anonymous ? "bg-[#182858] text-white border-[#182858]" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
          }`}
        >
          Include My Details
        </button>
      </div>

      {/* Type of concern */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700">
          Type of concern <span className="text-red-500">*</span>
        </label>
        <select
          required
          value={form.concernType}
          onChange={set("concernType")}
          className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#182858]/30 focus:border-[#182858]"
        >
          <option value="" disabled>Select a concern type…</option>
          {CONCERN_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={6}
          value={form.description}
          onChange={set("description")}
          placeholder="Describe the concern in as much detail as you are comfortable sharing. Include what happened, when, and any relevant context."
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#182858]/30 focus:border-[#182858] resize-none"
        />
      </div>

      {/* Optional fields */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-600">
            Date of incident <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="date"
            value={form.incidentDate}
            onChange={set("incidentDate")}
            max={new Date().toISOString().split("T")[0]}
            className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#182858]/30 focus:border-[#182858]"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-600">
            Location / department <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={form.location}
            onChange={set("location")}
            placeholder="e.g. Dar es Salaam office"
            className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#182858]/30 focus:border-[#182858]"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-600">
          Person(s) involved <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={form.personsInvolved}
          onChange={set("personsInvolved")}
          placeholder="Name(s) or role(s) of person(s) involved"
          className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#182858]/30 focus:border-[#182858]"
        />
      </div>

      {/* Contact details — only when not anonymous */}
      {!anonymous && (
        <div className="rounded-xl border border-[#29A9DF]/30 bg-[#29A9DF]/5 p-5 space-y-4">
          <p className="text-sm text-[#182858] font-medium">
            Your contact details — only accessible to authorised OVAH personnel
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-600">Full name</label>
              <input
                type="text"
                value={form.contactName}
                onChange={set("contactName")}
                placeholder="Your name"
                className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#182858]/30 focus:border-[#182858]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-600">Email address</label>
              <input
                type="email"
                value={form.contactEmail}
                onChange={set("contactEmail")}
                placeholder="you@example.com"
                className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#182858]/30 focus:border-[#182858]"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-600">Phone number <span className="text-gray-400 font-normal">(optional)</span></label>
            <input
              type="tel"
              value={form.contactPhone}
              onChange={set("contactPhone")}
              placeholder="+255 700 000 000"
              className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#182858]/30 focus:border-[#182858]"
            />
          </div>
        </div>
      )}

      {/* Declaration */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          required
          checked={form.declaration}
          onChange={set("declaration")}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-[#182858]"
        />
        <span className="text-sm text-gray-600">
          I confirm this report is submitted in good faith and to the best of my knowledge is accurate.
        </span>
      </label>

      {status === "error" && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Something went wrong. Please try again or contact OVAH directly.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting" || !form.declaration}
        className="w-full h-11 bg-[#182858] hover:bg-[#182858]/90 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition flex items-center justify-center gap-2"
      >
        {status === "submitting" ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</>
        ) : "Submit Report"}
      </button>
    </form>
  )
}
