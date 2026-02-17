import { useNavigate } from "react-router-dom";
import { MapPin, ChevronRight } from "lucide-react";
import { slugify } from "../../data/placeAlgorithms";

export default function SimilarPlaces({ places = [] }) {
  const navigate = useNavigate();

  if (places.length === 0) return null;

  return (
    <div style={styles.wrapper}>
      <div style={styles.sectionTitle}>Similar Places</div>

      <div style={styles.scrollRow}>
        {places.map((p) => (
          <button
            key={p.restaurant}
            onClick={() => navigate(`/place/${slugify(p.restaurant)}`)}
            style={styles.card}
          >
            <div style={styles.cardGradient} />
            <div style={styles.cardContent}>
              <div style={styles.cardName}>{p.restaurant}</div>
              {p.city && (
                <div style={styles.cardCity}>
                  <MapPin size={11} color="rgba(255,255,255,0.7)" />
                  {p.city}
                </div>
              )}
              <div style={styles.cardMeta}>
                {p.postCount} {p.postCount === 1 ? "post" : "posts"}
              </div>
            </div>
            <div style={styles.cardArrow}>
              <ChevronRight size={16} color="rgba(255,255,255,0.6)" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: "20px 0",
    borderTop: "1px solid #E0E0E0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#1A1A1A",
    marginBottom: 12,
  },
  scrollRow: {
    display: "flex",
    gap: 12,
    overflowX: "auto",
    paddingBottom: 4,
  },
  card: {
    position: "relative",
    flex: "0 0 200px",
    height: 110,
    borderRadius: 12,
    overflow: "hidden",
    background: "linear-gradient(135deg, #F26522, #FF8A50)",
    border: "none",
    padding: 0,
    cursor: "pointer",
    textAlign: "left",
    display: "flex",
    alignItems: "flex-end",
  },
  cardGradient: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)",
  },
  cardContent: {
    position: "relative",
    zIndex: 1,
    padding: 12,
    flex: 1,
    minWidth: 0,
  },
  cardName: {
    fontSize: 14,
    fontWeight: 700,
    color: "#FFFFFF",
    marginBottom: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  cardCity: {
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
    display: "flex",
    alignItems: "center",
    gap: 3,
    marginBottom: 2,
  },
  cardMeta: {
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
    fontWeight: 500,
  },
  cardArrow: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
};
