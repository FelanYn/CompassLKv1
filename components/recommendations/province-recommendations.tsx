"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Clock, Star, Users, Calendar, ArrowRight, Sparkles, TrendingUp, Heart, Filter } from "lucide-react"
import { provinces } from "@/lib/provinces"
import { generateRecommendations, type RecommendationCriteria, type RecommendationGroup } from "@/lib/recommendations"
import { TravelTimeBadge } from "@/components/travel/travel-time-badge"

interface ProvinceRecommendationsProps {
  currentProvinceId?: string
  showFilters?: boolean
}

export function ProvinceRecommendations({
  currentProvinceId = "western",
  showFilters = true,
}: ProvinceRecommendationsProps) {
  const [criteria, setCriteria] = useState<RecommendationCriteria>({
    currentProvinceId,
    interests: [],
    travelStyle: "comfort",
    duration: "full-day",
    season: "dry",
  })

  const [recommendations, setRecommendations] = useState<RecommendationGroup[]>([])
  const [showAllFilters, setShowAllFilters] = useState(false)

  useEffect(() => {
    const newRecommendations = generateRecommendations(criteria)
    setRecommendations(newRecommendations)
  }, [criteria])

  const handleInterestChange = (interest: string, checked: boolean) => {
    setCriteria((prev) => ({
      ...prev,
      interests: checked ? [...(prev.interests || []), interest] : (prev.interests || []).filter((i) => i !== interest),
    }))
  }

  const getGroupIcon = (type: RecommendationGroup["type"]) => {
    switch (type) {
      case "same-province":
        return <MapPin className="h-5 w-5 text-green-500" />
      case "nearby-province":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "interest-based":
        return <Heart className="h-5 w-5 text-red-500" />
      case "seasonal":
        return <Calendar className="h-5 w-5 text-orange-500" />
      case "cross-province":
        return <Sparkles className="h-5 w-5 text-purple-500" />
      default:
        return <TrendingUp className="h-5 w-5 text-gray-500" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "moderate":
        return "bg-yellow-100 text-yellow-800"
      case "challenging":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCrowdLevelColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      {showFilters && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Customize Recommendations
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowAllFilters(!showAllFilters)}>
                {showAllFilters ? "Hide" : "Show"} Filters
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Basic Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Province</label>
                <Select
                  value={criteria.currentProvinceId}
                  onValueChange={(value) => setCriteria((prev) => ({ ...prev, currentProvinceId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((province) => (
                      <SelectItem key={province.id} value={province.id}>
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Travel Style</label>
                <Select
                  value={criteria.travelStyle}
                  onValueChange={(value: any) => setCriteria((prev) => ({ ...prev, travelStyle: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">Budget-Friendly</SelectItem>
                    <SelectItem value="comfort">Comfortable</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Duration</label>
                <Select
                  value={criteria.duration}
                  onValueChange={(value: any) => setCriteria((prev) => ({ ...prev, duration: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="half-day">Half Day</SelectItem>
                    <SelectItem value="full-day">Full Day</SelectItem>
                    <SelectItem value="multi-day">Multi-Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Advanced Filters */}
            {showAllFilters && (
              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Interests</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["nature", "culture", "adventure", "history", "relaxation", "food"].map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest}
                          checked={criteria.interests?.includes(interest) || false}
                          onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                        />
                        <label htmlFor={interest} className="text-sm capitalize cursor-pointer">
                          {interest}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Season</label>
                    <Select
                      value={criteria.season}
                      onValueChange={(value: any) => setCriteria((prev) => ({ ...prev, season: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dry">Dry Season</SelectItem>
                        <SelectItem value="wet">Rainy Season</SelectItem>
                        <SelectItem value="peak">Peak Season</SelectItem>
                        <SelectItem value="off-peak">Off-Peak Season</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Group Size</label>
                    <Select
                      value={criteria.groupSize?.toString() || ""}
                      onValueChange={(value) =>
                        setCriteria((prev) => ({ ...prev, groupSize: value ? Number.parseInt(value) : undefined }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Solo Travel</SelectItem>
                        <SelectItem value="2">Couple</SelectItem>
                        <SelectItem value="4">Small Group (3-4)</SelectItem>
                        <SelectItem value="8">Large Group (5+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Recommendation Groups */}
      <div className="space-y-8">
        {recommendations.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-4">
            <div className="flex items-center gap-3">
              {getGroupIcon(group.type)}
              <div>
                <h2 className="text-xl font-semibold">{group.title}</h2>
                <p className="text-muted-foreground">{group.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.recommendations.map((rec, index) => (
                <Card key={rec.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="relative overflow-hidden">
                    <img
                      src={rec.place.image || "/placeholder.svg?height=200&width=300"}
                      alt={rec.place.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-white/90 text-gray-800">
                        <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                        {rec.place.rating}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      {rec.travelTime && (
                        <TravelTimeBadge
                          fromProvinceId={criteria.currentProvinceId}
                          toProvinceId={rec.place.provinceId}
                          transportMode="car"
                          variant="secondary"
                        />
                      )}
                    </div>
                  </div>

                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">{rec.place.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{rec.place.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className={getDifficultyColor(rec.difficulty)}>
                        {rec.difficulty}
                      </Badge>
                      <Badge variant="outline" className={getCrowdLevelColor(rec.crowdLevel)}>
                        <Users className="h-3 w-3 mr-1" />
                        {rec.crowdLevel} crowds
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{rec.estimatedDuration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{rec.bestTimeToVisit}</span>
                      </div>
                    </div>

                    {rec.reasons.length > 0 && (
                      <div className="bg-muted/50 rounded-lg p-3">
                        <h4 className="text-xs font-medium mb-2 text-muted-foreground uppercase tracking-wide">
                          Why we recommend this
                        </h4>
                        <ul className="space-y-1">
                          {rec.reasons.slice(0, 2).map((reason, reasonIndex) => (
                            <li key={reasonIndex} className="text-xs flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        View Details
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {recommendations.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Sparkles className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-medium mb-2">No recommendations found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to discover amazing destinations in Sri Lanka.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
