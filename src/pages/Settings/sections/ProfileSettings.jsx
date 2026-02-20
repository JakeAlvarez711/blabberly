import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { Camera, User } from "lucide-react";
import {
  updateProfile,
  setHandle,
  getPublicUserByHandle,
  isValidHandle,
  normalizeHandle,
} from "../../../data/userService";
import { uploadProfilePhoto } from "../../../data/storageService";

const NAME_MAX = 50;
const BIO_MAX = 150;

export default function ProfileSettings({ uid, userDoc, onToast }) {
  const [displayName, setDisplayName] = useState(userDoc?.displayName || "");
  const [handleInput, setHandleInput] = useState(userDoc?.handle || "");
  const [bio, setBio] = useState(userDoc?.bio || "");
  const [homeCity, setHomeCity] = useState(userDoc?.homeCity || "");

  const [handleStatus, setHandleStatus] = useState({ type: "idle", message: "" });
  const debounceRef = useRef(null);

  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const fileRef = useRef(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const normalized = useMemo(() => normalizeHandle(handleInput), [handleInput]);
  const isSameHandle = !!userDoc?.handle && normalized === normalizeHandle(userDoc.handle);

  // Sync if userDoc changes externally
  useEffect(() => {
    if (userDoc) {
      setDisplayName(userDoc.displayName || "");
      setHandleInput(userDoc.handle || "");
      setBio(userDoc.bio || "");
      setHomeCity(userDoc.homeCity || "");
    }
  }, [userDoc?.handle]); // eslint-disable-line react-hooks/exhaustive-deps

  const checkHandle = useCallback((val) => {
    const h = normalizeHandle(val);
    if (!isValidHandle(h)) return;
    if (userDoc?.handle && h === normalizeHandle(userDoc.handle)) return;

    setHandleStatus({ type: "checking", message: "Checking..." });
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const existing = await getPublicUserByHandle(h);
        if (existing && existing.uid !== uid) {
          setHandleStatus({ type: "taken", message: "Already taken" });
        } else {
          setHandleStatus({ type: "available", message: "Available!" });
        }
      } catch {
        setHandleStatus({ type: "idle", message: "" });
      }
    }, 500);
  }, [uid, userDoc?.handle]);

  const onHandleChange = (e) => {
    const val = e.target.value;
    setHandleInput(val);
    const h = normalizeHandle(val);
    if (!h || !isValidHandle(h)) {
      clearTimeout(debounceRef.current);
      setHandleStatus({ type: "idle", message: "" });
      return;
    }
    checkHandle(val);
  };

  const onPhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      onToast("Photo must be under 5MB");
      return;
    }
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      await updateProfile(uid, {
        displayName: displayName.slice(0, NAME_MAX),
        bio: bio.slice(0, BIO_MAX),
        homeCity,
      });

      if (isValidHandle(normalized) && !isSameHandle && handleStatus.type !== "taken") {
        await setHandle(uid, normalized);
      }

      if (photoFile) {
        await uploadProfilePhoto(uid, photoFile);
        setPhotoFile(null);
      }

      onToast("Profile updated!");
    } catch (e) {
      setError(e?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const avatarSrc = photoPreview || userDoc?.photoURL || null;

  return (
    <section style={styles.section}>
      <h3 style={styles.sectionTitle}>Profile</h3>

      {/* Photo */}
      <div style={styles.photoRow}>
        <div style={styles.photoWrap} onClick={() => fileRef.current?.click()}>
          {avatarSrc ? (
            <img src={avatarSrc} alt="" style={styles.avatar} />
          ) : (
            <div style={styles.avatarFallback}><User size={24} color="#fff" /></div>
          )}
          <div style={styles.cameraOverlay}><Camera size={14} color="#fff" /></div>
        </div>
        <button style={styles.changePhotoBtn} onClick={() => fileRef.current?.click()}>
          Change Photo
        </button>
        <input ref={fileRef} type="file" accept="image/*" onChange={onPhotoSelect} style={{ display: "none" }} />
      </div>

      {/* Display Name */}
      <div style={styles.field}>
        <label style={styles.label}>Display Name</label>
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value.slice(0, NAME_MAX))}
          style={styles.input}
          placeholder="Your name"
          maxLength={NAME_MAX}
        />
        <div style={styles.counter}>{displayName.length}/{NAME_MAX}</div>
      </div>

      {/* Username */}
      <div style={styles.field}>
        <label style={styles.label}>Username</label>
        <div style={styles.usernameRow}>
          <span style={styles.at}>@</span>
          <input
            value={handleInput}
            onChange={onHandleChange}
            style={styles.usernameInput}
            placeholder="username"
            autoCapitalize="none"
            autoCorrect="off"
          />
        </div>
        {handleStatus.type !== "idle" && (
          <div style={{
            fontSize: 12, marginTop: 4,
            color: handleStatus.type === "available" ? "#22C55E"
              : handleStatus.type === "taken" ? "#EF4444" : "#999",
          }}>
            {handleStatus.message}
          </div>
        )}
      </div>

      {/* Bio */}
      <div style={styles.field}>
        <label style={styles.label}>Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value.slice(0, BIO_MAX))}
          style={styles.textarea}
          rows={3}
          placeholder="Tell people about yourself"
          maxLength={BIO_MAX}
        />
        <div style={{ ...styles.counter, color: bio.length > 140 ? "#F26522" : "#999" }}>
          {bio.length}/{BIO_MAX}
        </div>
      </div>

      {/* Home City */}
      <div style={styles.field}>
        <label style={styles.label}>Home City</label>
        <input
          value={homeCity}
          onChange={(e) => setHomeCity(e.target.value)}
          style={styles.input}
          placeholder="Carlsbad, CA"
        />
      </div>

      {error && <div style={styles.error}>{error}</div>}

      <button
        style={{ ...styles.saveBtn, opacity: saving ? 0.6 : 1 }}
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </section>
  );
}

