// src/utils/routeAlgorithms.js
// Scoring functions for Plan My Night route generation

import { tasteMatchScore } from "./mapAlgorithms";
import { distanceMiles, distanceFromCenter, getPlaceLatLng } from "./geoUtils";

// --- Vibe matching maps ---

const ENERGY_SCORES = {
  chill: {
    cafe: 1.0, wine_bar: 1.0, bakery: 1.0,
    restaurant: 0.7, bar: 0.5, night_club: 0.2,
  },
  social: {
    bar: 1.0, restaurant: 1.0, cafe: 0.5,
    night_club: 0.6, bakery: 0.4,
  },
  electric: {
    night_club: 1.0, bar: 1.0,
    restaurant: 0.4, cafe: 0.2, bakery: 0.1,
  },
};

const CROWD_SCORES = {
  intimate: {
    cafe: 1.0, bakery: 0.9, restaurant: 0.7,
    bar: 0.4, night_club: 0.1,
  },
  mixed: {
    restaurant: 1.0, bar: 0.8, cafe: 0.7,
    night_club: 0.5, bakery: 0.6,
  },
  packed: {
    night_club: 1.0, bar: 0.9,
    restaurant: 0.6, cafe: 0.3, bakery: 0.2,
  },
};

const MUSIC_SCORES = {
  none: {
    cafe: 1.0, restaurant: 0.9, bakery: 1.0,
    bar: 0.4, night_club: 0.1,
  },
  background: {
    restaurant: 1.0, bar: 0.8, cafe: 0.7,
    night_club: 0.4, bakery: 0.6,
  },
  dj: {
    night_club: 1.0, bar: 0.8,
    restaurant: 0.3, cafe: 0.1, bakery: 0.1,
  },
};

// Map for specific journey stop types
const STOP_TYPE_PLACE_TYPES = {
  dinner: ["restaurant", "meal_takeaway"],
  drinks: ["bar", "night_club"],
  dessert: ["bakery", "cafe"],
  coffee: ["cafe"],
};

/** Get the primary type of a Google Places result */
function getPrimaryType(place) {
  const types = place.types || [];
  const priority = ["night_club", "bar", "cafe", "bakery", "restaurant", "meal_takeaway", "meal_delivery"];
  for (const t of priority) {
    if (types.includes(t)) return t;
  }
  return "restaurant";
}

/** Get cuisine category from place name/types for diversity checking */
function getCuisineCategory(place) {
  const name = (place.name || "").toLowerCase();
  const categories = [
    { keywords: ["sushi", "japanese", "ramen"], cat: "japanese" },
    { keywords: ["taco", "mexican", "cantina", "taqueria"], cat: "mexican" },
    { keywords: ["pizza", "italian", "trattoria"], cat: "italian" },
    { keywords: ["thai", "chinese", "vietnamese", "pho", "korean", "wok"], cat: "asian" },
    { keywords: ["burger"], cat: "burger" },
    { keywords: ["seafood", "fish", "oyster", "crab"], cat: "seafood" },
    { keywords: ["bbq", "barbecue", "smokehouse"], cat: "bbq" },
    { keywords: ["indian", "curry"], cat: "indian" },
    { keywords: ["coffee", "espresso", "cafe", "latte"], cat: "coffee" },
    { keywords: ["dessert", "ice cream", "donut", "cake", "sweet", "bakery"], cat: "dessert" },
    { keywords: ["brewery", "beer", "taphouse", "ale", "pub"], cat: "brewery" },
    { keywords: ["cocktail", "martini", "lounge", "speakeasy"], cat: "cocktail_bar" },
    { keywords: ["wine", "vino"], cat: "wine_bar" },
  ];
  for (const { keywords, cat } of categories) {
    for (const kw of keywords) {
      if (name.includes(kw)) return cat;
    }
  }
  return getPrimaryType(place);
}

/**
 * Compute the vibe match score for a place given user's preferences.
 * preferences = { energy, crowd, music }
 */
