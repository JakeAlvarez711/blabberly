import { useState, useCallback } from "react";
import { Search } from "lucide-react";
import SearchOverlay from "../search/SearchOverlay";

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleClose = useCallback(() => setSearchOpen(false), []);

  return (
    <>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.wordmark}>blabberly</div>

          <button
            onClick={() => setSearchOpen(true)}
            style={styles.searchBar}
          >
            <div style={styles.searchIconLeft}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#F26522" strokeWidth="2.5" />
                <path d="M12 7v5l3 3" stroke="#F26522" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <span style={styles.searchPlaceholder}>See what's happening</span>
            <div style={styles.searchIconRight}>
              <Search size={16} color="#999" />
            </div>
          </button>
        </div>
      </header>

      {searchOpen && <SearchOverlay onClose={handleClose} />}

      {/* Spinner animation for search overlay */}
      {searchOpen && (
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      )}
    </>
  );
}

const styles = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: "#FFFFFF",
    borderBottom: "1px solid #F0F0F0",
  },
  headerInner: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    maxWidth: 1200,
    margin: "0 auto",
    padding: "12px 24px",
  },
  wordmark: {
    fontSize: 22,
    fontWeight: 900,
    color: "#F26522",
    letterSpacing: -0.5,
    flexShrink: 0,
  },
  searchBar: {
    flex: 1,
    maxWidth: 480,
    display: "flex",
    alignItems: "center",
    background: "#F5F5F5",
    borderRadius: 999,
    padding: "0 14px",
    height: 40,
    border: "none",
    cursor: "pointer",
    textAlign: "left",
  },
  searchIconLeft: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    marginRight: 10,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 14,
    color: "#999",
  },
  searchIconRight: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    marginLeft: 10,
  },
};

export default Header;
