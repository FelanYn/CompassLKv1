"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, MapPin, AlertCircle, ArrowRight, Route } from "lucide-react"
import { provinces } from "@/lib/provinces"
import {
  getAllTravelTimes,
  getRecommendedTransport,
  formatDuration,
  formatCost,
  transportModes,
  type TravelTime,
} from "@/lib/travel-times"

interface TravelTimeCalculatorProps {
  fromProvinceId?: string
  toProvinceId?: string
  onRouteSelect?: (travelTime: TravelTime) => void
}

export function TravelTimeCalculator({ fromProvinceId, toProvinceId, onRouteSelect }: TravelTimeCalculatorProps) {
  const [selectedFrom, setSelectedFrom] = useState(fromProvinceId || "")
  const [selectedTo, setSelectedTo] = useState(toProvinceId || "")
  const [selectedTransport, setSelectedTransport] = useState<string>("")

  const travelTimes = selectedFrom && selectedTo ? getAllTravelTimes(selectedFrom, selectedTo) : []
  const recommended = selectedFrom && selectedTo ? getRecommendedTransport(selectedFrom, selectedTo) : null

  const getTransportIcon = (transportId: string) => {
    return transportModes.find((t) => t.id === transportId)?.icon || "🚗"
  }

  const getTransportName = (transportId: string) => {
    return transportModes.find((t) => t.id === transportId)?.name || transportId
  }

  const getDurationColor = (duration: number) => {
    if (duration === 0) return "bg-green-100 text-green-800"
    if (duration < 120) return "bg-blue-100 text-blue-800"
    if (duration < 300) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Route className="h-5 w-5 text-primary" />
          Travel Time Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Province Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">From Province</label>
            <Select value={selectedFrom} onValueChange={setSelectedFrom}>
              <SelectTrigger>
                <SelectValue placeholder="Select starting province" />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((province) => (
                  <SelectItem key={province.id} value={province.id}>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {province.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">To Province</label>
            <Select value={selectedTo} onValueChange={setSelectedTo}>
              <SelectTrigger>
                <SelectValue placeholder="Select destination province" />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((province) => (
                  <SelectItem key={province.id} value={province.id}>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {province.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Recommended Route */}
        {recommended && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-primary text-primary-foreground">Recommended</Badge>
              <span className="text-sm text-muted-foreground">Fastest route</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getTransportIcon(recommended.transportMode)}</span>
                <div>
                  <div className="font-medium">{getTransportName(recommended.transportMode)}</div>
                  <div className="text-sm text-muted-foreground">
                    {recommended.distance}km • {formatCost(recommended.cost)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">{formatDuration(recommended.duration)}</div>
                <Button size="sm" onClick={() => onRouteSelect?.(recommended)} className="mt-1">
                  Use Route
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* All Transport Options */}
        {travelTimes.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">All Transport Options</h4>
            <div className="space-y-2">
              {travelTimes.map((travelTime, index) => (
                <div
                  key={`${travelTime.transportMode}-${index}`}
                  className={`border rounded-lg p-3 cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedTransport === travelTime.transportMode ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setSelectedTransport(travelTime.transportMode)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{getTransportIcon(travelTime.transportMode)}</span>
                      <div>
                        <div className="font-medium">{getTransportName(travelTime.transportMode)}</div>
                        <div className="text-sm text-muted-foreground">
                          {travelTime.distance}km • {formatCost(travelTime.cost)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getDurationColor(travelTime.duration)}>
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDuration(travelTime.duration)}
                      </Badge>
                      {travelTime.notes && (
                        <div className="flex items-center gap-1 mt-1">
                          <AlertCircle className="h-3 w-3 text-amber-500" />
                          <span className="text-xs text-muted-foreground">
                            {travelTime.notes.length} note{travelTime.notes.length > 1 ? "s" : ""}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Transport Notes */}
                  {selectedTransport === travelTime.transportMode && travelTime.notes && (
                    <div className="mt-3 pt-3 border-t border-muted">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                        <span className="text-sm font-medium">Travel Notes</span>
                      </div>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {travelTime.notes.map((note, noteIndex) => (
                          <li key={noteIndex} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{note}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex justify-end mt-3">
                        <Button size="sm" variant="outline" onClick={() => onRouteSelect?.(travelTime)}>
                          Select This Route
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {selectedFrom && selectedTo && travelTimes.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <MapPin className="h-8 w-8 mx-auto mb-2" />
            <p>No travel routes found between selected provinces.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
