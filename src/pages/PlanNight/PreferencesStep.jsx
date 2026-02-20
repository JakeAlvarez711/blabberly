// src/pages/PlanNight/PreferencesStep.jsx
import { useState } from "react";
import { Sparkles, ChevronDown } from "lucide-react";

const ENERGY_OPTIONS = [
  { value: "chill", emoji: "\u{1F9D8}", label: "Chill", desc: "Laid-back, relaxed" },
  { value: "social", emoji: "\u{1F389}", label: "Social", desc: "Lively, fun" },
  { value: "electric", emoji: "\u26A1", label: "Electric", desc: "High-energy, party" },
];

const CROWD_OPTIONS = [
  { value: "intimate", emoji: "\u{1F465}", label: "Intimate", desc: "Quiet, small crowds" },
  { value: "mixed", emoji: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}", label: "Mixed", desc: "Moderate crowds" },
  { value: "packed", emoji: "\u{1F3AA}", label: "Packed", desc: "Busy, energetic" },
];

const MUSIC_OPTIONS = [
  { value: "none", emoji: "\u{1F507}", label: "None", desc: "Conversation-friendly" },
  { value: "background", emoji: "\u{1F3B5}", label: "Background", desc: "Soft music" },
  { value: "dj", emoji: "\u{1F3A7}", label: "DJ", desc: "Live music, loud" },
];

const STOP_COUNT_OPTIONS = [2, 3, 4];

const STOP_TYPES = ["Dinner", "Drinks", "Dessert", "Coffee"];

