import { useNavigate } from "react-router-dom";
import { MapPin, Sparkles } from "lucide-react";
import { slugify } from "../../data/placeAlgorithms";

export default function NewThisWeek({ places = [], loading = false }) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div style={styles.list}>
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} style={styles.skeleton} />
          ))}
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div style={styles.empty}>
        <Sparkles size={24} color="#999" />
        <span style={styles.emptyText}>
          No new places this week. Be the first to discover one!
        </span>
      </div>
    );
  }

  return (
    <div style={styles.list}>
      {places.map((place) => (
        <button
          key={place.restaurant}
          onClick={() => navigate(`/place/${slugify(place.restaurant)}`)}
          style={styles.row}
        >
          {place.videoURL ? (
            <video
              src={place.videoURL}
              muted
              playsInline
              preload="metadata"
              style={styles.thumb}
            />
          ) : (
            <div style={styles.thumbPlaceholder} />
          )}

          <div style={styles.info}>
            <div style={styles.name}>{place.restaurant}</div>
            {place.city && (
              <div style={styles.city}>
                <MapPin size={11} color="#999" />
                {place.city}
              </div>
            )}
            <div style={styles.postCount}>
              {place.postCount} {place.postCount === 1 ? "post" : "posts"} this
              week
            </div>
          </div>

          <div style={styles.badge}>NEW</div>
        </button>
      ))}
    </div>
  );
}

const styles = {
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "10px 12px",
    borderRadius: 12,
    background: "#FAFAFA",
    cursor: "pointer",
    border: "none",
    textAlign: "left",
    width: "100%",
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 12,
    objectFit: "cover",
    flexShrink: 0,
    background: "#111",
  },
  thumbPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 12,
    flexShrink: 0,
    background: "linear-gradient(135deg, #F26522, #FF8A50)",
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: 15,
    fontWeight: 700,
    color: "#1A1A1A",
    marginBottom: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  city: {
    display: "flex",
    alignItems: "center",
    gap: 3,
    fontSize: 12,
    color: "#999",
    marginBottom: 2,
  },
  postCount: {
    fontSize: 12,
    color: "#666",
    fontWeight: 500,
  },
  badge: {
    fontSize: 11,
    fontWeight: 800,
    color: "#FFFFFF",
    background: "#F26522",
    padding: "4px 12px",
    borderRadius: 999,
    flexShrink: 0,
    letterSpacing: 0.5,
  },
  skeleton: {
    height: 76,
    borderRadius: 12,
    background: "#F0F0F0",
  },
  empty: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "24px 0",
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    fontWeight: 500,
  },
};
