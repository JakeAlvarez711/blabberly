import { ChevronRight, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

const LINKS = [
  { label: "Terms of Service", href: "#terms" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Community Guidelines", href: "#guidelines" },
  { label: "Help & FAQ", href: "#help" },
  { label: "Contact Support", href: "mailto:support@blabberly.com" },
  {
    label: "Report a Bug",
    href: `mailto:support@blabberly.com?subject=${encodeURIComponent("Bug Report")}&body=${encodeURIComponent(
      `Browser: ${typeof navigator !== "undefined" ? navigator.userAgent : "unknown"}\n\nDescribe the bug:\n`
    )}`,
  },
];

export default function AboutSection({ onToast }) {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      onToast?.(e?.message || "Failed to sign out");
    }
  };

  return (
    <section style={styles.section}>
      <h3 style={styles.sectionTitle}>About & Support</h3>

      <div style={styles.version}>App Version: 1.0.0 (Beta)</div>

      <div style={styles.linksList}>
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={styles.linkRow}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
          >
            <span>{link.label}</span>
            <ChevronRight size={16} color="#CCC" />
          </a>
        ))}
      </div>

      <button style={styles.signOutBtn} onClick={handleSignOut}>
        <LogOut size={16} /> Sign Out
      </button>
    </section>
  );
}

const styles = {
  section: { marginBottom: 32 },
  sectionTitle: {
    fontSize: 16, fontWeight: 800, color: "#1A1A1A", margin: "0 0 16px",
    paddingBottom: 10, borderBottom: "1px solid #F0F0F0",
  },
  version: {
    fontSize: 13, color: "#999", marginBottom: 16,
  },
  linksList: {
    borderRadius: 12, border: "1px solid #F0F0F0", overflow: "hidden",
  },
  linkRow: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "13px 16px", borderBottom: "1px solid #F8F8F8",
    textDecoration: "none", color: "#1A1A1A", fontSize: 14,
    cursor: "pointer",
  },
  signOutBtn: {
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: 8, width: "100%", padding: 14, borderRadius: 12,
    border: "1px solid #E0E0E0", background: "#fff",
    color: "#DC2626", fontSize: 15, fontWeight: 700,
    cursor: "pointer", marginTop: 20,
  },
};
