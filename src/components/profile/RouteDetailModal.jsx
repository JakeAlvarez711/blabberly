import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Star, MapPin, Clock, Route, Trash2, Play } from "lucide-react";
import { deleteRoute } from "../../data/routeService";

export default function RouteDetailModal({ route, uid, onClose, onDeleted }) {
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (!route) return null;

  const stops = route.stops || [];
  const routeInfo = route.route || {};
  const rating = route.stats?.overallRating;
  const isPlanned = route.status === "planned" || route.status === "in_progress";

  const createdAt = route.createdAt?.toDate
    ? route.createdAt.toDate()
    : route.createdAt
    ? new Date(route.createdAt)
    : null;

  const completedAt = route.completedAt?.toDate
    ? route.completedAt.toDate()
    : route.completedAt
    ? new Date(route.completedAt)
    : null;

  const dateOpts = { month: "short", day: "numeric", year: "numeric" };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setDeleting(true);
    try {
      await deleteRoute(uid, route.id);
      onDeleted?.(route.id);
      onClose();
    } catch (e) {
      console.error("Failed to delete route:", e);
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>{route.name || "Night Out"}</h2>
          <button onClick={onClose} style={styles.closeBtn}>
            <X size={20} />
          </button>
        </div>

        {/* Stats bar */}
        <div style={styles.statsBar}>
          <div style={styles.statItem}>
            <MapPin size={14} color="#F26522" />
            <span>{stops.length} stop{stops.length !== 1 ? "s" : ""}</span>
          </div>
          {routeInfo.totalDistance && (
            <div style={styles.statItem}>
              <Route size={14} color="#F26522" />
              <span>{routeInfo.totalDistance}</span>
            </div>
          )}
          {routeInfo.totalWalkingTime && (
            <div style={styles.statItem}>
              <Clock size={14} color="#F26522" />
              <span>{routeInfo.totalWalkingTime}</span>
            </div>
          )}
          {rating && (
            <div style={styles.statItem}>
              <Star size={14} color="#F59E0B" fill="#F59E0B" />
              <span style={{ fontWeight: 700 }}>{rating}</span>
            </div>
          )}
        </div>

        {/* Dates */}
        <div style={styles.dates}>
          {createdAt && (
            <span style={styles.dateText}>
              Created {createdAt.toLocaleDateString("en-US", dateOpts)}
            </span>
          )}
          {completedAt && (
            <span style={styles.dateText}>
              Completed {completedAt.toLocaleDateString("en-US", dateOpts)}
            </span>
          )}
        </div>

        {/* Stops list */}
        <div style={styles.stopsList}>
          {stops.map((stop, i) => (
            <div key={i} style={styles.stopRow}>
              <div style={styles.stopLeft}>
                <div style={styles.stopNum}>{i + 1}</div>
                {stop.place?.photoUrl ? (
                  <img src={stop.place.photoUrl} alt="" style={styles.stopPhoto} />
                ) : (
                  <div style={styles.stopPhotoPlaceholder}>
                    <MapPin size={14} color="#999" />
                  </div>
                )}
              </div>
              <div style={styles.stopInfo}>
                <div style={styles.stopName}>{stop.place?.name || `Stop ${i + 1}`}</div>
                {stop.place?.category && (
                  <div style={styles.stopCategory}>{stop.place.category}</div>
                )}
                {stop.rating > 0 && (
                  <div style={styles.stopRating}>
                    <Star size={12} color="#F59E0B" fill="#F59E0B" />
                    <span>{stop.rating}</span>
                  </div>
                )}
                {stop.notes && (
                  <div style={styles.stopNotes}>"{stop.notes}"</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={styles.actions}>
          {isPlanned && (
            <button
              onClick={() => navigate("/map")}
              style={styles.startBtn}
            >
              <Play size={14} />
              Start This Route
            </button>
          )}
          <button
            onClick={handleDelete}
            disabled={deleting}
            style={{
              ...styles.deleteBtn,
              background: confirmDelete ? "#FEE2E2" : "#F5F5F5",
              color: confirmDelete ? "#DC2626" : "#666",
              opacity: deleting ? 0.5 : 1,
            }}
          >
            <Trash2 size={14} />
            {deleting ? "Deleting..." : confirmDelete ? "Confirm Delete" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: 24,
  },
  modal: {
    background: "#FFFFFF",
    borderRadius: 16,
    width: "100%",
    maxWidth: 480,
    maxHeight: "85vh",
    overflowY: "auto",
    padding: 24,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: {
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
    color: "#1A1A1A",
  },
  closeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#999",
    padding: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statsBar: {
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
    padding: "12px 16px",
    background: "#F5F5F5",
    borderRadius: 12,
    marginBottom: 12,
  },
  statItem: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    fontSize: 13,
    color: "#1A1A1A",
    fontWeight: 500,
  },
  dates: {
    display: "flex",
    gap: 16,
    marginBottom: 16,
  },
  dateText: {
    fontSize: 12,
    color: "#999",
  },
  stopsList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 20,
  },
  stopRow: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
  },
  stopLeft: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    flexShrink: 0,
  },
  stopNum: {
    width: 22,
    height: 22,
    borderRadius: 11,
    background: "rgba(242, 101, 34, 0.15)",
    color: "#F26522",
    fontSize: 11,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  stopPhoto: {
    width: 40,
    height: 40,
    borderRadius: 8,
    objectFit: "cover",
  },
  stopPhotoPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 8,
    background: "#F5F5F5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  stopInfo: {
    flex: 1,
    minWidth: 0,
  },
  stopName: {
    fontSize: 14,
    fontWeight: 600,
    color: "#1A1A1A",
  },
  stopCategory: {
    fontSize: 12,
    color: "#999",
    marginTop: 1,
  },
  stopRating: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
    color: "#1A1A1A",
    fontWeight: 600,
    marginTop: 3,
  },
  stopNotes: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
    marginTop: 3,
  },
  actions: {
    display: "flex",
    gap: 10,
    borderTop: "1px solid #E0E0E0",
    paddingTop: 16,
  },
  startBtn: {
    flex: 1,
    padding: "10px 16px",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(135deg, #F26522, #FF8A50)",
    color: "#fff",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  deleteBtn: {
    padding: "10px 16px",
    borderRadius: 10,
    border: "none",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
};
