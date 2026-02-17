// src/pages/PlaceDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Header from "../components/Layout/Header";
import Sidebar from "../components/Layout/Sidebar";
import PlaceHeader from "../components/place/PlaceHeader";
import PlaceRating from "../components/place/PlaceRating";
import MustTryItems from "../components/place/MustTryItems";
import VibeSection from "../components/place/VibeSection";
import BestTimeToVisit from "../components/place/BestTimeToVisit";
import PlacePosts from "../components/place/PlacePosts";
import SimilarPlaces from "../components/place/SimilarPlaces";

import { loadPlaceData, loadSimilarPlaces } from "../data/placeService";
import { useAuth } from "../hooks/useAuth";

export default function PlaceDetailPage() {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const { userDoc } = useAuth();

  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [saved, setSaved] = useState(false);

  // Load place data
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!placeId) return;

      setLoading(true);
      try {
        const data = await loadPlaceData(placeId);
        if (cancelled) return;

        setPlace(data);

        // Load similar places in background
        if (data?.city && data?.posts?.length > 0) {
          const sim = await loadSimilarPlaces(
            data.name,
            data.city,
            data.posts,
            6
          );
          if (!cancelled) setSimilar(sim);
        }
      } catch (e) {
        console.error("Failed to load place:", e);
        if (!cancelled) setPlace(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [placeId]);

  // Loading state
  if (loading) {
    return (
      <div style={styles.page}>
        <Header />
        <Sidebar userDoc={userDoc} />
        <div style={styles.content}>
          <div style={styles.centerText}>Loading...</div>
        </div>
      </div>
    );
  }

  // Not found
  if (!place) {
    return (
      <div style={styles.page}>
        <Header />
        <Sidebar userDoc={userDoc} />
        <div style={styles.content}>
          <div style={styles.centerText}>
            Place not found
            <button onClick={() => navigate(-1)} style={styles.backLink}>
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Header />
      <Sidebar userDoc={userDoc} />

      <div style={styles.content}>
        {/* Back button */}
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <div style={styles.main}>
          <PlaceHeader
            name={place.name}
            city={place.city}
            rating={place.rating}
            totalPosts={place.totalPosts}
            visitorCount={place.visitorCount}
            saved={saved}
            onToggleSave={() => setSaved((s) => !s)}
          />

          <PlaceRating
            rating={place.rating}
            totalLikes={place.totalLikes}
            totalSaves={place.totalSaves}
            totalPosts={place.totalPosts}
          />

          <MustTryItems items={place.mustTryItems} />

          <VibeSection vibes={place.vibes} />

          <BestTimeToVisit bestTime={place.bestTime} />

          <PlacePosts posts={place.posts} />

          <SimilarPlaces places={similar} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#FFFFFF",
    color: "#1A1A1A",
  },
  content: {
    position: "fixed",
    top: 65,
    left: 240,
    right: 0,
    bottom: 0,
    overflowY: "auto",
    background: "#FFFFFF",
    padding: 24,
  },
  centerText: {
    textAlign: "center",
    padding: 40,
    color: "#999",
    fontSize: 15,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  },
  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#666",
    fontSize: 14,
    fontWeight: 600,
    padding: 0,
    marginBottom: 16,
  },
  backLink: {
    background: "none",
    border: "1px solid #E0E0E0",
    borderRadius: 8,
    padding: "8px 16px",
    cursor: "pointer",
    color: "#1A1A1A",
    fontSize: 14,
    fontWeight: 600,
  },
  main: {
    maxWidth: 720,
    margin: "0 auto",
  },
};
