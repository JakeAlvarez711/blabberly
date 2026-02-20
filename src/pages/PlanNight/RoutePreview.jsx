// src/pages/PlanNight/RoutePreview.jsx
import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import {
  ArrowLeft, Route, Clock, Footprints, Save, Play, Plus, Search, X, Check,
} from "lucide-react";
import StopCard from "../../components/routes/StopCard";
import { scorePlaceForRoute } from "../../utils/routeAlgorithms";
import { getPlaceLatLng, distanceMiles, estimateWalkingMinutes } from "../../utils/geoUtils";

const VILLAGE_CENTER = { lat: 33.1581, lng: -117.3506 };

const MAP_STYLES = [
  { elementType: "geometry", stylers: [{ color: "#1a1a2e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a2e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8a8a9a" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#2a2a3e" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#6a6a7a" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0e1626" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
];

const MAP_OPTIONS = {
  styles: MAP_STYLES,
  disableDefaultUI: true,
  zoomControl: true,
  zoomControlOptions: typeof window !== "undefined" && window.google
    ? { position: window.google.maps.ControlPosition.RIGHT_CENTER }
    : {},
  clickableIcons: false,
};

const POLYLINE_OPTIONS = {
  strokeColor: "#F26522",
  strokeOpacity: 0.8,
  strokeWeight: 3,
};

export default function RoutePreview({
  route,
  allPlaces,
  userProfile,
  posts,
  onBack,
  onStartNight,
  onSaveForLater,
  onCancel,
}) {
  const [stops, setStops] = useState(route?.stops || []);
  const [dragIndex, setDragIndex] = useState(null);
  const [dropTargetIndex, setDropTargetIndex] = useState(null);
  const [highlightedStop, setHighlightedStop] = useState(null);
  const [showAddStop, setShowAddStop] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const mapRef = useRef(null);
  const stopsListRef = useRef(null);

  // Recompute segments whenever stops change
  const liveSegments = useMemo(() => {
    const segs = [];
    for (let i = 0; i < stops.length - 1; i++) {
      const fromLoc = stops[i].place.location;
      const toLoc = stops[i + 1].place.location;
      const dist = distanceMiles(fromLoc.lat, fromLoc.lng, toLoc.lat, toLoc.lng);
      const walkMin = estimateWalkingMinutes(dist);
      segs.push({
        distance: `${dist.toFixed(1)} mi`,
        duration: `${walkMin} min`,
        distanceMiles: dist,
        durationMinutes: walkMin,
        fromLatLng: fromLoc,
        toLatLng: toLoc,
      });
    }
    return segs;
  }, [stops]);

  // Recompute totals
  const totalStats = useMemo(() => {
    const totalDist = liveSegments.reduce((s, seg) => s + seg.distanceMiles, 0);
    const totalWalk = liveSegments.reduce((s, seg) => s + seg.durationMinutes, 0);
    const totalStopMins = stops.reduce((s, stop) => s + (stop.estimatedDuration || 60), 0);
    const totalHours = Math.round((totalStopMins + totalWalk) / 60 * 10) / 10;
    return {
      distance: `${totalDist.toFixed(1)} miles`,
      walkTime: `${totalWalk} min`,
      totalTime: `~${totalHours} hours`,
    };
  }, [liveSegments, stops]);

  // Fit map to show all stops
  useEffect(() => {
    if (!mapRef.current || stops.length === 0) return;
    if (!window.google?.maps) return;

    const bounds = new window.google.maps.LatLngBounds();
    for (const stop of stops) {
      bounds.extend(stop.place.location);
    }
    mapRef.current.fitBounds(bounds, { padding: 60 });
  }, [stops]);

  const handleMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // --- Drag and drop ---
  const handleDragStart = useCallback((e, index) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
    // Set a transparent drag image for cleaner look
    if (e.dataTransfer.setDragImage) {
      const ghost = document.createElement("div");
      ghost.style.opacity = "0";
      document.body.appendChild(ghost);
      e.dataTransfer.setDragImage(ghost, 0, 0);
      setTimeout(() => document.body.removeChild(ghost), 0);
    }
  }, []);

  const handleDragOver = useCallback((e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDropTargetIndex(index);
  }, []);

  const handleDrop = useCallback((e, dropIndex) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === dropIndex) {
      setDragIndex(null);
      setDropTargetIndex(null);
      return;
    }

    const newStops = [...stops];
    const [moved] = newStops.splice(dragIndex, 1);
    newStops.splice(dropIndex, 0, moved);

    const reordered = newStops.map((s, i) => ({ ...s, order: i + 1 }));
    setStops(reordered);
    setDragIndex(null);
    setDropTargetIndex(null);
  }, [dragIndex, stops]);

  const handleDragEnd = useCallback(() => {
    setDragIndex(null);
    setDropTargetIndex(null);
  }, []);

  const handleRemoveStop = useCallback((index) => {
    const newStops = stops
      .filter((_, i) => i !== index)
      .map((s, i) => ({ ...s, order: i + 1 }));
    setStops(newStops);
  }, [stops]);

  const handleMarkerClick = useCallback((stopIndex) => {
    setHighlightedStop(stopIndex);
    // Scroll to the stop in the list
    const listEl = stopsListRef.current;
    if (listEl) {
      const cards = listEl.querySelectorAll("[data-stop-card]");
      cards[stopIndex]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setTimeout(() => setHighlightedStop(null), 2000);
  }, []);

  // --- Add Stop search ---
  const availablePlaces = useMemo(() => {
    if (!allPlaces || !showAddStop) return [];
    const existingIds = new Set(stops.map((s) => s.place.placeId));
    const preferences = route?.preferences || {};

    return allPlaces
      .filter((p) => {
        if (!p.name || !p.place_id) return false;
        if (existingIds.has(p.place_id)) return false;
        if (!p.rating || p.rating < 3.0) return false;
        if (searchQuery) {
          return p.name.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
      })
      .map((p) => ({
        ...p,
        _addScore: scorePlaceForRoute(p, userProfile, preferences, posts || []),
      }))
      .sort((a, b) => b._addScore.totalScore - a._addScore.totalScore)
      .slice(0, 12);
  }, [allPlaces, showAddStop, stops, searchQuery, route, userProfile, posts]);

  const handleAddStop = useCallback((place) => {
    const { lat, lng } = getPlaceLatLng(place);
    const newStop = {
      order: stops.length + 1,
      place: {
        placeId: place.place_id,
        name: place.name,
        address: place.vicinity || place.formatted_address || "",
        location: { lat, lng },
        category: (place.types || []).find((t) =>
          ["restaurant", "bar", "cafe", "night_club", "bakery"].includes(t)
        ) || "restaurant",
        priceLevel: place.price_level || null,
        rating: place.rating || null,
        photoUrl: place.photos?.[0]?.getUrl?.({ maxWidth: 400 }) || null,
      },
      plannedTime: "",
      estimatedDuration: 60,
      arrivedAt: null,
      visitedAt: null,
      rating: null,
      notes: null,
      _routeScore: place._addScore || { matchedTags: [] },
    };
    setStops((prev) => [...prev, newStop]);
    setShowAddStop(false);
    setSearchQuery("");
  }, [stops.length]);

  // Build polyline paths — always use live stop locations
  const polylinePath = useMemo(() => {
    if (stops.length < 2) return [];
    return stops.map((s) => s.place.location);
  }, [stops]);

  const handleStartNight = async () => {
    setSaving(true);
    try {
      await onStartNight?.({ ...route, stops, segments: liveSegments, ...totalStats });
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSaveForLater?.({ ...route, stops, segments: liveSegments, ...totalStats });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={styles.container} onDragEnd={handleDragEnd}>
      {/* Left Panel — Route Details */}
      <div style={styles.leftPanel}>
        {/* Header */}
        <div style={styles.panelHeader}>
          <button onClick={onBack} style={styles.backBtn}>
            <ArrowLeft size={18} color="#aaa" />
          </button>
          <div>
            <h2 style={styles.title}>Your Night Plan</h2>
            <p style={styles.subtitle}>
              Based on your taste &middot; Carlsbad Village
            </p>
          </div>
        </div>

        {/* Stats Banner — prominent */}
        <div style={styles.statsBanner}>
          <div style={styles.statItem}>
            <Route size={16} color="#F26522" />
            <div>
              <div style={styles.statValue}>{totalStats.distance}</div>
              <div style={styles.statLabel}>total</div>
            </div>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statItem}>
            <Clock size={16} color="#F26522" />
            <div>
              <div style={styles.statValue}>{totalStats.totalTime}</div>
              <div style={styles.statLabel}>estimated</div>
            </div>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statItem}>
            <Footprints size={16} color="#F26522" />
            <div>
              <div style={styles.statValue}>{totalStats.walkTime}</div>
              <div style={styles.statLabel}>walking</div>
            </div>
          </div>
        </div>

        {/* Stop Cards — scrollable */}
        <div style={styles.stopsList} ref={stopsListRef}>
          {stops.map((stop, index) => (
            <div key={stop.place.placeId || index} data-stop-card>
              <StopCard
                stop={stop}
                index={index}
                onRemove={stops.length > 2 ? handleRemoveStop : null}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                isDragging={dragIndex === index}
                isDropTarget={dropTargetIndex === index && dragIndex !== index}
              />
              {/* Walking segment between stops */}
              {index < stops.length - 1 && liveSegments[index] && (
                <div style={styles.walkingLabel}>
                  <div style={styles.walkingLine} />
                  <div style={styles.walkingBadge}>
                    <Footprints size={10} color="#888" />
                    <span>
                      {liveSegments[index].duration} &middot;{" "}
                      {liveSegments[index].distance}
                    </span>
                  </div>
                  <div style={styles.walkingLine} />
                </div>
              )}
            </div>
          ))}

          {/* + Add Stop */}
          {!showAddStop ? (
            <button onClick={() => setShowAddStop(true)} style={styles.addStopBtn}>
              <Plus size={16} color="#F26522" />
              <span>Add Another Stop</span>
            </button>
          ) : (
            <div style={styles.addStopPanel}>
              <div style={styles.addStopHeader}>
                <span style={styles.addStopTitle}>Add a stop</span>
                <button onClick={() => { setShowAddStop(false); setSearchQuery(""); }} style={styles.addStopClose}>
                  <X size={14} color="#888" />
                </button>
              </div>
              <div style={styles.searchRow}>
                <Search size={14} color="#888" />
                <input
                  type="text"
                  placeholder="Search places..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={styles.searchInput}
                  autoFocus
                />
              </div>
              <div style={styles.searchResults}>
                {availablePlaces.length === 0 ? (
                  <div style={styles.noResults}>No places found</div>
                ) : (
                  availablePlaces.map((place) => (
                    <button
                      key={place.place_id}
                      onClick={() => handleAddStop(place)}
                      style={styles.searchResultItem}
                    >
                      <div style={styles.searchResultInfo}>
                        <div style={styles.searchResultName}>{place.name}</div>
                        <div style={styles.searchResultMeta}>
                          {place.rating && `★ ${place.rating}`}
                          {place.vicinity && ` · ${place.vicinity}`}
                        </div>
                      </div>
                      <Plus size={14} color="#F26522" />
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div style={styles.footerActions}>
          <button onClick={onCancel} style={styles.cancelBtn}>
            Cancel
          </button>
          <button onClick={onBack} style={styles.refineBtn}>
            Refine
          </button>
          <button onClick={handleSave} disabled={saving} style={styles.saveBtn}>
            {saved ? <Check size={14} color="#4CAF50" /> : <Save size={14} />}
            {saved ? "Saved!" : "Save"}
          </button>
          <button onClick={handleStartNight} disabled={saving} style={{
            ...styles.startBtn,
            opacity: saving ? 0.7 : 1,
          }}>
            {saving ? (
              <div style={styles.btnSpinner} />
            ) : (
              <Play size={14} />
            )}
            {saving ? "Saving..." : "Start Night!"}
          </button>
        </div>
      </div>

      {/* Right Panel — Map */}
      <div style={styles.rightPanel}>
        <GoogleMap
          mapContainerStyle={styles.mapContainer}
          center={VILLAGE_CENTER}
          zoom={15}
          options={MAP_OPTIONS}
          onLoad={handleMapLoad}
        >
          {/* Numbered markers */}
          {stops.map((stop, index) => (
            <Marker
              key={stop.place.placeId || index}
              position={stop.place.location}
              label={{
                text: String(index + 1),
                color: "#fff",
                fontWeight: "bold",
                fontSize: "14px",
              }}
              icon={
                window.google?.maps
                  ? {
                      path: window.google.maps.SymbolPath.CIRCLE,
                      scale: 16,
                      fillColor: highlightedStop === index ? "#FF8A50" : "#F26522",
                      fillOpacity: 1,
                      strokeColor: "#fff",
                      strokeWeight: 2,
                    }
                  : undefined
              }
              onClick={() => handleMarkerClick(index)}
            />
          ))}

          {/* Walking route polyline */}
          {polylinePath.length >= 2 && (
            <Polyline path={polylinePath} options={POLYLINE_OPTIONS} />
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100%",
    overflow: "hidden",
  },
  leftPanel: {
    width: "40%",
    minWidth: 320,
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid rgba(255,255,255,0.06)",
  },
  panelHeader: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "20px 20px 12px",
    flexShrink: 0,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    flexShrink: 0,
  },
  title: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    color: "#fff",
  },
  subtitle: {
    margin: "2px 0 0",
    fontSize: 12,
    color: "#888",
  },

  // --- Prominent stats banner ---
  statsBanner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
    margin: "0 16px 12px",
    padding: "12px 16px",
    borderRadius: 12,
    background: "linear-gradient(135deg, rgba(242, 101, 34, 0.12), rgba(255, 138, 80, 0.08))",
    border: "1px solid rgba(242, 101, 34, 0.2)",
    flexShrink: 0,
  },
  statItem: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 700,
    color: "#fff",
    lineHeight: 1.2,
  },
  statLabel: {
    fontSize: 10,
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  statDivider: {
    width: 1,
    height: 28,
    background: "rgba(255,255,255,0.1)",
    flexShrink: 0,
  },

  // --- Scrollable stop list ---
  stopsList: {
    flex: 1,
    overflowY: "auto",
    padding: "8px 16px 12px",
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minHeight: 0,
  },
  walkingLabel: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "4px 0",
  },
  walkingLine: {
    flex: 1,
    height: 1,
    background: "rgba(255,255,255,0.06)",
  },
  walkingBadge: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    padding: "2px 8px",
    borderRadius: 10,
    background: "rgba(255,255,255,0.04)",
    fontSize: 10,
    color: "#888",
    whiteSpace: "nowrap",
  },

  // --- Add Stop ---
  addStopBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: "10px 16px",
    borderRadius: 10,
    border: "1px dashed rgba(242, 101, 34, 0.3)",
    background: "transparent",
    color: "#F26522",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 4,
    transition: "background 0.15s ease, border-color 0.15s ease",
  },
  addStopPanel: {
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 4,
  },
  addStopHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 12px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  addStopTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: "#ccc",
  },
  addStopClose: {
    width: 22,
    height: 22,
    borderRadius: 6,
    border: "none",
    background: "rgba(255,255,255,0.06)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  searchRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 12px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  searchInput: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
    fontSize: 13,
  },
  searchResults: {
    maxHeight: 200,
    overflowY: "auto",
  },
  noResults: {
    padding: "16px 12px",
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  searchResultItem: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 12px",
    border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    background: "transparent",
    cursor: "pointer",
    textAlign: "left",
    transition: "background 0.1s ease",
  },
  searchResultInfo: {
    flex: 1,
    minWidth: 0,
  },
  searchResultName: {
    fontSize: 13,
    fontWeight: 500,
    color: "#ddd",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  searchResultMeta: {
    fontSize: 11,
    color: "#888",
    marginTop: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  // --- Footer ---
  footerActions: {
    display: "flex",
    gap: 8,
    padding: "12px 16px 16px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    flexShrink: 0,
  },
  cancelBtn: {
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "transparent",
    color: "#888",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  refineBtn: {
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "transparent",
    color: "#aaa",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  saveBtn: {
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.06)",
    color: "#ccc",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 5,
    transition: "all 0.15s ease",
  },
  startBtn: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: 8,
    border: "none",
    background: "linear-gradient(135deg, #F26522, #FF8A50)",
    color: "#fff",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    boxShadow: "0 4px 12px rgba(242, 101, 34, 0.3)",
    transition: "opacity 0.15s ease",
  },
  btnSpinner: {
    width: 14,
    height: 14,
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite",
  },
  rightPanel: {
    flex: 1,
  },
  mapContainer: {
    width: "100%",
    height: "100%",
  },
};
