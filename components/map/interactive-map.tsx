"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  MapPin,
  Search,
  Layers,
  Navigation,
  Compass,
  Hotel,
  Utensils,
  Camera,
  Car,
  Star,
  Clock,
  Plus,
  Minus,
  Locate,
  Filter,
} from "lucide-react"

interface MapLocation {
  id: string
  name: string
  category: "attraction" | "hotel" | "restaurant" | "transport" | "service"
  coordinates: { lat: number; lng: number }
  rating: number
  reviews: number
  price?: string
  description: string
  image?: string
  contact?: {
    phone?: string
    website?: string
  }
  openHours?: string
}

const mockLocations: MapLocation[] = [
  {
    id: "1",
    name: "Sigiriya Rock Fortress",
    category: "attraction",
    coordinates: { lat: 7.957, lng: 80.7603 },
    rating: 4.8,
    reviews: 2847,
    price: "$30",
    description: "Ancient rock fortress with stunning frescoes and panoramic views",
    image: "/sigiriya-fortress.png",
    contact: { phone: "+94 66 228 4467", website: "www.sigiriya.lk" },
    openHours: "7:00 AM - 5:30 PM",
  },
  {
    id: "2",
    name: "Earl's Regency Hotel",
    category: "hotel",
    coordinates: { lat: 7.2906, lng: 80.6337 },
    rating: 4.5,
    reviews: 1234,
    price: "$120/night",
    description: "Luxury hotel in the heart of Kandy with mountain views",
    image: "/kandy-hotel.png",
    contact: { phone: "+94 81 422 2122", website: "www.earlsregency.com" },
  },
  {
    id: "3",
    name: "Temple of the Tooth",
    category: "attraction",
    coordinates: { lat: 7.2942, lng: 80.6411 },
    rating: 4.9,
    reviews: 3241,
    description: "Sacred Buddhist temple housing the tooth relic of Buddha",
    image: "/kandy-temple.png",
    contact: { phone: "+94 81 223 4226" },
    openHours: "5:30 AM - 8:00 PM",
  },
  {
    id: "4",
    name: "The Empire Cafe",
    category: "restaurant",
    coordinates: { lat: 7.2935, lng: 80.6378 },
    rating: 4.3,
    reviews: 567,
    price: "$$",
    description: "Traditional Sri Lankan cuisine in a colonial setting",
    contact: { phone: "+94 81 223 3284" },
    openHours: "8:00 AM - 10:00 PM",
  },
  {
    id: "5",
    name: "Kandy Railway Station",
    category: "transport",
    coordinates: { lat: 7.2931, lng: 80.6348 },
    rating: 4.1,
    reviews: 892,
    description: "Historic railway station connecting to Colombo and hill country",
    contact: { phone: "+94 81 222 2056" },
  },
]

interface InteractiveMapProps {
  height?: string
  showControls?: boolean
  selectedLocations?: string[]
  onLocationSelect?: (location: MapLocation) => void
  center?: { lat: number; lng: number }
  zoom?: number
}

