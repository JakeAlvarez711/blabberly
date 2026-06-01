import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import logo from "../assets/logo.png.png";

const SLOGAN = "See what's happening.";

const CITY_TICKER = [
  "Carlsbad",
  "Encinitas",
  "Del Mar",
  "La Jolla",
  "Pacific Beach",
  "Hillcrest",
  "North Park",
  "Little Italy",
  "Oceanside",
  "Solana Beach",
];

const STYLE_TAG_ID = "blabberly-waitlist-keyframes";

function injectKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_TAG_ID)) return;
  const tag = document.createElement("style");
  tag.id = STYLE_TAG_ID;
  tag.textContent = `
    @keyframes bbSunsetDrift {
      0%   { background-position: 0% 0%; }
      100% { background-position: 0% 100%; }
    }
    @keyframes bbFadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes bbSloganIn {
      from { opacity: 0; transform: translateY(14px); filter: blur(6px); letter-spacing: 0px; }
      to   { opacity: 1; transform: translateY(0);    filter: blur(0);   letter-spacing: -1.5px; }
    }
    @keyframes bbTickerSwap {
      0%   { opacity: 0; transform: translateY(4px); }
      15%  { opacity: 1; transform: translateY(0); }
      85%  { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-4px); }
    }
    @keyframes bbCheckPop {
      0%   { transform: scale(0.5); opacity: 0; }
      60%  { transform: scale(1.15); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes bbSpin {
      to { transform: rotate(360deg); }
    }
    .bb-input::placeholder { color: rgba(60, 30, 10, 0.45); }
    .bb-input:focus { box-shadow: 0 8px 30px rgba(0,0,0,0.18), 0 0 0 2px rgba(255,255,255,0.7) inset; }
    .bb-submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 12px 28px rgba(0,0,0,0.28); }
    .bb-submit:active:not(:disabled) { transform: translateY(0); }
    .bb-footer-link { color: rgba(255,255,255,0.85); text-decoration: none; transition: color 120ms ease; }
    .bb-footer-link:hover { color: #ffffff; text-decoration: underline; }

    @media (max-width: 600px) {
      .bb-slogan { font-size: 38px !important; letter-spacing: -1px !important; white-space: normal !important; }
      .bb-logo   { height: 44px !important; }
      .bb-lockup span { font-size: 26px !important; letter-spacing: -0.8px !important; }
      .bb-lockup { gap: 10px !important; }
      .bb-card   { padding: 22px !important; }
    }
  `;
  document.head.appendChild(tag);
}

