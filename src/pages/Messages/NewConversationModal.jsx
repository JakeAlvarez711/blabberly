import { useState, useEffect, useRef, useCallback } from "react";
import { X, Search, User } from "lucide-react";
import { searchUsersForChat, getSuggestedUsers } from "../../data/messageService";

export default function NewConversationModal({ uid, onSelect, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
  const inputRef = useRef(null);

  // Load suggestions on mount
  useEffect(() => {
    if (!uid) return;
    let cancelled = false;

    (async () => {
      try {
        const s = await getSuggestedUsers(uid);
        if (!cancelled) setSuggestions(s);
      } catch (_) {}
    })();

    return () => { cancelled = true; };
  }, [uid]);

  // Focus input on mount
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const handleSearch = useCallback((text) => {
    setQuery(text);
    clearTimeout(debounceRef.current);

    if (!text.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const r = await searchUsersForChat(uid, text);
        setResults(r);
      } catch (_) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, [uid]);

  const displayList = query.trim() ? results : suggestions;
  const listLabel = query.trim()
    ? (loading ? "Searching..." : results.length === 0 ? "No users found" : "Results")
    : "Suggestions";

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h3 style={styles.title}>New Message</h3>
          <button style={styles.closeBtn} onClick={onClose}><X size={18} /></button>
        </div>

        {/* Search input */}
        <div style={styles.searchWrap}>
          <span style={styles.toLabel}>To:</span>
          <Search size={16} color="#999" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            style={styles.searchInput}
            placeholder="Search for a user..."
          />
        </div>

        {/* List */}
        <div style={styles.listLabel}>{listLabel}</div>
        <div style={styles.list}>
          {displayList.map((user) => (
            <button
              key={user.uid}
              style={styles.userRow}
              onClick={() => onSelect(user)}
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt="" style={styles.avatar} />
              ) : (
                <div style={styles.avatarFallback}><User size={16} color="#fff" /></div>
              )}
              <div style={styles.userInfo}>
                <div style={styles.userName}>
                  {user.displayName || user.handle || "User"}
                </div>
                <div style={styles.userMeta}>
                  {user.handle ? `@${user.handle}` : ""}
                  {user.relation ? ` · ${user.relation === "following" ? "Following" : user.relation}` : ""}
                </div>
              </div>
            </button>
          ))}
          {!loading && displayList.length === 0 && !query.trim() && (
            <div style={styles.emptyHint}>
              Follow people to see them here, or search by name
            </div>
          )}
        </div>

        <div style={styles.actions}>
          <button style={styles.cancelBtn} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
    display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
  },
  modal: {
    background: "#fff", borderRadius: 16, padding: 0, width: "100%", maxWidth: 420,
    maxHeight: "80vh", display: "flex", flexDirection: "column",
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)", overflow: "hidden",
  },
  header: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "18px 20px 12px",
  },
  title: { margin: 0, fontSize: 18, fontWeight: 800, color: "#1A1A1A" },
  closeBtn: {
    background: "none", border: "none", cursor: "pointer", color: "#999", padding: 4,
  },
  searchWrap: {
    display: "flex", alignItems: "center", gap: 8,
    margin: "0 16px 12px", padding: "10px 14px", borderRadius: 12,
    border: "1px solid #E0E0E0", background: "#F8F8F8",
  },
  toLabel: { fontSize: 14, fontWeight: 600, color: "#888", flexShrink: 0 },
  searchInput: {
    flex: 1, background: "transparent", border: "none", outline: "none",
    fontSize: 14, color: "#1A1A1A",
  },
  listLabel: {
    fontSize: 12, fontWeight: 700, color: "#999", textTransform: "uppercase",
    letterSpacing: 0.5, padding: "0 20px 8px",
  },
  list: {
    flex: 1, overflowY: "auto", borderTop: "1px solid #F0F0F0",
  },
  userRow: {
    display: "flex", alignItems: "center", gap: 12, padding: "10px 20px",
    width: "100%", background: "transparent", border: "none",
    borderBottom: "1px solid #F8F8F8", cursor: "pointer", textAlign: "left",
  },
  avatar: {
    width: 40, height: 40, borderRadius: "50%", objectFit: "cover", flexShrink: 0,
  },
  avatarFallback: {
    width: 40, height: 40, borderRadius: "50%", background: "#E0E0E0",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  userInfo: { flex: 1 },
  userName: { fontSize: 14, fontWeight: 600, color: "#1A1A1A" },
  userMeta: { fontSize: 12, color: "#999", marginTop: 2 },
  emptyHint: { padding: "24px 20px", fontSize: 13, color: "#999", textAlign: "center" },
  actions: {
    padding: "12px 20px", borderTop: "1px solid #F0F0F0",
  },
  cancelBtn: {
    width: "100%", padding: 12, borderRadius: 10, border: "1px solid #E0E0E0",
    background: "#fff", color: "#666", fontSize: 14, fontWeight: 600, cursor: "pointer",
  },
};
