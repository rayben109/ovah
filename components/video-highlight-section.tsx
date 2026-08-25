"use client"

import { useState } from "react"
import { Play, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function VideoHighlightSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const videoId = "CXNzHYdCTuw"

  return (
    <section className="relative py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          className="space-y-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground text-balance">
            Our Impact Documentary
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            See how OVAH is transforming communities and creating a safer,
            gender-just future.
          </p>
        </motion.div>

        <motion.div
          className="relative mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <motion.div
            className="relative aspect-video bg-gradient-to-br from-black via-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl border-4 border-accent/20"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 25px 50px -12px rgba(241, 109, 46, 0.5)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=0`}
              title="OVAH Impact Documentary"
              className="w-full h-full relative z-10"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none z-20" />

            <motion.button
              onClick={() => setIsVideoOpen(true)}
              className="absolute inset-0 flex items-center justify-center group z-30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Play video"
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
              >
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Play className="h-8 w-8 text-white ml-1 drop-shadow-lg" />
                </div>
              </motion.div>
            </motion.button>

            <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-accent rounded-tl-lg opacity-80" />
            <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-secondary rounded-tr-lg opacity-80" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-primary rounded-bl-lg opacity-80" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-accent rounded-br-lg opacity-80" />
          </motion.div>
        </motion.div>
      </div>

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
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
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
