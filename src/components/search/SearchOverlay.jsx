import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Clock, Trash2 } from "lucide-react";

import {
  searchAll,
  getSearchHistory,
  addToSearchHistory,
  clearSearchHistory,
} from "../../data/searchService";

import PlaceResult from "./PlaceResult";
import UserResult from "./UserResult";
import PostResult from "./PostResult";

export default function SearchOverlay({ onClose }) {
  const inputRef = useRef(null);
  const overlayRef = useRef(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ places: [], users: [], posts: [] });
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [history, setHistory] = useState(() => getSearchHistory());

  // Auto-focus input on mount
  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(timer);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Debounced search
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults({ places: [], users: [], posts: [] });
      setHasSearched(false);
      return;
    }

    if (trimmed.length < 2) return;

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const r = await searchAll(trimmed);
        setResults(r);
        setHasSearched(true);
      } catch (e) {
        console.error("Search failed:", e);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleResultClick = useCallback(() => {
    const trimmed = query.trim();
    if (trimmed) {
      addToSearchHistory(trimmed);
      setHistory(getSearchHistory());
    }
    onClose();
  }, [query, onClose]);

  const handleHistoryClick = (term) => {
    setQuery(term);
  };

  const handleClearHistory = () => {
    clearSearchHistory();
    setHistory([]);
  };

  // Click outside to close
  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const trimmedQuery = query.trim();
  const hasResults =
    results.places.length > 0 ||
    results.users.length > 0 ||
    results.posts.length > 0;

  const showHistory = !trimmedQuery && history.length > 0;
  const showHint = !trimmedQuery && !showHistory;
  const showNoResults = hasSearched && !hasResults && !loading && trimmedQuery.length >= 2;

  return (
    <div ref={overlayRef} style={styles.backdrop} onClick={handleBackdropClick}>
      <div style={styles.panel}>
        {/* Search input */}
        <div style={styles.inputRow}>
          <Search size={18} color="#999" style={{ flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search places, users, or dishes..."
            style={styles.input}
            onKeyDown={(e) => {
              if (e.key === "Enter" && trimmedQuery) {
                addToSearchHistory(trimmedQuery);
                setHistory(getSearchHistory());
              }
            }}
          />
          {query && (
            <button onClick={() => setQuery("")} style={styles.clearBtn}>
              <X size={16} color="#999" />
            </button>
          )}
          <button onClick={onClose} style={styles.cancelBtn}>
            Cancel
          </button>
        </div>

        {/* Content area */}
        <div style={styles.content}>
          {/* Hint */}
          {showHint && (
            <div style={styles.hint}>
              Try searching for tacos, cocktails, or @username
            </div>
          )}

          {/* Search History */}
          {showHistory && (
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <span style={styles.sectionTitle}>Recent Searches</span>
                <button onClick={handleClearHistory} style={styles.clearHistoryBtn}>
                  <Trash2 size={13} />
                  Clear
                </button>
              </div>
              {history.map((term) => (
                <button
                  key={term}
                  onClick={() => handleHistoryClick(term)}
                  style={styles.historyItem}
                >
                  <Clock size={14} color="#999" />
                  <span style={styles.historyText}>{term}</span>
                </button>
              ))}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div style={styles.loadingRow}>
              <div style={styles.spinner} />
              <span style={styles.loadingText}>Searching...</span>
            </div>
          )}

          {/* No results */}
          {showNoResults && (
            <div style={styles.noResults}>
              No results for "{trimmedQuery}". Try different keywords.
            </div>
          )}

          {/* Places results */}
          {results.places.length > 0 && (
            <div style={styles.section}>
              <div style={styles.sectionTitle}>Places</div>
              {results.places.map((place) => (
                <PlaceResult
                  key={place.restaurant}
                  place={place}
                  onClick={handleResultClick}
                />
              ))}
            </div>
          )}

          {/* Users results */}
          {results.users.length > 0 && (
            <div style={styles.section}>
              <div style={styles.sectionTitle}>People</div>
              {results.users.map((user) => (
                <UserResult
                  key={user.uid}
                  user={user}
                  onClick={handleResultClick}
                />
              ))}
            </div>
          )}

          {/* Posts results */}
          {results.posts.length > 0 && (
            <div style={styles.section}>
              <div style={styles.sectionTitle}>Posts</div>
              {results.posts.map((post) => (
                <PostResult
                  key={post._docId}
                  post={post}
                  onClick={handleResultClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    zIndex: 200,
    display: "flex",
    justifyContent: "center",
    paddingTop: 60,
  },
  panel: {
    width: "100%",
    maxWidth: 560,
    maxHeight: "calc(100vh - 100px)",
    background: "#FFFFFF",
    borderRadius: 16,
    boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 16px",
    borderBottom: "1px solid #F0F0F0",
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: 15,
    color: "#1A1A1A",
    background: "transparent",
  },
  clearBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#F0F0F0",
    border: "none",
    borderRadius: "50%",
    width: 24,
    height: 24,
    cursor: "pointer",
    flexShrink: 0,
  },
  cancelBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#F26522",
    fontSize: 14,
    fontWeight: 600,
    flexShrink: 0,
    padding: "4px 0",
  },
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "8px 0",
  },
  hint: {
    padding: "32px 20px",
    textAlign: "center",
    fontSize: 14,
    color: "#999",
    fontWeight: 500,
  },
  section: {
    padding: "8px 0",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px 6px",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    padding: "0 16px 6px",
  },
  clearHistoryBtn: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#999",
    fontSize: 12,
    fontWeight: 500,
    padding: 0,
  },
  historyItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 16px",
    width: "100%",
    background: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    borderRadius: 0,
  },
  historyText: {
    fontSize: 14,
    color: "#1A1A1A",
    fontWeight: 500,
  },
  loadingRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "24px 0",
  },
  spinner: {
    width: 18,
    height: 18,
    border: "2px solid #F0F0F0",
    borderTop: "2px solid #F26522",
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite",
  },
  loadingText: {
    fontSize: 14,
    color: "#999",
    fontWeight: 500,
  },
  noResults: {
    padding: "32px 20px",
    textAlign: "center",
    fontSize: 14,
    color: "#999",
    fontWeight: 500,
  },
};
