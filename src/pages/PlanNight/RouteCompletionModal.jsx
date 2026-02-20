// src/pages/PlanNight/RouteCompletionModal.jsx
import { useState, useCallback, useEffect, useMemo } from "react";
import {
  Star, X, PartyPopper, ChevronRight, Share2, Lock, Users, Globe, Loader,
} from "lucide-react";
import { completeRoute, createRoutePost } from "../../data/routeService";

/* ─────────────────────────────────────────────
   Interactive half-star rating component
   ───────────────────────────────────────────── */
function StarRating({ value = 0, onChange }) {
  const [hoverValue, setHoverValue] = useState(0);
  const displayValue = hoverValue || value;

  return (
    <div
      style={starStyles.row}
      onMouseLeave={() => setHoverValue(0)}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const fillAmount = Math.max(0, Math.min(1, displayValue - (star - 1)));

        return (
          <div key={star} style={starStyles.starWrapper}>
            {/* Visual layer — pointerEvents: none so SVGs don't steal clicks */}
            <div style={starStyles.starVisual}>
              <Star size={28} color="#333" fill="none" strokeWidth={1.5} />
              {fillAmount > 0 && (
                <div style={{ ...starStyles.fillClip, width: `${fillAmount * 100}%` }}>
                  <Star size={28} color="#F26522" fill="#F26522" strokeWidth={1.5} />
                </div>
              )}
            </div>
            {/* Hit targets — real buttons that sit on top */}
            <button
              type="button"
              style={starStyles.hitLeft}
              onClick={() => onChange(star - 0.5)}
              onMouseEnter={() => setHoverValue(star - 0.5)}
            />
            <button
              type="button"
              style={starStyles.hitRight}
              onClick={() => onChange(star)}
              onMouseEnter={() => setHoverValue(star)}
            />
          </div>
        );
      })}

      {/* Rating label */}
      {displayValue > 0 && (
        <span style={starStyles.label}>{displayValue.toFixed(1)}</span>
      )}
    </div>
  );
}

const starStyles = {
  row: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    marginBottom: 10,
    padding: "4px 0",
  },
  starWrapper: {
    position: "relative",
    width: 28,
    height: 28,
  },
  starVisual: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 28,
    height: 28,
    pointerEvents: "none",
  },
  fillClip: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    overflow: "hidden",
  },
  hitLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "50%",
    height: "100%",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
    margin: 0,
    zIndex: 3,
  },
  hitRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "50%",
    height: "100%",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
    margin: 0,
    zIndex: 3,
  },
  label: {
    fontSize: 15,
    fontWeight: 700,
    color: "#F26522",
    marginLeft: 8,
    minWidth: 28,
  },
};

/* ─────────────────────────────────────────────
   Main completion modal
   ───────────────────────────────────────────── */

/**
 * Post-route completion modal — 3 steps:
 *   1. Celebration
 *   2. Rate stops (+ route name)
 *   3. Share route
 *
 * Props:
 *   - isOpen, onClose
 *   - route: the completed route object
 *   - routeId: Firestore route doc ID
 *   - userId: string
 *   - visitedCount: number of stops actually visited
 *   - onShowToast: (msg) => void
 */
