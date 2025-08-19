"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ThumbsUp, ThumbsDown, Flag, MoreHorizontal, Calendar, MapPin } from "lucide-react"

interface Review {
  id: string
  user: {
    name: string
    avatar?: string
    location: string
    reviewCount: number
    isVerified: boolean
  }
  destination: string
  rating: number
  title: string
  content: string
  date: string
  helpful: number
  notHelpful: number
  images?: string[]
  visitDate?: string
  travelType: string
  verified: boolean
}

interface ReviewCardProps {
  review: Review
  onHelpful?: (reviewId: string) => void
  onNotHelpful?: (reviewId: string) => void
  onReport?: (reviewId: string) => void
}

export function ReviewCard({ review, onHelpful, onNotHelpful, onReport }: ReviewCardProps) {
  const [userVote, setUserVote] = useState<"helpful" | "not-helpful" | null>(null)
  const [showFullContent, setShowFullContent] = useState(false)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleHelpful = () => {
    if (userVote === "helpful") return
    setUserVote("helpful")
    onHelpful?.(review.id)
  }

  const handleNotHelpful = () => {
    if (userVote === "not-helpful") return
    setUserVote("not-helpful")
    onNotHelpful?.(review.id)
  }

  const isLongContent = review.content.length > 300

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        {/* Review Header */}
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={review.user.avatar || "/placeholder.svg"} alt={review.user.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {getInitials(review.user.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold">{review.user.name}</h4>
              {review.user.isVerified && (
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 border-green-200">
                  Verified
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{review.user.location}</span>
              </div>
              <span>{review.user.reviewCount} reviews</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Review Content */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">{review.title}</h3>
          <p className="text-muted-foreground leading-relaxed">
            {isLongContent && !showFullContent ? `${review.content.slice(0, 300)}...` : review.content}
            {isLongContent && (
              <Button
                variant="link"
                className="p-0 h-auto font-normal text-primary"
                onClick={() => setShowFullContent(!showFullContent)}
              >
                {showFullContent ? " Show less" : " Read more"}
              </Button>
            )}
          </p>
        </div>

        {/* Review Images */}
        {review.images && review.images.length > 0 && (
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {review.images.map((image, index) => (
              <img
                key={index}
                src={image || "/placeholder.svg?height=80&width=80"}
                alt={`Review image ${index + 1}`}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
              />
            ))}
          </div>
        )}

        {/* Review Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Reviewed {new Date(review.date).toLocaleDateString()}</span>
          </div>
          {review.visitDate && <span>Visited {new Date(review.visitDate).toLocaleDateString()}</span>}
          <Badge variant="outline" className="text-xs">
            {review.travelType}
          </Badge>
          {review.verified && (
            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 border-blue-200">
              Verified Stay
            </Badge>
          )}
        </div>

        {/* Review Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleHelpful}
              className={`h-8 ${userVote === "helpful" ? "text-green-600 bg-green-50" : ""}`}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              Helpful ({review.helpful})
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNotHelpful}
              className={`h-8 ${userVote === "not-helpful" ? "text-red-600 bg-red-50" : ""}`}
            >
              <ThumbsDown className="h-4 w-4 mr-1" />({review.notHelpful})
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onReport?.(review.id)} className="h-8 text-muted-foreground">
            <Flag className="h-4 w-4 mr-1" />
            Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
