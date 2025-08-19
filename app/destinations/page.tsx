"use client"

import { useState } from "react"
import { MainNavigation } from "@/components/navigation/main-nav"
import { DestinationFilters } from "@/components/destinations/destination-filters"
import { DestinationsGrid } from "@/components/destinations/destinations-grid"
import { Badge } from "@/components/ui/badge"
import { Compass } from "lucide-react"

export default function DestinationsPage() {
  const [filters, setFilters] = useState({})

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />

      <main className="container py-8">
        {/* Page Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <Badge variant="outline" className="mb-4">
            <Compass className="h-3 w-3 mr-1" />
            Explore Sri Lanka
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Amazing Destinations</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From ancient temples to pristine beaches, explore Sri Lanka's most captivating destinations. Find your
            perfect adventure with our comprehensive guide.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <DestinationFilters onFiltersChange={setFilters} />
        </div>

        {/* Results */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <DestinationsGrid filters={filters} />
        </div>
      </main>
    </div>
  )
}
