"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, Target } from "lucide-react"
import Image from "next/image"

export function AboutHeroSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/10 to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                About <span className="gradient-text">OVAH</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Our Voices Against Harassment (OVAH) is a youth- and women-led NGO in Tanzania, established in November
                2020 and formally registered in 2021. We are dedicated to ending sexual and gender-based violence (SGBV)
                and advancing gender equality by empowering adolescents and women, particularly those from low-income
                households and survivors or those at risk of SGBV.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="border-l-4 border-l-primary bg-primary/5">
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-primary">2020</h3>
                  <p className="text-sm text-muted-foreground">Established</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-secondary bg-secondary/5">
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 text-secondary mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-secondary">Youth-Led</h3>
                  <p className="text-sm text-muted-foreground">Organization</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-accent bg-accent/5">
                <CardContent className="p-4 text-center">
                  <Target className="h-8 w-8 text-accent mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-accent">SGBV</h3>
                  <p className="text-sm text-muted-foreground">Prevention</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                OVAH strengthens self-esteem, autonomy, and leadership skills to support personal, social, and economic
                development. Through social and behavior change communication and community dialogues, we work to
                challenge harmful norms and shift attitudes and behaviors, creating safer, more inclusive communities.
              </p>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="aspect-[4/3] bg-muted rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/ovah-team-community-engagement-session.jpg"
                alt="OVAH team during community engagement session"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Achievement Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl border border-border max-w-xs">
              <h4 className="text-lg font-bold text-foreground mb-2">Our Impact</h4>
              <p className="text-sm text-muted-foreground">
                Empowering communities across Tanzania through innovative programs and survivor-centered approaches.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
