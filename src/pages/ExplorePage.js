// src/pages/ExplorePage.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Route as RouteIcon } from "lucide-react";

import Header from "../components/Layout/Header";
import Sidebar from "../components/Layout/Sidebar";
import TrendingPosts from "../components/explore/TrendingPosts";
import TopSpots from "../components/explore/TopSpots";
import Categories from "../components/explore/Categories";
import NewThisWeek from "../components/explore/NewThisWeek";

import {
  loadTrendingPosts,
  loadTopSpots,
  loadCategoryCounts,
  loadNewThisWeek,
} from "../data/exploreService";

import { useAuth } from "../hooks/useAuth";
import { MOCK_ROUTES } from "../data/exploreData";

/* ----------------------------
   Section Header
----------------------------- */
function SectionHeader({ title }) {
  return (
    <div style={styles.sectionHeader}>
      <div style={styles.sectionTitle}>{title}</div>
    </div>
  );
}

/* ----------------------------
   ExplorePage
----------------------------- */
function ExplorePage() {
  const { userDoc } = useAuth();
  const navigate = useNavigate();

  // Section data — each loads independently
  const [trending, setTrending] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(true);

  const [topSpots, setTopSpots] = useState([]);
  const [spotsLoading, setSpotsLoading] = useState(true);

  const [categoryCounts, setCategoryCounts] = useState([]);
  const [catLoading, setCatLoading] = useState(true);

  const [newPlaces, setNewPlaces] = useState([]);
  const [newLoading, setNewLoading] = useState(true);

  // Load all sections independently
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await loadTrendingPosts();
        if (!cancelled) setTrending(data);
      } catch (e) {
        console.error("Failed to load trending:", e);
      } finally {
        if (!cancelled) setTrendingLoading(false);
      }
    })();

    (async () => {
      try {
        const data = await loadTopSpots();
        if (!cancelled) setTopSpots(data);
      } catch (e) {
        console.error("Failed to load top spots:", e);
      } finally {
        if (!cancelled) setSpotsLoading(false);
      }
    })();

    (async () => {
      try {
        const data = await loadCategoryCounts();
        if (!cancelled) setCategoryCounts(data);
      } catch (e) {
        console.error("Failed to load categories:", e);
      } finally {
        if (!cancelled) setCatLoading(false);
      }
    })();

    (async () => {
      try {
        const data = await loadNewThisWeek();
        if (!cancelled) setNewPlaces(data);
      } catch (e) {
        console.error("Failed to load new this week:", e);
      } finally {
        if (!cancelled) setNewLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const userTastePrefs = Array.isArray(userDoc?.tastePrefs)
    ? userDoc.tastePrefs
    : [];

  const handleSelectCategory = (token) => {
    // Navigate to feed with category filter (passed as query param)
    navigate(`/?category=${encodeURIComponent(token)}`);
  };

  return (
    <div style={styles.page}>
      <Header />
      <Sidebar userDoc={userDoc} />

      <div style={styles.content}>
        {/* ── TRENDING NOW ── */}
        <section style={styles.section}>
          <SectionHeader title="TRENDING NOW" />
          <TrendingPosts posts={trending} loading={trendingLoading} />
        </section>

        {/* ── TOP SPOTS ── */}
        <section style={styles.section}>
          <SectionHeader title="TOP SPOTS" />
          <TopSpots spots={topSpots} loading={spotsLoading} />
        </section>

        {/* ── CATEGORIES ── */}
        <section style={styles.section}>
          <SectionHeader title="CATEGORIES" />
          <Categories
            categoryCounts={categoryCounts}
            userTastePrefs={userTastePrefs}
            onSelectCategory={handleSelectCategory}
            loading={catLoading}
          />
        </section>

        {/* ── NEW THIS WEEK ── */}
        <section style={styles.section}>
          <SectionHeader title="NEW THIS WEEK" />
          <NewThisWeek places={newPlaces} loading={newLoading} />
        </section>

        {/* ── POPULAR ROUTES (placeholder) ── */}
        <section style={styles.section}>
          <SectionHeader title="POPULAR ROUTES" />
          <div style={styles.routesPlaceholder}>
            <RouteIcon size={32} color="#999" />
            <div style={styles.routesTitle}>Popular Routes coming soon!</div>
            <div style={styles.routesDesc}>
              We're curating the best food crawls in your city.
            </div>
            <div style={styles.routePreview}>
              {MOCK_ROUTES.map((route) => (
                <div key={route.id} style={styles.routeChip}>
                  {route.name}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .explore-h-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .explore-h-scroll::-webkit-scrollbar { display: none; }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
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

  /* Routes placeholder */
  routesPlaceholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    padding: "32px 24px",
    background: "#FAFAFA",
    borderRadius: 16,
    border: "1px dashed #E0E0E0",
  },
  routesTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#1A1A1A",
  },
  routesDesc: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    maxWidth: 320,
    lineHeight: 1.4,
  },
  routePreview: {
    display: "flex",
    gap: 8,
    marginTop: 8,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  routeChip: {
    fontSize: 12,
    fontWeight: 600,
    color: "#F26522",
    background: "rgba(242,101,34,0.1)",
    padding: "5px 14px",
    borderRadius: 999,
  },
};

export default ExplorePage;
