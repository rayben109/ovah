"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Dennis Edga",
      role: "Empowering Mind Participant",
      content:
        "These training sessions have shown me that no matter what happens to you as a victim, you should not hesitate to speak up. It's important to share your experiences with people you trust.",
      program: "Empowering Mind Program",
      image: "/young-tanzanian-man-smiling-portrait.jpg",
    },
    {
      name: "Madam Khadija",
      role: "Teacher",
      content:
        "Before we attended the Teachers to Mentors training, many of us didn't have the skills to recognize or address signs of sexual and gender-based violence among our students. We were often unsure of how to intervene effectively or collaborate with others to resolve such cases.",
      program: "Teachers to Mentors",
      image: "/tanzanian-female-teacher-professional-portrait.jpg",
    },
    {
      name: "Othman",
      role: "Daladala Driver, Makumbusho Bus Station",
      content:
        "Kituo hiki kinafikiwa na watu zaidi ya 800 kwa siku poster hizi zitamuokoa binti namama ambae hawezi kujitetea dhidi ya unyanyasaji wa kijinsia. (This bus station serves more than 800 people a day. These posters will help save a girl or a woman who cannot defend herself against gender-based harassment.)",
      program: "Jamii Salama Initiative",
      image: "/tanzanian-bus-driver-uniform-portrait.jpg",
    },
    {
      name: "Madam Eda",
      role: "Teacher",
      content:
        "During the training, Ms. Veronika Buchumi gave us practical advice that changed everything. She emphasized the importance of following proper legal channels, not just to protect the students but also to safeguard ourselves as teachers. This program has bridged the gap between schools and the legal system, making it possible to protect our students without compromising our own safety.",
      program: "Elimika na Mwajuma & Teachers to Mentors",
      image: "/experienced-tanzanian-female-teacher-portrait.jpg",
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            <span className="gradient-text">Testimonies</span> from Our
            Community
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Hear from the individuals whose lives have been transformed through
            our programs and initiatives.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <Card className="bg-background border-2 shadow-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left side - Image */}
                <div className="relative min-h-[400px] flex items-center justify-center order-1 md:order-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full flex items-center"
                    >
                      {/* Responsive image wrapper */}
                      <div className="relative w-full h-full md:w-[90%] md:h-[90%] md:ml-8">
                        <Image
                          src={
                            testimonials[currentTestimonial].image ||
                            "/placeholder.svg"
                          }
                          alt={`Portrait of ${testimonials[currentTestimonial].name}`}
                          fill
                          className="object-cover rounded-xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right side - Testimonial content */}
                <div className="p-8 md:p-12 order-2 md:order-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Quote className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-6 text-pretty">
                            "{testimonials[currentTestimonial].content}"
                          </blockquote>

                          <div className="space-y-2">
                            <h4 className="text-xl font-bold text-primary">
                              {testimonials[currentTestimonial].name}
                            </h4>
                            <p className="text-muted-foreground font-medium">
                              {testimonials[currentTestimonial].role}
                            </p>
                            <p className="text-sm text-secondary font-semibold">
                              {testimonials[currentTestimonial].program}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border-2 border-primary/20 hover:border-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentTestimonial
                      ? "bg-primary scale-125"
                      : "bg-primary/30 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border-2 border-primary/20 hover:border-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
