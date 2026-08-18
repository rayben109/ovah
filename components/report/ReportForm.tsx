"use client"

import { useState } from "react"
import { CheckCircle2, Loader2, AlertCircle, ChevronRight } from "lucide-react"

const REGIONS = [
  "Dodoma","Singida","Tabora","Dar es Salaam","Lindi","Morogoro","Mtwara",
  "Pwani","Geita","Kagera","Mara","Mwanza","Shinyanga","Simiyu","Arusha",
  "Kilimanjaro","Manyara","Tanga","Iringa","Mbeya","Njombe","Rukwa",
  "Ruvuma","Songwe","Katavi","Kigoma","Pemba North / Wete",
  "Pemba South / Chake Chake","Zanzibar North / Mkokotoni",
  "Zanzibar South / Koani","Zanzibar Urban West / Zanzibar city",
]

const ENVIRONMENTS = [
  "Home (Nyumbani)",
  "My Primary/Secondary School (Shule yangu ya msingi/secondary)",
  "University/College (Chuo)",
  "Neighbors House (Nyumba ya Jirani)",
  "Public Spaces (Mahali pa wazi)",
  "Public Transportation (Usafiri wa Umma)",
  "At work (Kazini)",
  "Worship Place like churches and mosques (Sehemu ya Kuabudu kama vile Kanisa au Misikiti)",
  "Online (Social Media, Other digital Platforms)",
  "Other",
]

const RELATIONSHIPS = [
  "Relative (Ndugu)",
  "Neighbour (Jirani)",
  "Teacher/Lecturer (Mwalimu)",
  "Family Friend (Rafiki wa Familia)",
  "Peers/Friends (Rafiki)",
  "Stranger (Mtu ambae simfahamu)",
  "Intimate Partner (Mpenzi)",
  "Other",
]

const VIOLENCE_TYPES = [
  "Unwelcome Sexual Comments or Lewd (Maoni ya kingono Yasiyokubaliwa au bila idhini yako) — e.g. Catcalling",
  "Inappropriate Touching (Kuguswa sehemu mbalimbali za mwili bila idhini yako) — e.g. Inappropriate touching on thighs or chest",
  "Unwanted Sexual Advances (Matendo yoyote ya kuingilia nafasi au mwili wa mtu yasiyohitajika) — e.g. Unwanted Kissing",
  "Child Sexual Abuse (Unyanyasaji wa kingono kwa watoto)",
  "Rape (Ubakaji)",
  "Request for Sex bribe (Kuombwa Rushwa ya Kingono)",
  "Intimate Partner Sexual Violence (Unyanyasaji wa kingono kutoka kwa Mpenzi au Mume)",
  "Psychological abuse/Intimidation",
  "Other",
]

const SUPPORT_OPTIONS = [
  "Wants to talk to a therapist/psychologist (Unahitaji kuongea na mtaalamu/mwanasaikolojia)",
  "Legal advice or assistance (Nahitaji msaada wa kisheria)",
  "To share my experience and you may post via social media anonymously to encourage other girls to speak up (Ku-share nyanyaso langu bila kuweka wazi jina langu)",
  "To share my experience and you may post via social media with my name to encourage other girls to speak up (Ku-share nyanyaso langu na kubainisha jina langu)",
  "Other",
]

type Status = "idle" | "submitting" | "success" | "error"

// ── Primitives ─────────────────────────────────────────────────────────────────

const inputCls =
  "w-full h-11 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-800 " +
  "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#182858]/20 focus:border-[#182858] transition"

const textareaCls =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 " +
  "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#182858]/20 focus:border-[#182858] transition resize-none"

const selectCls =
  "w-full h-11 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-800 " +
  "focus:outline-none focus:ring-2 focus:ring-[#182858]/20 focus:border-[#182858] transition"

