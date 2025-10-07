"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import {ReactTyped} from "react-typed"

export function HeroSection() {
  // 3 rotating background images
  const images = [
    "/ovah-staff.jpg",
    "/students-perfoming.JPG",
    "/pbi-group-photo.jpg",
  ]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 6000) // change every 6 seconds
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fading + Zooming Background Images */}
      {images.map((img, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          animate={{
            opacity: i === index ? 1 : 0,
            scale: i === index ? 1.05 : 1, // Ken Burns zoom
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      ))}

      {/* Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-secondary/80 to-muted/60" />

      {/* Optional blurred glowing shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent rounded-full blur-3xl"></div>
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="space-y-8">
          {/* Heading with Typing Effect */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-balance leading-tight">
              <span className="text-foreground">Creating </span>
              <ReactTyped
                strings={[
                  "Gender-Just Communities",
                  "Violence-Free Futures",
                  "Safe Spaces for All",
                ]}
                typeSpeed={60}
                backSpeed={40}
                backDelay={1500}
                loop
                className="text-white"
              />
            </h1>

            <motion.p
              className="text-lg md:text-xl lg:text-2xl  max-w-4xl mx-auto leading-relaxed text-pretty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Join us in empowering girls and women, supporting survivors, and
              transforming communities through advocacy, education, and safe
              spaces. We strive to build a society where every girl and woman
              can live free from violence, exercise her rights, and reach her
              full potential.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="gradient-cta hover:opacity-90 transition-all duration-300 text-white font-semibold px-8 py-4 text-lg shadow-lg"
              >
                Donate Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-8 py-4 text-lg font-semibold bg-transparent"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Video Link */}
          <motion.div
            className="pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="https://youtu.be/LPTqhEhG17k"
              target="_blank"
              className="inline-flex items-center gap-3 text-primary hover:text-secondary transition-colors duration-200 group"
            >
              <motion.div
                className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Play className="h-6 w-6 text-primary" />
              </motion.div>
              <span className="text-lg font-medium">
                Watch Our Impact Documentary
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
