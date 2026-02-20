import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { unblockUser } from "../../../data/blockService";
import { getPublicUser } from "../../../data/userService";

export default function BlockedUsers({ uid, onToast }) {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unblocking, setUnblocking] = useState(null);

  useEffect(() => {
    if (!uid) return;
    let cancelled = false;

    (async () => {
      try {
        const snap = await getDocs(collection(db, "users", uid, "blocks"));
        const items = [];

        for (const d of snap.docs) {
          const data = d.data();
          let profile = null;
          try { profile = await getPublicUser(d.id); } catch (_) {}

          items.push({
            blockedUid: d.id,
            handle: profile?.handle || null,
            displayName: profile?.displayName || null,
            photoURL: profile?.photoURL || null,
            createdAt: data.createdAt?.toDate?.() || null,
          });
        }

        if (!cancelled) setBlocks(items);
      } catch (e) {
        console.error("Failed to load blocks:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [uid]);

  const handleUnblock = async (blockedUid) => {
    setUnblocking(blockedUid);
    try {
      await unblockUser(uid, blockedUid);
      setBlocks((prev) => prev.filter((b) => b.blockedUid !== blockedUid));
      onToast("User unblocked");
    } catch (e) {
      onToast(e?.message || "Failed to unblock");
    } finally {
      setUnblocking(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    const diff = Date.now() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Blocked today";
    if (days === 1) return "Blocked 1 day ago";
    if (days < 7) return `Blocked ${days} days ago`;
    const weeks = Math.floor(days / 7);
    if (weeks === 1) return "Blocked 1 week ago";
    return `Blocked ${weeks} weeks ago`;
  };

  return (
    <section style={styles.section}>
      <h3 style={styles.sectionTitle}>Blocked Users</h3>
      <div style={styles.hint}>
        Blocked users can't see your profile, posts, or message you.
      </div>

      {loading ? (
        <div style={styles.empty}>Loading...</div>
      ) : blocks.length === 0 ? (
        <div style={styles.empty}>No blocked users</div>
      ) : (
        <div style={styles.list}>
          {blocks.map((b) => (
            <div key={b.blockedUid} style={styles.row}>
              {b.photoURL ? (
                <img src={b.photoURL} alt="" style={styles.avatar} />
              ) : (
                <div style={styles.avatarFallback}><User size={16} color="#fff" /></div>
              )}
              <div style={styles.info}>
                <div style={styles.name}>
                  {b.handle ? `@${b.handle}` : b.displayName || b.blockedUid.slice(0, 8)}
                </div>
                <div style={styles.date}>{formatDate(b.createdAt)}</div>
              </div>
              <button
                style={{
                  ...styles.unblockBtn,
                  opacity: unblocking === b.blockedUid ? 0.5 : 1,
                }}
                onClick={() => handleUnblock(b.blockedUid)}
                disabled={unblocking === b.blockedUid}
              >
                {unblocking === b.blockedUid ? "..." : "Unblock"}
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

const styles = {
  section: { marginBottom: 8 },
  sectionTitle: {
    fontSize: 16, fontWeight: 800, color: "#1A1A1A", margin: "0 0 6px",
    paddingBottom: 10, borderBottom: "1px solid #F0F0F0",
  },
  hint: { fontSize: 13, color: "#888", marginBottom: 16 },
  empty: { fontSize: 14, color: "#999", padding: "16px 0" },
  list: { display: "flex", flexDirection: "column", gap: 4 },
  row: {
    display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
    borderBottom: "1px solid #F8F8F8",
  },
  avatar: {
    width: 40, height: 40, borderRadius: "50%", objectFit: "cover", flexShrink: 0,
  },
  avatarFallback: {
    width: 40, height: 40, borderRadius: "50%", background: "#E0E0E0",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: 600, color: "#1A1A1A" },
  date: { fontSize: 12, color: "#999", marginTop: 2 },
  unblockBtn: {
    padding: "6px 14px", borderRadius: 8, border: "1px solid #E0E0E0",
    background: "#fff", color: "#1A1A1A", fontSize: 13, fontWeight: 600,
    cursor: "pointer", flexShrink: 0,
  },
};
