import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TrendingUp, Users, ShieldCheck, ArrowRight } from "lucide-react"
import InvestorForm from "@/components/pbi/InvestorForm"

export const metadata = {
  title: "Invest in a Binti Usukani | OVAH PBI",
  description:
    "Express your interest in the Binti Usukani investment programme — own a Bajaji driven by a vetted woman driver and earn returns while creating real social impact.",
}

const INFO_CARDS = [
  {
    icon: TrendingUp,
    title: "Financial Returns",
    sw: "Mapato ya Kifedha",
    body: "Choose your preferred return model — revenue share, capital return with profit, or ownership transfer to the driver after an agreed period.",
    bsw: "Chagua mfano wako wa mapato — mgawanyo wa mapato, kurejeshewa mtaji pamoja na faida, au kuhamishia umiliki kwa dereva baada ya kipindi kilichokubaliwa.",
  },
  {
    icon: Users,
    title: "Women Empowering Women",
    sw: "Wanawake Kuwawezesha Wanawake",
    body: "Every investment funds a vetted woman driver — enabling her economic independence and giving her ownership of her livelihood.",
    bsw: "Kila uwekezaji unawezesha dereva mwanamke aliyefanyiwa uhakiki — kumpa uhuru wa kiuchumi na kumiliki biashara yake.",
  },
  {
    icon: ShieldCheck,
    title: "Vetted & Supported",
    sw: "Wamehakikiwa na Kuungwa Mkono",
    body: "All drivers are carefully selected, trained, and monitored by OVAH throughout the investment period for accountability and your peace of mind.",
    bsw: "Madereva wote wanachaguliwa kwa makini, wanafunzwa, na kufuatiliwa na OVAH katika kipindi chote cha uwekezaji.",
  },
]

export default function PBIInvestPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative bg-[#182858] text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/patterns/dots.svg')] opacity-5 pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <TrendingUp className="h-4 w-4 text-[#29A9DF]" />
            Binti Usukani · PBI Investment Programme
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Support a Woman Driver
          </h1>
          <p className="text-white/70 text-sm font-medium tracking-wide uppercase mb-5">
            Wekeza katika Binti Usukani
          </p>
          <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
            Own a Bajaji driven by a vetted OVAH woman driver, earn returns on your investment,
            and directly fund a woman&apos;s economic independence.
          </p>
          <p className="text-white/60 text-sm mt-3 leading-relaxed max-w-xl mx-auto">
            Miliki Bajaji itakayoendeshwa na dereva mwanamke aliyehakikiwa na OVAH, upokee mapato,
            na uchangie moja kwa moja uhuru wa kiuchumi wa mwanamke.
          </p>
          <a
            href="#form"
            className="inline-flex items-center gap-2 mt-8 bg-[#29A9DF] hover:bg-[#29A9DF]/90 text-white font-semibold px-6 py-3 rounded-xl text-sm transition shadow-md"
          >
            Register Interest <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Info cards */}
      <section className="bg-white py-12 px-4 border-b border-gray-100">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {INFO_CARDS.map(({ icon: Icon, title, sw, body, bsw }) => (
            <div key={title} className="flex flex-col gap-3 bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <span className="w-10 h-10 rounded-xl bg-[#182858]/10 flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-[#182858]" />
              </span>
              <div>
                <h3 className="font-semibold text-[#182858] text-base">{title}</h3>
                <p className="text-xs text-gray-400 italic">{sw}</p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
              <p className="text-xs text-gray-400 italic leading-relaxed">{bsw}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section id="form" className="bg-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[#29A9DF] mb-2">
              Fomu ya Awali ya Wawekezaji
            </p>
            <h2 className="text-2xl font-bold text-[#182858] mb-2">
              Women Investing in Women
            </h2>
            <p className="text-gray-500 text-sm">
              This is an initial expression of interest — not a binding commitment. Complete the form
              and our team will follow up to discuss the investment model in full detail.
            </p>
            <p className="text-xs text-gray-400 italic mt-1">
              Hii ni fomu ya nia ya awali — si ahadi inayofunga kisheria. Jaza fomu na timu yetu itawasiliana nawe kueleza mfumo wa uwekezaji kwa undani zaidi.
            </p>
          </div>
          <InvestorForm />
        </div>
      </section>

      <Footer />
    </div>
  )
}
