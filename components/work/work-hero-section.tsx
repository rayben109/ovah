"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function WorkHeroSection() {
  return (
    <section className="relative py-50 lg:py-32 bg-gradient-to-br from-[#182858] via-[#29A9DF] to-[#5EBCDE] text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Work in Action
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 text-balance leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Through innovative programs and community partnerships, we're creating lasting change in the fight against
            sexual and gender-based violence across Tanzania.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-[#F16D2E] hover:bg-[#F16D2E]/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Watch Our Impact Video
              <Play className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[#182858] px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 bg-transparent"
            >
              Explore Programs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
