"use client"

import { useState } from "react"
import {
  CheckCircle2, Loader2, AlertCircle, User, FileSearch,
  ClipboardList, Paperclip, Target, ShieldCheck, ChevronRight,
} from "lucide-react"

const CONCERN_OPTIONS = [
  "Fraud or financial misconduct",
  "Safeguarding concern (abuse, exploitation, harassment)",
  "Workplace misconduct (bullying, harassment, discrimination)",
  "Breach of OVAH Code of Conduct",
  "Other",
]

type Status = "idle" | "submitting" | "success" | "error"

// ── Shared primitives ──────────────────────────────────────────────────────────

function SectionHeader({
  step, icon: Icon, title, subtitle,
}: { step: number; icon: React.FC<{ className?: string }>; title: string; subtitle?: string }) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#182858] text-white flex items-center justify-center shadow-sm">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#29A9DF] mb-0.5">
          Step {step}
        </p>
        <h3 className="text-base font-bold text-[#182858]">{title}</h3>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  )
}

function Field({
  label, required, hint, children,
}: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
      {children}
    </div>
  )
}

const inputCls =
  "w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-800 " +
  "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#182858]/20 focus:border-[#182858] transition"

const textareaCls =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 " +
  "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#182858]/20 focus:border-[#182858] transition resize-none"

