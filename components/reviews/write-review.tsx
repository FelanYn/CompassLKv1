"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Star, Upload, X, Send } from "lucide-react"

interface WriteReviewProps {
  destination?: string
  onSubmit?: (review: any) => void
  onCancel?: () => void
}

export function WriteReview({ destination, onSubmit, onCancel }: WriteReviewProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [visitDate, setVisitDate] = useState("")
  const [travelType, setTravelType] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRatingClick = (value: number) => {
    setRating(value)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      // In a real app, you would upload these files and get URLs
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setImages((prev) => [...prev, ...newImages].slice(0, 5)) // Max 5 images
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0 || !title.trim() || !content.trim()) return

    setIsSubmitting(true)

    const reviewData = {
      rating,
      title: title.trim(),
      content: content.trim(),
      visitDate,
      travelType,
      images,
      destination,
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onSubmit?.(reviewData)
    setIsSubmitting(false)
  }

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1:
        return "Terrible"
      case 2:
        return "Poor"
      case 3:
        return "Average"
      case 4:
        return "Very Good"
      case 5:
        return "Excellent"
      default:
        return "Rate your experience"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Write a Review
          {destination && <Badge variant="outline">{destination}</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div className="space-y-2">
            <Label>Overall Rating</Label>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    className="focus:outline-none"
                    onMouseEnter={() => setHoverRating(value)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleRatingClick(value)}
                  >
                    <Star
                      className={`h-8 w-8 transition-colors ${
                        value <= (hoverRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 hover:text-yellow-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-sm text-muted-foreground ml-2">{getRatingText(hoverRating || rating)}</span>
            </div>
          </div>

          {/* Review Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Review Title</Label>
            <Input
              id="title"
              placeholder="Summarize your experience in a few words"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
            />
            <div className="text-xs text-muted-foreground text-right">{title.length}/100</div>
          </div>

          {/* Review Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Your Review</Label>
            <Textarea
              id="content"
              placeholder="Tell others about your experience. What did you like? What could be improved?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              maxLength={1000}
            />
            <div className="text-xs text-muted-foreground text-right">{content.length}/1000</div>
          </div>

          {/* Visit Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="visitDate">Visit Date</Label>
              <Input id="visitDate" type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Travel Type</Label>
              <Select value={travelType} onValueChange={setTravelType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select travel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solo">Solo Travel</SelectItem>
                  <SelectItem value="couple">Couple</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="friends">Friends</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label>Add Photos (Optional)</Label>
            <div className="space-y-3">
              {images.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Upload ${index + 1}`}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              {images.length < 5 && (
                <div>
                  <input
                    type="file"
                    id="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("images")?.click()}
                    className="bg-transparent"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photos ({images.length}/5)
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} className="bg-transparent">
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={rating === 0 || !title.trim() || !content.trim() || isSubmitting}
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Review
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
