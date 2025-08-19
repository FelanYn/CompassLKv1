export interface TravelTime {
  fromProvinceId: string
  toProvinceId: string
  transportMode: "car" | "bus" | "train" | "tuk-tuk" | "walking"
  duration: number // in minutes
  distance: number // in kilometers
  cost: {
    min: number
    max: number
    currency: "LKR"
  }
  notes?: string[]
}

export interface TransportMode {
  id: "car" | "bus" | "train" | "tuk-tuk" | "walking"
  name: string
  icon: string
  description: string
  speedKmh: number
  costPerKm: number
  availability: "always" | "limited" | "daylight"
}

export const transportModes: TransportMode[] = [
  {
    id: "car",
    name: "Private Car",
    icon: "🚗",
    description: "Fastest and most flexible option",
    speedKmh: 50,
    costPerKm: 25,
    availability: "always",
  },
  {
    id: "bus",
    name: "Public Bus",
    icon: "🚌",
    description: "Most economical option",
    speedKmh: 35,
    costPerKm: 3,
    availability: "limited",
  },
  {
    id: "train",
    name: "Train",
    icon: "🚂",
    description: "Scenic and comfortable",
    speedKmh: 40,
    costPerKm: 5,
    availability: "limited",
  },
  {
    id: "tuk-tuk",
    name: "Tuk-Tuk",
    icon: "🛺",
    description: "Good for short distances",
    speedKmh: 25,
    costPerKm: 35,
    availability: "daylight",
  },
  {
    id: "walking",
    name: "Walking",
    icon: "🚶",
    description: "Free and healthy",
    speedKmh: 4,
    costPerKm: 0,
    availability: "daylight",
  },
]

// Province distances in kilometers (approximate road distances)
const provinceDistances: Record<string, Record<string, number>> = {
  western: {
    western: 0,
    southern: 120,
    central: 115,
  },
  southern: {
    western: 120,
    southern: 0,
    central: 180,
  },
  central: {
    western: 115,
    southern: 180,
    central: 0,
  },
}

export function calculateTravelTime(
  fromProvinceId: string,
  toProvinceId: string,
  transportMode: TransportMode["id"],
): TravelTime | null {
  if (fromProvinceId === toProvinceId) {
    return {
      fromProvinceId,
      toProvinceId,
      transportMode,
      duration: 0,
      distance: 0,
      cost: { min: 0, max: 0, currency: "LKR" },
    }
  }

  const distance = provinceDistances[fromProvinceId]?.[toProvinceId]
  const transport = transportModes.find((t) => t.id === transportMode)

  if (!distance || !transport) {
    return null
  }

  const duration = Math.round((distance / transport.speedKmh) * 60) // Convert to minutes
  const baseCost = distance * transport.costPerKm

  // Add some variation to cost estimates
  const costMin = Math.round(baseCost * 0.8)
  const costMax = Math.round(baseCost * 1.2)

  const notes: string[] = []

  // Add transport-specific notes
  switch (transportMode) {
    case "bus":
      notes.push("Multiple transfers may be required")
      notes.push("Schedule varies by time of day")
      break
    case "train":
      notes.push("Limited routes available")
      notes.push("Book tickets in advance")
      break
    case "tuk-tuk":
      if (distance > 50) {
        notes.push("Not recommended for long distances")
        notes.push("Consider breaking journey into segments")
      }
      break
    case "walking":
      if (distance > 20) {
        notes.push("Multi-day journey required")
        notes.push("Plan accommodation stops")
      }
      break
  }

  // Add distance-specific notes
  if (distance > 150) {
    notes.push("Consider overnight stop")
  }

  return {
    fromProvinceId,
    toProvinceId,
    transportMode,
    duration,
    distance,
    cost: { min: costMin, max: costMax, currency: "LKR" },
    notes: notes.length > 0 ? notes : undefined,
  }
}

export function getAllTravelTimes(fromProvinceId: string, toProvinceId: string): TravelTime[] {
  return transportModes
    .map((mode) => calculateTravelTime(fromProvinceId, toProvinceId, mode.id))
    .filter((time): time is TravelTime => time !== null)
    .sort((a, b) => a.duration - b.duration)
}

export function getRecommendedTransport(fromProvinceId: string, toProvinceId: string): TravelTime | null {
  const allTimes = getAllTravelTimes(fromProvinceId, toProvinceId)

  if (allTimes.length === 0) return null

  // For same province, recommend tuk-tuk or walking
  if (fromProvinceId === toProvinceId) {
    return allTimes.find((t) => t.transportMode === "tuk-tuk") || allTimes[0]
  }

  // For inter-province, recommend car or bus based on distance
  const distance = allTimes[0]?.distance || 0

  if (distance > 100) {
    return (
      allTimes.find((t) => t.transportMode === "car") || allTimes.find((t) => t.transportMode === "bus") || allTimes[0]
    )
  }

  return (
    allTimes.find((t) => t.transportMode === "bus") || allTimes.find((t) => t.transportMode === "car") || allTimes[0]
  )
}

export function formatDuration(minutes: number): string {
  if (minutes === 0) return "Same location"
  if (minutes < 60) return `${minutes}m`

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (remainingMinutes === 0) return `${hours}h`
  return `${hours}h ${remainingMinutes}m`
}

export function formatCost(cost: TravelTime["cost"]): string {
  if (cost.min === 0 && cost.max === 0) return "Free"
  if (cost.min === cost.max) return `${cost.currency} ${cost.min}`
  return `${cost.currency} ${cost.min} - ${cost.max}`
}
