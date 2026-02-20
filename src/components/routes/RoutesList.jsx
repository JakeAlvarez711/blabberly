// src/components/routes/RoutesList.jsx
import { useState, useEffect, useCallback } from "react";
import { Sparkles, Route as RouteIcon } from "lucide-react";
import RouteCard from "./RouteCard";
import { getUserRoutes, deleteRoute, updateRouteStatus } from "../../data/routeService";

const TABS = [
  { key: "planned", label: "Planned" },
  { key: "in_progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
];

export default function RoutesList({ userId, onPlanNew, onViewRoute, onStartRoute }) {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("planned");

  const loadRoutes = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const data = await getUserRoutes(userId);
      setRoutes(data);
    } catch (err) {
      console.error("Failed to load routes:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadRoutes();
  }, [loadRoutes]);

  const handleDelete = useCallback(
    async (route) => {
      if (!userId) return;
      try {
        await deleteRoute(userId, route.id);
        setRoutes((prev) => prev.filter((r) => r.id !== route.id));
      } catch (err) {
        console.error("Failed to delete route:", err);
      }
    },
    [userId]
  );

  const handleStart = useCallback(
    async (route) => {
      if (!userId) return;
      try {
        await updateRouteStatus(userId, route.id, "in_progress");
        onStartRoute?.(route);
      } catch (err) {
        console.error("Failed to start route:", err);
      }
    },
    [userId, onStartRoute]
  );

  const filteredRoutes = routes.filter((r) => r.status === activeTab);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <div style={styles.spinner} />
        </div>
      </div>
    );
  }

  if (routes.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.emptyState}>
          <RouteIcon size={36} color="#555" />
          <h3 style={styles.emptyTitle}>No routes yet</h3>
          <p style={styles.emptyText}>Plan your first night out!</p>
          <button onClick={onPlanNew} style={styles.planBtn}>
            <Sparkles size={16} />
            Plan My Night
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Sub-tabs */}
      <div style={styles.tabs}>
        {TABS.map((tab) => {
          const count = routes.filter((r) => r.status === tab.key).length;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                ...styles.tab,
                color: isActive ? "#F26522" : "#888",
                borderBottom: isActive ? "2px solid #F26522" : "2px solid transparent",
              }}
            >
              {tab.label}
              {count > 0 && <span style={styles.count}>{count}</span>}
            </button>
          );
        })}
      </div>

      {/* Route cards */}
      <div style={styles.list}>
        {filteredRoutes.length === 0 ? (
          <div style={styles.emptyTab}>
            <p style={styles.emptyTabText}>No {activeTab.replace("_", " ")} routes</p>
          </div>
        ) : (
          filteredRoutes.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              onView={onViewRoute}
              onStart={handleStart}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* Plan new button */}
      <div style={styles.footer}>
        <button onClick={onPlanNew} style={styles.planBtnSmall}>
          <Sparkles size={14} />
          Plan New Night
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "absolute",
    top: 52,
    left: 16,
    width: 320,
    maxHeight: "calc(100% - 80px)",
    background: "rgba(15, 15, 20, 0.96)",
    backdropFilter: "blur(20px)",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.08)",
    display: "flex",
    flexDirection: "column",
    zIndex: 12,
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  },
  loading: {
    padding: 40,
    display: "flex",
    justifyContent: "center",
  },
  spinner: {
    width: 24,
    height: 24,
    border: "2px solid rgba(255,255,255,0.1)",
    borderTopColor: "#F26522",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  tabs: {
    display: "flex",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    padding: "0 4px",
  },
  tab: {
    flex: 1,
    padding: "10px 8px",
    background: "transparent",
    border: "none",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    transition: "color 0.15s ease",
  },
  count: {
    fontSize: 10,
    fontWeight: 700,
    background: "rgba(242, 101, 34, 0.15)",
    color: "#F26522",
    padding: "1px 5px",
    borderRadius: 4,
  },
  list: {
    flex: 1,
    overflowY: "auto",
    padding: 12,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  emptyState: {
    padding: "40px 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  emptyTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
    color: "#ccc",
  },
  emptyText: {
    margin: 0,
    fontSize: 13,
    color: "#888",
  },
  planBtn: {
    marginTop: 8,
    padding: "10px 24px",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(135deg, #F26522, #FF8A50)",
    color: "#fff",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  emptyTab: {
    padding: "24px 0",
    textAlign: "center",
  },
  emptyTabText: {
    fontSize: 13,
    color: "#666",
    margin: 0,
  },
  footer: {
    padding: "8px 12px 12px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },
  planBtnSmall: {
    width: "100%",
    padding: "8px 16px",
    borderRadius: 8,
    border: "1px solid rgba(242, 101, 34, 0.3)",
    background: "rgba(242, 101, 34, 0.1)",
    color: "#F26522",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
};
