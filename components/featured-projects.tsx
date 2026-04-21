"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    id: "pink-bajaji",
    title: "Pink Bajaji Initiative",
    description:
      "A transformative women's economic empowerment and safe mobility program designed to increase women's participation in the transport sector while addressing sexual and gender-based violence (SGBV) in public spaces. Through the initiative, 17 women aged 18-40 particularly survivors of violence have been trained and licensed, and supported to operate electric three-wheeler taxis (bajajis), enabling them to generate sustainable income earning 507% than what they earned before.",
    image: "/images/projects/pbi-project.png",
    link: "#",
  },
  {
    id: "sema-nami",
    title: "Sema Nami",
    description:
      "SEMA NAMI's goal is to reduce the rate of teenage and early pregnancies among adolescent girls and young women aged 15-24 in Morogoro region by impacting over 40,000 adolescents with Sexual and Reproductive Health and Rights (SRHR) education and promoting safe and healthy relationships by 2028. This project will equip adolescent girls and boys in the Morogoro region with CSE to reduce the prevalence of teenage pregnancy.",
    image: "/images/projects/semanami-project.jpg",
    link: "#",
  },
  {
    id: "jamii-salama",
    title: "Jamii Salama Initiative",
    description:
      "The Jamii Salama Initiative (JSI) is a collaborative effort by women's rights organizations and other stakeholders in Tanzania. Its primary objective is to create safer public spaces by challenging the normalization of sexual harassment, changing mindsets and attitudes, and advocating for policies that promote a safer environment for women and girls. We successfully implemented transformative activities to shift societal norms and attitudes towards sexual harassment.",
    image: "/images/projects/jsi-project.jpg",
    link: "#",
  },
]

export function FeaturedProjects() {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our <span className="text-accent">Featured Projects</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our transformative initiatives that are creating lasting
            change in communities across Tanzania.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* CTA Button */}
                {/* <Button
                  variant="outline"
                  className="w-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all duration-300"
                  asChild
                >
                  <Link href={project.link}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button> */}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Button
            asChild
            size="lg"
            className="gradient-orange hover:opacity-90 transition-all duration-300 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl"
          >
            <Link href="/our-work">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
