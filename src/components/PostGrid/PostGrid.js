// src/components/PostGrid/PostGrid.js
import { useMemo } from "react";

export default function PostGrid({
  posts = [],
  onSelectPost,
  emptyText = "No posts yet.",
}) {
  const list = useMemo(() => (Array.isArray(posts) ? posts : []), [posts]);

  if (!list.length) return <div style={styles.empty}>{emptyText}</div>;

  return (
    <div style={styles.grid}>
      {list.map((p) => {
        const key = p?._docId || p?.id;
        const hasVideo = !!p?.videoURL;

        return (
          <button
            key={key}
            type="button"
            style={styles.tileBtn}
            onClick={() => {
              if (!p?._docId && !p?.id) return;
              if (typeof onSelectPost === "function") onSelectPost(p);
            }}
          >
            <div style={styles.tile}>
              {hasVideo ? (
                <video
                  src={p.videoURL}
                  muted
                  playsInline
                  preload="metadata"
                  style={styles.media}
                />
              ) : (
                <div style={styles.fallback}>
                  <div style={{ opacity: 0.7, fontWeight: 700 }}>No video</div>
                </div>
              )}

              <div style={styles.overlayTopLeft}>
                {typeof p?.distance === "number" ? `${p.distance} mi` : ""}
              </div>

              <div style={styles.overlayBottomRight}>
                {typeof p?.price === "number" ? `$${p.price}` : ""}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 2,
    marginTop: 12,
  },
  tileBtn: {
    padding: 0,
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },
  tile: {
    position: "relative",
    width: "100%",
    aspectRatio: "1 / 1",
    overflow: "hidden",
    background: "#111",
    borderRadius: 10,
  },
  media: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  fallback: {
    width: "100%",
    height: "100%",
    display: "grid",
    placeItems: "center",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
  },
  overlayTopLeft: {
    position: "absolute",
    top: 8,
    left: 8,
    fontSize: 12,
    padding: "4px 8px",
    borderRadius: 999,
    background: "rgba(0,0,0,0.45)",
    color: "#fff",
    pointerEvents: "none",
  },
  overlayBottomRight: {
    position: "absolute",
    right: 8,
    bottom: 8,
    fontSize: 12,
    padding: "4px 8px",
    borderRadius: 999,
    background: "rgba(0,0,0,0.45)",
    color: "#fff",
    pointerEvents: "none",
  },
  empty: {
    marginTop: 12,
    opacity: 0.65,
  },
};
