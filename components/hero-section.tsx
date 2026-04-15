"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, X } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ReactTyped } from "react-typed"

export function HeroSection() {
  // 3 rotating background images
  const images = [
    "/ovah-staff.jpg",
    "/students-perfoming.JPG",
    "/pbi-group-photo.jpg",
  ]
  const [index, setIndex] = useState(0)
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 6000) // change every 6 seconds
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <section className="relative z-20 min-h-screen flex items-center justify-center">
      {/* BACKGROUND IMAGES */}
      <div className="absolute inset-0 overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 via-secondary/50 to-muted/70" />

        {/* Optional blurred glowing shapes */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute top-10 right-10 w-24 h-24 bg-accent rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-36 h-36 bg-accent rounded-full blur-3xl"></div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-background z-10 pointer-events-none" />

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
              Join us in ending sexual and gender-based violence and create
              safer communities through awareness and advocacy, empowerment,
              movement-building and leverage innovation, to advance the rights
              and well-being of women, children and youth. We strive to build a
              society where every girl and woman can live free from violence,
              exercise her rights, and reach her full potential.
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
                className="gradient-orange hover:opacity-90 transition-all duration-300 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl"
              >
                Donate Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 px-8 py-4 text-lg font-semibold bg-transparent hover:shadow-lg"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Framed Video Preview */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-50"
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 1, type: "spring", stiffness: 100 }}
      >
        <div className="relative">
          {/* Floating particles around the video */}
          <div className="absolute -inset-8">
            <motion.div
              className="absolute top-0 left-0 w-3 h-3 bg-accent rounded-full opacity-60"
              animate={{
                y: [-10, 10, -10],
                x: [-5, 5, -5],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-4 right-0 w-2 h-2 bg-secondary rounded-full opacity-70"
              animate={{
                y: [10, -10, 10],
                x: [5, -5, 5],
                scale: [1.2, 1, 1.2],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            <motion.div
              className="absolute bottom-0 left-4 w-4 h-4 bg-primary rounded-full opacity-50"
              animate={{
                y: [-8, 8, -8],
                x: [-3, 3, -3],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </div>

          <motion.div
            className="relative w-180 h-90 bg-gradient-to-br from-black via-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl border-4 border-gradient-to-r from-accent via-secondary to-primary"
            whileHover={{
              scale: 1.08,
              rotateY: 5,
              rotateX: 5,
              boxShadow: "0 25px 50px -12px rgba(241, 109, 46, 0.5)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Animated border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-accent/20 via-secondary/20 to-primary/20 animate-pulse" />

            <iframe
              src="https://www.youtube.com/embed/LPTqhEhG17k?rel=0&modestbranding=1&controls=0"
              title="OVAH Impact Documentary Preview"
              className="w-full h-full relative z-10"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none z-20" />

            {/* Play button with enhanced effects */}
            <motion.button
              onClick={() => setIsVideoOpen(true)}
              className="absolute inset-0 flex items-center justify-center group z-30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="relative w-20 h-20 bg-gradient-to-br from-accent to-orange-500 rounded-full flex items-center justify-center shadow-2xl"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(241, 109, 46, 0.3)",
                    "0 0 40px rgba(241, 109, 46, 0.6)",
                    "0 0 20px rgba(241, 109, 46, 0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 30px rgba(241, 109, 46, 0.8)",
                }}
              >
                <motion.div
                  className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
                  whileHover={{ scale: 0.9 }}
                >
                  <Play className="h-8 w-8 text-white ml-1 drop-shadow-lg" />
                </motion.div>

                {/* Ripple effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-accent/50"
                  animate={{
                    scale: [1, 1.5, 2],
                    opacity: [0.8, 0.4, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              </motion.div>
            </motion.button>

            {/* Corner decorations */}
            <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-accent rounded-tl-lg opacity-80" />
            <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-secondary rounded-tr-lg opacity-80" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-primary rounded-bl-lg opacity-80" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-accent rounded-br-lg opacity-80" />
          </motion.div>

          {/* Enhanced decorative elements */}
          <motion.div
            className="absolute -bottom-4 -right-4 w-8 h-8 bg-gradient-to-br from-accent to-orange-500 rounded-full animate-pulse"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -top-4 -left-4 w-6 h-6 bg-gradient-to-br from-secondary to-blue-400 rounded-full animate-pulse"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute top-1/2 -left-6 w-4 h-4 bg-gradient-to-br from-primary to-blue-600 rounded-full animate-pulse"
            animate={{
              y: [-10, 10, -10],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </div>
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-4xl mx-4 aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <X className="h-6 w-6" />
              </button>
              <iframe
                src="https://www.youtube.com/embed/LPTqhEhG17k?autoplay=1&rel=0"
                title="OVAH Impact Documentary"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