export function InteractiveMap({
  height = "h-96",
  showControls = true,
  selectedLocations = [],
  onLocationSelect,
  center = { lat: 7.8731, lng: 80.7718 }, // Center of Sri Lanka
  zoom = 8,
}: InteractiveMapProps) {
  const [mapCenter, setMapCenter] = useState(center)
  const [mapZoom, setMapZoom] = useState(zoom)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [mapLayer, setMapLayer] = useState("standard")
  const [showFilters, setShowFilters] = useState(false)
  const [visibleCategories, setVisibleCategories] = useState({
    attraction: true,
    hotel: true,
    restaurant: true,
    transport: true,
    service: true,
  })

  const filteredLocations = mockLocations.filter((location) => {
    const matchesCategory = selectedCategory === "all" || location.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.description.toLowerCase().includes(searchQuery.toLowerCase())
    const isVisible = visibleCategories[location.category]

    return matchesCategory && matchesSearch && isVisible
  })

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "attraction":
        return "bg-blue-500"
      case "hotel":
        return "bg-purple-500"
      case "restaurant":
        return "bg-orange-500"
      case "transport":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleLocationClick = (location: MapLocation) => {
    setMapCenter(location.coordinates)
    setMapZoom(12)
    onLocationSelect?.(location)
  }

  const handleZoomIn = () => {
    setMapZoom((prev) => Math.min(prev + 1, 18))
  }

  const handleZoomOut = () => {
    setMapZoom((prev) => Math.max(prev - 1, 6))
  }

  const handleCenterMap = () => {
    setMapCenter({ lat: 7.8731, lng: 80.7718 })
    setMapZoom(8)
  }

  return (
    <div className="relative">
      {/* Search and Filters */}
      {showControls && (
        <div className="mb-4 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search locations on map..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="attraction">Attractions</SelectItem>
                <SelectItem value="hotel">Hotels</SelectItem>
                <SelectItem value="restaurant">Restaurants</SelectItem>
                <SelectItem value="transport">Transport</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Category Filters */}
          {showFilters && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Map Layers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {Object.entries(visibleCategories).map(([category, visible]) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={visible}
                        onCheckedChange={(checked) =>
                          setVisibleCategories((prev) => ({ ...prev, [category]: checked as boolean }))
                        }
                      />
                      <Label htmlFor={category} className="text-sm capitalize cursor-pointer">
                        {getCategoryIcon(category)}
                        <span className="ml-1">{category}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Map Container */}
      <div className={`relative ${height} bg-muted rounded-lg overflow-hidden border`}>
        {/* Map Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/sri-lanka-map-${mapLayer}.png')`,
            transform: `scale(${1 + (mapZoom - 8) * 0.1})`,
            transition: "transform 0.3s ease",
          }}
        >
          {/* Map Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
        </div>

        {/* Location Markers */}
        {filteredLocations.map((location) => {
          const isSelected = selectedLocations.includes(location.id)
          return (
            <div
              key={location.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 ${
                isSelected ? "scale-125 z-20" : "z-10"
              }`}
              style={{
                left: `${((location.coordinates.lng - 79.5) / 2) * 100 + 30}%`,
                top: `${((8.5 - location.coordinates.lat) / 2) * 100 + 20}%`,
              }}
              onClick={() => handleLocationClick(location)}
            >
              <div
                className={`w-8 h-8 rounded-full ${getCategoryColor(
                  location.category,
                )} flex items-center justify-center text-white shadow-lg ${
                  isSelected ? "ring-4 ring-white ring-opacity-50" : ""
                }`}
              >
                {getCategoryIcon(location.category)}
              </div>
              {isSelected && (
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-64 z-30">
                  <LocationPopup location={location} />
                </div>
              )}
            </div>
          )
        })}

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <div className="bg-white rounded-lg shadow-lg p-1">
            <Button variant="ghost" size="sm" onClick={handleZoomIn} className="h-8 w-8 p-0">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleZoomOut} className="h-8 w-8 p-0">
              <Minus className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm" onClick={handleCenterMap} className="bg-white">
            <Locate className="h-4 w-4" />
          </Button>
        </div>

        {/* Map Layer Selector */}
        <div className="absolute bottom-4 left-4">
          <Select value={mapLayer} onValueChange={setMapLayer}>
            <SelectTrigger className="w-32 bg-white">
              <Layers className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="satellite">Satellite</SelectItem>
              <SelectItem value="terrain">Terrain</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Compass */}
        <div className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-lg">
          <Compass className="h-6 w-6 text-primary" />
        </div>

        {/* Scale */}
        <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded text-xs">
          {mapZoom >= 12 ? "1 km" : mapZoom >= 10 ? "5 km" : "20 km"}
        </div>
      </div>

      {/* Legend */}
      {showControls && (
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          {Object.entries(visibleCategories)
            .filter(([, visible]) => visible)
            .map(([category]) => (
              <div key={category} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${getCategoryColor(category)}`} />
                <span className="capitalize">{category}s</span>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

// Location Popup Component
function LocationPopup({ location }: { location: MapLocation }) {
  return (
    <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm animate-fade-in-up">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {location.image && (
            <img
              src={location.image || "/placeholder.svg"}
              alt={location.name}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm mb-1 line-clamp-1">{location.name}</h4>
            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{location.description}</p>

            <div className="flex items-center gap-3 text-xs mb-2">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{location.rating}</span>
                <span className="text-muted-foreground">({location.reviews})</span>
              </div>
              {location.price && <Badge variant="secondary">{location.price}</Badge>}
            </div>

            {location.openHours && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                <Clock className="h-3 w-3" />
                {location.openHours}
              </div>
            )}

            <div className="flex gap-2">
              <Button size="sm" className="h-6 text-xs bg-primary hover:bg-primary/90">
                <Navigation className="h-3 w-3 mr-1" />
                Directions
              </Button>
              <Button variant="outline" size="sm" className="h-6 text-xs bg-transparent">
                <Plus className="h-3 w-3 mr-1" />
                Add to Trip
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
