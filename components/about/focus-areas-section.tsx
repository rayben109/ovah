"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Crown, Heart } from "lucide-react"
import { SDGComponent } from "../ui/sdg-component"

export function FocusAreasSection() {
  const focusAreas = [
    {
      title: "Combating Sexual and Gender-based Violence",
      description:
        "Our primary focus is preventing and responding to SGBV through comprehensive programs that address root causes and support survivors.",
      icon: Shield,
      color: "primary",
    },
    {
      title: "Gender Equality and Women's Empowerment",
      description:
        "We work to advance gender equality by empowering women and girls with skills, knowledge, and opportunities for leadership.",
      icon: Crown,
      color: "secondary",
    },
    {
      title: "Adolescents, Youth, and Women's Engagement and Leadership",
      description:
        "We prioritize youth and women's participation in decision-making processes and leadership development at all levels.",
      icon: Users,
      color: "accent",
    },
    {
      title: "Sexual and Reproductive Health and Rights",
      description:
        "We advocate for and educate about sexual and reproductive health and rights, ensuring access to information and services.",
      icon: Heart,
      color: "primary",
    },
  ]



  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Focus Areas */}
        <div className="mb-20">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Our <span className="gradient-text">Focus Areas</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              We concentrate our efforts on four key thematic areas that are essential for creating lasting change in
              gender equality and violence prevention.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {focusAreas.map((area, index) => {
              const Icon = area.icon
              return (
                <Card
                  key={area.title}
                  className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-primary/20 bg-background"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          area.color === "primary"
                            ? "bg-primary/10 text-primary"
                            : area.color === "secondary"
                              ? "bg-secondary/10 text-secondary"
                              : "bg-accent/10 text-accent"
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200 leading-tight">
                        {area.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-pretty">{area.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* SDGs Section */}
        <SDGComponent/>
      </div>
    </section>
  )
}
