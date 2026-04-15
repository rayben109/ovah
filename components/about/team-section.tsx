"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TeamMemberCard } from "@/components/ui/team-member-card"


export function TeamSection() {
  const [viewMode, setViewMode] = useState<"grid" | "interactive">("grid")
  const teamMembers = [
    {
      name: "Modesta Joseph",
      role: "Founder & Executive Director", 
      imageUrl: "/images/team/modesta-joseph-founder.jpg",
      linkedin: "https://linkedin.com/in/modestajoseph",
    },
    {
      name: "Teddy John",
      role: "Projects Manager",
      imageUrl: "/images/team/teddy-john-pm.jpg",
      linkedin: "https://linkedin.com/in/",
    },
    {
      name: "Carina Wolfram",
      role: "MEL Manager",
      imageUrl: "/images/team/placeholder.jpg",
      linkedin: "https://linkedin.com/in/",
    },
    {
      name: "Jacqueline Octavian",
      role: "Comms and Advocacy Officer",
      
      imageUrl: "/images/team/jacqueline-octavian-comms.jpg",
      linkedin: "https://linkedin.com/in/",
    },
    {
      name: "Alfred Rabson",
      role: "Finance Officer",
      imageUrl: "/images/team/alfred-rabson-finance.jpg",
      linkedin: "https://linkedin.com/in/",
    },
  ]


  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Our <span className="gradient-text">Team</span>
          </h2>

          {/* Toggle Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-lg font-semibold ${
                viewMode === "grid"
                  ? "bg-primary text-white"
                  : "bg-muted text-foreground"
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode("interactive")}
              className={`px-4 py-2 rounded-lg font-semibold ${
                viewMode === "interactive"
                  ? "bg-primary text-white"
                  : "bg-muted text-foreground"
              }`}
            >
              Interactive View
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {teamMembers.map((member, i) => (
                <TeamMemberCard key={i} {...member} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="interactive"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {teamMembers.map((member, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <TeamMemberCard {...member} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
