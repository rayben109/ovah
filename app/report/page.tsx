import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import React from "react"

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfD2wEXAMPLE/viewform?embedded=true"

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex flex-col items-center py-12">
        <section className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-primary mb-4 text-center">
            Report a Case
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            This reporting form is a safe and confidential platform by OVAH for
            survivors, victims, or bystanders to share incidents of sexual and
            gender-based violence. It allows individuals to report their
            experiences, seek guidance, and access support without fear of
            stigma or retaliation. The form ensures privacy, timely response,
            and a survivor-centered approach, helping connect users to
            appropriate services, resources, and trusted channels for protection
            and justice.
            <br />
            <br />
            <hr />
            <br />
            Fomu hii ya taarifa ni sehemu salama na yenye usiri inayotolewa na
            OVAH kwa waathirika, manusura, au mashuhuda kuripoti matukio ya
            ukatili wa kijinsia na unyanyasaji. Inawawezesha watu kuripoti
            kutafuta mwongozo, na kupata msaada bila hofu ya unyanyapaa au
            kisasi. Fomu hii inalinda faragha yako, inahakikisha unapata msaada
            wa haraka, na inazingatia mahitaji ya manusura kwa kuunganisha
            watumiaji na huduma, rasilimali, na njia sahihi za ulinzi na haki.
          </p>
          <div className="w-full aspect-[3/4]">
            <iframe
              src={"https://forms.gle/rT6ia6LeKDeXGHgM8"}
              width="100%"
              height="100%"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Report Form"
              className="w-full h-full rounded-lg border border-gray-300"
            >
              Loading…
            </iframe>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
