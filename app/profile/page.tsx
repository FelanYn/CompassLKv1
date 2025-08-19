"use client"

import { useState } from "react"
import { MainNavigation } from "@/components/navigation/main-nav"
import { ProfileHeader } from "@/components/profile/profile-header"
import { TravelPreferences } from "@/components/profile/travel-preferences"
import { SavedItems } from "@/components/profile/saved-items"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Heart,
  Bookmark,
  Star,
  MessageSquare,
  Settings,
  Bell,
  Shield,
  CreditCard,
  HelpCircle,
} from "lucide-react"

const recentReviews = [
  {
    id: "1",
    destination: "Sigiriya Rock Fortress",
    rating: 5,
    comment: "Absolutely breathtaking! The climb is challenging but the views are worth every step.",
    date: "2024-01-20",
    helpful: 12,
  },
  {
    id: "2",
    destination: "Temple of the Tooth",
    rating: 5,
    comment: "A deeply spiritual experience. The architecture and history are incredible.",
    date: "2024-01-18",
    helpful: 8,
  },
  {
    id: "3",
    destination: "Galle Fort",
    rating: 4,
    comment: "Beautiful colonial architecture and great for sunset walks along the ramparts.",
    date: "2024-01-15",
    helpful: 15,
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />

      <main className="container py-8">
        {/* Profile Header */}
        <div className="mb-8 animate-fade-in-up">
          <ProfileHeader />
        </div>

        {/* Profile Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="saved">Saved Items</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Recent Reviews
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentReviews.map((review) => (
                      <div key={review.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{review.destination}</h4>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{new Date(review.date).toLocaleDateString()}</span>
                          <span>{review.helpful} people found this helpful</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Bookmark className="h-4 w-4 mr-2" />
                      View Saved Places
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Heart className="h-4 w-4 mr-2" />
                      Update Preferences
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Write a Review
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Achievements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Star className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <div className="font-medium">Top Reviewer</div>
                        <div className="text-sm text-muted-foreground">25+ helpful reviews</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">Explorer</div>
                        <div className="text-sm text-muted-foreground">Visited 10+ destinations</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <TravelPreferences />
          </TabsContent>

          <TabsContent value="saved" className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <SavedItems />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Email Notifications</div>
                      <div className="text-sm text-muted-foreground">Receive updates via email</div>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Configure
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Weather Alerts</div>
                      <div className="text-sm text-muted-foreground">Get weather warnings</div>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Privacy & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Profile Visibility</div>
                      <div className="text-sm text-muted-foreground">Control who can see your profile</div>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Manage
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Data & Privacy</div>
                      <div className="text-sm text-muted-foreground">Download or delete your data</div>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Billing & Payments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Payment Methods</div>
                      <div className="text-sm text-muted-foreground">Manage your payment options</div>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Manage
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Booking History</div>
                      <div className="text-sm text-muted-foreground">View past transactions</div>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Help Center</div>
                      <div className="text-sm text-muted-foreground">Find answers to common questions</div>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Visit
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Contact Support</div>
                      <div className="text-sm text-muted-foreground">Get help from our team</div>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
