"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Video,
  Shield,
  Users,
  HeartHandshake,
  BookOpen,
  Scale,
  Car,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { programs } from "@/data/programs"
import truncateHtml from "truncate-html"

export function ProgramsSection() {
  return (
    <section className="py-20 bg-[#E5CEC2]/20">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#182858] mb-6">
            Our Current Programs & Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive initiatives transforming communities
            through education, empowerment, advocacy, and creating safer spaces
            across Tanzania.
          </p>
        </motion.div>

        {/* Programs Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {programs.map((program, index) => (
            <motion.div
              key={program.slug}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.1,
                  },
                },
              }}
            >
              <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group bg-white/80 backdrop-blur-sm">
                <div className="relative h-52 lg:h-60 bg-gradient-to-br from-[#29A9DF] via-[#5EBCDE] to-[#182858]">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover opacity-50 group-hover:opacity-100 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent/0" />
                  <div className="absolute top-5 left-5 w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/40">
                    <program.icon className="h-7 w-7 text-white shadow-lg" />
                  </div>
                </div>

                <CardContent className="p-7">
                  <h3 className="text-xl font-bold text-[#182858] mb-3 line-clamp-2 leading-tight group-hover:text-[#29A9DF] transition-colors duration-300">
                    {program.title}
                  </h3>
                  {/*  <p className="text-gray-600 mb-5 leading-relaxed text-sm">
                    {program.description}
                  </p> */}
                  <div
                    className="mb-6"
                    dangerouslySetInnerHTML={{
                      __html: truncateHtml(program.description, 150, {
                        byWords: false,
                        ellipsis: "...",
                      }),
                    }}
                  />

                  {/*  <div className="mb-6">
                    <h4 className="font-semibold text-[#182858] mb-3 text-xs uppercase tracking-wide text-gray-800">
                      Key Objectives
                    </h4>
                    <div className="space-y-1.5">
                      {program.objectives.slice(0, 4).map((objective, idx) => (
                        <div key={idx} className="flex items-start text-xs text-gray-700">
                          <div className="w-1.5 h-1.5 bg-[#F16D2E] rounded-full mr-2.5 mt-1 flex-shrink-0" />
                          <span className="line-clamp-2">{objective}</span>
                        </div>
                      ))}
                      {program.objectives.length > 4 && (
                        <div className="text-xs text-gray-500 italic pt-1">+{program.objectives.length - 4} more</div>
                      )}
                    </div>
                  </div> */}

                  <Link href={`/our-work/${program.slug}`} className="block">
                    <Button className="w-full bg-gradient-to-r from-[#29A9DF] to-[#5EBCDE] text-white hover:from-[#29A9DF]/90 hover:shadow-xl font-semibold transition-all duration-300">
                      Explore Program →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

