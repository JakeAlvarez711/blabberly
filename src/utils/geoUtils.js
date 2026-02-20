// src/utils/geoUtils.js
// Geo utilities for route planning

const VILLAGE_CENTER = { lat: 33.1581, lng: -117.3506 };

/** Haversine distance in miles */
export function distanceMiles(lat1, lng1, lat2, lng2) {
  const R = 3958.8;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Distance from Village center in miles */
export function distanceFromCenter(lat, lng) {
  return distanceMiles(VILLAGE_CENTER.lat, VILLAGE_CENTER.lng, lat, lng);
}

/** Get lat/lng from a Google Places result */
export function getPlaceLatLng(place) {
  const lat = typeof place.geometry?.location?.lat === "function"
    ? place.geometry.location.lat()
    : place.geometry?.location?.lat ?? place.lat;
  const lng = typeof place.geometry?.location?.lng === "function"
    ? place.geometry.location.lng()
    : place.geometry?.location?.lng ?? place.lng;
  return { lat, lng };
}

/** Format distance for display */
export function formatDistance(miles) {
  if (miles < 0.1) return "Nearby";
  return `${miles.toFixed(1)} mi`;
}

/** Format walking time estimate (avg walking speed ~3 mph) */
export function estimateWalkingMinutes(miles) {
  return Math.round((miles / 3) * 60);
}

export { VILLAGE_CENTER };
