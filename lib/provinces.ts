export interface Province {
  id: string
  name: string
  slug: string
  districts: string[]
  coordinates: [number, number]
  seasonTimeline: {
    month: string
    rating: "best" | "okay" | "avoid"
    description: string
  }[]
  description: string
  highlights: string[]
}

export interface District {
  id: string
  name: string
  provinceId: string
  places: string[]
}

export interface Place {
  id: string
  name: string
  type: "attraction" | "hotel" | "activity" | "transport"
  provinceId: string
  districtId: string
  coordinates: [number, number]
  tags: string[]
  rating: number
  description: string
  image: string
}

export const provinces: Province[] = [
  {
    id: "western",
    name: "Western Province",
    slug: "western",
    districts: ["Colombo", "Gampaha", "Kalutara"],
    coordinates: [6.9271, 79.8612],
    description: "The commercial capital and gateway to Sri Lanka",
    highlights: ["Colombo National Museum", "Galle Face Green", "Mount Lavinia Beach"],
    seasonTimeline: [
      { month: "Jan", rating: "best", description: "Dry and pleasant" },
      { month: "Feb", rating: "best", description: "Perfect weather" },
      { month: "Mar", rating: "okay", description: "Getting warmer" },
      { month: "Apr", rating: "avoid", description: "Hot and humid" },
      { month: "May", rating: "avoid", description: "Monsoon begins" },
      { month: "Jun", rating: "avoid", description: "Heavy rains" },
      { month: "Jul", rating: "okay", description: "Rains reducing" },
      { month: "Aug", rating: "okay", description: "Intermittent showers" },
      { month: "Sep", rating: "okay", description: "Transitional period" },
      { month: "Oct", rating: "avoid", description: "Second monsoon" },
      { month: "Nov", rating: "okay", description: "Weather improving" },
      { month: "Dec", rating: "best", description: "Cool and dry" },
    ],
  },
  {
    id: "southern",
    name: "Southern Province",
    slug: "southern",
    districts: ["Galle", "Matara", "Hambantota"],
    coordinates: [6.0535, 80.221],
    description: "Historic coastal region with pristine beaches",
    highlights: ["Galle Fort", "Unawatuna Beach", "Hummanaya Blowhole"],
    seasonTimeline: [
      { month: "Jan", rating: "best", description: "Perfect beach weather" },
      { month: "Feb", rating: "best", description: "Ideal conditions" },
      { month: "Mar", rating: "best", description: "Warm and sunny" },
      { month: "Apr", rating: "okay", description: "Getting hot" },
      { month: "May", rating: "avoid", description: "Monsoon season" },
      { month: "Jun", rating: "avoid", description: "Heavy rains" },
      { month: "Jul", rating: "avoid", description: "Continued rains" },
      { month: "Aug", rating: "okay", description: "Weather improving" },
      { month: "Sep", rating: "okay", description: "Occasional showers" },
      { month: "Oct", rating: "avoid", description: "Second monsoon" },
      { month: "Nov", rating: "okay", description: "Transitional" },
      { month: "Dec", rating: "best", description: "Excellent weather" },
    ],
  },
  {
    id: "central",
    name: "Central Province",
    slug: "central",
    districts: ["Kandy", "Matale", "Nuwara Eliya"],
    coordinates: [7.2906, 80.6337],
    description: "Cultural heart with tea plantations and cool climate",
    highlights: ["Temple of the Tooth", "Peradeniya Botanical Gardens", "Horton Plains"],
    seasonTimeline: [
      { month: "Jan", rating: "best", description: "Cool and clear" },
      { month: "Feb", rating: "best", description: "Perfect weather" },
      { month: "Mar", rating: "best", description: "Ideal conditions" },
      { month: "Apr", rating: "okay", description: "Warm days" },
      { month: "May", rating: "avoid", description: "Rainy season" },
      { month: "Jun", rating: "avoid", description: "Heavy rains" },
      { month: "Jul", rating: "okay", description: "Clearing up" },
      { month: "Aug", rating: "okay", description: "Pleasant weather" },
      { month: "Sep", rating: "okay", description: "Good conditions" },
      { month: "Oct", rating: "avoid", description: "Monsoon rains" },
      { month: "Nov", rating: "okay", description: "Weather improving" },
      { month: "Dec", rating: "best", description: "Cool and dry" },
    ],
  },
]

