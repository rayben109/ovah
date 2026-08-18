"use client"

import { useState } from "react"
import {
  CheckCircle2, Loader2, AlertCircle, User, Heart,
  MapPin, Users, HelpingHand, ShieldCheck, ChevronRight,
} from "lucide-react"

const INCIDENT_TYPES = [
  "Sexual violence (rape, sexual assault, defilement)",
  "Physical violence or battery",
  "Emotional or psychological abuse",
  "Economic abuse or deprivation",
  "Child marriage / early forced marriage",
  "Female Genital Mutilation (FGM)",
  "Human trafficking or exploitation",
  "Domestic violence",
  "Other",
]

const SUPPORT_OPTIONS = [
  "Medical assistance",
  "Psychosocial counselling",
  "Legal support",
  "Safe shelter",
  "Referral to other services",
  "I just want to report — no support needed",
]

const GENDER_OPTIONS = ["Female", "Male", "Non-binary", "Prefer not to say"]

type Status = "idle" | "submitting" | "success" | "error"

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

const selectCls =
  "w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-800 " +
  "focus:outline-none focus:ring-2 focus:ring-[#182858]/20 focus:border-[#182858] transition"

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
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
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

export default function ReportForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [form, setForm] = useState({
    reportingFor: "" as "myself" | "someone_else" | "bystander" | "",
    reporterName: "", reporterAge: "", reporterGender: "",
    reporterContact: "", reporterDistrict: "",
    anonymous: "" as "yes" | "no" | "",
    incidentTypes: [] as string[], otherIncidentType: "",
    incidentDate: "", incidentLocation: "",
    incidentDetails: "",
    perpetratorRelationship: "", perpetratorDetails: "",
    supportNeeded: [] as string[], otherSupport: "",
    allowContact: "" as "yes" | "no" | "",
    understood: false,
  })

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }))

  function toggleList(field: "incidentTypes" | "supportNeeded", option: string) {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(option)
        ? prev[field].filter((c: string) => c !== option)
        : [...prev[field], option],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("submitting")
    try {
      const res = await fetch("/api/report", {
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
      reportingFor: "", reporterName: "", reporterAge: "", reporterGender: "",
      reporterContact: "", reporterDistrict: "", anonymous: "",
      incidentTypes: [], otherIncidentType: "", incidentDate: "",
      incidentLocation: "", incidentDetails: "", perpetratorRelationship: "",
      perpetratorDetails: "", supportNeeded: [], otherSupport: "",
      allowContact: "", understood: false,
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
          <h3 className="text-xl font-bold text-green-800 mb-1">Report Received</h3>
          <p className="text-green-700 text-sm max-w-md mx-auto">
            Thank you for trusting OVAH. Your report has been received and will be reviewed
            by a trained case worker.
            {form.allowContact === "yes" && form.reporterContact
              ? " We will follow up with you via the contact you provided."
              : ""}
          </p>
        </div>
        <p className="text-xs text-green-600 font-medium">
          If you are in immediate danger, please call the emergency line: <strong>116</strong>
        </p>
        <button onClick={reset} className="text-sm text-green-700 underline underline-offset-2 hover:text-green-900">
          Submit another report
        </button>
      </div>
    )
  }

  const hasOtherIncident = form.incidentTypes.includes("Other")
  const hasOtherSupport = form.supportNeeded.includes("I just want to report — no support needed")

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Emergency banner */}
      <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
        <p className="text-sm text-red-700">
          <strong>In immediate danger?</strong> Call the national helpline <strong>116</strong> or go to your nearest police station or hospital.
        </p>
      </div>

      {/* ── Step 1: About You ──────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <SectionHeader
          step={1}
          icon={User}
          title="About You"
          subtitle="All contact fields are optional — you can report anonymously"
        />

        <div className="mb-5">
          <Field label="I am reporting…" required>
            <div className="flex flex-wrap gap-2 mt-1">
              {(["myself", "someone_else", "bystander"] as const).map(v => (
                <RadioPill
                  key={v}
                  name="reportingFor"
                  value={v}
                  label={v === "myself" ? "For myself" : v === "someone_else" ? "On behalf of someone" : "As a bystander / witness"}
                  checked={form.reportingFor === v}
                  onChange={() => setForm(p => ({ ...p, reportingFor: v }))}
                />
              ))}
            </div>
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <Field label="Name">
            <input type="text" value={form.reporterName} onChange={set("reporterName")}
              placeholder="Your name (optional)" className={inputCls} />
          </Field>
          <Field label="Age">
            <input type="number" min="0" max="120" value={form.reporterAge} onChange={set("reporterAge")}
              placeholder="Your age" className={inputCls} />
          </Field>
          <Field label="Gender">
            <select value={form.reporterGender} onChange={set("reporterGender")} className={selectCls}>
              <option value="">Select gender (optional)</option>
              {GENDER_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </Field>
          <Field label="District / Region">
            <input type="text" value={form.reporterDistrict} onChange={set("reporterDistrict")}
              placeholder="e.g. Dar es Salaam, Mwanza…" className={inputCls} />
          </Field>
          <Field label="Phone or Email (for follow-up)" hint="Only used if you allow us to contact you">
            <input type="text" value={form.reporterContact} onChange={set("reporterContact")}
              placeholder="+255 700 000 000 or email" className={inputCls} />
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
            Your details are visible only to authorised OVAH case workers and will never be disclosed without your consent.
          </p>
        )}
      </div>

      {/* ── Step 2: Type of Incident ───────────────────────────────────────── */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <SectionHeader
          step={2}
          icon={Heart}
          title="Type of Incident"
          subtitle="Select all that apply"
        />
        <div className="space-y-2">
          {INCIDENT_TYPES.map(option => (
            <div key={option}>
              <CheckCard
                label={option}
                checked={form.incidentTypes.includes(option)}
                onChange={() => toggleList("incidentTypes", option)}
              />
              {option === "Other" && hasOtherIncident && (
                <input
                  type="text"
                  value={form.otherIncidentType}
                  onChange={set("otherIncidentType")}
                  placeholder="Please describe…"
                  className={`mt-2 ${inputCls}`}
                />
              )}
            </div>
          ))}
        </div>
        {form.incidentTypes.length === 0 && (
          <p className="mt-3 text-xs text-gray-400">Please select at least one type of incident.</p>
        )}
      </div>

      {/* ── Step 3: Incident Details ───────────────────────────────────────── */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <SectionHeader
          step={3}
          icon={MapPin}
          title="Incident Details"
        />
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <Field label="Approximate date of the incident">
            <input type="date" value={form.incidentDate} onChange={set("incidentDate")} className={inputCls} />
          </Field>
          <Field label="Location of the incident">
            <input type="text" value={form.incidentLocation} onChange={set("incidentLocation")}
              placeholder="e.g. Kinondoni, Arusha District…" className={inputCls} />
          </Field>
        </div>
        <Field
          label="Describe what happened"
          required
          hint="Share only what you are comfortable with. You do not have to include everything."
        >
          <textarea
            required
            rows={7}
            value={form.incidentDetails}
            onChange={set("incidentDetails")}
            placeholder="Describe the incident in as much or as little detail as you wish…"
            className={textareaCls}
          />
        </Field>
      </div>

      {/* ── Step 4: Perpetrator (Optional) ────────────────────────────────── */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <SectionHeader
          step={4}
          icon={Users}
          title="About the Perpetrator"
          subtitle="Optional — share only what you feel safe sharing"
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Relationship to you">
            <select value={form.perpetratorRelationship} onChange={set("perpetratorRelationship")} className={selectCls}>
              <option value="">Select (optional)</option>
              {["Partner / spouse", "Family member", "Neighbour", "Teacher / authority figure",
                "Employer / colleague", "Stranger", "Community leader", "Other"].map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </Field>
          <Field label="Any other details (optional)">
            <input type="text" value={form.perpetratorDetails} onChange={set("perpetratorDetails")}
              placeholder="e.g. approximate age, description…" className={inputCls} />
          </Field>
        </div>
      </div>

      {/* ── Step 5: Support Needed ─────────────────────────────────────────── */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <SectionHeader
          step={5}
          icon={HelpingHand}
          title="Support Needed"
          subtitle="What kind of support would you like from OVAH?"
        />
        <div className="space-y-2">
          {SUPPORT_OPTIONS.map(option => (
            <div key={option}>
              <CheckCard
                label={option}
                checked={form.supportNeeded.includes(option)}
                onChange={() => toggleList("supportNeeded", option)}
              />
            </div>
          ))}
        </div>

        <div className="mt-5">
          <Field label="Can OVAH contact you for follow-up?" required>
            <div className="flex gap-3 mt-1">
              <RadioPill name="allowContact" value="yes" label="Yes, please follow up"
                checked={form.allowContact === "yes"} onChange={() => setForm(p => ({ ...p, allowContact: "yes" }))} />
              <RadioPill name="allowContact" value="no" label="No, do not contact me"
                checked={form.allowContact === "no"} onChange={() => setForm(p => ({ ...p, allowContact: "no" }))} />
            </div>
          </Field>
        </div>
      </div>

      {/* ── Step 6: Confidentiality Declaration ───────────────────────────── */}
      <div className="rounded-2xl border border-[#182858]/20 bg-[#182858]/5 p-6 shadow-sm">
        <SectionHeader step={6} icon={ShieldCheck} title="Confidentiality Notice" />
        <p className="text-sm text-gray-700 leading-relaxed mb-5">
          All information you share will be treated with strict confidentiality. Your report
          will only be accessed by trained OVAH case workers. No information will be shared
          with third parties without your explicit consent, except where there is immediate
          risk to life, as required by law.
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
          Something went wrong submitting your report. Please try again or call <strong className="ml-1">116</strong>.
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
          disabled={
            status === "submitting" ||
            form.incidentTypes.length === 0 ||
            !form.understood ||
            !form.anonymous ||
            !form.reportingFor ||
            !form.allowContact
          }
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
        Your submission is encrypted and stored securely. You are safe to report.
      </p>
    </form>
  )
}
