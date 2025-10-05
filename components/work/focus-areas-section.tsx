"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Heart, Scale } from "lucide-react"

const focusAreas = [
  {
    icon: Shield,
    title: "Combating Sexual and Gender-based Violence",
    description:
      "Comprehensive programs to prevent, respond to, and eliminate SGBV through education, advocacy, and support services.",
  },
  {
    icon: Scale,
    title: "Gender Equality and Women's Empowerment",
    description:
      "Promoting equal rights, opportunities, and representation for women and girls in all aspects of society.",
  },
  {
    icon: Users,
    title: "Adolescents, Youth, and Women's Engagement",
    description:
      "Building leadership skills and creating platforms for meaningful participation in decision-making processes.",
  },
  {
    icon: Heart,
    title: "Sexual and Reproductive Health and Rights",
    description: "Ensuring access to comprehensive SRHR information, services, and advocacy for bodily autonomy.",
  },
]

export function FocusAreasSection() {
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
          <h2 className="text-4xl md:text-5xl font-bold text-[#182858] mb-6 text-balance">Our Focus Areas</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance leading-relaxed">
            We work across four key thematic areas to create comprehensive change and build a gender-just, violence-free
            society.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {focusAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#29A9DF] to-[#5EBCDE] rounded-full flex items-center justify-center">
                      <area.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#182858] mb-3 text-pretty">{area.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-pretty">{area.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
