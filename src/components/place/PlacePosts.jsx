import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Bookmark, MessageCircle } from "lucide-react";

export default function PlacePosts({ posts = [] }) {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("newest");

  if (posts.length === 0) return null;

  const sorted = [...posts].sort((a, b) => {
    if (sortBy === "most_liked") return (b.likes || 0) - (a.likes || 0);
    if (sortBy === "most_saved") return (b.saves || 0) - (a.saves || 0);
    // newest (default)
    return toMillis(b.createdAt) - toMillis(a.createdAt);
  });

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <div style={styles.sectionTitle}>All Posts ({posts.length})</div>

        <div style={styles.sortRow}>
          {["newest", "most_liked", "most_saved"].map((key) => {
            const active = sortBy === key;
            const label = key === "newest" ? "Newest" : key === "most_liked" ? "Most Liked" : "Most Saved";
            return (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                style={{
                  ...styles.sortBtn,
                  color: active ? "#F26522" : "#999",
                  fontWeight: active ? 700 : 500,
                  borderColor: active ? "#F26522" : "transparent",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div style={styles.grid}>
        {sorted.map((p) => (
          <button
            key={p._docId}
            onClick={() => navigate(`/p/${p._docId}`)}
            style={styles.tile}
          >
            {p.videoURL ? (
              <video
                src={p.videoURL}
                muted
                playsInline
                preload="metadata"
                style={styles.tileMedia}
              />
            ) : (
              <div style={styles.tilePlaceholder} />
            )}

            <div style={styles.tileOverlay}>
              <div style={styles.tileDish}>{p.dish || "Untitled"}</div>
              {p.authorHandle && (
                <div style={styles.tileAuthor}>@{p.authorHandle}</div>
              )}
              <div style={styles.tileStats}>
                <span style={styles.tileStat}>
                  <Heart size={12} color="#fff" /> {p.likes || 0}
                </span>
                <span style={styles.tileStat}>
                  <MessageCircle size={12} color="#fff" /> {p.commentsCount || 0}
                </span>
                <span style={styles.tileStat}>
                  <Bookmark size={12} color="#fff" /> {p.saves || 0}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function toMillis(v) {
  if (!v) return 0;
  if (typeof v === "number") return v;
  if (typeof v?.toMillis === "function") return v.toMillis();
  return 0;
}

const styles = {
  wrapper: {
    padding: "20px 0",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    flexWrap: "wrap",
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#1A1A1A",
  },
  sortRow: {
    display: "flex",
    gap: 4,
  },
  sortBtn: {
    background: "none",
    border: "none",
    borderBottom: "2px solid transparent",
    cursor: "pointer",
    padding: "4px 8px",
    fontSize: 13,
    transition: "color 0.2s",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: 12,
  },
  tile: {
    position: "relative",
    aspectRatio: "9 / 16",
    borderRadius: 12,
    overflow: "hidden",
    background: "#111",
    border: "none",
    padding: 0,
    cursor: "pointer",
    textAlign: "left",
  },
  tileMedia: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  tilePlaceholder: {
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, #222, #333)",
  },
  tileOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "32px 10px 10px",
    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
  },
  tileDish: {
    fontSize: 13,
    fontWeight: 700,
    color: "#FFFFFF",
    marginBottom: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  tileAuthor: {
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 4,
  },
  tileStats: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  tileStat: {
    display: "flex",
    alignItems: "center",
    gap: 3,
    fontSize: 11,
    color: "rgba(255,255,255,0.8)",
    fontWeight: 500,
  },
};
