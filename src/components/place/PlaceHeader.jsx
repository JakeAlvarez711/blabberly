import { MapPin, Bookmark } from "lucide-react";

export default function PlaceHeader({
  name,
  city,
  rating = 0,
  totalPosts = 0,
  visitorCount = 0,
  saved = false,
  onToggleSave,
}) {
  return (
    <div style={styles.wrapper}>
      {/* Cover gradient */}
      <div style={styles.cover}>
        <div style={styles.coverOverlay} />
        <div style={styles.coverContent}>
          <h1 style={styles.name}>{name}</h1>
          {city && (
            <div style={styles.cityRow}>
              <MapPin size={14} color="rgba(255,255,255,0.85)" />
              <span style={styles.cityText}>{city}</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats bar */}
      <div style={styles.statsBar}>
        <div style={styles.statGroup}>
          <div style={styles.stat}>
            <span style={styles.statNum}>{rating.toFixed(1)}</span>
            <span style={styles.statLabel}>Rating</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.stat}>
            <span style={styles.statNum}>{totalPosts}</span>
            <span style={styles.statLabel}>Posts</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.stat}>
            <span style={styles.statNum}>{visitorCount}</span>
            <span style={styles.statLabel}>Visitors</span>
          </div>
        </div>

        {typeof onToggleSave === "function" && (
          <button onClick={onToggleSave} style={styles.saveBtn}>
            <Bookmark
              size={18}
              color={saved ? "#F26522" : "#666"}
              fill={saved ? "#F26522" : "none"}
            />
            <span style={{ color: saved ? "#F26522" : "#666" }}>
              {saved ? "Saved" : "Save"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    marginBottom: 24,
  },
  cover: {
    position: "relative",
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
    background: "linear-gradient(135deg, #F26522, #FF8A50)",
  },
  coverOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
  },
  coverContent: {
    position: "absolute",
    bottom: 20,
    left: 24,
    right: 24,
    zIndex: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: 800,
    color: "#FFFFFF",
    margin: 0,
    marginBottom: 4,
  },
  cityRow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  cityText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    fontWeight: 500,
  },
  statsBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 0",
    borderBottom: "1px solid #E0E0E0",
  },
  statGroup: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },
  statNum: {
    fontSize: 18,
    fontWeight: 800,
    color: "#1A1A1A",
  },
  statLabel: {
    fontSize: 12,
    color: "#999",
    fontWeight: 500,
  },
  statDivider: {
    width: 1,
    height: 28,
    background: "#E0E0E0",
  },
  saveBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "#F5F5F5",
    border: "1px solid #E0E0E0",
    borderRadius: 10,
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
  },
};
