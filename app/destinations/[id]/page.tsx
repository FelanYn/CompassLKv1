"use client"

import { MainNavigation } from "@/components/navigation/main-nav"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Star,
  Clock,
  Phone,
  Globe,
  Camera,
  Heart,
  Share2,
  Plus,
  Navigation,
  Info,
  DollarSign,
} from "lucide-react"

// Mock destination data - in a real app, this would be fetched based on the ID
const mockDestination = {
  id: 1,
  name: "Sigiriya Rock Fortress",
  location: "Dambulla",
  province: "Central Province",
  rating: 4.8,
  reviews: 2847,
  duration: "3-4 hours",
  category: "Historical",
  images: [
    "/sigiriya-fortress.png",
    "/sigiriya-frescoes.png",
    "/sigiriya-summit-panoramic.png",
    "/sigiriya-water-gardens-ancient.png",
  ],
  description:
    "Sigiriya, also known as Lion Rock, is an ancient rock fortress located in the northern Matale District near the town of Dambulla in the Central Province of Sri Lanka. This UNESCO World Heritage Site is one of the best-preserved examples of ancient urban planning and is famous for its remarkable frescoes, mirror wall, and the remains of what was once a magnificent palace complex.",
  fullDescription: `Built during the reign of King Kashyapa (477-495 CE), Sigiriya served as both a royal palace and fortress. The site is renowned for its sophisticated urban planning, advanced hydraulic technology, and artistic achievements. The famous Sigiriya frescoes, painted on the western face of the rock, depict celestial maidens and are considered masterpieces of ancient Sri Lankan art.

The climb to the summit involves ascending through beautifully landscaped gardens, past ancient pools and fountains, and through the famous Lion Gate. The summit offers breathtaking panoramic views of the surrounding countryside and houses the ruins of the royal palace.

The site also features the famous Mirror Wall, originally polished so highly that the king could see himself as he walked alongside it. Over the centuries, visitors have inscribed poems and comments on this wall, creating a unique historical record.`,
  highlights: [
    "Ancient frescoes of celestial maidens",
    "Sophisticated water gardens and fountains",
    "Panoramic views from the summit",
    "Lion Gate entrance",
    "Mirror Wall with ancient graffiti",
    "Royal palace ruins",
  ],
  practicalInfo: {
    price: "$30 for foreigners, LKR 50 for locals",
    openHours: "7:00 AM - 5:30 PM (last entry at 4:30 PM)",
    bestTime: "Early morning (7-9 AM) or late afternoon (3-5 PM)",
    difficulty: "Moderate to challenging climb",
    facilities: ["Parking", "Restrooms", "Souvenir shop", "Guided tours"],
    tips: [
      "Wear comfortable walking shoes",
      "Bring water and sun protection",
      "Start early to avoid crowds and heat",
      "Allow 3-4 hours for the complete experience",
    ],
  },
  contact: {
    phone: "+94 66 228 4467",
    website: "www.sigiriya.lk",
    email: "info@sigiriya.lk",
  },
  coordinates: {
    lat: 7.957,
    lng: 80.7603,
  },
}

export default function DestinationDetailPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />

      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] overflow-hidden">
          <img
            src={mockDestination.images[0] || "/placeholder.svg"}
            alt={mockDestination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="container">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary/90 text-primary-foreground">{mockDestination.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{mockDestination.rating}</span>
                  <span className="text-white/80">({mockDestination.reviews} reviews)</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{mockDestination.name}</h1>
              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {mockDestination.location}, {mockDestination.province}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {mockDestination.duration}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Itinerary
                </Button>
                <Button variant="outline">
                  <Heart className="h-4 w-4 mr-2" />
                  Save to Favorites
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline">
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
              </div>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    About This Destination
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{mockDestination.description}</p>
                  <Separator />
                  <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                    {mockDestination.fullDescription}
                  </div>
                </CardContent>
              </Card>

              {/* Highlights */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {mockDestination.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-primary rounded-full" />
                        <span className="text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Image Gallery */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Photo Gallery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {mockDestination.images.slice(1).map((image, index) => (
                      <img
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={`${mockDestination.name} ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Practical Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Practical Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Entry Fee</h4>
                    <p className="text-sm text-muted-foreground">{mockDestination.practicalInfo.price}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Opening Hours</h4>
                    <p className="text-sm text-muted-foreground">{mockDestination.practicalInfo.openHours}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Best Time to Visit</h4>
                    <p className="text-sm text-muted-foreground">{mockDestination.practicalInfo.bestTime}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Difficulty Level</h4>
                    <p className="text-sm text-muted-foreground">{mockDestination.practicalInfo.difficulty}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{mockDestination.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{mockDestination.contact.website}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Facilities */}
              <Card>
                <CardHeader>
                  <CardTitle>Available Facilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockDestination.practicalInfo.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-green-500 rounded-full" />
                        <span className="text-sm">{facility}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card>
                <CardHeader>
                  <CardTitle>Visitor Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockDestination.practicalInfo.tips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm">{tip}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
