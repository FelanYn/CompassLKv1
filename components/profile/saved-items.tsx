"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bookmark, MapPin, Calendar, Star, Trash2, Share2, ExternalLink, Heart, Route, Camera } from "lucide-react"

interface SavedDestination {
  id: string
  name: string
  location: string
  category: string
  rating: number
  image: string
  savedDate: string
  notes?: string
}

interface SavedItinerary {
  id: string
  title: string
  duration: string
  destinations: number
  createdDate: string
  status: "draft" | "completed" | "active"
}

const mockDestinations: SavedDestination[] = [
  {
    id: "1",
    name: "Sigiriya Rock Fortress",
    location: "Dambulla, Central Province",
    category: "Historical",
    rating: 4.8,
    image: "/sigiriya-fortress.png",
    savedDate: "2024-01-15",
    notes: "Must visit early morning for best views",
  },
  {
    id: "2",
    name: "Temple of the Tooth",
    location: "Kandy, Central Province",
    category: "Religious",
    rating: 4.9,
    image: "/kandy-temple.png",
    savedDate: "2024-01-12",
  },
  {
    id: "3",
    name: "Galle Fort",
    location: "Galle, Southern Province",
    category: "Historical",
    rating: 4.7,
    image: "/galle-fort-lighthouse.png",
    savedDate: "2024-01-10",
    notes: "Perfect for sunset photography",
  },
]

const mockItineraries: SavedItinerary[] = [
  {
    id: "1",
    title: "Cultural Triangle Adventure",
    duration: "7 days",
    destinations: 5,
    createdDate: "2024-01-20",
    status: "draft",
  },
  {
    id: "2",
    title: "Hill Country Explorer",
    duration: "5 days",
    destinations: 4,
    createdDate: "2024-01-18",
    status: "active",
  },
  {
    id: "3",
    title: "Southern Coast Journey",
    duration: "10 days",
    destinations: 8,
    createdDate: "2024-01-15",
    status: "completed",
  },
]

export function SavedItems() {
  const [destinations, setDestinations] = useState<SavedDestination[]>(mockDestinations)
  const [itineraries, setItineraries] = useState<SavedItinerary[]>(mockItineraries)

  const handleRemoveDestination = (id: string) => {
    setDestinations((prev) => prev.filter((dest) => dest.id !== id))
  }

  const handleRemoveItinerary = (id: string) => {
    setItineraries((prev) => prev.filter((itin) => itin.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "historical":
        return <Camera className="h-4 w-4" />
      case "religious":
        return <Heart className="h-4 w-4" />
      case "natural":
        return <MapPin className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  return (
    <Tabs defaultValue="destinations" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="destinations">Saved Destinations</TabsTrigger>
        <TabsTrigger value="itineraries">My Itineraries</TabsTrigger>
      </TabsList>

      <TabsContent value="destinations" className="space-y-4">
        {destinations.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bookmark className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No saved destinations yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Start exploring and save your favorite places to visit later
              </p>
              <Button className="bg-primary hover:bg-primary/90">
                <MapPin className="h-4 w-4 mr-2" />
                Explore Destinations
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {destinations.map((destination) => (
              <Card key={destination.id} className="group hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={destination.image || "/placeholder.svg?height=80&width=80"}
                      alt={destination.name}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold line-clamp-1">{destination.name}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveDestination(destination.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3" />
                        <span className="line-clamp-1">{destination.location}</span>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {getCategoryIcon(destination.category)}
                          <span className="ml-1">{destination.category}</span>
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{destination.rating}</span>
                        </div>
                      </div>

                      {destination.notes && (
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{destination.notes}</p>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Saved {new Date(destination.savedDate).toLocaleDateString()}
                        </span>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Share2 className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="itineraries" className="space-y-4">
        {itineraries.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Route className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No itineraries created yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Create your first travel itinerary to plan your Sri Lankan adventure
              </p>
              <Button className="bg-primary hover:bg-primary/90">
                <Calendar className="h-4 w-4 mr-2" />
                Create Itinerary
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {itineraries.map((itinerary) => (
              <Card key={itinerary.id} className="group hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{itinerary.title}</h3>
                        <Badge className={getStatusColor(itinerary.status)}>{itinerary.status}</Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{itinerary.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{itinerary.destinations} destinations</span>
                        </div>
                        <span>Created {new Date(itinerary.createdDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItinerary(itinerary.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
