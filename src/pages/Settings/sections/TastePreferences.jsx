import { useState, useEffect, useMemo } from "react";
import { RotateCcw } from "lucide-react";
import { TASTE_CATEGORIES, CATEGORY_ORDER } from "../../../data/onboardingChoices";
import { saveTasteProfile, getTasteProfile } from "../../../data/onboardingService";
import { saveFineTunePreferences } from "../../../data/onboardingService";

const MAX_TAGS = 10;

const DIETARY_OPTIONS = [
  { token: "vegetarian", label: "Vegetarian" },
  { token: "vegan", label: "Vegan" },
  { token: "gluten_free", label: "Gluten-Free" },
  { token: "dairy_free", label: "Dairy-Free" },
  { token: "nut_allergy", label: "Nut Allergies" },
  { token: "shellfish_allergy", label: "Shellfish Allergies" },
];

const PRICE_OPTIONS = [
  { value: "$", label: "Budget Friendly ($)" },
  { value: "$$", label: "Moderate ($$)" },
  { value: "$$$", label: "Upscale ($$$)" },
  { value: "$$$$", label: "Fine Dining ($$$$)" },
];

export default function TastePreferences({ uid, userDoc, onToast }) {
  const [selections, setSelections] = useState(new Set());
  const [dietary, setDietary] = useState(new Set());
  const [priceRange, setPriceRange] = useState("");
  const [distance, setDistance] = useState(3);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load existing preferences
  useEffect(() => {
    if (!uid) return;
    let cancelled = false;

    (async () => {
      try {
        const existing = await getTasteProfile(uid);
        if (cancelled) return;
        if (Array.isArray(existing)) setSelections(new Set(existing));

        // Load fineTune from userDoc
        if (userDoc?.fineTune) {
          const ft = userDoc.fineTune;
          if (Array.isArray(ft.dietary)) setDietary(new Set(ft.dietary));
          if (Array.isArray(ft.priceRange) && ft.priceRange.length > 0) {
            setPriceRange(ft.priceRange[0]);
          }
        }
        if (typeof userDoc?.defaultRadiusMi === "number") {
          setDistance(userDoc.defaultRadiusMi);
        }
      } catch (e) {
        console.error("Failed to load taste prefs:", e);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();

    return () => { cancelled = true; };
  }, [uid]); // eslint-disable-line react-hooks/exhaustive-deps

  const allSections = useMemo(() => {
    return CATEGORY_ORDER.map((key) => ({
      key,
      label: TASTE_CATEGORIES[key].label,
      items: TASTE_CATEGORIES[key].items,
    }));
  }, []);

  const toggleTag = (token) => {
    setSelections((prev) => {
      const next = new Set(prev);
      if (next.has(token)) { next.delete(token); }
      else if (next.size < MAX_TAGS) { next.add(token); }
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

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveTasteProfile(uid, [...selections]);
      await saveFineTunePreferences(uid, {
        priceRange: priceRange ? [priceRange] : [],
        dietary: [...dietary],
      });

      // Save distance to user profile
      const { updateProfile } = await import("../../../data/userService");
      await updateProfile(uid, { defaultRadiusMi: distance });

      onToast("Taste preferences saved!");
    } catch (e) {
      onToast(e?.message || "Failed to save preferences");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setSelections(new Set());
    setDietary(new Set());
    setPriceRange("");
    setDistance(3);
  };

  if (!loaded) {
    return (
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Taste Preferences</h3>
        <div style={styles.hint}>Loading...</div>
      </section>
    );
  }

  return (
    <section style={styles.section}>
      <h3 style={styles.sectionTitle}>Taste Preferences</h3>
      <div style={styles.hint}>
        Your preferences power personalized recommendations and Plan My Night
      </div>

      {/* Food / Drink / Vibe tags */}
      {allSections.map(({ key, label, items }) => (
        <div key={key} style={styles.tagSection}>
          <div style={styles.tagSectionLabel}>{label}</div>
          <div style={styles.chipsRow}>
            {items.map((item) => {
              const selected = selections.has(item.token);
              const disabled = !selected && selections.size >= MAX_TAGS;
              return (
                <button
                  key={item.token}
                  style={{
                    ...styles.chip,
                    background: selected ? "#F26522" : "#F5F5F5",
                    color: selected ? "#fff" : disabled ? "#ccc" : "#1A1A1A",
                    opacity: disabled ? 0.5 : 1,
                    cursor: disabled ? "default" : "pointer",
                  }}
                  onClick={() => !disabled && toggleTag(item.token)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div style={styles.tagCount}>
        {selections.size}/{MAX_TAGS} selected
      </div>

      {/* Dietary Restrictions */}
      <div style={styles.subsection}>
        <div style={styles.subsectionTitle}>Dietary Restrictions</div>
        {DIETARY_OPTIONS.map((opt) => (
          <label key={opt.token} style={styles.checkRow}>
            <input
              type="checkbox"
              checked={dietary.has(opt.token)}
              onChange={() => toggleDietary(opt.token)}
              style={styles.checkbox}
            />
            <span style={styles.checkLabel}>{opt.label}</span>
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div style={styles.subsection}>
        <div style={styles.subsectionTitle}>Price Range Preference</div>
        {PRICE_OPTIONS.map((opt) => (
          <label key={opt.value} style={styles.radioRow}>
            <input
              type="radio"
              name="priceRange"
              checked={priceRange === opt.value}
              onChange={() => setPriceRange(opt.value)}
              style={styles.radio}
            />
            <span style={styles.radioLabel}>{opt.label}</span>
          </label>
        ))}
      </div>

      {/* Default Travel Distance */}
      <div style={styles.subsection}>
        <div style={styles.subsectionTitle}>Default Travel Distance</div>
        <div style={styles.sliderRow}>
          <span style={styles.sliderLabel}>1 mi</span>
          <input
            type="range"
            min={1}
            max={10}
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            style={styles.slider}
          />
          <span style={styles.sliderLabel}>10 mi</span>
        </div>
        <div style={styles.sliderValue}>Currently: {distance} {distance === 1 ? "mile" : "miles"}</div>
      </div>

      {/* Actions */}
      <div style={styles.actions}>
        <button style={styles.resetBtn} onClick={handleReset}>
          <RotateCcw size={14} /> Reset to Default
        </button>
        <button
          style={{ ...styles.saveBtn, opacity: saving ? 0.6 : 1 }}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </section>
  );
}

const styles = {
  section: { marginBottom: 8 },
  sectionTitle: {
    fontSize: 16, fontWeight: 800, color: "#1A1A1A", margin: "0 0 6px",
    paddingBottom: 10, borderBottom: "1px solid #F0F0F0",
  },
  hint: { fontSize: 13, color: "#888", marginBottom: 16 },
  tagSection: { marginBottom: 14 },
  tagSectionLabel: {
    fontSize: 12, fontWeight: 700, color: "#888", textTransform: "uppercase",
    letterSpacing: 0.5, marginBottom: 8,
  },
  chipsRow: { display: "flex", flexWrap: "wrap", gap: 6 },
  chip: {
    padding: "7px 14px", borderRadius: 999, border: "none",
    fontSize: 13, fontWeight: 600, transition: "background 0.15s",
  },
  tagCount: { fontSize: 12, color: "#888", marginBottom: 20 },
  subsection: { marginBottom: 20 },
  subsectionTitle: {
    fontSize: 14, fontWeight: 700, color: "#1A1A1A", marginBottom: 10,
  },
  checkRow: {
    display: "flex", alignItems: "center", gap: 10, padding: "8px 0", cursor: "pointer",
  },
  checkbox: { width: 18, height: 18, accentColor: "#F26522" },
  checkLabel: { fontSize: 14, color: "#1A1A1A" },
  radioRow: {
    display: "flex", alignItems: "center", gap: 10, padding: "8px 0", cursor: "pointer",
  },
  radio: { width: 18, height: 18, accentColor: "#F26522" },
  radioLabel: { fontSize: 14, color: "#1A1A1A" },
  sliderRow: {
    display: "flex", alignItems: "center", gap: 10,
  },
  slider: {
    flex: 1, height: 6, accentColor: "#F26522", cursor: "pointer",
  },
  sliderLabel: { fontSize: 12, color: "#888", flexShrink: 0, minWidth: 34 },
  sliderValue: { fontSize: 13, color: "#F26522", fontWeight: 600, marginTop: 6 },
  actions: { display: "flex", gap: 10, marginTop: 8 },
  resetBtn: {
    display: "flex", alignItems: "center", gap: 6, padding: "12px 18px",
    borderRadius: 10, border: "1px solid #E0E0E0", background: "#fff",
    color: "#888", fontSize: 13, fontWeight: 600, cursor: "pointer",
  },
  saveBtn: {
    flex: 1, padding: 13, borderRadius: 12, border: "none",
    background: "linear-gradient(135deg, #F26522, #FF8A50)", color: "#fff",
    fontSize: 15, fontWeight: 700, cursor: "pointer",
  },
};
