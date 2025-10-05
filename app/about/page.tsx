import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AboutHeroSection } from "@/components/about/about-hero-section"
import { MissionVisionSection } from "@/components/about/mission-vision-section"
import { ValuesSection } from "@/components/about/values-section"
import { FocusAreasSection } from "@/components/about/focus-areas-section"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <AboutHeroSection />
        <MissionVisionSection />
        <ValuesSection />
        <FocusAreasSection />
      </main>
      <Footer />
    </div>
  )
}
