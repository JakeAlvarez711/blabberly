import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useJsApiLoader } from "@react-google-maps/api";

import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";
import { useAuth } from "../../hooks/useAuth";
import { createPost } from "../../data/postService";

import UploadStep from "./UploadStep";
import TagPlaceStep from "./TagPlaceStep";
import CaptionTagsStep from "./CaptionTagsStep";

const LIBRARIES = ["visualization", "places"];
const STEP_LABELS = ["Upload", "Place", "Details"];

export default function CreatePostPage() {
  const navigate = useNavigate();
  const { user, ready, userDoc } = useAuth();

  const [step, setStep] = useState(0);
  const [media, setMedia] = useState(null);
  const [place, setPlace] = useState(null);
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState([]);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  const handlePost = useCallback(async () => {
    if (!user?.uid || !media?.url) return;
    setError("");
    setPosting(true);
    try {
      await createPost(user.uid, {
        media,
        place: place || null,
        caption: caption.trim(),
        tags,
        city: userDoc?.homeCity || "",
      });
      navigate("/");
    } catch (e) {
      setError(e?.message || "Failed to create post");
    } finally {
      setPosting(false);
    }
  }, [user, media, place, caption, tags, userDoc, navigate]);

  if (!ready) return null;

  return (
    <div style={styles.page}>
      <Header />
      <Sidebar userDoc={userDoc} />

      <div style={styles.main}>
        <div style={styles.card}>
          <h2 style={styles.title}>Create Post</h2>

          {/* Step indicator */}
          <div style={styles.steps}>
            {STEP_LABELS.map((label, i) => (
              <div key={label} style={styles.stepItem}>
                <div style={{
                  ...styles.stepDot,
                  background: i <= step ? "#F26522" : "rgba(255,255,255,0.15)",
                }} />
                <span style={{
                  ...styles.stepLabel,
                  color: i === step ? "#F26522" : "#666",
                  fontWeight: i === step ? 700 : 400,
                }}>{label}</span>
              </div>
            ))}
          </div>

          {error && <div style={styles.error}>{error}</div>}

          {step === 0 && (
            <UploadStep
              userId={user?.uid}
              media={media}
              onMediaChange={setMedia}
              onNext={() => setStep(1)}
            />
          )}

          {step === 1 && (
            <TagPlaceStep
              media={media}
              place={place}
              onPlaceChange={setPlace}
              onNext={() => setStep(2)}
              onBack={() => setStep(0)}
              isLoaded={isLoaded}
            />
          )}

          {step === 2 && (
            <CaptionTagsStep
              media={media}
              place={place}
              caption={caption}
              tags={tags}
              onCaptionChange={setCaption}
              onTagsChange={setTags}
              onPost={handlePost}
              onBack={() => setStep(1)}
              posting={posting}
            />
          )}

          <button onClick={() => navigate("/")} style={styles.cancelBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    background: "#0b0b0b",
    overflow: "hidden",
  },
  main: {
    position: "fixed",
    top: 65,
    left: 240,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    overflowY: "auto",
    padding: "40px 20px",
  },
  card: {
    width: "100%",
    maxWidth: 600,
    background: "#111118",
    borderRadius: 18,
    padding: 28,
  },
  title: {
    margin: 0,
    fontSize: 22,
    fontWeight: 800,
    color: "#fff",
    marginBottom: 18,
  },
  steps: {
    display: "flex",
    alignItems: "center",
    gap: 24,
    marginBottom: 24,
  },
  stepItem: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    transition: "background 0.2s",
  },
  stepLabel: {
    fontSize: 13,
    transition: "color 0.2s",
  },
  error: {
    background: "rgba(255,0,0,0.12)",
    border: "1px solid rgba(255,0,0,0.25)",
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 13,
    color: "#ff6b6b",
  },
  cancelBtn: {
    width: "100%",
    marginTop: 12,
    padding: 10,
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "transparent",
    color: "#888",
    fontSize: 13,
    cursor: "pointer",
  },
};
