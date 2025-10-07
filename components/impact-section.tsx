"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Building, Tv, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { CounterAnimation } from "@/components/ui/counter-animation"

export function ImpactSection() {
  const impactStats = [
    {
      number: 10000,
      suffix: "+",
      label: "Adolescent Girls & Women Empowered",
      description:
        "Through awareness programs, self-defense training, support services, and our Women's Mobility Project",
      icon: Users,
      color: "primary",
    },
    {
      number: 2000,
      suffix: "+",
      label: "Community Members Engaged",
      description:
        "Including parents, teachers, local leaders, police officers, healthcare workers, and government representatives",
      icon: Heart,
      color: "secondary",
    },
    {
      number: 100,
      suffix: "+",
      label: "Institutions Equipped",
      description:
        "Schools, universities, and workplaces equipped with tools and strategies to foster safer environments",
      icon: Building,
      color: "accent",
    },
    {
      number: 500000,
      suffix: "+",
      label: "People Reached Through Media",
      description: "Through our animated series on SGBV, sparking national conversations and awareness",
      icon: Tv,
      color: "primary",
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
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            The <span className="gradient-text">Impact</span> We Have Created
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Through our comprehensive programs and community-centered approach, we have made significant strides in
            combating SGBV and empowering communities across Tanzania.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {impactStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div key={stat.label} variants={cardVariants}>
                <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-2 hover:border-primary/20 bg-background h-full">
                  <CardContent className="p-6 text-center space-y-4 h-full flex flex-col justify-between">
                    <div
                      className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                        stat.color === "primary"
                          ? "bg-primary/10 text-primary"
                          : stat.color === "secondary"
                            ? "bg-secondary/10 text-secondary"
                            : "bg-accent/10 text-accent"
                      }`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>

                    <div className="space-y-2">
                      <h3
                        className={`text-3xl md:text-4xl font-bold ${
                          stat.color === "primary"
                            ? "text-primary"
                            : stat.color === "secondary"
                              ? "text-secondary"
                              : "text-accent"
                        }`}
                      >
                        <CounterAnimation end={stat.number} suffix={stat.suffix} duration={2500} />
                      </h3>
                      <h4 className="text-lg font-semibold text-foreground">{stat.label}</h4>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">{stat.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
