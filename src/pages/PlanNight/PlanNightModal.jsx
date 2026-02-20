// src/pages/PlanNight/PlanNightModal.jsx
import { useState, useCallback } from "react";
import { X } from "lucide-react";
import PreferencesStep from "./PreferencesStep";
import RoutePreview from "./RoutePreview";
import { generateRoute, enrichRouteWithDirections, generateRouteName } from "../../data/routePlanning";
import { saveRoute } from "../../data/routeService";

/**
 * Main Plan My Night modal.
 *
 * Props:
 *   - isOpen: boolean
 *   - onClose: () => void
 *   - places: Google Places results array
 *   - posts: Blabberly posts array
 *   - userProfile: { tastePrefs, fineTune }
 *   - userId: string
 *   - onStartNavigation: (route, routeId) => void — triggers navigation mode in MapPage
 *   - onShowToast: (message) => void — show a toast on the map
 */
export default function PlanNightModal({
  isOpen,
  onClose,
  places,
  posts,
  userProfile,
  userId,
  onStartNavigation,
  onShowToast,
}) {
  const [step, setStep] = useState("preferences"); // "preferences" | "preview" | "loading"
  const [route, setRoute] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = useCallback(
    async (preferences) => {
      setStep("loading");
      setError(null);

      try {
        const result = await generateRoute({
          places,
          userProfile,
          preferences,
          posts,
          specificJourney: preferences.specificJourney,
          stopTypes: preferences.stopTypes,
        });

        if (!result || result.stops.length === 0) {
          setError("We couldn't find enough places matching your preferences. Try adjusting your vibe settings.");
          setStep("preferences");
          return;
        }

        // Try to enrich with Google Walking Directions
        const enriched = await enrichRouteWithDirections(result);

        const finalRoute = {
          ...enriched,
          name: generateRouteName(preferences),
        };

        setRoute(finalRoute);
        setStep("preview");
      } catch (err) {
        console.error("Route generation error:", err);
        setError("Something went wrong. Please try again.");
        setStep("preferences");
      }
    },
    [places, userProfile, posts]
  );

  const handleBack = useCallback(() => {
    setStep("preferences");
  }, []);

  const handleStartNight = useCallback(
    async (finalRoute) => {
      const routeId = await saveRoute(userId, {
        ...finalRoute,
        status: "in_progress",
      });
      onStartNavigation?.(finalRoute, routeId);
      onClose();
      onShowToast?.("Route saved! Let's go!");
    },
    [userId, onStartNavigation, onClose, onShowToast]
  );

  const handleSaveForLater = useCallback(
    async (finalRoute) => {
      await saveRoute(userId, {
        ...finalRoute,
        status: "planned",
      });
      onShowToast?.("Route saved! Find it in the Routes tab.");
    },
    [userId, onShowToast]
  );

  const handleClose = useCallback(() => {
    setStep("preferences");
    setRoute(null);
    setError(null);
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={handleClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button onClick={handleClose} style={styles.closeBtn}>
          <X size={20} color="#888" />
        </button>

        {/* Loading state */}
        {step === "loading" && (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner} />
            <p style={styles.loadingText}>Finding the perfect spots...</p>
            <p style={styles.loadingSubtext}>Scoring places based on your taste</p>
          </div>
        )}

        {/* Step 1: Preferences */}
        {step === "preferences" && (
          <>
            {error && <div style={styles.errorBanner}>{error}</div>}
            <PreferencesStep onGenerate={handleGenerate} />
          </>
        )}

        {/* Step 2: Route Preview */}
        {step === "preview" && route && (
          <RoutePreview
            route={route}
            allPlaces={places}
            userProfile={userProfile}
            posts={posts}
            onBack={handleBack}
            onStartNight={handleStartNight}
            onSaveForLater={handleSaveForLater}
            onCancel={handleClose}
          />
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  modal: {
    position: "relative",
    width: "min(95vw, 900px)",
    height: "min(90vh, 700px)",
    background: "#111118",
    borderRadius: 16,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
  },
  closeBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    border: "none",
    background: "rgba(255,255,255,0.06)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    zIndex: 10,
    transition: "background 0.15s ease",
  },
  loadingContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  spinner: {
    width: 36,
    height: 36,
    border: "3px solid rgba(255,255,255,0.1)",
    borderTopColor: "#F26522",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadingText: {
    fontSize: 16,
    fontWeight: 600,
    color: "#fff",
    margin: 0,
  },
  loadingSubtext: {
    fontSize: 13,
    color: "#888",
    margin: 0,
  },
  errorBanner: {
    margin: "12px 24px 0",
    padding: "10px 14px",
    borderRadius: 8,
    background: "rgba(239, 68, 68, 0.15)",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    color: "#ef4444",
    fontSize: 13,
    fontWeight: 500,
  },
};
