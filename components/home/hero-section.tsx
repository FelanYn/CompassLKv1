"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Compass, ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/sri-lankan-temple-sunset.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center text-white animate-fade-in-up">
        <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary-foreground border-primary/30">
          <MapPin className="h-3 w-3 mr-1" />
          Discover Sri Lanka
        </Badge>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Your Ultimate
          <span className="block text-primary animate-pulse-soft">Sri Lankan</span>
          Adventure Guide
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover hidden gems, plan perfect itineraries, and experience authentic Sri Lankan culture with personalized
          recommendations and real-time assistance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8" asChild>
            <Link href="/destinations">
              <Compass className="h-5 w-5 mr-2" />
              Explore Destinations
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 bg-transparent"
            asChild
          >
            <Link href="/itineraries">
              <Calendar className="h-5 w-5 mr-2" />
              Plan Your Trip
            </Link>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="text-center animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
            <div className="text-2xl md:text-3xl font-bold text-primary">500+</div>
            <div className="text-sm text-gray-300">Destinations</div>
          </div>
          <div className="text-center animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
            <div className="text-2xl md:text-3xl font-bold text-primary">50K+</div>
            <div className="text-sm text-gray-300">Happy Travelers</div>
          </div>
          <div className="text-center animate-slide-in-right" style={{ animationDelay: "0.6s" }}>
            <div className="text-2xl md:text-3xl font-bold text-primary">24/7</div>
            <div className="text-sm text-gray-300">AI Assistance</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
