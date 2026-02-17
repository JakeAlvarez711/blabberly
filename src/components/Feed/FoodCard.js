import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";
import CommentButton from "./CommentButton";
import { slugify } from "../../data/placeAlgorithms";

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
          ? "You can't interact with this user"
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
  saved = false,
  comments = [],
  userMap = {},
  onToggleLike,
  onToggleSave,
  onAddComment,
  onOpenComments,
  disabled = false,
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
        {food.videoURL ? (
          <video autoPlay loop muted playsInline style={styles.video}>
            <source src={food.videoURL} type="video/mp4" />
          </video>
        ) : (
          <video autoPlay loop muted playsInline style={styles.video}>
            <source
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              type="video/mp4"
            />
          </video>
        )}
      </div>

      {/* Actions */}
      <div style={styles.actions}>
        <LikeButton
          liked={liked}
          count={likes}
          onToggle={onToggleLike}
          disabled={disabled}
        />
        <CommentButton
          count={commentsCount}
          onClick={() => {
            if (food?._docId) {
              navigate(`/p/${food._docId}`);
            } else {
              setIsOpen(true);
              if (typeof onOpenComments === "function") onOpenComments();
            }
          }}
          disabled={disabled}
        />
        <SaveButton
          saved={saved}
          onToggle={onToggleSave}
          disabled={disabled}
        />

        {disabled ? (
          <div style={styles.disabledHint}>Blocked</div>
        ) : null}
      </div>

      {/* Info */}
      <div style={styles.info}>
        <div style={styles.infoOverlay}>
          {food.authorHandle && (
            <div style={styles.username}>@{food.authorHandle}</div>
          )}
          <div style={styles.dishLine}>
            {food.dish}
            {typeof food.price === "number" ? ` · $${food.price}` : ""}
          </div>
          {food.restaurant && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/place/${slugify(food.restaurant)}`);
              }}
              style={styles.restaurantBtn}
            >
              {food.restaurant}
            </button>
          )}
          {food.city && (
            <div style={styles.city}>{food.city}</div>
          )}
        </div>
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
    height: "100%",
    width: "100%",
    background: "#000",
    color: "#fff",
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
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
    bottom: 80,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    zIndex: 10,
    alignItems: "center",
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
    bottom: 0,
    left: 0,
    right: 60,
    zIndex: 10,
  },
  infoOverlay: {
    padding: "40px 16px 16px",
    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
  },
  username: {
    fontSize: 14,
    fontWeight: 700,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  dishLine: {
    fontSize: 16,
    fontWeight: 800,
    color: "#FFFFFF",
    marginBottom: 2,
  },
  restaurantBtn: {
    display: "block",
    background: "transparent",
    border: "none",
    padding: 0,
    margin: 0,
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    marginBottom: 2,
    cursor: "pointer",
    textDecoration: "underline",
    textDecorationColor: "rgba(255,255,255,0.4)",
    textUnderlineOffset: 2,
    textAlign: "left",
  },
  city: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
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
