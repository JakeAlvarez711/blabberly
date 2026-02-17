import { Heart, TrendingUp } from "lucide-react";

export default function MustTryItems({ items = [] }) {
  if (items.length === 0) return null;

  // Show top 5
  const top = items.slice(0, 5);

  return (
    <div style={styles.wrapper}>
      <div style={styles.sectionTitle}>Must-Try Items</div>

      <div style={styles.list}>
        {top.map((item, i) => (
          <div key={item.dish} style={styles.item}>
            <div style={styles.rank}>#{i + 1}</div>
            <div style={styles.itemInfo}>
              <div style={styles.dishName}>
                {item.dish}
                {typeof item.price === "number" && (
                  <span style={styles.price}>${item.price}</span>
                )}
              </div>
              <div style={styles.meta}>
                <span style={styles.metaItem}>
                  <TrendingUp size={12} color="#999" />
                  {item.mentions} {item.mentions === 1 ? "mention" : "mentions"}
                </span>
                <span style={styles.metaItem}>
                  <Heart size={12} color="#999" />
                  {item.avgLikes} avg likes
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: "20px 0",
    borderBottom: "1px solid #E0E0E0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#1A1A1A",
    marginBottom: 12,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: 12,
    background: "#F9F9F9",
    borderRadius: 12,
  },
  rank: {
    fontSize: 14,
    fontWeight: 800,
    color: "#F26522",
    width: 28,
    textAlign: "center",
    flexShrink: 0,
  },
  itemInfo: {
    flex: 1,
    minWidth: 0,
  },
  dishName: {
    fontSize: 15,
    fontWeight: 700,
    color: "#1A1A1A",
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  price: {
    fontSize: 13,
    fontWeight: 600,
    color: "#999",
  },
  meta: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
    color: "#999",
    fontWeight: 500,
  },
};
