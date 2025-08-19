"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Users, Edit, Trash2, Share2, Eye } from "lucide-react"
import Link from "next/link"

interface Itinerary {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  duration: number
  destinations: string[]
  travelers: number
  status: "draft" | "confirmed" | "completed"
  image?: string
  lastModified: string
}

interface ItineraryCardProps {
  itinerary: Itinerary
  onEdit?: (itinerary: Itinerary) => void
  onDelete?: (itinerary: Itinerary) => void
  onShare?: (itinerary: Itinerary) => void
}

export function ItineraryCard({ itinerary, onEdit, onDelete, onShare }: ItineraryCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in-up overflow-hidden">
      <div className="relative">
        <img
          src={itinerary.image || "/sri-lankan-temple-sunset.png"}
          alt={itinerary.title}
          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className={`absolute top-3 right-3 ${getStatusColor(itinerary.status)}`}>
          {itinerary.status.charAt(0).toUpperCase() + itinerary.status.slice(1)}
        </Badge>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="group-hover:text-primary transition-colors line-clamp-1">{itinerary.title}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2">{itinerary.description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{itinerary.duration} days</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>
              {itinerary.travelers} traveler{itinerary.travelers !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{itinerary.destinations.length} places</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>
              {new Date(itinerary.startDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Last modified: {new Date(itinerary.lastModified).toLocaleDateString()}
        </div>

        <div className="flex gap-2">
          <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90" asChild>
            <Link href={`/itineraries/${itinerary.id}`}>
              <Eye className="h-3 w-3 mr-1" />
              View
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault()
              onEdit?.(itinerary)
            }}
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault()
              onShare?.(itinerary)
            }}
          >
            <Share2 className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault()
              onDelete?.(itinerary)
            }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
