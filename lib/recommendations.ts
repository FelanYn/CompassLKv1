import { samplePlaces, getProvinceById, type Place } from "./provinces"
import { getRecommendedTransport } from "./travel-times"

export interface RecommendationCriteria {
  currentProvinceId: string
  interests?: string[]
  travelStyle?: "budget" | "comfort" | "luxury"
  duration?: "half-day" | "full-day" | "multi-day"
  groupSize?: number
  season?: "dry" | "wet" | "peak" | "off-peak"
}

export interface Recommendation {
  id: string
  place: Place
  score: number
  reasons: string[]
  travelTime?: {
    duration: number
    transport: string
    cost: string
  }
  bestTimeToVisit: string
  estimatedDuration: string
  difficulty: "easy" | "moderate" | "challenging"
  crowdLevel: "low" | "medium" | "high"
  tags: string[]
}

export interface RecommendationGroup {
  title: string
  description: string
  recommendations: Recommendation[]
  type: "same-province" | "nearby-province" | "cross-province" | "seasonal" | "interest-based"
}

const interestKeywords = {
  nature: ["beach", "mountain", "forest", "wildlife", "garden", "park", "waterfall"],
  culture: ["temple", "museum", "fort", "heritage", "traditional", "festival", "art"],
  adventure: ["hiking", "climbing", "safari", "water sports", "trekking", "diving"],
  history: ["ancient", "colonial", "archaeological", "monument", "ruins", "heritage"],
  relaxation: ["spa", "beach", "resort", "peaceful", "quiet", "meditation"],
  food: ["restaurant", "market", "street food", "local cuisine", "cooking", "tea"],
}

function calculateRecommendationScore(
  place: Place,
  criteria: RecommendationCriteria,
): { score: number; reasons: string[] } {
  let score = 0
  const reasons: string[] = []

  // Base score for all places
  score += place.rating * 10

  // Same province bonus
  if (place.provinceId === criteria.currentProvinceId) {
    score += 30
    reasons.push("In your current province")
  }

  // Interest matching
  if (criteria.interests && criteria.interests.length > 0) {
    for (const interest of criteria.interests) {
      const keywords = interestKeywords[interest as keyof typeof interestKeywords] || []
      const matchingKeywords = keywords.filter(
        (keyword) =>
          place.description.toLowerCase().includes(keyword) ||
          place.category.toLowerCase().includes(keyword) ||
          place.name.toLowerCase().includes(keyword),
      )

      if (matchingKeywords.length > 0) {
        score += matchingKeywords.length * 15
        reasons.push(`Matches your interest in ${interest}`)
      }
    }
  }

  // Travel style considerations
  if (criteria.travelStyle) {
    switch (criteria.travelStyle) {
      case "budget":
        if (place.category.includes("free") || place.category.includes("budget")) {
          score += 10
          reasons.push("Budget-friendly option")
        }
        break
      case "luxury":
        if (place.rating >= 4.5) {
          score += 15
          reasons.push("High-rated premium experience")
        }
        break
      case "comfort":
        if (place.rating >= 4.0) {
          score += 10
          reasons.push("Well-rated comfortable experience")
        }
        break
    }
  }

  // Duration matching
  if (criteria.duration) {
    switch (criteria.duration) {
      case "half-day":
        if (place.category.includes("temple") || place.category.includes("museum")) {
          score += 10
          reasons.push("Perfect for half-day visit")
        }
        break
      case "full-day":
        if (place.category.includes("park") || place.category.includes("beach")) {
          score += 10
          reasons.push("Great for full-day exploration")
        }
        break
      case "multi-day":
        if (place.category.includes("national park") || place.category.includes("mountain")) {
          score += 15
          reasons.push("Ideal for multi-day adventure")
        }
        break
    }
  }

  // Seasonal considerations
  if (criteria.season) {
    switch (criteria.season) {
      case "dry":
        if (place.category.includes("beach") || place.category.includes("outdoor")) {
          score += 10
          reasons.push("Perfect weather for outdoor activities")
        }
        break
      case "wet":
        if (
          place.category.includes("temple") ||
          place.category.includes("museum") ||
          place.category.includes("indoor")
        ) {
          score += 10
          reasons.push("Great indoor option during rainy season")
        }
        break
    }
  }

  // Popularity bonus for highly rated places
  if (place.rating >= 4.5) {
    score += 10
    reasons.push("Highly rated by visitors")
  }

  return { score, reasons }
}

