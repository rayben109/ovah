import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Shield, EyeOff, ClipboardCheck, AlertTriangle } from "lucide-react"
import WhistleblowerForm from "@/components/whistleblower/WhistleblowerForm"

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
              <h3 className="font-semibold text-[#182858] text-base">
                {title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
            </div>
          ))}
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

          <WhistleblowerForm />
        </div>
      </section>

      <Footer />
    </div>
  )
}
