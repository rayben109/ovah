import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WorkHeroSection } from "@/components/work/work-hero-section"
import { ProgramsSection } from "@/components/work/programs-section"
import { FocusAreasSection } from "@/components/work/focus-areas-section"
import { ImpactSection } from "@/components/impact-section"

export default function OurWorkPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <WorkHeroSection />
        <FocusAreasSection />
        <ProgramsSection />
        <ImpactSection />
      </main>
      <Footer />
    </div>
  )
}
