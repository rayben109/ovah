"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink } from "lucide-react"

export function PartnersSection() {
  const partners = [
    {
      name: "Mastercard Foundation",
      logo: "/images/partners/mastercard-foundation-logo.png",
    },
    {
      name: "We are Family Foundation",
      logo: "/images/partners/we-are-family-foundation-logo.png",
    },
    {
      name: "Women Fund Tanzania",
      logo: "/images/partners/women-trust-fund-tanzania.svg",
    },
    { name: "AWDF", logo: "/images/partners/awdf.png" },
    { name: "Women Deliver", logo: "/images/partners/women-deliver.svg" },
    {
      name: "Australian High Commission",
      logo: "/images/partners/australian-high-commission-logo.jpeg",
    },
  ]

  const reports = [
    
    {
      title: "Annual Report 2023",
      description: "Detailed overview of our 2023 achievements",
      type: "Annual Report",
      url: "/reports/OVAH-Annual-Report-2023.pdf",
    },
    {
      title: "Annual Report 2022",
      description: "Our foundational year impact summary",
      type: "Annual Report",
      url: "#",
    },
    {
      title: "Jamii Salama Initiative Report",
      description: "Comprehensive evaluation of our public safety program",
      type: "Project Report",
      url: "/reports/JSI-Progress-and-Impact-Report-2024.pdf",
    },
    {
      title: "Elimika Na Mwajuma Impact Report",
      description: "Impact assessment of our educational intervention program",
      type: "Project Report",
      url: "/reports/ELIMIKA-NA-MWAJUMA-IMPACT-REPORT.pdf",
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Partners Section */}
        <div className="mb-20">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our <span className="gradient-text">Partners</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              We collaborate with leading organizations to amplify our impact and create sustainable change.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="group cursor-pointer transition-all duration-300 transform hover:scale-105"
              >
                <Card className="border-2 hover:border-primary/20 p-0 hover:shadow-lg transition-all duration-300 bg-background">
                  <CardContent className="p-6 flex items-center justify-center">
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={`${partner.name} logo`}
                      className="max-w-full h-32 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Reports Section */}
        <div>
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              <span className="gradient-text font-nunito">Reports</span> & Documentation
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Access our comprehensive reports and documentation showcasing our impact and methodologies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report, index) => (
              <Card
                key={report.title}
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 hover:border-primary/20 bg-background"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          report.type === "Annual Report"
                            ? "bg-primary/10 text-primary"
                            : "bg-secondary/10 text-secondary"
                        }`}
                      >
                        {report.type}
                      </span>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                      {report.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-200 bg-transparent"
                    onClick={() => window.open(report.url, "_blank")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
