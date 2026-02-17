import { useState } from "react";

export default function SimilarPlaces({ places = [] }) {
  const [expanded, setExpanded] = useState(false);

  if (!places.length) return null;

  const visible = expanded ? places : places.slice(0, 3);
  const remaining = places.length - 3;

  return (
    <div style={styles.container}>
      <div style={styles.title}>Places You Both Visited</div>
      <div style={styles.list}>
        {visible.map((name) => (
          <span key={name} style={styles.pill}>
            {name}
          </span>
        ))}
        {!expanded && remaining > 0 && (
          <button
            onClick={() => setExpanded(true)}
            style={styles.moreBtn}
          >
            +{remaining} more
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "12px 24px",
  },
  title: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1A1A1A",
    marginBottom: 8,
  },
  list: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
  },
  pill: {
    background: "#F5F5F5",
    color: "#1A1A1A",
    fontSize: 13,
    fontWeight: 500,
    padding: "6px 14px",
    borderRadius: 999,
  },
  moreBtn: {
    background: "#F5F5F5",
    color: "#F26522",
    fontSize: 13,
    fontWeight: 600,
    padding: "6px 14px",
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
  },
};
