"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { UpcomingEvent } from "@/data/events"

export function EventDetailCard({ event }: { event: UpcomingEvent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white shadow-lg rounded-2xl p-8 border-t-4 border-[#29A9DF]"
    >
      <p className="text-gray-700 text-lg mb-8 leading-relaxed">
        {event.description}
      </p>

      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div className="flex items-center gap-2 text-gray-700">
          <Calendar className="h-5 w-5 text-[#29A9DF]" /> {event.date}
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Clock className="h-5 w-5 text-[#29A9DF]" /> {event.time}
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin className="h-5 w-5 text-[#29A9DF]" /> {event.location}
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Users className="h-5 w-5 text-[#29A9DF]" /> {event.attendees}
        </div>
      </div>

      <a href={event.registerLink} target="_blank" rel="noopener noreferrer">
        <Button className="bg-[#F16D2E] hover:bg-[#F16D2E]/90 text-white">
          Register via Google Form
        </Button>
      </a>
    </motion.div>
  )
}
