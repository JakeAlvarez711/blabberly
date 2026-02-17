import { MessageCircle } from "lucide-react";

export default function CommentButton({ count = 0, onClick, disabled = false }) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        ...styles.btn,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <MessageCircle
        size={26}
        color="#FFFFFF"
        strokeWidth={2}
        style={styles.icon}
      />
      <span style={styles.count}>{formatCount(count)}</span>
    </button>
  );
}

function formatCount(n) {
  if (typeof n !== "number" || n <= 0) return "0";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

const styles = {
  btn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    background: "none",
    border: "none",
    padding: 0,
  },
  icon: {
    filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.5))",
  },
  count: {
    fontSize: 12,
    fontWeight: 600,
    color: "#FFFFFF",
    textShadow: "0 1px 3px rgba(0,0,0,0.5)",
  },
};
