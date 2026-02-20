import { useMemo } from "react";
import { Check, CheckCheck } from "lucide-react";

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

function linkify(text) {
  const parts = text.split(URL_REGEX);
  return parts.map((part, i) => {
    if (URL_REGEX.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "inherit", textDecoration: "underline" }}
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

function formatTime(ts) {
  if (!ts) return "";
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export default function MessageBubble({ message, isMine }) {
  const content = useMemo(() => linkify(message.text || ""), [message.text]);

  return (
    <div style={{
      ...styles.row,
      justifyContent: isMine ? "flex-end" : "flex-start",
    }}>
      <div style={{
        ...styles.bubble,
        background: isMine ? "#F26522" : "#F0F0F0",
        color: isMine ? "#fff" : "#1A1A1A",
        borderBottomRightRadius: isMine ? 4 : 16,
        borderBottomLeftRadius: isMine ? 16 : 4,
      }}>
        <div style={styles.text}>{content}</div>
        <div style={{
          ...styles.meta,
          justifyContent: isMine ? "flex-end" : "flex-start",
        }}>
          <span style={{
            ...styles.time,
            color: isMine ? "rgba(255,255,255,0.7)" : "#999",
          }}>
            {formatTime(message.createdAt)}
          </span>
          {isMine && (
            message.read ? (
              <CheckCheck size={14} color="rgba(255,255,255,0.8)" />
            ) : (
              <Check size={14} color="rgba(255,255,255,0.5)" />
            )
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  row: {
    display: "flex",
    padding: "2px 0",
  },
  bubble: {
    maxWidth: "75%",
    padding: "10px 14px",
    borderRadius: 16,
    wordBreak: "break-word",
  },
  text: {
    fontSize: 14,
    lineHeight: 1.45,
    whiteSpace: "pre-wrap",
  },
  meta: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  time: {
    fontSize: 11,
  },
};
