"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Heart, Shield } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

export function AboutSection() {
  return (
    <section className="relative z-10 pt-64 pb-20 bg-white brush-stroke">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-[4/3] bg-muted rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/ovah-tanzania.jpg"
                alt="OVAH community empowerment session"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            <motion.div
              className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-xl border border-border"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">10,000+</p>
                  <p className="text-sm text-muted-foreground">
                    Women Empowered
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-nunito">
                About <span className="gradient-orange-text">OVAH</span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Our Voices Against Harassment (OVAH) is a youth and women-led
                Tanzanian Non-governmental Organization dedicated to ending
                sexual and gender-based violence (SGBV) and promoting gender
                equality. Through survivor-centered programs, OVAH promotes
                awareness, prevention, and response to SGBV across communities,
                institutions, and digital spaces.
              </p>
            </div>

            <motion.div
              className="grid sm:grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-l-4 border-l-accent bg-accent/10 hover:bg-accent/15 transition-colors duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Heart className="h-8 w-8 text-accent" />
                      <div>
                        <h3 className="font-semibold text-accent">
                          Survivor-Centered
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Putting survivors first in all our programs
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-l-4 border-l-accent bg-accent/10 hover:bg-accent/15 transition-colors duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Shield className="h-8 w-8 text-accent" />
                      <div>
                        <h3 className="font-semibold text-accent">
                          Community-Based
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Working within communities for lasting change
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="group border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 bg-transparent hover:shadow-lg"
                >
                  Learn More About Our Mission
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
