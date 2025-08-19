"use client"

import { useState } from "react"
import { MainNavigation } from "@/components/navigation/main-nav"
import { ReviewCard } from "@/components/reviews/review-card"
import { WriteReview } from "@/components/reviews/write-review"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Search, Plus, MessageSquare, TrendingUp } from "lucide-react"

const mockReviews = [
  {
    id: "1",
    user: {
      name: "Sarah Johnson",
      avatar: "/user-avatar.png",
      location: "New York, USA",
      reviewCount: 28,
      isVerified: true,
    },
    destination: "Sigiriya Rock Fortress",
    rating: 5,
    title: "Absolutely breathtaking experience!",
    content:
      "The climb to the top of Sigiriya is challenging but incredibly rewarding. The ancient frescoes are stunning and the panoramic views from the summit are unforgettable. I recommend starting early in the morning to avoid crowds and heat. The guide was knowledgeable and shared fascinating historical details about this UNESCO World Heritage site.",
    date: "2024-01-20",
    helpful: 24,
    notHelpful: 2,
    images: ["/sigiriya-summit-panoramic.png", "/sigiriya-frescoes.png"],
    visitDate: "2024-01-15",
    travelType: "Couple",
    verified: true,
  },
  {
    id: "2",
    user: {
      name: "Michael Chen",
      location: "Toronto, Canada",
      reviewCount: 15,
      isVerified: true,
    },
    destination: "Temple of the Tooth",
    rating: 5,
    title: "Deeply spiritual and culturally enriching",
    content:
      "This sacred Buddhist temple is a must-visit in Kandy. The architecture is magnificent and the atmosphere is deeply spiritual. I was fortunate to witness the evening puja ceremony, which was a moving experience. The temple houses the tooth relic of Buddha and is considered one of the most sacred places in Buddhism.",
    date: "2024-01-18",
    helpful: 18,
    notHelpful: 1,
    visitDate: "2024-01-12",
    travelType: "Solo Travel",
    verified: true,
  },
  {
    id: "3",
    user: {
      name: "Emma Wilson",
      location: "London, UK",
      reviewCount: 42,
      isVerified: true,
    },
    destination: "Galle Fort",
    rating: 4,
    title: "Beautiful colonial architecture and sunset views",
    content:
      "Galle Fort is a charming blend of European colonial architecture and South Asian traditions. Walking along the ramparts during sunset is magical. The fort has many boutique shops, cafes, and art galleries. However, it can get quite crowded during peak tourist season.",
    date: "2024-01-15",
    helpful: 31,
    notHelpful: 3,
    images: ["/galle-fort-lighthouse.png"],
    visitDate: "2024-01-10",
    travelType: "Family",
    verified: true,
  },
]

const topDestinations = [
  { name: "Sigiriya Rock Fortress", reviews: 1247, rating: 4.8 },
  { name: "Temple of the Tooth", reviews: 892, rating: 4.9 },
  { name: "Galle Fort", reviews: 756, rating: 4.7 },
  { name: "Yala National Park", reviews: 634, rating: 4.6 },
  { name: "Nuwara Eliya", reviews: 523, rating: 4.5 },
]

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(mockReviews)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filterRating, setFilterRating] = useState("all")
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [activeTab, setActiveTab] = useState("all-reviews")

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      searchQuery === "" ||
      review.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRating = filterRating === "all" || review.rating === Number.parseInt(filterRating)

    return matchesSearch && matchesRating
  })

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "highest-rated":
        return b.rating - a.rating
      case "lowest-rated":
        return a.rating - b.rating
      case "most-helpful":
        return b.helpful - a.helpful
      default:
        return 0
    }
  })

  const handleSubmitReview = (reviewData: any) => {
    const newReview = {
      id: Date.now().toString(),
      user: {
        name: "You",
        location: "Your Location",
        reviewCount: 1,
        isVerified: false,
      },
      destination: reviewData.destination || "Selected Destination",
      rating: reviewData.rating,
      title: reviewData.title,
      content: reviewData.content,
      date: new Date().toISOString(),
      helpful: 0,
      notHelpful: 0,
      images: reviewData.images,
      visitDate: reviewData.visitDate,
      travelType: reviewData.travelType,
      verified: false,
    }

    setReviews((prev) => [newReview, ...prev])
    setShowWriteReview(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />

      <main className="container py-8">
        {/* Page Header */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">
              <MessageSquare className="h-3 w-3 mr-1" />
              Reviews & Ratings
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Traveler Reviews</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Read authentic reviews from fellow travelers and share your own experiences to help others discover Sri
            Lanka
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="all-reviews">All Reviews</TabsTrigger>
                <TabsTrigger value="write-review">Write Review</TabsTrigger>
              </TabsList>

              <TabsContent value="all-reviews" className="space-y-6 mt-6">
                {/* Search and Filters */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search reviews by destination or content..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full md:w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="oldest">Oldest First</SelectItem>
                          <SelectItem value="highest-rated">Highest Rated</SelectItem>
                          <SelectItem value="lowest-rated">Lowest Rated</SelectItem>
                          <SelectItem value="most-helpful">Most Helpful</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={filterRating} onValueChange={setFilterRating}>
                        <SelectTrigger className="w-full md:w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Ratings</SelectItem>
                          <SelectItem value="5">5 Stars</SelectItem>
                          <SelectItem value="4">4 Stars</SelectItem>
                          <SelectItem value="3">3 Stars</SelectItem>
                          <SelectItem value="2">2 Stars</SelectItem>
                          <SelectItem value="1">1 Star</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Reviews List */}
                <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  {sortedReviews.length === 0 ? (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No reviews found</h3>
                        <p className="text-muted-foreground text-center mb-4">
                          Try adjusting your search or filters to find more reviews
                        </p>
                        <Button onClick={() => setActiveTab("write-review")} className="bg-primary hover:bg-primary/90">
                          <Plus className="h-4 w-4 mr-2" />
                          Write the First Review
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    sortedReviews.map((review) => <ReviewCard key={review.id} review={review} />)
                  )}
                </div>
              </TabsContent>

              <TabsContent value="write-review" className="mt-6">
                <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  <WriteReview onSubmit={handleSubmitReview} />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Review Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">4.8</div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">Based on 3,052 reviews</div>
                </div>

                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-2">
                      <span className="text-sm w-8">{rating}★</span>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{
                            width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-8">
                        {rating === 5 ? "70%" : rating === 4 ? "20%" : rating === 3 ? "7%" : rating === 2 ? "2%" : "1%"}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Destinations */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Most Reviewed
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topDestinations.map((destination, index) => (
                  <div key={destination.name} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm line-clamp-1">{destination.name}</div>
                      <div className="text-xs text-muted-foreground">{destination.reviews} reviews</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{destination.rating}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Write Review CTA */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 text-center">
                <MessageSquare className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Share Your Experience</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Help fellow travelers by writing about your Sri Lankan adventures
                </p>
                <Button onClick={() => setActiveTab("write-review")} className="w-full bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Write Review
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
