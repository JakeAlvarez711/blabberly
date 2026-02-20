// src/data/geocodeService.js
// Resolves restaurant names to lat/lng via Google Places Text Search,
// with in-memory + Firestore caching.

import { loadGeocodeCache, writeGeocodeCache } from "./mapService";

/* ---------------------------------
   Slug generation: deterministic key for a {restaurant, city} pair.
---------------------------------- */
function makeSlug(restaurant, city) {
  const raw = `${restaurant}__${city}`.toLowerCase().replace(/[^a-z0-9_]/g, "_");
  // Firestore doc IDs max 1500 bytes; trim to be safe
  return raw.slice(0, 200);
}

/* ---------------------------------
   In-memory session cache (avoids re-reading Firestore within a session).
---------------------------------- */
const memoryCache = new Map();

/* ---------------------------------
   Resolve a batch of {restaurant, city} pairs to lat/lng.

   Steps:
   1. Check in-memory cache
   2. Check Firestore geocodeCache for misses
   3. For remaining misses, use Google Places Text Search
   4. Cache results back to Firestore and in-memory

   Returns: Map<slug, {lat, lng, googlePlaceId, address}>
---------------------------------- */
export async function resolveGeocodes(pairs, mapsApi) {
  if (!pairs || pairs.length === 0) return new Map();

  // Deduplicate
  const uniqueMap = new Map();
  for (const { restaurant, city } of pairs) {
    if (!restaurant || !city) continue;
    const slug = makeSlug(restaurant, city);
    if (!uniqueMap.has(slug)) {
      uniqueMap.set(slug, { restaurant, city, slug });
    }
  }

  const results = new Map();
  const firestoreMisses = [];

  // Step 1: Check in-memory cache
  for (const [slug, entry] of uniqueMap) {
    const cached = memoryCache.get(slug);
    if (cached) {
      results.set(slug, cached);
    } else {
      firestoreMisses.push(entry);
    }
  }

  if (firestoreMisses.length === 0) return results;

  // Step 2: Check Firestore cache
  const firestoreSlugs = firestoreMisses.map((e) => e.slug);
  const firestoreResults = await loadGeocodeCache(firestoreSlugs);

  const apiMisses = [];
  for (const entry of firestoreMisses) {
    const cached = firestoreResults.get(entry.slug);
    if (cached && typeof cached.lat === "number" && typeof cached.lng === "number") {
      memoryCache.set(entry.slug, cached);
      results.set(entry.slug, cached);
    } else {
      apiMisses.push(entry);
    }
  }

  if (apiMisses.length === 0 || !mapsApi) return results;

  // Step 3: Google Places Text Search for remaining misses
  // Rate-limit to 10 concurrent calls
  const CONCURRENCY = 10;
  for (let i = 0; i < apiMisses.length; i += CONCURRENCY) {
    const batch = apiMisses.slice(i, i + CONCURRENCY);
    const promises = batch.map((entry) =>
      textSearchGeocode(entry, mapsApi)
        .then((result) => {
          if (result) {
            memoryCache.set(entry.slug, result);
            results.set(entry.slug, result);
            // Write to Firestore cache (fire-and-forget)
            writeGeocodeCache(entry.slug, result);
          }
        })
        .catch((err) => {
          console.warn("Geocode failed for", entry.restaurant, err);
        })
    );
    await Promise.all(promises);
  }

  return results;
}

/* ---------------------------------
   Get the slug for a {restaurant, city} pair (exported for use in hooks).
---------------------------------- */
export { makeSlug };

/* ---------------------------------
   Use Google Places Text Search to find a restaurant's location.
---------------------------------- */
function textSearchGeocode({ restaurant, city }, mapsApi) {
  return new Promise((resolve) => {
    if (!mapsApi || !mapsApi.maps || !mapsApi.maps.places) {
      resolve(null);
      return;
    }

    const service = new mapsApi.maps.places.PlacesService(
      document.createElement("div")
    );

    service.textSearch(
      { query: `${restaurant}, ${city}` },
      (results, status) => {
        if (
          status === mapsApi.maps.places.PlacesServiceStatus.OK &&
          results &&
          results.length > 0
        ) {
          const place = results[0];
          resolve({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            googlePlaceId: place.place_id || null,
            address: place.formatted_address || null,
          });
        } else {
          resolve(null);
        }
      }
    );
  });
}
