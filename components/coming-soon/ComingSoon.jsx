"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function ComingSoon({
  title = "Coming Soon",
  description = "We're working on something amazing. Stay tuned!",
  showButton = false,
  buttonText = "Go Back Home",
}) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-[#FCFDFD] px-4">
      <motion.div
        className="text-center max-w-xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#182858] mb-4">
          {title}
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-lg mb-6">{description}</p>

        {/* Optional CTA */}
        {showButton && (
          <Button className="bg-[#29A9DF] hover:bg-[#29A9DF]/90 text-white px-6 py-3 rounded-full">
            {buttonText}
          </Button>
        )}

        {/* Subtle visual element */}
        <motion.div
          className="mt-10 w-24 h-1 bg-[#F16D2E] mx-auto rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "6rem" }}
          transition={{ delay: 0.5, duration: 0.6 }}
        />
      </motion.div>
    </section>
  )
}
