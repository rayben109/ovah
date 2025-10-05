"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Mail, Phone } from "lucide-react"

export function ContactHeroSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/10 to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                Contact <span className="gradient-text">OVAH</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Have questions, suggestions, or partnership ideas? We’re here to
                listen. Reach out to our team anytime — your voice matters to
                us.
              </p>
            </div>

            {/* Quick Contact Highlight */}
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="p-6 border-l-4 border-l-primary bg-primary/5 shadow-sm">
                <div className="flex items-center gap-3">
                  <Phone className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold text-primary">
                      Call Us
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      +255 752 522 723
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-l-secondary bg-secondary/5 shadow-sm">
                <div className="flex items-center gap-3">
                  <Mail className="h-8 w-8 text-secondary" />
                  <div>
                    <h3 className="text-lg font-semibold text-secondary">
                      Email
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      info@ovah.or.tz
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="aspect-[4/3] bg-muted rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/OVAH-team-supporting-community.jpg"
                alt="OVAH team supporting community"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Note Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl border border-border max-w-xs">
              <h4 className="text-lg font-bold text-foreground mb-2">
                We're here to help
              </h4>
              <p className="text-sm text-muted-foreground">
                Expect a response from our team within 24-48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
