import { User } from "lucide-react";

function formatRelativeTime(ts) {
  if (!ts) return "";
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d`;
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

function truncate(str, max) {
  if (!str) return "";
  return str.length > max ? str.slice(0, max) + "..." : str;
}

export default function ConversationItem({ conversation, otherUser, uid, active, onClick }) {
  const lastMsg = conversation.lastMessage;
  const unread = conversation.unreadCount?.[uid] || 0;
  const hasUnread = unread > 0;

  return (
    <button
      style={{
        ...styles.item,
        background: active ? "#F5F0EB" : "transparent",
      }}
      onClick={onClick}
    >
      {/* Avatar */}
      <div style={styles.avatarWrap}>
        {otherUser?.photoURL ? (
          <img src={otherUser.photoURL} alt="" style={styles.avatar} />
        ) : (
          <div style={styles.avatarFallback}>
            <User size={18} color="#fff" />
          </div>
        )}
      </div>

      {/* Content */}
      <div style={styles.content}>
        <div style={styles.topRow}>
          <span style={{
            ...styles.name,
            fontWeight: hasUnread ? 800 : 600,
          }}>
            {otherUser?.displayName || otherUser?.handle || "User"}
          </span>
          <span style={styles.time}>
            {formatRelativeTime(lastMsg?.timestamp)}
          </span>
        </div>
        <div style={styles.bottomRow}>
          <span style={{
            ...styles.preview,
            fontWeight: hasUnread ? 600 : 400,
            color: hasUnread ? "#1A1A1A" : "#999",
          }}>
            {lastMsg?.senderId === uid ? "You: " : ""}
            {truncate(lastMsg?.text, 40) || "No messages yet"}
          </span>
          {hasUnread && <div style={styles.badge}>{unread}</div>}
        </div>
      </div>
    </button>
  );
}

const styles = {
  item: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 16px",
    width: "100%",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    borderBottom: "1px solid #F5F5F5",
    transition: "background 0.1s",
  },
  avatarWrap: {
    position: "relative",
    flexShrink: 0,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: "50%",
    objectFit: "cover",
  },
  avatarFallback: {
    width: 48,
    height: 48,
    borderRadius: "50%",
    background: "#E0E0E0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
  },
  topRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  name: {
    fontSize: 14,
    color: "#1A1A1A",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  time: {
    fontSize: 12,
    color: "#999",
    flexShrink: 0,
  },
  bottomRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 2,
  },
  preview: {
    fontSize: 13,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flex: 1,
  },
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    background: "#F26522",
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 5px",
    flexShrink: 0,
  },
};
