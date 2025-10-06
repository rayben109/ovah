import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AboutHeroSection } from "@/components/about/about-hero-section"
import { MissionVisionSection } from "@/components/about/mission-vision-section"
import { ValuesSection } from "@/components/about/values-section"
import { FocusAreasSection } from "@/components/about/focus-areas-section"
import { FounderMessageSection } from "@/components/about/founder-message-section"
import { TeamSection } from "@/components/about/team-section"
import { BoardMembersSection } from "@/components/about/board-member-section"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <AboutHeroSection />
        <MissionVisionSection />
        <FounderMessageSection />
        <ValuesSection />
        <FocusAreasSection />
        <TeamSection />
        <BoardMembersSection />
      </main> 
      <Footer />
    </div>
  )
}
