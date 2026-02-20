import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRoutes } from "../../data/routeService";
import ProfileRouteCard from "./ProfileRouteCard";
import RouteDetailModal from "./RouteDetailModal";

const SUB_TABS = ["All", "Planned", "Completed"];

export default function ProfileRoutes({ uid, isOwnProfile }) {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subTab, setSubTab] = useState("All");
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    if (!uid || !isOwnProfile) return;

    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        const list = await getUserRoutes(uid);
        if (!cancelled) setRoutes(Array.isArray(list) ? list : []);
      } catch (e) {
        console.error("Failed to load routes:", e);
        if (!cancelled) setRoutes([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [uid, isOwnProfile]);

  if (!isOwnProfile) {
    return (
      <div style={styles.private}>Routes are private</div>
    );
  }

  if (loading) {
    return <div style={styles.loading}>Loading routes...</div>;
  }

  // Filter by sub-tab
  const filtered = routes.filter((r) => {
    if (subTab === "Planned") return r.status === "planned" || r.status === "in_progress";
    if (subTab === "Completed") return r.status === "completed";
    return true;
  });

  const handleDeleted = (routeId) => {
    setRoutes((prev) => prev.filter((r) => r.id !== routeId));
  };

  return (
    <div style={styles.container}>
      {/* Sub-tab bar */}
      <div style={styles.subTabBar}>
        {SUB_TABS.map((tab) => {
          const active = subTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setSubTab(tab)}
              style={{
                ...styles.subTab,
                background: active ? "#1A1A1A" : "#F5F5F5",
                color: active ? "#fff" : "#666",
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Route cards or empty state */}
      {filtered.length === 0 ? (
        <div style={styles.emptyContainer}>
          <div style={styles.emptyText}>
            {routes.length === 0 ? "No routes yet" : "No routes in this category"}
          </div>
          {routes.length === 0 && (
            <>
              <div style={styles.emptySubtext}>Plan your first night out!</div>
              <button
                onClick={() => navigate("/map")}
                style={styles.planBtn}
              >
                Plan My Night
              </button>
            </>
          )}
        </div>
      ) : (
        <div style={styles.list}>
          {filtered.map((route) => (
            <ProfileRouteCard
              key={route.id}
              route={route}
              onClick={setSelectedRoute}
            />
          ))}
        </div>
      )}

      {/* Detail modal */}
      {selectedRoute && (
        <RouteDetailModal
          route={selectedRoute}
          uid={uid}
          onClose={() => setSelectedRoute(null)}
          onDeleted={handleDeleted}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "0 24px",
  },
  subTabBar: {
    display: "flex",
    gap: 8,
    marginBottom: 16,
  },
  subTab: {
    padding: "6px 16px",
    borderRadius: 20,
    border: "none",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  private: {
    padding: "32px 24px",
    textAlign: "center",
    color: "#999",
    fontSize: 14,
  },
  loading: {
    padding: "24px",
    textAlign: "center",
    color: "#999",
    fontSize: 14,
  },
  emptyContainer: {
    textAlign: "center",
    padding: "32px 0",
  },
  emptyText: {
    color: "#999",
    fontSize: 14,
  },
  emptySubtext: {
    color: "#bbb",
    fontSize: 13,
    marginTop: 6,
  },
  planBtn: {
    marginTop: 14,
    padding: "10px 24px",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(135deg, #F26522, #FF8A50)",
    color: "#fff",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  },
};
