"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { provinces } from "@/lib/provinces"

interface ProvinceTimelineProps {
  provinceId?: string
  className?: string
}

export function ProvinceTimeline({ provinceId, className }: ProvinceTimelineProps) {
  const province = provinceId ? provinces.find((p) => p.id === provinceId) : null
  const displayProvinces = province ? [province] : provinces

  const getRatingColor = (rating: "best" | "okay" | "avoid") => {
    switch (rating) {
      case "best":
        return "bg-green-500"
      case "okay":
        return "bg-yellow-500"
      case "avoid":
        return "bg-red-500"
    }
  }

  const getRatingBadgeVariant = (rating: "best" | "okay" | "avoid") => {
    switch (rating) {
      case "best":
        return "default"
      case "okay":
        return "secondary"
      case "avoid":
        return "destructive"
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">
          {province ? `${province.name} Travel Seasons` : "Best Travel Seasons by Province"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {displayProvinces.map((prov) => (
          <div key={prov.id} className="space-y-3">
            {!province && <h3 className="font-semibold text-primary">{prov.name}</h3>}

            <div className="grid grid-cols-12 gap-1">
              {prov.seasonTimeline.map((month, index) => (
                <div key={index} className="text-center">
                  <div
                    className={`h-8 rounded-sm ${getRatingColor(month.rating)} mb-1`}
                    title={`${month.month}: ${month.description}`}
                  />
                  <span className="text-xs text-muted-foreground">{month.month}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-sm" />
                <span>Best</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-sm" />
                <span>Okay</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-sm" />
                <span>Avoid</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
