import { useEffect, useState, useMemo } from "react";
import { Plus, MessageSquare } from "lucide-react";
import { getPublicUser } from "../../data/userService";
import ConversationItem from "./ConversationItem";

export default function ConversationsList({
  conversations,
  loading,
  uid,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
}) {
  const [userProfiles, setUserProfiles] = useState({});

  // Load profiles for all conversation participants
  const otherUids = useMemo(() => {
    const uids = new Set();
    conversations.forEach((c) => {
      const other = c.participants?.find((p) => p !== uid);
      if (other) uids.add(other);
    });
    return [...uids];
  }, [conversations, uid]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const profiles = {};
      for (const otherUid of otherUids) {
        if (userProfiles[otherUid]) {
          profiles[otherUid] = userProfiles[otherUid];
          continue;
        }
        try {
          const p = await getPublicUser(otherUid);
          if (p) profiles[otherUid] = p;
        } catch (_) {}
      }
      if (!cancelled) setUserProfiles((prev) => ({ ...prev, ...profiles }));
    })();

    return () => { cancelled = true; };
  }, [otherUids]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={styles.panel}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Messages</h2>
        <button style={styles.newBtn} onClick={onNewConversation} title="New message">
          <Plus size={18} />
        </button>
      </div>

      {/* Conversations */}
      <div style={styles.list}>
        {loading ? (
          <div style={styles.empty}>Loading...</div>
        ) : conversations.length === 0 ? (
          <div style={styles.emptyState}>
            <MessageSquare size={36} color="#E0E0E0" />
            <div style={styles.emptyTitle}>No messages yet</div>
            <div style={styles.emptyDesc}>Start a conversation with someone!</div>
            <button style={styles.findBtn} onClick={onNewConversation}>Find People</button>
          </div>
        ) : (
          conversations.map((c) => {
            const otherUid = c.participants?.find((p) => p !== uid);
            return (
              <ConversationItem
                key={c.id}
                conversation={c}
                otherUser={userProfiles[otherUid] || null}
                uid={uid}
                active={c.id === activeConversationId}
                onClick={() => onSelectConversation(c.id, otherUid)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

const styles = {
  panel: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    borderRight: "1px solid #F0F0F0",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 20px 14px",
    borderBottom: "1px solid #F0F0F0",
    flexShrink: 0,
  },
  title: {
    margin: 0,
    fontSize: 20,
    fontWeight: 800,
    color: "#1A1A1A",
  },
  newBtn: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    border: "none",
    background: "#F26522",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  list: {
    flex: 1,
    overflowY: "auto",
  },
  empty: {
    padding: 24,
    textAlign: "center",
    color: "#999",
    fontSize: 14,
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 24px",
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#1A1A1A",
    marginTop: 8,
  },
  emptyDesc: {
    fontSize: 13,
    color: "#999",
  },
  findBtn: {
    marginTop: 12,
    padding: "10px 24px",
    borderRadius: 10,
    border: "none",
    background: "#F26522",
    color: "#fff",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  },
};
