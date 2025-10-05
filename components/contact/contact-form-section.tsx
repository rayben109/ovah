"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export function ContactFormSection() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // TODO: Replace with API call (e.g., send to backend or email service)
    setTimeout(() => {
      alert("Message sent successfully!")
      setLoading(false)
    }, 1500)
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Send us a <span className="gradient-text">Message</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Fill out the form below and we’ll get back to you as soon as
            possible.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-muted/30 p-8 rounded-2xl shadow-lg"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <Input type="text" placeholder="Your name" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <Input type="email" placeholder="you@example.com" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Message
            </label>
            <Textarea placeholder="Write your message..." rows={5} required />
          </div>

          <div className="text-center">
            <Button
              type="submit"
              disabled={loading}
              className="px-8 py-3 text-lg rounded-xl shadow-md"
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
