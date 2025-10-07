"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"

export function EventsHeroSection() {
  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative overflow-hidden py-24 lg:py-40 bg-gradient-to-br from-[#5EBCDE] via-[#29A9DF] to-[#182858] text-white">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute -top-20 -left-20 w-80 h-80 bg-white/20 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-[#F16D2E]/30 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Calendar className="h-8 w-8 text-white" />
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 text-balance drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Events & Gatherings
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl mb-10 text-balance leading-relaxed text-white/90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Join us in creating change through community events, workshops, and
            advocacy campaigns that bring people together for gender equality.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              onClick={() => scrollToSection("upcoming-events")}
              size="lg"
              className="bg-[#F16D2E] hover:bg-[#F16D2E]/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Users className="mr-2 h-5 w-5" />
              Join Our Next Event
            </Button>

            <Button
              onClick={() => scrollToSection("past-events")}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[#182858] px-8 py-4 text-lg font-semibold rounded-full bg-transparent transition-all duration-300"
            >
              <MapPin className="mr-2 h-5 w-5" />
              View Past Events
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
