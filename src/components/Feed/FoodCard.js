import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";

/* ----------------------------
   Helper: Comment Input
----------------------------- */
function CommentInput({ onAddComment, disabled = false }) {
  const [text, setText] = useState("");

  const canSubmit = !disabled && typeof onAddComment === "function";

  const handleSubmit = () => {
    if (!canSubmit) return;
    if (!text.trim()) return;
    onAddComment(text.trim());
    setText("");
  };

  return (
    <input
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder={
        disabled
          ? "You can’t interact with this user"
          : canSubmit
          ? "Add a comment..."
          : "Comments unavailable"
      }
      disabled={!canSubmit}
      style={{
        width: "100%",
        marginTop: 12,
        padding: 10,
        borderRadius: 8,
        border: "none",
        outline: "none",
        opacity: canSubmit ? 1 : 0.6,
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleSubmit();
      }}
    />
  );
}

/* ----------------------------
   Main Component (DUMB)
----------------------------- */
function FoodCard({
  food,
  liked = false,
  likes = 0,
  comments = [],
  userMap = {},
  onToggleLike,
  onAddComment,
  onOpenComments,
  disabled = false, // ✅ NEW: block-gated UI
}) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  if (!food) return null;

  const commentsCount =
    typeof food.commentsCount === "number" ? food.commentsCount : comments.length;

  return (
    <div style={styles.card}>
      {/* Video */}
      <div style={styles.media}>
        <video autoPlay loop muted playsInline style={styles.video}>
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Actions */}
      <div style={styles.actions}>
        <button
          style={{
            ...styles.actionBtn,
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? "not-allowed" : "pointer",
          }}
          onClick={disabled ? undefined : onToggleLike}
          disabled={disabled}
          title={disabled ? "You can’t interact with this user" : ""}
        >
          {liked ? "❤️" : "🤍"} {likes}
        </button>

        <button
          style={{
            ...styles.actionBtn,
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? "not-allowed" : "pointer",
          }}
          onClick={() => {
            if (disabled) return;
            setIsOpen(true);
            if (typeof onOpenComments === "function") onOpenComments();
          }}
          disabled={disabled}
          title={disabled ? "You can’t interact with this user" : ""}
        >
          💬 {commentsCount}
        </button>

        {disabled ? (
          <div style={styles.disabledHint}>Blocked</div>
        ) : null}
      </div>

      {/* Info */}
      <div style={styles.info}>
        <h3>
          {food.dish} · ${food.price}
        </h3>
        <p>{food.restaurant}</p>
        <p>{food.distance} mi</p>
      </div>

      {/* Comments Modal */}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <h3>{food.dish}</h3>

          <div style={{ maxHeight: 300, overflowY: "auto" }}>
            {Array.isArray(comments) && comments.length > 0 ? (
              comments.map((c) => {
                const handle =
                  userMap?.[c.userId]?.handle || c.userHandle || "anon";

                return (
                  <p key={c.id}>
                    <button
                      type="button"
                      onClick={() => navigate(`/u/${handle}`)}
                      style={styles.handleBtn}
                      title={`View @${handle}`}
                    >
                      @{handle}
                    </button>
                    : {c.text}
                  </p>
                );
              })
            ) : (
              <p style={{ opacity: 0.6 }}>No comments yet</p>
            )}
          </div>

          <CommentInput onAddComment={onAddComment} disabled={disabled} />
        </Modal>
      )}
    </div>
  );
}

/* ----------------------------
   Styles (Snap Safe)
----------------------------- */
const styles = {
  card: {
    height: "100vh",
    width: "100vw",
    background: "#000",
    color: "#fff",
    position: "relative",
    scrollSnapAlign: "start",
    scrollSnapStop: "always",
  },
  media: {
    position: "absolute",
    inset: 0,
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  actions: {
    position: "absolute",
    right: 12,
    bottom: 120,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    zIndex: 10,
    alignItems: "flex-end",
  },
  actionBtn: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: 16,
  },
  disabledHint: {
    fontSize: 12,
    fontWeight: 800,
    padding: "4px 8px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.18)",
    opacity: 0.9,
  },
  info: {
    position: "absolute",
    bottom: 20,
    left: 12,
    zIndex: 10,
  },
  handleBtn: {
    background: "transparent",
    border: "none",
    padding: 0,
    margin: 0,
    color: "#fff",
    fontWeight: 800,
    cursor: "pointer",
    textDecoration: "underline",
    textUnderlineOffset: 3,
  },
};

export default FoodCard;
