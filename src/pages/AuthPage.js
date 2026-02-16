import { useState } from "react";
import {
  signUpWithEmail,
  signInWithEmail,
  resetPassword,
  signInWithGoogle,
  signInWithApple,
  friendlyError,
} from "../data/authService";
import logo from "../assets/logo.png.png";

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

function AuthPage() {
  const [mode, setMode] = useState("signin"); // signin | signup | reset
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const switchMode = (next) => {
    setMode(next);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setStatus({ type: "idle", message: "" });
  };

  const handleSignUp = async () => {
    if (!email.trim()) {
      setStatus({ type: "error", message: "Please enter your email." });
      return;
    }
    if (password.length < 6) {
      setStatus({
        type: "error",
        message: "Password must be at least 6 characters.",
      });
      return;
    }
    if (password !== confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match." });
      return;
    }

    setStatus({ type: "loading", message: "Creating account…" });

    try {
      await signUpWithEmail(email.trim(), password);
      // AuthGate will redirect to onboarding
    } catch (e) {
      setStatus({ type: "error", message: friendlyError(e) });
    }
  };

  const handleSignIn = async () => {
    if (!email.trim()) {
      setStatus({ type: "error", message: "Please enter your email." });
      return;
    }
    if (!password) {
      setStatus({ type: "error", message: "Please enter your password." });
      return;
    }

    setStatus({ type: "loading", message: "Signing in…" });

    try {
      await signInWithEmail(email.trim(), password);
      // AuthGate will redirect based on onboarding status
    } catch (e) {
      setStatus({ type: "error", message: friendlyError(e) });
    }
  };

  const handleReset = async () => {
    if (!email.trim()) {
      setStatus({ type: "error", message: "Please enter your email." });
      return;
    }

    setStatus({ type: "loading", message: "Sending reset link…" });

    try {
      await resetPassword(email.trim());
      setStatus({
        type: "success",
        message: "Check your email for a reset link.",
      });
    } catch (e) {
      setStatus({ type: "error", message: friendlyError(e) });
    }
  };

  const handleGoogle = async () => {
    setStatus({ type: "loading", message: "Signing in with Google…" });
    try {
      await signInWithGoogle();
    } catch (e) {
      setStatus({ type: "error", message: friendlyError(e) });
    }
  };

  const handleApple = async () => {
    setStatus({ type: "loading", message: "Signing in with Apple…" });
    try {
      await signInWithApple();
    } catch (e) {
      setStatus({ type: "error", message: friendlyError(e) });
    }
  };

  const onSubmit = () => {
    if (mode === "signup") handleSignUp();
    else if (mode === "signin") handleSignIn();
    else handleReset();
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && status.type !== "loading") onSubmit();
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Logo */}
        <div style={styles.logoWrap}>
          <img src={logo} alt="Blabberly" style={styles.logoImg} />
        </div>

        {/* Tagline */}
        <p style={styles.tagline}>See what's happening.</p>

        {/* Social sign-in (always visible except reset mode) */}
        {mode !== "reset" && (
          <>
            <button
              onClick={handleApple}
              disabled={status.type === "loading"}
              style={styles.appleBtn}
            >
              <AppleIcon />
              <span>Continue with Apple</span>
            </button>

            <button
              onClick={handleGoogle}
              disabled={status.type === "loading"}
              style={styles.googleBtn}
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>

            <div style={styles.divider}>
              <div style={styles.dividerLine} />
              <span style={styles.dividerText}>or</span>
              <div style={styles.dividerLine} />
            </div>
          </>
        )}

        {/* Tabs */}
        {mode !== "reset" && (
          <div style={styles.tabs}>
            <button
              onClick={() => switchMode("signin")}
              style={{
                ...styles.tab,
                borderBottomColor:
                  mode === "signin" ? "#F26522" : "transparent",
                color: mode === "signin" ? "#1A1A1A" : "#999",
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => switchMode("signup")}
              style={{
                ...styles.tab,
                borderBottomColor:
                  mode === "signup" ? "#F26522" : "transparent",
                color: mode === "signup" ? "#1A1A1A" : "#999",
              }}
            >
              Sign Up
            </button>
          </div>
        )}

        {mode === "reset" && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 800, fontSize: 18, color: "#1A1A1A" }}>
              Reset Password
            </div>
            <div style={{ color: "#666", fontSize: 13, marginTop: 4 }}>
              We'll send you a link to reset your password.
            </div>
          </div>
        )}

        {/* Form */}
        <div style={styles.formWrap}>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status.type !== "idle")
                setStatus({ type: "idle", message: "" });
            }}
            onKeyDown={onKeyDown}
            placeholder="Email"
            style={styles.input}
            autoCapitalize="none"
            autoCorrect="off"
          />

          {mode !== "reset" && (
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (status.type !== "idle")
                  setStatus({ type: "idle", message: "" });
              }}
              onKeyDown={onKeyDown}
              placeholder="Password"
              style={styles.input}
            />
          )}

          {mode === "signup" && (
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (status.type !== "idle")
                  setStatus({ type: "idle", message: "" });
              }}
              onKeyDown={onKeyDown}
              placeholder="Confirm password"
              style={styles.input}
            />
          )}

          {status.type !== "idle" && (
            <div
              style={{
                marginTop: 4,
                marginBottom: 6,
                fontSize: 14,
                color:
                  status.type === "error"
                    ? "#D32F2F"
                    : status.type === "success"
                    ? "#2E7D32"
                    : "#666",
                opacity: status.type === "loading" ? 0.7 : 1,
              }}
            >
              {status.message}
            </div>
          )}

          <button
            onClick={onSubmit}
            disabled={status.type === "loading"}
            style={{
              ...styles.btn,
              opacity: status.type === "loading" ? 0.6 : 1,
            }}
          >
            {mode === "signup"
              ? "Create Account"
              : mode === "signin"
              ? "Sign In"
              : "Send Reset Link"}
          </button>

          {mode === "signin" && (
            <button
              onClick={() => switchMode("reset")}
              style={styles.linkBtn}
            >
              Forgot password?
            </button>
          )}

          {mode === "reset" && (
            <button
              onClick={() => switchMode("signin")}
              style={styles.linkBtn}
            >
              Back to Sign In
            </button>
          )}
        </div>

        {/* Footer */}
        <p style={styles.footer}>
          By continuing, you agree to Blabberly's{" "}
          <span style={styles.footerLink}>Terms of Service</span> and{" "}
          <span style={styles.footerLink}>Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#FFFFFF",
    color: "#1A1A1A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  container: {
    width: "100%",
    maxWidth: 400,
  },
  logoWrap: {
    textAlign: "center",
    marginBottom: 8,
  },
  logoImg: {
    height: 48,
    objectFit: "contain",
  },
  tagline: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    fontWeight: 500,
    margin: "0 0 28px",
  },
  appleBtn: {
    width: "100%",
    padding: "13px 14px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    background: "#000000",
    color: "#FFFFFF",
    fontWeight: 700,
    fontSize: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  googleBtn: {
    width: "100%",
    padding: "13px 14px",
    borderRadius: 12,
    border: "1px solid #E0E0E0",
    cursor: "pointer",
    background: "#FFFFFF",
    color: "#1A1A1A",
    fontWeight: 700,
    fontSize: 15,
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    margin: "24px 0",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    background: "#E0E0E0",
  },
  dividerText: {
    fontSize: 13,
    color: "#999",
    fontWeight: 600,
  },
  tabs: {
    display: "flex",
    gap: 0,
    marginBottom: 16,
    borderBottom: "1px solid #E0E0E0",
  },
  tab: {
    flex: 1,
    background: "transparent",
    border: "none",
    borderBottom: "2px solid transparent",
    color: "#1A1A1A",
    fontWeight: 700,
    fontSize: 15,
    padding: "10px 0",
    cursor: "pointer",
    marginBottom: -1,
  },
  formWrap: {
    marginBottom: 0,
  },
  input: {
    width: "100%",
    background: "#F5F5F5",
    border: "1px solid #E0E0E0",
    borderRadius: 12,
    padding: "13px 14px",
    outline: "none",
    color: "#1A1A1A",
    fontSize: 16,
    marginBottom: 10,
    boxSizing: "border-box",
  },
  btn: {
    width: "100%",
    marginTop: 6,
    padding: "14px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    background: "#F26522",
    color: "#FFFFFF",
    fontWeight: 800,
    fontSize: 16,
  },
  linkBtn: {
    display: "block",
    width: "100%",
    marginTop: 14,
    background: "transparent",
    border: "none",
    color: "#F26522",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 700,
    textAlign: "center",
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#999",
    marginTop: 28,
    lineHeight: 1.5,
  },
  footerLink: {
    color: "#F26522",
    cursor: "pointer",
  },
};

export default AuthPage;
