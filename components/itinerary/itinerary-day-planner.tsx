"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Clock,
  MapPin,
  Plus,
  GripVertical,
  Edit,
  Trash2,
  Car,
  Bus,
  Plane,
  Train,
  Navigation,
  Camera,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { provinces, getTravelTime, getProvinceById } from "@/lib/provinces"

interface Activity {
  id: string
  title: string
  description: string
  startTime: string
  endTime: string
  location: string
  category: "attraction" | "meal" | "transport" | "accommodation" | "activity"
  duration: number
  notes?: string
  transportMode?: "walking" | "car" | "bus" | "train" | "plane"
  provinceId?: string
  districtId?: string
}

interface DayPlan {
  date: string
  activities: Activity[]
}

interface ItineraryDayPlannerProps {
  dayPlan: DayPlan
  dayNumber: number
  onUpdateDay: (dayPlan: DayPlan) => void
}

interface TravelConflict {
  activityIndex: number
  nextActivityIndex: number
  requiredTime: number
  availableTime: number
  fromProvince: string
  toProvince: string
}

export function ItineraryDayPlanner({ dayPlan, dayNumber, onUpdateDay }: ItineraryDayPlannerProps) {
  const [isAddingActivity, setIsAddingActivity] = useState(false)
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null)

  const detectTravelConflicts = (): TravelConflict[] => {
    const conflicts: TravelConflict[] = []

    for (let i = 0; i < dayPlan.activities.length - 1; i++) {
      const current = dayPlan.activities[i]
      const next = dayPlan.activities[i + 1]

      if (current.provinceId && next.provinceId && current.provinceId !== next.provinceId) {
        const requiredTime = getTravelTime(current.provinceId, next.provinceId, next.transportMode || "car")
        const currentEndTime = new Date(`2000-01-01T${current.endTime}:00`)
        const nextStartTime = new Date(`2000-01-01T${next.startTime}:00`)
        const availableTime = (nextStartTime.getTime() - currentEndTime.getTime()) / (1000 * 60) // minutes

        if (requiredTime > availableTime) {
          conflicts.push({
            activityIndex: i,
            nextActivityIndex: i + 1,
            requiredTime,
            availableTime,
            fromProvince: current.provinceId,
            toProvince: next.provinceId,
          })
        }
      }
    }

    return conflicts
  }

  const conflicts = detectTravelConflicts()

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "attraction":
        return <Camera className="h-4 w-4" />
      case "transport":
        return <Car className="h-4 w-4" />
      case "meal":
        return <MapPin className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "attraction":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "meal":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "transport":
        return "bg-green-100 text-green-800 border-green-200"
      case "accommodation":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTransportIcon = (mode?: string) => {
    switch (mode) {
      case "car":
        return <Car className="h-3 w-3" />
      case "bus":
        return <Bus className="h-3 w-3" />
      case "train":
        return <Train className="h-3 w-3" />
      case "plane":
        return <Plane className="h-3 w-3" />
      default:
        return <Navigation className="h-3 w-3" />
    }
  }

  const getProvinceBadgeColor = (provinceId?: string) => {
    switch (provinceId) {
      case "western":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "southern":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "central":
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const addActivity = (activity: Omit<Activity, "id">) => {
    const newActivity: Activity = {
      ...activity,
      id: `activity-${Date.now()}`,
    }

    const updatedActivities = [...dayPlan.activities, newActivity].sort((a, b) =>
      a.startTime.localeCompare(b.startTime),
    )

    onUpdateDay({
      ...dayPlan,
      activities: updatedActivities,
    })
  }

  const updateActivity = (activityId: string, updates: Partial<Activity>) => {
    const updatedActivities = dayPlan.activities.map((activity) =>
      activity.id === activityId ? { ...activity, ...updates } : activity,
    )

    onUpdateDay({
      ...dayPlan,
      activities: updatedActivities,
    })
  }

  const deleteActivity = (activityId: string) => {
    const updatedActivities = dayPlan.activities.filter((activity) => activity.id !== activityId)

    onUpdateDay({
      ...dayPlan,
      activities: updatedActivities,
    })
  }

  const fixConflict = (conflict: TravelConflict, action: "adjust-time" | "change-transport") => {
    const activity = dayPlan.activities[conflict.nextActivityIndex]

    if (action === "adjust-time") {
      const currentActivity = dayPlan.activities[conflict.activityIndex]
      const currentEndTime = new Date(`2000-01-01T${currentActivity.endTime}:00`)
      const newStartTime = new Date(currentEndTime.getTime() + conflict.requiredTime * 60 * 1000)
      const newStartTimeString = newStartTime.toTimeString().slice(0, 5)

      updateActivity(activity.id, { startTime: newStartTimeString })
    } else if (action === "change-transport") {
      // Suggest faster transport mode
      const fasterMode = activity.transportMode === "bus" ? "car" : "plane"
      updateActivity(activity.id, { transportMode: fasterMode })
    }
  }

  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Day {dayNumber}</span>
            <Badge variant="outline">{new Date(dayPlan.date).toLocaleDateString("en-US", { weekday: "long" })}</Badge>
          </div>
          <Dialog open={isAddingActivity} onOpenChange={setIsAddingActivity}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-1" />
                Add Activity
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Activity</DialogTitle>
              </DialogHeader>
              <ActivityForm
                onSubmit={(activity) => {
                  addActivity(activity)
                  setIsAddingActivity(false)
                }}
                onCancel={() => setIsAddingActivity(false)}
              />
            </DialogContent>
          </Dialog>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {new Date(dayPlan.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        {conflicts.length > 0 && (
          <Alert className="border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <div className="space-y-2">
                <p className="font-medium">Travel Time Conflicts Detected</p>
                {conflicts.map((conflict, index) => {
                  const fromProvince = getProvinceById(conflict.fromProvince)
                  const toProvince = getProvinceById(conflict.toProvince)
                  return (
                    <div key={index} className="text-sm space-y-1">
                      <p>
                        Travel from {fromProvince?.name} to {toProvince?.name} requires{" "}
                        {Math.round(conflict.requiredTime)} minutes, but only {Math.round(conflict.availableTime)}{" "}
                        minutes available.
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => fixConflict(conflict, "adjust-time")}
                          className="h-6 text-xs"
                        >
                          Adjust Time
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => fixConflict(conflict, "change-transport")}
                          className="h-6 text-xs"
                        >
                          Faster Transport
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {dayPlan.activities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No activities planned for this day</p>
            <p className="text-sm">Click "Add Activity" to start planning</p>
          </div>
        ) : (
          dayPlan.activities.map((activity, index) => {
            const hasConflict = conflicts.some((c) => c.activityIndex === index || c.nextActivityIndex === index)
            const province = activity.provinceId ? getProvinceById(activity.provinceId) : null

            return (
              <div key={activity.id} className="group relative">
                <Card className={`hover:shadow-md transition-shadow ${hasConflict ? "border-amber-200" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                        <div className="w-px h-8 bg-border mt-2" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge className={getCategoryColor(activity.category)}>
                              {getCategoryIcon(activity.category)}
                              <span className="ml-1 capitalize">{activity.category}</span>
                            </Badge>
                            {province && (
                              <Badge className={getProvinceBadgeColor(activity.provinceId)}>{province.name}</Badge>
                            )}
                            <span className="text-sm text-muted-foreground">
                              {activity.startTime} - {activity.endTime}
                            </span>
                            {hasConflict && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingActivity(activity)}
                              className="h-6 w-6 p-0"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteActivity(activity.id)}
                              className="h-6 w-6 p-0"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <h4 className="font-medium mb-1">{activity.title}</h4>
                        {activity.description && (
                          <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                        )}

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {activity.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {activity.duration}h
                          </div>
                          {activity.transportMode && (
                            <div className="flex items-center gap-1">
                              {getTransportIcon(activity.transportMode)}
                              <span className="capitalize">{activity.transportMode}</span>
                            </div>
                          )}
                        </div>

                        {activity.notes && (
                          <div className="mt-2 p-2 bg-muted/50 rounded text-sm">
                            <strong>Notes:</strong> {activity.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {index < dayPlan.activities.length - 1 && (
                  <div className="flex items-center justify-center py-2">
                    {(() => {
                      const current = dayPlan.activities[index]
                      const next = dayPlan.activities[index + 1]
                      const isInterProvince =
                        current.provinceId && next.provinceId && current.provinceId !== next.provinceId
                      const travelTime = isInterProvince
                        ? getTravelTime(current.provinceId!, next.provinceId!, next.transportMode || "car")
                        : 15 // Default intra-province travel time

                      const conflict = conflicts.find((c) => c.activityIndex === index)

                      return (
                        <div
                          className={`flex items-center gap-2 text-xs px-2 py-1 rounded ${
                            conflict
                              ? "text-amber-700 bg-amber-100 border border-amber-200"
                              : isInterProvince
                                ? "text-blue-700 bg-blue-100 border border-blue-200"
                                : "text-muted-foreground bg-muted"
                          }`}
                        >
                          <Navigation className="h-3 w-3" />
                          <span>
                            {Math.round(travelTime)} min travel
                            {isInterProvince && " (inter-province)"}
                            {conflict && " ⚠️"}
                          </span>
                          {isInterProvince && !conflict && <CheckCircle className="h-3 w-3 text-green-600" />}
                        </div>
                      )
                    })()}
                  </div>
                )}
              </div>
            )
          })
        )}

        {/* Edit Activity Dialog */}
        {editingActivity && (
          <Dialog open={!!editingActivity} onOpenChange={() => setEditingActivity(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Activity</DialogTitle>
              </DialogHeader>
              <ActivityForm
                initialData={editingActivity}
                onSubmit={(updates) => {
                  updateActivity(editingActivity.id, updates)
                  setEditingActivity(null)
                }}
                onCancel={() => setEditingActivity(null)}
              />
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  )
}

// Activity Form Component
interface ActivityFormProps {
  initialData?: Activity
  onSubmit: (activity: Omit<Activity, "id">) => void
  onCancel: () => void
}

function ActivityForm({ initialData, onSubmit, onCancel }: ActivityFormProps) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [startTime, setStartTime] = useState(initialData?.startTime || "09:00")
  const [endTime, setEndTime] = useState(initialData?.endTime || "10:00")
  const [location, setLocation] = useState(initialData?.location || "")
  const [category, setCategory] = useState(initialData?.category || "attraction")
  const [duration, setDuration] = useState(initialData?.duration?.toString() || "1")
  const [notes, setNotes] = useState(initialData?.notes || "")
  const [transportMode, setTransportMode] = useState(initialData?.transportMode || "walking")
  const [provinceId, setProvinceId] = useState(initialData?.provinceId || "western")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title,
      description,
      startTime,
      endTime,
      location,
      category: category as Activity["category"],
      duration: Number.parseFloat(duration),
      notes,
      transportMode: transportMode as Activity["transportMode"],
      provinceId: provinceId || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Activity Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Visit Sigiriya Rock"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of the activity"
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Time</label>
          <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">End Time</label>
          <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Sigiriya, Dambulla"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Province</label>
          <Select value={provinceId} onValueChange={setProvinceId}>
            <SelectTrigger>
              <SelectValue placeholder="Select province" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="western">Western</SelectItem>
              <SelectItem value="southern">Southern</SelectItem>
              <SelectItem value="central">Central</SelectItem>
              {provinces.map((province) => (
                <SelectItem key={province.id} value={province.id}>
                  {province.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="attraction">Attraction</SelectItem>
              <SelectItem value="meal">Meal</SelectItem>
              <SelectItem value="transport">Transport</SelectItem>
              <SelectItem value="accommodation">Accommodation</SelectItem>
              <SelectItem value="activity">Activity</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Duration (hours)</label>
          <Input
            type="number"
            step="0.5"
            min="0.5"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Transport Mode</label>
        <Select value={transportMode} onValueChange={setTransportMode}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="walking">Walking</SelectItem>
            <SelectItem value="car">Car</SelectItem>
            <SelectItem value="bus">Bus</SelectItem>
            <SelectItem value="train">Train</SelectItem>
            <SelectItem value="plane">Plane</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Notes (Optional)</label>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any special notes or reminders"
          rows={2}
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
          Cancel
        </Button>
        <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
          {initialData ? "Update" : "Add"} Activity
        </Button>
      </div>
    </form>
  )
}
