// src/components/routes/RouteCard.jsx
import { MapPin, Clock, Route, Play, Eye, Trash2 } from "lucide-react";

export default function RouteCard({ route, onView, onStart, onDelete }) {
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

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.titleRow}>
          <h4 style={styles.name}>{route.name || "Night Out"}</h4>
          <span style={{ ...styles.statusBadge, background: status.bg, color: status.color }}>
            {status.label}
          </span>
        </div>
        <div style={styles.meta}>
          <Route size={12} color="#888" />
          <span>{stops.length} stops</span>
          {routeInfo.totalDistance && (
            <>
              <span style={styles.dot}>&middot;</span>
              <span>{routeInfo.totalDistance}</span>
            </>
          )}
          <span style={styles.dot}>&middot;</span>
          <span>Carlsbad Village</span>
        </div>
      </div>

      <div style={styles.stopsList}>
        {stops.map((stop, i) => (
          <div key={i} style={styles.stopRow}>
            <div style={styles.stopNum}>{i + 1}</div>
            <span style={styles.stopName}>{stop.place?.name || `Stop ${i + 1}`}</span>
          </div>
        ))}
      </div>

      {createdAt && (
        <div style={styles.date}>
          <Clock size={11} color="#666" />
          <span>
            {createdAt.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      )}

      <div style={styles.actions}>
        <button onClick={() => onView?.(route)} style={styles.viewBtn}>
          <Eye size={13} />
          View
        </button>
        {route.status !== "completed" && (
          <button onClick={() => onStart?.(route)} style={styles.startBtn}>
            <Play size={13} />
            Start
          </button>
        )}
        <button onClick={() => onDelete?.(route)} style={styles.deleteBtn}>
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: 16,
  },
  header: {
    marginBottom: 10,
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  name: {
    margin: 0,
    fontSize: 15,
    fontWeight: 600,
    color: "#fff",
  },
  statusBadge: {
    fontSize: 10,
    fontWeight: 700,
    padding: "2px 8px",
    borderRadius: 6,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  meta: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    fontSize: 11,
    color: "#888",
  },
  dot: {
    color: "#555",
  },
  stopsList: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    marginBottom: 8,
  },
  stopRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  stopNum: {
    width: 18,
    height: 18,
    borderRadius: 9,
    background: "rgba(242, 101, 34, 0.2)",
    color: "#F26522",
    fontSize: 10,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  stopName: {
    fontSize: 13,
    color: "#ccc",
  },
  date: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    fontSize: 11,
    color: "#666",
    marginBottom: 10,
  },
  actions: {
    display: "flex",
    gap: 8,
    borderTop: "1px solid rgba(255,255,255,0.05)",
    paddingTop: 10,
  },
  viewBtn: {
    flex: 1,
    padding: "7px 12px",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "transparent",
    color: "#aaa",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  startBtn: {
    flex: 1,
    padding: "7px 12px",
    borderRadius: 8,
    border: "none",
    background: "linear-gradient(135deg, #F26522, #FF8A50)",
    color: "#fff",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "transparent",
    color: "#666",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
};
