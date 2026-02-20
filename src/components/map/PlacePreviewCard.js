// src/components/map/PlacePreviewCard.js
import { useNavigate } from "react-router-dom";
import { Star, MapPin, X, ExternalLink, Clock, Users, Sparkles } from "lucide-react";
import { formatToken } from "../../utils/mapAlgorithms";

const TIER_CONFIG = {
  perfect: { color: "#F26522", label: "Perfect for you!", barBg: "#F26522" },
  good:    { color: "#F5A623", label: "You might like this", barBg: "#F5A623" },
  other:   { color: "#999",    label: "Other options", barBg: "#ddd" },
};

function PlacePreviewCard({ place, postCount, matchInfo, friendCount, distanceLabel, onClose }) {
  const navigate = useNavigate();

  if (!place) return null;

  const slug = place.name
    ? place.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    : null;

  const isOpen = place.opening_hours?.isOpen?.();
  const priceLevel = place.price_level
    ? "$".repeat(place.price_level)
    : null;

  const lat = place.geometry?.location?.lat();
  const lng = place.geometry?.location?.lng();
  const directionsUrl =
    lat && lng
      ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
      : null;

  const photoUrl = place.photos?.[0]?.getUrl?.({ maxWidth: 200, maxHeight: 120 });

  const score = matchInfo?.score ?? 0;
  const tier = matchInfo?.tier || "other";
  const matchedTags = matchInfo?.matchedTags || [];
  const tierConfig = TIER_CONFIG[tier];
  const scorePercent = Math.round(score * 100);

  return (
    <div style={styles.container}>
      <button onClick={onClose} style={styles.closeBtn}>
        <X size={16} color="#999" />
      </button>

      {/* Photo + name header */}
      <div style={styles.topRow}>
        {photoUrl && (
          <div style={styles.photoWrap}>
            <img src={photoUrl} alt={place.name} style={styles.photo} />
          </div>
        )}
        <div style={styles.headerInfo}>
          <div style={styles.name}>{place.name}</div>
          <div style={styles.meta}>
            {place.rating && (
              <span style={styles.rating}>
                <Star size={13} color="#F26522" fill="#F26522" />
                {place.rating.toFixed(1)}
              </span>
            )}
            {priceLevel && <span style={styles.price}>{priceLevel}</span>}
            {typeof isOpen === "boolean" && (
              <span style={{ ...styles.openStatus, color: isOpen ? "#22c55e" : "#ef4444" }}>
                {isOpen ? "Open" : "Closed"}
              </span>
            )}
          </div>
          {place.vicinity && (
            <div style={styles.address}>
              <MapPin size={11} color="#bbb" />
              <span>{place.vicinity}</span>
            </div>
          )}
          {distanceLabel && (
            <div style={styles.distance}>{distanceLabel}</div>
          )}
        </div>
      </div>

      {/* Match score bar */}
      <div style={styles.matchSection}>
        <div style={styles.matchHeader}>
          <Sparkles size={13} color={tierConfig.color} />
          <span style={{ ...styles.matchLabel, color: tierConfig.color }}>
            {scorePercent}% match
          </span>
          <span style={styles.matchTierLabel}>{tierConfig.label}</span>
        </div>
        <div style={styles.matchBarTrack}>
          <div
            style={{
              ...styles.matchBarFill,
              width: `${scorePercent}%`,
              background: tierConfig.barBg,
            }}
          />
        </div>
      </div>

      {/* Why you'll love it */}
      {matchedTags.length > 0 && (
        <div style={styles.whySection}>
          <span style={styles.whyLabel}>Why you'll love it: </span>
          <span style={styles.whyTags}>
            Matches {matchedTags.map(formatToken).join(" \u00B7 ")}
          </span>
        </div>
      )}

      {/* Social proof + posts */}
      <div style={styles.infoRow}>
        {friendCount > 0 && (
          <span style={styles.infoBadge}>
            <Users size={12} />
            {friendCount} friend{friendCount !== 1 ? "s" : ""} been here
          </span>
        )}
        {postCount > 0 && (
          <span style={{ ...styles.infoBadge, color: "#F26522" }}>
            {postCount} Blabberly post{postCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Hours */}
      {place.opening_hours?.weekday_text && (
        <div style={styles.hoursRow}>
          <Clock size={12} color="#999" />
          <span style={styles.hoursText}>
            {getCurrentDayHours(place.opening_hours.weekday_text)}
          </span>
        </div>
      )}

      {/* Actions */}
      <div style={styles.actions}>
        {slug && (
          <button
            onClick={() => navigate(`/place/${slug}`)}
            style={styles.actionBtn}
          >
            View Details
          </button>
        )}
        {directionsUrl && (
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...styles.actionBtn, ...styles.secondaryBtn, textDecoration: "none", textAlign: "center" }}
          >
            <ExternalLink size={13} />
            Directions
          </a>
        )}
      </div>
    </div>
  );
}

