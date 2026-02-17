import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function SavedPlaces({ uid, isOwnProfile }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!uid || !isOwnProfile) return;

    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        const snap = await getDocs(collection(db, "users", uid, "savedPlaces"));
        if (!cancelled) {
          setPlaces(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        }
      } catch (e) {
        console.error("Failed to load saved places:", e);
        if (!cancelled) setPlaces([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [uid, isOwnProfile]);

  if (!isOwnProfile) {
    return (
      <div style={styles.private}>
        Saved places are private
      </div>
    );
  }

  if (loading) {
    return <div style={styles.loading}>Loading saved places...</div>;
  }

  if (!places.length) {
    return <div style={styles.empty}>No saved places yet.</div>;
  }

  return (
    <div style={styles.grid}>
      {places.map((place) => (
        <div key={place.id} style={styles.card}>
          <div style={styles.placeName}>{place.name || place.placeId || "Unknown"}</div>
          {place.category && (
            <div style={styles.placeCategory}>{place.category}</div>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: 10,
    padding: "0 24px",
  },
  card: {
    background: "#F5F5F5",
    borderRadius: 12,
    padding: 14,
  },
  placeName: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1A1A1A",
  },
  placeCategory: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  private: {
    padding: "32px 24px",
    textAlign: "center",
    color: "#999",
    fontSize: 14,
  },
  loading: {
    padding: "24px",
    textAlign: "center",
    color: "#999",
    fontSize: 14,
  },
  empty: {
    padding: "24px",
    textAlign: "center",
    color: "#999",
    fontSize: 14,
  },
};
