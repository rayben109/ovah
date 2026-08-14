"use client"

import { useState } from "react"
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react"

const CONCERN_OPTIONS = [
  "Fraud or financial misconduct",
  "Safeguarding concern (abuse, exploitation, harassment)",
  "Workplace misconduct (bullying, harassment, discrimination)",
  "Breach of OVAH Code of Conduct",
  "Other",
]

type Status = "idle" | "submitting" | "success" | "error"

const inputCls = "w-full border-0 border-b border-gray-300 focus:border-[#182858] focus:outline-none py-1.5 text-sm text-gray-800 placeholder:text-gray-400 bg-transparent transition"
const sectionHeaderCls = "bg-[#d4a09a]/30 border border-gray-200 rounded-t-lg px-4 py-3"

export default function WhistleblowerForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [form, setForm] = useState({
    reporterName: "",
    reporterRole: "",
    reporterEmail: "",
    reporterPhone: "",
    anonymous: "" as "yes" | "no" | "",
    concernTypes: [] as string[],
    otherConcern: "",
    details: "",
    evidenceAvailable: "" as "yes" | "no" | "",
    evidenceDescription: "",
    desiredOutcome: "",
    understood: false,
  })

  const setField = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }))

  function toggleConcern(option: string) {
    setForm(prev => ({
      ...prev,
      concernTypes: prev.concernTypes.includes(option)
        ? prev.concernTypes.filter(c => c !== option)
        : [...prev.concernTypes, option],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("submitting")
    try {
      const res = await fetch("/api/whistleblower", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
          {form.anonymous === "no" && form.reporterEmail
            ? " We will follow up via the email address you provided."
            : " As you submitted anonymously, no follow-up will be sent."}
        </p>
      </div>
    )
  }

  const hasOther = form.concernTypes.includes("Other")

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Section 1: Reporter Information */}
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <div className={sectionHeaderCls}>
          <p className="text-sm font-semibold text-gray-800">
            Reporter Information{" "}
            <span className="font-normal text-gray-500 italic">(optional if reporting anonymously)</span>
          </p>
        </div>
        <div className="bg-white divide-y divide-gray-100">
          {[
            { label: "Name", field: "reporterName", placeholder: "Your answer" },
            { label: "Role / Position", field: "reporterRole", placeholder: "Your answer" },
            { label: "Email", field: "reporterEmail", placeholder: "Your answer", type: "email" },
            { label: "Phone", field: "reporterPhone", placeholder: "Your answer", type: "tel" },
          ].map(({ label, field, placeholder, type = "text" }) => (
            <div key={field} className="px-4 py-4">
              <label className="block text-sm text-gray-700 mb-2">{label}</label>
              <input
                type={type}
                value={form[field as keyof typeof form] as string}
                onChange={setField(field as keyof typeof form)}
                placeholder={placeholder}
                className={inputCls}
              />
            </div>
          ))}

          {/* Anonymous radio */}
          <div className="px-4 py-4">
            <label className="block text-sm text-gray-700 mb-3">
              Would you like to remain anonymous? <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {(["Yes", "No"] as const).map(opt => (
                <label key={opt} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="anonymous"
                    value={opt.toLowerCase()}
                    checked={form.anonymous === opt.toLowerCase()}
                    onChange={() => setForm(prev => ({ ...prev, anonymous: opt.toLowerCase() as "yes" | "no" }))}
                    required
                    className="h-4 w-4 accent-[#182858]"
                  />
                  <span className="text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Type of Concern */}
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <div className={sectionHeaderCls}>
          <p className="text-sm font-semibold text-gray-800">
            Section 2: Type of Concern{" "}
            <span className="font-normal text-gray-500 italic">(tick all that apply)</span>{" "}
            <span className="text-red-500">*</span>
          </p>
        </div>
        <div className="bg-white px-4 py-4 space-y-3">
          {CONCERN_OPTIONS.map(option => (
            <div key={option}>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.concernTypes.includes(option)}
                  onChange={() => toggleConcern(option)}
                  className="mt-0.5 h-4 w-4 rounded accent-[#182858]"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
              {option === "Other" && hasOther && (
                <input
                  type="text"
                  value={form.otherConcern}
                  onChange={setField("otherConcern")}
                  placeholder="Please specify"
                  className={`mt-2 ml-7 ${inputCls}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Details of the Concern */}
      <div className="rounded-lg border border-gray-200 bg-white px-4 py-4">
        <label className="block text-sm text-gray-700 mb-1">
          Details of the Concern{" "}
          <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Include Date(s) of incident(s), Location / Department / Project, Individuals involved (if known), Description of the concern / incident (include as much detail as possible):
        </p>
        <textarea
          required
          rows={5}
          value={form.details}
          onChange={setField("details")}
          placeholder="Your answer"
          className="w-full border-b border-gray-300 focus:border-[#182858] focus:outline-none py-1.5 text-sm text-gray-800 placeholder:text-gray-400 bg-transparent transition resize-none"
        />
      </div>

      {/* Evidence */}
      <div className="rounded-lg border border-gray-200 bg-white px-4 py-4">
        <label className="block text-sm text-gray-700 mb-3">
          Any evidence available? <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {(["Yes", "No"] as const).map(opt => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="evidence"
                value={opt.toLowerCase()}
                checked={form.evidenceAvailable === opt.toLowerCase()}
                onChange={() => setForm(prev => ({ ...prev, evidenceAvailable: opt.toLowerCase() as "yes" | "no" }))}
                required
                className="h-4 w-4 accent-[#182858]"
              />
              <span className="text-sm text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Evidence description — shown when Yes */}
      {form.evidenceAvailable === "yes" && (
        <div className="rounded-lg border border-gray-200 bg-white px-4 py-4">
          <label className="block text-sm text-gray-700 mb-2">
            If yes, describe or attach using a private channel
          </label>
          <input
            type="text"
            value={form.evidenceDescription}
            onChange={setField("evidenceDescription")}
            placeholder="Your answer"
            className={inputCls}
          />
        </div>
      )}

      {/* Desired Outcome */}
      <div className="rounded-lg border border-gray-200 bg-white px-4 py-4">
        <label className="block text-sm text-gray-700 mb-1">
          <span className="font-semibold">Desired Outcome</span> What action or resolution would you like to see?{" "}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={3}
          value={form.desiredOutcome}
          onChange={setField("desiredOutcome")}
          placeholder="Your answer"
          className="w-full border-b border-gray-300 focus:border-[#182858] focus:outline-none py-1.5 text-sm text-gray-800 placeholder:text-gray-400 bg-transparent transition resize-none"
        />
      </div>

      {/* Confidentiality Notice */}
      <div className="rounded-lg border border-gray-200 bg-white px-4 py-4">
        <label className="block text-sm mb-3">
          <span className="font-semibold text-gray-800">Confidentiality Notice: </span>
          <span className="text-red-500">*</span>
          <br />
          <span className="text-gray-600 text-xs leading-relaxed">
            All information provided will be treated confidentially. Reports will be reviewed and
            investigated in line with OVAH&apos;s Whistleblowing Policy. No individual will face
            retaliation for reporting in good faith.
          </span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="understood"
            required
            checked={form.understood}
            onChange={() => setForm(prev => ({ ...prev, understood: true }))}
            className="h-4 w-4 accent-[#182858]"
          />
          <span className="text-sm text-gray-700">I understand</span>
        </label>
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Something went wrong. Please try again.
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "submitting" || form.concernTypes.length === 0}
          className="px-6 h-10 bg-[#b5463a] hover:bg-[#9e3c31] disabled:opacity-50 text-white font-semibold rounded text-sm transition flex items-center gap-2"
        >
          {status === "submitting" ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</>
          ) : "Submit"}
        </button>
        <button
          type="button"
          onClick={() => setForm({
            reporterName: "", reporterRole: "", reporterEmail: "", reporterPhone: "",
            anonymous: "", concernTypes: [], otherConcern: "", details: "",
            evidenceAvailable: "", evidenceDescription: "", desiredOutcome: "", understood: false,
          })}
          className="text-sm text-[#b5463a] hover:underline"
        >
          Clear form
        </button>
      </div>

      <p className="text-xs text-gray-400">Never submit passwords through this form.</p>
    </form>
  )
}
