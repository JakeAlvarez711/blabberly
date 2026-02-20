// src/pages/MapPage.js
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useJsApiLoader, Circle, Polyline, Marker } from "@react-google-maps/api";
import { Crosshair, MapPin as MapPinIcon } from "lucide-react";

import Header from "../components/Layout/Header";
import Sidebar from "../components/Layout/Sidebar";
import MapContainer from "../components/map/MapContainer";
import LayerToggle from "../components/map/LayerToggle";
import PostPin from "../components/map/PostPin";
import PlacePin from "../components/map/PlacePin";
import HeatmapLayer from "../components/map/HeatmapLayer";
import PostPreviewCard from "../components/map/PostPreviewCard";
import PlacePreviewCard from "../components/map/PlacePreviewCard";
import FriendsBar from "../components/map/FriendsBar";
import PlanMyNightFAB from "../components/map/PlanMyNightFAB";
import QuickFilters, { DEFAULT_FILTERS, applyFilters } from "../components/map/QuickFilters";
import PlanNightModal from "./PlanNight/PlanNightModal";
import NavigationPanel from "./PlanNight/NavigationPanel";
import RouteCompletionModal from "./PlanNight/RouteCompletionModal";
import RoutesList from "../components/routes/RoutesList";
import { useAuth } from "../hooks/useAuth";
import { useMapPosts } from "../hooks/useMapPosts";
import { tasteMatchScore, clusterPlaces } from "../utils/mapAlgorithms";
import { getFollowingIds } from "../data/followService";
import { getPublicUser } from "../data/userService";
import { markStopVisited } from "../data/routeService";

const LIBRARIES = ["visualization", "places"];

// --- Carlsbad Village geo constants ---
const VILLAGE_CENTER = { lat: 33.1581, lng: -117.3506 };
const VILLAGE_RADIUS_M = 2414; // 1.5 miles in meters
const VILLAGE_BOUNDS = {
  north: 33.170,
  south: 33.145,
  east: -117.330,
  west: -117.370,
};

const PLACE_TYPES = [
  "restaurant", "bar", "cafe", "night_club",
  "bakery", "meal_takeaway", "meal_delivery",
];

// Boundary circle styling
const BOUNDARY_CIRCLE_OPTIONS = {
  strokeColor: "#F26522",
  strokeOpacity: 0.3,
  strokeWeight: 2,
  fillColor: "#F26522",
  fillOpacity: 0.03,
  clickable: false,
};

// Route segment polyline options
const COMPLETED_LINE_OPTS = {
  strokeColor: "#4CAF50",
  strokeOpacity: 0.75,
  strokeWeight: 3,
  zIndex: 4,
};
const CURRENT_LINE_OPTS = {
  strokeColor: "#F26522",
  strokeOpacity: 0.9,
  strokeWeight: 5,
  zIndex: 6,
};
const FUTURE_LINE_OPTS = {
  strokeOpacity: 0,
  icons: [{
    icon: {
      path: "M 0,-1 0,1",
      strokeOpacity: 0.5,
      strokeColor: "#777",
      scale: 2,
    },
    offset: "0",
    repeat: "12px",
  }],
  zIndex: 3,
};

/** Check if a lat/lng is within the Village bounds */
function isInVillageBounds(lat, lng) {
  return (
    lat >= VILLAGE_BOUNDS.south &&
    lat <= VILLAGE_BOUNDS.north &&
    lng >= VILLAGE_BOUNDS.west &&
    lng <= VILLAGE_BOUNDS.east
  );
}

