"use client"

import { useEffect, useState } from "react"
import { X, Mail } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"

const STORAGE_KEY = "ovah_newsletter_dismissed"
const DISMISS_DAYS = 7
const SHOW_DELAY_MS = 5000

export default function NewsletterPopup() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const { until } = JSON.parse(raw)
      if (Date.now() < until) return
    }

    const timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  function dismiss() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ until: Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000 })
    )
    setOpen(false)
  }

  function handleSubmit() {
    // The form posts to Mailchimp via target="_blank"; mark as submitted to show thank-you.
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ until: Date.now() + 365 * 24 * 60 * 60 * 1000 })
    )
    setSubmitted(true)
    setTimeout(() => setOpen(false), 2500)
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) dismiss() }}>
      <DialogContent
        showCloseButton={false}
        className="p-0 overflow-hidden border-0 max-w-md"
      >
        {/* Brand gradient header */}
        <div className="bg-gradient-to-br from-[#182858] to-[#29A9DF] px-8 pt-8 pb-6 text-white relative">
          <button
            onClick={dismiss}
            aria-label="Close"
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <DialogTitle className="text-xl font-bold text-white leading-snug">
              Stay Connected with Our Mission
            </DialogTitle>
          </div>

          <DialogDescription className="text-white/85 text-sm leading-relaxed">
            Get the latest updates on our programs, impact stories, and ways to
            help create a gender-just, violence-free Tanzania.
          </DialogDescription>
        </div>

        {/* Form area */}
        <div className="px-8 py-6">
          {submitted ? (
            <div className="text-center py-4">
              <p className="text-lg font-semibold text-[#182858]">Thank you for subscribing!</p>
              <p className="text-sm text-muted-foreground mt-1">We'll be in touch soon.</p>
            </div>
          ) : (
            <>
              <form
                action="https://ovah.us1.list-manage.com/subscribe/post?u=c9575656960434563f2c799cd&id=a1c98fd1ba&f_id=00eff2e4f0"
                method="POST"
                target="_blank"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-2"
              >
                <input
                  type="email"
                  name="EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#29A9DF]"
                />
                {/* Mailchimp bot protection */}
                <input
                  type="text"
                  name="b_c9575656960434563f2c799cd_a1c98fd1ba"
                  tabIndex={-1}
                  className="hidden"
                />
                <button
                  type="submit"
                  className="bg-[#182858] hover:bg-[#29A9DF] text-white text-sm font-medium px-5 py-2 rounded-md transition-colors"
                >
                  Subscribe
                </button>
              </form>

              <p className="text-xs text-muted-foreground mt-3 text-center">
                We respect your privacy.{" "}
                <button
                  onClick={dismiss}
                  className="underline hover:no-underline"
                >
                  No thanks
                </button>
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
