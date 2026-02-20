// src/components/map/LayerToggle.js

const LAYERS = [
  { key: "posts", label: "Posts" },
  { key: "heatmap", label: "Heat Map" },
  { key: "places", label: "Places" },
  { key: "routes", label: "Routes" },
];

function LayerToggle({ active, onChange }) {
  return (
    <div style={styles.container}>
      {LAYERS.map((layer) => {
        const isActive = active === layer.key;
        const isDisabled = layer.disabled;

        return (
          <button
            key={layer.key}
            onClick={() => {
              if (!isDisabled) onChange(layer.key);
            }}
            disabled={isDisabled}
            style={{
              ...styles.pill,
              background: isActive ? "#F26522" : "#fff",
              color: isActive ? "#fff" : isDisabled ? "#bbb" : "#333",
              cursor: isDisabled ? "default" : "pointer",
              opacity: isDisabled ? 0.6 : 1,
            }}
            title={isDisabled ? "Coming Soon" : undefined}
          >
            {layer.label}
            {isDisabled && <span style={styles.soon}>Soon</span>}
          </button>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    position: "absolute",
    top: 12,
    left: 16,
    display: "flex",
    gap: 6,
    zIndex: 10,
    background: "rgba(255,255,255,0.95)",
    borderRadius: 10,
    padding: 4,
    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
  },
  pill: {
    padding: "6px 14px",
    borderRadius: 8,
    border: "none",
    fontSize: 13,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: 4,
    whiteSpace: "nowrap",
  },
  soon: {
    fontSize: 9,
    fontWeight: 700,
    background: "#eee",
    color: "#999",
    padding: "1px 4px",
    borderRadius: 4,
    marginLeft: 2,
  },
};

export default LayerToggle;
