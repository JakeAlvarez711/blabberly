// src/pages/ProfilePage.js
import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { getPublicUser, setHandle, updateProfile } from "../data/userService";
import { useNavigate } from "react-router-dom";

const normalizePreview = (h) => (h || "").trim().toLowerCase();

function ProfilePage() {
  const navigate = useNavigate();

  const [uid, setUid] = useState(null);
  const [me, setMe] = useState(null);

  // username claim
  const [handleInput, setHandleInput] = useState("");
  const [handleStatus, setHandleStatus] = useState({ type: "idle", message: "" }); // idle | loading | error | success

  // profile fields
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [profileStatus, setProfileStatus] = useState({ type: "idle", message: "" }); // idle | loading | error | success

  // 1) auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUid(u?.uid || null));
    return () => unsub();
  }, []);

  // 2) load my user doc
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!uid) return;

      try {
        const u = await getPublicUser(uid);
        if (cancelled) return;

        setMe(u);

        // Prefill
        if (u?.handle) setHandleInput(u.handle);
        setDisplayName(u?.displayName || "");
        setBio(u?.bio || "");
      } catch (e) {
        console.error("Failed to load my profile:", e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [uid]);

  const hasHandle = !!me?.handle;

  const publicUrl = useMemo(() => {
    if (!me?.handle) return null;
    // works for local + prod without hardcoding domain
    return `${window.location.origin}/u/${me.handle}`;
  }, [me?.handle]);

  const submitHandle = async () => {
    if (!uid) {
      setHandleStatus({ type: "error", message: "You must be signed in." });
      return;
    }

    const desired = normalizePreview(handleInput);

    setHandleStatus({ type: "loading", message: "Claiming username…" });

    try {
      const claimed = await setHandle(uid, desired);

      // refresh local state
      const updated = await getPublicUser(uid);
      setMe(updated);

      setHandleStatus({ type: "success", message: "Username claimed!" });

      // send them to their public profile
      navigate(`/u/${claimed}`);
    } catch (e) {
      const msg =
        e?.message === "Username already taken"
          ? "That username is taken. Try another."
          : e?.message === "Invalid handle"
          ? "Usernames must be 3–20 chars: a–z, 0–9, underscore."
          : "Failed to claim username.";
      setHandleStatus({ type: "error", message: msg });
    }
  };

  const saveProfile = async () => {
    if (!uid) return;

    setProfileStatus({ type: "loading", message: "Saving…" });

    try {
      await updateProfile(uid, {
        displayName,
        bio,
      });

      const updated = await getPublicUser(uid);
      setMe(updated);

      setProfileStatus({ type: "success", message: "Saved!" });
      setTimeout(() => setProfileStatus({ type: "idle", message: "" }), 1200);
    } catch (e) {
      console.error("Failed to save profile:", e);
      setProfileStatus({ type: "error", message: "Failed to save profile." });
    }
  };

  const copyPublicLink = async () => {
    if (!publicUrl) return;
    try {
      await navigator.clipboard.writeText(publicUrl);
      setProfileStatus({ type: "success", message: "Link copied!" });
      setTimeout(() => setProfileStatus({ type: "idle", message: "" }), 1200);
    } catch {
      // clipboard can fail on http or permissions
      setProfileStatus({ type: "error", message: "Couldn't copy link." });
    }
  };

  if (!uid) {
    return (
      <div style={styles.page}>
        <h2 style={{ margin: 0 }}>Profile</h2>
        <p style={{ opacity: 0.7 }}>Sign in to claim a username.</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h2 style={{ marginTop: 0 }}>Profile Setup</h2>

      {/* Current username */}
      <div style={styles.card}>
        <div style={{ fontWeight: 800, marginBottom: 6 }}>Your username</div>
        <div style={{ opacity: 0.75 }}>
          {hasHandle ? `@${me.handle}` : "Not set yet"}
        </div>

        {publicUrl ? (
          <div style={{ marginTop: 10, opacity: 0.75, fontSize: 13 }}>
            Public profile: <span style={{ opacity: 0.95 }}>{publicUrl}</span>
          </div>
        ) : null}
      </div>

      {/* Claim username */}
      <div style={styles.card}>
        <div style={{ fontWeight: 800, marginBottom: 10 }}>Claim a username</div>

        <div style={styles.inputRow}>
          <span style={{ opacity: 0.8 }}>@</span>
          <input
            value={handleInput}
            onChange={(e) => {
              setHandleInput(e.target.value);
              if (handleStatus.type !== "idle")
                setHandleStatus({ type: "idle", message: "" });
            }}
            placeholder="yourname"
            style={styles.input}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
          />
        </div>

        <div style={{ marginTop: 10, opacity: 0.65, fontSize: 13 }}>
          3–20 characters. Letters, numbers, underscore.
        </div>

        {handleStatus.type !== "idle" ? (
          <div
            style={{
              marginTop: 10,
              fontSize: 14,
              opacity: handleStatus.type === "error" ? 1 : 0.9,
            }}
          >
            {handleStatus.message}
          </div>
        ) : null}

        <button
          onClick={submitHandle}
          disabled={handleStatus.type === "loading"}
          style={{
            ...styles.btn,
            opacity: handleStatus.type === "loading" ? 0.6 : 1,
          }}
        >
          {hasHandle ? "Update Username" : "Claim Username"}
        </button>
      </div>

      {/* Edit profile */}
      <div style={styles.card}>
        <div style={{ fontWeight: 800, marginBottom: 10 }}>Profile</div>

        <label style={styles.label}>Display name</label>
        <input
          value={displayName}
          onChange={(e) => {
            setDisplayName(e.target.value);
            if (profileStatus.type !== "idle")
              setProfileStatus({ type: "idle", message: "" });
          }}
          placeholder="Your name"
          style={styles.textField}
        />

        <label style={styles.label}>Bio</label>
        <textarea
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
            if (profileStatus.type !== "idle")
              setProfileStatus({ type: "idle", message: "" });
          }}
          placeholder="Short bio (160 chars)"
          style={styles.textArea}
          rows={3}
        />

        {profileStatus.type !== "idle" ? (
          <div
            style={{
              marginTop: 10,
              fontSize: 14,
              opacity: profileStatus.type === "error" ? 1 : 0.9,
            }}
          >
            {profileStatus.message}
          </div>
        ) : null}

        <button
          onClick={saveProfile}
          disabled={profileStatus.type === "loading"}
          style={{
            ...styles.btn,
            background: "#16a34a",
            opacity: profileStatus.type === "loading" ? 0.6 : 1,
          }}
        >
          Save Profile
        </button>

        {me?.handle ? (
          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            <button
              onClick={() => navigate(`/u/${me.handle}`)}
              style={{ ...styles.smallBtn }}
            >
              View Public Profile
            </button>
            <button onClick={copyPublicLink} style={{ ...styles.smallBtn }}>
              Copy Link
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#000",
    color: "#fff",
    padding: 16,
    paddingBottom: 80,
  },
  card: {
    background: "#111",
    border: "1px solid #222",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#000",
    border: "1px solid #222",
    borderRadius: 12,
    padding: "10px 12px",
  },
  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "white",
    fontSize: 16,
  },
  label: {
    display: "block",
    marginTop: 12,
    marginBottom: 6,
    opacity: 0.8,
    fontSize: 13,
    fontWeight: 700,
  },
  textField: {
    width: "100%",
    background: "#000",
    border: "1px solid #222",
    borderRadius: 12,
    padding: "10px 12px",
    outline: "none",
    color: "white",
    fontSize: 16,
  },
  textArea: {
    width: "100%",
    background: "#000",
    border: "1px solid #222",
    borderRadius: 12,
    padding: "10px 12px",
    outline: "none",
    color: "white",
    fontSize: 15,
    resize: "none",
  },
  btn: {
    width: "100%",
    marginTop: 12,
    padding: "12px 14px",
    borderRadius: 14,
    border: "none",
    cursor: "pointer",
    background: "#1d4ed8",
    color: "white",
    fontWeight: 800,
  },
  smallBtn: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: 14,
    border: "1px solid #222",
    cursor: "pointer",
    background: "#1b1b1b",
    color: "white",
    fontWeight: 800,
  },
};

export default ProfilePage;
