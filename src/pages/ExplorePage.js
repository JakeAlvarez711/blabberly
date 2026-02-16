import { Star } from "lucide-react";
import Header from "../components/Layout/Header";
import Sidebar from "../components/Layout/Sidebar";
import { useAuth } from "../hooks/useAuth";
import {
  MOCK_TRENDING,
  MOCK_TOP_SPOTS,
  MOCK_ROUTES,
  MOCK_CATEGORIES,
  MOCK_NEW_THIS_WEEK,
} from "../data/exploreData";

function SectionHeader({ title }) {
  return (
    <div style={styles.sectionHeader}>
      <div style={styles.sectionTitle}>{title}</div>
      <button style={styles.seeAll}>See All</button>
    </div>
  );
}

function ExplorePage() {
  const { userDoc } = useAuth();

  return (
    <div style={styles.page}>
      <Header />
      <Sidebar userDoc={userDoc} />

      <div style={styles.content}>
        {/* ── TRENDING NOW ── */}
        <section style={styles.section}>
          <SectionHeader title="TRENDING NOW" />
          <div className="explore-h-scroll" style={styles.hScroll}>
            {MOCK_TRENDING.map((item) => (
              <div key={item.id} style={styles.trendCard}>
                <img src={item.image} alt="" style={styles.trendImage} />
                <div style={styles.trendOverlay}>
                  <div style={styles.trendPlace}>{item.placeName}</div>
                  <div style={styles.trendCity}>{item.city}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TOP SPOTS ── */}
        <section style={styles.section}>
          <SectionHeader title="TOP SPOTS" />
          <div className="explore-h-scroll" style={styles.hScroll}>
            {MOCK_TOP_SPOTS.map((spot) => (
              <div key={spot.id} style={styles.spotCard}>
                <img src={spot.image} alt="" style={styles.spotImage} />
                <div style={styles.spotOverlay}>
                  <div style={styles.spotName}>{spot.name}</div>
                  <div style={styles.spotMeta}>
                    <Star size={12} color="#F59E0B" fill="#F59E0B" />
                    <span style={styles.spotRating}>{spot.rating}</span>
                    <span style={styles.spotCuisine}>{spot.cuisine} · {spot.priceLevel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── POPULAR ROUTES ── */}
        <section style={styles.section}>
          <SectionHeader title="POPULAR ROUTES" />
          <div className="explore-h-scroll" style={styles.hScroll}>
            {MOCK_ROUTES.map((route) => (
              <div key={route.id} style={styles.routeCard}>
                <img src={route.image} alt="" style={styles.routeImage} />
                {route.comingSoon && (
                  <div style={styles.comingSoonOverlay}>
                    <span style={styles.comingSoonText}>Coming Soon</span>
                  </div>
                )}
                <div style={styles.routeInfo}>
                  <div style={styles.routeName}>{route.name}</div>
                  <div style={styles.routeDesc}>{route.description}</div>
                  <div style={styles.routeStops}>{route.stops} stops</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CATEGORIES ── */}
        <section style={styles.section}>
          <SectionHeader title="CATEGORIES" />
          <div style={styles.catGrid}>
            {MOCK_CATEGORIES.map((cat) => (
              <div key={cat.token} style={styles.catTile}>
                <span style={styles.catEmoji}>{cat.emoji}</span>
                <span style={styles.catLabel}>{cat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── NEW THIS WEEK ── */}
        <section style={styles.section}>
          <SectionHeader title="NEW THIS WEEK" />
          <div style={styles.newList}>
            {MOCK_NEW_THIS_WEEK.map((place) => (
              <div key={place.id} style={styles.newRow}>
                <img src={place.image} alt="" style={styles.newThumb} />
                <div style={styles.newInfo}>
                  <div style={styles.newName}>{place.name}</div>
                  <div style={styles.newCuisine}>{place.cuisine}</div>
                </div>
                <div style={styles.newBadge}>New</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        .explore-h-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .explore-h-scroll::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#FFFFFF",
    color: "#1A1A1A",
  },
  content: {
    position: "fixed",
    top: 65,
    left: 240,
    right: 0,
    bottom: 0,
    overflowY: "auto",
    padding: "24px 32px 64px",
  },

  /* Section */
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: "#1A1A1A",
  },
  seeAll: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#F26522",
    fontSize: 14,
    fontWeight: 600,
    padding: 0,
  },

  /* Horizontal scroll */
  hScroll: {
    display: "flex",
    gap: 16,
    overflowX: "auto",
    paddingBottom: 4,
  },

  /* Trending */
  trendCard: {
    position: "relative",
    width: 180,
    flexShrink: 0,
    borderRadius: 16,
    overflow: "hidden",
    cursor: "pointer",
  },
  trendImage: {
    width: 180,
    height: 240,
    objectFit: "cover",
    display: "block",
  },
  trendOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "32px 12px 12px",
    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
  },
  trendPlace: {
    fontSize: 14,
    fontWeight: 700,
    color: "#FFFFFF",
    marginBottom: 2,
  },
  trendCity: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
  },

  /* Top Spots */
  spotCard: {
    position: "relative",
    width: 180,
    flexShrink: 0,
    borderRadius: 16,
    overflow: "hidden",
    cursor: "pointer",
  },
  spotImage: {
    width: 180,
    height: 240,
    objectFit: "cover",
    display: "block",
  },
  spotOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "32px 12px 12px",
    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
  },
  spotName: {
    fontSize: 14,
    fontWeight: 700,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  spotMeta: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
  },
  spotRating: {
    fontWeight: 700,
    color: "#FFFFFF",
  },
  spotCuisine: {
    color: "rgba(255,255,255,0.7)",
  },

  /* Routes */
  routeCard: {
    position: "relative",
    width: 280,
    flexShrink: 0,
    borderRadius: 16,
    overflow: "hidden",
    background: "#FAFAFA",
    cursor: "pointer",
  },
  routeImage: {
    width: 280,
    height: 150,
    objectFit: "cover",
    display: "block",
  },
  comingSoonOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  comingSoonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 800,
    letterSpacing: 0.5,
  },
  routeInfo: {
    padding: "12px 14px",
  },
  routeName: {
    fontSize: 15,
    fontWeight: 700,
    color: "#1A1A1A",
    marginBottom: 4,
  },
  routeDesc: {
    fontSize: 13,
    color: "#666",
    lineHeight: "1.4",
    marginBottom: 6,
  },
  routeStops: {
    display: "inline-block",
    fontSize: 12,
    fontWeight: 600,
    color: "#F26522",
    background: "rgba(242,101,34,0.1)",
    padding: "3px 10px",
    borderRadius: 999,
  },

  /* Categories */
  catGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 12,
  },
  catTile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: "18px 8px",
    background: "#F5F5F5",
    borderRadius: 16,
    cursor: "pointer",
  },
  catEmoji: {
    fontSize: 32,
  },
  catLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: "#1A1A1A",
  },

  /* New This Week */
  newList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  newRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "8px 12px",
    borderRadius: 12,
    background: "#FAFAFA",
    cursor: "pointer",
  },
  newThumb: {
    width: 60,
    height: 60,
    borderRadius: 12,
    objectFit: "cover",
    flexShrink: 0,
  },
  newInfo: {
    flex: 1,
    minWidth: 0,
  },
  newName: {
    fontSize: 15,
    fontWeight: 700,
    color: "#1A1A1A",
    marginBottom: 2,
  },
  newCuisine: {
    fontSize: 13,
    color: "#666",
  },
  newBadge: {
    fontSize: 12,
    fontWeight: 700,
    color: "#FFFFFF",
    background: "#F26522",
    padding: "4px 12px",
    borderRadius: 999,
    flexShrink: 0,
  },
};

export default ExplorePage;
