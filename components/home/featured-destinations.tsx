"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock, ArrowRight } from "lucide-react"

const featuredDestinations = [
  {
    id: 1,
    name: "Sigiriya Rock Fortress",
    location: "Central Province",
    rating: 4.8,
    reviews: 2847,
    duration: "3-4 hours",
    category: "Historical",
    image: "/sigiriya-fortress.png",
    description: "Ancient rock fortress with stunning frescoes and panoramic views",
  },
  {
    id: 2,
    name: "Galle Fort",
    location: "Southern Province",
    rating: 4.7,
    reviews: 1923,
    duration: "2-3 hours",
    category: "Cultural",
    image: "/galle-fort-lighthouse.png",
    description: "UNESCO World Heritage site with Dutch colonial architecture",
  },
  {
    id: 3,
    name: "Yala National Park",
    location: "Southern Province",
    rating: 4.6,
    reviews: 1456,
    duration: "Full day",
    category: "Wildlife",
    image: "/yala-national-park.png",
    description: "Premier wildlife destination famous for leopard sightings",
  },
  {
    id: 4,
    name: "Temple of the Tooth",
    location: "Kandy",
    rating: 4.9,
    reviews: 3241,
    duration: "1-2 hours",
    category: "Religious",
    image: "/kandy-temple.png",
    description: "Sacred Buddhist temple housing the tooth relic of Buddha",
  },
]

export function FeaturedDestinations() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12 animate-fade-in-up">
          <Badge variant="outline" className="mb-4">
            <Star className="h-3 w-3 mr-1" />
            Top Rated
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Destinations</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover Sri Lanka's most beloved attractions, handpicked by travelers and locals alike
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredDestinations.map((destination, index) => (
            <Card
              key={destination.id}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground">
                  {destination.category}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-3 w-3" />
                  {destination.location}
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {destination.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{destination.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{destination.rating}</span>
                    <span className="text-muted-foreground">({destination.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {destination.duration}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="group bg-transparent">
            View All Destinations
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
