"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sun, Umbrella, MapPin, Star, ArrowRight, AlertTriangle, CheckCircle } from "lucide-react"
import { getProvinceById, samplePlaces } from "@/lib/provinces"

interface WeatherRecommendation {
  id: string
  type: "alternative" | "seasonal" | "activity"
  title: string
  description: string
  provinceId: string
  locations: {
    name: string
    weather: string
    suitability: "excellent" | "good" | "fair" | "poor"
    image: string
    rating: number
    provinceId: string
    isIndoor?: boolean
  }[]
  tips: string[]
}

const getProvinceRecommendations = (provinceId: string, weatherCondition: string): WeatherRecommendation[] => {
  const province = getProvinceById(provinceId)
  const provincePlaces = samplePlaces.filter((place) => place.provinceId === provinceId)

  const recommendations: WeatherRecommendation[] = []

  // Bad weather alternatives - prioritize same province
  if (weatherCondition.toLowerCase().includes("rain") || weatherCondition.toLowerCase().includes("storm")) {
    const indoorAlternatives = {
      western: [
        {
          name: "National Museum of Colombo",
          weather: "Indoor",
          suitability: "excellent" as const,
          image: "/colombo-museum.png",
          rating: 4.5,
          provinceId: "western",
          isIndoor: true,
        },
        {
          name: "Gangaramaya Temple",
          weather: "Covered areas",
          suitability: "good" as const,
          image: "/gangaramaya-temple.png",
          rating: 4.7,
          provinceId: "western",
          isIndoor: true,
        },
      ],
      southern: [
        {
          name: "Galle Fort Museums",
          weather: "Indoor",
          suitability: "excellent" as const,
          image: "/galle-fort-lighthouse.png",
          rating: 4.6,
          provinceId: "southern",
          isIndoor: true,
        },
        {
          name: "Maritime Museum Galle",
          weather: "Indoor",
          suitability: "excellent" as const,
          image: "/maritime-museum.png",
          rating: 4.3,
          provinceId: "southern",
          isIndoor: true,
        },
      ],
      central: [
        {
          name: "Temple of the Tooth",
          weather: "Covered areas",
          suitability: "excellent" as const,
          image: "/temple-of-tooth.png",
          rating: 4.8,
          provinceId: "central",
          isIndoor: true,
        },
        {
          name: "Kandy Museum",
          weather: "Indoor",
          suitability: "excellent" as const,
          image: "/kandy-museum.png",
          rating: 4.4,
          provinceId: "central",
          isIndoor: true,
        },
      ],
    }

    const sameProvinceIndoor = indoorAlternatives[provinceId as keyof typeof indoorAlternatives] || []

    // Add nearby province alternatives if same province has limited options
    let nearbyAlternatives: typeof sameProvinceIndoor = []
    if (sameProvinceIndoor.length < 3) {
      if (provinceId === "western") {
        nearbyAlternatives = indoorAlternatives.central.slice(0, 2)
      } else if (provinceId === "southern") {
        nearbyAlternatives = indoorAlternatives.western.slice(0, 1)
      } else if (provinceId === "central") {
        nearbyAlternatives = indoorAlternatives.western.slice(0, 1)
      }
    }

    recommendations.push({
      id: `${provinceId}-indoor`,
      type: "alternative",
      title: `Indoor Alternatives in ${province?.name}`,
      description: `Heavy rain expected in ${province?.name}. Here are great indoor attractions in your area and nearby.`,
      provinceId,
      locations: [...sameProvinceIndoor, ...nearbyAlternatives],
      tips: [
        "Prioritizing same-province options to minimize travel time",
        "Carry an umbrella for short walks between locations",
        "Check opening hours as some attractions may close early during heavy rain",
        "Consider booking indoor dining experiences",
      ],
    })
  }

  // Good weather recommendations
  if (weatherCondition.toLowerCase().includes("sunny") || weatherCondition.toLowerCase().includes("clear")) {
    const outdoorRecommendations = {
      western: [
        {
          name: "Galle Face Green",
          weather: "Perfect for outdoor activities",
          suitability: "excellent" as const,
          image: "/galle-face-green.png",
          rating: 4.2,
          provinceId: "western",
        },
        {
          name: "Mount Lavinia Beach",
          weather: "Ideal beach weather",
          suitability: "excellent" as const,
          image: "/mount-lavinia-beach.png",
          rating: 4.4,
          provinceId: "western",
        },
      ],
      southern: [
        {
          name: "Unawatuna Beach",
          weather: "Perfect beach conditions",
          suitability: "excellent" as const,
          image: "/unawatuna-beach.png",
          rating: 4.6,
          provinceId: "southern",
        },
        {
          name: "Mirissa Beach",
          weather: "Ideal for water activities",
          suitability: "excellent" as const,
          image: "/mirissa-beach-palms.png",
          rating: 4.7,
          provinceId: "southern",
        },
      ],
      central: [
        {
          name: "Peradeniya Botanical Gardens",
          weather: "Perfect for garden walks",
          suitability: "excellent" as const,
          image: "/peradeniya-gardens.png",
          rating: 4.8,
          provinceId: "central",
        },
        {
          name: "Horton Plains",
          weather: "Clear mountain views",
          suitability: "excellent" as const,
          image: "/horton-plains.png",
          rating: 4.9,
          provinceId: "central",
        },
      ],
    }

    const sameProvinceOutdoor = outdoorRecommendations[provinceId as keyof typeof outdoorRecommendations] || []

    recommendations.push({
      id: `${provinceId}-outdoor`,
      type: "activity",
      title: `Perfect Weather Activities in ${province?.name}`,
      description: `Excellent weather conditions in ${province?.name}. Make the most of the sunshine!`,
      provinceId,
      locations: sameProvinceOutdoor,
      tips: [
        "Apply sunscreen regularly - UV levels can be high",
        "Stay hydrated, especially during outdoor activities",
        "Best photography light is during golden hour (6-7 AM and 5-6 PM)",
        "Book popular outdoor activities in advance",
      ],
    })
  }

  return recommendations
}

