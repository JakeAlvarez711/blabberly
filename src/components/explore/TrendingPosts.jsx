import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Bookmark, TrendingUp } from "lucide-react";

function formatCount(n) {
  if (typeof n !== "number" || n <= 0) return "0";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

export default function TrendingPosts({ posts = [], loading = false }) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div style={styles.hScroll}>
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div key={i} style={styles.skeleton} />
          ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div style={styles.empty}>
        <TrendingUp size={24} color="#999" />
        <span style={styles.emptyText}>Check back soon for trending posts!</span>
      </div>
    );
  }

  return (
    <div className="explore-h-scroll" style={styles.hScroll}>
      {posts.map((post, i) => (
        <button
          key={post._docId || i}
          onClick={() => navigate(`/p/${post._docId}`)}
          style={styles.card}
        >
          {post.videoURL ? (
            <video
              src={post.videoURL}
              muted
              playsInline
              preload="metadata"
              style={styles.media}
            />
          ) : (
            <div style={styles.mediaPlaceholder} />
          )}

          <div style={styles.overlay}>
            {post.restaurant && (
              <div style={styles.placeName}>{post.restaurant}</div>
            )}
            {post.dish && (
              <div style={styles.dish}>{post.dish}</div>
            )}
            {post.city && (
              <div style={styles.city}>{post.city}</div>
            )}
            <div style={styles.stats}>
              <span style={styles.stat}>
                <Heart size={12} color="#fff" /> {formatCount(post.likes)}
              </span>
              <span style={styles.stat}>
                <MessageCircle size={12} color="#fff" /> {formatCount(post.commentsCount)}
              </span>
              <span style={styles.stat}>
                <Bookmark size={12} color="#fff" /> {formatCount(post.saves)}
              </span>
            </div>
          </div>

          {/* Rank badge */}
          <div style={styles.rankBadge}>{i + 1}</div>
        </button>
      ))}
    </div>
  );
}

const styles = {
  hScroll: {
    display: "flex",
    gap: 16,
    overflowX: "auto",
    paddingBottom: 4,
  },
  card: {
    position: "relative",
    width: 180,
    height: 260,
    flexShrink: 0,
    borderRadius: 16,
    overflow: "hidden",
    cursor: "pointer",
    border: "none",
    padding: 0,
    background: "#111",
    textAlign: "left",
  },
  media: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  mediaPlaceholder: {
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, #222, #333)",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "40px 12px 12px",
    background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
  },
  placeName: {
    fontSize: 14,
    fontWeight: 700,
    color: "#FFFFFF",
    marginBottom: 2,
  },
  dish: {
    fontSize: 12,
    fontWeight: 600,
    color: "rgba(255,255,255,0.85)",
    marginBottom: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  city: {
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 6,
  },
  stats: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  stat: {
    display: "flex",
    alignItems: "center",
    gap: 3,
    fontSize: 11,
    color: "rgba(255,255,255,0.8)",
    fontWeight: 500,
  },
  rankBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 24,
    height: 24,
    borderRadius: "50%",
    background: "#F26522",
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  skeleton: {
    width: 180,
    height: 260,
    flexShrink: 0,
    borderRadius: 16,
    background: "#F0F0F0",
    animation: "pulse 1.5s ease-in-out infinite",
  },
  empty: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "24px 0",
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    fontWeight: 500,
  },
};
