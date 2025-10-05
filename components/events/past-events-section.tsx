"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Award, ImageIcon } from "lucide-react"
import Image from "next/image"

const pastEvents = [
  {
    title: "International Day of the Girl Child 2024",
    description:
      "Commemorated with storytelling presentations and awards under the theme 'Girls' Vision for the Future' with 25 students from 5 schools.",
    date: "October 12, 2024",
    location: "OVAH Community Center",
    attendees: "45 participants",
    impact: "25 students engaged in storytelling competition",
    image: "/girl-child-day-2024-event.jpg",
  },
  {
    title: "16 Days of Activism Against GBV 2024",
    description:
      "Launched awareness campaign under 'Towards Beijing +30: UNiTE to End Violence Against Women and Girls' with community outreach.",
    date: "November 25 - December 10, 2024",
    location: "Multiple locations across Dar es Salaam",
    attendees: "100+ public workers reached",
    impact: "Distributed anti-harassment materials and conducted educational sessions",
    image: "/16-days-activism-launch.jpg",
  },
  {
    title: "OVAH's 16 Days of Activism 2023",
    description:
      "Community engagement across Singida, Tabora, Dar es Salaam, and Arusha with training sessions and media campaigns.",
    date: "November 25 - December 10, 2023",
    location: "Four regions in Tanzania",
    attendees: "500+ youth empowered",
    impact: "Daring Voices Gathering and online campaigns reaching 1,000+ per region",
    image: "/16-days-activism-2023.jpg",
  },
  {
    title: "International Day of the Girl Child 2023",
    description:
      "Partnership with Vijana Think Tank under theme 'Invest in Girls' Rights: Our Leadership, Our Well Being' with empowerment activities.",
    date: "October 13, 2023",
    location: "Partner School, Dar es Salaam",
    attendees: "All female students + teachers",
    impact: "Open discussions, drama performances, and rights education",
    image: "/girl-child-day-2023-event.jpg",
  },
  {
    title: "International Day of the Girl Child 2022",
    description:
      "Our first organizational event with theme 'Times for Unstoppable Girls: To be Heard, Educated and Protected' featuring panel discussions.",
    date: "October 22, 2022",
    location: "Dar es Salaam Community Center",
    attendees: "89 students from 8 schools + 20 university participants",
    impact: "First major event establishing OVAH's community presence",
    image: "/girl-child-day-2022-event.jpg",
  },
]

export function PastEventsSection() {
  return (
    <section className="py-20 bg-[#E5CEC2]/20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#182858] mb-6 text-balance">Past Events & Impact</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance leading-relaxed">
            Celebrating our journey of community engagement, advocacy, and the collective impact we've created together.
          </p>
        </motion.div>

        <div className="space-y-8 max-w-6xl mx-auto">
          {pastEvents.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
                <CardContent className="p-0">
                  <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                    <div className={`relative h-64 lg:h-auto ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                      <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#F16D2E] text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Past Event
                        </span>
                      </div>
                    </div>

                    <div className={`p-8 flex flex-col justify-center ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                      <h3 className="text-2xl font-bold text-[#182858] mb-4 text-pretty">{event.title}</h3>

                      <p className="text-gray-600 mb-6 leading-relaxed text-pretty">{event.description}</p>

                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-4 w-4 text-[#29A9DF]" />
                          <span className="text-sm">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="h-4 w-4 text-[#29A9DF]" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="h-4 w-4 text-[#29A9DF]" />
                          <span className="text-sm">{event.attendees}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Award className="h-4 w-4 text-[#29A9DF]" />
                          <span className="text-sm">Impact Achieved</span>
                        </div>
                      </div>

                      <div className="bg-[#29A9DF]/10 p-4 rounded-lg mb-6">
                        <h4 className="font-semibold text-[#182858] mb-2">Event Impact:</h4>
                        <p className="text-sm text-gray-600">{event.impact}</p>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          className="border-[#29A9DF] text-[#29A9DF] hover:bg-[#29A9DF] hover:text-white flex-1 bg-transparent"
                        >
                          <ImageIcon className="mr-2 h-4 w-4" />
                          View Gallery
                        </Button>
                        <Button
                          variant="outline"
                          className="border-[#182858] text-[#182858] hover:bg-[#182858] hover:text-white bg-transparent"
                        >
                          Read Report
                        </Button>
                      </div>
                    </div>
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
