import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { saveFineTunePreferences, completeOnboarding, getTasteProfile } from "../data/onboardingService";
import { initializeTasteVector } from "../data/tasteVectorService";

const BackArrow = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

const PRICE_OPTIONS = ["$", "$$", "$$$", "$$$$"];

const DIETARY_OPTIONS = [
  { token: "vegetarian", label: "Vegetarian" },
  { token: "vegan", label: "Vegan" },
  { token: "gluten_free", label: "Gluten-free" },
  { token: "no_pork", label: "No pork" },
  { token: "halal", label: "Halal" },
  { token: "kosher", label: "Kosher" },
];

const PICKY_OPTIONS = [
  { value: "anything", label: "I'll eat anything" },
  { value: "a_little", label: "A little picky" },
  { value: "very", label: "Very picky" },
];

const AVOID_OPTIONS = [
  { token: "seafood", label: "Seafood" },
  { token: "mushrooms", label: "Mushrooms" },
  { token: "spicy_food", label: "Spicy food" },
  { token: "raw_fish", label: "Raw fish" },
  { token: "red_meat", label: "Red meat" },
  { token: "dairy", label: "Dairy" },
  { token: "sweet", label: "Sweet" },
  { token: "bitter", label: "Bitter" },
  { token: "eggs", label: "Eggs" },
  { token: "fried_food", label: "Fried food" },
];

