import { useState, useRef } from "react";
import { Bookmark } from "lucide-react";

export default function SaveButton({ saved = false, onToggle, disabled = false }) {
  const [animating, setAnimating] = useState(false);
  const debounceRef = useRef(false);

  const handleClick = () => {
    if (disabled || debounceRef.current) return;
    debounceRef.current = true;
    setTimeout(() => { debounceRef.current = false; }, 300);

    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);

    if (typeof onToggle === "function") onToggle();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      style={{
        ...styles.btn,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        transform: animating ? "scale(1.25)" : "scale(1)",
        transition: "transform 0.15s ease-out",
      }}
    >
      <Bookmark
        size={26}
        color={saved ? "#F26522" : "#FFFFFF"}
        fill={saved ? "#F26522" : "none"}
        strokeWidth={2}
        style={styles.icon}
      />
    </button>
  );
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
};