function vibeMatchScore(place, preferences) {
  const placeType = getPrimaryType(place);
  const name = (place.name || "").toLowerCase();

  // Check if it looks like a wine bar (for energy scoring)
  const isWineBar = name.includes("wine") || name.includes("vino");
  const effectiveType = isWineBar ? "wine_bar" : placeType;

  let score = 0;
  let count = 0;

  if (preferences.energy) {
    const energyMap = ENERGY_SCORES[preferences.energy] || {};
    score += energyMap[effectiveType] ?? 0.5;
    count++;
  }
  if (preferences.crowd) {
    const crowdMap = CROWD_SCORES[preferences.crowd] || {};
    score += crowdMap[placeType] ?? 0.5;
    count++;
  }
  if (preferences.music) {
    const musicMap = MUSIC_SCORES[preferences.music] || {};
    score += musicMap[placeType] ?? 0.5;
    count++;
  }

  return count > 0 ? score / count : 0.5;
}

/**
 * Compute composite score for a place.
 * Returns { totalScore, tasteScore, vibeScore, qualityScore, popularityScore, proximityScore, matchedTags }
 */
export function scorePlaceForRoute(place, userProfile, preferences, posts = []) {
  // 1. Taste match (0.35)
  const tasteResult = tasteMatchScore(place, userProfile);
  const tasteScore = tasteResult.score;

  // 2. Vibe match (0.30)
  const vibeScore = vibeMatchScore(place, preferences);

  // 3. Quality score (0.20)
  const rating = place.rating || 0;
  const qualityScore = rating / 5.0;

  // 4. Popularity score (0.10)
  const placeName = (place.name || "").toLowerCase();
  const postCount = posts.filter(
    (p) => (p.restaurant || "").toLowerCase() === placeName
  ).length;
  const popularityScore = Math.min(postCount / 50, 1.0);

  // 5. Proximity bonus (0.05)
  const { lat, lng } = getPlaceLatLng(place);
  const dist = distanceFromCenter(lat, lng);
  const proximityScore = 1 / (1 + dist);

  const totalScore =
    tasteScore * 0.35 +
    vibeScore * 0.30 +
    qualityScore * 0.20 +
    popularityScore * 0.10 +
    proximityScore * 0.05;

  return {
    totalScore,
    tasteScore,
    vibeScore,
    qualityScore,
    popularityScore,
    proximityScore,
    matchedTags: tasteResult.matchedTags,
    tier: tasteResult.tier,
  };
}

/**
 * Select diverse stops from scored places.
 * Ensures cuisine diversity and walkable distances.
 */
export function selectDiverseStops(scoredPlaces, numberOfStops) {
  if (scoredPlaces.length === 0) return [];
  if (scoredPlaces.length <= numberOfStops) return scoredPlaces;

  const sorted = [...scoredPlaces].sort((a, b) => b._routeScore.totalScore - a._routeScore.totalScore);
  const selected = [sorted[0]];

  for (let stopIndex = 1; stopIndex < numberOfStops && sorted.length > 0; stopIndex++) {
    const prevStop = selected[selected.length - 1];
    const prevLatLng = getPlaceLatLng(prevStop);
    const prevCuisines = selected.map((s) => getCuisineCategory(s));
    const prevTypes = selected.map((s) => getPrimaryType(s));

    let bestCandidate = null;
    let bestScore = -1;

    for (const candidate of sorted) {
      if (selected.includes(candidate)) continue;

      const candLatLng = getPlaceLatLng(candidate);
      const dist = distanceMiles(prevLatLng.lat, prevLatLng.lng, candLatLng.lat, candLatLng.lng);

      // Must be within 0.5 miles (walkable)
      if (dist > 0.5) continue;

      const candCuisine = getCuisineCategory(candidate);
      const candType = getPrimaryType(candidate);

      // Diversity bonus: different cuisine and different type preferred
      let diversityBonus = 0;
      if (!prevCuisines.includes(candCuisine)) diversityBonus += 0.15;
      if (!prevTypes.includes(candType)) diversityBonus += 0.10;

      const adjustedScore = candidate._routeScore.totalScore + diversityBonus;

      if (adjustedScore > bestScore) {
        bestScore = adjustedScore;
        bestCandidate = candidate;
      }
    }

    // If no walkable candidate found, relax distance constraint
    if (!bestCandidate) {
      for (const candidate of sorted) {
        if (selected.includes(candidate)) continue;
        const candCuisine = getCuisineCategory(candidate);
        if (!prevCuisines.includes(candCuisine)) {
          bestCandidate = candidate;
          break;
        }
      }
    }

    // Last resort: just pick next highest scored
    if (!bestCandidate) {
      bestCandidate = sorted.find((c) => !selected.includes(c));
    }

    if (bestCandidate) selected.push(bestCandidate);
  }

  return selected;
}