function FineTunePreferences() {
  const navigate = useNavigate();
  const { uid } = useAuth();

  const [priceRange, setPriceRange] = useState(new Set());
  const [dietary, setDietary] = useState(new Set());
  const [pickyLevel, setPickyLevel] = useState(null);
  const [avoidTags, setAvoidTags] = useState(new Set());

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const togglePrice = (p) => {
    setPriceRange((prev) => {
      const next = new Set(prev);
      if (next.has(p)) next.delete(p);
      else next.add(p);
      return next;
    });
  };

  const toggleDietary = (token) => {
    setDietary((prev) => {
      const next = new Set(prev);
      if (next.has(token)) next.delete(token);
      else next.add(token);
      return next;
    });
  };

  const toggleAvoid = (token) => {
    setAvoidTags((prev) => {
      const next = new Set(prev);
      if (next.has(token)) next.delete(token);
      else next.add(token);
      return next;
    });
  };

  const finishOnboarding = async (savePrefs) => {
    if (!uid) return;

    setSaving(true);
    setError("");

    try {
      const fineTuneData = {
        priceRange: [...priceRange],
        dietary: [...dietary],
        pickyLevel,
        avoidTags: [...avoidTags],
      };

      // Save fine-tune preferences if user didn't skip
      if (savePrefs) {
        await saveFineTunePreferences(uid, fineTuneData);
      }

      // Load taste prefs for vector initialization
      const tastePrefs = (await getTasteProfile(uid)) || [];

      // Initialize taste vector
      await initializeTasteVector(uid, tastePrefs, savePrefs ? fineTuneData : {});

      // Mark onboarding complete
      await completeOnboarding(uid);

      // AuthGate will redirect to /
      navigate("/explore", { replace: true });
    } catch (e) {
      console.error("Finish onboarding failed:", e);
      setError(e?.message || "Something went wrong. Try again.");
      setSaving(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Top bar */}
      <div style={styles.topBar}>
        <button onClick={() => navigate("/onboarding/taste", { replace: true })} style={styles.backBtn}>
          <BackArrow />
        </button>
        <span style={styles.stepLabel}>Step 3 of 3</span>
        <div style={{ width: 24 }} />
      </div>

      <h1 style={styles.heading}>Fine-tune your feed</h1>
      <p style={styles.subheading}>Only if you want to</p>

      <div style={styles.stack}>
        {/* Price Range */}
        <div style={styles.card}>
          <div style={styles.sectionLabel}>What's your usual range?</div>
          <div style={styles.sectionDesc}>Select all that apply</div>
          <div style={styles.priceWrap}>
            {PRICE_OPTIONS.map((p) => {
              const selected = priceRange.has(p);
              return (
                <button
                  key={p}
                  onClick={() => togglePrice(p)}
                  style={{
                    ...styles.pricePill,
                    ...(selected ? styles.pillSelected : {}),
                  }}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dietary */}
        <div style={styles.card}>
          <div style={styles.sectionLabel}>Dietary preferences</div>
          <div style={styles.sectionDesc}>We'll filter recommendations accordingly</div>
          <div style={styles.chipWrap}>
            {DIETARY_OPTIONS.map((opt) => {
              const selected = dietary.has(opt.token);
              return (
                <button
                  key={opt.token}
                  onClick={() => toggleDietary(opt.token)}
                  style={{
                    ...styles.pill,
                    ...(selected ? styles.pillSelected : {}),
                  }}
                >
                  {selected && <span style={styles.checkmark}>✓ </span>}
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Picky */}
        <div style={styles.card}>
          <div style={styles.sectionLabel}>How picky are you?</div>
          <div style={styles.sectionDesc}>Helps us calibrate suggestions</div>
          <div style={styles.chipWrap}>
            {PICKY_OPTIONS.map((opt) => {
              const selected = pickyLevel === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setPickyLevel(opt.value)}
                  style={{
                    ...styles.pill,
                    ...(selected ? styles.pillSelected : {}),
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Avoid */}
        <div style={styles.card}>
          <div style={styles.sectionLabel}>What do you usually avoid?</div>
          <div style={styles.sectionDesc}>We'll keep these out of your feed</div>
          <div style={styles.chipWrap}>
            {AVOID_OPTIONS.map((opt) => {
              const selected = avoidTags.has(opt.token);
              return (
                <button
                  key={opt.token}
                  onClick={() => toggleAvoid(opt.token)}
                  style={{
                    ...styles.pill,
                    ...(selected ? styles.pillSelected : {}),
                  }}
                >
                  {selected && <span style={styles.checkmark}>✓ </span>}
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{ color: "#D32F2F", fontSize: 14, marginTop: 10 }}>
          {error}
        </div>
      )}

      {/* Actions */}
      <div style={styles.actions}>
        <button
          onClick={() => finishOnboarding(true)}
          disabled={saving}
          style={{
            ...styles.finishBtn,
            opacity: saving ? 0.6 : 1,
            cursor: saving ? "not-allowed" : "pointer",
          }}
        >
          {saving ? "Finishing…" : "Finish"}
        </button>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#FFFFFF",
    color: "#1A1A1A",
    padding: "0 20px 80px",
    overflowY: "auto",
    maxWidth: 600,
    margin: "0 auto",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 0",
    marginBottom: 0,
  },
  backBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    display: "flex",
    alignItems: "center",
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1A1A1A",
  },
  heading: {
    fontSize: 26,
    fontWeight: 900,
    margin: "0 0 6px",
    color: "#1A1A1A",
  },
  subheading: {
    fontSize: 15,
    color: "#666",
    margin: "0 0 28px",
    fontWeight: 400,
  },

  /* Single-column stacked layout */
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  card: {
    background: "#F9F9F9",
    borderRadius: 16,
    padding: "18px 18px 20px",
  },
  sectionLabel: {
    fontWeight: 700,
    fontSize: 15,
    color: "#1A1A1A",
    margin: 0,
  },
  sectionDesc: {
    fontSize: 13,
    color: "#999",
    margin: "4px 0 14px",
    fontWeight: 400,
  },

  /* Price pills */
  priceWrap: {
    display: "flex",
    gap: 8,
  },
  pricePill: {
    flex: 1,
    padding: "10px 4px",
    borderRadius: 999,
    border: "1px solid #E0E0E0",
    background: "#FFFFFF",
    color: "#1A1A1A",
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
    userSelect: "none",
    textAlign: "center",
  },

  /* Shared pill / chip */
  chipWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  pill: {
    padding: "8px 16px",
    borderRadius: 999,
    border: "1px solid #E0E0E0",
    background: "#FFFFFF",
    color: "#1A1A1A",
    fontWeight: 500,
    fontSize: 14,
    cursor: "pointer",
    userSelect: "none",
    display: "flex",
    alignItems: "center",
  },
  pillSelected: {
    background: "#F26522",
    borderColor: "#F26522",
    color: "#FFFFFF",
    fontWeight: 600,
  },
  checkmark: {
    fontSize: 12,
    marginRight: 4,
    fontWeight: 700,
  },

  /* Bottom actions */
  actions: {
    marginTop: 32,
    textAlign: "center",
  },
  finishBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg, #F26522, #FF8A50)",
    color: "#FFFFFF",
    fontWeight: 800,
    fontSize: 16,
  },
};

export default FineTunePreferences;
