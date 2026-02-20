// src/components/map/PostPreviewCard.js
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Bookmark, X, Play } from "lucide-react";

const safeNumber = (v) => (typeof v === "number" && !Number.isNaN(v) ? v : 0);

function PostPreviewCard({ post, onClose }) {
  const navigate = useNavigate();

  if (!post) return null;

  const slug = post.restaurant
    ? post.restaurant.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    : null;

  return (
    <div style={styles.container}>
      <button onClick={onClose} style={styles.closeBtn}>
        <X size={16} color="#999" />
      </button>

      <div style={styles.body}>
        {/* Video thumbnail */}
        {post.videoURL && (
          <div style={styles.thumbnail}>
            <video
              src={post.videoURL}
              style={styles.video}
              muted
              playsInline
              preload="metadata"
            />
            <div style={styles.playOverlay}>
              <Play size={20} color="#fff" fill="#fff" />
            </div>
          </div>
        )}

        <div style={styles.info}>
          <div style={styles.restaurant}>{post.restaurant || "Unknown"}</div>
          {post.dish && <div style={styles.dish}>{post.dish}</div>}
          {post.price && <div style={styles.price}>{post.price}</div>}

          <div style={styles.stats}>
            <span style={styles.stat}>
              <Heart size={13} /> {safeNumber(post.likes)}
            </span>
            <span style={styles.stat}>
              <MessageCircle size={13} /> {safeNumber(post.commentsCount)}
            </span>
            <span style={styles.stat}>
              <Bookmark size={13} /> {safeNumber(post.saves)}
            </span>
          </div>
        </div>
      </div>

      <div style={styles.actions}>
        <button
          onClick={() => navigate(`/p/${post._docId}`)}
          style={styles.actionBtn}
        >
          View Post
        </button>
        {slug && (
          <button
            onClick={() => navigate(`/place/${slug}`)}
            style={{ ...styles.actionBtn, ...styles.secondaryBtn }}
          >
            View Place
          </button>
        )}
      </div>
    </div>
  );
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
    padding: 16,
    width: 340,
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
  },
  body: {
    display: "flex",
    gap: 12,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: "hidden",
    flexShrink: 0,
    position: "relative",
    background: "#f0f0f0",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  playOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.25)",
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  restaurant: {
    fontSize: 15,
    fontWeight: 700,
    color: "#1a1a1a",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  dish: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  price: {
    fontSize: 13,
    color: "#F26522",
    fontWeight: 600,
    marginTop: 2,
  },
  stats: {
    display: "flex",
    gap: 12,
    marginTop: 6,
  },
  stat: {
    display: "flex",
    alignItems: "center",
    gap: 3,
    fontSize: 12,
    color: "#999",
  },
  actions: {
    display: "flex",
    gap: 8,
    marginTop: 12,
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
  },
  secondaryBtn: {
    background: "#f5f5f5",
    color: "#333",
  },
};

export default PostPreviewCard;
