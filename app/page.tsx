import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection, StatsSection, EventsPreview } from "@/components/home-sections"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <EventsPreview />
      </main>
      <Footer />
    </div>
  )
}
