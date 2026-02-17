import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

export default function UserResult({ user, onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (typeof onClick === "function") onClick();
    if (user.handle) navigate(`/u/${user.handle}`);
  };

  return (
    <button onClick={handleClick} style={styles.row}>
      {user.photoURL ? (
        <img src={user.photoURL} alt="" style={styles.avatar} />
      ) : (
        <div style={styles.avatarFallback}>
          <User size={16} color="#fff" />
        </div>
      )}

      <div style={styles.info}>
        <div style={styles.name}>
          {user.displayName || user.handle || "User"}
        </div>
        <div style={styles.meta}>
          {user.handle && <span style={styles.handle}>@{user.handle}</span>}
          {typeof user.followersCount === "number" && user.followersCount > 0 && (
            <span style={styles.followers}>
              {formatCount(user.followersCount)} followers
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

function formatCount(n) {
  if (typeof n !== "number" || n <= 0) return "0";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

const styles = {
  row: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 16px",
    width: "100%",
    background: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    borderRadius: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    objectFit: "cover",
    flexShrink: 0,
  },
  avatarFallback: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    flexShrink: 0,
    background: "#F26522",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1A1A1A",
    marginBottom: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  meta: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 12,
    color: "#999",
  },
  handle: {
    fontWeight: 500,
  },
  followers: {},
};
