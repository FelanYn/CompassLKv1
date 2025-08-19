"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Cloud,
  CloudRain,
  Sun,
  CloudSnow,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  Compass,
  AlertTriangle,
  MapPin,
  Calendar,
} from "lucide-react"
import { provinces, getProvinceById } from "@/lib/provinces"

interface WeatherData {
  location: string
  provinceId: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  visibility: number
  uvIndex: number
  forecast: {
    day: string
    high: number
    low: number
    condition: string
    precipitation: number
  }[]
  alerts: {
    type: "warning" | "watch" | "advisory"
    title: string
    description: string
    severity: "low" | "medium" | "high"
    provinceId: string
    affectedAreas: string[]
  }[]
}

const mockWeatherDataByProvince: Record<string, WeatherData> = {
  western: {
    location: "Colombo, Western Province",
    provinceId: "western",
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 75,
    windSpeed: 12,
    visibility: 10,
    uvIndex: 8,
    forecast: [
      { day: "Today", high: 30, low: 24, condition: "Partly Cloudy", precipitation: 20 },
      { day: "Tomorrow", high: 29, low: 23, condition: "Light Rain", precipitation: 60 },
      { day: "Wednesday", high: 27, low: 22, condition: "Heavy Rain", precipitation: 85 },
      { day: "Thursday", high: 31, low: 25, condition: "Sunny", precipitation: 10 },
      { day: "Friday", high: 32, low: 26, condition: "Sunny", precipitation: 5 },
    ],
    alerts: [
      {
        type: "warning",
        title: "Heavy Rain Warning",
        description: "Heavy rainfall expected in Western Province. Flooding possible in low-lying areas.",
        severity: "high",
        provinceId: "western",
        affectedAreas: ["Colombo", "Gampaha", "Kalutara"],
      },
      {
        type: "advisory",
        title: "High UV Index",
        description: "UV index reaching dangerous levels. Use sun protection when outdoors.",
        severity: "medium",
        provinceId: "western",
        affectedAreas: ["All districts"],
      },
    ],
  },
  southern: {
    location: "Galle, Southern Province",
    provinceId: "southern",
    temperature: 26,
    condition: "Light Rain",
    humidity: 82,
    windSpeed: 15,
    visibility: 8,
    uvIndex: 6,
    forecast: [
      { day: "Today", high: 28, low: 22, condition: "Light Rain", precipitation: 70 },
      { day: "Tomorrow", high: 27, low: 21, condition: "Heavy Rain", precipitation: 90 },
      { day: "Wednesday", high: 25, low: 20, condition: "Heavy Rain", precipitation: 95 },
      { day: "Thursday", high: 29, low: 23, condition: "Partly Cloudy", precipitation: 30 },
      { day: "Friday", high: 30, low: 24, condition: "Sunny", precipitation: 15 },
    ],
    alerts: [
      {
        type: "warning",
        title: "Monsoon Alert",
        description: "Southwest monsoon bringing heavy rains to Southern Province coastal areas.",
        severity: "high",
        provinceId: "southern",
        affectedAreas: ["Galle", "Matara", "Hambantota"],
      },
    ],
  },
  central: {
    location: "Kandy, Central Province",
    provinceId: "central",
    temperature: 22,
    condition: "Cloudy",
    humidity: 68,
    windSpeed: 8,
    visibility: 12,
    uvIndex: 5,
    forecast: [
      { day: "Today", high: 24, low: 18, condition: "Cloudy", precipitation: 40 },
      { day: "Tomorrow", high: 23, low: 17, condition: "Light Rain", precipitation: 65 },
      { day: "Wednesday", high: 21, low: 16, condition: "Rain", precipitation: 80 },
      { day: "Thursday", high: 25, low: 19, condition: "Partly Cloudy", precipitation: 25 },
      { day: "Friday", high: 26, low: 20, condition: "Sunny", precipitation: 10 },
    ],
    alerts: [
      {
        type: "advisory",
        title: "Cool Weather Advisory",
        description: "Temperatures dropping in hill country. Pack warm clothing for early mornings.",
        severity: "low",
        provinceId: "central",
        affectedAreas: ["Nuwara Eliya", "Badulla"],
      },
    ],
  },
}

