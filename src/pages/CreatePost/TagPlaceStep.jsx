import { useState, useRef, useCallback, useEffect } from "react";
import { MapPin, X, Search, ArrowLeft } from "lucide-react";

export default function TagPlaceStep({ media, place, onPlaceChange, onNext, onBack, isLoaded }) {
  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const autocompleteRef = useRef(null);
  const placesRef = useRef(null);
  const hiddenDivRef = useRef(null);
  const debounceRef = useRef(null);

  // Initialize services once Google Maps API is loaded
  useEffect(() => {
    if (!isLoaded || !window.google) return;
    autocompleteRef.current = new window.google.maps.places.AutocompleteService();
    placesRef.current = new window.google.maps.places.PlacesService(hiddenDivRef.current);
  }, [isLoaded]);

  const searchPlaces = useCallback((input) => {
    if (!input.trim() || !autocompleteRef.current) {
      setPredictions([]);
      return;
    }
    setLoading(true);
    autocompleteRef.current.getPlacePredictions(
      { input, types: ["establishment"] },
      (results, status) => {
        setLoading(false);
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          setPredictions(results);
        } else {
          setPredictions([]);
        }
      },
    );
  }, []);

  const handleInputChange = useCallback((e) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => searchPlaces(val), 300);
  }, [searchPlaces]);

  const selectPlace = useCallback((prediction) => {
    if (!placesRef.current) return;
    placesRef.current.getDetails(
      { placeId: prediction.place_id, fields: ["name", "formatted_address", "geometry", "types"] },
      (result, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && result) {
          onPlaceChange({
            placeId: prediction.place_id,
            name: result.name,
            address: result.formatted_address,
            lat: result.geometry?.location?.lat(),
            lng: result.geometry?.location?.lng(),
            category: result.types?.[0] || "",
          });
          setQuery("");
          setPredictions([]);
        }
      },
    );
  }, [onPlaceChange]);

  const mediaThumb = media?.localPreview || media?.url;
  const isVideo = media?.type === "video";

  return (
    <div>
      {/* Hidden div for PlacesService */}
      <div ref={hiddenDivRef} style={{ display: "none" }} />

      {/* Media thumbnail */}
      {mediaThumb && (
        <div style={styles.thumbRow}>
          {isVideo ? (
            <video src={mediaThumb} muted style={styles.thumb} />
          ) : (
            <img src={mediaThumb} alt="" style={styles.thumb} />
          )}
          <span style={styles.thumbLabel}>Tag a place</span>
        </div>
      )}

      {/* Selected place card */}
      {place ? (
        <div style={styles.placeCard}>
          <MapPin size={18} color="#F26522" />
          <div style={styles.placeInfo}>
            <div style={styles.placeName}>{place.name}</div>
            <div style={styles.placeAddress}>{place.address}</div>
          </div>
          <button style={styles.placeRemove} onClick={() => onPlaceChange(null)}>
            <X size={14} />
          </button>
        </div>
      ) : (
        <>
          {/* Search input */}
          <div style={styles.searchWrap}>
            <Search size={16} color="#666" />
            <input
              style={styles.searchInput}
              placeholder="Search for a restaurant, bar, cafe..."
              value={query}
              onChange={handleInputChange}
            />
          </div>

          {/* Results */}
          {loading && <div style={styles.hint}>Searching...</div>}
          {predictions.length > 0 && (
            <div style={styles.resultsList}>
              {predictions.map((p) => (
                <button
                  key={p.place_id}
                  style={styles.resultItem}
                  onClick={() => selectPlace(p)}
                >
                  <MapPin size={16} color="#888" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={styles.resultName}>
                      {p.structured_formatting?.main_text || p.description}
                    </div>
                    <div style={styles.resultDesc}>
                      {p.structured_formatting?.secondary_text || ""}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Actions */}
      <div style={styles.actions}>
        <button style={styles.backBtn} onClick={onBack}>
          <ArrowLeft size={16} /> Back
        </button>
        <button style={styles.skipLink} onClick={() => { onPlaceChange(null); onNext(); }}>
          Skip
        </button>
        <button
          style={{
            ...styles.nextBtn,
            opacity: place ? 1 : 0.4,
            cursor: place ? "pointer" : "default",
          }}
          disabled={!place}
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

const styles = {
  thumbRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 10,
    objectFit: "cover",
    background: "#000",
  },
  thumbLabel: {
    fontSize: 16,
    fontWeight: 700,
    color: "#fff",
  },
  placeCard: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 14px",
    borderRadius: 12,
    background: "rgba(242,101,34,0.08)",
    border: "1px solid rgba(242,101,34,0.25)",
  },
  placeInfo: { flex: 1 },
  placeName: { fontSize: 14, fontWeight: 700, color: "#fff" },
  placeAddress: { fontSize: 12, color: "#999", marginTop: 2 },
  placeRemove: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.1)",
    border: "none",
    color: "#ccc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },
  searchWrap: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.06)",
  },
  searchInput: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
    fontSize: 14,
  },
  hint: {
    fontSize: 13,
    color: "#888",
    marginTop: 8,
    paddingLeft: 4,
  },
  resultsList: {
    marginTop: 8,
    maxHeight: 240,
    overflowY: "auto",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
  },
  resultItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    padding: "10px 14px",
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    cursor: "pointer",
    textAlign: "left",
    color: "#fff",
  },
  resultName: {
    fontSize: 14,
    fontWeight: 600,
    color: "#fff",
  },
  resultDesc: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 24,
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    padding: "10px 16px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "transparent",
    color: "#ccc",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
  skipLink: {
    background: "none",
    border: "none",
    color: "#888",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    textDecoration: "underline",
    padding: "8px 4px",
  },
  nextBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg, #F26522, #FF8A50)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
  },
};
