// src/utils/mapAlgorithms.js
// Taste matching algorithm for map place pins.

// Maps Google Places types to Blabberly taste tokens
const TYPE_TO_CUISINE = {
  restaurant: ["comfort_food"],
  bar: ["craft_cocktails", "craft_beer", "wine", "margaritas"],
  cafe: ["coffee", "espresso_martini"],
  bakery: ["desserts"],
  night_club: ["late_night", "craft_cocktails"],
  meal_takeaway: ["cheap_eats", "street_food"],
  meal_delivery: ["cheap_eats"],
};

// Keyword → taste token mapping (matched against place name + types)
const KEYWORD_TO_TOKEN = {
  sushi: "sushi",
  japanese: "sushi",
  ramen: "ramen",
  taco: "tacos",
  mexican: "tacos",
  cantina: "tacos",
  taqueria: "tacos",
  pizza: "pizza",
  italian: "pizza",
  trattoria: "pizza",
  bbq: "bbq",
  barbecue: "bbq",
  smokehouse: "bbq",
  seafood: "seafood",
  fish: "seafood",
  oyster: "seafood",
  crab: "seafood",
  lobster: "seafood",
  burger: "burgers",
  brunch: "brunch",
  breakfast: "brunch",
  pancake: "brunch",
  waffle: "brunch",
  dessert: "desserts",
  bakery: "desserts",
  ice_cream: "desserts",
  donut: "desserts",
  cake: "desserts",
  sweet: "desserts",
  coffee: "coffee",
  espresso: "coffee",
  latte: "coffee",
  cafe: "coffee",
  tea: "coffee",
  boba: "boba",
  matcha: "boba",
  thai: "street_food",
  chinese: "street_food",
  vietnamese: "street_food",
  pho: "street_food",
  indian: "street_food",
  curry: "street_food",
  korean: "street_food",
  noodle: "street_food",
  wok: "street_food",
  dim_sum: "street_food",
  fine_dining: "fine_dining",
  steakhouse: "fine_dining",
  wine: "wine",
  vino: "wine",
  vineyard: "wine",
  beer: "craft_beer",
  brewery: "craft_beer",
  taphouse: "craft_beer",
  pub: "craft_beer",
  ale: "craft_beer",
  cocktail: "craft_cocktails",
  martini: "craft_cocktails",
  mixology: "craft_cocktails",
  dive: "dive_bar",
  rooftop: "rooftop",
  lounge: "speakeasy",
  speakeasy: "speakeasy",
  patio: "outdoor_patio",
  garden: "outdoor_patio",
};

// Vibe tokens (subset of tastePrefs tokens that represent vibes)
const VIBE_TOKENS = new Set([
  "dive_bar", "rooftop", "date_night", "late_night", "laptop_friendly",
  "speakeasy", "outdoor_patio", "cozy", "trendy", "live_music",
  "family_friendly", "sports_bar", "pet_friendly",
]);

// Food tokens (non-vibe taste tokens)
const FOOD_TOKENS = new Set([
  "sushi", "brunch", "cheap_eats", "pizza", "tacos", "ramen", "bbq",
  "seafood", "burgers", "street_food", "fine_dining", "comfort_food",
  "desserts", "espresso_martini", "craft_cocktails", "craft_beer",
  "wine", "coffee", "boba", "margaritas", "mocktails", "natural_wine",
]);

/**
 * Extract inferred tags from a Google Places result.
 * Returns { cuisineTags: Set, vibeTags: Set }
 */
function extractPlaceTags(place) {
  const cuisineTags = new Set();
  const vibeTags = new Set();

  const nameLower = (place.name || "").toLowerCase();
  const types = place.types || [];

  // From Google types
  for (const t of types) {
    const tokens = TYPE_TO_CUISINE[t];
    if (tokens) {
      for (const tok of tokens) {
        if (VIBE_TOKENS.has(tok)) vibeTags.add(tok);
        else cuisineTags.add(tok);
      }
    }
  }

  // From place name keywords — check each word and substring
  for (const [keyword, token] of Object.entries(KEYWORD_TO_TOKEN)) {
    if (nameLower.includes(keyword)) {
      if (VIBE_TOKENS.has(token)) vibeTags.add(token);
      else cuisineTags.add(token);
    }
  }

  return { cuisineTags, vibeTags };
}

/**
 * Overlap coefficient: fraction of the smaller set found in the larger.
 * More forgiving than Jaccard when sets have different sizes.
 * overlap({tacos}, {tacos, sushi, coffee}) = 1.0 (not 0.33 like Jaccard)
 */
function overlap(setA, setB) {
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }
  return intersection / Math.min(setA.size, setB.size);
}

/**
 * Compute taste match score for a place against user's profile.
 *
 * userProfile = {
 *   tastePrefs: string[],           // from userDoc.tastePrefs
 *   fineTune: { priceRange, dietary, avoidTags, pickyLevel }
 * }
 *
 * Returns { score: 0-1, matchedTags: string[], tier: "perfect"|"good"|"other" }
 */