function Q({ label, required, hint, children }: {
  label: string; required?: boolean; hint?: string; children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-gray-800 leading-snug">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </p>
      {hint && <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 leading-relaxed">{hint}</p>}
      {children}
    </div>
  )
}

function RadioOption({ name, value, label, checked, onChange }: {
  name: string; value: string; label: string; checked: boolean; onChange: () => void
}) {
  return (
    <label className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition select-none ${
      checked ? "border-[#182858] bg-[#182858]/5" : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
    }`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
        checked ? "border-[#182858] bg-[#182858]" : "border-gray-300"
      }`}>
        {checked && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
      </span>
      <span className={`text-sm ${checked ? "text-[#182858] font-medium" : "text-gray-700"}`}>{label}</span>
    </label>
  )
}

function CheckOption({ label, checked, onChange }: {
  label: string; checked: boolean; onChange: () => void
}) {
  return (
    <label className={`flex items-start gap-3 px-4 py-3 rounded-lg border cursor-pointer transition select-none ${
      checked ? "border-[#182858] bg-[#182858]/5" : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
    }`}>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span className={`w-5 h-5 rounded flex items-center justify-center border-2 transition shrink-0 mt-0.5 ${
        checked ? "bg-[#182858] border-[#182858]" : "border-gray-300 bg-white"
      }`}>
        {checked && (
          <svg viewBox="0 0 10 8" className="w-3 h-3 fill-none stroke-white stroke-2">
            <polyline points="1,4 4,7 9,1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className={`text-sm leading-snug ${checked ? "text-[#182858] font-medium" : "text-gray-700"}`}>{label}</span>
    </label>
  )
}

// ── Main ───────────────────────────────────────────────────────────────────────

export default function ReportForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [form, setForm] = useState({
    reportingFor: "" as "myself" | "someone_else" | "",
    anonymous: "" as "named" | "anonymous" | "",
    reporterName: "",
    victimName: "",
    sex: "" as "male" | "female" | "",
    phoneNumber: "",
    region: "",
    incidentDate: "",
    environment: "",
    environmentOther: "",
    perpetratorRelationship: "",
    perpetratorRelationshipOther: "",
    violenceTypes: [] as string[],
    violenceTypesOther: "",
    incidentDetails: "",
    supportNeeded: [] as string[],
    supportNeededOther: "",
  })

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(p => ({ ...p, [field]: e.target.value }))

  function toggleCheck(field: "violenceTypes" | "supportNeeded", value: string) {
    setForm(p => ({
      ...p,
      [field]: p[field].includes(value)
        ? p[field].filter((v: string) => v !== value)
        : [...p[field], value],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("submitting")
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          anonymous: form.anonymous === "anonymous",
        }),
      })
      if (!res.ok) throw new Error()
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  function reset() {
    setForm({
      reportingFor: "", anonymous: "", reporterName: "", victimName: "",
      sex: "", phoneNumber: "", region: "", incidentDate: "",
      environment: "", environmentOther: "", perpetratorRelationship: "",
      perpetratorRelationshipOther: "", violenceTypes: [], violenceTypesOther: "",
      incidentDetails: "", supportNeeded: [], supportNeededOther: "",
    })
    setStatus("idle")
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-100 bg-green-50 p-12 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-green-800">Report Received / Taarifa Imepokelewa</h3>
        <p className="text-green-700 text-sm max-w-md mx-auto">
          Thank you for trusting OVAH. Your report has been received and a case worker will review it.
          <br /><span className="text-green-600">Asante kwa kutuamini. Taarifa yako imepokelewa na mtaalamu ataipitia.</span>
        </p>
        <p className="text-xs text-green-600 font-semibold mt-2">
          Emergency / Dharura: <strong>116</strong>
        </p>
        <button onClick={reset} className="text-sm text-green-700 underline underline-offset-2 hover:text-green-900">
          Submit another report / Wasilisha taarifa nyingine
        </button>
      </div>
    )
  }

  const isOtherEnv   = form.environment === "Other"
  const isOtherRel   = form.perpetratorRelationship === "Other"
  const hasOtherViol = form.violenceTypes.includes("Other")
  const hasOtherSup  = form.supportNeeded.includes("Other")

  const canSubmit =
    !!form.reportingFor && !!form.anonymous && !!form.sex &&
    !!form.region && !!form.incidentDate && !!form.environment &&
    !!form.perpetratorRelationship && form.violenceTypes.length > 0 &&
    !!form.incidentDetails && form.supportNeeded.length > 0 &&
    status !== "submitting"

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Emergency notice */}
      <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
        <p className="text-sm text-red-700">
          <strong>In immediate danger? Uko katika hatari?</strong>{" "}
          Call / Piga simu: <strong>116</strong>
        </p>
      </div>

      {/* Q1 */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-3">
        <Q label="Are you reporting for yourself or someone else? / Je, unaripoti kwa ajili yako au mtu mwingine?" required>
          <div className="space-y-2">
            <RadioOption name="reportingFor" value="myself"
              label="Myself (Mimi Mwenyewe)"
              checked={form.reportingFor === "myself"}
              onChange={() => setForm(p => ({ ...p, reportingFor: "myself" }))} />
            <RadioOption name="reportingFor" value="someone_else"
              label="Someone Else (Mtu Mwingine)"
              checked={form.reportingFor === "someone_else"}
              onChange={() => setForm(p => ({ ...p, reportingFor: "someone_else" }))} />
          </div>
        </Q>
      </div>

      {/* Q2 */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-3">
        <Q label="Do you wish to report anonymously or with a name? / Ungependa Kuripoti na Jina au bila jina?" required>
          <div className="space-y-2">
            <RadioOption name="anonymous" value="named"
              label="I wish to report with a name (Nigependa kuripoti na Jina)"
              checked={form.anonymous === "named"}
              onChange={() => setForm(p => ({ ...p, anonymous: "named" }))} />
            <RadioOption name="anonymous" value="anonymous"
              label="I wish to report anonymously (Nigependa kuripoti bila ya Jina)"
              checked={form.anonymous === "anonymous"}
              onChange={() => setForm(p => ({ ...p, anonymous: "anonymous" }))} />
          </div>
        </Q>
      </div>

      {/* Q3 — reporter name (myself + named) */}
      {form.reportingFor === "myself" && form.anonymous === "named" && (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <Q label="What's your Name? / Jina lako ni Nani" required>
            <input type="text" value={form.reporterName} onChange={set("reporterName")}
              placeholder="Enter your name…" className={inputCls} required />
          </Q>
        </div>
      )}

      {/* Q4 — victim name (someone else) */}
      {form.reportingFor === "someone_else" && (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <Q label="What is the victim's name? / Jina la Muhanga?" required>
            <input type="text" value={form.victimName} onChange={set("victimName")}
              placeholder="Enter the victim's name…" className={inputCls} required />
          </Q>
        </div>
      )}

      {/* Q5 + Q6 + Q7 */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-5">
        <Q label="Sex (Jinsia)" required>
          <div className="space-y-2">
            <RadioOption name="sex" value="male" label="Male (Mme)"
              checked={form.sex === "male"} onChange={() => setForm(p => ({ ...p, sex: "male" }))} />
            <RadioOption name="sex" value="female" label="Female (Ke)"
              checked={form.sex === "female"} onChange={() => setForm(p => ({ ...p, sex: "female" }))} />
          </div>
        </Q>

        <Q
          label="Phone Number (Namba ya Simu)"
          required
          hint="If you report without a phone number, we will not be able to offer support because we will not be able to reach back to you. / Ukiripoti bila namba ya simu, hatutaweza kutoa usaidizi kwa sababu hatutaweza kuwasiliana nawe."
        >
          <input type="tel" value={form.phoneNumber} onChange={set("phoneNumber")}
            placeholder="+255 700 000 000" className={inputCls} required />
        </Q>

        <Q label="Which region are you located in? / Je Unaishi katika mkoa gani?" required>
          <select value={form.region} onChange={set("region")} className={selectCls} required>
            <option value="">Select region…</option>
            {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </Q>
      </div>

      {/* Q8 */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <Q label="Date of the incident (Tarehe ya Tukio)" required>
          <input type="date" value={form.incidentDate} onChange={set("incidentDate")}
            className={inputCls} required />
        </Q>
      </div>

      {/* Q9 */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-3">
        <Q label="The environment you were in when the incident occurred (Mazingira uliyokuwepo wakati tukio linatokea)" required>
          <div className="space-y-2">
            {ENVIRONMENTS.map(env => (
              <div key={env}>
                <RadioOption name="environment" value={env} label={env}
                  checked={form.environment === env}
                  onChange={() => setForm(p => ({ ...p, environment: env, environmentOther: "" }))} />
              </div>
            ))}
          </div>
          {isOtherEnv && (
            <input type="text" value={form.environmentOther} onChange={set("environmentOther")}
              placeholder="Please specify…" className={`mt-2 ${inputCls}`} required />
          )}
        </Q>
      </div>

      {/* Q10 */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-3">
        <Q label="What is your relationship with the perpetrator? (Je una uhusiano gani na mtu ambae alikufanyia unyanyasaji)" required>
          <div className="space-y-2">
            {RELATIONSHIPS.map(rel => (
              <div key={rel}>
                <RadioOption name="perpetratorRelationship" value={rel} label={rel}
                  checked={form.perpetratorRelationship === rel}
                  onChange={() => setForm(p => ({ ...p, perpetratorRelationship: rel, perpetratorRelationshipOther: "" }))} />
              </div>
            ))}
          </div>
          {isOtherRel && (
            <input type="text" value={form.perpetratorRelationshipOther} onChange={set("perpetratorRelationshipOther")}
              placeholder="Please specify…" className={`mt-2 ${inputCls}`} required />
          )}
        </Q>
      </div>

      {/* Q11 */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-3">
        <Q label="What kind of sexual violence did you experience? (Ulikumbana na ukatili gani wa Kingono?)" required>
          <div className="space-y-2">
            {VIOLENCE_TYPES.map(v => (
              <div key={v}>
                <CheckOption label={v}
                  checked={form.violenceTypes.includes(v)}
                  onChange={() => toggleCheck("violenceTypes", v)} />
              </div>
            ))}
          </div>
          {hasOtherViol && (
            <input type="text" value={form.violenceTypesOther} onChange={set("violenceTypesOther")}
              placeholder="Please describe…" className={`mt-2 ${inputCls}`} required />
          )}
          {form.violenceTypes.length === 0 && (
            <p className="text-xs text-gray-400 mt-1">Please select at least one option.</p>
          )}
        </Q>
      </div>

      {/* Q12 */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <Q label="Share details about the incident (Elezea Zaidi kuhusu tukio)" required>
          <textarea required rows={7} value={form.incidentDetails} onChange={set("incidentDetails")}
            placeholder="Describe what happened. Share only what you are comfortable with…"
            className={textareaCls} />
        </Q>
      </div>

      {/* Q13 */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-3">
        <Q label="What kind of help or support do you need from us? (Unahitaji msaada gani kutoka kwetu)" required>
          <div className="space-y-2">
            {SUPPORT_OPTIONS.map(s => (
              <div key={s}>
                <CheckOption label={s}
                  checked={form.supportNeeded.includes(s)}
                  onChange={() => toggleCheck("supportNeeded", s)} />
              </div>
            ))}
          </div>
          {hasOtherSup && (
            <input type="text" value={form.supportNeededOther} onChange={set("supportNeededOther")}
              placeholder="Please specify…" className={`mt-2 ${inputCls}`} required />
          )}
          {form.supportNeeded.length === 0 && (
            <p className="text-xs text-gray-400 mt-1">Please select at least one option.</p>
          )}
        </Q>
      </div>

      {/* Confidentiality notice */}
      <div className="rounded-2xl border border-[#182858]/20 bg-[#182858]/5 p-5 text-sm text-gray-700 leading-relaxed">
        <p className="font-semibold text-[#182858] mb-1">Confidentiality / Usiri</p>
        All information you share will be treated with strict confidentiality and accessed only by trained OVAH case workers.
        No information will be shared without your consent, except where required by law to prevent immediate risk to life.
      </div>

      {/* Errors */}
      {status === "error" && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Something went wrong. Please try again or call <strong className="ml-1">116</strong>.
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <button type="button" onClick={reset}
          className="text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2 transition">
          Clear form
        </button>
        <button
          type="submit"
          disabled={!canSubmit}
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