function getCurrentDayHours(weekdayText) {
  if (!Array.isArray(weekdayText) || weekdayText.length === 0) return null;
  const today = new Date().getDay();
  // Google's weekday_text starts Monday (0=Mon), JS getDay() starts Sunday (0=Sun)
  const idx = today === 0 ? 6 : today - 1;
  return weekdayText[idx] || weekdayText[0];
}

const styles = {
  container: {
    position: "absolute",
    bottom: 24,
    left: "50%",
    transform: "translateX(-50%)",
    background: "#fff",
    borderRadius: 14,
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    padding: 14,
    width: 360,
    maxWidth: "calc(100% - 32px)",
    zIndex: 20,
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 4,
    zIndex: 1,
  },
  topRow: {
    display: "flex",
    gap: 10,
    marginBottom: 10,
  },
  photoWrap: {
    width: 80,
    height: 70,
    borderRadius: 10,
    overflow: "hidden",
    flexShrink: 0,
    background: "#f0f0f0",
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  headerInfo: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: 15,
    fontWeight: 700,
    color: "#1a1a1a",
    paddingRight: 20,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  meta: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginTop: 3,
  },
  rating: {
    display: "flex",
    alignItems: "center",
    gap: 3,
    fontSize: 13,
    fontWeight: 600,
    color: "#333",
  },
  price: {
    fontSize: 13,
    color: "#666",
    fontWeight: 500,
  },
  openStatus: {
    fontSize: 11,
    fontWeight: 600,
  },
  address: {
    display: "flex",
    alignItems: "center",
    gap: 3,
    fontSize: 11,
    color: "#aaa",
    marginTop: 3,
  },
  distance: {
    fontSize: 10,
    color: "#F26522",
    fontWeight: 500,
    marginTop: 2,
  },
  matchSection: {
    marginBottom: 8,
  },
  matchHeader: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    marginBottom: 4,
  },
  matchLabel: {
    fontSize: 13,
    fontWeight: 700,
  },
  matchTierLabel: {
    fontSize: 11,
    color: "#999",
    fontWeight: 500,
    marginLeft: "auto",
  },
  matchBarTrack: {
    height: 4,
    borderRadius: 2,
    background: "#f0f0f0",
    overflow: "hidden",
  },
  matchBarFill: {
    height: "100%",
    borderRadius: 2,
    transition: "width 0.3s ease",
  },
  whySection: {
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 1.4,
  },
  whyLabel: {
    color: "#999",
    fontWeight: 500,
  },
  whyTags: {
    color: "#F26522",
    fontWeight: 600,
  },
  infoRow: {
    display: "flex",
    gap: 10,
    marginBottom: 6,
    flexWrap: "wrap",
  },
  infoBadge: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 11,
    color: "#666",
    fontWeight: 600,
  },
  hoursRow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 11,
    color: "#999",
    marginBottom: 8,
  },
  hoursText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  actions: {
    display: "flex",
    gap: 8,
    marginTop: 4,
  },
  actionBtn: {
    flex: 1,
    padding: "8px 0",
    borderRadius: 8,
    border: "none",
    background: "#F26522",
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  secondaryBtn: {
    background: "#f5f5f5",
    color: "#333",
  },
};

export default PlacePreviewCard;