export function tasteMatchScore(place, userProfile) {
  if (!userProfile || !userProfile.tastePrefs || userProfile.tastePrefs.length === 0) {
    return { score: 0, matchedTags: [], tier: "other" };
  }

  const tastePrefs = new Set(userProfile.tastePrefs);
  const fineTune = userProfile.fineTune || {};

  // Split user's taste prefs into food and vibe sets
  const userFood = new Set();
  const userVibe = new Set();
  for (const pref of tastePrefs) {
    if (VIBE_TOKENS.has(pref)) userVibe.add(pref);
    if (FOOD_TOKENS.has(pref)) userFood.add(pref);
  }

  // Extract place tags
  const { cuisineTags, vibeTags } = extractPlaceTags(place);

  // 1. Cuisine match (0.4 weight) — using overlap coefficient
  let cuisineMatch = 0;
  if (userFood.size > 0 && cuisineTags.size > 0) {
    cuisineMatch = overlap(cuisineTags, userFood);
  }

  // 2. Vibe match (0.3 weight)
  let vibeMatch = 0;
  if (userVibe.size > 0 && vibeTags.size > 0) {
    vibeMatch = overlap(vibeTags, userVibe);
  } else if (userVibe.size === 0) {
    // User didn't pick vibes — don't penalize, give neutral score
    vibeMatch = 0.5;
  }

  // 3. Price match (0.2 weight)
  let priceMatch = 0.5; // default if no price data available
  const userPriceRange = fineTune.priceRange || [];
  if (userPriceRange.length > 0 && place.price_level != null && place.price_level > 0) {
    const placePrice = "$".repeat(place.price_level);
    if (userPriceRange.includes(placePrice)) {
      priceMatch = 1;
    } else {
      const placeTier = place.price_level;
      const userTiers = userPriceRange.map((p) => p.length);
      const minDist = Math.min(...userTiers.map((t) => Math.abs(t - placeTier)));
      priceMatch = minDist === 1 ? 0.5 : 0;
    }
  } else if (userPriceRange.length > 0) {
    // Place has no price data — give benefit of the doubt
    priceMatch = 0.6;
  }

  // 4. Dietary match (0.1 weight) — penalize if place name contains avoided items
  let dietaryMatch = 1;
  const avoidTags = fineTune.avoidTags || [];
  if (avoidTags.length > 0) {
    const nameLower = (place.name || "").toLowerCase();
    for (const avoid of avoidTags) {
      const keyword = avoid.replace(/_/g, " ");
      if (nameLower.includes(keyword)) {
        dietaryMatch = 0;
        break;
      }
    }
  }

  const rawScore =
    cuisineMatch * 0.4 +
    vibeMatch * 0.3 +
    priceMatch * 0.2 +
    dietaryMatch * 0.1;

  // Boost: if we found ANY direct tag overlap, give a floor boost
  // This ensures a taco place shows orange for a user who selected "tacos"
  const directHits = [];
  for (const tag of cuisineTags) {
    if (tastePrefs.has(tag)) directHits.push(tag);
  }
  for (const tag of vibeTags) {
    if (tastePrefs.has(tag)) directHits.push(tag);
  }

  let score = rawScore;
  if (directHits.length >= 2) {
    score = Math.max(score, 0.85); // 2+ direct hits → perfect tier
  } else if (directHits.length === 1) {
    score = Math.max(score, 0.6);  // 1 direct hit → at least good tier
  }

  // Collect matched tags for display
  const matchedTags = [...directHits];
  if (priceMatch === 1 && place.price_level) {
    matchedTags.push("$".repeat(place.price_level));
  }

  const tier = score >= 0.8 ? "perfect" : score >= 0.5 ? "good" : "other";

  return { score, matchedTags, tier };
}

/**
 * Pretty-print a taste token for display.
 */
export function formatToken(token) {
  if (token.startsWith("$")) return token;
  return token
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Cluster places by grid cell for map display.
 * Returns array of clusters: { key, lat, lng, places, count, dominantTier }
 */
export function clusterPlaces(places, zoom) {
  if (!places || places.length === 0) return [];

  // At zoom >= 15, no clustering
  if (zoom >= 15) {
    return places.map((p) => ({
      key: p.place_id,
      lat: p.geometry?.location?.lat(),
      lng: p.geometry?.location?.lng(),
      places: [p],
      count: 1,
      dominantTier: p._matchTier || "other",
    }));
  }

  const gridSize = zoom <= 12 ? 0.02 : zoom <= 13 ? 0.01 : 0.005;
  const grid = new Map();

  for (const p of places) {
    const lat = p.geometry?.location?.lat();
    const lng = p.geometry?.location?.lng();
    if (typeof lat !== "number") continue;

    const gx = Math.floor(lat / gridSize);
    const gy = Math.floor(lng / gridSize);
    const key = `cluster_${gx}_${gy}`;

    if (!grid.has(key)) {
      grid.set(key, { places: [], latSum: 0, lngSum: 0, tiers: { perfect: 0, good: 0, other: 0 } });
    }
    const cell = grid.get(key);
    cell.places.push(p);
    cell.latSum += lat;
    cell.lngSum += lng;
    cell.tiers[p._matchTier || "other"]++;
  }

  return Array.from(grid.entries()).map(([key, cell]) => {
    const { tiers } = cell;
    let dominantTier = "other";
    if (tiers.perfect >= tiers.good && tiers.perfect >= tiers.other) dominantTier = "perfect";
    else if (tiers.good >= tiers.other) dominantTier = "good";

    return {
      key,
      lat: cell.latSum / cell.places.length,
      lng: cell.lngSum / cell.places.length,
      places: cell.places,
      count: cell.places.length,
      dominantTier,
    };
  });
}
