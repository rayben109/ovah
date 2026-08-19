"use client"

import { useState } from "react"
import { CheckCircle2, Loader2, AlertCircle, ChevronRight } from "lucide-react"

const INVESTMENT_INTEREST = [
  {
    value: "own_bajaji",
    en: "Yes, I'm interested in owning a Bajaji",
    sw: "Ndiyo, nina nia ya kumiliki Bajaji",
  },
  {
    value: "want_more_info",
    en: "Possibly — I'd like to understand more about returns and the investment model",
    sw: "Inawezekana, ningependa kuelewa zaidi kuhusu mapato na mfumo wa uwekezaji",
  },
  {
    value: "co_investment",
    en: "I'd prefer co-investment",
    sw: "Ningependelea umiliki wa pamoja (co-investment)",
  },
  {
    value: "not_now",
    en: "Not at this time",
    sw: "Hapana kwa sasa",
  },
]

const EXPECTED_RETURNS = [
  {
    value: "return_capital",
    en: "Return of my initial capital",
    sw: "Kurejeshewa mtaji wangu wa awali",
  },
  {
    value: "return_capital_profit",
    en: "Return of capital plus agreed profit",
    sw: "Kurejeshewa mtaji pamoja na faida iliyokubaliwa",
  },
  {
    value: "revenue_share",
    en: "Receive a share of revenue for an agreed period",
    sw: "Kupokea sehemu ya mapato kwa kipindi kilichokubaliwa",
  },
  {
    value: "social_impact",
    en: "Create positive social impact without expecting financial return",
    sw: "Kuleta matokeo chanya ya kijamii bila kutarajia faida ya kifedha",
  },
  {
    value: "ownership_transfer",
    en: "Bajaji ownership transferred to the woman entrepreneur after an agreed period",
    sw: "Umiliki wa Bajaji kuhamishiwa kwa mwanamke mjasiriamali baada ya kipindi kilichokubaliwa",
  },
  {
    value: "combination",
    en: "A combination of the above options",
    sw: "Mchanganyiko wa chaguo zilizotajwa hapo juu",
  },
  {
    value: "need_more_info",
    en: "I need more information before deciding",
    sw: "Nahitaji maelezo zaidi kabla ya kuamua",
  },
]

const INVESTMENT_PERIODS = [
  { value: "12", en: "12 Months", sw: "Miezi 12" },
  { value: "18", en: "18 Months", sw: "Miezi 18" },
  { value: "24", en: "24 Months", sw: "Miezi 24" },
  { value: "24_36", en: "24–36 Months", sw: "Miezi 24–36" },
  {
    value: "open",
    en: "Open to discussion based on the investment model",
    sw: "Niko tayari kujadiliana kulingana na mfumo wa uwekezaji",
  },
]

const ENTREPRENEUR_SELECTION = [
  { value: "yes_choose", en: "Yes", sw: "Ndiyo" },
  {
    value: "ovah_recommends",
    en: "No — OVAH can recommend a suitable woman",
    sw: "Hapana, OVAH inaweza kunipendekezea mwanamke anayefaa",
  },
  {
    value: "either",
    en: "Either works for me",
    sw: "Chaguo lolote kati ya hayo linanifaa",
  },
]

type Status = "idle" | "submitting" | "success" | "error"

// ── Primitives ─────────────────────────────────────────────────────────────────

const inputCls =
  "w-full h-11 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-800 " +
  "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#182858]/20 focus:border-[#182858] transition"

const textareaCls =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 " +
  "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#182858]/20 focus:border-[#182858] transition resize-none"

function Q({
  num, en, sw, required, children,
}: { num?: number; en: string; sw: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div>
        {num !== undefined && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#29A9DF] block mb-0.5">
            Question {num}
          </span>
        )}
        <p className="text-sm font-semibold text-gray-900 leading-snug">
          {en}{required && <span className="text-red-500 ml-0.5">*</span>}
        </p>
        <p className="text-xs text-gray-500 mt-0.5 italic">{sw}{required && <span className="text-red-500 ml-0.5">*</span>}</p>
      </div>
      {children}
    </div>
  )
}

