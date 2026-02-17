import { rankCategories } from "../../utils/exploreAlgorithms";

// All categories to display with emoji + label + token
const EXPLORE_CATEGORIES = [
  // Food
  { token: "tacos", label: "Tacos", emoji: "\uD83C\uDF2E" },
  { token: "pizza", label: "Pizza", emoji: "\uD83C\uDF55" },
  { token: "sushi", label: "Sushi", emoji: "\uD83C\uDF63" },
  { token: "burgers", label: "Burgers", emoji: "\uD83C\uDF54" },
  { token: "brunch", label: "Brunch", emoji: "\uD83E\uDD5E" },
  { token: "seafood", label: "Seafood", emoji: "\uD83E\uDD90" },
  { token: "bbq", label: "BBQ", emoji: "\uD83C\uDF56" },
  { token: "ramen", label: "Ramen", emoji: "\uD83C\uDF5C" },
  { token: "street_food", label: "Street Food", emoji: "\uD83C\uDF62" },
  // Drinks
  { token: "craft_cocktails", label: "Cocktail Bars", emoji: "\uD83C\uDF78" },
  { token: "wine", label: "Wine Bars", emoji: "\uD83C\uDF77" },
  { token: "craft_beer", label: "Breweries", emoji: "\uD83C\uDF7A" },
  { token: "coffee", label: "Coffee Shops", emoji: "\u2615" },
  // Vibes
  { token: "rooftop", label: "Rooftops", emoji: "\uD83C\uDF07" },
  { token: "date_night", label: "Date Night", emoji: "\uD83D\uDD6F\uFE0F" },
  { token: "late_night", label: "Late Night", emoji: "\uD83C\uDF19" },
  { token: "outdoor_patio", label: "Outdoor Dining", emoji: "\uD83C\uDF3F" },
  { token: "desserts", label: "Desserts", emoji: "\uD83C\uDF70" },
];

export default function Categories({
  categoryCounts = [],
  userTastePrefs = [],
  onSelectCategory,
  loading = false,
}) {
  if (loading) {
    return (
      <div style={styles.grid}>
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div key={i} style={styles.skeleton} />
          ))}
      </div>
    );
  }

  // Build a lookup of counts from the live data
  const countMap = {};
  for (const c of categoryCounts) {
    countMap[c.token] = c;
  }

  // Merge display categories with live counts
  const merged = EXPLORE_CATEGORIES.map((cat) => ({
    ...cat,
    postCount: countMap[cat.token]?.postCount || 0,
    totalEngagement: countMap[cat.token]?.totalEngagement || 0,
    avgRecency: countMap[cat.token]?.avgRecency || 0,
  }));

  // Rank using the algorithm (user taste prefs bubble up)
  const ranked = rankCategories(merged, userTastePrefs);

  return (
    <div style={styles.grid}>
      {ranked.map((cat) => {
        const isUserPref = userTastePrefs.includes(cat.token);
        return (
          <button
            key={cat.token}
            onClick={() => {
              if (typeof onSelectCategory === "function") {
                onSelectCategory(cat.token);
              }
            }}
            style={{
              ...styles.tile,
              borderColor: isUserPref ? "#F26522" : "#E0E0E0",
              background: isUserPref ? "rgba(242,101,34,0.05)" : "#F5F5F5",
            }}
          >
            <span style={styles.emoji}>{cat.emoji}</span>
            <span style={styles.label}>{cat.label}</span>
            {cat.postCount > 0 && (
              <span style={styles.count}>{cat.postCount} posts</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: 12,
  },
  tile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    padding: "16px 8px 12px",
    borderRadius: 16,
    border: "1px solid #E0E0E0",
    cursor: "pointer",
    transition: "transform 0.15s, box-shadow 0.15s",
  },
  emoji: {
    fontSize: 28,
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: "#1A1A1A",
  },
  count: {
    fontSize: 11,
    fontWeight: 500,
    color: "#999",
  },
  skeleton: {
    height: 90,
    borderRadius: 16,
    background: "#F0F0F0",
  },
};
