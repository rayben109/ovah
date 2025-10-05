"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export function Footer() {
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
              <span className="text-xl font-bold">Our Voices Against Harassment</span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Creating a gender-just and violence-free society through empowerment, advocacy, and community engagement.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {["About Us", "Our Work", "Approaches", "Blog", "Events", "Contact"].map((link) => (
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

          {/* Programs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Programs</h3>
            <ul className="space-y-2">
              {[
                "Elimika na Mwajuma",
                "SafetYetu",
                "Jamii Salama Initiative",
                "Move with Pink",
                "Teachers to Mentors",
              ].map((program) => (
                <li key={program}>
                  <Link
                    href="/our-work"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                  >
                    {program}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-foreground/60" />
                <span className="text-primary-foreground/80">info@ovah.or.tz</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-foreground/60" />
                <span className="text-primary-foreground/80">+255 XXX XXX XXX</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-foreground/60 mt-1" />
                <span className="text-primary-foreground/80">Kinondoni, Dar es Salaam, Tanzania</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="pt-4">
              <h4 className="font-medium mb-2">Stay Updated</h4>
              <div className="flex gap-2">
                <Input
                  placeholder="Your email"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                />
                <Button variant="secondary" size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/60 text-sm">
              © 2025 Our Voices Against Harassment (OVAH). All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-primary-foreground/60 hover:text-primary-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-primary-foreground/60 hover:text-primary-foreground">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
