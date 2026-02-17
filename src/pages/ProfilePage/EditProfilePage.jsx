import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getPublicUser,
  getPublicUserByHandle,
  setHandle,
  updateProfile,
  isValidHandle,
  normalizeHandle,
} from "../../data/userService";
import { uploadAvatar } from "../../data/avatarService";
import { uploadCoverPhoto } from "../../data/profileService";

import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";
import { useAuth } from "../../hooks/useAuth";

const BIO_MAX = 160;
const NAME_MAX = 40;

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { uid, ready, userDoc } = useAuth();

  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cover photo
  const coverFileRef = useRef(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  // Avatar
  const avatarFileRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  // Fields
  const [displayName, setDisplayName] = useState("");
  const [handleInput, setHandleInput] = useState("");
  const [bio, setBio] = useState("");
  const [locationCity, setLocationCity] = useState("");
  const [locationVisible, setLocationVisible] = useState(true);

  // Handle check
  const [handleStatus, setHandleStatus] = useState({ type: "idle", message: "" });
  const debounceRef = useRef(null);

  // Save status
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  /* ------- Load profile ------- */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!uid) { setLoading(false); return; }

      setLoading(true);
      try {
        const u = await getPublicUser(uid);
        if (cancelled) return;

        setMe(u);
        if (u) {
          setDisplayName(u.displayName || "");
          setHandleInput(u.handle || "");
          setBio(u.bio || "");
          if (u.location && typeof u.location === "object") {
            setLocationCity(u.location.city || "");
            setLocationVisible(u.location.visible !== false);
          } else if (typeof u.location === "string") {
            setLocationCity(u.location);
            setLocationVisible(true);
          }
        }
      } catch (e) {
        console.error("Failed to load profile for editing:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [uid]);

  /* ------- Handle availability check ------- */
  const normalized = useMemo(() => normalizeHandle(handleInput), [handleInput]);
  const handleInputValid = useMemo(() => isValidHandle(normalized), [normalized]);
  const isSameHandle = !!me?.handle && normalized === normalizeHandle(me.handle);

  const checkAvailability = useCallback(
    (value) => {
      const h = normalizeHandle(value);
      if (!isValidHandle(h)) return;
      if (me?.handle && h === normalizeHandle(me.handle)) return;

      setHandleStatus({ type: "checking", message: "Checking..." });

      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        try {
          const existing = await getPublicUserByHandle(h);
          if (existing && existing.uid !== uid) {
            setHandleStatus({ type: "taken", message: "Already taken." });
          } else {
            setHandleStatus({ type: "available", message: "Available!" });
          }
        } catch {
          setHandleStatus({ type: "idle", message: "" });
        }
      }, 500);
    },
    [me?.handle, uid]
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

  /* ------- File selectors ------- */
  const onCoverSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const onAvatarSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  /* ------- Save ------- */
  const handleSave = async () => {
    if (!uid) return;

    setSaving(true);
    setSaveError("");

    try {
      // Update profile fields
      await updateProfile(uid, {
        displayName,
        bio,
        location: {
          city: locationCity,
          visible: locationVisible,
        },
      });

      // Handle change
      if (handleInputValid && !isSameHandle && handleStatus.type !== "taken") {
        await setHandle(uid, normalized);
      }

      // Upload cover photo
      if (coverFile) {
        await uploadCoverPhoto(uid, coverFile);
      }

      // Upload avatar
      if (avatarFile) {
        await uploadAvatar(uid, avatarFile);
      }

      navigate("/profile");
    } catch (e) {
      console.error("Failed to save profile:", e);
      setSaveError(e.message || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  /* ------- Render ------- */
  if (!ready || loading) {
    return (
      <div style={styles.page}>
        <Header />
        <Sidebar userDoc={userDoc} />
        <div style={styles.content}>
          <div style={styles.loadingText}>Loading...</div>
        </div>
      </div>
    );
  }

  const coverSrc = coverPreview || me?.coverPhotoURL || null;
  const avatarSrc = avatarPreview || me?.photoURL || null;

  return (
    <div style={styles.page}>
      <Header />
      <Sidebar userDoc={userDoc} />

      <div style={styles.content}>
        <div style={styles.form}>
          <h2 style={styles.heading}>Edit Profile</h2>

          {/* Cover photo */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Cover Photo</label>
            <div
              style={{
                ...styles.coverPreview,
                ...(coverSrc
                  ? { backgroundImage: `url(${coverSrc})`, backgroundSize: "cover", backgroundPosition: "center" }
                  : { background: "linear-gradient(135deg, #F26522, #FF8A50)" }),
              }}
            />
            <input
              ref={coverFileRef}
              type="file"
              accept="image/*"
              onChange={onCoverSelect}
              style={{ display: "none" }}
            />
            <button
              onClick={() => coverFileRef.current?.click()}
              style={styles.changeBtn}
            >
              Change Cover Photo
            </button>
          </div>

          {/* Profile photo */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Profile Photo</label>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {avatarSrc ? (
                <img src={avatarSrc} alt="" style={styles.avatarPreview} />
              ) : (
                <div style={styles.avatarFallback} />
              )}
              <input
                ref={avatarFileRef}
                type="file"
                accept="image/*"
                onChange={onAvatarSelect}
                style={{ display: "none" }}
              />
              <button
                onClick={() => avatarFileRef.current?.click()}
                style={styles.changeBtn}
              >
                Change Photo
              </button>
            </div>
          </div>

          {/* Display name */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Display Name</label>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value.slice(0, NAME_MAX))}
              placeholder="Your name"
              style={styles.input}
              maxLength={NAME_MAX}
            />
            <div style={styles.charCount}>{displayName.length}/{NAME_MAX}</div>
          </div>

          {/* Username */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Username</label>
            <div style={styles.usernameRow}>
              <span style={styles.atSign}>@</span>
              <input
                value={handleInput}
                onChange={onHandleChange}
                placeholder="yourname"
                style={styles.usernameInput}
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
              />
            </div>
            <div style={styles.helperRow}>
              <span style={styles.helperText}>3-20 characters. Letters, numbers, underscore.</span>
              {normalized.length > 0 && <span style={styles.helperText}>{normalized.length}/20</span>}
            </div>
            {handleStatus.type !== "idle" && (
              <div
                style={{
                  fontSize: 13,
                  marginTop: 4,
                  color:
                    handleStatus.type === "available" ? "#22c55e"
                    : handleStatus.type === "taken" ? "#ef4444"
                    : "#999",
                }}
              >
                {handleStatus.message}
              </div>
            )}
          </div>

          {/* Bio */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, BIO_MAX))}
              placeholder="Tell people about yourself"
              style={styles.textarea}
              rows={3}
              maxLength={BIO_MAX}
            />
            <div style={{
              ...styles.charCount,
              color: bio.length >= BIO_MAX ? "#ef4444" : "#999",
            }}>
              {bio.length}/{BIO_MAX}
            </div>
          </div>

          {/* Location */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Location</label>
            <input
              value={locationCity}
              onChange={(e) => setLocationCity(e.target.value)}
              placeholder="City, State"
              style={styles.input}
            />
            <div style={styles.toggleRow}>
              <span style={styles.toggleLabel}>Show location on profile</span>
              <button
                onClick={() => setLocationVisible(!locationVisible)}
                style={{
                  ...styles.toggle,
                  background: locationVisible ? "#F26522" : "#E0E0E0",
                }}
              >
                <div
                  style={{
                    ...styles.toggleKnob,
                    transform: locationVisible ? "translateX(18px)" : "translateX(2px)",
                  }}
                />
              </button>
            </div>
          </div>

          {/* Edit Taste Preferences */}
          <div style={styles.fieldGroup}>
            <button
              onClick={() => navigate("/onboarding/taste")}
              style={styles.tasteBtn}
            >
              Edit Taste Preferences
            </button>
          </div>

          {/* Error */}
          {saveError && (
            <div style={styles.error}>{saveError}</div>
          )}

          {/* Buttons */}
          <div style={styles.btnRow}>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                ...styles.saveBtn,
                opacity: saving ? 0.6 : 1,
              }}
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => navigate("/profile")}
              style={styles.cancelBtn}
            >
              Cancel
            </button>
          </div>
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
  },
  loadingText: {
    padding: 32,
    textAlign: "center",
    color: "#999",
    fontSize: 15,
  },
  form: {
    maxWidth: 520,
    margin: "0 auto",
    padding: "24px 24px 48px",
  },
  heading: {
    fontSize: 22,
    fontWeight: 800,
    margin: "0 0 24px",
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 700,
    color: "#666",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    background: "#F5F5F5",
    border: "1px solid #E0E0E0",
    borderRadius: 12,
    padding: "13px 14px",
    fontSize: 15,
    color: "#1A1A1A",
    outline: "none",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    background: "#F5F5F5",
    border: "1px solid #E0E0E0",
    borderRadius: 12,
    padding: "13px 14px",
    fontSize: 15,
    color: "#1A1A1A",
    outline: "none",
    resize: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  charCount: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
    marginTop: 4,
  },
  usernameRow: {
    display: "flex",
    alignItems: "center",
    background: "#F5F5F5",
    border: "1px solid #E0E0E0",
    borderRadius: 12,
    padding: "0 14px",
  },
  atSign: {
    fontSize: 15,
    color: "#999",
    fontWeight: 600,
  },
  usernameInput: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    padding: "13px 8px",
    fontSize: 15,
    color: "#1A1A1A",
  },
  helperRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 4,
  },
  helperText: {
    fontSize: 12,
    color: "#999",
  },
  coverPreview: {
    width: "100%",
    height: 140,
    borderRadius: 12,
    marginBottom: 8,
  },
  avatarPreview: {
    width: 72,
    height: 72,
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #E0E0E0",
  },
  avatarFallback: {
    width: 72,
    height: 72,
    borderRadius: "50%",
    background: "#E0E0E0",
  },
  changeBtn: {
    padding: "8px 16px",
    borderRadius: 8,
    border: "1px solid #E0E0E0",
    background: "#fff",
    color: "#1A1A1A",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  toggleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  toggleLabel: {
    fontSize: 13,
    color: "#666",
  },
  toggle: {
    width: 42,
    height: 24,
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    position: "relative",
    padding: 0,
    transition: "background 0.2s",
  },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    background: "#fff",
    position: "absolute",
    top: 2,
    transition: "transform 0.2s",
    boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
  },
  tasteBtn: {
    width: "100%",
    padding: "13px 14px",
    borderRadius: 12,
    border: "1px solid #E0E0E0",
    background: "#fff",
    color: "#F26522",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  },
  error: {
    color: "#ef4444",
    fontSize: 14,
    marginBottom: 12,
  },
  btnRow: {
    display: "flex",
    gap: 10,
    marginTop: 8,
  },
  saveBtn: {
    flex: 1,
    padding: "14px 0",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg, #F26522, #FF8A50)",
    color: "#fff",
    fontSize: 15,
    fontWeight: 800,
    cursor: "pointer",
  },
  cancelBtn: {
    flex: 1,
    padding: "14px 0",
    borderRadius: 12,
    border: "1px solid #E0E0E0",
    background: "#fff",
    color: "#666",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
  },
};
