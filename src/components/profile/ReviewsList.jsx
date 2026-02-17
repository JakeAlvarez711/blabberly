export default function ReviewsList({ posts = [], loading, onSelectPost }) {
  if (loading) {
    return <div style={styles.loading}>Loading reviews...</div>;
  }

  if (!posts.length) {
    return <div style={styles.empty}>No reviews yet.</div>;
  }

  return (
    <div style={styles.list}>
      {posts.map((p) => {
        const key = p?._docId || p?.id;
        const createdAt = p?.createdAt;
        let dateStr = "";
        if (createdAt) {
          const ms = typeof createdAt.toMillis === "function" ? createdAt.toMillis() : createdAt;
          if (typeof ms === "number") {
            dateStr = new Date(ms).toLocaleDateString();
          }
        }

        return (
          <button
            key={key}
            style={styles.card}
            onClick={() => {
              if (typeof onSelectPost === "function") onSelectPost(p);
            }}
          >
            <div style={styles.cardContent}>
              <div style={styles.textCol}>
                {p.restaurant && (
                  <div style={styles.restaurant}>{p.restaurant}</div>
                )}
                {p.dish && (
                  <div style={styles.dish}>{p.dish}</div>
                )}
                {dateStr && (
                  <div style={styles.date}>{dateStr}</div>
                )}
              </div>
              {p.videoURL && (
                <video
                  src={p.videoURL}
                  muted
                  playsInline
                  preload="metadata"
                  style={styles.thumb}
                />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

const styles = {
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: "0 24px",
  },
  card: {
    display: "block",
    width: "100%",
    background: "#F5F5F5",
    border: "none",
    borderRadius: 12,
    padding: 14,
    cursor: "pointer",
    textAlign: "left",
  },
  cardContent: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  textCol: {
    flex: 1,
    minWidth: 0,
  },
  restaurant: {
    fontSize: 15,
    fontWeight: 700,
    color: "#1A1A1A",
  },
  dish: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  date: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 8,
    objectFit: "cover",
    flexShrink: 0,
  },
  loading: {
    padding: "24px",
    textAlign: "center",
    color: "#999",
    fontSize: 14,
  },
  empty: {
    padding: "24px",
    textAlign: "center",
    color: "#999",
    fontSize: 14,
  },
};
