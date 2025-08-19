"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock, Heart, Plus, Eye } from "lucide-react"
import Link from "next/link"

interface Destination {
  id: number
  name: string
  location: string
  province: string
  rating: number
  reviews: number
  duration: string
  category: string
  image: string
  description: string
  isHiddenGem?: boolean
  price?: string
  openHours?: string
}

interface DestinationCardProps {
  destination: Destination
  onAddToItinerary?: (destination: Destination) => void
  onToggleFavorite?: (destination: Destination) => void
  isFavorite?: boolean
}

export function DestinationCard({
  destination,
  onAddToItinerary,
  onToggleFavorite,
  isFavorite = false,
}: DestinationCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in-up overflow-hidden">
      <div className="relative">
        <img
          src={destination.image || "/placeholder.svg"}
          alt={destination.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-primary/90 text-primary-foreground">{destination.category}</Badge>
          {destination.isHiddenGem && (
            <Badge variant="secondary" className="bg-accent/90 text-accent-foreground">
              Hidden Gem
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 h-8 w-8 p-0 bg-white/80 hover:bg-white/90"
          onClick={(e) => {
            e.preventDefault()
            onToggleFavorite?.(destination)
          }}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
        </Button>

        {/* Price Badge */}
        {destination.price && (
          <Badge className="absolute bottom-3 right-3 bg-black/70 text-white">{destination.price}</Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <MapPin className="h-3 w-3" />
          <span>{destination.location}</span>
          <span className="text-xs">•</span>
          <span>{destination.province}</span>
        </div>

        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {destination.name}
        </h3>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{destination.description}</p>

        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{destination.rating}</span>
            <span className="text-muted-foreground">({destination.reviews} reviews)</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            {destination.duration}
          </div>
        </div>

        {destination.openHours && (
          <div className="text-xs text-muted-foreground mb-3">Open: {destination.openHours}</div>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-transparent"
            onClick={(e) => {
              e.preventDefault()
              onAddToItinerary?.(destination)
            }}
          >
            <Plus className="h-3 w-3 mr-1" />
            Add to Trip
          </Button>
          <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90" asChild>
            <Link href={`/destinations/${destination.id}`}>
              <Eye className="h-3 w-3 mr-1" />
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
