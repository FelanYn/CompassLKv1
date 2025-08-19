"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { provinces } from "@/lib/provinces"

interface ProvinceFilterProps {
  selectedProvinces: string[]
  onProvinceChange: (provinces: string[]) => void
  className?: string
}

export function ProvinceFilter({ selectedProvinces, onProvinceChange, className }: ProvinceFilterProps) {
  const toggleProvince = (provinceId: string) => {
    if (selectedProvinces.includes(provinceId)) {
      onProvinceChange(selectedProvinces.filter((id) => id !== provinceId))
    } else {
      onProvinceChange([...selectedProvinces, provinceId])
    }
  }

  const clearAll = () => {
    onProvinceChange([])
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-sm font-medium text-muted-foreground">Provinces:</span>

      {provinces.map((province) => (
        <Badge
          key={province.id}
          variant={selectedProvinces.includes(province.id) ? "default" : "outline"}
          className="cursor-pointer hover:bg-primary/80 transition-colors"
          onClick={() => toggleProvince(province.id)}
        >
          {province.name}
        </Badge>
      ))}

      {selectedProvinces.length > 0 && (
        <Button variant="ghost" size="sm" onClick={clearAll} className="h-6 px-2 text-xs">
          <X className="h-3 w-3 mr-1" />
          Clear
        </Button>
      )}
    </div>
  )
}
