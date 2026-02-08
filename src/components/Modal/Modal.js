import React from "react";

export default function Modal({ children, onClose }) {
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose} aria-label="Close">
          ×
        </button>

        <div style={styles.body}>{children}</div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",

    // ✅ must be above BottomNav / other fixed UI
    zIndex: 20000,

    // ✅ ensure overlay captures clicks
    pointerEvents: "auto",
  },

  sheet: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: "#111",
    color: "#fff",
    borderRadius: "16px 16px 0 0",
    position: "relative",

    // ✅ keep content visible / clickable
    maxHeight: "85vh",
    overflowY: "auto",

    // ✅ keeps last input row above your BottomNav (56px)
    padding: 20,
    paddingBottom: 20 + 56,

    // ✅ simple animation without CSS injection
    transform: "translateY(0)",
    transition: "transform 0.2s ease-out",
  },

  body: {
    paddingTop: 6,
  },

  closeBtn: {
    position: "absolute",
    top: 10,
    right: 14,
    background: "none",
    border: "none",
    color: "white",
    fontSize: 26,
    cursor: "pointer",
    zIndex: 1,
  },
};
