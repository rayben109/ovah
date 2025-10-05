"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Users, ExternalLink } from "lucide-react"

const upcomingEvents = [
  {
    title: "International Women's Day 2025 Celebration",
    description:
      "Join us for a special celebration highlighting women's achievements and discussing the path forward for gender equality in Tanzania.",
    date: "March 8, 2025",
    time: "9:00 AM - 4:00 PM",
    location: "Dar es Salaam Community Center",
    attendees: "200+ expected",
    type: "Celebration",
    featured: true,
  },
  {
    title: "SafetYetu Self-Defense Workshop Series",
    description:
      "Monthly self-defense training sessions teaching Karate-Judo techniques, assertiveness, and boundary-setting for women and girls.",
    date: "Every 2nd Saturday",
    time: "10:00 AM - 2:00 PM",
    location: "OVAH Training Center",
    attendees: "25 participants per session",
    type: "Workshop",
    featured: false,
  },
  {
    title: "Community Dialogue on SGBV Prevention",
    description:
      "Engaging community leaders, parents, and youth in conversations about preventing sexual and gender-based violence.",
    date: "February 15, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Mwananyamala Community Hall",
    attendees: "100+ community members",
    type: "Dialogue",
    featured: false,
  },
]

export function UpcomingEventsSection() {
  return (
    <section className="py-20 bg-[#FCFDFD]">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#182858] mb-6 text-balance">Upcoming Events</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance leading-relaxed">
            Be part of the change. Join our upcoming events and help us build a gender-just and violence-free society.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={event.featured ? "lg:col-span-2" : ""}
            >
              <Card
                className={`h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white ${event.featured ? "border-l-4 border-l-[#F16D2E]" : ""}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="bg-[#29A9DF] text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {event.type}
                      </span>
                      {event.featured && (
                        <span className="ml-2 bg-[#F16D2E] text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  <h3
                    className={`font-bold text-[#182858] mb-3 text-pretty ${event.featured ? "text-2xl" : "text-xl"}`}
                  >
                    {event.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed text-pretty">{event.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4 text-[#29A9DF]" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4 text-[#29A9DF]" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4 text-[#29A9DF]" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="h-4 w-4 text-[#29A9DF]" />
                      <span className="text-sm">{event.attendees}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="bg-[#F16D2E] hover:bg-[#F16D2E]/90 text-white flex-1">Register Now</Button>
                    <Button
                      variant="outline"
                      className="border-[#29A9DF] text-[#29A9DF] hover:bg-[#29A9DF] hover:text-white bg-transparent"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
