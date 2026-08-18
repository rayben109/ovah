import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Heart, EyeOff, Shield, PhoneCall } from "lucide-react"
import ReportForm from "@/components/report/ReportForm"

export const metadata = {
  title: "Report a Case | OVAH Tanzania",
  description:
    "A safe, confidential platform for survivors, victims, and bystanders to report incidents of sexual and gender-based violence. Reports can be submitted anonymously.",
}

const INFO_CARDS = [
  {
    icon: EyeOff,
    title: "Anonymous Reporting",
    body: "You are not required to provide your name or contact details. Anonymous reports are reviewed with the same care and urgency as identified ones.",
  },
  {
    icon: Shield,
    title: "Strictly Confidential",
    body: "Your report is accessible only to trained OVAH case workers. No information is shared with third parties without your explicit consent, except where required by law to prevent immediate harm.",
  },
  {
    icon: PhoneCall,
    title: "We Follow Up",
    body: "If you share contact details and consent to follow-up, a case worker will reach out within 2 working days to discuss next steps and connect you to appropriate services.",
  },
]

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative bg-[#182858] text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/patterns/dots.svg')] opacity-5 pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Heart className="h-4 w-4 text-[#29A9DF]" />
            Survivor-Centred Reporting
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Report a Case
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
            This is a safe and confidential platform for survivors, victims, or bystanders
            to report incidents of sexual and gender-based violence. You can report
            anonymously and at your own pace.
          </p>
          <p className="text-white/60 text-sm mt-4 leading-relaxed max-w-xl mx-auto">
            Fomu hii ni salama na ya siri kwa waathirika, manusura, au mashuhuda kuripoti
            matukio ya ukatili wa kijinsia. Unaweza kuripoti bila kutoa jina lako.
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

      {/* Form */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#182858] mb-2">Submit Your Report</h2>
            <p className="text-gray-500 text-sm">
              Share as much or as little as you are comfortable with. All fields marked optional can be left blank.
            </p>
          </div>
          <ReportForm />
        </div>
      </section>

      <Footer />
    </div>
  )
}
