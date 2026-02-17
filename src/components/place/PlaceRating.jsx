import { Star } from "lucide-react";

export default function PlaceRating({ rating = 0, totalLikes = 0, totalSaves = 0, totalPosts = 0 }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div style={styles.wrapper}>
      <div style={styles.sectionTitle}>Rating</div>

      <div style={styles.ratingRow}>
        <span style={styles.ratingNumber}>{rating.toFixed(1)}</span>
        <div style={styles.stars}>
          {Array(fullStars)
            .fill(0)
            .map((_, i) => (
              <Star key={`f${i}`} size={18} color="#F59E0B" fill="#F59E0B" />
            ))}
          {hasHalf && (
            <Star size={18} color="#F59E0B" fill="#F59E0B" style={{ opacity: 0.5 }} />
          )}
          {Array(emptyStars)
            .fill(0)
            .map((_, i) => (
              <Star key={`e${i}`} size={18} color="#E0E0E0" fill="#E0E0E0" />
            ))}
        </div>
        <span style={styles.basedOn}>based on {totalPosts} posts</span>
      </div>

      <div style={styles.breakdown}>
        <div style={styles.breakdownItem}>
          <span style={styles.breakdownLabel}>Total likes</span>
          <span style={styles.breakdownValue}>{formatCount(totalLikes)}</span>
        </div>
        <div style={styles.breakdownItem}>
          <span style={styles.breakdownLabel}>Total saves</span>
          <span style={styles.breakdownValue}>{formatCount(totalSaves)}</span>
        </div>
      </div>
    </div>
  );
}

function formatCount(n) {
  if (typeof n !== "number" || n <= 0) return "0";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

const styles = {
  wrapper: {
    padding: "20px 0",
    borderBottom: "1px solid #E0E0E0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#1A1A1A",
    marginBottom: 12,
  },
  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  ratingNumber: {
    fontSize: 32,
    fontWeight: 800,
    color: "#1A1A1A",
  },
  stars: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  basedOn: {
    fontSize: 13,
    color: "#999",
    fontWeight: 400,
    marginLeft: 4,
  },
  breakdown: {
    display: "flex",
    gap: 24,
  },
  breakdownItem: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  breakdownLabel: {
    fontSize: 13,
    color: "#999",
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1A1A1A",
  },
};