const styles = {
  section: { marginBottom: 8 },
  sectionTitle: {
    fontSize: 16, fontWeight: 800, color: "#1A1A1A", margin: "0 0 16px",
    paddingBottom: 10, borderBottom: "1px solid #F0F0F0",
  },
  photoRow: { display: "flex", alignItems: "center", gap: 14, marginBottom: 20 },
  photoWrap: {
    position: "relative", width: 64, height: 64, borderRadius: "50%",
    cursor: "pointer", overflow: "hidden", flexShrink: 0,
  },
  avatar: { width: "100%", height: "100%", objectFit: "cover" },
  avatarFallback: {
    width: "100%", height: "100%", background: "#F26522",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  cameraOverlay: {
    position: "absolute", bottom: 0, right: 0, width: 24, height: 24,
    borderRadius: "50%", background: "rgba(0,0,0,0.6)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  changePhotoBtn: {
    padding: "6px 14px", borderRadius: 8, border: "1px solid #E0E0E0",
    background: "#fff", color: "#1A1A1A", fontSize: 13, fontWeight: 600, cursor: "pointer",
  },
  field: { marginBottom: 16 },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#666", marginBottom: 6 },
  input: {
    width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #E0E0E0",
    background: "#F5F5F5", fontSize: 14, color: "#1A1A1A", outline: "none", boxSizing: "border-box",
  },
  textarea: {
    width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #E0E0E0",
    background: "#F5F5F5", fontSize: 14, color: "#1A1A1A", outline: "none",
    resize: "none", boxSizing: "border-box", fontFamily: "inherit",
  },
  counter: { fontSize: 12, color: "#999", textAlign: "right", marginTop: 4 },
  usernameRow: {
    display: "flex", alignItems: "center", background: "#F5F5F5",
    border: "1px solid #E0E0E0", borderRadius: 10, padding: "0 14px",
  },
  at: { fontSize: 14, color: "#999", fontWeight: 600 },
  usernameInput: {
    flex: 1, background: "transparent", border: "none", outline: "none",
    padding: "12px 8px", fontSize: 14, color: "#1A1A1A",
  },
  error: {
    color: "#EF4444", fontSize: 13, marginBottom: 10,
  },
  saveBtn: {
    width: "100%", padding: 13, borderRadius: 12, border: "none",
    background: "linear-gradient(135deg, #F26522, #FF8A50)", color: "#fff",
    fontSize: 15, fontWeight: 700, cursor: "pointer",
  },
};