function formatUsPhoneInput(raw) {
  const digits = (raw || "").replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function toE164Us(formatted) {
  const digits = (formatted || "").replace(/\D/g, "");
  if (digits.length !== 10) return null;
  return `+1${digits}`;
}

export default function WaitlistPage() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [tickerIdx, setTickerIdx] = useState(0);
  const submittedRef = useRef(false);

  useEffect(() => {
    injectKeyframes();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setTickerIdx((i) => (i + 1) % CITY_TICKER.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const onChange = (e) => {
    setPhone(formatUsPhoneInput(e.target.value));
    if (status.type === "error") setStatus({ type: "idle", message: "" });
  };

  const onSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (submittedRef.current) return;

    const e164 = toE164Us(phone);
    if (!e164) {
      setStatus({
        type: "error",
        message: "Enter a 10-digit US phone number.",
      });
      return;
    }

    setStatus({ type: "loading", message: "" });

    try {
      const ref = doc(db, "waitlist", e164);
      await setDoc(
        ref,
        {
          phone: e164,
          source: "web",
          createdAt: serverTimestamp(),
          lastSeenAt: serverTimestamp(),
          userAgent:
            typeof navigator !== "undefined" ? navigator.userAgent : null,
          referrer:
            typeof document !== "undefined" ? document.referrer || null : null,
        },
        { merge: true }
      );

      submittedRef.current = true;
      setStatus({
        type: "success",
        message: "You're in. We'll text you when we go live in your city.",
      });
    } catch (err) {
      console.error("[waitlist] write failed", err);
      setStatus({
        type: "error",
        message: "Couldn't save your number. Try again in a sec.",
      });
    }
  };

  const isLoading = status.type === "loading";
  const isSuccess = status.type === "success";
  const phoneIncomplete = phone.replace(/\D/g, "").length !== 10;

  return (
    <div style={styles.page}>
      <div style={styles.center}>
        <div className="bb-lockup" style={styles.lockup} aria-label="Blabberly">
          <img src={logo} alt="" className="bb-logo" style={styles.logoIcon} />
          <span style={styles.wordmark}>Blabberly.</span>
        </div>

        <h1 style={styles.slogan} className="bb-slogan">
          {SLOGAN}
        </h1>

        <div style={styles.card} className="bb-card">
          {isSuccess ? (
            <div style={styles.successWrap}>
              <div style={styles.checkCircle}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12l4 4 10-10"
                    stroke="#F26522"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div style={styles.successText}>{status.message}</div>
            </div>
          ) : (
            <form onSubmit={onSubmit} style={{ width: "100%" }}>
              <label htmlFor="bb-phone" style={styles.label}>
                Get notified when we launch
              </label>
              <div style={styles.inputRow}>
                <div style={styles.prefix}>+1</div>
                <input
                  id="bb-phone"
                  className="bb-input"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  value={phone}
                  onChange={onChange}
                  placeholder="(555) 123-4567"
                  style={styles.input}
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                className="bb-submit"
                disabled={isLoading || phoneIncomplete}
                style={{
                  ...styles.submit,
                  opacity: isLoading || phoneIncomplete ? 0.55 : 1,
                  cursor:
                    isLoading || phoneIncomplete ? "not-allowed" : "pointer",
                }}
              >
                {isLoading ? (
                  <span style={styles.spinner} aria-label="Saving" />
                ) : (
                  "Notify me"
                )}
              </button>

              {status.type === "error" && (
                <div style={styles.errorText}>{status.message}</div>
              )}
            </form>
          )}
        </div>

        <div style={styles.tickerWrap} aria-live="polite">
          <span style={styles.tickerLead}>Live in</span>
          <span
            key={tickerIdx}
            style={{
              ...styles.tickerCity,
              animation: "bbTickerSwap 2600ms ease-in-out",
            }}
          >
            {CITY_TICKER[tickerIdx]}
          </span>
          <span style={styles.tickerLead}>· more cities soon</span>
        </div>
      </div>

      <footer style={styles.footer}>
        <a href="/privacy" className="bb-footer-link">
          Privacy
        </a>
        <span style={styles.footerSep}>·</span>
        <a href="/terms" className="bb-footer-link">
          Terms
        </a>
        <span style={styles.footerSep}>·</span>
        <a href="mailto:support@blabberly.com" className="bb-footer-link">
          support@blabberly.com
        </a>
        <span style={styles.footerSep}>·</span>
        <Link to="/auth" className="bb-footer-link">
          Have an account? Sign in
        </Link>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100%",
    height: "100%",
    width: "100%",
    overflowY: "auto",
    background:
      "linear-gradient(180deg, #FFE0B5 0%, #FFB778 22%, #FF8A4C 48%, #F26522 72%, #C44918 100%)",
    backgroundSize: "100% 200%",
    animation: "bbSunsetDrift 14s ease-in-out infinite alternate",
    color: "#1A1A1A",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "48px 20px 24px",
    boxSizing: "border-box",
    fontFamily:
      "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif",
  },
  center: {
    width: "100%",
    maxWidth: 460,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  lockup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    marginBottom: 24,
    opacity: 0,
    animation: "bbFadeIn 600ms ease-out 80ms forwards",
  },
  logoIcon: {
    height: 56,
    objectFit: "contain",
    filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.18))",
  },
  wordmark: {
    fontSize: 36,
    fontWeight: 800,
    color: "#FFFFFF",
    letterSpacing: "-1px",
    lineHeight: 1,
    textShadow: "0 2px 12px rgba(120, 40, 0, 0.22)",
  },
  slogan: {
    fontSize: 52,
    fontWeight: 800,
    letterSpacing: "-1.5px",
    lineHeight: 1.05,
    margin: "0 0 36px",
    color: "#FFFFFF",
    textAlign: "center",
    textShadow: "0 4px 20px rgba(120, 40, 0, 0.25)",
    whiteSpace: "nowrap",
    opacity: 0,
    animation: "bbSloganIn 820ms cubic-bezier(0.2, 0.8, 0.2, 1) 180ms forwards",
  },
  card: {
    width: "100%",
    background: "rgba(255, 255, 255, 0.92)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: 20,
    padding: 28,
    boxShadow:
      "0 24px 60px rgba(80, 30, 0, 0.25), 0 2px 8px rgba(0,0,0,0.06)",
    border: "1px solid rgba(255,255,255,0.6)",
    boxSizing: "border-box",
    opacity: 0,
    animation: "bbFadeIn 700ms ease-out 420ms forwards",
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 700,
    color: "#6B3A1A",
    letterSpacing: "0.4px",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
    background: "#FFFFFF",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 14,
  },
  prefix: {
    padding: "0 10px 0 16px",
    fontSize: 17,
    fontWeight: 600,
    color: "#1A1A1A",
    pointerEvents: "none",
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    padding: "16px 16px 16px 4px",
    fontSize: 17,
    fontWeight: 500,
    color: "#1A1A1A",
    width: "100%",
    fontFamily: "inherit",
    minWidth: 0,
  },
  submit: {
    width: "100%",
    padding: "16px",
    borderRadius: 14,
    border: "none",
    background: "#1A1A1A",
    color: "#FFFFFF",
    fontWeight: 700,
    fontSize: 16,
    letterSpacing: "0.2px",
    transition:
      "transform 120ms ease, box-shadow 160ms ease, opacity 160ms ease",
    boxShadow: "0 8px 20px rgba(0,0,0,0.20)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
  },
  spinner: {
    display: "inline-block",
    width: 18,
    height: 18,
    border: "2px solid rgba(255,255,255,0.35)",
    borderTopColor: "#FFFFFF",
    borderRadius: "50%",
    animation: "bbSpin 700ms linear infinite",
  },
  errorText: {
    marginTop: 12,
    fontSize: 14,
    color: "#B22D2D",
    fontWeight: 600,
    textAlign: "center",
  },
  successWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "8px 4px 4px",
  },
  checkCircle: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    boxShadow: "0 8px 22px rgba(242, 101, 34, 0.35)",
    animation: "bbCheckPop 540ms cubic-bezier(0.2, 0.8, 0.2, 1.2) forwards",
  },
  successText: {
    fontSize: 16,
    fontWeight: 600,
    color: "#1A1A1A",
    textAlign: "center",
    lineHeight: 1.45,
    maxWidth: 320,
  },
  tickerWrap: {
    marginTop: 28,
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "rgba(255,255,255,0.92)",
    fontSize: 14,
    fontWeight: 500,
    textShadow: "0 2px 8px rgba(120, 40, 0, 0.25)",
    flexWrap: "wrap",
    justifyContent: "center",
    opacity: 0,
    animation: "bbFadeIn 700ms ease-out 620ms forwards",
  },
  tickerLead: {
    opacity: 0.75,
  },
  tickerCity: {
    fontWeight: 800,
    display: "inline-block",
    minWidth: 90,
    textAlign: "left",
  },
  footer: {
    marginTop: 32,
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    fontWeight: 500,
    textShadow: "0 1px 4px rgba(120, 40, 0, 0.20)",
    opacity: 0,
    animation: "bbFadeIn 600ms ease-out 800ms forwards",
  },
  footerSep: {
    opacity: 0.5,
  },
};
