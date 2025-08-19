"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Users, MapPin } from "lucide-react"
import { format } from "date-fns"

interface CreateItineraryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateItinerary: (itinerary: any) => void
}

export function CreateItineraryDialog({ open, onOpenChange, onCreateItinerary }: CreateItineraryDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [travelers, setTravelers] = useState("2")
  const [travelStyle, setTravelStyle] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !startDate || !endDate) return

    setIsLoading(true)

    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

    const newItinerary = {
      id: `itinerary-${Date.now()}`,
      title,
      description,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      duration,
      travelers: Number.parseInt(travelers),
      travelStyle,
      status: "draft",
      destinations: [],
      lastModified: new Date().toISOString(),
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onCreateItinerary(newItinerary)
    setIsLoading(false)
    onOpenChange(false)

    // Reset form
    setTitle("")
    setDescription("")
    setStartDate(undefined)
    setEndDate(undefined)
    setTravelers("2")
    setTravelStyle("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Create New Itinerary
          </DialogTitle>
          <DialogDescription>
            Plan your perfect Sri Lankan adventure. We'll help you organize everything.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Trip Title</Label>
            <Input
              id="title"
              placeholder="e.g., Amazing Sri Lanka Adventure"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe your trip goals, interests, or special requirements..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="travelers">Number of Travelers</Label>
              <Select value={travelers} onValueChange={setTravelers}>
                <SelectTrigger>
                  <Users className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "person" : "people"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="travelStyle">Travel Style</Label>
              <Select value={travelStyle} onValueChange={setTravelStyle}>
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget Travel</SelectItem>
                  <SelectItem value="comfort">Comfort Travel</SelectItem>
                  <SelectItem value="luxury">Luxury Travel</SelectItem>
                  <SelectItem value="adventure">Adventure Travel</SelectItem>
                  <SelectItem value="cultural">Cultural Focus</SelectItem>
                  <SelectItem value="relaxation">Relaxation Focus</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !title || !startDate || !endDate}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Creating...
                </div>
              ) : (
                "Create Itinerary"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
