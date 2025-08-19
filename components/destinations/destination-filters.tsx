"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, X, MapPin, Star } from "lucide-react"

const categories = [
  { id: "historical", label: "Historical", count: 45 },
  { id: "cultural", label: "Cultural", count: 38 },
  { id: "natural", label: "Natural", count: 67 },
  { id: "wildlife", label: "Wildlife", count: 23 },
  { id: "religious", label: "Religious", count: 52 },
  { id: "adventure", label: "Adventure", count: 31 },
  { id: "beaches", label: "Beaches", count: 29 },
  { id: "mountains", label: "Mountains", count: 18 },
]

const provinces = [
  "Western Province",
  "Central Province",
  "Southern Province",
  "Northern Province",
  "Eastern Province",
  "North Western Province",
  "North Central Province",
  "Uva Province",
  "Sabaragamuwa Province",
]

interface DestinationFiltersProps {
  onFiltersChange: (filters: any) => void
}

export function DestinationFilters({ onFiltersChange }: DestinationFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedProvince, setSelectedProvince] = useState<string>("all")
  const [minRating, setMinRating] = useState<string>("any")
  const [showHiddenGems, setShowHiddenGems] = useState(false)

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const updated = checked ? [...selectedCategories, categoryId] : selectedCategories.filter((id) => id !== categoryId)
    setSelectedCategories(updated)
    updateFilters({ categories: updated })
  }

  const updateFilters = (newFilters: any) => {
    onFiltersChange({
      search: searchQuery,
      categories: selectedCategories,
      province: selectedProvince,
      minRating,
      showHiddenGems,
      ...newFilters,
    })
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setSelectedProvince("all")
    setMinRating("any")
    setShowHiddenGems(false)
    onFiltersChange({})
  }

  const activeFiltersCount =
    selectedCategories.length +
    (selectedProvince !== "all" ? 1 : 0) +
    (minRating !== "any" ? 1 : 0) +
    (showHiddenGems ? 1 : 0)

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search destinations, cities, or attractions..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            updateFilters({ search: e.target.value })
          }}
          className="pl-10"
        />
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedCategories.map((category) => (
            <Badge key={category} variant="secondary" className="gap-1">
              {categories.find((c) => c.id === category)?.label}
              <X className="h-3 w-3 cursor-pointer" onClick={() => handleCategoryChange(category, false)} />
            </Badge>
          ))}
          {selectedProvince !== "all" && (
            <Badge variant="secondary" className="gap-1">
              <MapPin className="h-3 w-3" />
              {selectedProvince}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedProvince("all")} />
            </Badge>
          )}
          {minRating !== "any" && (
            <Badge variant="secondary" className="gap-1">
              <Star className="h-3 w-3" />
              {minRating}+ rating
              <X className="h-3 w-3 cursor-pointer" onClick={() => setMinRating("any")} />
            </Badge>
          )}
          {showHiddenGems && (
            <Badge variant="secondary" className="gap-1">
              Hidden Gems
              <X className="h-3 w-3 cursor-pointer" onClick={() => setShowHiddenGems(false)} />
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 px-2 text-xs">
            Clear all
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                  />
                  <Label htmlFor={category.id} className="text-sm font-normal cursor-pointer">
                    {category.label}
                  </Label>
                </div>
                <span className="text-xs text-muted-foreground">{category.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Province</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={selectedProvince}
              onValueChange={(value) => {
                setSelectedProvince(value)
                updateFilters({ province: value })
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="All provinces" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All provinces</SelectItem>
                {provinces.map((province) => (
                  <SelectItem key={province} value={province.toLowerCase().replace(/\s+/g, "-")}>
                    {province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Rating */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Minimum Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={minRating}
              onValueChange={(value) => {
                setMinRating(value)
                updateFilters({ minRating: value })
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any rating</SelectItem>
                <SelectItem value="4.5">4.5+ stars</SelectItem>
                <SelectItem value="4.0">4.0+ stars</SelectItem>
                <SelectItem value="3.5">3.5+ stars</SelectItem>
                <SelectItem value="3.0">3.0+ stars</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Special Options */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Special</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hidden-gems"
                checked={showHiddenGems}
                onCheckedChange={(checked) => {
                  setShowHiddenGems(checked as boolean)
                  updateFilters({ showHiddenGems: checked })
                }}
              />
              <Label htmlFor="hidden-gems" className="text-sm font-normal cursor-pointer">
                Show hidden gems only
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
