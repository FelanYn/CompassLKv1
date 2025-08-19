"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MessageCircle, Cloud, Star, MapPin, Bell, ArrowRight } from "lucide-react"

const features = [
  {
    icon: Calendar,
    title: "Smart Itinerary Planner",
    description: "Create personalized travel plans with AI-powered recommendations based on your interests and time.",
    action: "Plan Your Trip",
    href: "/itineraries",
    color: "text-blue-600",
  },
  {
    icon: MessageCircle,
    title: "24/7 AI Assistant",
    description: "Get instant help with travel questions, local insights, and emergency assistance anytime.",
    action: "Chat Now",
    href: "/chat",
    color: "text-green-600",
  },
  {
    icon: Cloud,
    title: "Weather & Alerts",
    description: "Real-time weather updates and travel alerts to help you make informed decisions.",
    action: "Check Weather",
    href: "/weather",
    color: "text-orange-600",
  },
  {
    icon: Star,
    title: "Cultural Events",
    description: "Discover local festivals, ceremonies, and cultural experiences happening during your visit.",
    action: "Explore Events",
    href: "/events",
    color: "text-purple-600",
  },
  {
    icon: MapPin,
    title: "Interactive Maps",
    description: "Navigate with detailed maps showing attractions, restaurants, and services near you.",
    action: "Open Maps",
    href: "/map",
    color: "text-red-600",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Stay updated with personalized alerts about your bookings, weather, and local events.",
    action: "Manage Alerts",
    href: "/notifications",
    color: "text-indigo-600",
  },
]

export function FeatureCards() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need for Sri Lanka</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive tools and features designed to make your Sri Lankan adventure seamless and memorable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div
                  className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="group/btn p-0 h-auto text-primary hover:text-primary/80">
                  {feature.action}
                  <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
