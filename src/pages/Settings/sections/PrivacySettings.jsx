import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const TOGGLE_ITEMS = [
  { key: "privateAccount", label: "Private Account", desc: "Only followers can see your posts" },
  { key: "showInSearch", label: "Show in search results", desc: "Let others find your profile", defaultVal: true },
  { key: "allowLocation", label: "Allow location sharing", desc: 'For "joinable nights" feature' },
  { key: "friendSuggestions", label: "Friend suggestions", desc: 'Show in "People you may know"', defaultVal: true },
  { key: "allowTagging", label: "Allow tagging", desc: "Others can tag you in posts", defaultVal: true },
];

const WHO_CAN_OPTIONS = [
  { value: "everyone", label: "Everyone" },
  { value: "followers", label: "Followers" },
  { value: "no_one", label: "No one" },
];

const WHO_CAN_ITEMS = [
  { key: "commentPosts", label: "Comment on my posts", defaultVal: "everyone" },
  { key: "seeSaved", label: "See my saved posts", defaultVal: "followers" },
  { key: "seeRoutes", label: "See my routes", defaultVal: "followers" },
  { key: "sendMessages", label: "Send me messages", defaultVal: "everyone" },
];

const CONTENT_TOGGLES = [
  { key: "hideSensitive", label: "Hide sensitive content" },
  { key: "restrictMature", label: "Restrict mature content" },
];

const NOTIFICATION_ITEMS = [
  { key: "likesOnPosts", label: "Likes on my posts", defaultVal: true },
  { key: "commentsOnPosts", label: "Comments on my posts", defaultVal: true },
  { key: "newFollowers", label: "New followers", defaultVal: true },
  { key: "friendRequests", label: "Friend requests", defaultVal: true },
  { key: "routeRecommendations", label: "Route recommendations" },
  { key: "trendingSpots", label: "Trending spots near you" },
  { key: "marketingEmails", label: "Marketing emails" },
];

