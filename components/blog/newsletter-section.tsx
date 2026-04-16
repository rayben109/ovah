"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Mail, Bell } from "lucide-react"
import NewsletterForm from "../newsletter/NewsletterForm"


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
              <NewsletterForm/>
            </div>
           
          </div>

          <p className="text-sm opacity-75 mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </motion.div>
      </div>
    </section>
  )
}
