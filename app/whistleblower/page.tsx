import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Shield, EyeOff, ClipboardCheck, AlertTriangle } from "lucide-react"

export const metadata = {
  title: "Whistleblower & Misconduct Reporting | OVAH Tanzania",
  description:
    "Report concerns about misconduct, fraud, safeguarding, or unethical behaviour at OVAH Tanzania. Submissions can be anonymous and are treated with strict confidentiality.",
}

const INFO_CARDS = [
  {
    icon: EyeOff,
    title: "Anonymous Reporting",
    body: "You are not required to provide your name or contact details. Reports submitted without identity are reviewed with equal seriousness.",
  },
  {
    icon: Shield,
    title: "Strictly Confidential",
    body: "All submissions are treated confidentially. Information is accessible only to authorised personnel and is never shared with the subject of a report without due process.",
  },
  {
    icon: ClipboardCheck,
    title: "What Happens Next",
    body: "Every submission is acknowledged and reviewed. Where contact details are provided, we aim to respond within 5 working days. Reports are escalated according to OVAH's safeguarding and governance policies.",
  },
]

const CONCERN_TYPES = [
  "Misconduct or unethical behaviour",
  "Financial fraud or misuse of funds",
  "Safeguarding concerns involving staff, volunteers, or beneficiaries",
  "Harassment or discrimination in the workplace",
  "Conflicts of interest",
  "Violations of OVAH's policies or donor requirements",
]

export default function WhistleblowerPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative bg-[#182858] text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/patterns/dots.svg')] opacity-5 pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Shield className="h-4 w-4 text-[#29A9DF]" />
            Confidential Reporting
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Whistleblowing &amp; Misconduct Reporting
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
            This form allows individuals to report concerns about misconduct,
            fraud, safeguarding, or other unethical behaviour. Reports can be
            submitted anonymously or with contact details. All submissions are
            treated confidentially.
          </p>
        </div>
      </section>

      {/* Info cards */}
      <section className="bg-white py-12 px-4 border-b border-gray-100">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {INFO_CARDS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex flex-col gap-3 bg-gray-50 rounded-2xl p-6 border border-gray-100"
            >
              <span className="w-10 h-10 rounded-xl bg-[#182858]/10 flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-[#182858]" />
              </span>
              <h3 className="font-semibold text-[#182858] text-base">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What you can report */}
      <section className="bg-[#f8fafc] py-12 px-4 border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-[#182858] mb-4">
            What You Can Report
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {CONCERN_TYPES.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-gray-700"
              >
                <span className="mt-1 w-4 h-4 rounded-full bg-[#29A9DF]/20 flex items-center justify-center shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#29A9DF]" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Warning / disclaimer */}
      <section className="bg-amber-50 border-y border-amber-100 py-5 px-4">
        <div className="max-w-3xl mx-auto flex gap-3 items-start">
          <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <strong>Important:</strong> This form is for reporting concerns
            related to OVAH&apos;s operations, staff, volunteers, or partners —
            not for reporting personal experiences of gender-based violence.
            If you or someone you know needs immediate support,{" "}
            <a href="/report" className="underline font-medium">
              use our SGBV case reporting form
            </a>{" "}
            or call emergency services.
          </p>
        </div>
      </section>

      {/* Form embed */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#182858] mb-2">
              Submit Your Report
            </h2>
            <p className="text-gray-500 text-sm">
              Fill in as much or as little detail as you are comfortable
              sharing. All fields marked optional can be left blank.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <iframe
              src="https://forms.gle/yPxEW1ZRJSfqQUyo6"
              width="100%"
              height="1100"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="OVAH Whistleblower & Misconduct Reporting Form"
              className="w-full border-0"
              loading="lazy"
            >
              Loading form…
            </iframe>
          </div>

          <p className="mt-4 text-xs text-gray-400 text-center">
            Having trouble with the form?{" "}
            <a
              href="https://forms.gle/yPxEW1ZRJSfqQUyo6"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-600"
            >
              Open it directly
            </a>
            .
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