function RadioOpt({
  name, value, en, sw, checked, onChange,
}: { name: string; value: string; en: string; sw: string; checked: boolean; onChange: () => void }) {
  return (
    <label className={`flex items-start gap-3 px-4 py-3 rounded-lg border cursor-pointer transition select-none ${
      checked ? "border-[#182858] bg-[#182858]/5" : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
    }`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition ${
        checked ? "border-[#182858] bg-[#182858]" : "border-gray-300"
      }`}>
        {checked && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
      </span>
      <span className="flex-1">
        <span className={`text-sm block leading-snug ${checked ? "text-[#182858] font-medium" : "text-gray-800"}`}>{en}</span>
        <span className="text-xs text-gray-400 italic mt-0.5 block">{sw}</span>
      </span>
    </label>
  )
}

function CheckOpt({
  value, en, sw, checked, onChange,
}: { value: string; en: string; sw: string; checked: boolean; onChange: () => void }) {
  return (
    <label className={`flex items-start gap-3 px-4 py-3 rounded-lg border cursor-pointer transition select-none ${
      checked ? "border-[#182858] bg-[#182858]/5" : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
    }`}>
      <input type="checkbox" value={value} checked={checked} onChange={onChange} className="sr-only" />
      <span className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition ${
        checked ? "bg-[#182858] border-[#182858]" : "border-gray-300 bg-white"
      }`}>
        {checked && (
          <svg viewBox="0 0 10 8" className="w-3 h-3 fill-none stroke-white stroke-2">
            <polyline points="1,4 4,7 9,1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="flex-1">
        <span className={`text-sm block leading-snug ${checked ? "text-[#182858] font-medium" : "text-gray-800"}`}>{en}</span>
        <span className="text-xs text-gray-400 italic mt-0.5 block">{sw}</span>
      </span>
    </label>
  )
}

// ── Main ───────────────────────────────────────────────────────────────────────

export default function InvestorForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    investmentInterest: "",
    expectedReturns: [] as string[],
    investmentPeriod: "",
    entrepreneurSelection: "",
    questions: "",
  })

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(p => ({ ...p, [field]: e.target.value }))

  function toggleReturn(value: string) {
    setForm(p => ({
      ...p,
      expectedReturns: p.expectedReturns.includes(value)
        ? p.expectedReturns.filter(v => v !== value)
        : [...p.expectedReturns, value],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("submitting")
    try {
      const res = await fetch("/api/pbi", {
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
      fullName: "", email: "", phone: "", location: "",
      investmentInterest: "", expectedReturns: [],
      investmentPeriod: "", entrepreneurSelection: "", questions: "",
    })
    setStatus("idle")
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-100 bg-green-50 p-12 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-green-800">Expression of Interest Received</h3>
        <p className="text-green-700 text-sm max-w-md mx-auto">
          Asante sana, <strong>{form.fullName}</strong>! Your interest has been recorded. The OVAH PBI team
          will be in touch shortly to discuss next steps.
          <br /><span className="text-green-600 text-xs mt-1 block">Asante! Nia yako imerekodiwa. Timu ya OVAH PBI itawasiliana nawe hivi karibuni.</span>
        </p>
        <button onClick={reset} className="text-sm text-green-700 underline underline-offset-2 hover:text-green-900">
          Submit another response
        </button>
      </div>
    )
  }

  const canSubmit =
    !!form.fullName && !!form.email && !!form.phone &&
    !!form.investmentInterest && !!form.investmentPeriod &&
    !!form.entrepreneurSelection && status !== "submitting"

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Contact details */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-5">
        <p className="text-xs font-bold uppercase tracking-widest text-[#29A9DF]">Your Details / Maelezo Yako</p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-800">
              Full Name <span className="text-red-500">*</span>
              <span className="block text-xs font-normal text-gray-400 italic">Jina Kamili</span>
            </label>
            <input type="text" required value={form.fullName} onChange={set("fullName")}
              placeholder="Your full name…" className={inputCls} />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-800">
              Email Address <span className="text-red-500">*</span>
              <span className="block text-xs font-normal text-gray-400 italic">Anwani ya Barua Pepe</span>
            </label>
            <input type="email" required value={form.email} onChange={set("email")}
              placeholder="you@example.com" className={inputCls} />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-800">
              Phone / WhatsApp Number <span className="text-red-500">*</span>
              <span className="block text-xs font-normal text-gray-400 italic">Namba ya Simu / WhatsApp</span>
            </label>
            <input type="tel" required value={form.phone} onChange={set("phone")}
              placeholder="+255 700 000 000" className={inputCls} />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-800">
              Country / City
              <span className="block text-xs font-normal text-gray-400 italic">Nchi / Jiji unaloishi</span>
            </label>
            <input type="text" value={form.location} onChange={set("location")}
              placeholder="e.g. Dar es Salaam, Tanzania" className={inputCls} />
          </div>
        </div>
      </div>

      {/* Q4 */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <Q
          num={4}
          en="Would you like to invest in transport by owning your own Bajaji, to be driven by a vetted woman driver through OVAH, while earning returns on your investment?"
          sw="Je, ungependa kuwekeza katika biashara ya usafirishaji kwa kumiliki Bajaji yako mwenyewe, ambayo itaendeshwa na dereva mwanamke aliyefanyiwa uhakiki kupitia OVAH, huku ukipokea mapato kutokana na uwekezaji wako?"
          required
        >
          <div className="space-y-2">
            {INVESTMENT_INTEREST.map(opt => (
              <RadioOpt
                key={opt.value}
                name="investmentInterest"
                value={opt.value}
                en={opt.en}
                sw={opt.sw}
                checked={form.investmentInterest === opt.value}
                onChange={() => setForm(p => ({ ...p, investmentInterest: opt.value }))}
              />
            ))}
          </div>
        </Q>
      </div>

      {/* Q5 */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <Q
          num={5}
          en="What would you expect from your investment?"
          sw="Ungetarajia nini kutokana na uwekezaji wako?"
        >
          <div className="space-y-2">
            {EXPECTED_RETURNS.map(opt => (
              <CheckOpt
                key={opt.value}
                value={opt.value}
                en={opt.en}
                sw={opt.sw}
                checked={form.expectedReturns.includes(opt.value)}
                onChange={() => toggleReturn(opt.value)}
              />
            ))}
          </div>
          {form.expectedReturns.length === 0 && (
            <p className="text-xs text-gray-400 mt-1">You may select one or more options.</p>
          )}
        </Q>
      </div>

      {/* Q6 */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <Q
          num={6}
          en="What investment period would you be willing to consider?"
          sw="Ni kipindi gani cha uwekezaji ambacho ungekuwa tayari kuzingatia?"
          required
        >
          <div className="space-y-2">
            {INVESTMENT_PERIODS.map(opt => (
              <RadioOpt
                key={opt.value}
                name="investmentPeriod"
                value={opt.value}
                en={opt.en}
                sw={opt.sw}
                checked={form.investmentPeriod === opt.value}
                onChange={() => setForm(p => ({ ...p, investmentPeriod: opt.value }))}
              />
            ))}
          </div>
        </Q>
      </div>

      {/* Q7 */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <Q
          num={7}
          en="Would you like to select the woman entrepreneur you invest in, after reviewing profiles of vetted women?"
          sw="Je, ungependa kuchagua mwanamke mjasiriamali utakayewekeza kwake baada ya kupitia wasifu wa wanawake waliofanyiwa uhakika?"
          required
        >
          <div className="space-y-2">
            {ENTREPRENEUR_SELECTION.map(opt => (
              <RadioOpt
                key={opt.value}
                name="entrepreneurSelection"
                value={opt.value}
                en={opt.en}
                sw={opt.sw}
                checked={form.entrepreneurSelection === opt.value}
                onChange={() => setForm(p => ({ ...p, entrepreneurSelection: opt.value }))}
              />
            ))}
          </div>
        </Q>
      </div>

      {/* Q8 */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <Q
          num={8}
          en="Do you have any questions about this investment opportunity?"
          sw="Una maswali gani kuhusu fursa hii ya uwekezaji? / Andika maswali yako hapa."
        >
          <textarea
            rows={5}
            value={form.questions}
            onChange={set("questions")}
            placeholder="Write your questions here… / Andika maswali yako hapa…"
            className={textareaCls}
          />
        </Q>
      </div>

      {/* Notice */}
      <div className="rounded-2xl border border-[#182858]/20 bg-[#182858]/5 p-5 text-sm text-gray-700 leading-relaxed">
        <p className="font-semibold text-[#182858] mb-1">Privacy Notice / Faragha</p>
        Your information will be used solely to follow up on your interest in the Binti Usukani investment programme.
        It will not be shared with third parties without your consent. /
        <span className="text-gray-500"> Maelezo yako yatatumika tu kwa ajili ya kufuatilia nia yako katika programu ya Binti Usukani.</span>
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Something went wrong. Please try again or contact us directly.
        </div>
      )}

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
            <>Submit Expression of Interest <ChevronRight className="h-4 w-4" /></>
          )}
        </button>
      </div>
    </form>
  )
}
