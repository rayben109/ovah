"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function FounderMessageSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 via-rose-50/60 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Founder Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-rose-100">
              <Image
                src="/founder-portrait.jpg"
                alt="Founder portrait"
                fill
                className="object-cover"
              />
            </div>

            <motion.div
              className="absolute mt-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-border max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-sm italic text-muted-foreground">
                “Every empowered woman inspires a stronger, more equal society.”
              </p>
              <p className="text-sm font-semibold text-foreground mt-2">
                — Modesta Joseph, Founder & Executive Director
              </p>
            </motion.div>
          </motion.div>

          {/* Message Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Our <span className="gradient-text">Founder’s Vision</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              OVAH was born out of a deep conviction that every young woman
              deserves to live free from violence, fear, and discrimination. Our
              mission is to empower survivors, strengthen voices, and drive
              systemic change through advocacy, education, and innovation.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              We believe that by working hand in hand with communities, we can
              transform harmful norms, foster equality, and create a safer, more
              inclusive future for all.
            </p>

            <Card className="mt-6 border-l-4 border-l-primary bg-primary/5">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-primary mb-2">
                  Our Vision
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  A society where every woman and girl lives free from
                  gender-based violence and realizes her full potential in a
                  safe, supportive environment.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