function RadioPill({
  name, value, checked, onChange, label,
}: { name: string; value: string; checked: boolean; onChange: () => void; label: string }) {
  return (
    <label
      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg border text-sm font-medium cursor-pointer transition select-none ${
        checked
          ? "border-[#182858] bg-[#182858] text-white"
          : "border-gray-200 bg-white text-gray-600 hover:border-[#182858]/40 hover:bg-gray-50"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
        required
      />
      {label}
    </label>
  )
}

function CheckCard({
  label, checked, onChange,
}: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition select-none ${
        checked
          ? "border-[#182858] bg-[#182858]/5"
          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      <span
        className={`w-5 h-5 rounded flex items-center justify-center border-2 transition shrink-0 ${
          checked ? "bg-[#182858] border-[#182858]" : "border-gray-300 bg-white"
        }`}
      >
        {checked && (
          <svg viewBox="0 0 10 8" className="w-3 h-3 fill-none stroke-white stroke-2">
            <polyline points="1,4 4,7 9,1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className={`text-sm ${checked ? "text-[#182858] font-medium" : "text-gray-700"}`}>
        {label}
      </span>
    </label>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function WhistleblowerForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [form, setForm] = useState({
    reporterName: "", reporterRole: "", reporterEmail: "", reporterPhone: "",
    anonymous: "" as "yes" | "no" | "",
    concernTypes: [] as string[], otherConcern: "",
    details: "",
    evidenceAvailable: "" as "yes" | "no" | "", evidenceDescription: "",
    desiredOutcome: "",
    understood: false,
  })

  const set = (field: keyof typeof form) =>
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

  function reset() {
    setForm({
      reporterName: "", reporterRole: "", reporterEmail: "", reporterPhone: "",
      anonymous: "", concernTypes: [], otherConcern: "", details: "",
      evidenceAvailable: "", evidenceDescription: "", desiredOutcome: "", understood: false,
    })
    setStatus("idle")
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-100 bg-green-50 p-12 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-green-800 mb-1">Report Submitted</h3>
          <p className="text-green-700 text-sm max-w-md mx-auto">
            Your report has been received and will be reviewed by authorised OVAH personnel.
            {form.anonymous !== "yes" && form.reporterEmail
              ? " We will follow up via the email address you provided."
              : " As you submitted anonymously, no follow-up communication will be sent."}
          </p>
        </div>
        <button onClick={reset} className="text-sm text-green-700 underline underline-offset-2 hover:text-green-900">
          Submit another report
        </button>
      </div>
    )
  }

  const hasOther = form.concernTypes.includes("Other")

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* ── Step 1: Reporter Information ───────────────────────────────────── */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <SectionHeader
          step={1}
          icon={User}
          title="Reporter Information"
          subtitle="Optional if you wish to remain anonymous"
        />
        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <Field label="Full name">
            <input type="text" value={form.reporterName} onChange={set("reporterName")}
              placeholder="Your name" className={inputCls} />
          </Field>
          <Field label="Role / Position">
            <input type="text" value={form.reporterRole} onChange={set("reporterRole")}
              placeholder="Your role or position" className={inputCls} />
          </Field>
          <Field label="Email address">
            <input type="email" value={form.reporterEmail} onChange={set("reporterEmail")}
              placeholder="you@example.com" className={inputCls} />
          </Field>
          <Field label="Phone number">
            <input type="tel" value={form.reporterPhone} onChange={set("reporterPhone")}
              placeholder="+255 700 000 000" className={inputCls} />
          </Field>
        </div>

        <Field label="Would you like to remain anonymous?" required>
          <div className="flex gap-3 mt-1">
            <RadioPill name="anonymous" value="yes" label="Yes, keep me anonymous"
              checked={form.anonymous === "yes"} onChange={() => setForm(p => ({ ...p, anonymous: "yes" }))} />
            <RadioPill name="anonymous" value="no" label="No, include my details"
              checked={form.anonymous === "no"} onChange={() => setForm(p => ({ ...p, anonymous: "no" }))} />
          </div>
        </Field>

        {form.anonymous === "no" && (
          <p className="mt-3 text-xs text-[#29A9DF] bg-[#29A9DF]/10 rounded-lg px-3 py-2">
            Your details are visible only to authorised OVAH personnel and will never be shared without due process.
          </p>
        )}
      </div>

      {/* ── Step 2: Type of Concern ────────────────────────────────────────── */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <SectionHeader
          step={2}
          icon={FileSearch}
          title="Type of Concern"
          subtitle="Select all that apply"
        />
        <div className="space-y-2">
          {CONCERN_OPTIONS.map(option => (
            <div key={option}>
              <CheckCard
                label={option}
                checked={form.concernTypes.includes(option)}
                onChange={() => toggleConcern(option)}
              />
              {option === "Other" && hasOther && (
                <input
                  type="text"
                  value={form.otherConcern}
                  onChange={set("otherConcern")}
                  placeholder="Please specify…"
                  className={`mt-2 ${inputCls}`}
                />
              )}
            </div>
          ))}
        </div>
        {form.concernTypes.length === 0 && (
          <p className="mt-3 text-xs text-gray-400">Please select at least one type of concern.</p>
        )}
      </div>

      {/* ── Step 3: Incident Details ───────────────────────────────────────── */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <SectionHeader
          step={3}
          icon={ClipboardList}
          title="Details of the Concern"
        />
        <Field
          label="Describe the concern"
          required
          hint="Include: date(s) of the incident, location / department / project, individuals involved (if known), and a full description of what happened."
        >
          <textarea
            required
            rows={7}
            value={form.details}
            onChange={set("details")}
            placeholder="Provide as much detail as you are comfortable sharing…"
            className={textareaCls}
          />
        </Field>
      </div>

      {/* ── Step 4: Evidence ──────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <SectionHeader step={4} icon={Paperclip} title="Evidence" />
        <Field label="Do you have any evidence available?" required>
          <div className="flex gap-3 mt-1">
            <RadioPill name="evidence" value="yes" label="Yes"
              checked={form.evidenceAvailable === "yes"} onChange={() => setForm(p => ({ ...p, evidenceAvailable: "yes" }))} />
            <RadioPill name="evidence" value="no" label="No"
              checked={form.evidenceAvailable === "no"} onChange={() => setForm(p => ({ ...p, evidenceAvailable: "no" }))} />
          </div>
        </Field>
        {form.evidenceAvailable === "yes" && (
          <div className="mt-4">
            <Field label="Describe the evidence or how to access it" hint="You may also share evidence through a private channel agreed with the reviewer.">
              <input type="text" value={form.evidenceDescription} onChange={set("evidenceDescription")}
                placeholder="e.g. Screenshots saved to personal device, email thread…" className={inputCls} />
            </Field>
          </div>
        )}
      </div>

      {/* ── Step 5: Desired Outcome ────────────────────────────────────────── */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <SectionHeader step={5} icon={Target} title="Desired Outcome"
          subtitle="What action or resolution would you like to see?" />
        <Field label="Your desired outcome" required>
          <textarea
            required
            rows={4}
            value={form.desiredOutcome}
            onChange={set("desiredOutcome")}
            placeholder="Describe the action or resolution you are hoping for…"
            className={textareaCls}
          />
        </Field>
      </div>

      {/* ── Step 6: Confidentiality Declaration ───────────────────────────── */}
      <div className="rounded-2xl border border-[#182858]/20 bg-[#182858]/5 p-6 shadow-sm">
        <SectionHeader step={6} icon={ShieldCheck} title="Confidentiality Notice" />
        <p className="text-sm text-gray-700 leading-relaxed mb-5">
          All information provided will be treated confidentially. Reports will be reviewed and
          investigated in line with OVAH&apos;s Whistleblowing Policy. No individual will face
          retaliation for reporting in good faith.
        </p>
        <label
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition select-none ${
            form.understood
              ? "border-[#182858] bg-white"
              : "border-gray-200 bg-white hover:border-[#182858]/40"
          }`}
        >
          <span
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
              form.understood ? "border-[#182858] bg-[#182858]" : "border-gray-300"
            }`}
          >
            {form.understood && <span className="w-2 h-2 rounded-full bg-white" />}
          </span>
          <input
            type="radio"
            name="understood"
            required
            checked={form.understood}
            onChange={() => setForm(p => ({ ...p, understood: true }))}
            className="sr-only"
          />
          <span className={`text-sm font-medium ${form.understood ? "text-[#182858]" : "text-gray-700"}`}>
            I understand and agree to the above
          </span>
        </label>
      </div>

      {/* ── Errors & Submit ────────────────────────────────────────────────── */}
      {status === "error" && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Something went wrong submitting your report. Please try again.
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={reset}
          className="text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2 transition"
        >
          Clear form
        </button>
        <button
          type="submit"
          disabled={status === "submitting" || form.concernTypes.length === 0 || !form.understood || !form.anonymous}
          className="flex items-center gap-2 px-7 h-11 bg-[#182858] hover:bg-[#182858]/90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm transition shadow-sm"
        >
          {status === "submitting" ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</>
          ) : (
            <>Submit Report <ChevronRight className="h-4 w-4" /></>
          )}
        </button>
      </div>

      <p className="text-center text-xs text-gray-400 pb-2">
        Your submission is encrypted and stored securely. Never include passwords or sensitive credentials.
      </p>
    </form>
  )
}
