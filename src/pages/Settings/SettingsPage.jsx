import { useState, useRef, useCallback } from "react";

import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";
import { useAuth } from "../../hooks/useAuth";

import AccountSettings from "./sections/AccountSettings";
import ProfileSettings from "./sections/ProfileSettings";
import TastePreferences from "./sections/TastePreferences";
import PrivacySettings from "./sections/PrivacySettings";
import BlockedUsers from "./sections/BlockedUsers";
import DataPrivacy from "./sections/DataPrivacy";
import AboutSection from "./sections/AboutSection";

const NAV_ITEMS = [
  { key: "account", label: "Account" },
  { key: "profile", label: "Profile" },
  { key: "taste", label: "Taste" },
  { key: "privacy", label: "Privacy" },
  { key: "blocked", label: "Blocked" },
  { key: "data", label: "Data" },
  { key: "about", label: "About" },
];

export default function SettingsPage() {
  const { user, uid, ready, userDoc } = useAuth();
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const sectionRefs = useRef({});

  const showToast = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }, []);

  const scrollToSection = (key) => {
    sectionRefs.current[key]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!ready) return null;

  return (
    <div style={styles.page}>
      <Header />
      <Sidebar userDoc={userDoc} />

      <div style={styles.content}>
        <div style={styles.inner}>
          <h1 style={styles.heading}>Settings</h1>

          {/* Section nav */}
          <div style={styles.nav}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                style={styles.navBtn}
                onClick={() => scrollToSection(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Sections */}
          <div ref={(el) => (sectionRefs.current.account = el)} style={styles.sectionWrap}>
            <AccountSettings user={user} userDoc={userDoc} uid={uid} onToast={showToast} />
          </div>

          <div ref={(el) => (sectionRefs.current.profile = el)} style={styles.sectionWrap}>
            <ProfileSettings uid={uid} userDoc={userDoc} onToast={showToast} />
          </div>

          <div ref={(el) => (sectionRefs.current.taste = el)} style={styles.sectionWrap}>
            <TastePreferences uid={uid} userDoc={userDoc} onToast={showToast} />
          </div>

          <div ref={(el) => (sectionRefs.current.privacy = el)} style={styles.sectionWrap}>
            <PrivacySettings uid={uid} userDoc={userDoc} onToast={showToast} />
          </div>

          <div ref={(el) => (sectionRefs.current.blocked = el)} style={styles.sectionWrap}>
            <BlockedUsers uid={uid} onToast={showToast} />
          </div>

          <div ref={(el) => (sectionRefs.current.data = el)} style={styles.sectionWrap}>
            <DataPrivacy uid={uid} onToast={showToast} />
          </div>

          <div ref={(el) => (sectionRefs.current.about = el)} style={styles.sectionWrap}>
            <AboutSection onToast={showToast} />
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <div style={styles.toast}>{toast}</div>
      )}
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
    background: "#FFFFFF",
  },
  inner: {
    maxWidth: 600,
    margin: "0 auto",
    padding: "28px 24px 80px",
  },
  heading: {
    fontSize: 26,
    fontWeight: 900,
    margin: "0 0 20px",
    color: "#1A1A1A",
  },
  nav: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 28,
    paddingBottom: 16,
    borderBottom: "1px solid #F0F0F0",
  },
  navBtn: {
    padding: "7px 14px",
    borderRadius: 999,
    border: "1px solid #E0E0E0",
    background: "#F8F8F8",
    color: "#666",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  sectionWrap: {
    paddingTop: 24,
    paddingBottom: 24,
    borderBottom: "1px solid #F0F0F0",
  },
  toast: {
    position: "fixed",
    bottom: 28,
    left: "50%",
    transform: "translateX(-50%)",
    background: "#1A1A1A",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 600,
    zIndex: 9999,
    boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
    animation: "toastIn 0.2s ease-out",
  },
};