export default function RouteCompletionModal({
  isOpen,
  onClose,
  route,
  routeId,
  userId,
  visitedCount,
  onShowToast,
}) {
  const [step, setStep] = useState(1); // 1: celebrate, 2: rate, 3: share
  const [ratings, setRatings] = useState([]);
  const [routeName, setRouteName] = useState("");
  const [visibility, setVisibility] = useState("private");
  const [postToFeed, setPostToFeed] = useState(false);
  const [saving, setSaving] = useState(false);

  const stops = useMemo(() => route?.stops || [], [route]);
  const totalStops = stops.length;

  // Re-initialize all state when modal opens with a route
  useEffect(() => {
    if (isOpen && stops.length > 0) {
      setRatings(stops.map((_, i) => ({ stopIndex: i, rating: 0, notes: "" })));
      setRouteName(route?.name || "Epic Carlsbad Crawl");
      setStep(1);
      setVisibility("private");
      setPostToFeed(false);
      setSaving(false);
    }
  }, [isOpen, stops, route?.name]);

  const handleSetRating = useCallback((stopIndex, value) => {
    setRatings((prev) =>
      prev.map((r) => (r.stopIndex === stopIndex ? { ...r, rating: value } : r))
    );
  }, []);

  const handleSetNotes = useCallback((stopIndex, value) => {
    setRatings((prev) =>
      prev.map((r) => (r.stopIndex === stopIndex ? { ...r, notes: value } : r))
    );
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      await completeRoute(userId, routeId, {
        ratings,
        routeName,
        visibility,
      });

      if (postToFeed) {
        const enrichedRoute = {
          ...route,
          id: routeId,
          name: routeName,
          stops: stops.map((s, i) => ({
            ...s,
            rating: ratings[i]?.rating || null,
            notes: ratings[i]?.notes || "",
          })),
        };
        await createRoutePost(userId, enrichedRoute);
      }

      onShowToast?.("Route saved! Great night out!");
      onClose();
    } catch (err) {
      console.error("Failed to save completion:", err);
      onShowToast?.("Something went wrong. Try again.");
    } finally {
      setSaving(false);
    }
  }, [userId, routeId, ratings, routeName, visibility, postToFeed, route, stops, onShowToast, onClose]);

  const handleClose = useCallback(() => {
    setStep(1);
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={handleClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} style={styles.closeBtn}>
          <X size={18} color="#888" />
        </button>

        {/* ── Step 1: Celebration ── */}
        {step === 1 && (
          <div style={styles.celebrationContainer}>
            <div style={styles.confettiRing}>
              <PartyPopper size={44} color="#F26522" />
            </div>
            <h2 style={styles.celebTitle}>Route Complete!</h2>
            <p style={styles.celebSubtitle}>
              You visited {visitedCount || totalStops} of {totalStops} stops
            </p>
            <div style={styles.celebStats}>
              {stops.map((stop, i) => (
                <div key={i} style={styles.celebStop}>
                  <div style={styles.celebStopDot} />
                  <span style={styles.celebStopName}>{stop.place?.name}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setStep(2)} style={styles.primaryBtn}>
              Rate Your Night
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* ── Step 2: Rate Stops ── */}
        {step === 2 && (
          <div style={styles.rateContainer}>
            <h2 style={styles.stepTitle}>How was your night?</h2>
            <p style={styles.stepSubtitle}>Rate each stop to help others discover great places</p>

            {/* Route name input */}
            <div style={styles.nameFieldGroup}>
              <label style={styles.nameFieldLabel}>Name your night (optional)</label>
              <input
                type="text"
                value={routeName}
                onChange={(e) => {
                  if (e.target.value.length <= 50) setRouteName(e.target.value);
                }}
                style={styles.nameInput}
                placeholder="Epic Carlsbad Crawl"
                maxLength={50}
              />
              <span style={styles.charCount}>{routeName.length}/50</span>
            </div>

            <div style={styles.rateList}>
              {stops.map((stop, i) => {
                const r = ratings[i];
                return (
                  <div key={i} style={styles.rateCard}>
                    <div style={styles.rateCardHeader}>
                      <div style={styles.rateStopNum}>{i + 1}</div>
                      {stop.place?.photoUrl ? (
                        <img
                          src={stop.place.photoUrl}
                          alt=""
                          style={styles.ratePhoto}
                        />
                      ) : (
                        <div style={styles.ratePhotoPlaceholder} />
                      )}
                      <div style={styles.rateStopInfo}>
                        <div style={styles.rateStopName}>{stop.place?.name}</div>
                        <div style={styles.rateStopCategory}>
                          {stop.place?.category || stop.place?.types?.[0] || "Restaurant"}
                        </div>
                      </div>
                    </div>

                    {/* Interactive star rating with half-star support */}
                    <StarRating
                      value={r?.rating || 0}
                      onChange={(val) => handleSetRating(i, val)}
                    />

                    {/* Notes */}
                    <input
                      type="text"
                      placeholder='Add notes... (e.g., "Great tacos!")'
                      value={r?.notes || ""}
                      onChange={(e) => handleSetNotes(i, e.target.value)}
                      style={styles.notesInput}
                    />
                  </div>
                );
              })}
            </div>

            <div style={styles.rateActions}>
              <button onClick={() => setStep(3)} style={styles.skipBtn}>
                Skip
              </button>
              <button onClick={() => setStep(3)} style={styles.primaryBtn}>
                Submit Ratings
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Share Route ── */}
        {step === 3 && (
          <div style={styles.shareContainer}>
            <Share2 size={28} color="#F26522" style={{ marginBottom: 4 }} />
            <h2 style={styles.stepTitle}>Share your route?</h2>

            {/* Visibility radio */}
            <div style={styles.fieldGroup}>
              <label style={styles.fieldLabel}>Who can see this?</label>
              <div style={styles.radioGroup}>
                {[
                  { value: "private", label: "Keep Private", desc: "Only you can see", icon: Lock },
                  { value: "public", label: "Share Publicly", desc: "Appears in your profile, others can copy", icon: Globe },
                  { value: "followers", label: "Share with Friends", desc: "Only followers can see", icon: Users },
                ].map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = visibility === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setVisibility(opt.value)}
                      style={{
                        ...styles.radioOption,
                        borderColor: isSelected
                          ? "rgba(242, 101, 34, 0.5)"
                          : "rgba(255,255,255,0.08)",
                        background: isSelected
                          ? "rgba(242, 101, 34, 0.08)"
                          : "transparent",
                      }}
                    >
                      <div style={{
                        ...styles.radioCircle,
                        borderColor: isSelected ? "#F26522" : "#555",
                      }}>
                        {isSelected && <div style={styles.radioFill} />}
                      </div>
                      <Icon size={16} color={isSelected ? "#F26522" : "#888"} />
                      <div style={styles.radioText}>
                        <div style={{ color: isSelected ? "#fff" : "#ccc", fontWeight: 600, fontSize: 13 }}>
                          {opt.label}
                        </div>
                        <div style={{ color: "#888", fontSize: 11 }}>{opt.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Post to feed checkbox */}
            <button
              onClick={() => setPostToFeed(!postToFeed)}
              style={styles.checkboxRow}
            >
              <div style={{
                ...styles.checkbox,
                borderColor: postToFeed ? "#F26522" : "#555",
                background: postToFeed ? "#F26522" : "transparent",
              }}>
                {postToFeed && <span style={styles.checkmark}>&#10003;</span>}
              </div>
              <span style={styles.checkboxLabel}>
                Post to feed (creates a route post showing all stops)
              </span>
            </button>

            {/* Actions */}
            <div style={styles.shareActions}>
              <button onClick={handleClose} style={styles.cancelBtn}>Cancel</button>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  ...styles.primaryBtn,
                  opacity: saving ? 0.7 : 1,
                }}
              >
                {saving ? (
                  <>
                    <Loader size={15} style={{ animation: "spin 0.8s linear infinite" }} />
                    Saving...
                  </>
                ) : (
                  "Save Route"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Styles ──

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0, 0, 0, 0.75)",
    backdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 200,
  },
  modal: {
    position: "relative",
    width: "min(92vw, 520px)",
    maxHeight: "min(90vh, 700px)",
    background: "#111118",
    borderRadius: 20,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  closeBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    border: "none",
    background: "rgba(255,255,255,0.06)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    zIndex: 10,
  },

  // ── Step 1: Celebration ──
  celebrationContainer: {
    padding: "48px 32px 32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  confettiRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    background: "rgba(242, 101, 34, 0.1)",
    border: "2px solid rgba(242, 101, 34, 0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  celebTitle: {
    margin: 0,
    fontSize: 28,
    fontWeight: 800,
    color: "#fff",
    letterSpacing: -0.5,
  },
  celebSubtitle: {
    margin: "6px 0 20px",
    fontSize: 15,
    color: "#999",
  },
  celebStats: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 28,
    width: "100%",
    maxWidth: 280,
  },
  celebStop: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  celebStopDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    background: "#4CAF50",
    flexShrink: 0,
  },
  celebStopName: {
    fontSize: 14,
    color: "#ccc",
    fontWeight: 500,
  },

  // ── Step 2: Rate ──
  rateContainer: {
    padding: "32px 24px 24px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  stepTitle: {
    margin: 0,
    fontSize: 22,
    fontWeight: 700,
    color: "#fff",
    textAlign: "center",
  },
  stepSubtitle: {
    margin: "4px 0 16px",
    fontSize: 13,
    color: "#888",
    textAlign: "center",
  },
  nameFieldGroup: {
    position: "relative",
    marginBottom: 16,
  },
  nameFieldLabel: {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    color: "#888",
    marginBottom: 6,
  },
  nameInput: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.04)",
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s ease",
  },
  charCount: {
    position: "absolute",
    right: 12,
    bottom: -18,
    fontSize: 10,
    color: "#555",
  },
  rateList: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    maxHeight: 340,
    paddingRight: 4,
    marginTop: 8,
  },
  rateCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 14,
    padding: 16,
  },
  rateCardHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  rateStopNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    background: "linear-gradient(135deg, #F26522, #FF8A50)",
    color: "#fff",
    fontSize: 12,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  ratePhoto: {
    width: 40,
    height: 40,
    borderRadius: 8,
    objectFit: "cover",
    flexShrink: 0,
  },
  ratePhotoPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 8,
    background: "rgba(255,255,255,0.06)",
    flexShrink: 0,
  },
  rateStopInfo: {
    flex: 1,
    minWidth: 0,
  },
  rateStopName: {
    fontSize: 15,
    fontWeight: 600,
    color: "#fff",
    lineHeight: 1.2,
  },
  rateStopCategory: {
    fontSize: 12,
    color: "#888",
    textTransform: "capitalize",
  },
  notesInput: {
    width: "100%",
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.04)",
    color: "#ccc",
    fontSize: 13,
    outline: "none",
    boxSizing: "border-box",
  },
  rateActions: {
    display: "flex",
    gap: 10,
    marginTop: 16,
  },
  skipBtn: {
    padding: "12px 24px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "transparent",
    color: "#888",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },

  // ── Step 3: Share ──
  shareContainer: {
    padding: "32px 28px 28px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
  },
  fieldGroup: {
    width: "100%",
    marginTop: 18,
  },
  fieldLabel: {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    color: "#888",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  radioGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  radioOption: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "transparent",
    cursor: "pointer",
    textAlign: "left",
    width: "100%",
    transition: "all 0.15s ease",
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    border: "2px solid #555",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  radioFill: {
    width: 8,
    height: 8,
    borderRadius: 4,
    background: "#F26522",
  },
  radioText: {
    flex: 1,
  },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 18,
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "transparent",
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    border: "2px solid #555",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: 11,
    lineHeight: 1,
  },
  checkmark: {
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
  },
  checkboxLabel: {
    fontSize: 13,
    color: "#ccc",
  },
  shareActions: {
    display: "flex",
    gap: 10,
    marginTop: 22,
    width: "100%",
  },
  cancelBtn: {
    flex: 1,
    padding: "12px 16px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "transparent",
    color: "#888",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },

  // ── Shared ──
  primaryBtn: {
    padding: "13px 28px",
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
    flex: 1,
  },
};
