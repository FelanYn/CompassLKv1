"use client"

import { useState } from "react"
import { MainNavigation } from "@/components/navigation/main-nav"
import { ItineraryCard } from "@/components/itinerary/itinerary-card"
import { CreateItineraryDialog } from "@/components/itinerary/create-itinerary-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Plus, Search, Filter } from "lucide-react"

// Mock data - in a real app, this would come from an API
const mockItineraries = [
  {
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
    image: "/kandy-temple.png",
    lastModified: "2025-01-15",
  },
  {
    id: "2",
    title: "Beach & Wildlife Adventure",
    description: "Perfect combination of pristine beaches and exciting wildlife safaris in southern Sri Lanka.",
    startDate: "2025-04-10",
    endDate: "2025-04-17",
    duration: 7,
    destinations: ["Mirissa", "Yala", "Galle", "Unawatuna"],
    travelers: 4,
    status: "draft" as const,
    image: "/yala-national-park.png",
    lastModified: "2025-01-18",
  },
  {
    id: "3",
    title: "Hill Country Escape",
    description: "Experience the cool climate, tea plantations, and scenic train rides of Sri Lanka's hill country.",
    startDate: "2024-12-20",
    endDate: "2024-12-27",
    duration: 7,
    destinations: ["Nuwara Eliya", "Ella", "Kandy", "Hatton"],
    travelers: 2,
    status: "completed" as const,
    image: "/sri-lankan-temple-sunset.png",
    lastModified: "2024-12-28",
  },
]

export default function ItinerariesPage() {
  const [itineraries, setItineraries] = useState(mockItineraries)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const filteredItineraries = itineraries
    .filter((itinerary) => {
      const matchesSearch =
        itinerary.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        itinerary.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        itinerary.destinations.some((dest) => dest.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesStatus = statusFilter === "all" || itinerary.status === statusFilter

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
        case "startDate":
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  const handleCreateItinerary = (newItinerary: any) => {
    setItineraries((prev) => [newItinerary, ...prev])
  }

  const handleEditItinerary = (itinerary: any) => {
    // In a real app, this would open an edit dialog or navigate to edit page
    console.log("Edit itinerary:", itinerary.title)
  }

  const handleDeleteItinerary = (itinerary: any) => {
    // In a real app, this would show a confirmation dialog
    setItineraries((prev) => prev.filter((item) => item.id !== itinerary.id))
  }

  const handleShareItinerary = (itinerary: any) => {
    // In a real app, this would open a share dialog
    console.log("Share itinerary:", itinerary.title)
  }

  const getStatusCount = (status: string) => {
    if (status === "all") return itineraries.length
    return itineraries.filter((item) => item.status === status).length
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />

      <main className="container py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 animate-fade-in-up">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">
                <Calendar className="h-3 w-3 mr-1" />
                My Trips
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Travel Itineraries</h1>
            <p className="text-muted-foreground text-lg">Plan, organize, and manage your Sri Lankan adventures</p>
          </div>

          <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Trip
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search itineraries, destinations, or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status ({getStatusCount("all")})</SelectItem>
                <SelectItem value="draft">Draft ({getStatusCount("draft")})</SelectItem>
                <SelectItem value="confirmed">Confirmed ({getStatusCount("confirmed")})</SelectItem>
                <SelectItem value="completed">Completed ({getStatusCount("completed")})</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="startDate">Start Date</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Itineraries Grid */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          {filteredItineraries.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-xl font-semibold mb-2">
                {searchQuery || statusFilter !== "all" ? "No itineraries found" : "No itineraries yet"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Create your first itinerary to start planning your Sri Lankan adventure"}
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Trip
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItineraries.map((itinerary, index) => (
                <div key={itinerary.id} className="animate-fade-in-up" style={{ animationDelay: `${0.1 * index}s` }}>
                  <ItineraryCard
                    itinerary={itinerary}
                    onEdit={handleEditItinerary}
                    onDelete={handleDeleteItinerary}
                    onShare={handleShareItinerary}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create Itinerary Dialog */}
        <CreateItineraryDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onCreateItinerary={handleCreateItinerary}
        />
      </main>
    </div>
  )
}