export default function PrivacySettings({ uid, userDoc, onToast }) {
  const privacy = userDoc?.privacy || {};
  const notifications = userDoc?.notifications || {};

  const [toggles, setToggles] = useState({});
  const [whoCan, setWhoCan] = useState({});
  const [content, setContent] = useState({});
  const [notifs, setNotifs] = useState({});
  const [mutedTags, setMutedTags] = useState([]);
  const [newMuteTag, setNewMuteTag] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const t = {};
    TOGGLE_ITEMS.forEach((item) => {
      t[item.key] = privacy[item.key] ?? item.defaultVal ?? false;
    });
    setToggles(t);

    const w = {};
    WHO_CAN_ITEMS.forEach((item) => {
      w[item.key] = privacy[item.key] ?? item.defaultVal;
    });
    setWhoCan(w);

    const c = {};
    CONTENT_TOGGLES.forEach((item) => {
      c[item.key] = privacy[item.key] ?? false;
    });
    setContent(c);

    const n = {};
    NOTIFICATION_ITEMS.forEach((item) => {
      n[item.key] = notifications[item.key] ?? item.defaultVal ?? false;
    });
    setNotifs(n);

    setMutedTags(Array.isArray(privacy.mutedTags) ? privacy.mutedTags : []);
  }, [uid]); // eslint-disable-line react-hooks/exhaustive-deps

  const addMutedTag = () => {
    const tag = newMuteTag.trim().toLowerCase();
    if (!tag || mutedTags.includes(tag)) return;
    setMutedTags([...mutedTags, tag]);
    setNewMuteTag("");
  };

  const removeMutedTag = (tag) => {
    setMutedTags(mutedTags.filter((t) => t !== tag));
  };

  const handleSave = useCallback(async () => {
    if (!uid) return;
    setSaving(true);
    try {
      const ref = doc(db, "users", uid);
      await setDoc(ref, {
        privacy: { ...toggles, ...whoCan, ...content, mutedTags },
        notifications: notifs,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      onToast("Preferences saved!");
    } catch (e) {
      onToast(e?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  }, [uid, toggles, whoCan, content, mutedTags, notifs, onToast]);

  return (
    <section style={styles.section}>
      <h3 style={styles.sectionTitle}>Privacy & Notifications</h3>

      {/* Privacy Controls */}
      <div style={styles.subsectionTitle}>Privacy Controls</div>
      {TOGGLE_ITEMS.map((item) => (
        <div key={item.key} style={styles.toggleRow}>
          <div style={styles.toggleInfo}>
            <div style={styles.toggleLabel}>{item.label}</div>
            <div style={styles.toggleDesc}>{item.desc}</div>
          </div>
          <button
            style={{
              ...styles.toggle,
              background: toggles[item.key] ? "#F26522" : "#E0E0E0",
            }}
            onClick={() => setToggles({ ...toggles, [item.key]: !toggles[item.key] })}
          >
            <div style={{
              ...styles.toggleKnob,
              transform: toggles[item.key] ? "translateX(18px)" : "translateX(2px)",
            }} />
          </button>
        </div>
      ))}

      {/* Who can... */}
      <div style={{ ...styles.subsectionTitle, marginTop: 24 }}>Who Can...</div>
      {WHO_CAN_ITEMS.map((item) => (
        <div key={item.key} style={styles.selectRow}>
          <div style={styles.selectLabel}>{item.label}</div>
          <select
            value={whoCan[item.key] || item.defaultVal}
            onChange={(e) => setWhoCan({ ...whoCan, [item.key]: e.target.value })}
            style={styles.select}
          >
            {WHO_CAN_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      ))}

      {/* Content Preferences */}
      <div style={{ ...styles.subsectionTitle, marginTop: 24 }}>Content Preferences</div>
      {CONTENT_TOGGLES.map((item) => (
        <label key={item.key} style={styles.checkRow}>
          <input
            type="checkbox"
            checked={content[item.key] || false}
            onChange={() => setContent({ ...content, [item.key]: !content[item.key] })}
            style={styles.checkbox}
          />
          <span>{item.label}</span>
        </label>
      ))}

      {/* Muted Tags */}
      <div style={{ marginTop: 14 }}>
        <div style={styles.muteLabel}>Muted Tags</div>
        <div style={styles.muteHint}>Hide posts with these tags</div>
        <div style={styles.mutedRow}>
          {mutedTags.map((tag) => (
            <span key={tag} style={styles.mutedChip}>
              {tag}
              <button style={styles.mutedRemove} onClick={() => removeMutedTag(tag)}>
                <X size={12} />
              </button>
            </span>
          ))}
          <div style={styles.muteAddRow}>
            <input
              value={newMuteTag}
              onChange={(e) => setNewMuteTag(e.target.value)}
              placeholder="Add tag"
              style={styles.muteInput}
              onKeyDown={(e) => e.key === "Enter" && addMutedTag()}
            />
            <button style={styles.muteAddBtn} onClick={addMutedTag}>Add</button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div style={{ ...styles.subsectionTitle, marginTop: 24 }}>Notifications</div>
      {NOTIFICATION_ITEMS.map((item) => (
        <label key={item.key} style={styles.checkRow}>
          <input
            type="checkbox"
            checked={notifs[item.key] || false}
            onChange={() => setNotifs({ ...notifs, [item.key]: !notifs[item.key] })}
            style={styles.checkbox}
          />
          <span>{item.label}</span>
        </label>
      ))}

      <button
        style={{ ...styles.saveBtn, opacity: saving ? 0.6 : 1 }}
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Preferences"}
      </button>
    </section>
  );
}

const styles = {
  section: { marginBottom: 8 },
  sectionTitle: {
    fontSize: 16, fontWeight: 800, color: "#1A1A1A", margin: "0 0 16px",
    paddingBottom: 10, borderBottom: "1px solid #F0F0F0",
  },
  subsectionTitle: {
    fontSize: 13, fontWeight: 700, color: "#888", textTransform: "uppercase",
    letterSpacing: 0.5, marginBottom: 12,
  },
  toggleRow: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "10px 0", borderBottom: "1px solid #F8F8F8",
  },
  toggleInfo: { flex: 1 },
  toggleLabel: { fontSize: 14, fontWeight: 600, color: "#1A1A1A" },
  toggleDesc: { fontSize: 12, color: "#999", marginTop: 2 },
  toggle: {
    width: 42, height: 24, borderRadius: 12, border: "none",
    cursor: "pointer", position: "relative", padding: 0,
    transition: "background 0.2s", flexShrink: 0,
  },
  toggleKnob: {
    width: 20, height: 20, borderRadius: "50%", background: "#fff",
    position: "absolute", top: 2, transition: "transform 0.2s",
    boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
  },
  selectRow: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "10px 0", borderBottom: "1px solid #F8F8F8",
  },
  selectLabel: { fontSize: 14, color: "#1A1A1A" },
  select: {
    padding: "8px 12px", borderRadius: 8, border: "1px solid #E0E0E0",
    background: "#F5F5F5", fontSize: 13, color: "#1A1A1A", outline: "none",
  },
  checkRow: {
    display: "flex", alignItems: "center", gap: 10, padding: "8px 0",
    fontSize: 14, color: "#1A1A1A", cursor: "pointer",
  },
  checkbox: { width: 18, height: 18, accentColor: "#F26522" },
  muteLabel: { fontSize: 14, fontWeight: 600, color: "#1A1A1A" },
  muteHint: { fontSize: 12, color: "#999", marginBottom: 8 },
  mutedRow: { display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" },
  mutedChip: {
    display: "flex", alignItems: "center", gap: 4, padding: "5px 10px",
    borderRadius: 999, background: "#F5F5F5", fontSize: 13, color: "#1A1A1A", fontWeight: 500,
  },
  mutedRemove: {
    background: "none", border: "none", cursor: "pointer", color: "#999",
    padding: 0, display: "flex",
  },
  muteAddRow: { display: "flex", gap: 4, alignItems: "center" },
  muteInput: {
    padding: "6px 10px", borderRadius: 8, border: "1px solid #E0E0E0",
    background: "#F5F5F5", fontSize: 13, outline: "none", width: 100,
  },
  muteAddBtn: {
    padding: "6px 10px", borderRadius: 8, border: "none", background: "#F26522",
    color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer",
  },
  saveBtn: {
    width: "100%", padding: 13, borderRadius: 12, border: "none",
    background: "linear-gradient(135deg, #F26522, #FF8A50)", color: "#fff",
    fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 20,
  },
};
