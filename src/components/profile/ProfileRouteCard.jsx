import { Star, Route } from "lucide-react";

export default function ProfileRouteCard({ route, onClick }) {
  const stops = route.stops || [];
  const routeInfo = route.route || {};
  const createdAt = route.createdAt?.toDate
    ? route.createdAt.toDate()
    : route.createdAt
    ? new Date(route.createdAt)
    : null;

  const statusColors = {
    planned: { bg: "rgba(59, 130, 246, 0.15)", color: "#3b82f6", label: "Planned" },
    in_progress: { bg: "rgba(242, 101, 34, 0.15)", color: "#F26522", label: "In Progress" },
    completed: { bg: "rgba(76, 175, 80, 0.15)", color: "#4CAF50", label: "Completed" },
  };

  const status = statusColors[route.status] || statusColors.planned;
  const rating = route.stats?.overallRating;
  const isCompleted = route.status === "completed";

  // Build stats line: "3 stops · 1.2 mi · Carlsbad Village"
  const statsParts = [`${stops.length} stop${stops.length !== 1 ? "s" : ""}`];
  if (routeInfo.totalDistance) statsParts.push(routeInfo.totalDistance);
  statsParts.push("Carlsbad Village");
  const statsLine = statsParts.join(" · ");

  // Collect photo URLs from stops
  const photos = stops
    .map((s) => s.place?.photoUrl)
    .filter(Boolean);

  return (
    <div style={styles.card} onClick={() => onClick?.(route)}>
      {/* Photo grid */}
      <div style={styles.photoBox}>
        {photos.length === 0 && (
          <div style={styles.photoPlaceholder}>
            <Route size={24} color="#fff" />
          </div>
        )}
        {photos.length === 1 && (
          <img src={photos[0]} alt="" style={styles.singlePhoto} />
        )}
        {photos.length === 2 && (
          <div style={styles.twoGrid}>
            <img src={photos[0]} alt="" style={styles.twoLeft} />
            <img src={photos[1]} alt="" style={styles.twoRight} />
          </div>
        )}
        {photos.length >= 3 && (
          <div style={styles.multiGrid}>
            <img src={photos[0]} alt="" style={styles.gridLarge} />
            <div style={styles.gridSmallCol}>
              <img src={photos[1]} alt="" style={styles.gridSmallTop} />
              <img src={photos[2]} alt="" style={styles.gridSmallBottom} />
            </div>
          </div>
        )}
      </div>

      {/* Center info */}
      <div style={styles.info}>
        <div style={styles.name}>{route.name || "Night Out"}</div>
        <div style={styles.stats}>{statsLine}</div>
        {createdAt && (
          <div style={styles.date}>
            {createdAt.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        )}
      </div>

      {/* Right: rating or status badge */}
      <div style={styles.right}>
        {isCompleted && rating ? (
          <div style={styles.ratingBox}>
            <Star size={14} color="#F59E0B" fill="#F59E0B" />
            <span style={styles.ratingText}>{rating}</span>
          </div>
        ) : isCompleted ? (
          <span style={styles.ratingDash}>—</span>
        ) : (
          <span style={{ ...styles.statusBadge, background: status.bg, color: status.color }}>
            {status.label}
          </span>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "#F5F5F5",
    borderRadius: 14,
    padding: 12,
    cursor: "pointer",
  },
  // Photo box — 72x72
  photoBox: {
    width: 72,
    height: 72,
    borderRadius: 10,
    overflow: "hidden",
    flexShrink: 0,
  },
  photoPlaceholder: {
    width: 72,
    height: 72,
    background: "linear-gradient(135deg, #F26522, #FF8A50)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  singlePhoto: {
    width: 72,
    height: 72,
    objectFit: "cover",
  },
  // 2-photo split
  twoGrid: {
    display: "flex",
    width: 72,
    height: 72,
    gap: 1,
  },
  twoLeft: {
    width: 35,
    height: 72,
    objectFit: "cover",
  },
  twoRight: {
    width: 36,
    height: 72,
    objectFit: "cover",
  },
  // 3+ photo grid
  multiGrid: {
    display: "flex",
    width: 72,
    height: 72,
    gap: 1,
  },
  gridLarge: {
    width: 47,
    height: 72,
    objectFit: "cover",
  },
  gridSmallCol: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    width: 24,
  },
  gridSmallTop: {
    width: 24,
    height: 35,
    objectFit: "cover",
  },
  gridSmallBottom: {
    width: 24,
    height: 36,
    objectFit: "cover",
  },
  // Center info
  info: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: 15,
    fontWeight: 700,
    color: "#1A1A1A",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  stats: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  date: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  // Right
  right: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
  },
  ratingBox: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 700,
    color: "#1A1A1A",
  },
  ratingDash: {
    fontSize: 16,
    fontWeight: 700,
    color: "#999",
  },
  statusBadge: {
    fontSize: 10,
    fontWeight: 700,
    padding: "3px 8px",
    borderRadius: 6,
    textTransform: "uppercase",
    letterSpacing: 0.3,
    whiteSpace: "nowrap",
  },
};
