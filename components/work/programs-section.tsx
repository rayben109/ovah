"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Shield, Video, Car, Users, HeartHandshake } from "lucide-react"
import Image from "next/image"

const programs = [
  {
    icon: BookOpen,
    title: "Awareness and Prevention Workshops",
    description:
      "Educational sessions in schools and universities focusing on SGBV recognition, consent, boundaries, and healthy relationships.",
    objectives: [
      "Knowledge awareness",
      "Understanding violence",
      "Remove grooming",
      "Improve bystander interventions",
      "SRHR education",
    ],
    image: "/awareness-workshop-tanzania.jpg",
  },
  {
    icon: Video,
    title: "Elimika na Mwajuma Animation Series",
    description:
      "Co-created educational narratives that shift mindsets and behaviors, reaching over 500,000 people through digital platforms.",
    objectives: [
      "Shift mindsets and behaviors",
      "Community engagement",
      "Address sexual corruption",
      "Combat rape culture",
    ],
    image: "/elimika-na-mwajuma-animation.jpg",
  },
  {
    icon: Shield,
    title: "SafetYetu Self-Defense Training",
    description:
      "Comprehensive self-defense program teaching Karate-Judo techniques, assertiveness, and boundary-setting to 400+ women and girls.",
    objectives: [
      "Skills and knowledge to protect oneself",
      "Prevent violence",
      "Build confidence",
      "Community advocacy",
    ],
    image: "/self-defense-training-tanzania.jpg",
  },
  {
    icon: Users,
    title: "Jamii Salama Initiative",
    description:
      "Addressing sexual harassment in public spaces through partnerships with markets, bars, and transportation operators.",
    objectives: [
      "Create safer public spaces",
      "Zero-tolerance policies",
      "Skills development",
      "Community partnerships",
    ],
    image: "/jamii-salama-public-spaces.jpg",
  },
  {
    icon: Car,
    title: "Move with Pink (Pink Bajaji Initiative)",
    description:
      "Empowering SGBV survivors with entrepreneurial skills to become owners and operators of electric bajajis for women-only transportation.",
    objectives: ["Financial independence", "Safe transportation", "Climate resilience", "Women empowerment"],
    image: "/pink-bajaji-women-transport.jpg",
  },
  {
    icon: HeartHandshake,
    title: "Support Services Network",
    description:
      "Comprehensive support through 23 psychologists and 20 legal practitioners across eight regions, assisting 26+ SGBV survivors.",
    objectives: ["Reporting platform", "Psychological support", "Legal assistance", "Survivor empowerment"],
    image: "/support-services-network.jpg",
  },
]

export function ProgramsSection() {
  return (
    <section className="py-20 bg-[#E5CEC2]/20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#182858] mb-6 text-balance">
            Current Programs & Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance leading-relaxed">
            Our comprehensive approach combines education, empowerment, and support to create lasting change in
            communities across Tanzania.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-[#29A9DF] to-[#5EBCDE]">
                  <Image
                    src={program.image || "/placeholder.svg"}
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
                  <h3 className="text-xl font-bold text-[#182858] mb-3 text-pretty">{program.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed text-pretty">{program.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-[#182858] mb-2">Key Objectives:</h4>
                    <ul className="space-y-1">
                      {program.objectives.map((objective, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-[#29A9DF] rounded-full mr-2 flex-shrink-0" />
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-[#29A9DF] text-[#29A9DF] hover:bg-[#29A9DF] hover:text-white transition-all duration-300 bg-transparent"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
