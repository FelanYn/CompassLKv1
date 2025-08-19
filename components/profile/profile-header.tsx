"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, MapPin, Calendar, Star, Edit, Share2, Settings } from "lucide-react"

interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  location: string
  joinDate: string
  totalTrips: number
  reviewsCount: number
  averageRating: number
  badges: string[]
  bio?: string
}

const mockProfile: UserProfile = {
  id: "1",
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  avatar: "/user-avatar.png",
  location: "New York, USA",
  joinDate: "March 2024",
  totalTrips: 12,
  reviewsCount: 28,
  averageRating: 4.8,
  badges: ["Explorer", "Reviewer", "Local Guide"],
  bio: "Travel enthusiast exploring the beautiful island of Sri Lanka. Love discovering hidden gems and sharing experiences with fellow travelers.",
}

interface ProfileHeaderProps {
  onEditProfile?: () => void
  onSettings?: () => void
}

export function ProfileHeader({ onEditProfile, onSettings }: ProfileHeaderProps) {
  const [profile, setProfile] = useState<UserProfile>(mockProfile)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card className="overflow-hidden bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col items-center md:items-start">
            <div className="relative group">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                  {getInitials(profile.name)}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="secondary"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center md:text-left mt-4">
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <div className="flex items-center gap-1 text-muted-foreground mt-1">
                <MapPin className="h-4 w-4" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground mt-1">
                <Calendar className="h-4 w-4" />
                <span>Joined {profile.joinDate}</span>
              </div>
            </div>
          </div>

          {/* Profile Stats and Bio */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.badges.map((badge) => (
                <Badge key={badge} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {badge}
                </Badge>
              ))}
            </div>

            {profile.bio && <p className="text-muted-foreground mb-4 leading-relaxed">{profile.bio}</p>}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{profile.totalTrips}</div>
                <div className="text-sm text-muted-foreground">Trips</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{profile.reviewsCount}</div>
                <div className="text-sm text-muted-foreground">Reviews</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl font-bold text-primary">{profile.averageRating}</span>
                </div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button onClick={onEditProfile} className="bg-primary hover:bg-primary/90">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" className="bg-transparent">
                <Share2 className="h-4 w-4 mr-2" />
                Share Profile
              </Button>
              <Button variant="outline" onClick={onSettings} className="bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
