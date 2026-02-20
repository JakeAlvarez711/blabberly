// src/components/map/MapContainer.js
import { useCallback, useRef, useMemo } from "react";
import { GoogleMap } from "@react-google-maps/api";

const MAP_STYLES = [
  // Base geometry — light off-white
  { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  // Hide all default labels/icons to reduce clutter
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  // Subtle text
  { elementType: "labels.text.fill", stylers: [{ color: "#999999" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
  // Roads — lighter gray, reduced prominence
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#e8e8e8" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#bbbbbb" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#dedede" }] },
  { featureType: "road.highway", elementType: "labels", stylers: [{ visibility: "simplified" }] },
  { featureType: "road.arterial", elementType: "labels", stylers: [{ visibility: "simplified" }] },
  { featureType: "road.local", elementType: "labels", stylers: [{ visibility: "off" }] },
  // Water — subtle blue
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#d4e4f0" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#9db8cc" }] },
  // Parks — very subtle green
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#e0eed8" }] },
  { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
  // Keep neighborhood & locality labels
  { featureType: "administrative.neighborhood", elementType: "labels.text.fill", stylers: [{ color: "#888888" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#666666" }] },
  // Hide all non-food POIs
  { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "poi.business", stylers: [{ visibility: "off" }] },
  { featureType: "poi.government", stylers: [{ visibility: "off" }] },
  { featureType: "poi.medical", stylers: [{ visibility: "off" }] },
  { featureType: "poi.school", stylers: [{ visibility: "off" }] },
  { featureType: "poi.sports_complex", stylers: [{ visibility: "off" }] },
  // Hide transit completely
  { featureType: "transit", stylers: [{ visibility: "off" }] },
];

const containerStyle = {
  width: "100%",
  height: "100%",
};

function MapContainer({ center, zoom = 15, restriction, onBoundsChanged, onMapLoad, children }) {
  const mapRef = useRef(null);
  const timerRef = useRef(null);

  const options = useMemo(() => {
    const opts = {
      styles: MAP_STYLES,
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: { position: 9 }, // RIGHT_BOTTOM
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      clickableIcons: false,
    };
    if (restriction) {
      opts.restriction = {
        latLngBounds: restriction,
        strictBounds: true,
      };
      opts.minZoom = 14;
    }
    return opts;
  }, [restriction]);

  const handleLoad = useCallback((map) => {
    mapRef.current = map;
    if (onMapLoad) onMapLoad(map);
  }, [onMapLoad]);

  const handleBoundsChanged = useCallback(() => {
    if (!onBoundsChanged || !mapRef.current) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const bounds = mapRef.current.getBounds();
      if (bounds) {
        onBoundsChanged({
          ne: { lat: bounds.getNorthEast().lat(), lng: bounds.getNorthEast().lng() },
          sw: { lat: bounds.getSouthWest().lat(), lng: bounds.getSouthWest().lng() },
        });
      }
    }, 300);
  }, [onBoundsChanged]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      options={options}
      onLoad={handleLoad}
      onBoundsChanged={handleBoundsChanged}
    >
      {children}
    </GoogleMap>
  );
}

export default MapContainer;
