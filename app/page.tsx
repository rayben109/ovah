import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ApproachesSection } from "@/components/approaches-section"
import { ImpactSection } from "@/components/impact-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PartnersSection } from "@/components/partners-section"
import { Footer } from "@/components/footer"
import { SDGComponent } from "@/components/ui/sdg-component"

export default function HomePage() {
  const ovahSDGs = [
    {
      number: "3",
      title: "Good Health and Well-being",
      color: "#4C9F38",
    },
    {
      number: "4",
      title: "Quality Education",
      color: "#C5192D",
    },
    {
      number: "5",
      title: "Gender Equality",
      color: "#FF3A21",
    },
    {
      number: "10",
      title: "Reduced Inequalities",
      color: "#DD1367",
    },
    {
      number: "16",
      title: "Peace, Justice and Strong Institutions",
      color: "#00689D",
    },
    {
      number: "17",
      title: "Partnerships for the Goals",
      color: "#19486A",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ApproachesSection />
        <ImpactSection />
        <TestimonialsSection />
        <SDGComponent
          sdgs={ovahSDGs}
          title="Contributing to Global Goals"
          subtitle="Our work directly contributes to achieving these Sustainable Development Goals, creating lasting impact for communities in Tanzania and beyond."
          variant="horizontal"
          className="bg-muted/20"
        />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  )
}