function PillGroup({ label, options, selected, onSelect }) {
  return (
    <div style={styles.section}>
      <div style={styles.sectionLabel}>{label}</div>
      <div style={styles.pillRow}>
        {options.map((opt) => {
          const isSelected = selected === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              style={{
                ...styles.pill,
                background: isSelected ? "rgba(242, 101, 34, 0.15)" : "rgba(255,255,255,0.06)",
                border: isSelected ? "2px solid #F26522" : "2px solid rgba(255,255,255,0.1)",
                color: isSelected ? "#F26522" : "#aaa",
              }}
            >
              <span style={styles.pillEmoji}>{opt.emoji}</span>
              <span style={styles.pillLabel}>{opt.label}</span>
              <span style={styles.pillDesc}>{opt.desc}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StopDropdown({ index, value, onChange }) {
  return (
    <div style={styles.dropdownRow}>
      <span style={styles.stopLabel}>Stop {index + 1}</span>
      <div style={styles.selectWrapper}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={styles.select}
        >
          {STOP_TYPES.map((type) => (
            <option key={type} value={type.toLowerCase()}>
              {type}
            </option>
          ))}
        </select>
        <ChevronDown size={14} color="#aaa" style={styles.selectArrow} />
      </div>
    </div>
  );
}

export default function PreferencesStep({ onGenerate }) {
  const [energy, setEnergy] = useState("social");
  const [crowd, setCrowd] = useState("mixed");
  const [music, setMusic] = useState("background");
  const [numberOfStops, setNumberOfStops] = useState(3);
  const [specificJourney, setSpecificJourney] = useState(false);
  const [stopTypes, setStopTypes] = useState(["dinner", "drinks", "dessert"]);

  const handleStopTypeChange = (index, value) => {
    const next = [...stopTypes];
    next[index] = value;
    setStopTypes(next);
  };

  // Keep stopTypes array in sync with numberOfStops
  const effectiveStopTypes = stopTypes.slice(0, numberOfStops);
  while (effectiveStopTypes.length < numberOfStops) {
    effectiveStopTypes.push("drinks");
  }

  const handleGenerate = () => {
    onGenerate({
      energy,
      crowd,
      music,
      numberOfStops,
      specificJourney,
      stopTypes: specificJourney ? effectiveStopTypes : [],
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.iconRow}>
          <Sparkles size={28} color="#F26522" />
        </div>
        <h2 style={styles.title}>Plan My Night</h2>
        <p style={styles.subtitle}>Tell us what you're in the mood for</p>
      </div>

      <div style={styles.body}>
        <PillGroup
          label="What's the vibe?"
          options={ENERGY_OPTIONS}
          selected={energy}
          onSelect={setEnergy}
        />

        <PillGroup
          label="How packed?"
          options={CROWD_OPTIONS}
          selected={crowd}
          onSelect={setCrowd}
        />

        <PillGroup
          label="Music vibe?"
          options={MUSIC_OPTIONS}
          selected={music}
          onSelect={setMusic}
        />

        {/* Number of stops */}
        <div style={styles.section}>
          <div style={styles.sectionLabel}>How many spots?</div>
          <div style={styles.pillRow}>
            {STOP_COUNT_OPTIONS.map((count) => {
              const isSelected = numberOfStops === count;
              return (
                <button
                  key={count}
                  onClick={() => setNumberOfStops(count)}
                  style={{
                    ...styles.countPill,
                    background: isSelected ? "rgba(242, 101, 34, 0.15)" : "rgba(255,255,255,0.06)",
                    border: isSelected ? "2px solid #F26522" : "2px solid rgba(255,255,255,0.1)",
                    color: isSelected ? "#F26522" : "#aaa",
                  }}
                >
                  {count} stops
                </button>
              );
            })}
          </div>
        </div>

        {/* Specific journey toggle */}
        <div style={styles.section}>
          <div style={styles.toggleRow}>
            <span style={styles.toggleLabel}>I want a specific type of night</span>
            <button
              onClick={() => setSpecificJourney(!specificJourney)}
              style={{
                ...styles.toggle,
                background: specificJourney ? "#F26522" : "rgba(255,255,255,0.15)",
              }}
            >
              <div
                style={{
                  ...styles.toggleDot,
                  transform: specificJourney ? "translateX(18px)" : "translateX(2px)",
                }}
              />
            </button>
          </div>

          {specificJourney && (
            <div style={styles.dropdownList}>
              {effectiveStopTypes.map((type, i) => (
                <StopDropdown
                  key={i}
                  index={i}
                  value={type}
                  onChange={(val) => handleStopTypeChange(i, val)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={styles.footer}>
        <button onClick={handleGenerate} style={styles.generateBtn}>
          <Sparkles size={18} color="#fff" />
          Generate My Route
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  header: {
    textAlign: "center",
    padding: "32px 24px 16px",
  },
  iconRow: {
    marginBottom: 8,
  },
  title: {
    margin: 0,
    fontSize: 24,
    fontWeight: 700,
    color: "#fff",
  },
  subtitle: {
    margin: "6px 0 0",
    fontSize: 14,
    color: "#888",
  },
  body: {
    flex: 1,
    overflowY: "auto",
    padding: "8px 24px 16px",
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: "#999",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  pillRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  pill: {
    flex: 1,
    minWidth: 100,
    padding: "12px 10px",
    borderRadius: 12,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    transition: "all 0.15s ease",
  },
  pillEmoji: {
    fontSize: 20,
  },
  pillLabel: {
    fontSize: 13,
    fontWeight: 600,
  },
  pillDesc: {
    fontSize: 10,
    opacity: 0.7,
  },
  countPill: {
    flex: 1,
    padding: "10px 16px",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
    textAlign: "center",
    transition: "all 0.15s ease",
  },
  toggleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  toggleLabel: {
    fontSize: 14,
    color: "#ccc",
    fontWeight: 500,
  },
  toggle: {
    width: 40,
    height: 22,
    borderRadius: 11,
    border: "none",
    cursor: "pointer",
    position: "relative",
    transition: "background 0.2s ease",
    padding: 0,
  },
  toggleDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    background: "#fff",
    position: "absolute",
    top: 2,
    transition: "transform 0.2s ease",
  },
  dropdownList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  dropdownRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  stopLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: "#888",
    minWidth: 52,
  },
  selectWrapper: {
    flex: 1,
    position: "relative",
  },
  select: {
    width: "100%",
    padding: "8px 32px 8px 12px",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    fontSize: 14,
    appearance: "none",
    cursor: "pointer",
    outline: "none",
  },
  selectArrow: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
  },
  footer: {
    padding: "16px 24px 24px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },
  generateBtn: {
    width: "100%",
    padding: "14px 0",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg, #F26522, #FF8A50)",
    color: "#fff",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    boxShadow: "0 4px 16px rgba(242, 101, 34, 0.3)",
    transition: "transform 0.15s ease",
  },
};