function getPlaceRecommendation(place: Place, criteria: RecommendationCriteria): Recommendation {
  const { score, reasons } = calculateRecommendationScore(place, criteria)

  // Calculate travel time if different province
  let travelTime
  if (place.provinceId !== criteria.currentProvinceId) {
    const recommendedTransport = getRecommendedTransport(criteria.currentProvinceId, place.provinceId)
    if (recommendedTransport) {
      travelTime = {
        duration: recommendedTransport.duration,
        transport: recommendedTransport.transportMode,
        cost: `LKR ${recommendedTransport.cost.min}-${recommendedTransport.cost.max}`,
      }
    }
  }

  // Determine visit characteristics
  const bestTimeToVisit = place.category.includes("beach")
    ? "Early morning or late afternoon"
    : place.category.includes("temple")
      ? "Early morning for peaceful experience"
      : "Anytime during daylight hours"

  const estimatedDuration = place.category.includes("national park")
    ? "Full day"
    : place.category.includes("museum") || place.category.includes("temple")
      ? "2-3 hours"
      : "Half day"

  const difficulty =
    place.category.includes("mountain") || place.category.includes("trek")
      ? "challenging"
      : place.category.includes("beach") || place.category.includes("garden")
        ? "easy"
        : "moderate"

  const crowdLevel = place.rating >= 4.7 ? "high" : place.rating >= 4.3 ? "medium" : "low"

  const tags = [
    place.category,
    ...(place.provinceId === criteria.currentProvinceId ? ["same-province"] : ["cross-province"]),
    ...(place.rating >= 4.5 ? ["highly-rated"] : []),
    ...(travelTime ? [`${travelTime.duration}min-travel`] : ["nearby"]),
  ]

  return {
    id: place.id,
    place,
    score,
    reasons,
    travelTime,
    bestTimeToVisit,
    estimatedDuration,
    difficulty,
    crowdLevel,
    tags,
  }
}

export function generateRecommendations(criteria: RecommendationCriteria): RecommendationGroup[] {
  const allRecommendations = samplePlaces
    .map((place) => getPlaceRecommendation(place, criteria))
    .sort((a, b) => b.score - a.score)

  const groups: RecommendationGroup[] = []

  // Same Province Recommendations
  const sameProvinceRecs = allRecommendations
    .filter((rec) => rec.place.provinceId === criteria.currentProvinceId)
    .slice(0, 6)

  if (sameProvinceRecs.length > 0) {
    const currentProvince = getProvinceById(criteria.currentProvinceId)
    groups.push({
      title: `Discover ${currentProvince?.name} Province`,
      description: `Top attractions in your current province - no long travel required!`,
      recommendations: sameProvinceRecs,
      type: "same-province",
    })
  }

  // Nearby Province Recommendations
  const nearbyProvinceRecs = allRecommendations
    .filter((rec) => rec.place.provinceId !== criteria.currentProvinceId)
    .filter((rec) => rec.travelTime && rec.travelTime.duration <= 180) // Within 3 hours
    .slice(0, 4)

  if (nearbyProvinceRecs.length > 0) {
    groups.push({
      title: "Nearby Adventures",
      description: "Great destinations within a few hours' travel from your location.",
      recommendations: nearbyProvinceRecs,
      type: "nearby-province",
    })
  }

  // Interest-Based Recommendations
  if (criteria.interests && criteria.interests.length > 0) {
    const interestRecs = allRecommendations
      .filter((rec) =>
        rec.reasons.some((reason) => criteria.interests!.some((interest) => reason.toLowerCase().includes(interest))),
      )
      .slice(0, 5)

    if (interestRecs.length > 0) {
      groups.push({
        title: "Based on Your Interests",
        description: `Curated recommendations matching your preferences for ${criteria.interests.join(", ")}.`,
        recommendations: interestRecs,
        type: "interest-based",
      })
    }
  }

  // Seasonal Recommendations
  if (criteria.season) {
    const seasonalRecs = allRecommendations
      .filter((rec) =>
        rec.reasons.some(
          (reason) => reason.toLowerCase().includes("weather") || reason.toLowerCase().includes("season"),
        ),
      )
      .slice(0, 4)

    if (seasonalRecs.length > 0) {
      const seasonName =
        criteria.season === "dry"
          ? "Dry Season"
          : criteria.season === "wet"
            ? "Rainy Season"
            : criteria.season === "peak"
              ? "Peak Season"
              : "Off-Peak Season"

      groups.push({
        title: `Perfect for ${seasonName}`,
        description: `Destinations that are especially great to visit during the current season.`,
        recommendations: seasonalRecs,
        type: "seasonal",
      })
    }
  }

  // Cross-Province Hidden Gems
  const hiddenGems = allRecommendations
    .filter((rec) => rec.place.provinceId !== criteria.currentProvinceId)
    .filter((rec) => rec.place.rating >= 4.3 && rec.place.rating < 4.7) // Good but not too crowded
    .slice(0, 3)

  if (hiddenGems.length > 0) {
    groups.push({
      title: "Hidden Gems Worth the Journey",
      description: "Lesser-known but exceptional destinations across Sri Lanka.",
      recommendations: hiddenGems,
      type: "cross-province",
    })
  }

  return groups.filter((group) => group.recommendations.length > 0)
}

export function getQuickRecommendations(currentProvinceId: string, limit = 3): Recommendation[] {
  const criteria: RecommendationCriteria = {
    currentProvinceId,
    duration: "half-day",
  }

  const recommendations = samplePlaces
    .map((place) => getPlaceRecommendation(place, criteria))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  return recommendations
}
