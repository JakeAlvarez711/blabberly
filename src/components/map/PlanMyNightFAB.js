// src/components/map/PlanMyNightFAB.js
import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

function PlanMyNightFAB({ onClick }) {
  const [pulsing, setPulsing] = useState(true);

  // One-time pulse animation on mount, then stop after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setPulsing(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.wrapper}>
      {/* Pulse ring */}
      {pulsing && <div style={styles.pulseRing} />}

      <button
        onClick={onClick}
        style={styles.fab}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        <Sparkles size={22} color="#fff" />
        <span style={styles.label}>Plan My Night</span>
      </button>
    </div>
  );
}

const styles = {
  wrapper: {
    position: "absolute",
    bottom: 28,
    right: 16,
    zIndex: 15,
  },
  fab: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "14px 22px",
    borderRadius: 32,
    border: "none",
    background: "linear-gradient(135deg, #F26522, #FF8A50)",
    color: "#fff",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 4px 16px rgba(242, 101, 34, 0.45)",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
    position: "relative",
    zIndex: 2,
  },
  label: {
    whiteSpace: "nowrap",
  },
  pulseRing: {
    position: "absolute",
    inset: -6,
    borderRadius: 38,
    border: "2px solid rgba(242, 101, 34, 0.4)",
    animation: "fabPulse 1.5s ease-out infinite",
    zIndex: 1,
    pointerEvents: "none",
  },
};

export default PlanMyNightFAB;
