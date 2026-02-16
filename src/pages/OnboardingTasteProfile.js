import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  TASTE_CATEGORIES,
  CATEGORY_ORDER,
  MIN_TOTAL_TAGS,
} from "../data/onboardingChoices";
import { saveTasteProfile, getTasteProfile } from "../data/onboardingService";

const BackArrow = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

function OnboardingTasteProfile() {
  const navigate = useNavigate();
  const { uid } = useAuth();

  const [selections, setSelections] = useState(new Set());
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [loaded, setLoaded] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  // Prefill if returning mid-onboarding
  useEffect(() => {
    if (!uid) return;
    let cancelled = false;

    (async () => {
      try {
        const existing = await getTasteProfile(uid);
        if (cancelled) return;
        if (Array.isArray(existing) && existing.length > 0) {
          setSelections(new Set(existing));
          setShowPicker(true);
        }
      } catch (e) {
        console.error("Failed to load taste profile:", e);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [uid]);

  const toggle = (token) => {
    setSelections((prev) => {
      const next = new Set(prev);
      if (next.has(token)) {
        next.delete(token);
      } else {
        next.add(token);
      }
      return next;
    });
  };

  const meetsMin = selections.size >= MIN_TOTAL_TAGS;

  const handleContinue = async () => {
    if (!uid || !meetsMin) return;

    setStatus({ type: "loading", message: "Saving…" });

    try {
      await saveTasteProfile(uid, [...selections]);
      navigate("/onboarding/finetune", { replace: true });
    } catch (e) {
      console.error("Failed to save taste profile:", e);
      setStatus({ type: "error", message: "Failed to save. Try again." });
    }
  };

  if (!loaded) {
    return (
      <div style={styles.page}>
        <div style={{ opacity: 0.6 }}>Loading…</div>
      </div>
    );
  }

  // Intro screen before showing the picker
  if (!showPicker) {
    return (
      <div style={styles.introPage}>
        {/* Top bar */}
        <div style={styles.topBar}>
          <button onClick={() => navigate("/onboarding/profile", { replace: true })} style={styles.backBtn}>
            <BackArrow />
          </button>
          <span style={styles.stepLabel}>Step 2 of 3</span>
          <div style={{ width: 24 }} />
        </div>

        <div style={styles.introContent}>
          <h1 style={styles.introHeading}>Let's dial in your taste</h1>
          <p style={styles.introSubtitle}>
            This helps us show you better places, faster.
          </p>

          <ul style={styles.bulletList}>
            <li style={styles.bulletItem}>Food & drinks you like</li>
            <li style={styles.bulletItem}>The vibe you're into</li>
            <li style={styles.bulletItem}>A few preferences (optional)</li>
          </ul>

          <button
            onClick={() => setShowPicker(true)}
            style={styles.introBtn}
          >
            Start picking
          </button>

        </div>
      </div>
    );
  }

  return (
    <div style={styles.pickerPage}>
      <style>{`
        @keyframes pillPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .taste-pill { transition: background 0.15s, border-color 0.15s, color 0.15s; }
        .taste-pill-selected { animation: pillPop 0.15s ease-out; }
      `}</style>

      {/* Fixed top bar */}
      <div style={styles.fixedTop}>
        <div style={styles.fixedTopInner}>
          <button onClick={() => navigate("/onboarding/profile", { replace: true })} style={styles.backBtn}>
            <BackArrow />
          </button>
          <span style={styles.stepLabel}>Step 2 of 3</span>
          <div style={{ width: 24 }} />
        </div>
      </div>

      {/* Scrollable content */}
      <div style={styles.scrollArea}>
        <div style={styles.pickerInner}>
          {/* Header */}
          <div style={styles.pickerHeader}>
            <h1 style={styles.pickerHeading}>What sounds good?</h1>
            <p style={styles.pickerSubtitle}>We'll do the work.</p>
            <p style={styles.pickerHelper}>Pick a few — Change this anytime</p>
          </div>

          {/* Tag sections */}
          <div style={styles.sectionsWrap}>
            {CATEGORY_ORDER.map((catKey) => {
              const cat = TASTE_CATEGORIES[catKey];
              return (
                <div key={catKey} style={styles.section}>
                  <div style={styles.sectionLabel}>{cat.label}</div>
                  <div style={styles.sectionSub}>{cat.subtitle}</div>
                  <div style={styles.chipWrap}>
                    {cat.items.map((item) => {
                      const selected = selections.has(item.token);
                      return (
                        <button
                          key={item.token}
                          onClick={() => toggle(item.token)}
                          className={`taste-pill${selected ? " taste-pill-selected" : ""}`}
                          style={{
                            ...styles.chip,
                            ...(selected ? styles.chipSelected : {}),
                            cursor: "pointer",
                          }}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Status */}
          {status.type !== "idle" && (
            <div
              style={{
                textAlign: "center",
                marginTop: 10,
                fontSize: 14,
                color: status.type === "error" ? "#D32F2F" : "#666",
                opacity: status.type === "loading" ? 0.7 : 1,
              }}
            >
              {status.message}
            </div>
          )}
        </div>
      </div>

      {/* Sticky bottom */}
      <div style={styles.stickyBottom}>
        <div style={styles.fadeGradient} />
        <div style={styles.stickyInner}>
          <button
            onClick={handleContinue}
            disabled={!meetsMin || status.type === "loading"}
            style={{
              ...styles.continueBtn,
              opacity: !meetsMin || status.type === "loading" ? 0.45 : 1,
              cursor:
                !meetsMin || status.type === "loading"
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  /* ── Shared / Loading ── */
  page: {
    minHeight: "100vh",
    background: "#FFFFFF",
    color: "#1A1A1A",
    padding: "16px 16px 100px",
    overflowY: "auto",
  },

  /* ── Intro screen ── */
  introPage: {
    minHeight: "100vh",
    background: "#FFFFFF",
    color: "#1A1A1A",
    padding: "0 16px 80px",
    overflowY: "auto",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 0",
    marginBottom: 0,
  },
  backBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    display: "flex",
    alignItems: "center",
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1A1A1A",
  },
  introContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "70vh",
    textAlign: "center",
    padding: "0 16px",
  },
  introHeading: {
    fontSize: 26,
    fontWeight: 900,
    color: "#1A1A1A",
    margin: "0 0 8px",
  },
  introSubtitle: {
    fontSize: 15,
    color: "#666",
    margin: "0 0 28px",
    fontWeight: 400,
  },
  bulletList: {
    listStyleType: "disc",
    paddingLeft: 20,
    margin: "0 0 36px",
    textAlign: "left",
  },
  bulletItem: {
    fontSize: 15,
    color: "#1A1A1A",
    padding: "4px 0",
    fontWeight: 400,
  },
  introBtn: {
    width: "100%",
    maxWidth: 320,
    padding: "14px",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg, #F26522, #FF8A50)",
    color: "#FFFFFF",
    fontWeight: 800,
    fontSize: 16,
    cursor: "pointer",
  },
  /* ── Picker screen ── */
  pickerPage: {
    height: "100vh",
    background: "#FFFFFF",
    color: "#1A1A1A",
    display: "flex",
    flexDirection: "column",
  },
  fixedTop: {
    background: "#FFFFFF",
    padding: "0 20px",
    flexShrink: 0,
  },
  fixedTopInner: {
    maxWidth: 600,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 0",
  },
  scrollArea: {
    flex: 1,
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
  },
  pickerInner: {
    maxWidth: 600,
    margin: "0 auto",
    padding: "0 20px 100px",
  },
  pickerHeader: {
    paddingBottom: 8,
    textAlign: "center",
  },
  pickerHeading: {
    fontSize: 26,
    fontWeight: 900,
    color: "#1A1A1A",
    margin: "0 0 6px",
  },
  pickerSubtitle: {
    fontSize: 15,
    color: "#666",
    margin: "0 0 4px",
    fontWeight: 400,
  },
  pickerHelper: {
    fontSize: 13,
    color: "#BCBCBC",
    margin: 0,
    fontWeight: 400,
  },
  sectionsWrap: {
    marginTop: 36,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  section: {
    background: "#F9F9F9",
    borderRadius: 16,
    padding: "18px 18px 20px",
  },
  sectionLabel: {
    fontWeight: 700,
    fontSize: 15,
    color: "#1A1A1A",
    margin: 0,
  },
  sectionSub: {
    fontSize: 13,
    color: "#999",
    margin: "4px 0 14px",
    fontWeight: 400,
  },
  chipWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    rowGap: 10,
  },
  chip: {
    padding: "10px 20px",
    borderRadius: 999,
    border: "1px solid #E0E0E0",
    background: "#FFFFFF",
    color: "#1A1A1A",
    fontWeight: 500,
    fontSize: 14,
    userSelect: "none",
  },
  chipSelected: {
    background: "#F26522",
    borderColor: "#F26522",
    color: "#FFFFFF",
    fontWeight: 600,
  },

  /* Sticky bottom bar */
  stickyBottom: {
    flexShrink: 0,
  },
  fadeGradient: {
    height: 40,
    background: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))",
    pointerEvents: "none",
  },
  stickyInner: {
    background: "#FFFFFF",
    maxWidth: 600,
    margin: "0 auto",
    padding: "0 20px 28px",
    textAlign: "center",
  },
  continueBtn: {
    width: "100%",
    height: 48,
    borderRadius: 14,
    border: "none",
    background: "#F26522",
    color: "#FFFFFF",
    fontWeight: 800,
    fontSize: 16,
    letterSpacing: 0.3,
  },
};

export default OnboardingTasteProfile;
