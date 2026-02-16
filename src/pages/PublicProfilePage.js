import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getPublicUserByHandle, normalizeHandle } from "../data/userService";
import { loadPostsByAuthor } from "../data/firestoreFeedService";

import { isFollowing, setFollowing } from "../data/followService";
import { blockUser, unblockUser, isBlocked, isBlockedBy } from "../data/blockService";

import PostGrid from "../components/PostGrid/PostGrid";
import { useAuth } from "../hooks/useAuth";

function PublicProfilePage() {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const viewerUid = user?.uid || null;

  /* ----------------------------
     Normalize handle
  ----------------------------- */
  const handle = useMemo(() => {
    const raw = params?.handle || "";
    const stripped = String(raw).replace(/^@/, "");
    return normalizeHandle(stripped);
  }, [params?.handle]);

  /* ----------------------------
     State
  ----------------------------- */
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const [postsLoading, setPostsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const [isFollowingState, setIsFollowingState] = useState(false);
  const [followBusy, setFollowBusy] = useState(false);

  // counts are expected to be on the user profile doc
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  // block state (two-way)
  const [blocked, setBlocked] = useState(false); // I blocked them
  const [blockedByThem, setBlockedByThem] = useState(false); // they blocked me
  const [blockBusy, setBlockBusy] = useState(false);

  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");

  const blockedEitherWay = blocked || blockedByThem;
  const showViewerActions =
    !!viewerUid && viewerUid !== profile?.uid && !blockedByThem;

  /* ----------------------------
     1) Load profile by handle
  ----------------------------- */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setNotFound(false);
      setError("");
      setProfile(null);
      setPosts([]);

      setIsFollowingState(false);
      setFollowersCount(0);
      setFollowingCount(0);

      setBlocked(false);
      setBlockedByThem(false);

      if (!handle) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const p = await getPublicUserByHandle(handle);
        if (cancelled) return;

        if (!p) {
          setNotFound(true);
        } else {
          setProfile(p);
          setFollowersCount(
            typeof p.followersCount === "number" ? p.followersCount : 0
          );
          setFollowingCount(
            typeof p.followingCount === "number" ? p.followingCount : 0
          );
        }
      } catch (e) {
        console.error("Failed to load public profile:", e);
        if (!cancelled) setError("Something went wrong loading this profile.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [handle]);

  /* ----------------------------
     2) Load block state (two-way)
     - blocked: viewer blocked profile
     - blockedByThem: profile blocked viewer
     NOTE: blockedByThem must use rules-safe lookup (isBlockedBy)
  ----------------------------- */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!profile?.uid) return;

      if (!viewerUid || viewerUid === profile.uid) {
        if (!cancelled) {
          setBlocked(false);
          setBlockedByThem(false);
        }
        return;
      }

      try {
        const a = await isBlocked(viewerUid, profile.uid); // I blocked them
        const b = await isBlockedBy(viewerUid, profile.uid); // they blocked me (rules-safe)

        if (!cancelled) {
          setBlocked(!!a);
          setBlockedByThem(!!b);
        }
      } catch (e) {
        console.error("Failed to check blocked state:", e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [viewerUid, profile?.uid]);

  /* ----------------------------
     3) Load follow state
     - skip when blocked either way (hard-block)
  ----------------------------- */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!profile?.uid) return;

      if (!viewerUid || viewerUid === profile.uid) {
        if (!cancelled) setIsFollowingState(false);
        return;
      }

      if (blockedEitherWay) {
        if (!cancelled) setIsFollowingState(false);
        return;
      }

      try {
        const yes = await isFollowing(viewerUid, profile.uid);
        if (!cancelled) setIsFollowingState(!!yes);
      } catch (e) {
        console.error("Failed to load follow state:", e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [profile?.uid, viewerUid, blockedEitherWay]);

  /* ----------------------------
     4) Load posts by author
     - skip when blocked either way (hard-block)
  ----------------------------- */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!profile?.uid) return;

      // Hard-block: don't attempt reads that will permission-deny
      if (viewerUid && viewerUid !== profile.uid && blockedEitherWay) {
        if (!cancelled) {
          setPosts([]);
          setPostsLoading(false);
        }
        return;
      }

      setPostsLoading(true);
      try {
        const list = await loadPostsByAuthor({
          authorId: profile.uid,
          uid: viewerUid,
          limitCount: 60,
        });

        if (!cancelled) setPosts(Array.isArray(list) ? list : []);
      } catch (e) {
        console.error("Failed to load posts by author:", e);
        if (!cancelled) setPosts([]); // treat as empty rather than "error"
      } finally {
        if (!cancelled) setPostsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [profile?.uid, viewerUid, blockedEitherWay]);

  /* ----------------------------
     Follow toggle (uses setFollowing)
  ----------------------------- */
  const toggleFollow = async () => {
    if (!viewerUid || !profile?.uid) return;
    if (viewerUid === profile.uid) return;
    if (blockedEitherWay) return;

    const next = !isFollowingState;

    setFollowBusy(true);
    setIsFollowingState(next);
    setFollowersCount((c) => Math.max(0, c + (next ? 1 : -1)));

    try {
      await setFollowing(viewerUid, profile.uid, next);
    } catch (e) {
      console.error("Follow toggle failed:", e);

      // revert
      setIsFollowingState(!next);
      setFollowersCount((c) => Math.max(0, c + (next ? -1 : 1)));
    } finally {
      setFollowBusy(false);
    }
  };

  /* ----------------------------
     Block toggle
  ----------------------------- */
  const toggleBlock = async () => {
    if (!viewerUid || !profile?.uid) return;
    if (viewerUid === profile.uid) return;

    const next = !blocked;

    setBlockBusy(true);
    setBlocked(next);

    try {
      if (next) {
        await blockUser(viewerUid, profile.uid);

        // auto-unfollow if needed
        if (isFollowingState) {
          setIsFollowingState(false);
          setFollowersCount((c) => Math.max(0, c - 1));
          try {
            await setFollowing(viewerUid, profile.uid, false);
          } catch (e) {
            console.error("Auto-unfollow after block failed:", e);
          }
        }
      } else {
        await unblockUser(viewerUid, profile.uid);
      }
    } catch (e) {
      console.error("Block toggle failed:", e);
      setBlocked(!next); // revert
    } finally {
      setBlockBusy(false);
    }
  };

  /* ----------------------------
     Render states
  ----------------------------- */
  if (loading) return <div style={styles.page}>Loading…</div>;
  if (error) return <div style={styles.page}>{error}</div>;
  if (notFound || !profile) return <div style={styles.page}>User not found</div>;

  // ✅ privacy: if they blocked me, treat as not found/unavailable
  if (blockedByThem) return <div style={styles.page}>User not found</div>;

  const displayName = profile.displayName || profile.handle || "User";

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        {profile.photoURL ? (
          <img src={profile.photoURL} alt="" style={styles.avatarImg} />
        ) : (
          <div style={styles.avatarFallback} />
        )}

        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={styles.name}>{displayName}</div>
          <div style={styles.handle}>@{profile.handle}</div>
        </div>

        {/* Right-side actions */}
        {showViewerActions ? (
          <div style={styles.actionRow}>
            {/* Follow button (disabled when blocked either way) */}
            {!blocked ? (
              <button
                onClick={toggleFollow}
                disabled={followBusy || blockedEitherWay}
                style={{
                  ...styles.followBtn,
                  background: isFollowingState ? "#222" : "#1d4ed8",
                  opacity: followBusy || blockedEitherWay ? 0.6 : 1,
                  cursor:
                    followBusy || blockedEitherWay ? "not-allowed" : "pointer",
                }}
                title={blockedEitherWay ? "Unavailable" : ""}
              >
                {isFollowingState ? "Following" : "Follow"}
              </button>
            ) : null}

            {/* Block button */}
            <button
              onClick={toggleBlock}
              disabled={blockBusy}
              style={{
                ...styles.blockBtn,
                background: blocked ? "#7f1d1d" : "#222",
                opacity: blockBusy ? 0.6 : 1,
                cursor: blockBusy ? "not-allowed" : "pointer",
              }}
            >
              {blocked ? "Blocked" : "Block"}
            </button>
          </div>
        ) : null}
      </div>

      {/* Reputation / Activity */}
      <div style={styles.boxRow}>
        <span style={styles.star}>★</span>
        <span style={styles.boxText}>
          {Number(profile.reputation || 0).toLocaleString()}{" "}
          <span style={styles.subtle}>Reputation</span>
        </span>
        <span style={styles.dot}>·</span>
        <span style={styles.boxText}>
          {Number(profile.activity || 0).toLocaleString()}{" "}
          <span style={styles.subtle}>Activity</span>
        </span>
      </div>

      {/* Followers / Following */}
      <div style={styles.followRow}>
        <div>
          <strong>{followersCount.toLocaleString()}</strong> Followers
        </div>
        <div>
          <strong>{followingCount.toLocaleString()}</strong> Following
        </div>
      </div>

      {/* Posts section */}
      {blockedEitherWay ? (
        <div style={{ marginTop: 16 }}>
          <div style={{ opacity: 0.9, fontWeight: 800, fontSize: 18 }}>
            You blocked @{profile.handle}
          </div>
          <div style={{ marginTop: 10, opacity: 0.7 }}>
            Unblock to view their posts.
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 12 }}>
          {postsLoading ? (
            <div style={{ opacity: 0.7 }}>Loading posts…</div>
          ) : (
            <PostGrid
              posts={posts}
              emptyText="No posts yet."
              onSelectPost={(p) => {
                if (p?._docId) navigate(`/p/${p._docId}`);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

/* ----------------------------
   Styles
----------------------------- */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#000",
    color: "#fff",
    padding: 16,
    paddingBottom: 90,
  },
  header: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    marginTop: 12,
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
  name: { fontSize: 22, fontWeight: 800 },
  handle: { opacity: 0.7, marginTop: 4 },

  actionRow: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },

  followBtn: {
    borderRadius: 999,
    border: "none",
    padding: "8px 14px",
    color: "#fff",
    fontWeight: 800,
  },

  blockBtn: {
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.15)",
    padding: "8px 14px",
    color: "#fff",
    fontWeight: 800,
  },

  boxRow: {
    marginTop: 16,
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
    marginTop: 12,
    opacity: 0.85,
  },
};

export default PublicProfilePage;
