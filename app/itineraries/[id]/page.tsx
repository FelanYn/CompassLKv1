"use client"

import { useState } from "react"
import { MainNavigation } from "@/components/navigation/main-nav"
import { ItineraryDayPlanner } from "@/components/itinerary/itinerary-day-planner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapIntegration } from "@/components/map/map-integration"
import { Calendar, MapPin, Users, Clock, Share2, Download, Edit, Settings, Plane, Hotel } from "lucide-react"

// Mock itinerary data - in a real app, this would be fetched based on the ID
const mockItinerary = {
  id: "1",
  title: "Cultural Heritage Tour",
  description:
    "Explore ancient temples, historical sites, and traditional crafts across Sri Lanka's cultural triangle.",
  startDate: "2025-03-15",
  endDate: "2025-03-22",
  duration: 7,
  destinations: ["Kandy", "Sigiriya", "Polonnaruwa", "Dambulla"],
  travelers: 2,
  status: "confirmed" as const,
  travelStyle: "cultural",
  budget: "$1,200",
  lastModified: "2025-01-15",
  days: [
    {
      date: "2025-03-15",
      activities: [
        {
          id: "1",
          title: "Arrival in Colombo",
          description: "Land at Bandaranaike International Airport",
          startTime: "10:30",
          endTime: "11:30",
          location: "Colombo Airport",
          category: "transport" as const,
          duration: 1,
          transportMode: "plane" as const,
        },
        {
          id: "2",
          title: "Transfer to Kandy",
          description: "Private car transfer to Kandy",
          startTime: "12:00",
          endTime: "15:00",
          location: "Kandy",
          category: "transport" as const,
          duration: 3,
          transportMode: "car" as const,
        },
        {
          id: "3",
          title: "Check-in at Hotel",
          description: "Check-in at Earl's Regency Hotel",
          startTime: "15:30",
          endTime: "16:30",
          location: "Earl's Regency Hotel, Kandy",
          category: "accommodation" as const,
          duration: 1,
        },
        {
          id: "4",
          title: "Temple of the Tooth",
          description: "Visit the sacred Temple of the Tooth Relic",
          startTime: "17:00",
          endTime: "19:00",
          location: "Temple of the Tooth, Kandy",
          category: "attraction" as const,
          duration: 2,
          transportMode: "walking" as const,
        },
      ],
    },
    {
      date: "2025-03-16",
      activities: [
        {
          id: "5",
          title: "Royal Botanical Gardens",
          description: "Explore the beautiful botanical gardens",
          startTime: "09:00",
          endTime: "11:30",
          location: "Peradeniya Botanical Gardens",
          category: "attraction" as const,
          duration: 2.5,
          transportMode: "car" as const,
        },
        {
          id: "6",
          title: "Traditional Lunch",
          description: "Authentic Sri Lankan cuisine",
          startTime: "12:00",
          endTime: "13:00",
          location: "The Empire Cafe, Kandy",
          category: "meal" as const,
          duration: 1,
        },
        {
          id: "7",
          title: "Kandy Cultural Show",
          description: "Traditional Kandyan dance performance",
          startTime: "17:00",
          endTime: "18:00",
          location: "Kandy Cultural Centre",
          category: "activity" as const,
          duration: 1,
          transportMode: "walking" as const,
        },
      ],
    },
  ],
}

export default function ItineraryDetailPage() {
  const [itinerary, setItinerary] = useState(mockItinerary)
  const [activeTab, setActiveTab] = useState("timeline")

  const updateDay = (dayIndex: number, updatedDay: any) => {
    const updatedDays = [...itinerary.days]
    updatedDays[dayIndex] = updatedDay
    setItinerary({ ...itinerary, days: updatedDays })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />

      <main className="container py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={getStatusColor(itinerary.status)}>
                  {itinerary.status.charAt(0).toUpperCase() + itinerary.status.slice(1)}
                </Badge>
                <Badge variant="outline">
                  <Calendar className="h-3 w-3 mr-1" />
                  {itinerary.duration} days
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{itinerary.title}</h1>
              <p className="text-muted-foreground text-lg max-w-2xl">{itinerary.description}</p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Details
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Trip Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Calendar className="h-4 w-4" />
                  Duration
                </div>
                <div className="font-semibold">
                  {new Date(itinerary.startDate).toLocaleDateString()} -{" "}
                  {new Date(itinerary.endDate).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Users className="h-4 w-4" />
                  Travelers
                </div>
                <div className="font-semibold">{itinerary.travelers} people</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <MapPin className="h-4 w-4" />
                  Destinations
                </div>
                <div className="font-semibold">{itinerary.destinations.join(", ")}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Clock className="h-4 w-4" />
                  Style
                </div>
                <div className="font-semibold capitalize">{itinerary.travelStyle}</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-6 mt-6">
            {itinerary.days.map((day, index) => (
              <ItineraryDayPlanner
                key={day.date}
                dayPlan={day}
                dayNumber={index + 1}
                onUpdateDay={(updatedDay) => updateDay(index, updatedDay)}
              />
            ))}

            <div className="text-center py-8">
              <Button variant="outline" size="lg">
                <Calendar className="h-4 w-4 mr-2" />
                Add Another Day
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="map" className="mt-6">
            <MapIntegration
              title="Itinerary Route Map"
              height="h-96"
              locations={itinerary.days.flatMap((day) =>
                day.activities
                  .filter((activity) => activity.category === "attraction")
                  .map((activity) => ({
                    id: activity.id,
                    name: activity.title,
                    location: activity.location,
                  })),
              )}
              showAddButton={true}
            />
          </TabsContent>

          <TabsContent value="bookings" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plane className="h-5 w-5" />
                    Flights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Plane className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No flights booked yet</p>
                    <Button variant="outline" className="mt-2 bg-transparent">
                      Add Flight
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hotel className="h-5 w-5" />
                    Accommodations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Hotel className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No accommodations booked yet</p>
                    <Button variant="outline" className="mt-2 bg-transparent">
                      Add Hotel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Trip Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Edit className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No notes added yet</p>
                  <p className="text-sm">Add important information, reminders, or travel tips</p>
                  <Button variant="outline" className="mt-2 bg-transparent">
                    Add Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
