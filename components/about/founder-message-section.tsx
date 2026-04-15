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
                src="/images/team/Modesta.JPG"
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
                “I am committed to expanding OVAH’s integrated
                approach—combining prevention, empowerment, survivor support,
                and advocacy—to reach more communities and strengthen systems
                that protect and empower women and girls. My vision is a
                Tanzania where every woman and girl can live free from violence,
                with full agency, dignity, and opportunity. ”
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
              Over the past five years, I have witnessed OVAH Tanzania grow from
              a small, youth-led initiative into a nationally recognized,
              evidence-driven organization working at the forefront of sexual
              and gender-based violence (SGBV) prevention and response. This
              journey has been guided by a clear intention: to build solutions
              that are not only responsive, but transformative in addressing the
              root causes of violence and inequality.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              From the beginning, my vision has been to design programmes that
              are practical, innovative, and grounded in the lived realities of
              women, girls, and young people. Through initiatives such as
              Elimika na Mwajuma, we have used digital storytelling and
              animation to challenge harmful norms and expand access to
              knowledge on SGBV and sexual and reproductive health and rights
              (SRHR). Through Move with Pink (Pink Bajaji Initiative), we have
              created pathways for women, including survivors of violence, to
              access dignified livelihoods while contributing to safer public
              transport systems for women and girls.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              I have also prioritized working beyond individual-level
              interventions to influence systems and institutions. OVAH engages
              schools, transport workers, employers, and community leaders to
              strengthen safeguarding mechanisms, shift behaviors, and promote
              accountability. These efforts are supported through capacity
              building, advocacy, and strategic partnerships that aim to create
              environments where safety and gender equality are actively upheld.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              What continues to drive this vision is the belief that young
              people, especially young women, are powerful agents of change.
              Through our work, we have not only reached communities with
              critical information and services, but also supported young people
              to take on leadership roles and drive change within their own
              spaces.
            </p>

            {/* <Card className="mt-6 border-l-4 border-l-primary bg-primary/5">
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
            </Card> */}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
