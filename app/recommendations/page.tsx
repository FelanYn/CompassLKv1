"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, MapPin, TrendingUp, Users } from "lucide-react"
import { ProvinceRecommendations } from "@/components/recommendations/province-recommendations"
import { getQuickRecommendations } from "@/lib/recommendations"
import { provinces } from "@/lib/provinces"

export default function RecommendationsPage() {
  const [selectedProvince, setSelectedProvince] = useState("western")

  // Get quick recommendations for the hero section
  const quickRecs = getQuickRecommendations(selectedProvince, 3)

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Personalized Recommendations</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover amazing destinations tailored to your location, interests, and travel style. Our intelligent
          recommendation engine suggests the perfect places to visit across Sri Lanka's provinces.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <MapPin className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-muted-foreground">Provinces</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">50+</div>
            <div className="text-sm text-muted-foreground">Destinations</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">1000+</div>
            <div className="text-sm text-muted-foreground">Happy Travelers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Sparkles className="h-6 w-6 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">AI</div>
            <div className="text-sm text-muted-foreground">Powered</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Recommendations Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Quick Picks for You
          </CardTitle>
          <p className="text-muted-foreground">
            Based on your current location, here are some top-rated destinations to explore.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickRecs.map((rec) => (
              <div key={rec.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">{rec.place.name}</h4>
                  <Badge variant="outline">{rec.place.rating} ⭐</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{rec.place.description}</p>
                <div className="flex items-center justify-between">
                  <Badge className="text-xs">{provinces.find((p) => p.id === rec.place.provinceId)?.name}</Badge>
                  <span className="text-xs text-muted-foreground">{rec.estimatedDuration}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Button>
              Get Full Recommendations
              <Sparkles className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Recommendations */}
      <ProvinceRecommendations currentProvinceId={selectedProvince} showFilters={true} />
    </div>
  )
}
