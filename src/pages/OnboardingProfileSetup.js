import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  getPublicUser,
  getPublicUserByHandle,
  setHandle,
  updateProfile,
  isValidHandle,
  normalizeHandle,
} from "../data/userService";
import { uploadAvatar } from "../data/avatarService";

const BIO_MAX = 80;

const BackArrow = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

const CameraIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

function OnboardingProfileSetup() {
  const navigate = useNavigate();
  const { uid } = useAuth();

  // avatar
  const fileRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [existingPhotoURL, setExistingPhotoURL] = useState(null);

  // handle
  const [handleInput, setHandleInput] = useState("");
  const [handleStatus, setHandleStatus] = useState({ type: "idle", message: "" });
  const debounceRef = useRef(null);

  // profile fields
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");

  // overall status
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // prefill from existing user doc
  useEffect(() => {
    if (!uid) return;
    let cancelled = false;

    (async () => {
      try {
        const u = await getPublicUser(uid);
        if (cancelled || !u) return;

        if (u.handle) setHandleInput(u.handle);
        if (u.displayName) setDisplayName(u.displayName);
        if (u.bio) setBio(u.bio);
        if (u.photoURL) {
          setExistingPhotoURL(u.photoURL);
          setAvatarPreview(u.photoURL);
        }
      } catch (e) {
        console.error("Failed to load profile:", e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [uid]);

  // --- Handle validation + availability check ---

  const normalized = useMemo(
    () => normalizeHandle(handleInput),
    [handleInput]
  );

  const handleInputValid = useMemo(
    () => isValidHandle(normalized),
    [normalized]
  );

  const checkAvailability = useCallback(
    (value) => {
      const h = normalizeHandle(value);
      if (!isValidHandle(h)) return;

      setHandleStatus({ type: "checking", message: "Checking…" });

      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        try {
          const existing = await getPublicUserByHandle(h);
          if (existing && existing.uid !== uid) {
            setHandleStatus({ type: "taken", message: "Username already taken" });
          } else {
            setHandleStatus({ type: "available", message: "Username available" });
          }
        } catch {
          setHandleStatus({ type: "idle", message: "" });
        }
      }, 500);
    },
    [uid]
  );

  const onHandleChange = (e) => {
    const val = e.target.value;
    setHandleInput(val);

    const h = normalizeHandle(val);
    if (!h || !isValidHandle(h)) {
      clearTimeout(debounceRef.current);
      setHandleStatus({ type: "idle", message: "" });
      return;
    }

    checkAvailability(val);
  };

  // --- Avatar ---

  const onFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  // --- Validation ---

  const hasPhoto = !!(avatarFile || existingPhotoURL);
  const hasValidHandle =
    handleInputValid && handleStatus.type !== "taken" && handleStatus.type !== "checking";
  const canContinue = hasPhoto && hasValidHandle;

  // --- Continue ---

  const handleContinue = async () => {
    if (!uid || !canContinue) return;

    setSaving(true);
    setError("");

    try {
      // 1. Upload avatar if new file selected
      if (avatarFile) {
        await uploadAvatar(uid, avatarFile);
      }

      // 2. Claim handle
      await setHandle(uid, normalized);

      // 3. Save profile fields
      const profileData = {};
      if (displayName.trim()) profileData.displayName = displayName.trim();
      if (bio.trim()) profileData.bio = bio.trim();
      if (phoneNumber.trim()) {
        const digits = phoneNumber.replace(/\D/g, "");
        if (digits) profileData.phoneNumber = countryCode + digits;
      }
      await updateProfile(uid, profileData);

      // 4. Navigate to taste onboarding
      navigate("/onboarding/taste", { replace: true });
    } catch (e) {
      console.error("Profile setup failed:", e);
      setError(e?.message || "Something went wrong. Try again.");
      setSaving(false);
    }
  };

  // --- Handle status indicator ---

  const handleIndicator = () => {
    if (handleStatus.type === "available") {
      return (
        <div style={styles.handleFeedback}>
          <CheckIcon />
          <span style={{ color: "#22c55e" }}>{handleStatus.message}</span>
        </div>
      );
    }
    if (handleStatus.type === "taken") {
      return (
        <div style={styles.handleFeedback}>
          <span style={{ color: "#D32F2F" }}>{handleStatus.message}</span>
        </div>
      );
    }
    if (handleStatus.type === "checking") {
      return (
        <div style={styles.handleFeedback}>
          <span style={{ color: "#999" }}>{handleStatus.message}</span>
        </div>
      );
    }
    if (normalized && !handleInputValid) {
      return (
        <div style={styles.handleFeedback}>
          <span style={{ color: "#D32F2F" }}>3–20 characters. Letters, numbers, underscore.</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
      {/* Top bar */}
      <div style={styles.topBar}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          <BackArrow />
        </button>
        <span style={styles.stepLabel}>Step 1 of 3</span>
        <div style={{ width: 24 }} />
      </div>

      {/* Heading */}
      <h1 style={styles.heading}>Create your profile</h1>
      <p style={styles.subheading}>
        This is how people will see you on Blabberly.
      </p>

      {/* Photo upload */}
      <div style={styles.avatarSection}>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={onFileSelect}
          style={{ display: "none" }}
        />
        <button
          onClick={() => fileRef.current?.click()}
          style={styles.avatarButton}
        >
          {avatarPreview ? (
            <img src={avatarPreview} alt="" style={styles.avatarImg} />
          ) : (
            <div style={styles.avatarPlaceholder}>
              <CameraIcon />
            </div>
          )}
          <div style={styles.avatarOverlay}>
            <span style={styles.plusIcon}>+</span>
          </div>
        </button>
      </div>

      {/* Username (required) */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Username</label>
        <input
          value={handleInput}
          onChange={onHandleChange}
          placeholder="@yourname"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
        />
        {handleIndicator()}
      </div>

      {/* Display name (optional) */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Display name (optional)</label>
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Your name"
          style={styles.input}
        />
      </div>

      {/* Bio (optional) */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Short bio (optional)</label>
        <textarea
          value={bio}
          onChange={(e) => {
            if (e.target.value.length <= BIO_MAX) setBio(e.target.value);
          }}
          placeholder="Food explorer in Chicago."
          style={styles.textarea}
          rows={2}
        />
        <div style={styles.charCount}>
          {BIO_MAX - bio.length} characters remaining
        </div>
      </div>

      {/* Phone number (optional) */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Phone number (optional)</label>
        <div style={styles.phoneRow}>
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            style={styles.countrySelect}
          >
            <option value="+1">🇺🇸 +1</option>
            <option value="+44">🇬🇧 +44</option>
            <option value="+61">🇦🇺 +61</option>
            <option value="+33">🇫🇷 +33</option>
            <option value="+49">🇩🇪 +49</option>
            <option value="+81">🇯🇵 +81</option>
            <option value="+82">🇰🇷 +82</option>
            <option value="+86">🇨🇳 +86</option>
            <option value="+91">🇮🇳 +91</option>
            <option value="+52">🇲🇽 +52</option>
          </select>
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/[^\d\s\-()]/g, ""))}
            placeholder="(555) 123-4567"
            type="tel"
            style={styles.phoneInput}
          />
        </div>
        <div style={styles.helperText}>
          Used for account recovery. Not public.
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{ color: "#D32F2F", fontSize: 14, marginTop: 4 }}>
          {error}
        </div>
      )}

      {/* Continue */}
      <button
        onClick={handleContinue}
        disabled={!canContinue || saving}
        style={{
          ...styles.btn,
          opacity: !canContinue || saving ? 0.5 : 1,
          cursor: !canContinue || saving ? "not-allowed" : "pointer",
        }}
      >
        {saving ? "Saving…" : "Continue"}
      </button>
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
    overflowY: "auto",
  },
  container: {
    width: "100%",
    maxWidth: 400,
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
  heading: {
    fontSize: 26,
    fontWeight: 900,
    margin: "0 0 6px",
    color: "#1A1A1A",
    textAlign: "center",
  },
  subheading: {
    fontSize: 15,
    color: "#666",
    margin: "0 0 16px",
    fontWeight: 400,
    textAlign: "center",
  },
  avatarSection: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarButton: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: "50%",
    border: "none",
    padding: 0,
    cursor: "pointer",
    background: "none",
    overflow: "visible",
  },
  avatarImg: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    objectFit: "cover",
    display: "block",
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    background: "#F5F5F5",
    border: "2px dashed #E0E0E0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },
  avatarOverlay: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: "50%",
    background: "#F26522",
    border: "2px solid #FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  plusIcon: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: 700,
    lineHeight: 1,
  },
  fieldGroup: {
    marginBottom: 12,
  },
  label: {
    display: "block",
    marginBottom: 6,
    fontSize: 14,
    fontWeight: 600,
    color: "#1A1A1A",
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
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    background: "#F5F5F5",
    border: "1px solid #E0E0E0",
    borderRadius: 12,
    padding: "13px 14px",
    outline: "none",
    color: "#1A1A1A",
    fontSize: 16,
    boxSizing: "border-box",
    resize: "none",
    fontFamily: "inherit",
  },
  charCount: {
    marginTop: 4,
    fontSize: 12,
    color: "#999",
    textAlign: "right",
  },
  phoneRow: {
    display: "flex",
    gap: 8,
  },
  countrySelect: {
    width: 100,
    background: "#F5F5F5",
    border: "1px solid #E0E0E0",
    borderRadius: 12,
    padding: "13px 8px",
    outline: "none",
    color: "#1A1A1A",
    fontSize: 15,
    cursor: "pointer",
    appearance: "none",
    WebkitAppearance: "none",
    textAlign: "center",
  },
  phoneInput: {
    flex: 1,
    background: "#F5F5F5",
    border: "1px solid #E0E0E0",
    borderRadius: 12,
    padding: "13px 14px",
    outline: "none",
    color: "#1A1A1A",
    fontSize: 16,
    boxSizing: "border-box",
  },
  helperText: {
    marginTop: 6,
    fontSize: 12,
    color: "#999",
  },
  handleFeedback: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
    fontSize: 13,
    fontWeight: 500,
  },
  btn: {
    width: "100%",
    padding: "14px",
    borderRadius: 12,
    border: "none",
    background: "#F26522",
    color: "#FFFFFF",
    fontWeight: 800,
    fontSize: 16,
    marginTop: 8,
  },
};

export default OnboardingProfileSetup;
