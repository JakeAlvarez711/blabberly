import { useNavigate } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import { slugify } from "../../data/placeAlgorithms";

export default function PlaceResult({ place, onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (typeof onClick === "function") onClick();
    navigate(`/place/${slugify(place.restaurant)}`);
  };

  return (
    <button onClick={handleClick} style={styles.row}>
      {place.videoURL ? (
        <video
          src={place.videoURL}
          muted
          playsInline
          preload="metadata"
          style={styles.thumb}
        />
      ) : (
        <div style={styles.thumbFallback}>
          <MapPin size={16} color="#fff" />
        </div>
      )}

      <div style={styles.info}>
        <div style={styles.name}>{place.restaurant}</div>
        <div style={styles.meta}>
          <Star size={11} color="#F59E0B" fill="#F59E0B" />
          <span style={styles.rating}>{place.rating.toFixed(1)}</span>
          {place.city && <span style={styles.city}>{place.city}</span>}
          <span style={styles.posts}>
            {place.totalPosts} {place.totalPosts === 1 ? "post" : "posts"}
          </span>
        </div>
      </div>
    </button>
  );
}

const styles = {
  row: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 16px",
    width: "100%",
    background: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    borderRadius: 10,
    transition: "background 0.15s",
  },
  thumb: {
    width: 44,
    height: 44,
    borderRadius: 10,
    objectFit: "cover",
    flexShrink: 0,
    background: "#111",
  },
  thumbFallback: {
    width: 44,
    height: 44,
    borderRadius: 10,
    flexShrink: 0,
    background: "linear-gradient(135deg, #F26522, #FF8A50)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1A1A1A",
    marginBottom: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  meta: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    color: "#999",
  },
  rating: {
    fontWeight: 600,
    color: "#1A1A1A",
  },
  city: {},
  posts: {},
};
