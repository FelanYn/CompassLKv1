"use client"

import { Badge } from "@/components/ui/badge"
import { Clock, AlertTriangle } from "lucide-react"
import { calculateTravelTime, formatDuration, transportModes } from "@/lib/travel-times"

interface TravelTimeBadgeProps {
  fromProvinceId: string
  toProvinceId: string
  transportMode?: "car" | "bus" | "train" | "tuk-tuk" | "walking"
  showIcon?: boolean
  variant?: "default" | "secondary" | "destructive" | "outline"
}

export function TravelTimeBadge({
  fromProvinceId,
  toProvinceId,
  transportMode = "car",
  showIcon = true,
  variant = "outline",
}: TravelTimeBadgeProps) {
  const travelTime = calculateTravelTime(fromProvinceId, toProvinceId, transportMode)

  if (!travelTime) {
    return (
      <Badge variant="destructive" className="text-xs">
        <AlertTriangle className="h-3 w-3 mr-1" />
        No route
      </Badge>
    )
  }

  if (travelTime.duration === 0) {
    return (
      <Badge variant="secondary" className="text-xs">
        Same province
      </Badge>
    )
  }

  const getVariantByDuration = (duration: number) => {
    if (variant !== "default") return variant
    if (duration < 120) return "default" as const
    if (duration < 300) return "secondary" as const
    return "destructive" as const
  }

  const transportIcon = transportModes.find((t) => t.id === transportMode)?.icon || "🚗"

  return (
    <Badge variant={getVariantByDuration(travelTime.duration)} className="text-xs">
      {showIcon && <Clock className="h-3 w-3 mr-1" />}
      <span className="mr-1">{transportIcon}</span>
      {formatDuration(travelTime.duration)}
    </Badge>
  )
}
