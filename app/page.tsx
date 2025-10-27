import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { GallerySection } from "@/components/gallery-section"
import { ApproachesSection } from "@/components/approaches-section"
import { ImpactSection } from "@/components/impact-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PartnersSection } from "@/components/partners-section"
import { Footer } from "@/components/footer"
import { SDGComponent } from "@/components/ui/sdg-component"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <GallerySection />
        <ApproachesSection />
        <ImpactSection />
        <TestimonialsSection />
        <SDGComponent />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  )
}
