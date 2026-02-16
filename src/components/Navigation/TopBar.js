import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function TopBar({
  title = "",
  onBack, // optional override
  right,  // optional right-side JSX (buttons/icons)
}) {
  const navigate = useNavigate();

  return (
    <div style={styles.wrap}>
      <button
        type="button"
        onClick={onBack || (() => navigate(-1))}
        style={styles.backBtn}
        aria-label="Back"
      >
        <ChevronLeft size={22} />
      </button>

      <div style={styles.title} title={title}>
        {title}
      </div>

      <div style={styles.right}>{right || null}</div>
    </div>
  );
}

const styles = {
  wrap: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: 56,
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "0 12px",
    zIndex: 9999,
    color: "#fff",
    background:
      "linear-gradient(180deg, rgba(0,0,0,0.65), rgba(0,0,0,0.00))",
    backdropFilter: "blur(8px)",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(0,0,0,0.35)",
    color: "#fff",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
  },
  title: {
    flex: 1,
    fontWeight: 800,
    fontSize: 16,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    opacity: 0.95,
  },
  right: {
    minWidth: 40,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 8,
  },
};
