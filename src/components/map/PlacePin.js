// src/components/map/PlacePin.js
import { useState } from "react";
import { OverlayView } from "@react-google-maps/api";

// --- Emoji mapping by place type/name keywords ---
const TYPE_EMOJI = {
  night_club: "\uD83C\uDF78",  // 🍸
  bar: "\uD83C\uDF7A",         // 🍺
  bakery: "\uD83C\uDF70",      // 🍰
  cafe: "\u2615",              // ☕
  meal_takeaway: "\uD83E\uDD61", // 🥡
  meal_delivery: "\uD83E\uDD61", // 🥡
};

const KEYWORD_EMOJI = [
  [/taco|mexican|burrito|taqueria/i, "\uD83C\uDF2E"],   // 🌮
  [/pizza|italian|pasta|trattoria/i, "\uD83C\uDF55"],    // 🍕
  [/sushi|japanese|ramen|izakaya/i, "\uD83C\uDF63"],     // 🍣
  [/chinese|dim.?sum|wok|szechuan/i, "\uD83E\uDD61"],    // 🥡
  [/burger|american|grill/i, "\uD83C\uDF54"],            // 🍔
  [/thai|pho|vietnamese|noodle/i, "\uD83C\uDF5C"],       // 🍜
  [/seafood|fish|lobster|crab|oyster/i, "\uD83E\uDD9E"], // 🦞
  [/bbq|barbecue|smokehouse/i, "\uD83C\uDF56"],          // 🍖
  [/brunch|breakfast|pancake|waffle/i, "\uD83E\uDD5E"],   // 🥞
  [/dessert|ice.?cream|cake|donut|bakery|sweet/i, "\uD83C\uDF70"], // 🍰
  [/cocktail|lounge|speakeasy|martini/i, "\uD83C\uDF78"], // 🍸
  [/brew|beer|tap.?house|pub/i, "\uD83C\uDF7A"],          // 🍺
  [/wine|vineyard|vino/i, "\uD83C\uDF77"],                // 🍷
  [/coffee|cafe|espresso|latte/i, "\u2615"],              // ☕
  [/boba|tea|matcha/i, "\uD83E\uDDCB"],                   // 🧋
  [/korean|kimchi|bbq/i, "\uD83C\uDF72"],                 // 🍲
  [/indian|curry|tandoori/i, "\uD83C\uDF5B"],             // 🍛
];

const FALLBACK_EMOJI = "\uD83C\uDF7D\uFE0F"; // 🍽️

function getPlaceEmoji(place) {
  const name = place.name || "";
  const types = place.types || [];

  // Check name keywords first (more specific)
  for (const [regex, emoji] of KEYWORD_EMOJI) {
    if (regex.test(name)) return emoji;
  }

  // Check Google types
  for (const t of types) {
    if (TYPE_EMOJI[t]) return TYPE_EMOJI[t];
  }

  return FALLBACK_EMOJI;
}

const TIER_COLORS = {
  perfect: { bg: "#FF6B35", shadow: "rgba(255, 107, 53, 0.4)" },
  good:    { bg: "#FFC947", shadow: "rgba(255, 201, 71, 0.3)" },
  other:   { bg: "#E0E0E0", shadow: "rgba(0, 0, 0, 0.1)" },
};

function PlacePin({ place, matchTier, isCluster, clusterCount, clusterTier, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // --- Cluster mode ---
  if (isCluster) {
    const tier = clusterTier || "other";
    const colors = TIER_COLORS[tier];
    const size = clusterCount >= 20 ? 50 : clusterCount >= 10 ? 44 : 38;

    return (
      <OverlayView
        position={{ lat: place.lat, lng: place.lng }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <button
          onClick={onClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            ...styles.cluster,
            width: size,
            height: size,
            background: colors.bg,
            boxShadow: `0 3px 10px ${colors.shadow}`,
            transform: `translate(-50%, -50%) scale(${hovered ? 1.12 : 1})`,
          }}
          title={`${clusterCount} spots`}
        >
          <span style={styles.clusterCount}>{clusterCount}</span>
          <span style={styles.clusterLabel}>spots</span>
        </button>
      </OverlayView>
    );
  }

  // --- Single pin mode ---
  const lat = place.geometry?.location?.lat();
  const lng = place.geometry?.location?.lng();
  if (typeof lat !== "number" || typeof lng !== "number") return null;

  const tier = matchTier || "other";
  const colors = TIER_COLORS[tier];
  const emoji = getPlaceEmoji(place);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 400);
    if (onClick) onClick();
  };

  return (
    <OverlayView
      position={{ lat, lng }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <button
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          ...styles.pin,
          background: colors.bg,
          boxShadow: hovered
            ? `0 4px 14px ${colors.shadow}, 0 0 0 3px rgba(255,255,255,0.7)`
            : `0 3px 8px ${colors.shadow}`,
          transform: `translate(-50%, -50%) scale(${clicked ? 1.2 : hovered ? 1.1 : 1})`,
        }}
        title={place.name}
      >
        <span style={styles.emoji}>{emoji}</span>
      </button>
    </OverlayView>
  );
}

const styles = {
  pin: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "2.5px solid #fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
    position: "relative",
  },
  emoji: {
    fontSize: 20,
    lineHeight: 1,
    userSelect: "none",
    pointerEvents: "none",
  },
  cluster: {
    borderRadius: "50%",
    border: "3px solid rgba(255,255,255,0.85)",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    gap: 0,
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
  },
  clusterCount: {
    color: "#fff",
    fontSize: 15,
    fontWeight: 800,
    lineHeight: 1,
    textShadow: "0 1px 2px rgba(0,0,0,0.15)",
  },
  clusterLabel: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 8,
    fontWeight: 700,
    lineHeight: 1,
    textShadow: "0 1px 2px rgba(0,0,0,0.1)",
  },
};

export default PlacePin;
