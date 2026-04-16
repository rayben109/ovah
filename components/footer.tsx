"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Play,
  X,
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export function Footer() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-30 h-12 bg-primary-foreground rounded-sm flex items-center justify-center">
                <span className="text-primary font-bold text-lg">OVAH</span>
              </div>
              <span className="text-xl font-bold">
                Our Voices Against Harassment
              </span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Creating a gender-just and violence-free society through
              empowerment, advocacy, and community engagement.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {[
                "About Us",
                "Our Work",
                "Approaches",
                "Blog",
                "Events",
                "Contact",
              ].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase().replace(" ", "-")}`}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Elimika Na Mwajuma Video */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Elimika Na Mwajuma</h3>
            <motion.div
              className="relative w-full bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl overflow-hidden shadow-lg border border-accent/30 hover:border-accent/60 transition-all duration-300"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 15px 30px rgba(241, 109, 46, 0.3)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Animated border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/10 via-secondary/10 to-primary/10 pointer-events-none" />

              <iframe
                src="https://www.youtube.com/embed/CSGoQPoaQjM?start=20&rel=0&modestbranding=1&controls=0"
                title="Elimika na Mwajuma | #UnyanyasajiwaKijinsianiUkatili - OVAH TANZANIA"
                className="w-full aspect-video relative z-10"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none z-20 rounded-2xl" />

              {/* Play button */}
              <motion.button
                onClick={() => setIsVideoOpen(true)}
                className="absolute inset-0 flex items-center justify-center group z-30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-14 h-14 bg-gradient-to-br from-accent to-orange-500 rounded-full flex items-center justify-center shadow-xl"
                  animate={{
                    boxShadow: [
                      "0 0 15px rgba(241, 109, 46, 0.4)",
                      "0 0 30px rgba(241, 109, 46, 0.6)",
                      "0 0 15px rgba(241, 109, 46, 0.4)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  whileHover={{
                    scale: 1.1,
                  }}
                >
                  <Play className="h-6 w-6 text-white ml-0.5 drop-shadow-lg" />
                </motion.div>
              </motion.button>

              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-accent opacity-60 rounded-tl" />
              <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-secondary opacity-60 rounded-tr" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-primary opacity-60 rounded-bl" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-accent opacity-60 rounded-br" />
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-foreground/60" />
                <span className="text-primary-foreground/80">
                  admin@ovahtanzania.org / ovahtanzania@gmail.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-foreground/60" />
                <span className="text-primary-foreground/80">
                  +255 754099513
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-foreground/60 mt-1" />
                <span className="text-primary-foreground/80">
                  Chui street, Mikocheni Industrial Area, Cocacola Road Dar es
                  Salaam.
                </span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="pt-4">
              <h4 className="font-medium mb-2">Stay Updated</h4>

              <form
                action="https://ovah.us1.list-manage.com/subscribe/post?u=c9575656960434563f2c799cd&id=a1c98fd1ba&f_id=00eff2e4f0"
                method="POST"
                target="_blank"
                className="flex gap-2"
              >
                <input
                  type="email"
                  name="EMAIL"
                  placeholder="Your email"
                  required
                  className="bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 px-3 py-2 rounded-md"
                />

                {/* Hidden bot field (IMPORTANT) */}
                <input
                  type="text"
                  name="b_c9575656960434563f2c799cd_a1c98fd1ba"
                  tabIndex="-1"
                  className="hidden"
                />

                <button
                  type="submit"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-md"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} Our Voices Against Harassment (OVAH).
              All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-primary-foreground/60 hover:text-primary-foreground"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-primary-foreground/60 hover:text-primary-foreground"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

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
              className="relative w-full max-w-4xl mx-4 aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-accent/50"
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
                src="https://www.youtube.com/embed/CSGoQPoaQjM?start=20&autoplay=1&rel=0"
                title="Elimika na Mwajuma | #UnyanyasajiwaKijinsianiUkatili - OVAH TANZANIA"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}
