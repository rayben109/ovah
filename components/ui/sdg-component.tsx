"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const sdgs = [
  {
    number: "5",
    title: "Gender Equality",
    color: "#FF3A21",
    imageUrl: "images/sdgs/E-WEB-Goal-05.png",
  },
  {
    number: "3",
    title: "Good Health and Well-being",
    color: "#4C9F38",
    imageUrl: "images/sdgs/E-WEB-Goal-03.png",
  },
  {
    number: "8",
    title: "Decent Work and Economic Growth",
    color: "#A21942",
    imageUrl: "images/sdgs/E-WEB-Goal-08.png",
  },
  {
    number: "11",
    title: "Sustainable Cities and Communities",
    color: "#FD9D24",
    imageUrl: "images/sdgs/E-WEB-Goal-11.png",
  },
]

export function SDGComponent() {
  return (
    <section className="py-20 bg-[#FCFDFD] relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-secondary/5 to-white opacity-60 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#182858] mb-6 text-balance">
            Sustainable Development Goals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance leading-relaxed">
            Our work directly contributes to achieving the United Nations
            Sustainable Development Goals, creating measurable impact for
            communities across Tanzania.
          </p>
        </motion.div>

        {/* SDG Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto items-stretch">
          {sdgs.map((sdg, index) => (
            <motion.div
              key={sdg.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, rotate: 0.5 }}
            >
              <Card
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl rounded-2xl transition-all duration-500 h-full flex flex-col"
                style={{
                  background: `linear-gradient(135deg, ${sdg.color}15, white)`,
                }}
              >
                <CardContent className="p-8 flex flex-col items-center justify-between flex-1 relative z-10">
                  <motion.div
                    className="w-32 h-32 relative mb-6"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={sdg.imageUrl}
                      alt={`SDG ${sdg.number} - ${sdg.title}`}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </motion.div>
                  <h3 className="text-lg font-bold text-[#182858] text-center">
                    {sdg.title}
                  </h3>
                </CardContent>

                {/* Floating color accent */}
                <motion.div
                  className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full opacity-10"
                  style={{ backgroundColor: sdg.color }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}