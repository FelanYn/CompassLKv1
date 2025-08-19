"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, Clock } from "lucide-react"
import { TravelTimeCalculator } from "@/components/travel/travel-time-calculator"
import { provinces } from "@/lib/provinces"
import { getAllTravelTimes, formatDuration, formatCost, transportModes } from "@/lib/travel-times"
import type { TravelTime } from "@/lib/travel-times"

export default function TravelTimesPage() {
  const [selectedRoute, setSelectedRoute] = useState<TravelTime | null>(null)

  // Generate popular routes for display
  const popularRoutes = [
    { from: "western", to: "central", label: "Colombo to Kandy" },
    { from: "western", to: "southern", label: "Colombo to Galle" },
    { from: "central", to: "southern", label: "Kandy to Galle" },
  ]

  const handleRouteSelect = (travelTime: TravelTime) => {
    setSelectedRoute(travelTime)
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Travel Time Calculator</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Plan your journey across Sri Lanka's provinces with accurate travel times and transport options. Compare
          different modes of transport and get cost estimates.
        </p>
      </div>

      {/* Main Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TravelTimeCalculator onRouteSelect={handleRouteSelect} />
        </div>

        {/* Selected Route Details */}
        <div className="space-y-6">
          {selectedRoute && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Selected Route</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {provinces.find((p) => p.id === selectedRoute.fromProvinceId)?.name} →{" "}
                      {provinces.find((p) => p.id === selectedRoute.toProvinceId)?.name}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Transport</span>
                    <div className="flex items-center gap-2">
                      <span>{transportModes.find((t) => t.id === selectedRoute.transportMode)?.icon}</span>
                      <span className="text-sm font-medium">
                        {transportModes.find((t) => t.id === selectedRoute.transportMode)?.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Duration</span>
                    <Badge>
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDuration(selectedRoute.duration)}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Distance</span>
                    <span className="text-sm font-medium">{selectedRoute.distance}km</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Cost</span>
                    <span className="text-sm font-medium">{formatCost(selectedRoute.cost)}</span>
                  </div>
                </div>

                <Button className="w-full">
                  Add to Itinerary
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Popular Routes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Popular Routes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {popularRoutes.map((route, index) => {
                const travelTimes = getAllTravelTimes(route.from, route.to)
                const fastest = travelTimes[0]

                return (
                  <div
                    key={index}
                    className="border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => fastest && handleRouteSelect(fastest)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{route.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {provinces.find((p) => p.id === route.from)?.name} →{" "}
                          {provinces.find((p) => p.id === route.to)?.name}
                        </div>
                      </div>
                      {fastest && (
                        <div className="text-right">
                          <div className="text-sm font-medium">{formatDuration(fastest.duration)}</div>
                          <div className="text-xs text-muted-foreground">
                            {transportModes.find((t) => t.id === fastest.transportMode)?.icon}{" "}
                            {formatCost(fastest.cost)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
