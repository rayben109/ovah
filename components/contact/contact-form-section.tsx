"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactFormSection() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    try {
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (res.ok) {
        alert("✅ " + data.message)
        e.currentTarget.reset()
      } else {
        alert("❌ " + (data.error || "Failed to send message"))
      }
    } catch (error) {
      console.error(error)
      alert("❌ Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Send us a <span className="gradient-text">Message</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            We'd love to hear from you. Fill out the form below and we'll get
            back to you as soon as possible.
          </p>
        </motion.div>

        {/* Contact form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6 bg-muted/40 p-8 rounded-2xl shadow-lg backdrop-blur-md border border-white/10"
          aria-label="Contact Form"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <Input
                type="text"
                name="name"
                placeholder="Your name"
                required
                className="bg-background/60"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="bg-background/60"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Message
            </label>
            <Textarea
              name="message"
              placeholder="Write your message..."
              rows={5}
              required
              className="bg-background/60"
            />
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
        </motion.form>
      </div>
    </section>
  )
}
