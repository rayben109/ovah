"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface SDGItem {
  number: string
  title: string
  color: string
  image?: string
}

interface SDGComponentProps {
  sdgs: SDGItem[]
  title?: string
  subtitle?: string
  variant?: "horizontal" | "grid"
  className?: string
}

export function SDGComponent({
  sdgs,
  title = "Sustainable Development Goals",
  subtitle = "Our work contributes to achieving these global goals",
  variant = "horizontal",
  className = "",
}: SDGComponentProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center space-y-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            <span className="gradient-text">{title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">{subtitle}</p>
        </motion.div>

        {/* SDG Items */}
        <motion.div
          className={`${
            variant === "grid" ? "grid grid-cols-2 md:grid-cols-4 gap-6" : "flex flex-wrap justify-center gap-6"
          }`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {sdgs.map((sdg, index) => (
            <motion.div
              key={sdg.number}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
            >
              <div className="relative">
                {sdg.image ? (
                  <div className="w-24 h-24 mx-auto mb-3 relative overflow-hidden rounded-full border-4 border-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src={sdg.image || "/placeholder.svg"}
                      alt={`SDG ${sdg.number}: ${sdg.title}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="w-24 h-24 mx-auto mb-3 rounded-full border-4 border-white shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                    style={{ backgroundColor: sdg.color }}
                  >
                    <span className="text-white font-bold text-lg">{sdg.number}</span>
                  </div>
                )}

                {/* Hover overlay with title */}
                <div className="absolute inset-0 bg-black/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-xs font-medium text-center px-2">{sdg.title}</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">SDG {sdg.number}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