interface WeatherCardProps {
  location?: string
  provinceId?: string
  compact?: boolean
  showForecast?: boolean
  showAlerts?: boolean
  showProvinceSelector?: boolean
}

export function WeatherCard({
  location,
  provinceId = "western",
  compact = false,
  showForecast = true,
  showAlerts = true,
  showProvinceSelector = false,
}: WeatherCardProps) {
  const [selectedProvinceId, setSelectedProvinceId] = useState(provinceId)
  const [loading, setLoading] = useState(false)

  const weather = mockWeatherDataByProvince[selectedProvinceId] || mockWeatherDataByProvince.western
  const selectedProvince = getProvinceById(selectedProvinceId)

  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase()
    if (lowerCondition.includes("rain")) return <CloudRain className="h-8 w-8 text-blue-500" />
    if (lowerCondition.includes("cloud")) return <Cloud className="h-8 w-8 text-gray-500" />
    if (lowerCondition.includes("sun")) return <Sun className="h-8 w-8 text-yellow-500" />
    if (lowerCondition.includes("snow")) return <CloudSnow className="h-8 w-8 text-blue-300" />
    return <Sun className="h-8 w-8 text-yellow-500" />
  }

  const getSmallWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase()
    if (lowerCondition.includes("rain")) return <CloudRain className="h-4 w-4 text-blue-500" />
    if (lowerCondition.includes("cloud")) return <Cloud className="h-4 w-4 text-gray-500" />
    if (lowerCondition.includes("sun")) return <Sun className="h-4 w-4 text-yellow-500" />
    return <Sun className="h-4 w-4 text-yellow-500" />
  }

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "default"
    }
  }

  const refreshWeather = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  if (compact) {
    return (
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getWeatherIcon(weather.condition)}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm font-medium">{weather.location}</span>
                </div>
                <div className="text-2xl font-bold">{weather.temperature}°C</div>
                <div className="text-sm text-muted-foreground">{weather.condition}</div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={refreshWeather} disabled={loading}>
              <Compass className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Province Selector */}
      {showProvinceSelector && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Select Province:</label>
              <Select value={selectedProvinceId} onValueChange={setSelectedProvinceId}>
                <SelectTrigger className="w-48">
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
              {selectedProvince && (
                <Badge variant="outline" className="ml-2">
                  {selectedProvince.name}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Weather */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              Current Weather
              {selectedProvince && (
                <Badge variant="outline" className="ml-2">
                  {selectedProvince.name}
                </Badge>
              )}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={refreshWeather} disabled={loading}>
              <Compass className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {getWeatherIcon(weather.condition)}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{weather.location}</span>
                </div>
                <div className="text-3xl font-bold">{weather.temperature}°C</div>
                <div className="text-muted-foreground">{weather.condition}</div>
              </div>
            </div>
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <div>
                <div className="text-sm text-muted-foreground">Humidity</div>
                <div className="font-semibold">{weather.humidity}%</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-gray-500" />
              <div>
                <div className="text-sm text-muted-foreground">Wind</div>
                <div className="font-semibold">{weather.windSpeed} km/h</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-green-500" />
              <div>
                <div className="text-sm text-muted-foreground">Visibility</div>
                <div className="font-semibold">{weather.visibility} km</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-yellow-500" />
              <div>
                <div className="text-sm text-muted-foreground">UV Index</div>
                <div className="font-semibold">{weather.uvIndex}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Province-Scoped Weather Alerts */}
      {showAlerts && weather.alerts.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="h-5 w-5" />
              Weather Alerts - {selectedProvince?.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {weather.alerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-medium text-sm">{alert.title}</span>
                    <Badge variant={getAlertColor(alert.severity) as any} className="text-xs">
                      {alert.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {selectedProvince?.name}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                  <div className="text-xs text-muted-foreground">
                    <strong>Affected areas:</strong> {alert.affectedAreas.join(", ")}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* 5-Day Forecast */}
      {showForecast && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              5-Day Forecast - {selectedProvince?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weather.forecast.map((day, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getSmallWeatherIcon(day.condition)}
                    <div>
                      <div className="font-medium">{day.day}</div>
                      <div className="text-sm text-muted-foreground">{day.condition}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Droplets className="h-3 w-3 text-blue-500" />
                      <span>{day.precipitation}%</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{day.high}°</div>
                      <div className="text-muted-foreground">{day.low}°</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
