// src/data/routePlanning.js
// Main route planning engine for "Plan My Night"

import { getPlaceLatLng, distanceMiles, estimateWalkingMinutes } from "../utils/geoUtils";
import {
  scorePlaceForRoute,
  selectDiverseStops,
  selectSpecificStops,
  optimizeRouteOrder,
  calculateTiming,
} from "../utils/routeAlgorithms";

/**
 * Generate a personalized route from available places.
 *
 * @param {Object} params
 * @param {Array} params.places - Google Places results (from MapPage's nearbyPlaces)
 * @param {Object} params.userProfile - { tastePrefs: string[], fineTune: {} }
 * @param {Object} params.preferences - { energy, crowd, music, numberOfStops }
 * @param {Array}  params.posts - Blabberly posts for popularity scoring
 * @param {boolean} params.specificJourney - Whether user picked specific stop types
 * @param {Array}  params.stopTypes - ["dinner", "drinks", "dessert"] if specificJourney
 * @returns {Object} { stops, segments, totalDistance, totalWalkingTime, estimatedTotalTime }
 */
export async function generateRoute({
  places,
  userProfile,
  preferences,
  posts = [],
  specificJourney = false,
  stopTypes = [],
}) {
  const numberOfStops = preferences.numberOfStops || 3;

  // Step 1: Filter candidates — must have geometry and rating
  const candidates = places.filter((p) => {
    const { lat, lng } = getPlaceLatLng(p);
    if (typeof lat !== "number" || typeof lng !== "number") return false;
    if (!p.name) return false;
    // Must have at least some data quality
    if (!p.rating || p.rating < 3.0) return false;
    return true;
  });

  if (candidates.length === 0) {
    return null;
  }

  // Step 2: Score each place
  const scoredPlaces = candidates.map((place) => ({
    ...place,
    _routeScore: scorePlaceForRoute(place, userProfile, preferences, posts),
  }));

  // Step 3: Build optimal route
  let selectedStops;
  if (specificJourney && stopTypes.length > 0) {
    selectedStops = selectSpecificStops(scoredPlaces, stopTypes);
  } else {
    selectedStops = selectDiverseStops(scoredPlaces, numberOfStops);
  }

  if (selectedStops.length === 0) {
    return null;
  }

  // Step 4: Optimize route order
  const orderedStops = optimizeRouteOrder(selectedStops);

  // Step 5: Calculate timing
  const timedStops = calculateTiming(orderedStops);

  // Step 6: Calculate walking segments between stops
  const segments = [];
  let totalDistanceMiles = 0;
  let totalWalkingMinutes = 0;

  for (let i = 0; i < timedStops.length - 1; i++) {
    const fromStop = timedStops[i].stop;
    const toStop = timedStops[i + 1].stop;
    const fromLatLng = getPlaceLatLng(fromStop);
    const toLatLng = getPlaceLatLng(toStop);

    const dist = distanceMiles(fromLatLng.lat, fromLatLng.lng, toLatLng.lat, toLatLng.lng);
    const walkMin = estimateWalkingMinutes(dist);

    totalDistanceMiles += dist;
    totalWalkingMinutes += walkMin;

    segments.push({
      from: i + 1,
      to: i + 2,
      distance: `${dist.toFixed(1)} mi`,
      duration: `${walkMin} min`,
      distanceMiles: dist,
      durationMinutes: walkMin,
      fromLatLng,
      toLatLng,
    });
  }

  // Calculate total estimated time (walking + time at each stop)
  const totalStopMinutes = timedStops.reduce((sum, s) => sum + s.estimatedDuration, 0);
  const totalMinutes = totalStopMinutes + totalWalkingMinutes;
  const totalHours = Math.round(totalMinutes / 60 * 10) / 10;

  // Build stop objects for the route
  const stops = timedStops.map((ts, index) => {
    const { lat, lng } = getPlaceLatLng(ts.stop);
    return {
      order: index + 1,
      place: {
        placeId: ts.stop.place_id,
        name: ts.stop.name,
        address: ts.stop.vicinity || ts.stop.formatted_address || "",
        location: { lat, lng },
        category: (ts.stop.types || []).find((t) =>
          ["restaurant", "bar", "cafe", "night_club", "bakery"].includes(t)
        ) || "restaurant",
        priceLevel: ts.stop.price_level || null,
        rating: ts.stop.rating || null,
        photoUrl: ts.stop.photos?.[0]?.getUrl?.({ maxWidth: 400 }) || null,
      },
      plannedTime: ts.plannedTime,
      estimatedDuration: ts.estimatedDuration,
      arrivedAt: null,
      visitedAt: null,
      rating: null,
      notes: null,
      _routeScore: ts.stop._routeScore,
    };
  });

  return {
    stops,
    segments,
    totalDistance: `${totalDistanceMiles.toFixed(1)} miles`,
    totalWalkingTime: `${totalWalkingMinutes} min`,
    estimatedTotalTime: `~${totalHours} hours`,
    preferences,
  };
}

/**
 * Fetch walking directions between two points using Google Directions API.
 * Returns { distance, duration, polyline } or null on failure.
 */
export function getWalkingDirections(origin, destination) {
  return new Promise((resolve) => {
    if (!window.google?.maps?.DirectionsService) {
      resolve(null);
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === "OK" && result.routes.length > 0) {
          const leg = result.routes[0].legs[0];
          resolve({
            distance: leg.distance.text,
            duration: leg.duration.text,
            distanceMeters: leg.distance.value,
            durationSeconds: leg.duration.value,
            polyline: result.routes[0].overview_polyline,
            path: result.routes[0].overview_path,
            steps: leg.steps,
          });
        } else {
          resolve(null);
        }
      }
    );
  });
}

/**
 * Fetch walking directions for all segments in a route.
 * Enriches segments with Google Directions data.
 */
export async function enrichRouteWithDirections(route) {
  if (!route || !route.segments) return route;

  const enrichedSegments = await Promise.all(
    route.segments.map(async (segment) => {
      const directions = await getWalkingDirections(
        segment.fromLatLng,
        segment.toLatLng
      );
      if (directions) {
        return {
          ...segment,
          distance: directions.distance,
          duration: directions.duration,
          polyline: directions.polyline,
          path: directions.path,
          durationMinutes: Math.round(directions.durationSeconds / 60),
        };
      }
      return segment;
    })
  );

  // Recalculate totals with real directions data
  let totalWalkingMinutes = 0;
  for (const seg of enrichedSegments) {
    totalWalkingMinutes += seg.durationMinutes || 0;
  }

  return {
    ...route,
    segments: enrichedSegments,
    totalWalkingTime: `${totalWalkingMinutes} min`,
  };
}

/** Auto-generate a fun route name */
export function generateRouteName(preferences) {
  const names = {
    chill: ["Chill Night Out", "Mellow Evening", "Easy Going Night"],
    social: ["Social Crawl", "Night with Friends", "Epic Night Out"],
    electric: ["Electric Night", "Party Mode", "Late Night Crawl"],
  };
  const options = names[preferences.energy] || names.social;
  return options[Math.floor(Math.random() * options.length)];
}
