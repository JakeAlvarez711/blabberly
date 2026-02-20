// src/components/map/QuickFilters.js
import { useState, useRef, useEffect } from "react";
import { ChevronDown, RotateCcw } from "lucide-react";

const CUISINES = [
  { key: "all", label: "All" },
  { key: "mexican", label: "Mexican" },
  { key: "sushi", label: "Sushi" },
  { key: "italian", label: "Italian" },
  { key: "american", label: "American" },
  { key: "thai", label: "Thai" },
  { key: "chinese", label: "Chinese" },
  { key: "japanese", label: "Japanese" },
  { key: "seafood", label: "Seafood" },
  { key: "burger", label: "Burgers" },
  { key: "pizza", label: "Pizza" },
  { key: "coffee", label: "Coffee" },
  { key: "dessert", label: "Desserts" },
  { key: "indian", label: "Indian" },
  { key: "korean", label: "Korean" },
];

const PRICE_LEVELS = ["$", "$$", "$$$", "$$$$"];

function QuickFilters({ filters, onChange, visibleCount, totalCount }) {
  const [cuisineOpen, setCuisineOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!cuisineOpen) return;
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCuisineOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [cuisineOpen]);

  const { cuisine, priceLevels, openNow, rated4Plus } = filters;

  const hasActiveFilters =
    cuisine !== "all" ||
    priceLevels.length < 4 ||
    openNow ||
    rated4Plus;

  const handleCuisineSelect = (key) => {
    onChange({ ...filters, cuisine: key });
    setCuisineOpen(false);
  };

  const togglePrice = (level) => {
    const idx = priceLevels.indexOf(level);
    let next;
    if (idx >= 0) {
      next = priceLevels.filter((p) => p !== level);
      if (next.length === 0) next = [...PRICE_LEVELS]; // can't deselect all
    } else {
      next = [...priceLevels, level];
    }
    onChange({ ...filters, priceLevels: next });
  };

  const handleReset = () => {
    onChange({
      cuisine: "all",
      priceLevels: [...PRICE_LEVELS],
      openNow: false,
      rated4Plus: false,
    });
  };

  const cuisineLabel = CUISINES.find((c) => c.key === cuisine)?.label || "All";

  return (
    <div style={styles.container}>
      <div style={styles.row}>
        {/* Cuisine dropdown */}
        <div ref={dropdownRef} style={styles.dropdownWrap}>
          <button
            onClick={() => setCuisineOpen(!cuisineOpen)}
            style={{
              ...styles.pill,
              ...(cuisine !== "all" ? styles.pillActive : {}),
            }}
          >
            {cuisineLabel}
            <ChevronDown size={14} />
          </button>
          {cuisineOpen && (
            <div style={styles.dropdown}>
              {CUISINES.map((c) => (
                <button
                  key={c.key}
                  onClick={() => handleCuisineSelect(c.key)}
                  style={{
                    ...styles.dropdownItem,
                    ...(cuisine === c.key ? styles.dropdownItemActive : {}),
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price pills */}
        {PRICE_LEVELS.map((level, i) => (
          <button
            key={level}
            onClick={() => togglePrice(level)}
            style={{
              ...styles.pill,
              ...(priceLevels.includes(level) ? styles.pillActive : {}),
              minWidth: 36,
              padding: "5px 8px",
            }}
          >
            {"$".repeat(i + 1)}
          </button>
        ))}

        {/* Toggle: Open Now */}
        <button
          onClick={() => onChange({ ...filters, openNow: !openNow })}
          style={{
            ...styles.pill,
            ...(openNow ? styles.pillActive : {}),
          }}
        >
          Open Now
        </button>

        {/* Toggle: 4.0+ */}
        <button
          onClick={() => onChange({ ...filters, rated4Plus: !rated4Plus })}
          style={{
            ...styles.pill,
            ...(rated4Plus ? styles.pillActive : {}),
          }}
        >
          4.0+
        </button>

        {/* Reset */}
        {hasActiveFilters && (
          <button onClick={handleReset} style={styles.resetBtn}>
            <RotateCcw size={13} />
          </button>
        )}

        {/* Count */}
        <span style={styles.count}>
          {visibleCount} of {totalCount} spots
        </span>
      </div>
    </div>
  );
}

export const DEFAULT_FILTERS = {
  cuisine: "all",
  priceLevels: [...PRICE_LEVELS],
  openNow: false,
  rated4Plus: false,
};

/**
 * Apply filters to a list of places. Returns filtered array.
 */
export function applyFilters(places, filters) {
  return places.filter((place) => {
    // Cuisine filter
    if (filters.cuisine !== "all") {
      const nameLower = (place.name || "").toLowerCase();
      const types = (place.types || []).join(" ");
      const searchStr = `${nameLower} ${types}`;
      if (!searchStr.includes(filters.cuisine)) return false;
    }

    // Price filter
    if (filters.priceLevels.length < 4 && place.price_level != null) {
      const placePrice = "$".repeat(Math.max(1, place.price_level));
      if (!filters.priceLevels.includes(placePrice)) return false;
    }

    // Open Now
    if (filters.openNow) {
      const isOpen = place.opening_hours?.isOpen?.();
      if (isOpen === false) return false;
    }

    // Rated 4.0+
    if (filters.rated4Plus) {
      if (!place.rating || place.rating < 4.0) return false;
    }

    return true;
  });
}

const styles = {
  container: {
    position: "absolute",
    top: 52,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    flexWrap: "nowrap",
    overflowX: "auto",
    scrollbarWidth: "none",
    padding: "4px 0",
  },
  pill: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    padding: "5px 12px",
    borderRadius: 8,
    border: "1px solid #e0e0e0",
    background: "#fff",
    color: "#555",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  pillActive: {
    background: "#F26522",
    color: "#fff",
    borderColor: "#F26522",
  },
  dropdownWrap: {
    position: "relative",
    flexShrink: 0,
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    marginTop: 4,
    background: "#fff",
    borderRadius: 10,
    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
    padding: "4px 0",
    zIndex: 100,
    maxHeight: 240,
    overflowY: "auto",
    minWidth: 140,
  },
  dropdownItem: {
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: "8px 14px",
    border: "none",
    background: "none",
    fontSize: 13,
    color: "#333",
    cursor: "pointer",
    fontWeight: 500,
  },
  dropdownItemActive: {
    color: "#F26522",
    fontWeight: 700,
    background: "#FFF5F0",
  },
  resetBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 8,
    border: "1px solid #e0e0e0",
    background: "#fff",
    cursor: "pointer",
    flexShrink: 0,
    color: "#999",
  },
  count: {
    fontSize: 11,
    color: "#999",
    fontWeight: 500,
    whiteSpace: "nowrap",
    flexShrink: 0,
    marginLeft: "auto",
  },
};

export default QuickFilters;
