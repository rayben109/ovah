import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContactHeroSection } from "@/components/contact/contact-hero-section"
import { ContactDetailsSection } from "@/components/contact/contact-details-section"
import { ContactFormSection } from "@/components/contact/contact-form-section"
import { NewsletterSection } from "@/components/blog/newsletter-section"


export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <ContactHeroSection />
        <ContactDetailsSection />
        <ContactFormSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
