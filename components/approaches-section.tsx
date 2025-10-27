"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Megaphone, Shield, Users } from "lucide-react"
import { motion } from "framer-motion"

export function ApproachesSection() {
  const approaches = [
    {
      title: "Advocacy & Awareness",
      description:
        "Raising awareness about SGBV through community dialogues, educational campaigns, and policy advocacy to create systemic change.",
      icon: Megaphone,
      color: "primary",
    },
    {
      title: "Prevention & Support",
      description:
        "Providing comprehensive support services, self-defense training, and creating safe spaces for survivors and at-risk individuals.",
      icon: Shield,
      color: "secondary",
    },
    {
      title: "Empowerment & Rights Advancement",
      description:
        "Building leadership skills, economic empowerment opportunities, and advancing women's rights through education and advocacy.",
      icon: Users,
      color: "accent",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section className="py-20 bg-muted/30 brush-stroke">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-nunito">
            Our <span className="gradient-orange-text">Approaches</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            We tackle sexual and gender-based violence through three
            comprehensive approaches that address prevention, response, and
            systemic change.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {approaches.map((approach) => {
            const Icon = approach.icon
            return (
              <motion.div
                key={approach.title}
                variants={cardVariants}
                className="flex"
              >
                <motion.div
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    boxShadow: "0px 12px 24px rgba(0,0,0,0.15)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex-1"
                >
                  <Card className="group border-2 border-accent/20 hover:border-accent/40 transition-all duration-300 bg-background h-full flex flex-col">
                    <CardHeader className="text-center pb-4">
                      <motion.div
                        className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                          approach.color === "primary"
                            ? "bg-primary/10 text-primary"
                            : approach.color === "secondary"
                            ? "bg-secondary/10 text-secondary"
                            : "bg-accent/10 text-accent"
                        }`}
                        whileHover={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        <Icon className="h-8 w-8" aria-hidden="true" />
                      </motion.div>
                      <CardTitle className="text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-200">
                        {approach.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex items-center">
                      <p className="text-muted-foreground text-center leading-relaxed">
                        {approach.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
