"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Shield,
  Video,
  Car,
  Users,
  HeartHandshake,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { programs } from "@/data/programs"

const categories = [
  {
    id: "attitudes",
    title: "Shifting Attitudes & Norms",
    color: "from-[#29A9DF] to-[#5EBCDE]",
    programs: programs.filter(program => program.category === "Shifting Attitudes & Norms"),
  },
  {
    id: "skills",
    title: "Skills Building & Empowerment",
    color: "from-[#F16D2E] to-[#F58A4E]",
    programs: programs.filter(program => program.category === "Skills Building & Empowerment"),
  },
  {
    id: "spaces",
    title: "Creating Safer Spaces",
    color: "from-[#182858] to-[#5EBCDE]",
    programs: programs.filter(program => program.category === "Creating Safer Spaces"),
  },
]

export function ProgramsSection() {
  const [activeCategory, setActiveCategory] = useState("attitudes")

  const activePrograms =
    categories.find((cat) => cat.id === activeCategory)?.programs || []

  return (
    <section className="py-20 bg-[#E5CEC2]/20">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#182858] mb-6">
            Current Programs & Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our initiatives are grouped under three key pillars designed to
            transform communities through education, empowerment, and advocacy.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-[#29A9DF] to-[#5EBCDE] text-white shadow-md"
                  : "bg-white text-[#182858] border border-[#29A9DF] hover:bg-[#29A9DF]/10"
              }`}
            >
              {category.title}
            </Button>
          ))}
        </div>

        {/* Programs List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
          >
            {activePrograms.map((program, index) => (
              <Card
                key={program.title}
                className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden"
              >
                <div className="relative h-48 bg-gradient-to-br from-[#29A9DF] to-[#5EBCDE]">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <program.icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#182858] mb-3">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {program.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-[#182858] mb-2">
                      Key Objectives:
                    </h4>
                    <ul className="space-y-1">
                      {program.objectives.map((objective, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-600 flex items-center"
                        >
                          <div className="w-1.5 h-1.5 bg-[#29A9DF] rounded-full mr-2 flex-shrink-0" />
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href={`/our-work/${program.slug}`}>
                  
                    <Button
                      variant="outline"
                      className="w-full border-[#29A9DF] text-[#29A9DF] hover:bg-[#29A9DF] hover:text-white transition-all duration-300"
                    >
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
