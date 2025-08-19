"use client"

import { useState } from "react"
import { MainNavigation } from "@/components/navigation/main-nav"
import { InteractiveMap } from "@/components/map/interactive-map"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Navigation, Bookmark, Route, Camera, Hotel, Utensils, Car, Star, Share2 } from "lucide-react"

// Mock data for nearby locations
const nearbyLocations = [
  {
    id: "1",
    name: "Sigiriya Rock Fortress",
    category: "attraction",
    distance: "2.3 km",
    rating: 4.8,
    reviews: 2847,
    price: "$30",
    image: "/sigiriya-fortress.png",
    description: "Ancient rock fortress with stunning frescoes",
  },
  {
    id: "2",
    name: "Earl's Regency Hotel",
    category: "hotel",
    distance: "1.8 km",
    rating: 4.5,
    reviews: 1234,
    price: "$120/night",
    image: "/kandy-hotel.png",
    description: "Luxury hotel with mountain views",
  },
  {
    id: "3",
    name: "The Empire Cafe",
    category: "restaurant",
    distance: "0.5 km",
    rating: 4.3,
    reviews: 567,
    price: "$$",
    description: "Traditional Sri Lankan cuisine",
  },
]

const savedPlaces = [
  { id: "1", name: "Temple of the Tooth", category: "attraction" },
  { id: "2", name: "Royal Botanical Gardens", category: "attraction" },
  { id: "3", name: "Kandy Lake", category: "attraction" },
]

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("explore")

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "attraction":
        return <Camera className="h-4 w-4" />
      case "hotel":
        return <Hotel className="h-4 w-4" />
      case "restaurant":
        return <Utensils className="h-4 w-4" />
      case "transport":
        return <Car className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />

      <main className="container py-8">
        {/* Page Header */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">
              <MapPin className="h-3 w-3 mr-1" />
              Interactive Map
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Explore Sri Lanka</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Discover attractions, hotels, restaurants, and services across Sri Lanka with our interactive map
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map */}
          <div className="lg:col-span-3 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <InteractiveMap
              height="h-[600px]"
              showControls={true}
              onLocationSelect={setSelectedLocation}
              selectedLocations={selectedLocation ? [selectedLocation.id] : []}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="explore">Explore</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
                <TabsTrigger value="routes">Routes</TabsTrigger>
              </TabsList>

              <TabsContent value="explore" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Nearby Locations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {nearbyLocations.map((location) => (
                      <div
                        key={location.id}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => setSelectedLocation(location)}
                      >
                        <img
                          src={location.image || "/placeholder.svg"}
                          alt={location.name}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {getCategoryIcon(location.category)}
                            <h4 className="font-medium text-sm line-clamp-1">{location.name}</h4>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{location.description}</p>
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{location.rating}</span>
                            </div>
                            <span className="text-muted-foreground">{location.distance}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save Location
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Map
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="saved" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Saved Places</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {savedPlaces.length === 0 ? (
                      <div className="text-center py-6 text-muted-foreground">
                        <Bookmark className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No saved places yet</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {savedPlaces.map((place) => (
                          <div
                            key={place.id}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                          >
                            {getCategoryIcon(place.category)}
                            <span className="text-sm">{place.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="routes" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Route Planning</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Route className="h-4 w-4 mr-2" />
                      Plan Route
                    </Button>
                    <div className="text-center py-6 text-muted-foreground">
                      <Route className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No routes planned yet</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Selected Location Details */}
            {selectedLocation && (
              <Card className="animate-fade-in-up">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Location Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <img
                      src={selectedLocation.image || "/placeholder.svg"}
                      alt={selectedLocation.name}
                      className="w-full h-32 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold mb-1">{selectedLocation.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{selectedLocation.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{selectedLocation.rating}</span>
                        </div>
                        {selectedLocation.price && <Badge variant="secondary">{selectedLocation.price}</Badge>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                        <Navigation className="h-3 w-3 mr-1" />
                        Directions
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Bookmark className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
