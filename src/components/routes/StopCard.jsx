// src/components/routes/StopCard.jsx
import { useState } from "react";
import { Star, Clock, MapPin, Sparkles, X, GripVertical } from "lucide-react";
import { formatToken } from "../../utils/mapAlgorithms";

export default function StopCard({ stop, index, onRemove, onDragStart, onDragOver, onDrop, isDragging, isDropTarget }) {
  const [handleHover, setHandleHover] = useState(false);
  const { place, plannedTime, estimatedDuration, _routeScore } = stop;
  const priceLabel = place.priceLevel ? "$".repeat(place.priceLevel) : null;
  const matchedTags = _routeScore?.matchedTags || [];

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart?.(e, index)}
      onDragOver={(e) => onDragOver?.(e, index)}
      onDrop={(e) => onDrop?.(e, index)}
      style={{
        ...styles.card,
        opacity: isDragging ? 0.4 : 1,
        transform: isDragging ? "scale(0.97)" : "scale(1)",
        borderColor: isDropTarget
          ? "rgba(242, 101, 34, 0.5)"
          : isDragging
          ? "rgba(242, 101, 34, 0.3)"
          : "rgba(255,255,255,0.08)",
        background: isDropTarget
          ? "rgba(242, 101, 34, 0.08)"
          : "rgba(255,255,255,0.04)",
      }}
    >
      <div style={styles.header}>
        {/* Drag handle — first element so it's easy to grab */}
        <div
          style={{
            ...styles.dragHandle,
            opacity: handleHover ? 1 : 0.4,
            background: handleHover ? "rgba(255,255,255,0.08)" : "transparent",
          }}
          onMouseEnter={() => setHandleHover(true)}
          onMouseLeave={() => setHandleHover(false)}
          title="Drag to reorder"
        >
          <GripVertical size={16} color={handleHover ? "#F26522" : "#666"} />
        </div>

        <div style={styles.numberBadge}>{index + 1}</div>

        {place.photoUrl ? (
          <img src={place.photoUrl} alt={place.name} style={styles.photo} />
        ) : (
          <div style={styles.photoPlaceholder}>
            <MapPin size={20} color="#666" />
          </div>
        )}

        <div style={styles.info}>
          <div style={styles.name}>{place.name}</div>
          <div style={styles.meta}>
            <span style={styles.category}>{formatCategory(place.category)}</span>
            {priceLabel && <span style={styles.price}>{priceLabel}</span>}
          </div>
          {place.rating && (
            <div style={styles.ratingRow}>
              <Star size={12} color="#FFC947" fill="#FFC947" />
              <span style={styles.ratingText}>{place.rating}</span>
            </div>
          )}
        </div>

        {onRemove && (
          <button onClick={() => onRemove(index)} style={styles.removeBtn} title="Remove stop">
            <X size={14} color="#888" />
          </button>
        )}
      </div>

      <div style={styles.details}>
        <div style={styles.detailItem}>
          <Clock size={12} color="#F26522" />
          <span>Arrive by {plannedTime}</span>
        </div>
        <div style={styles.detailItem}>
          <span style={styles.duration}>~{estimatedDuration} min</span>
        </div>
      </div>

      {matchedTags.length > 0 && (
        <div style={styles.matches}>
          <Sparkles size={11} color="#F26522" />
          <span>Matches: {matchedTags.map(formatToken).join(", ")}</span>
        </div>
      )}
    </div>
  );
}

function formatCategory(cat) {
  if (!cat) return "Restaurant";
  return cat
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const styles = {
  card: {
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: 14,
    cursor: "grab",
    transition: "opacity 0.15s ease, transform 0.15s ease, border-color 0.2s ease, background 0.2s ease",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  dragHandle: {
    cursor: "grab",
    padding: 4,
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "opacity 0.15s ease, background 0.15s ease",
  },
  numberBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    background: "linear-gradient(135deg, #F26522, #FF8A50)",
    color: "#fff",
    fontSize: 13,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  photo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    objectFit: "cover",
    flexShrink: 0,
  },
  photoPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 8,
    background: "rgba(255,255,255,0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: 14,
    fontWeight: 600,
    color: "#fff",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  meta: {
    display: "flex",
    gap: 6,
    marginTop: 2,
  },
  category: {
    fontSize: 11,
    color: "#888",
  },
  price: {
    fontSize: 11,
    color: "#6b8f71",
    fontWeight: 600,
  },
  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: 3,
    marginTop: 2,
  },
  ratingText: {
    fontSize: 11,
    color: "#ccc",
    fontWeight: 500,
  },
  removeBtn: {
    width: 26,
    height: 26,
    borderRadius: 6,
    border: "none",
    background: "rgba(255,255,255,0.06)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    flexShrink: 0,
    transition: "background 0.15s ease",
  },
  details: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginTop: 10,
    paddingTop: 8,
    borderTop: "1px solid rgba(255,255,255,0.05)",
  },
  detailItem: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    fontSize: 12,
    color: "#aaa",
  },
  duration: {
    fontSize: 11,
    color: "#888",
  },
  matches: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    marginTop: 8,
    fontSize: 11,
    color: "#F26522",
  },
};
