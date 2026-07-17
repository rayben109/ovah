"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  MapPin,
  Users,
  Award,
  ImageIcon,
  FileText,
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

import type { PastEvent } from "@/data/events"

export function PastEventsSection({ events: pastEvents }: { events: PastEvent[] }) {
  const [openGallery, setOpenGallery] = useState<number | null>(null)

  return (
    <section id="past-events" className="py-20 bg-[#E5CEC2]/20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#182858] mb-6 text-balance">
            Past Events & Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance leading-relaxed">
            Celebrating our journey of community engagement, advocacy, and the
            collective impact we've created together.
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
                  <div
                    className={`grid lg:grid-cols-2 gap-0 ${
                      index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                    }`}
                  >
                    {/* Image Section */}
                    <div
                      className={`relative h-64 lg:h-auto ${
                        index % 2 === 1 ? "lg:col-start-2" : ""
                      }`}
                    >
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#F16D2E] text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Past Event
                        </span>
                      </div>
                    </div>

                    {/* Details Section */}
                    <div
                      className={`p-8 flex flex-col justify-center ${
                        index % 2 === 1 ? "lg:col-start-1" : ""
                      }`}
                    >
                      <h3 className="text-2xl font-bold text-[#182858] mb-4 text-pretty">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed text-pretty">
                        {event.description}
                      </p>

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
                        <h4 className="font-semibold text-[#182858] mb-2">
                          Event Impact:
                        </h4>
                        <p className="text-sm text-gray-600">{event.impact}</p>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={() => setOpenGallery(index)}
                          className="border-[#29A9DF] text-[#29A9DF] hover:bg-[#29A9DF] hover:text-white flex-1 bg-transparent"
                        >
                          <ImageIcon className="mr-2 h-4 w-4" />
                          View Gallery
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => window.open(event.reportUrl, "_blank")}
                          className="border-[#182858] text-[#182858] hover:bg-[#182858] hover:text-white bg-transparent"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Read Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lightbox for each event */}
              {openGallery === index && (
                <Lightbox
                  open={openGallery !== null}
                  close={() => setOpenGallery(null)}
                  slides={(event.gallery ?? []).map((src) => ({ src }))}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