export const samplePlaces: Place[] = [
  // Western Province
  {
    id: "colombo-museum",
    name: "Colombo National Museum",
    type: "attraction",
    provinceId: "western",
    districtId: "colombo",
    coordinates: [6.9147, 79.8612],
    tags: ["history", "culture", "museum"],
    rating: 4.2,
    description: "The largest museum in Sri Lanka with extensive collections",
    image: "/colombo-museum.png",
  },
  {
    id: "galle-face-green",
    name: "Galle Face Green",
    type: "attraction",
    provinceId: "western",
    districtId: "colombo",
    coordinates: [6.9271, 79.8456],
    tags: ["recreation", "sunset", "family"],
    rating: 4.0,
    description: "Historic ocean-side urban park in the heart of Colombo",
    image: "/galle-face-green.png",
  },
  // Southern Province
  {
    id: "galle-fort",
    name: "Galle Fort",
    type: "attraction",
    provinceId: "southern",
    districtId: "galle",
    coordinates: [6.0215, 80.2168],
    tags: ["history", "unesco", "architecture"],
    rating: 4.6,
    description: "UNESCO World Heritage Site and historic fortified city",
    image: "/galle-fort-lighthouse.png",
  },
  {
    id: "unawatuna-beach",
    name: "Unawatuna Beach",
    type: "attraction",
    provinceId: "southern",
    districtId: "galle",
    coordinates: [6.0108, 80.2492],
    tags: ["beach", "swimming", "relaxation"],
    rating: 4.4,
    description: "Beautiful crescent-shaped beach with calm waters",
    image: "/unawatuna-beach.png",
  },
  // Central Province
  {
    id: "temple-tooth",
    name: "Temple of the Tooth",
    type: "attraction",
    provinceId: "central",
    districtId: "kandy",
    coordinates: [7.294, 80.6414],
    tags: ["religious", "buddhist", "unesco"],
    rating: 4.7,
    description: "Sacred Buddhist temple housing a tooth relic of Buddha",
    image: "/temple-of-tooth.png",
  },
  {
    id: "peradeniya-gardens",
    name: "Peradeniya Botanical Gardens",
    type: "attraction",
    provinceId: "central",
    districtId: "kandy",
    coordinates: [7.2694, 80.5967],
    tags: ["nature", "gardens", "family"],
    rating: 4.5,
    description: "Magnificent botanical gardens with diverse plant collections",
    image: "/peradeniya-gardens.png",
  },
]

// Travel time matrix between provinces (in minutes) by transport mode
export const interProvinceTravelTimes = {
  "western-southern": {
    car: 120,
    bus: 180,
    "tuk-tuk": 150,
    walk: 1440, // 24 hours - not practical
  },
  "western-central": {
    car: 90,
    bus: 120,
    "tuk-tuk": 110,
    walk: 720, // 12 hours - not practical
  },
  "southern-central": {
    car: 150,
    bus: 210,
    "tuk-tuk": 180,
    walk: 1080, // 18 hours - not practical
  },
}

export function getTravelTime(fromProvince: string, toProvince: string, mode: string): number {
  const key = [fromProvince, toProvince].sort().join("-")
  return (
    interProvinceTravelTimes[key as keyof typeof interProvinceTravelTimes]?.[
      mode as keyof (typeof interProvinceTravelTimes)["western-southern"]
    ] || 0
  )
}

export function getProvinceById(id: string): Province | undefined {
  return provinces.find((p) => p.id === id)
}

export function getPlacesByProvince(provinceId: string): Place[] {
  return samplePlaces.filter((p) => p.provinceId === provinceId)
}
