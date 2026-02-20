// src/components/map/PostPin.js
import { useState } from "react";
import { OverlayView } from "@react-google-maps/api";
import { User } from "lucide-react";

// Emoji for post category badge (bottom-right corner)
const KEYWORD_EMOJI = [
  [/taco|mexican|burrito/i, "\uD83C\uDF2E"],
  [/pizza|italian|pasta/i, "\uD83C\uDF55"],
  [/sushi|japanese|ramen/i, "\uD83C\uDF63"],
  [/burger|american/i, "\uD83C\uDF54"],
  [/seafood|fish|lobster/i, "\uD83E\uDD9E"],
  [/bbq|barbecue/i, "\uD83C\uDF56"],
  [/brunch|breakfast/i, "\uD83E\uDD5E"],
  [/dessert|cake|ice.?cream/i, "\uD83C\uDF70"],
  [/cocktail|bar|lounge/i, "\uD83C\uDF78"],
  [/coffee|cafe|espresso/i, "\u2615"],
  [/beer|brew|pub/i, "\uD83C\uDF7A"],
  [/wine/i, "\uD83C\uDF77"],
  [/boba|tea/i, "\uD83E\uDDCB"],
];
const FALLBACK_EMOJI = "\uD83C\uDF7D\uFE0F"; // 🍽️

function getCategoryEmoji(restaurant) {
  if (!restaurant) return FALLBACK_EMOJI;
  for (const [regex, emoji] of KEYWORD_EMOJI) {
    if (regex.test(restaurant)) return emoji;
  }
  return FALLBACK_EMOJI;
}

const safeNumber = (v) => (typeof v === "number" && !Number.isNaN(v) ? v : 0);

function PostPin({ cluster, onClick, authorProfiles }) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { lat, lng, posts, count } = cluster;
  const isCluster = count > 1;

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 400);
    if (onClick) onClick();
  };

  // --- Cluster mode ---
  if (isCluster) {
    // Show up to 3 stacked avatars
    const uniqueAuthors = [...new Set(posts.map((p) => p.authorId))].slice(0, 3);

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
            ...styles.clusterWrap,
            transform: `translate(-50%, -50%) scale(${hovered ? 1.1 : 1})`,
          }}
          title={`${count} posts`}
        >
          <div style={styles.stackedAvatars}>
            {uniqueAuthors.map((authorId, i) => {
              const profile = authorProfiles?.[authorId];
              return (
                <div
                  key={authorId}
                  style={{
                    ...styles.stackedAvatar,
                    zIndex: 3 - i,
                    marginLeft: i > 0 ? -10 : 0,
                  }}
                >
                  {profile?.photoURL ? (
                    <img src={profile.photoURL} alt="" style={styles.avatarImg} />
                  ) : (
                    <div style={styles.avatarFallback}>
                      <User size={12} color="#fff" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div style={styles.clusterBadge}>{count}</div>
        </button>
      </OverlayView>
    );
  }

  // --- Single post pin ---
  const post = posts[0];
  const authorId = post?.authorId;
  const profile = authorProfiles?.[authorId];
  const emoji = getCategoryEmoji(post?.restaurant);
  const isHighEngagement = safeNumber(post?.likes) >= 100;

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
          ...styles.pinWrap,
          transform: `translate(-50%, -50%) scale(${clicked ? 1.2 : hovered ? 1.1 : 1})`,
        }}
        title={post?.restaurant}
      >
        {/* Avatar circle */}
        <div
          style={{
            ...styles.avatarRing,
            boxShadow: isHighEngagement
              ? "0 0 0 3px #F26522, 0 3px 10px rgba(242, 101, 34, 0.4)"
              : hovered
                ? "0 0 0 2.5px #fff, 0 4px 12px rgba(0,0,0,0.2)"
                : "0 0 0 2.5px #fff, 0 3px 8px rgba(0,0,0,0.15)",
          }}
        >
          {profile?.photoURL ? (
            <img src={profile.photoURL} alt="" style={styles.singleAvatar} />
          ) : (
            <div style={styles.singleAvatarFallback}>
              <User size={18} color="#fff" />
            </div>
          )}
        </div>

        {/* Category emoji badge */}
        <div style={styles.emojiBadge}>
          <span style={styles.badgeEmoji}>{emoji}</span>
        </div>
      </button>
    </OverlayView>
  );
}

const styles = {
  // --- Single pin ---
  pinWrap: {
    position: "relative",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    transition: "transform 0.15s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarRing: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    overflow: "hidden",
    transition: "box-shadow 0.15s ease",
  },
  singleAvatar: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  singleAvatarFallback: {
    width: "100%",
    height: "100%",
    background: "#F26522",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  emojiBadge: {
    position: "absolute",
    bottom: -2,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: "50%",
    background: "#fff",
    boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeEmoji: {
    fontSize: 11,
    lineHeight: 1,
  },

  // --- Cluster ---
  clusterWrap: {
    position: "relative",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    transition: "transform 0.15s ease",
    display: "flex",
    alignItems: "center",
  },
  stackedAvatars: {
    display: "flex",
    alignItems: "center",
  },
  stackedAvatar: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    overflow: "hidden",
    border: "2px solid #fff",
    boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  avatarFallback: {
    width: "100%",
    height: "100%",
    background: "#F26522",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  clusterBadge: {
    marginLeft: 4,
    background: "#F26522",
    color: "#fff",
    fontSize: 11,
    fontWeight: 800,
    borderRadius: 10,
    padding: "2px 7px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
    lineHeight: 1.3,
  },
};

export default PostPin;
