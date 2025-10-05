"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/10 to-muted/20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-balance">
              <span className="text-foreground">Creating </span>
              <span className="gradient-text">Gender-Just</span>
              <span className="text-foreground"> and </span>
              <br />
              <span className="gradient-text">Violence-Free</span>
              <span className="text-foreground"> Communities</span>
            </h1>

            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed text-pretty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Join us in empowering girls and women, supporting survivors, and transforming communities through
              advocacy, education, and safe spaces. We strive to build a society where every girl and woman can live
              free from violence, exercise her rights, and reach her full potential.
            </motion.p>
          </motion.div>

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
              <span className="text-lg font-medium">Watch Our Impact Documentary</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
