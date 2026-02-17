import { TASTE_CATEGORIES } from "../../data/onboardingChoices";

// Build token → label map
const TOKEN_LABEL_MAP = {};
for (const cat of Object.values(TASTE_CATEGORIES)) {
  for (const item of cat.items) {
    TOKEN_LABEL_MAP[item.token] = item.label;
  }
}

export default function VibeSection({ vibes = [] }) {
  if (vibes.length === 0) return null;

  // Show top 8 vibes
  const top = vibes.slice(0, 8);

  return (
    <div style={styles.wrapper}>
      <div style={styles.sectionTitle}>Vibe & Atmosphere</div>

      <div style={styles.pills}>
        {top.map(({ tag, count }) => {
          const label = TOKEN_LABEL_MAP[tag] || tag.replace(/_/g, " ");
          return (
            <div key={tag} style={styles.pill}>
              <span style={styles.pillLabel}>{label}</span>
              {count > 1 && <span style={styles.pillCount}>{count}</span>}
            </div>
          );
        })}
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
  pills: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  pill: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "#F5F5F5",
    border: "1px solid #E0E0E0",
    borderRadius: 999,
    padding: "6px 14px",
  },
  pillLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: "#444",
    textTransform: "capitalize",
  },
  pillCount: {
    fontSize: 11,
    fontWeight: 700,
    color: "#F26522",
    background: "rgba(242,101,34,0.1)",
    borderRadius: 999,
    padding: "1px 6px",
    minWidth: 18,
    textAlign: "center",
  },
};
