"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"

export function ContactDetailsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/10 to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have questions, feedback, or
            partnership ideas — feel free to reach out.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8">
          <Card className="border-l-4 border-l-primary bg-primary/5">
            <CardContent className="p-6 text-center space-y-2">
              <Phone className="h-10 w-10 text-primary mx-auto mb-2" />
              <h3 className="text-xl font-semibold text-primary">Call Us</h3>
              <p className="text-muted-foreground">+255 652 522 358</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-secondary bg-secondary/5">
            <CardContent className="p-6 text-center space-y-2">
              <Mail className="h-10 w-10 text-secondary mx-auto mb-2" />
              <h3 className="text-xl font-semibold text-secondary">Email</h3>
              <p className="text-muted-foreground">admin@ovahtanzania.org</p>
              <p className="text-muted-foreground">ovahtanzania@gmail.com</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-accent bg-accent/5">
            <CardContent className="p-6 text-center space-y-2">
              <MapPin className="h-10 w-10 text-accent mx-auto mb-2" />
              <h3 className="text-xl font-semibold text-accent">Visit Us</h3>
              <p className="text-muted-foreground"> Chui street, Mikocheni Industrial Area</p>
              <p className="text-muted-foreground">Cocacola Road Dar es Salaam</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
