"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const sdgs = [
  {
    number: "5",
    title: "Gender Equality",
    description: "Achieve gender equality and empower all women and girls",
  },
  {
    number: "3",
    title: "Good Health and Well-being",
    description: "Ensure healthy lives and promote well-being for all at all ages",
  },
  {
    number: "6",
    title: "Clean Water and Sanitation",
    description: "Ensure availability and sustainable management of water and sanitation for all",
  },
  {
    number: "11",
    title: "Sustainable Cities and Communities",
    description: "Make cities and human settlements inclusive, safe, resilient and sustainable",
  },
]

export function SdgSection() {
  return (
    <section className="py-20 bg-[#FCFDFD]">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#182858] mb-6 text-balance">
            Sustainable Development Goals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance leading-relaxed">
            Our work directly contributes to achieving the United Nations Sustainable Development Goals, creating
            measurable impact for communities across Tanzania.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {sdgs.map((sdg, index) => (
            <motion.div
              key={sdg.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white text-center">
                <CardContent className="p-6">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#29A9DF] to-[#5EBCDE] rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">SDG {sdg.number}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#182858] mb-3 text-pretty">{sdg.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed text-pretty">{sdg.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
