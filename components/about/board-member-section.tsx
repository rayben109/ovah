"use client"

import { motion } from "framer-motion"
import { TeamMemberCard } from "@/components/ui/team-member-card"

export function BoardMembersSection() {
     const boardMembers = [
       {
         name: "Carolyne Ekyarisiima",
         role: "Chairperson",
         bio: "Leads OVAH's strategic vision and ensures governance and accountability.",
         imageUrl: "/images/board/fatima.jpg",
         linkedin: "https://linkedin.com/in/fatima-hassan",
       },
       {
         name: "Winnie Msamba",
         role: "Board Secretary",
         bio: "Oversees organizational policies and compliance, supporting the board’s decisions.",
         imageUrl: "/images/board/joseph.jpg",
         linkedin: "https://linkedin.com/in/joseph-mwinyi",
       },
       {
         name: "Wilhelm Oddo",
         role: "Board Member",
         bio: "Provides expertise in community development and gender advocacy.",
         imageUrl: "/images/board/maryam.jpg",
         linkedin: "https://linkedin.com/in/maryam-said",
       },
       {
         name: "Veronica",
         role: "Board Member",
         bio: "Provides expertise in community development and gender advocacy.",
         imageUrl: "/images/board/maryam.jpg",
         linkedin: "https://linkedin.com/in/maryam-said",
       },
       {
         name: "Juliana",
         role: "Board Member",
         bio: "Provides expertise in community development and gender advocacy.",
         imageUrl: "/images/board/maryam.jpg",
         linkedin: "https://linkedin.com/in/maryam-said",
       },
     ]

  return (
    <section className="py-20 bg-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center">
          Our <span className="gradient-text">Board Members</span>
        </h2>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {boardMembers.map((member, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <TeamMemberCard {...member} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
