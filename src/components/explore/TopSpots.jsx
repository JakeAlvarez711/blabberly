import { useNavigate } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import { slugify } from "../../data/placeAlgorithms";

export default function TopSpots({ spots = [], loading = false }) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div style={styles.grid}>
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} style={styles.skeleton} />
          ))}
      </div>
    );
  }

  if (spots.length === 0) {
    return (
      <div style={styles.empty}>
        <MapPin size={24} color="#999" />
        <span style={styles.emptyText}>Exploring new spots in your area...</span>
      </div>
    );
  }

  return (
    <div style={styles.grid}>
      {spots.map((spot) => (
        <button
          key={spot.restaurant}
          onClick={() => navigate(`/place/${slugify(spot.restaurant)}`)}
          style={styles.card}
        >
          {spot.videoURL ? (
            <video
              src={spot.videoURL}
              muted
              playsInline
              preload="metadata"
              style={styles.media}
            />
          ) : (
            <div style={styles.mediaPlaceholder} />
          )}

          <div style={styles.overlay}>
            <div style={styles.name}>{spot.restaurant}</div>
            <div style={styles.meta}>
              <Star size={12} color="#F59E0B" fill="#F59E0B" />
              <span style={styles.rating}>{spot.rating.toFixed(1)}</span>
              {spot.city && (
                <span style={styles.city}>{spot.city}</span>
              )}
            </div>
            <div style={styles.postCount}>
              {spot.totalPosts} {spot.totalPosts === 1 ? "post" : "posts"}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: 16,
  },
  card: {
    position: "relative",
    aspectRatio: "3 / 4",
    borderRadius: 16,
    overflow: "hidden",
    cursor: "pointer",
    border: "none",
    padding: 0,
    background: "#111",
    textAlign: "left",
  },
  media: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  mediaPlaceholder: {
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, #F26522, #FF8A50)",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "40px 12px 12px",
    background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
  },
  name: {
    fontSize: 14,
    fontWeight: 700,
    color: "#FFFFFF",
    marginBottom: 4,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  meta: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    marginBottom: 2,
  },
  rating: {
    fontSize: 13,
    fontWeight: 700,
    color: "#FFFFFF",
  },
  city: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    marginLeft: 4,
  },
  postCount: {
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
    fontWeight: 500,
  },
  skeleton: {
    aspectRatio: "3 / 4",
    borderRadius: 16,
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
