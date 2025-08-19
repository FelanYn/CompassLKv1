"use client"

import { InteractiveMap } from "./interactive-map"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Plus } from "lucide-react"

interface MapIntegrationProps {
  title?: string
  height?: string
  locations?: any[]
  onLocationAdd?: (location: any) => void
  showAddButton?: boolean
}

export function MapIntegration({
  title = "Location Map",
  height = "h-64",
  locations = [],
  onLocationAdd,
  showAddButton = false,
}: MapIntegrationProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {title}
          </CardTitle>
          {showAddButton && (
            <Button size="sm" variant="outline" className="bg-transparent">
              <Plus className="h-4 w-4 mr-1" />
              Add Location
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <InteractiveMap
          height={height}
          showControls={false}
          selectedLocations={locations.map((loc) => loc.id)}
          onLocationSelect={onLocationAdd}
        />
        {locations.length > 0 && (
          <div className="mt-4 space-y-2">
            {locations.map((location, index) => (
              <div key={location.id} className="flex items-center justify-between text-sm">
                <span>
                  {index + 1}. {location.name}
                </span>
                <Button variant="ghost" size="sm" className="h-6 px-2">
                  <Navigation className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
