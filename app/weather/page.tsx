"use client"

import { useState } from "react"
import { MainNavigation } from "@/components/navigation/main-nav"
import { WeatherCard } from "@/components/weather/weather-card"
import { WeatherRecommendations } from "@/components/weather/weather-recommendations"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProvinceFilter } from "@/components/provinces/province-filter"
import { Cloud, MapPin, Search, Bell, Calendar, TrendingUp, Thermometer, Droplets } from "lucide-react"

const popularLocations = [
  { name: "Colombo", temp: 28, condition: "Partly Cloudy", provinceId: "western" },
  { name: "Kandy", temp: 24, condition: "Light Rain", provinceId: "central" },
  { name: "Galle", temp: 30, condition: "Sunny", provinceId: "southern" },
  { name: "Nuwara Eliya", temp: 18, condition: "Cloudy", provinceId: "central" },
  { name: "Ella", temp: 22, condition: "Misty", provinceId: "central" },
  { name: "Anuradhapura", temp: 32, condition: "Hot", provinceId: "central" },
]

const seasonalInfo = [
  {
    season: "Dry Season (December - March)",
    regions: ["West & South Coast", "Hill Country"],
    description: "Perfect for beach activities and mountain trekking",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  {
    season: "Southwest Monsoon (May - September)",
    regions: ["West & South Coast"],
    description: "Heavy rains in western regions, ideal for east coast",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    season: "Northeast Monsoon (October - January)",
    regions: ["North & East Coast"],
    description: "Rains in northern regions, great for west and south",
    color: "bg-green-100 text-green-800 border-green-200",
  },
]

export default function WeatherPage() {
  const [selectedLocation, setSelectedLocation] = useState("Colombo")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("current")
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([])

  const filteredLocations = popularLocations.filter((location) => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesProvince = selectedProvinces.length === 0 || selectedProvinces.includes(location.provinceId)
    return matchesSearch && matchesProvince
  })

  const currentLocationProvince = popularLocations.find((loc) => loc.name === selectedLocation)?.provinceId || "western"

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />

      <main className="container py-8">
        {/* Page Header */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">
              <Cloud className="h-3 w-3 mr-1" />
              Weather & Alerts
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Weather Forecast</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Stay informed with real-time weather updates, travel alerts, and seasonal recommendations for Sri Lanka
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Weather Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="current">Current</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
              </TabsList>

              <TabsContent value="current" className="space-y-6 mt-6">
                <div className="animate-fade-in-up">
                  <WeatherCard
                    location={selectedLocation}
                    showForecast={true}
                    showAlerts={true}
                    provinceId={currentLocationProvince}
                  />
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-6 mt-6">
                <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  <WeatherRecommendations currentWeather="rainy" provinceId={currentLocationProvince} />
                </div>
              </TabsContent>

              <TabsContent value="seasonal" className="space-y-6 mt-6">
                <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Best Travel Seasons
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {seasonalInfo.map((season, index) => (
                        <div key={index} className="p-4 rounded-lg border bg-card">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-semibold">{season.season}</h3>
                            <Badge className={season.color}>
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Optimal
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">Best for:</span>
                              <span className="text-muted-foreground">{season.regions.join(", ")}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{season.description}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            {/* Location Search */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Select Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ProvinceFilter
                  selectedProvinces={selectedProvinces}
                  onProvinceChange={setSelectedProvinces}
                  showLabel={false}
                  variant="compact"
                />

                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {filteredLocations.map((location) => (
                    <div
                      key={location.name}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedLocation === location.name
                          ? "bg-primary/10 border border-primary/20"
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedLocation(location.name)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{location.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{location.temp}°C</div>
                          <div className="text-xs text-muted-foreground">{location.condition}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weather Alerts */}
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <Bell className="h-5 w-5" />
                  Active Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-white rounded-lg">
                  <div className="flex items-start gap-2">
                    <Droplets className="h-4 w-4 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Heavy Rain Warning</div>
                      <div className="text-xs text-muted-foreground">Western Province</div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <div className="flex items-start gap-2">
                    <Thermometer className="h-4 w-4 text-red-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">High Temperature</div>
                      <div className="text-xs text-muted-foreground">Northern Province</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Today's Highlights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <Thermometer className="h-6 w-6 mx-auto mb-2 text-red-500" />
                    <div className="text-lg font-bold">32°C</div>
                    <div className="text-xs text-muted-foreground">Highest</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <Droplets className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                    <div className="text-lg font-bold">85%</div>
                    <div className="text-xs text-muted-foreground">Rain Chance</div>
                  </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Bell className="h-4 w-4 mr-2" />
                  Enable Weather Alerts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
