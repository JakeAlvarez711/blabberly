import { useNavigate, useLocation } from "react-router-dom";
import {
  Home, Map, Bookmark, Compass, MessageSquare, User,
  ChevronDown, Plus, Calendar, Settings, LogOut,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const SIDEBAR_SECTIONS = [
  {
    items: [
      { key: "home", label: "Home", icon: Home, path: "/" },
    ],
  },
  {
    label: "DISCOVER",
    items: [
      { key: "explore", label: "Explore", icon: Compass, path: "/explore" },
      { key: "map", label: "Map", icon: Map },
      { key: "saved", label: "Saved", icon: Bookmark },
    ],
  },
  {
    label: "SOCIAL",
    items: [
      { key: "messages", label: "Messages", icon: MessageSquare },
    ],
  },
  {
    label: "YOUR STUFF",
    items: [
      { key: "profile", label: "Profile", icon: User, path: "/profile" },
    ],
  },
];

const MOCK_SPOTS = [
  { name: "Lafayette Hotel", sub: "3 friends · $$" },
  { name: "Cardiff Office", sub: "Popular now · $" },
  { name: "Shoots Fish & Beer", sub: "Saved · $" },
];

const keyForPath = (pathname) => {
  if (pathname === "/") return "home";
  if (pathname === "/explore") return "explore";
  if (pathname === "/profile") return "profile";
  return null;
};

function Sidebar({ userDoc }) {
  const navigate = useNavigate();
  const location = useLocation();
  const activeKey = keyForPath(location.pathname);

  return (
    <aside style={styles.sidebar}>
      {/* User profile */}
      <button onClick={() => navigate("/profile")} style={styles.sidebarProfile}>
        {userDoc?.photoURL ? (
          <img src={userDoc.photoURL} alt="" style={styles.sidebarAvatar} />
        ) : (
          <div style={styles.sidebarAvatarFallback}>
            <User size={18} color="#FFF" />
          </div>
        )}
        <div style={styles.sidebarUserInfo}>
          <div style={styles.sidebarDisplayName}>{userDoc?.displayName || "Your Name"}</div>
          <div style={styles.sidebarHandle}>@{userDoc?.handle || "handle"}</div>
        </div>
      </button>

      <div style={styles.sidebarDivider} />

      <nav style={styles.sidebarNav}>
        {SIDEBAR_SECTIONS.map((section, si) => (
          <div key={si}>
            {section.label && (
              <div style={styles.sectionLabel}>{section.label}</div>
            )}
            {section.items.map((item) => {
              const active = activeKey === item.key;
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    if (item.path) navigate(item.path);
                  }}
                  style={{
                    ...styles.navItem,
                    color: active ? "#F26522" : "#666",
                  }}
                >
                  <Icon size={20} />
                  <span style={{
                    ...styles.navLabel,
                    fontWeight: active ? 700 : 500,
                  }}>{item.label}</span>
                </button>
              );
            })}
            {/* Your Spots list under YOUR STUFF section */}
            {section.label === "YOUR STUFF" && (
              <div style={styles.spotsSection}>
                <button style={styles.spotsHeader}>
                  <span style={styles.spotsTitle}>Your Spots</span>
                  <ChevronDown size={14} color="#999" />
                </button>
                <div style={styles.spotsList}>
                  {MOCK_SPOTS.map((spot) => (
                    <div key={spot.name} style={styles.spotItem}>
                      <div style={styles.spotDot} />
                      <div>
                        <div style={styles.spotName}>{spot.name}</div>
                        <div style={styles.spotSub}>{spot.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Create button */}
      <div style={{ padding: "12px 16px 0" }}>
        <button onClick={() => navigate("/create")} style={styles.createBtn}>
          <Plus size={16} />
          <span>Create</span>
        </button>
      </div>

      <div style={styles.sidebarBottom}>
        <div style={styles.upNextLabel}>Up Next</div>
        <button
          style={{
            ...styles.navItem,
            color: "#666",
            padding: "6px 0",
          }}
        >
          <Calendar size={18} />
          <span style={styles.navLabel}>Reservations</span>
        </button>
        <button style={styles.addReservation}>
          <Plus size={14} />
          <span>Add a Reservation</span>
        </button>

        {/* Settings & Sign Out */}
        <div style={styles.sidebarFooterLinks}>
          <button style={styles.footerLink}>
            <Settings size={14} />
            <span>Settings</span>
          </button>
          <button
            onClick={() => signOut(auth)}
            style={styles.footerLink}
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    position: "fixed",
    top: 65,
    left: 0,
    bottom: 0,
    width: 240,
    background: "#FFFFFF",
    borderRight: "1px solid #EEEEEE",
    display: "flex",
    flexDirection: "column",
    padding: "20px 0",
    zIndex: 90,
    overflowY: "auto",
  },
  sidebarNav: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    padding: "0 12px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 12px",
    borderRadius: 10,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: 15,
    width: "100%",
    textAlign: "left",
  },
  navLabel: {
    fontSize: 15,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    padding: "14px 12px 4px",
  },
  sidebarDivider: {
    height: 1,
    background: "#F0F0F0",
    margin: "16px 24px",
  },
  spotsSection: {
    flex: 1,
    padding: "0 12px",
  },
  spotsHeader: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "0 12px",
    marginBottom: 8,
    background: "none",
    border: "none",
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
  },
  spotsTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  spotsList: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  spotItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
  },
  spotDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#F26522",
    flexShrink: 0,
  },
  spotName: {
    fontSize: 14,
    fontWeight: 600,
    color: "#1A1A1A",
  },
  spotSub: {
    fontSize: 12,
    color: "#999",
    fontWeight: 400,
  },
  sidebarBottom: {
    padding: "16px 24px",
    borderTop: "1px solid #F0F0F0",
  },
  upNextLabel: {
    fontSize: 12,
    fontWeight: 700,
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  addReservation: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#999",
    fontSize: 13,
    fontWeight: 500,
    padding: 0,
  },
  sidebarProfile: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "0 16px",
    background: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    width: "100%",
  },
  sidebarAvatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    objectFit: "cover",
    flexShrink: 0,
  },
  sidebarAvatarFallback: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "#F26522",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  sidebarUserInfo: {
    overflow: "hidden",
  },
  sidebarDisplayName: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1A1A1A",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  sidebarHandle: {
    fontSize: 12,
    color: "#999",
    fontWeight: 400,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  createBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: "10px 0",
    borderRadius: 10,
    border: "none",
    background: "#F26522",
    color: "#FFFFFF",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
  },
  sidebarFooterLinks: {
    display: "flex",
    gap: 16,
    marginTop: 14,
  },
  footerLink: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#999",
    fontSize: 12,
    fontWeight: 500,
    padding: 0,
  },
};

export default Sidebar;
