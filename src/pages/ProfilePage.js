// src/pages/ProfilePage.js
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import {
  getPublicUser,
  getPublicUserByHandle,
  setHandle,
  clearHandle,
  updateProfile,
  isValidHandle,
  normalizeHandle,
} from "../data/userService";
import { loadPostsByAuthor } from "../data/firestoreFeedService";
import { uploadAvatar } from "../data/avatarService";
import PostGrid from "../components/PostGrid/PostGrid";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const BIO_MAX = 160;

function ProfilePage() {
  const navigate = useNavigate();
  const { uid, ready } = useAuth();

  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  // username claim
  const [handleInput, setHandleInput] = useState("");
  const [handleStatus, setHandleStatus] = useState({ type: "idle", message: "" }); // idle | loading | checking | error | success | available | taken
  const debounceRef = useRef(null);

  // avatar
  const fileRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarStatus, setAvatarStatus] = useState({ type: "idle", message: "" });

  // profile fields
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [profileStatus, setProfileStatus] = useState({ type: "idle", message: "" });

  // my posts
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);

  // load my user doc
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!uid) {
        setMe(null);
        setLoading(false);
        return;
      }

      setLoading(true);
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
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [uid]);

  // load my posts
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!uid) return;

      setPostsLoading(true);
      try {
        const list = await loadPostsByAuthor({
          authorId: uid,
          uid,
          limitCount: 60,
        });
        if (!cancelled) setPosts(Array.isArray(list) ? list : []);
      } catch (e) {
        console.error("Failed to load my posts:", e);
        if (!cancelled) setPosts([]);
      } finally {
        if (!cancelled) setPostsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [uid]);

  const hasHandle = !!me?.handle;

  const publicUrl = useMemo(() => {
    if (!me?.handle) return null;
    return `${window.location.origin}/u/${me.handle}`;
  }, [me?.handle]);

  // --- Handle input validation + live availability check ---

  const normalized = useMemo(
    () => normalizeHandle(handleInput),
    [handleInput]
  );

  const handleInputValid = useMemo(
    () => isValidHandle(normalized),
    [normalized]
  );

  // Is the typed handle the same as the already-claimed one?
  const isSameHandle = hasHandle && normalized === normalizeHandle(me.handle);

  const checkAvailability = useCallback(
    (value) => {
      const h = normalizeHandle(value);
      if (!isValidHandle(h)) return;
      if (hasHandle && h === normalizeHandle(me?.handle)) return;

      setHandleStatus({ type: "checking", message: "Checking…" });

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
    [hasHandle, me?.handle, uid]
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

  // Disable submit when input is invalid, same as current, taken, or busy
  const handleSubmitDisabled =
    handleStatus.type === "loading" ||
    handleStatus.type === "checking" ||
    handleStatus.type === "taken" ||
    !handleInputValid ||
    isSameHandle;

  // --- Avatar ---

  const onFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    setAvatarStatus({ type: "idle", message: "" });
  };

  const doUpload = async () => {
    if (!uid || !avatarFile) return;

    setAvatarStatus({ type: "loading", message: "Uploading…" });

    try {
      const photoURL = await uploadAvatar(uid, avatarFile);

      setMe((prev) => (prev ? { ...prev, photoURL } : prev));
      setAvatarFile(null);
      setAvatarPreview(null);
      setAvatarStatus({ type: "success", message: "Photo updated!" });
      setTimeout(() => setAvatarStatus({ type: "idle", message: "" }), 1200);
    } catch (e) {
      setAvatarStatus({ type: "error", message: e.message || "Upload failed." });
    }
  };

  const removePhoto = async () => {
    if (!uid) return;

    setAvatarStatus({ type: "loading", message: "Removing…" });

    try {
      await updateProfile(uid, { photoURL: null });
      setMe((prev) => (prev ? { ...prev, photoURL: null } : prev));
      setAvatarFile(null);
      setAvatarPreview(null);
      setAvatarStatus({ type: "success", message: "Photo removed." });
      setTimeout(() => setAvatarStatus({ type: "idle", message: "" }), 1200);
    } catch (e) {
      setAvatarStatus({ type: "error", message: "Failed to remove photo." });
    }
  };

  // --- Handle submit ---

  const submitHandle = async () => {
    if (!uid) {
      setHandleStatus({ type: "error", message: "You must be signed in." });
      return;
    }

    if (!handleInputValid) {
      setHandleStatus({
        type: "error",
        message: "Usernames must be 3–20 chars: a–z, 0–9, underscore.",
      });
      return;
    }

    setHandleStatus({ type: "loading", message: "Claiming username…" });

    try {
      const claimed = await setHandle(uid, normalized);

      const updated = await getPublicUser(uid);
      setMe(updated);

      setHandleStatus({ type: "success", message: "Username claimed!" });

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

  // --- Release handle ---

  const releaseHandle = async () => {
    if (!uid || !hasHandle) return;

    setHandleStatus({ type: "loading", message: "Releasing username…" });

    try {
      await clearHandle(uid);

      const updated = await getPublicUser(uid);
      setMe(updated);
      setHandleInput("");

      setHandleStatus({ type: "success", message: "Username released." });
      setTimeout(() => setHandleStatus({ type: "idle", message: "" }), 1200);
    } catch (e) {
      console.error("Failed to release handle:", e);
      setHandleStatus({ type: "error", message: "Failed to release username." });
    }
  };

  // --- Profile save ---

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
      setProfileStatus({ type: "error", message: "Couldn't copy link." });
    }
  };

  // --- Sign out ---

  const doSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (e) {
      console.error("Sign out failed:", e);
    }
  };

  // --- Render ---

  // Auth not resolved yet
  if (!ready) {
    return (
      <div style={styles.page}>
        <div style={styles.skeleton} />
        <div style={{ ...styles.skeleton, width: "60%", height: 16 }} />
      </div>
    );
  }

  if (!uid) {
    return (
      <div style={styles.page}>
        <h2 style={{ margin: 0 }}>Profile</h2>
        <p style={{ opacity: 0.7 }}>Sign in to claim a username.</p>
      </div>
    );
  }

  // Firestore doc loading
  if (loading) {
    return (
      <div style={styles.page}>
        <h2 style={{ marginTop: 0 }}>Profile Setup</h2>
        <div style={styles.skeleton} />
        <div style={{ ...styles.skeleton, width: "50%", height: 16, marginTop: 10 }} />
        <div style={{ ...styles.skeleton, width: "70%", height: 16, marginTop: 10 }} />
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h2 style={{ marginTop: 0 }}>Profile Setup</h2>

      {/* Avatar */}
      <div style={styles.card}>
        <div style={{ fontWeight: 800, marginBottom: 10 }}>Photo</div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {avatarPreview || me?.photoURL ? (
            <img
              src={avatarPreview || me.photoURL}
              alt=""
              style={styles.avatarImg}
            />
          ) : (
            <div style={styles.avatarFallback} />
          )}

          <div style={{ flex: 1 }}>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={onFileSelect}
              style={{ display: "none" }}
            />
            <button
              onClick={() => fileRef.current?.click()}
              style={styles.smallBtn}
            >
              Change Photo
            </button>
          </div>
        </div>

        {avatarFile && (
          <button
            onClick={doUpload}
            disabled={avatarStatus.type === "loading"}
            style={{
              ...styles.btn,
              opacity: avatarStatus.type === "loading" ? 0.6 : 1,
            }}
          >
            Upload
          </button>
        )}

        {me?.photoURL && !avatarFile && (
          <button
            onClick={removePhoto}
            disabled={avatarStatus.type === "loading"}
            style={{
              ...styles.btn,
              background: "#7f1d1d",
              opacity: avatarStatus.type === "loading" ? 0.6 : 1,
            }}
          >
            Remove Photo
          </button>
        )}

        {avatarStatus.type !== "idle" && (
          <div
            style={{
              marginTop: 10,
              fontSize: 14,
              opacity: avatarStatus.type === "error" ? 1 : 0.9,
            }}
          >
            {avatarStatus.message}
          </div>
        )}
      </div>

      {/* Reputation & Activity */}
      <div style={styles.boxRow}>
        <span style={styles.star}>★</span>
        <span style={styles.boxText}>
          {Number(me?.reputation || 0).toLocaleString()}{" "}
          <span style={styles.subtle}>Reputation</span>
        </span>
        <span style={styles.dot}>·</span>
        <span style={styles.boxText}>
          {Number(me?.activity || 0).toLocaleString()}{" "}
          <span style={styles.subtle}>Activity</span>
        </span>
      </div>

      {/* Followers / Following */}
      <div style={styles.followRow}>
        <div>
          <strong>{Number(me?.followersCount || 0).toLocaleString()}</strong>{" "}
          Followers
        </div>
        <div>
          <strong>{Number(me?.followingCount || 0).toLocaleString()}</strong>{" "}
          Following
        </div>
      </div>

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
        <div style={{ fontWeight: 800, marginBottom: 10 }}>
          {hasHandle ? "Change username" : "Claim a username"}
        </div>

        <div style={styles.inputRow}>
          <span style={{ opacity: 0.8 }}>@</span>
          <input
            value={handleInput}
            onChange={onHandleChange}
            placeholder="yourname"
            style={styles.input}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
          />
        </div>

        <div
          style={{
            marginTop: 10,
            opacity: 0.65,
            fontSize: 13,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>3–20 characters. Letters, numbers, underscore.</span>
          {normalized.length > 0 && (
            <span>{normalized.length}/20</span>
          )}
        </div>

        {handleStatus.type !== "idle" ? (
          <div
            style={{
              marginTop: 10,
              fontSize: 14,
              opacity: handleStatus.type === "error" || handleStatus.type === "taken" ? 1 : 0.9,
              color:
                handleStatus.type === "available"
                  ? "#22c55e"
                  : handleStatus.type === "taken"
                  ? "#ef4444"
                  : "inherit",
            }}
          >
            {handleStatus.message}
          </div>
        ) : null}

        <button
          onClick={submitHandle}
          disabled={handleSubmitDisabled}
          style={{
            ...styles.btn,
            opacity: handleSubmitDisabled ? 0.5 : 1,
            cursor: handleSubmitDisabled ? "not-allowed" : "pointer",
          }}
        >
          {hasHandle ? "Update Username" : "Claim Username"}
        </button>

        {hasHandle && (
          <button
            onClick={releaseHandle}
            disabled={handleStatus.type === "loading"}
            style={{
              ...styles.btn,
              background: "#7f1d1d",
              opacity: handleStatus.type === "loading" ? 0.6 : 1,
            }}
          >
            Release Username
          </button>
        )}
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
          maxLength={BIO_MAX}
        />
        <div
          style={{
            marginTop: 4,
            fontSize: 12,
            opacity: bio.length >= BIO_MAX ? 1 : 0.5,
            color: bio.length >= BIO_MAX ? "#ef4444" : "inherit",
            textAlign: "right",
          }}
        >
          {bio.length}/{BIO_MAX}
        </div>

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

      {/* My Posts */}
      <div style={{ marginTop: 4 }}>
        <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 10 }}>
          Your Posts
        </div>
        {postsLoading ? (
          <div style={{ opacity: 0.7 }}>Loading posts…</div>
        ) : (
          <PostGrid
            posts={posts}
            emptyText="You haven't posted yet."
            onSelectPost={(p) => {
              if (p?._docId) navigate(`/p/${p._docId}`);
            }}
          />
        )}
      </div>

      {/* Sign Out */}
      <button onClick={doSignOut} style={styles.signOutBtn}>
        Sign Out
      </button>
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
  skeleton: {
    background: "#181818",
    borderRadius: 12,
    height: 48,
    width: "100%",
    marginBottom: 10,
  },
  avatarImg: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    objectFit: "cover",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  avatarFallback: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: "#141414",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  boxRow: {
    marginTop: 0,
    marginBottom: 12,
    borderRadius: 18,
    padding: "14px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  star: { color: "#22c55e", fontSize: 18, fontWeight: 900 },
  boxText: { fontSize: 18, fontWeight: 800 },
  subtle: { opacity: 0.75, fontWeight: 700, marginLeft: 6 },
  dot: { opacity: 0.55, fontSize: 18 },
  followRow: {
    display: "flex",
    gap: 16,
    marginBottom: 12,
    opacity: 0.85,
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
  signOutBtn: {
    width: "100%",
    marginTop: 20,
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid #333",
    cursor: "pointer",
    background: "transparent",
    color: "#ef4444",
    fontWeight: 800,
    fontSize: 15,
  },
};

export default ProfilePage;
