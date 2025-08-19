"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Mountain,
  Waves,
  Building,
  TreePine,
  Camera,
  Utensils,
  Heart,
  Compass,
  DollarSign,
  Clock,
  Users,
  Save,
} from "lucide-react"

interface TravelPreferences {
  interests: string[]
  budget: string
  travelStyle: string
  groupSize: string
  duration: string
  accommodation: string[]
  activities: string[]
  cuisinePreferences: string[]
  accessibility: string[]
}

const interestOptions = [
  { id: "nature", label: "Nature & Wildlife", icon: TreePine },
  { id: "culture", label: "Culture & History", icon: Building },
  { id: "adventure", label: "Adventure Sports", icon: Mountain },
  { id: "beaches", label: "Beaches & Coast", icon: Waves },
  { id: "photography", label: "Photography", icon: Camera },
  { id: "food", label: "Food & Cuisine", icon: Utensils },
  { id: "wellness", label: "Wellness & Spa", icon: Heart },
  { id: "spiritual", label: "Spiritual Sites", icon: Compass },
]

const mockPreferences: TravelPreferences = {
  interests: ["nature", "culture", "photography"],
  budget: "mid-range",
  travelStyle: "explorer",
  groupSize: "couple",
  duration: "1-2-weeks",
  accommodation: ["hotel", "boutique"],
  activities: ["hiking", "sightseeing", "photography"],
  cuisinePreferences: ["local", "vegetarian"],
  accessibility: [],
}

export function TravelPreferences() {
  const [preferences, setPreferences] = useState<TravelPreferences>(mockPreferences)
  const [isEditing, setIsEditing] = useState(false)

  const handleInterestToggle = (interestId: string) => {
    setPreferences((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }))
  }

  const handleSave = () => {
    setIsEditing(false)
    // Save preferences logic here
  }

  return (
    <div className="space-y-6">
      {/* Travel Interests */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Travel Interests
            </CardTitle>
            {!isEditing && (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="bg-transparent">
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {interestOptions.map((option) => {
                const Icon = option.icon
                const isSelected = preferences.interests.includes(option.id)
                return (
                  <div
                    key={option.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      isSelected ? "bg-primary/10 border-primary text-primary" : "hover:bg-muted/50 border-border"
                    }`}
                    onClick={() => handleInterestToggle(option.id)}
                  >
                    <div className="flex flex-col items-center text-center gap-2">
                      <Icon className="h-6 w-6" />
                      <span className="text-sm font-medium">{option.label}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {preferences.interests.map((interestId) => {
                const interest = interestOptions.find((opt) => opt.id === interestId)
                if (!interest) return null
                const Icon = interest.icon
                return (
                  <Badge key={interestId} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    <Icon className="h-3 w-3 mr-1" />
                    {interest.label}
                  </Badge>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Travel Style & Budget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Budget Range
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Select
                value={preferences.budget}
                onValueChange={(value) => setPreferences((prev) => ({ ...prev, budget: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget ($50-100/day)</SelectItem>
                  <SelectItem value="mid-range">Mid-range ($100-200/day)</SelectItem>
                  <SelectItem value="luxury">Luxury ($200+/day)</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Badge variant="outline" className="capitalize">
                {preferences.budget.replace("-", " ")}
              </Badge>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Compass className="h-5 w-5" />
              Travel Style
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Select
                value={preferences.travelStyle}
                onValueChange={(value) => setPreferences((prev) => ({ ...prev, travelStyle: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relaxed">Relaxed & Leisurely</SelectItem>
                  <SelectItem value="explorer">Explorer & Active</SelectItem>
                  <SelectItem value="luxury">Luxury & Comfort</SelectItem>
                  <SelectItem value="adventure">Adventure Seeker</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Badge variant="outline" className="capitalize">
                {preferences.travelStyle.replace("-", " ")}
              </Badge>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Group Size & Duration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Typical Group Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Select
                value={preferences.groupSize}
                onValueChange={(value) => setPreferences((prev) => ({ ...prev, groupSize: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solo">Solo Traveler</SelectItem>
                  <SelectItem value="couple">Couple</SelectItem>
                  <SelectItem value="family">Family (3-5)</SelectItem>
                  <SelectItem value="group">Group (6+)</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Badge variant="outline" className="capitalize">
                {preferences.groupSize}
              </Badge>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Trip Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Select
                value={preferences.duration}
                onValueChange={(value) => setPreferences((prev) => ({ ...prev, duration: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekend">Weekend (2-3 days)</SelectItem>
                  <SelectItem value="week">1 Week</SelectItem>
                  <SelectItem value="1-2-weeks">1-2 Weeks</SelectItem>
                  <SelectItem value="month">1 Month+</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Badge variant="outline" className="capitalize">
                {preferences.duration.replace("-", " ")}
              </Badge>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsEditing(false)} className="bg-transparent">
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            <Save className="h-4 w-4 mr-2" />
            Save Preferences
          </Button>
        </div>
      )}
    </div>
  )
}