interface WeatherRecommendationsProps {
  currentWeather?: string
  provinceId?: string
}

export function WeatherRecommendations({
  currentWeather = "rainy",
  provinceId = "western",
}: WeatherRecommendationsProps) {
  const recommendations = getProvinceRecommendations(provinceId, currentWeather)
  const currentProvince = getProvinceById(provinceId)

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case "excellent":
        return "bg-green-100 text-green-800 border-green-200"
      case "good":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "fair":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "poor":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSuitabilityIcon = (suitability: string) => {
    switch (suitability) {
      case "excellent":
        return <CheckCircle className="h-3 w-3" />
      case "good":
        return <CheckCircle className="h-3 w-3" />
      case "fair":
        return <AlertTriangle className="h-3 w-3" />
      case "poor":
        return <AlertTriangle className="h-3 w-3" />
      default:
        return <CheckCircle className="h-3 w-3" />
    }
  }

  return (
    <div className="space-y-6">
      {recommendations.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-muted-foreground">
              No specific recommendations available for current weather conditions in {currentProvince?.name}.
            </p>
          </CardContent>
        </Card>
      ) : (
        recommendations.map((recommendation) => (
          <Card key={recommendation.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 mb-2">
                    {recommendation.type === "alternative" && <Umbrella className="h-5 w-5 text-blue-500" />}
                    {recommendation.type === "seasonal" && <Sun className="h-5 w-5 text-yellow-500" />}
                    {recommendation.type === "activity" && <MapPin className="h-5 w-5 text-green-500" />}
                    {recommendation.title}
                  </CardTitle>
                  <p className="text-muted-foreground">{recommendation.description}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="capitalize">
                    {recommendation.type}
                  </Badge>
                  <Badge variant="outline">{currentProvince?.name}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Recommended Locations */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendation.locations.map((location, index) => {
                  const locationProvince = getProvinceById(location.provinceId)
                  const isSameProvince = location.provinceId === provinceId

                  return (
                    <div key={index} className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-lg mb-3">
                        <img
                          src={location.image || "/placeholder.svg?height=120&width=200"}
                          alt={location.name}
                          className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Badge className={getSuitabilityColor(location.suitability)}>
                            {getSuitabilityIcon(location.suitability)}
                            <span className="ml-1 capitalize">{location.suitability}</span>
                          </Badge>
                          {!isSameProvince && (
                            <Badge variant="outline" className="text-xs bg-white/90">
                              {locationProvince?.name}
                            </Badge>
                          )}
                        </div>
                        {location.isIndoor && (
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-blue-100 text-blue-800 text-xs">Indoor</Badge>
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium mb-1 group-hover:text-primary transition-colors">
                          {location.name}
                          {!isSameProvince && (
                            <span className="text-xs text-muted-foreground ml-1">(nearby province)</span>
                          )}
                        </h4>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                          <span>{location.weather}</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{location.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Tips */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Travel Tips for {currentProvince?.name}
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {recommendation.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="flex justify-end">
                <Button variant="outline" className="bg-transparent">
                  View All {currentProvince?.name} Recommendations
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
