"use client"

import { useState } from "react"
import { DestinationCard } from "./destination-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List, ArrowUpDown } from "lucide-react"

// Mock data - in a real app, this would come from an API
const mockDestinations = [
  {
    id: 1,
    name: "Sigiriya Rock Fortress",
    location: "Dambulla",
    province: "Central Province",
    rating: 4.8,
    reviews: 2847,
    duration: "3-4 hours",
    category: "Historical",
    image: "/sigiriya-fortress.png",
    description: "Ancient rock fortress with stunning frescoes and panoramic views of the surrounding landscape",
    price: "$30",
    openHours: "7:00 AM - 5:30 PM",
  },
  {
    id: 2,
    name: "Galle Fort",
    location: "Galle",
    province: "Southern Province",
    rating: 4.7,
    reviews: 1923,
    duration: "2-3 hours",
    category: "Cultural",
    image: "/galle-fort-lighthouse.png",
    description: "UNESCO World Heritage site with Dutch colonial architecture and charming cobblestone streets",
    price: "Free",
    openHours: "24 hours",
  },
  {
    id: 3,
    name: "Yala National Park",
    location: "Hambantota",
    province: "Southern Province",
    rating: 4.6,
    reviews: 1456,
    duration: "Full day",
    category: "Wildlife",
    image: "/yala-national-park.png",
    description: "Premier wildlife destination famous for leopard sightings and diverse ecosystem",
    price: "$25",
    openHours: "6:00 AM - 6:00 PM",
  },
  {
    id: 4,
    name: "Temple of the Tooth",
    location: "Kandy",
    province: "Central Province",
    rating: 4.9,
    reviews: 3241,
    duration: "1-2 hours",
    category: "Religious",
    image: "/kandy-temple.png",
    description: "Sacred Buddhist temple housing the tooth relic of Buddha, a UNESCO World Heritage site",
    price: "$10",
    openHours: "5:30 AM - 8:00 PM",
  },
  {
    id: 5,
    name: "Pidurangala Rock",
    location: "Dambulla",
    province: "Central Province",
    rating: 4.5,
    reviews: 892,
    duration: "2-3 hours",
    category: "Adventure",
    image: "/pidurangala-sunrise.png",
    description: "Hidden gem offering spectacular sunrise views and a less crowded alternative to Sigiriya",
    isHiddenGem: true,
    price: "$5",
    openHours: "5:00 AM - 6:00 PM",
  },
  {
    id: 6,
    name: "Mirissa Beach",
    location: "Mirissa",
    province: "Southern Province",
    rating: 4.4,
    reviews: 1567,
    duration: "Half day",
    category: "Beaches",
    image: "/mirissa-beach-palms.png",
    description: "Beautiful crescent-shaped beach perfect for whale watching and relaxation",
    price: "Free",
    openHours: "24 hours",
  },
]

interface DestinationsGridProps {
  filters: any
}

export function DestinationsGrid({ filters }: DestinationsGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("rating")
  const [favorites, setFavorites] = useState<number[]>([])

  // Filter destinations based on filters
  const filteredDestinations = mockDestinations.filter((destination) => {
    if (
      filters.search &&
      !destination.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !destination.location.toLowerCase().includes(filters.search.toLowerCase()) &&
      !destination.description.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false
    }

    if (filters.categories?.length > 0 && !filters.categories.includes(destination.category.toLowerCase())) {
      return false
    }

    if (filters.province && destination.province !== filters.province) {
      return false
    }

    if (filters.minRating && destination.rating < Number.parseFloat(filters.minRating)) {
      return false
    }

    if (filters.showHiddenGems && !destination.isHiddenGem) {
      return false
    }

    return true
  })

  // Sort destinations
  const sortedDestinations = [...filteredDestinations].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "reviews":
        return b.reviews - a.reviews
      case "name":
        return a.name.localeCompare(b.name)
      case "price":
        // Simple price sorting (would need more complex logic for real prices)
        return a.price === "Free" ? -1 : b.price === "Free" ? 1 : 0
      default:
        return 0
    }
  })

  const handleAddToItinerary = (destination: any) => {
    // In a real app, this would add to user's itinerary
    console.log("Adding to itinerary:", destination.name)
  }

  const handleToggleFavorite = (destination: any) => {
    setFavorites((prev) =>
      prev.includes(destination.id) ? prev.filter((id) => id !== destination.id) : [...prev, destination.id],
    )
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">{filters.showHiddenGems ? "Hidden Gems" : "Destinations"}</h2>
          <p className="text-muted-foreground">
            {sortedDestinations.length} destination{sortedDestinations.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="reviews">Most Reviewed</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price">Price</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode */}
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      {sortedDestinations.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">No destinations found matching your criteria</div>
          <Button variant="outline">Clear Filters</Button>
        </div>
      ) : (
        <div
          className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
        >
          {sortedDestinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onAddToItinerary={handleAddToItinerary}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={favorites.includes(destination.id)}
            />
          ))}
        </div>
      )}

      {/* Load More */}
      {sortedDestinations.length > 0 && (
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Destinations
          </Button>
        </div>
      )}
    </div>
  )
}
