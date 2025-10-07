"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import { Calendar, MapPin, Clock, Users, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { upcomingEvents } from "@/data/events"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function EventDetails({ params }: { params: { slug: string } }) {
  const event = upcomingEvents.find((e) => e.slug === params.slug)
  
  

  if (!event) return notFound()

  return (
    <div className="min-h-screen bg-[#FCFDFD]">
      <Navigation />

      {/* Page Header */}
      <section className="bg-[#182858] py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="mb-3">
            <nav className="text-sm text-gray-300 flex items-center space-x-2">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/events"
                className="hover:text-white transition-colors"
              >
                Events
              </Link>
              <span>/</span>
              <span className="text-white font-medium">{event.title}</span>
            </nav>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-balance leading-tight">
            {event.title}
          </h1>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <Link href="/events">
              <Button
                variant="outline"
                className="border-[#182858] text-[#182858] hover:bg-[#182858] hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Events
              </Button>
            </Link>
          </div>

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

            <a
              href={event.registerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-[#F16D2E] hover:bg-[#F16D2E]/90 text-white">
                Register via Google Form
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
