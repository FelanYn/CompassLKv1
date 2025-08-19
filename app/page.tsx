import { MainNavigation } from "@/components/navigation/main-nav"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedDestinations } from "@/components/home/featured-destinations"
import { FeatureCards } from "@/components/home/feature-cards"
import { CTASection } from "@/components/home/cta-section"
import { WeatherCard } from "@/components/weather/weather-card"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <MainNavigation />
      <main>
        <HeroSection />
        <section className="py-8 bg-muted/30">
          <div className="container">
            <div className="max-w-md mx-auto">
              <WeatherCard location="Colombo" compact={true} showForecast={false} showAlerts={false} />
            </div>
          </div>
        </section>
        <FeaturedDestinations />
        <FeatureCards />
        <CTASection />
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 py-8 border-t">
        <div className="container text-center text-muted-foreground">
          <p>&copy; 2025 Compass LK. Your trusted Sri Lankan travel companion.</p>
        </div>
      </footer>
    </div>
  )
}
