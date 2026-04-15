"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [hoveredImage, setHoveredImage] = useState<string | null>(null)

  const galleryImages = [
    "/images/gallery/3G0B6142-2.jpg",
    "/images/gallery/3G0B6234-2.jpg",
    "/images/gallery/3G0B6220-2.jpg",
    "/images/gallery/PBI_Girls.png",
    "/images/gallery/Final day of driving school .jpg",
    "/images/gallery/IMG_6504_(1).jpg",
    "/images/gallery/secindary school sexual harassment-14.jpg",
    "/images/gallery/secindary school sexual harassment-29.jpg",
    "/images/gallery/secindary school sexual harassment.jpg",
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-accent/5 relative overflow-hidden brush-stroke">
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              scale: [0.5, 1, 0.5],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-nunito">
            Our <span className="gradient-orange-text">Impact Gallery</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Witness the transformative power of our work through the eyes of our
            community members and the stories they share.
          </p>
        </motion.div>

        <div className="relative">
          {/* MWAJUMA Character */}
          <motion.div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block"
            initial={{ opacity: 0, x: -100, scale: 0.5 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="relative">
              <motion.div
                className="w-32 h-32 relative"
                animate={{
                  y: [-5, 5, -5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/images/gallery/MWAJUMA.png"
                  alt="MWAJUMA character"
                  width={128}
                  height={128}
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </motion.div>

              {/* Speech bubble */}
              <motion.div
                className="absolute -top-16 -right-8 bg-white rounded-2xl px-4 py-2 shadow-xl border-2 border-accent/20"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <p className="text-sm font-semibold text-accent whitespace-nowrap">
                  Check out our stories! →
                </p>
                <div className="absolute top-full right-8 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
              </motion.div>

              {/* Animated pointing hand */}
              <motion.div
                className="absolute top-16 right-0 w-8 h-8"
                animate={{
                  x: [0, 20, 0],
                  rotate: [0, 15, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              >
                <div className="w-6 h-1 bg-accent rounded-full absolute top-3 left-2 transform rotate-45"></div>
                <div className="w-4 h-1 bg-accent rounded-full absolute top-4 left-6 transform rotate-12"></div>
              </motion.div>
            </div>
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:ml-40"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={image}
                variants={itemVariants}
                className="relative group cursor-pointer"
                onClick={() => setSelectedImage(image)}
                onHoverStart={() => setHoveredImage(image)}
                onHoverEnd={() => setHoveredImage(null)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl bg-muted"
                  whileHover={{
                    boxShadow: "0 25px 50px -12px rgba(241, 109, 46, 0.3)",
                  }}
                >
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-accent/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    animate={{
                      opacity: hoveredImage === image ? 1 : 0,
                    }}
                  />

                  {/* Floating particles on hover */}
                  <AnimatePresence>
                    {hoveredImage === image && (
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-white/60 rounded-full"
                            style={{
                              left: `${20 + Math.random() * 60}%`,
                              top: `${20 + Math.random() * 60}%`,
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                              scale: [0, 1, 0],
                              opacity: [0, 1, 0],
                              y: [-10, -30, -50],
                            }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                              duration: 1.5,
                              delay: i * 0.1,
                              ease: "easeOut",
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </AnimatePresence>

                  {/* Click indicator */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    animate={{
                      scale: hoveredImage === image ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <motion.div
                        className="w-8 h-8 bg-accent rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full opacity-60 animate-pulse" />
                <div
                  className="absolute -bottom-2 -left-2 w-3 h-3 bg-secondary rounded-full opacity-70 animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Gallery image"
                width={800}
                height={600}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
