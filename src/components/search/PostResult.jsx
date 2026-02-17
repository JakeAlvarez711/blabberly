import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle } from "lucide-react";

export default function PostResult({ post, onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (typeof onClick === "function") onClick();
    navigate(`/p/${post._docId}`);
  };

  return (
    <button onClick={handleClick} style={styles.row}>
      {post.videoURL ? (
        <video
          src={post.videoURL}
          muted
          playsInline
          preload="metadata"
          style={styles.thumb}
        />
      ) : (
        <div style={styles.thumbFallback} />
      )}

      <div style={styles.info}>
        <div style={styles.dish}>{post.dish || "Untitled"}</div>
        <div style={styles.meta}>
          {post.restaurant && (
            <span style={styles.restaurant}>{post.restaurant}</span>
          )}
          {post.authorHandle && (
            <span style={styles.author}>@{post.authorHandle}</span>
          )}
        </div>
        <div style={styles.stats}>
          <span style={styles.stat}>
            <Heart size={11} color="#999" /> {post.likes || 0}
          </span>
          <span style={styles.stat}>
            <MessageCircle size={11} color="#999" /> {post.commentsCount || 0}
          </span>
        </div>
      </div>
    </button>
  );
}

const styles = {
  row: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 16px",
    width: "100%",
    background: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    borderRadius: 10,
  },
  thumb: {
    width: 44,
    height: 58,
    borderRadius: 8,
    objectFit: "cover",
    flexShrink: 0,
    background: "#111",
  },
  thumbFallback: {
    width: 44,
    height: 58,
    borderRadius: 8,
    flexShrink: 0,
    background: "linear-gradient(135deg, #222, #333)",
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  dish: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1A1A1A",
    marginBottom: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  meta: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 12,
    color: "#999",
    marginBottom: 2,
  },
  restaurant: {
    fontWeight: 500,
  },
  author: {},
  stats: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  stat: {
    display: "flex",
    alignItems: "center",
    gap: 3,
    fontSize: 11,
    color: "#999",
    fontWeight: 500,
  },
};
