"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Target } from "lucide-react"

export function MissionVisionSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">Our Vision</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                To create a <span className="font-semibold text-primary">gender-just and violence-free society</span>.
              </p>
            </CardContent>
          </Card>

          {/* Mission Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-secondary/20 bg-gradient-to-br from-secondary/5 to-accent/5">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-secondary" />
              </div>
              <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Our mission is to <span className="font-semibold text-secondary">protect and empower</span> women,
                youth, girls, and children by combating sexual violence and advancing their rights across social,
                economic, and environmental domains.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
