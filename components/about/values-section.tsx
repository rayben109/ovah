"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, Users, BookOpen, Lightbulb, Heart } from "lucide-react"

export function ValuesSection() {
  const values = [
    {
      title: "Social Justice",
      description:
        "Social justice lies at the heart of our mission. We strive for a Tanzania where every individual is treated with dignity, respect, and fairness. We work to eliminate systemic barriers and ensure equitable access to opportunities, resources, and basic human rights for all, especially women and children.",
      icon: Scale,
      color: "primary",
    },
    {
      title: "Co-creation and Leadership",
      description:
        "At OVAH, we believe that those who are targeted by our programs should also be the key drivers of what we do. We prioritize the active participation of our beneficiaries in the design, implementation, and evaluation of our initiatives.",
      icon: Users,
      color: "secondary",
    },
    {
      title: "Learning and Collaboration",
      description:
        "Our work is rooted in continuous learning and growth. We embrace the opportunity to learn not only about the complex issues we tackle but also about the communities we serve, the intersectionalities of those issues, and how to evolve our approaches.",
      icon: BookOpen,
      color: "accent",
    },
    {
      title: "Impact and Innovation",
      description:
        "We are committed to addressing sexual and gender-based violence in Tanzania through innovative solutions that create tangible, lasting change. Our projects are designed to be both impactful and measurable, ensuring they lead to meaningful progress.",
      icon: Lightbulb,
      color: "primary",
    },
    {
      title: "Collective Care",
      description:
        "We understand that a thriving community is built on the well-being of its members. This extends to our team—board members, staff, ambassadors, and volunteers—as well as the communities we serve. We prioritize empathy, compassion, and mutual respect.",
      icon: Heart,
      color: "secondary",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Our <span className="gradient-text">Values</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            These core values guide everything we do and shape our approach to creating lasting change in communities
            across Tanzania.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <Card
                key={value.title}
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-primary/20 bg-background h-full"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                      value.color === "primary"
                        ? "bg-primary/10 text-primary"
                        : value.color === "secondary"
                          ? "bg-secondary/10 text-secondary"
                          : "bg-accent/10 text-accent"
                    }`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-pretty">{value.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
