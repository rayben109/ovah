"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Mail, Bell } from "lucide-react"

export function NewsletterSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#182858] to-[#29A9DF] text-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-white" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Stay Connected with Our Mission</h2>
          <p className="text-xl mb-8 text-balance leading-relaxed opacity-90">
            Subscribe to our newsletter for the latest updates on our programs, impact stories, and opportunities to get
            involved in creating change.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
            <div className="relative flex-1 w-full">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-4 rounded-full border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:outline-none"
              />
            </div>
            <Button
              size="lg"
              className="bg-[#F16D2E] hover:bg-[#F16D2E]/90 text-white px-8 py-4 rounded-full font-semibold whitespace-nowrap"
            >
              <Bell className="mr-2 h-5 w-5" />
              Subscribe
            </Button>
          </div>

          <p className="text-sm opacity-75 mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </motion.div>
      </div>
    </section>
  )
}