/** Haversine distance in miles */
function distanceMiles(lat1, lng1, lat2, lng2) {
  const R = 3958.8; // Earth radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function MapPage() {
  const { userDoc, uid } = useAuth();
  const [activeLayer, setActiveLayer] = useState("places");
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [toast, setToast] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [followingIds, setFollowingIds] = useState([]);
  const [authorProfiles, setAuthorProfiles] = useState({});
  const placesCacheRef = useRef(new Map());
  const loadedAuthorsRef = useRef(new Set());
  const placesLoadingRef = useRef(false);

  // --- Plan My Night state ---
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [activeRoute, setActiveRoute] = useState(null);  // route currently being navigated
  const [activeRouteId, setActiveRouteId] = useState(null);
  const [navOverlay, setNavOverlay] = useState(null);    // { routePath, userLocation, destinationLocation }
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completionVisitedCount, setCompletionVisitedCount] = useState(0);

  // Whether we're in active navigation mode (hides non-route pins)
  const isNavigating = !!activeRoute;
  const prevNavStopRef = useRef(-1);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  // Stable reference — only changes when isLoaded flips from false→true
  const mapsApi = useMemo(
    () => (isLoaded ? { maps: window.google.maps } : null),
    [isLoaded]
  );
  const city = userDoc?.homeCity || "Carlsbad";
  const { posts, heatmapData, loading } = useMapPosts(city, mapsApi);

  // Build user taste profile from userDoc
  const userTasteProfile = useMemo(() => {
    if (!userDoc) return null;
    return {
      tastePrefs: userDoc.tastePrefs || [],
      fineTune: userDoc.fineTune || {},
    };
  }, [userDoc]);

  // Load following IDs for social proof
  useEffect(() => {
    if (!uid) return;
    getFollowingIds(uid).then(setFollowingIds);
  }, [uid]);

  // Load author profiles for post pins (avatars)
  useEffect(() => {
    if (!posts || posts.length === 0) return;
    const newAuthorIds = [
      ...new Set(posts.map((p) => p.authorId).filter(Boolean)),
    ].filter((id) => !loadedAuthorsRef.current.has(id));

    if (newAuthorIds.length === 0) return;
    for (const id of newAuthorIds) loadedAuthorsRef.current.add(id);

    Promise.all(
      newAuthorIds.map(async (id) => {
        const profile = await getPublicUser(id);
        return [id, profile];
      })
    ).then((results) => {
      setAuthorProfiles((prev) => {
        const next = { ...prev };
        for (const [id, profile] of results) {
          if (profile) next[id] = profile;
        }
        return next;
      });
    });
  }, [posts]);

  // --- Dynamic viewport-based places loading with pagination ---
  // Always search from Village center with fixed radius
  const loadPlacesForViewport = useCallback(() => {
    if (!mapInstance || !isLoaded) return;
    if (placesLoadingRef.current) return;

    const cacheKey = "carlsbad_village";
    if (placesCacheRef.current.has(cacheKey)) {
      setNearbyPlaces(placesCacheRef.current.get(cacheKey));
      return;
    }

    placesLoadingRef.current = true;
    const service = new window.google.maps.places.PlacesService(mapInstance);

    const allResults = new Map();
    let completed = 0;

    function collectPage(results) {
      if (results) {
        for (const place of results) {
          // Filter to only include places within Village bounds
          const lat = place.geometry?.location?.lat();
          const lng = place.geometry?.location?.lng();
          if (typeof lat === "number" && isInVillageBounds(lat, lng)) {
            if (!allResults.has(place.place_id)) {
              allResults.set(place.place_id, place);
            }
          }
        }
      }
    }

    function handleResponse(results, status, pagination) {
      const OK = window.google.maps.places.PlacesServiceStatus.OK;
      if (status === OK) {
        collectPage(results);
        if (pagination?.hasNextPage) {
          setTimeout(() => pagination.nextPage(), 300);
          return;
        }
      }
      completed++;
      if (completed === PLACE_TYPES.length) {
        const combined = Array.from(allResults.values());
        placesCacheRef.current.set(cacheKey, combined);
        setNearbyPlaces(combined);
        placesLoadingRef.current = false;
      }
    }

    for (let i = 0; i < PLACE_TYPES.length; i++) {
      service.nearbySearch(
        { location: VILLAGE_CENTER, radius: VILLAGE_RADIUS_M, type: PLACE_TYPES[i] },
        (results, status, pagination) => handleResponse(results, status, pagination)
      );
    }
  }, [mapInstance, isLoaded]);

  useEffect(() => { loadPlacesForViewport(); }, [bounds, loadPlacesForViewport]);
  useEffect(() => {
    if (activeLayer === "places" || activeLayer === "routes") loadPlacesForViewport();
  }, [activeLayer, loadPlacesForViewport]);

  // --- Compute taste match scores ---
  const scoredPlaces = useMemo(() => {
    return nearbyPlaces.map((place) => {
      const match = tasteMatchScore(place, userTasteProfile);
      return { ...place, _matchScore: match.score, _matchTier: match.tier, _matchInfo: match };
    });
  }, [nearbyPlaces, userTasteProfile]);

  // --- Apply filters ---
  const filteredPlaces = useMemo(() => {
    return applyFilters(scoredPlaces, filters);
  }, [scoredPlaces, filters]);

  // --- Cluster places based on zoom ---
  const clusteredPlaces = useMemo(() => {
    const zoom = mapInstance?.getZoom?.() || 15;
    return clusterPlaces(filteredPlaces, zoom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredPlaces, bounds, mapInstance]);

  // --- Count friends who posted about a given place ---
  const friendPostCount = useCallback(
    (placeName) => {
      if (!placeName || followingIds.length === 0) return 0;
      const lower = placeName.toLowerCase();
      return posts.filter(
        (p) => p.restaurant?.toLowerCase() === lower && followingIds.includes(p.authorId)
      ).length;
    },
    [posts, followingIds]
  );

  // --- Distance from Village center for a place ---
  const getDistanceLabel = useCallback((place) => {
    const lat = place.geometry?.location?.lat();
    const lng = place.geometry?.location?.lng();
    if (typeof lat !== "number") return null;
    const dist = distanceMiles(VILLAGE_CENTER.lat, VILLAGE_CENTER.lng, lat, lng);
    if (dist < 0.1) return "In the heart of the Village";
    return `${dist.toFixed(1)} mi from Village center`;
  }, []);

  // Simple grid-based clustering for post pins
  const clusteredPosts = clusterPosts(posts, bounds, mapInstance);

  const handleMapLoad = useCallback((map) => { setMapInstance(map); }, []);
  const handleBoundsChanged = useCallback((newBounds) => { setBounds(newBounds); }, []);

  const handlePostClick = useCallback((post) => {
    setSelectedPlace(null);
    setSelectedPost(post);
  }, []);

  const handlePlaceClick = useCallback((place) => {
    setSelectedPost(null);
    setSelectedPlace(place);
  }, []);

  const handleRecenter = useCallback(() => {
    if (!mapInstance) return;
    mapInstance.panTo(VILLAGE_CENTER);
    mapInstance.setZoom(15);
  }, [mapInstance]);

  const handleFriendClick = useCallback(
    (friendPosts) => {
      if (!mapInstance || !friendPosts || friendPosts.length === 0) return;
      const latest = friendPosts[0];
      if (latest.lat && latest.lng) {
        mapInstance.panTo({ lat: latest.lat, lng: latest.lng });
        mapInstance.setZoom(16);
      }
    },
    [mapInstance]
  );

  const handleClusterClick = useCallback((cluster) => {
    if (!mapInstance) return;
    mapInstance.panTo({ lat: cluster.lat, lng: cluster.lng });
    const currentZoom = mapInstance.getZoom() || 15;
    mapInstance.setZoom(Math.min(currentZoom + 2, 18));
  }, [mapInstance]);

  // --- Plan My Night handlers ---
  const handleShowToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handlePlanMyNight = useCallback(() => {
    setShowPlanModal(true);
  }, []);

  const handleStartNavigation = useCallback((route, routeId) => {
    setActiveRoute(route);
    setActiveRouteId(routeId);
    setShowPlanModal(false);
  }, []);

  const handleMarkStopVisited = useCallback((stopOrder) => {
    if (!uid || !activeRouteId) return;
    markStopVisited(uid, activeRouteId, stopOrder);
  }, [uid, activeRouteId]);

  const handleNavigationComplete = useCallback((visitedCount) => {
    // Don't mark completed yet — show completion modal for ratings/sharing
    setCompletionVisitedCount(visitedCount || activeRoute?.stops?.length || 0);
    setShowCompletionModal(true);
  }, [activeRoute]);

  const handleNavigationUpdate = useCallback((update) => {
    if (typeof update === "function") {
      setNavOverlay((prev) => update(prev));
    } else {
      setNavOverlay(update);
    }
  }, []);

  const handleCloseNavigation = useCallback(() => {
    setActiveRoute(null);
    setActiveRouteId(null);
    setNavOverlay(null);
  }, []);

  const handleCloseCompletion = useCallback(() => {
    setShowCompletionModal(false);
    setActiveRoute(null);
    setActiveRouteId(null);
    setNavOverlay(null);
    prevNavStopRef.current = -1;
  }, []);

  // Pan map to current segment when stop advances
  useEffect(() => {
    if (!mapInstance || !navOverlay?.stops?.length) return;
    const csi = navOverlay.currentStopIndex ?? 0;
    if (csi !== prevNavStopRef.current) {
      prevNavStopRef.current = csi;
      const targetStop = navOverlay.stops[csi];
      if (targetStop) {
        mapInstance.panTo(targetStop);
        mapInstance.setZoom(16);
      }
    }
  }, [mapInstance, navOverlay]);

  // Build route segment data for multi-color polylines
  const routeSegments = useMemo(() => {
    if (!navOverlay?.stops || navOverlay.stops.length < 2) return [];
    const csi = navOverlay.currentStopIndex ?? 0;
    const segs = [];
    for (let i = 0; i < navOverlay.stops.length - 1; i++) {
      const destIdx = i + 1;
      if (destIdx < csi) {
        segs.push({
          key: `completed-${i}`,
          path: [navOverlay.stops[i], navOverlay.stops[i + 1]],
          options: COMPLETED_LINE_OPTS,
        });
      } else if (destIdx > csi) {
        segs.push({
          key: `future-${i}`,
          path: [navOverlay.stops[i], navOverlay.stops[i + 1]],
          options: FUTURE_LINE_OPTS,
        });
      }
      // destIdx === csi → skip, rendered by currentPath below
    }
    return segs;
  }, [navOverlay]);

  // Routes tab: view a saved route in the preview modal
  const handleViewRoute = useCallback((route) => {
    // Start navigation for saved route
    setActiveRoute(route);
    setActiveRouteId(route.id);
  }, []);

  // Routes tab: start a saved route
  const handleStartSavedRoute = useCallback((route) => {
    setActiveRoute(route);
    setActiveRouteId(route.id);
    setActiveLayer("routes");
  }, []);

  if (!isLoaded) {
    return (
      <div style={styles.page}>
        <Header />
        <Sidebar userDoc={userDoc} />
        <div style={styles.mapArea}>
          <div style={styles.loadingContainer}>
            <div style={styles.spinner} />
            <div style={styles.loadingText}>Loading map...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Header />
      <Sidebar userDoc={userDoc} />
      <div style={styles.mapArea}>
        <MapContainer
          center={VILLAGE_CENTER}
          zoom={15}
          restriction={VILLAGE_BOUNDS}
          onBoundsChanged={handleBoundsChanged}
          onMapLoad={handleMapLoad}
        >
          {/* Visual boundary circle */}
          <Circle
            center={VILLAGE_CENTER}
            radius={VILLAGE_RADIUS_M}
            options={BOUNDARY_CIRCLE_OPTIONS}
          />

          {/* Post pins (hidden during navigation) */}
          {!isNavigating && activeLayer === "posts" &&
            clusteredPosts.map((cluster) => (
              <PostPin
                key={cluster.key}
                cluster={cluster}
                authorProfiles={authorProfiles}
                onClick={() => handlePostClick(cluster.posts[0])}
              />
            ))}

          {/* Heatmap (hidden during navigation) */}
          {!isNavigating && activeLayer === "heatmap" && (
            <HeatmapLayer data={heatmapData} />
          )}

          {/* Google Places pins (hidden during navigation) */}
          {!isNavigating && activeLayer === "places" &&
            clusteredPlaces.map((cluster) =>
              cluster.count > 1 ? (
                <PlacePin
                  key={cluster.key}
                  place={{ lat: cluster.lat, lng: cluster.lng, geometry: { location: { lat: () => cluster.lat, lng: () => cluster.lng } } }}
                  isCluster
                  clusterCount={cluster.count}
                  clusterTier={cluster.dominantTier}
                  onClick={() => handleClusterClick(cluster)}
                />
              ) : (
                <PlacePin
                  key={cluster.key}
                  place={cluster.places[0]}
                  matchTier={cluster.places[0]._matchTier}
                  onClick={() => handlePlaceClick(cluster.places[0])}
                />
              )
            )}

          {/* Navigation overlay — multi-segment route lines */}
          {routeSegments.map((seg) => (
            <Polyline key={seg.key} path={seg.path} options={seg.options} />
          ))}
          {/* Current segment (from Google Directions) */}
          {navOverlay?.currentPath?.length >= 2 && (
            <Polyline path={navOverlay.currentPath} options={CURRENT_LINE_OPTS} />
          )}

          {/* Numbered route stop markers */}
          {navOverlay?.stops?.map((stop, i) => {
            const visited = navOverlay.visitedStopIndices || [];
            const isVisited = visited.includes(i);
            const isCurrent = i === (navOverlay.currentStopIndex ?? 0);
            return (
              <Marker
                key={`route-stop-${i}`}
                position={stop}
                label={{
                  text: isVisited ? "\u2713" : String(i + 1),
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
                icon={
                  window.google?.maps
                    ? {
                        path: window.google.maps.SymbolPath.CIRCLE,
                        scale: 16,
                        fillColor: isVisited ? "#4CAF50" : isCurrent ? "#F26522" : "#666",
                        fillOpacity: 1,
                        strokeColor: "#fff",
                        strokeWeight: 2,
                      }
                    : undefined
                }
                zIndex={isCurrent ? 9 : 7}
              />
            );
          })}

          {/* User location blue dot */}
          {navOverlay?.userLocation && (
            <Marker
              position={navOverlay.userLocation}
              icon={
                window.google?.maps
                  ? {
                      path: window.google.maps.SymbolPath.CIRCLE,
                      scale: 8,
                      fillColor: "#4285F4",
                      fillOpacity: 1,
                      strokeColor: "#fff",
                      strokeWeight: 2,
                    }
                  : undefined
              }
              zIndex={10}
            />
          )}
        </MapContainer>

        {/* Location banner */}
        <div style={styles.banner}>
          <MapPinIcon size={13} color="#F26522" />
          <span>Currently available in <strong>Carlsbad Village</strong></span>
        </div>

        {/* Layer toggle (hidden during navigation) */}
        {!isNavigating && <LayerToggle active={activeLayer} onChange={setActiveLayer} />}

        {/* Quick filters (only on places layer, hidden during navigation) */}
        {!isNavigating && activeLayer === "places" && (
          <QuickFilters
            filters={filters}
            onChange={setFilters}
            visibleCount={filteredPlaces.length}
            totalCount={scoredPlaces.length}
          />
        )}

        {/* Routes list (on routes layer, hidden during navigation) */}
        {!isNavigating && activeLayer === "routes" && (
          <RoutesList
            userId={uid}
            onPlanNew={handlePlanMyNight}
            onViewRoute={handleViewRoute}
            onStartRoute={handleStartSavedRoute}
          />
        )}

        {/* Friends bar (hidden during navigation) */}
        {!isNavigating && (
          <FriendsBar
            uid={uid}
            posts={posts}
            city={city}
            onFriendClick={handleFriendClick}
          />
        )}

        {/* Recenter button */}
        <button onClick={handleRecenter} style={styles.recenterBtn}>
          <Crosshair size={20} color="#333" />
        </button>

        {/* Preview cards (hidden during navigation) */}
        {!isNavigating && selectedPost && (
          <PostPreviewCard
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        )}
        {!isNavigating && selectedPlace && (
          <PlacePreviewCard
            place={selectedPlace}
            postCount={
              posts.filter(
                (p) =>
                  p.restaurant?.toLowerCase() ===
                  selectedPlace.name?.toLowerCase()
              ).length
            }
            matchInfo={selectedPlace._matchInfo}
            friendCount={friendPostCount(selectedPlace.name)}
            distanceLabel={getDistanceLabel(selectedPlace)}
            onClose={() => setSelectedPlace(null)}
          />
        )}

        {/* Plan My Night FAB */}
        {!activeRoute && <PlanMyNightFAB onClick={handlePlanMyNight} />}

        {/* Navigation Panel (active route, hidden during completion modal) */}
        {activeRoute && !showCompletionModal && (
          <NavigationPanel
            route={activeRoute}
            routeId={activeRouteId}
            userId={uid}
            onMarkVisited={handleMarkStopVisited}
            onComplete={handleNavigationComplete}
            onClose={handleCloseNavigation}
            onNavigationUpdate={handleNavigationUpdate}
          />
        )}

        {/* Toast */}
        {toast && <div style={styles.toast}>{toast}</div>}

        {/* Loading overlay */}
        {loading && (
          <div style={styles.loadingOverlay}>
            <div style={styles.spinner} />
          </div>
        )}
      </div>

      {/* Plan My Night Modal (rendered outside mapArea for proper z-index) */}
      <PlanNightModal
        isOpen={showPlanModal}
        onClose={() => setShowPlanModal(false)}
        places={nearbyPlaces}
        posts={posts}
        userProfile={userTasteProfile}
        userId={uid}
        onStartNavigation={handleStartNavigation}
        onShowToast={handleShowToast}
      />

      {/* Route Completion Modal (celebration → rate → share) */}
      <RouteCompletionModal
        isOpen={showCompletionModal}
        onClose={handleCloseCompletion}
        route={activeRoute}
        routeId={activeRouteId}
        userId={uid}
        visitedCount={completionVisitedCount}
        onShowToast={handleShowToast}
      />
    </div>
  );
}

/* ---------------------------------
   Simple grid-based clustering for POST pins.
---------------------------------- */
function clusterPosts(posts, bounds, mapInstance) {
  if (!posts || posts.length === 0) return [];
  if (!bounds || !mapInstance) {
    return posts.map((p) => ({
      key: p._docId,
      lat: p.lat,
      lng: p.lng,
      posts: [p],
      count: 1,
    }));
  }

  const zoom = mapInstance.getZoom?.() || 15;
  if (zoom >= 16) {
    return posts.map((p) => ({
      key: p._docId,
      lat: p.lat,
      lng: p.lng,
      posts: [p],
      count: 1,
    }));
  }

  const gridSize = zoom <= 12 ? 0.02 : 0.005;
  const grid = new Map();

  for (const p of posts) {
    const gx = Math.floor(p.lat / gridSize);
    const gy = Math.floor(p.lng / gridSize);
    const key = `${gx}_${gy}`;
    if (!grid.has(key)) grid.set(key, { posts: [], latSum: 0, lngSum: 0 });
    const cell = grid.get(key);
    cell.posts.push(p);
    cell.latSum += p.lat;
    cell.lngSum += p.lng;
  }

  return Array.from(grid.entries()).map(([key, cell]) => ({
    key,
    lat: cell.latSum / cell.posts.length,
    lng: cell.lngSum / cell.posts.length,
    posts: cell.posts,
    count: cell.posts.length,
  }));
}

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
  },
  mapArea: {
    position: "fixed",
    top: 65,
    left: 240,
    right: 0,
    bottom: 0,
  },
  banner: {
    position: "absolute",
    bottom: 16,
    left: 16,
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(255,255,255,0.95)",
    borderRadius: 8,
    padding: "6px 12px",
    fontSize: 12,
    color: "#666",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    zIndex: 10,
  },
  recenterBtn: {
    position: "absolute",
    top: 12,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 8,
    border: "none",
    background: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: "#666",
  },
  loadingOverlay: {
    position: "absolute",
    top: 12,
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(255,255,255,0.9)",
    borderRadius: 8,
    padding: "8px 16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    zIndex: 15,
  },
  spinner: {
    width: 24,
    height: 24,
    border: "3px solid #eee",
    borderTopColor: "#F26522",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  toast: {
    position: "absolute",
    bottom: 100,
    left: "50%",
    transform: "translateX(-50%)",
    background: "#333",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    zIndex: 20,
    whiteSpace: "nowrap",
  },
};

export default MapPage;