/**
 * Select stops for a specific journey (user chose stop types).
 * stopTypes = ["dinner", "drinks", "dessert"]
 */
export function selectSpecificStops(scoredPlaces, stopTypes) {
  const selected = [];

  for (const stopType of stopTypes) {
    const allowedTypes = STOP_TYPE_PLACE_TYPES[stopType] || ["restaurant"];
    const candidates = scoredPlaces.filter((p) => {
      if (selected.includes(p)) return false;
      const pType = getPrimaryType(p);
      return allowedTypes.includes(pType);
    });

    candidates.sort((a, b) => b._routeScore.totalScore - a._routeScore.totalScore);
    if (candidates.length > 0) {
      selected.push(candidates[0]);
    }
  }

  return selected;
}

/**
 * Optimize route order for logical flow.
 * Consider time of day and natural progression.
 */
export function optimizeRouteOrder(stops) {
  if (stops.length <= 1) return stops;

  const typed = stops.map((s) => ({
    stop: s,
    type: getPrimaryType(s),
    category: getCuisineCategory(s),
  }));

  const now = new Date();
  const hour = now.getHours();

  // Define type ordering based on time of day
  let typeOrder;
  if (hour < 17) {
    // Before 5 PM: coffee/cafe → restaurant → bar
    typeOrder = ["cafe", "bakery", "restaurant", "meal_takeaway", "bar", "night_club"];
  } else if (hour < 21) {
    // 5-9 PM: restaurant → bar → night_club
    typeOrder = ["restaurant", "meal_takeaway", "cafe", "bakery", "bar", "night_club"];
  } else {
    // After 9 PM: bar → restaurant → night_club
    typeOrder = ["bar", "restaurant", "meal_takeaway", "cafe", "bakery", "night_club"];
  }

  typed.sort((a, b) => {
    const aIdx = typeOrder.indexOf(a.type);
    const bIdx = typeOrder.indexOf(b.type);
    return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx);
  });

  // After type-ordering, do a simple nearest-neighbor pass to minimize backtracking
  // Only swap if it doesn't break the type progression
  const ordered = typed.map((t) => t.stop);
  return minimizeBacktracking(ordered);
}

/** Simple nearest-neighbor optimization to reduce total walking distance */
function minimizeBacktracking(stops) {
  if (stops.length <= 2) return stops;

  // For 3-4 stops, just try all permutations and pick shortest total distance
  if (stops.length <= 4) {
    const perms = permutations(stops);
    let bestPerm = stops;
    let bestDist = Infinity;

    for (const perm of perms) {
      let totalDist = 0;
      for (let i = 0; i < perm.length - 1; i++) {
        const a = getPlaceLatLng(perm[i]);
        const b = getPlaceLatLng(perm[i + 1]);
        totalDist += distanceMiles(a.lat, a.lng, b.lat, b.lng);
      }
      if (totalDist < bestDist) {
        bestDist = totalDist;
        bestPerm = perm;
      }
    }
    return bestPerm;
  }

  return stops;
}

function permutations(arr) {
  if (arr.length <= 1) return [arr];
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    for (const perm of permutations(rest)) {
      result.push([arr[i], ...perm]);
    }
  }
  return result;
}

/**
 * Calculate suggested timing for each stop.
 */
export function calculateTiming(stops) {
  const now = new Date();
  // Start 15 minutes from now
  let currentTime = new Date(now.getTime() + 15 * 60 * 1000);

  return stops.map((stop, index) => {
    const type = getPrimaryType(stop);
    // Dinner/restaurants get more time, bars/cafes get less
    const duration = type === "restaurant" || type === "meal_takeaway" ? 90 : 60;

    const arriveTime = new Date(currentTime);
    const result = {
      stop,
      order: index + 1,
      plannedTime: formatTime(arriveTime),
      estimatedDuration: duration,
    };

    // Next stop starts after duration
    currentTime = new Date(currentTime.getTime() + duration * 60 * 1000);

    return result;
  });
}

function formatTime(date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export { getPrimaryType, getCuisineCategory };
