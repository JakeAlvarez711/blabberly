// src/pages/PlanNight/NavigationPanel.jsx
import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import {
  MapPin, Check, CheckCircle, ChevronRight, ChevronDown, ChevronUp, X, PartyPopper,
  CornerDownRight, ArrowUp, Loader,
} from "lucide-react";
import { getWalkingDirections } from "../../data/routePlanning";
import { distanceMiles } from "../../utils/geoUtils";

const MOBILE_BREAKPOINT = 768;

/**
 * Navigation sidebar (desktop) / bottom sheet (mobile).
 *
 * Props:
 *   route, routeId, userId,
 *   onMarkVisited(stopOrder),
 *   onComplete(),
 *   onClose(),
 *   onNavigationUpdate({ routePath, userLocation, destinationLocation })
 */
export default function NavigationPanel({
  route, routeId, userId,
  onMarkVisited, onComplete, onClose,
  onNavigationUpdate,
}) {
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [visitedStops, setVisitedStops] = useState(new Set());
  const [showCelebration, setShowCelebration] = useState(false);

  // Directions
  const [directions, setDirections] = useState(null);
  const [loadingDirections, setLoadingDirections] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userLocation, setUserLocation] = useState(null);
  const [distanceRemaining, setDistanceRemaining] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);

  // Mobile collapsed state
  const [mobileCollapsed, setMobileCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT
  );

  const watchIdRef = useRef(null);
  const stops = useMemo(() => route?.stops || [], [route]);
  const currentStop = stops[currentStopIndex];
  const isLastStop = currentStopIndex === stops.length - 1;

  // Pre-compute stop locations for map overlay
  const stopLocations = useMemo(() =>
    stops.map(s => ({
      lat: s.place.location.lat,
      lng: s.place.location.lng,
      name: s.place.name,
    })),
    [stops]
  );

  // Send initial stop locations to map on mount
  const hasInitOverlay = useRef(false);
  useEffect(() => {
    if (!hasInitOverlay.current && stopLocations.length > 0) {
      hasInitOverlay.current = true;
      onNavigationUpdate?.({
        currentPath: [],
        userLocation: null,
        currentStopIndex: 0,
        visitedStopIndices: [],
        stops: stopLocations,
      });
    }
  }, [stopLocations, onNavigationUpdate]);

  // --- Responsive ---
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- GPS tracking ---
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {}
    );
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {},
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );
    return () => {
      if (watchIdRef.current != null) navigator.geolocation.clearWatch(watchIdRef.current);
    };
  }, []);

  // --- Fetch directions ---
  const fetchDirections = useCallback(async () => {
    if (!currentStop) return;
    const dest = currentStop.place.location;
    let origin;
    if (userLocation) {
      origin = userLocation;
    } else if (currentStopIndex > 0) {
      origin = stops[currentStopIndex - 1].place.location;
    } else {
      return;
    }

    setLoadingDirections(true);
    try {
      const result = await getWalkingDirections(origin, dest);
      if (result) {
        setDirections(result);
        setCurrentStepIndex(0);
        setDistanceRemaining(result.distance);
        setTimeRemaining(result.duration);
        onNavigationUpdate?.((prev) => prev ? ({
          ...prev,
          currentPath: result.path || [],
          userLocation: origin,
        }) : null);
      }
    } catch {
      // silent
    } finally {
      setLoadingDirections(false);
    }
  }, [currentStop, currentStopIndex, stops, userLocation, onNavigationUpdate]);

  const hasFetchedForStop = useRef(-1);
  useEffect(() => {
    if (hasFetchedForStop.current !== currentStopIndex) {
      hasFetchedForStop.current = currentStopIndex;
      fetchDirections();
    }
  }, [currentStopIndex, fetchDirections]);

  const hasInitialFetch = useRef(false);
  useEffect(() => {
    if (userLocation && !hasInitialFetch.current && currentStopIndex === 0) {
      hasInitialFetch.current = true;
      fetchDirections();
    }
  }, [userLocation, currentStopIndex, fetchDirections]);

  // --- Track closest step ---
  useEffect(() => {
    if (!userLocation || !directions?.steps?.length) return;
    const stepsArr = directions.steps;
    let closestIdx = 0;
    let closestDist = Infinity;
    for (let i = 0; i < stepsArr.length; i++) {
      const stepEnd = stepsArr[i].end_location;
      const d = distanceMiles(userLocation.lat, userLocation.lng, stepEnd.lat(), stepEnd.lng());
      if (d < closestDist) { closestDist = d; closestIdx = i; }
    }
    if (closestIdx >= currentStepIndex) setCurrentStepIndex(closestIdx);

    if (currentStop) {
      const dest = currentStop.place.location;
      const remaining = distanceMiles(userLocation.lat, userLocation.lng, dest.lat, dest.lng);
      setDistanceRemaining(remaining < 0.1 ? "Nearby" : `${remaining.toFixed(1)} mi`);
      const walkMins = Math.round((remaining / 3) * 60);
      setTimeRemaining(walkMins <= 1 ? "1 min" : `${walkMins} min`);
    }
    onNavigationUpdate?.((prev) => prev ? { ...prev, userLocation } : null);
  }, [userLocation, directions, currentStepIndex, currentStop, onNavigationUpdate]);

  // --- Actions ---
  const handleImHere = useCallback(() => {
    if (!currentStop) return;
    const newVisited = new Set(visitedStops);
    newVisited.add(currentStopIndex);
    setVisitedStops(newVisited);
    onMarkVisited?.(currentStop.order);
    setShowCelebration(true);
    setDirections(null);
    // Update map overlay with visited status
    onNavigationUpdate?.((prev) => prev ? ({
      ...prev,
      visitedStopIndices: [...newVisited],
      currentPath: [],
    }) : null);
    setTimeout(() => setShowCelebration(false), 2500);
    if (isLastStop) {
      // Hand off to completion modal — pass visited count
      setTimeout(() => onComplete?.(newVisited.size), 2500);
    }
  }, [currentStop, currentStopIndex, visitedStops, isLastStop, onMarkVisited, onComplete, onNavigationUpdate]);

  const handleNextStop = useCallback(() => {
    if (currentStopIndex < stops.length - 1) {
      const nextIndex = currentStopIndex + 1;
      setCurrentStopIndex(nextIndex);
      setDirections(null);
      setCurrentStepIndex(0);
      // Update map overlay — advance stop, clear old path
      onNavigationUpdate?.((prev) => prev ? ({
        ...prev,
        currentStopIndex: nextIndex,
        currentPath: [],
      }) : null);
    }
  }, [currentStopIndex, stops.length, onNavigationUpdate]);

  const handleClose = useCallback(() => {
    onNavigationUpdate?.(null);
    onClose();
  }, [onNavigationUpdate, onClose]);

  function stripHtml(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  }

  // --- Shared content renderer ---
  const currentStepObj = directions?.steps?.[currentStepIndex];
  const nextStepObj = directions?.steps?.[currentStepIndex + 1];
  const hasDirections = directions?.steps?.length > 0;
  const isAtStop = visitedStops.has(currentStopIndex);

  // Choose panel style based on viewport
  const panelStyle = isMobile
    ? { ...s.mobilePanel, ...(mobileCollapsed ? s.mobilePanelCollapsed : {}) }
    : s.desktopPanel;

  if (!currentStop) return null;

  return (
    <div style={panelStyle}>
      {/* Mobile drag handle */}
      {isMobile && (
        <button
          onClick={() => setMobileCollapsed(!mobileCollapsed)}
          style={s.mobileHandle}
        >
          {mobileCollapsed ? <ChevronUp size={18} color="#888" /> : <ChevronDown size={18} color="#888" />}
        </button>
      )}

      {/* Header row: Back + Close */}
      <div style={s.headerRow}>
        <div style={s.headerLeft}>
          <div style={s.stopBadge}>{currentStopIndex + 1}</div>
          <div style={s.stopLabel}>Stop {currentStopIndex + 1} of {stops.length}</div>
        </div>
        <button onClick={handleClose} style={s.closeBtn}>
          <X size={16} color="#888" />
        </button>
      </div>

      {/* Stop progress: ✓ ─── ● ─── ○ */}
      <div style={s.progressRow}>
        {stops.map((_, i) => {
          const isVisited = visitedStops.has(i);
          const isCurrent = i === currentStopIndex && !isVisited;
          return [
            i > 0 && (
              <div
                key={`line-${i}`}
                style={{
                  ...s.progressLine,
                  background: visitedStops.has(i - 1) ? "#4CAF50" : "rgba(255,255,255,0.1)",
                }}
              />
            ),
            <div
              key={`dot-${i}`}
              style={{
                ...s.progressCircle,
                background: isVisited ? "#4CAF50" : isCurrent ? "#F26522" : "transparent",
                borderColor: isVisited ? "#4CAF50" : isCurrent ? "#F26522" : "rgba(255,255,255,0.2)",
              }}
            >
              {isVisited ? (
                <Check size={13} color="#fff" strokeWidth={3} />
              ) : (
                <span style={{ fontSize: 11, fontWeight: 700, color: isCurrent ? "#fff" : "#555" }}>
                  {i + 1}
                </span>
              )}
            </div>,
          ];
        }).flat().filter(Boolean)}
      </div>

      {/* Stop name + distance */}
      <div style={s.stopSection}>
        <div style={s.stopName}>{currentStop.place.name}</div>
        {!isAtStop && distanceRemaining && (
          <div style={s.distanceRow}>
            <span style={s.distanceValue}>{distanceRemaining}</span>
            <span style={s.distanceDot}>&middot;</span>
            <span style={s.distanceTime}>{timeRemaining} walk</span>
          </div>
        )}
      </div>

      {/* Celebration */}
      {showCelebration && (
        <div style={s.celebration}>
          <PartyPopper size={20} color="#F26522" />
          <span style={s.celebrationText}>Enjoy {currentStop.place.name}!</span>
        </div>
      )}

      {/* Directions — only show when not collapsed on mobile */}
      {!(isMobile && mobileCollapsed) && (
        <>
          {!isAtStop && (
            <div style={s.directionsSection}>
              {loadingDirections ? (
                <div style={s.loadingRow}>
                  <Loader size={14} color="#888" style={{ animation: "spin 1s linear infinite" }} />
                  <span style={s.loadingText}>Getting directions...</span>
                </div>
              ) : hasDirections ? (
                <>
                  {/* Current step — highlighted */}
                  <div style={s.currentStep}>
                    <div style={s.currentStepIcon}>
                      <ArrowUp size={16} color="#F26522" />
                    </div>
                    <div style={s.currentStepContent}>
                      <div style={s.currentStepText}>
                        {stripHtml(currentStepObj?.instructions || "Head to destination")}
                      </div>
                      {currentStepObj?.distance?.text && (
                        <div style={s.currentStepDist}>{currentStepObj.distance.text}</div>
                      )}
                    </div>
                  </div>

                  {/* Next step preview */}
                  {nextStepObj && (
                    <div style={s.nextStep}>
                      <CornerDownRight size={13} color="#666" />
                      <span style={s.nextStepText}>
                        Next: {stripHtml(nextStepObj.instructions)}
                      </span>
                    </div>
                  )}

                  {/* All steps */}
                  {directions.steps.length > 2 && (
                    <>
                      <div style={s.allStepsLabel}>ALL STEPS</div>
                      <div style={s.stepsList}>
                        {directions.steps.map((step, i) => {
                          const isPast = i < currentStepIndex;
                          const isCurrent = i === currentStepIndex;
                          return (
                            <div
                              key={i}
                              style={{
                                ...s.stepItem,
                                opacity: isPast ? 0.35 : 1,
                                borderLeftColor: isCurrent
                                  ? "#F26522"
                                  : isPast
                                  ? "#333"
                                  : "rgba(255,255,255,0.08)",
                              }}
                            >
                              <div style={s.stepIndex}>{i + 1}</div>
                              <div style={s.stepContent}>
                                <span style={{
                                  ...s.stepText,
                                  color: isCurrent ? "#fff" : "#aaa",
                                  fontWeight: isCurrent ? 600 : 400,
                                }}>
                                  {stripHtml(step.instructions)}
                                </span>
                                {step.distance?.text && (
                                  <span style={s.stepDist}>{step.distance.text}</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div style={s.noDirections}>
                  <MapPin size={14} color="#888" />
                  <span>{currentStop.place.address || "Carlsbad Village"}</span>
                </div>
              )}
            </div>
          )}

          {/* At-stop message */}
          {isAtStop && !isLastStop && (
            <div style={s.atStopMessage}>
              <CheckCircle size={16} color="#4CAF50" />
              <span>You're here! Tap Next Stop when ready.</span>
            </div>
          )}
        </>
      )}

      {/* Actions — always visible */}
      <div style={s.actions}>
        {!isAtStop ? (
          <button onClick={handleImHere} style={s.primaryBtn}>
            <CheckCircle size={15} />
            I'm Here
          </button>
        ) : !isLastStop ? (
          <button onClick={handleNextStop} style={s.primaryBtn}>
            Next Stop
            <ChevronRight size={15} />
          </button>
        ) : null}
        <button onClick={handleClose} style={s.secondaryBtn}>
          End Navigation
        </button>
      </div>
    </div>
  );
}

// ── Styles ──

const PANEL_BG = "rgba(15, 15, 20, 0.98)";

const s = {
  // ── Desktop: right sidebar floating over map ──
  desktopPanel: {
    position: "fixed",
    top: 75,
    right: 16,
    width: 400,
    bottom: 16,
    background: PANEL_BG,
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 8px 40px rgba(0,0,0,0.45)",
    display: "flex",
    flexDirection: "column",
    zIndex: 30,
    overflow: "hidden",
    padding: "16px 20px 20px",
  },

  // ── Mobile: bottom sheet ──
  mobilePanel: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: "60%",
    background: PANEL_BG,
    borderTop: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px 16px 0 0",
    display: "flex",
    flexDirection: "column",
    zIndex: 30,
    overflow: "hidden",
    padding: "8px 20px 20px",
    transition: "max-height 0.3s ease",
  },
  mobilePanelCollapsed: {
    maxHeight: 160,
  },
  mobileHandle: {
    alignSelf: "center",
    width: 48,
    height: 24,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  // ── Header ──
  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    flexShrink: 0,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  stopBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    background: "linear-gradient(135deg, #F26522, #FF8A50)",
    color: "#fff",
    fontSize: 13,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  stopLabel: {
    fontSize: 12,
    color: "#888",
    fontWeight: 500,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    border: "none",
    background: "rgba(255,255,255,0.06)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },

  // ── Progress indicators ──
  progressRow: {
    display: "flex",
    alignItems: "center",
    gap: 0,
    marginBottom: 14,
    flexShrink: 0,
  },
  progressCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    border: "2px solid rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.4s ease",
  },
  progressLine: {
    flex: 1,
    height: 2,
    maxWidth: 36,
    minWidth: 12,
    transition: "background 0.4s ease",
  },

  // ── Stop info ──
  stopSection: {
    marginBottom: 16,
    flexShrink: 0,
  },
  stopName: {
    fontSize: 20,
    fontWeight: 700,
    color: "#fff",
    lineHeight: 1.2,
    marginBottom: 4,
  },
  distanceRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  distanceValue: {
    fontSize: 14,
    fontWeight: 700,
    color: "#F26522",
  },
  distanceDot: {
    color: "#555",
    fontSize: 14,
  },
  distanceTime: {
    fontSize: 13,
    color: "#999",
  },

  // ── Celebration ──
  celebration: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 14px",
    borderRadius: 10,
    background: "rgba(242, 101, 34, 0.08)",
    border: "1px solid rgba(242, 101, 34, 0.2)",
    marginBottom: 12,
    flexShrink: 0,
  },
  celebrationText: {
    fontSize: 14,
    fontWeight: 600,
    color: "#F26522",
  },

  // ── Directions ──
  directionsSection: {
    flex: 1,
    minHeight: 0,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    marginBottom: 14,
  },
  loadingRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 0",
  },
  loadingText: {
    fontSize: 13,
    color: "#888",
  },
  currentStep: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    padding: "12px 14px",
    borderRadius: 10,
    background: "rgba(242, 101, 34, 0.08)",
    border: "1px solid rgba(242, 101, 34, 0.15)",
    marginBottom: 8,
    flexShrink: 0,
  },
  currentStepIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    background: "rgba(242, 101, 34, 0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  currentStepContent: {
    flex: 1,
    minWidth: 0,
  },
  currentStepText: {
    fontSize: 15,
    fontWeight: 600,
    color: "#fff",
    lineHeight: 1.3,
  },
  currentStepDist: {
    fontSize: 12,
    color: "#F26522",
    marginTop: 3,
    fontWeight: 500,
  },
  nextStep: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "4px 14px",
    marginBottom: 10,
    flexShrink: 0,
  },
  nextStepText: {
    fontSize: 12,
    color: "#888",
  },
  allStepsLabel: {
    fontSize: 10,
    fontWeight: 700,
    color: "#666",
    letterSpacing: 1,
    padding: "0 2px",
    marginBottom: 6,
    flexShrink: 0,
  },
  stepsList: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  stepItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    padding: "7px 8px 7px 10px",
    borderLeft: "2px solid rgba(255,255,255,0.08)",
    transition: "opacity 0.2s ease, border-color 0.2s ease",
  },
  stepIndex: {
    width: 18,
    height: 18,
    borderRadius: 9,
    background: "rgba(255,255,255,0.06)",
    color: "#888",
    fontSize: 10,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  stepContent: {
    flex: 1,
    minWidth: 0,
  },
  stepText: {
    fontSize: 12,
    lineHeight: 1.35,
  },
  stepDist: {
    fontSize: 10,
    color: "#666",
    marginTop: 1,
    display: "block",
  },
  noDirections: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 13,
    color: "#888",
    padding: "8px 0",
  },
  atStopMessage: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 14px",
    borderRadius: 10,
    background: "rgba(76, 175, 80, 0.08)",
    border: "1px solid rgba(76, 175, 80, 0.15)",
    fontSize: 13,
    color: "#aaa",
    marginBottom: 14,
    flexShrink: 0,
  },

  // ── Actions ──
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    flexShrink: 0,
  },
  primaryBtn: {
    width: "100%",
    padding: "13px 16px",
    borderRadius: 10,
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
  },
  secondaryBtn: {
    width: "100%",
    padding: "10px 16px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "transparent",
    color: "#888",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },

};
