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
            Report an Issue
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            Please fill out the form below to report any issues or feedback.
            Your input helps us improve!
          </p>
          <div className="w-full aspect-[3/4]">
            <iframe
              src={GOOGLE_FORM_URL}
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
