// src/pages/CreatePostPage.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { createPost } from "../data/postService";

function CreatePostPage() {
  const navigate = useNavigate();
  const { user, ready } = useAuth();

  const [dish, setDish] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [price, setPrice] = useState("");
  const [distance, setDistance] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async () => {
    setError("");
    if (!ready) return;
    if (!user?.uid) {
      setError("You must be signed in.");
      return;
    }

    setSaving(true);
    try {
      await createPost(user.uid, {
        dish,
        restaurant,
        videoURL,
        price,
        distance,
      });

      navigate("/"); // back to feed
    } catch (e) {
      setError(e?.message || "Failed to create post");
    } finally {
      setSaving(false);
    }
  };

  if (!ready) return null;

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Create Post</h2>

      {error ? <div style={styles.error}>{error}</div> : null}

      <label style={styles.label}>Dish</label>
      <input
        style={styles.input}
        value={dish}
        onChange={(e) => setDish(e.target.value)}
        placeholder="e.g., Spicy tuna roll"
      />

      <label style={styles.label}>Restaurant</label>
      <input
        style={styles.input}
        value={restaurant}
        onChange={(e) => setRestaurant(e.target.value)}
        placeholder="e.g., Sushi Place"
      />

      <label style={styles.label}>Video URL (v1)</label>
      <input
        style={styles.input}
        value={videoURL}
        onChange={(e) => setVideoURL(e.target.value)}
        placeholder="https://..."
      />

      <div style={styles.row}>
        <div style={styles.col}>
          <label style={styles.label}>Price (optional)</label>
          <input
            style={styles.input}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            inputMode="decimal"
            placeholder="e.g., 14.99"
          />
        </div>

        <div style={styles.col}>
          <label style={styles.label}>Distance mi (optional)</label>
          <input
            style={styles.input}
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            inputMode="decimal"
            placeholder="e.g., 2.4"
          />
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={saving}
        style={{ ...styles.button, opacity: saving ? 0.6 : 1 }}
      >
        {saving ? "Posting..." : "Post"}
      </button>

      <button onClick={() => navigate("/")} style={styles.secondary}>
        Cancel
      </button>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    padding: 16,
    background: "#0b0b0b",
    color: "#fff",
    overflowY: "auto",
  },
  title: { marginTop: 0 },
  error: {
    background: "rgba(255,0,0,0.12)",
    border: "1px solid rgba(255,0,0,0.25)",
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
  },
  label: { display: "block", marginTop: 12, marginBottom: 6, opacity: 0.9 },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    outline: "none",
  },
  row: { display: "flex", gap: 12, marginTop: 8 },
  col: { flex: 1 },
  button: {
    width: "100%",
    marginTop: 18,
    padding: 12,
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
  },
  secondary: {
    width: "100%",
    marginTop: 10,
    padding: 12,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "transparent",
    color: "#fff",
    cursor: "pointer",
  },
};

export default CreatePostPage;
