import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getPublicUser, getPublicUserByHandle, normalizeHandle } from "../../data/userService";
import { loadPostsByAuthor } from "../../data/firestoreFeedService";
import { getVisitsCount, getSimilarPlaces } from "../../data/profileService";
import { isFollowing, setFollowing } from "../../data/followService";
import { blockUser, unblockUser, isBlocked, isBlockedBy } from "../../data/blockService";

import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileStats from "../../components/profile/ProfileStats";
import SimilarPlaces from "../../components/profile/SimilarPlaces";
import PostsGrid from "../../components/profile/PostsGrid";
import SavedPlaces from "../../components/profile/SavedPlaces";
import ProfileRoutes from "../../components/profile/ProfileRoutes";
import ReviewsList from "../../components/profile/ReviewsList";

import { useAuth } from "../../hooks/useAuth";

const TABS = ["Posts", "Saved", "Routes", "Reviews"];

export default function ProfilePage() {
  const navigate = useNavigate();
  const params = useParams();
  const { uid: viewerUid, ready, userDoc } = useAuth();

  // Determine if viewing by handle or own profile
  const routeHandle = useMemo(() => {
    if (!params?.handle) return null;
    return normalizeHandle(String(params.handle).replace(/^@/, ""));
  }, [params?.handle]);

  // Profile state
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const isOwnProfile = !routeHandle || (profile && profile.uid === viewerUid);

  // Posts
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);

  // Stats
  const [visits, setVisits] = useState(0);

  // Similar places (other users only)
  const [similarPlaces, setSimilarPlaces] = useState([]);

  // Follow state
  const [isFollowingState, setIsFollowingState] = useState(false);
  const [followBusy, setFollowBusy] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  // Block state
  const [blocked, setBlocked] = useState(false);
  const [blockedByThem, setBlockedByThem] = useState(false);
  const [blockBusy, setBlockBusy] = useState(false);

  const blockedEitherWay = blocked || blockedByThem;
  const showViewerActions = !!viewerUid && !isOwnProfile && !blockedByThem;

  // Tab state
  const [activeTab, setActiveTab] = useState("Posts");

  /* ------- Load profile ------- */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setNotFound(false);
      setProfile(null);

      try {
        let p = null;
        if (routeHandle) {
          p = await getPublicUserByHandle(routeHandle);
        } else if (viewerUid) {
          p = await getPublicUser(viewerUid);
        }

        if (cancelled) return;

        if (!p) {
          setNotFound(true);
        } else {
          setProfile(p);
          setFollowersCount(typeof p.followersCount === "number" ? p.followersCount : 0);
          setFollowingCount(typeof p.followingCount === "number" ? p.followingCount : 0);
        }
      } catch (e) {
        console.error("Failed to load profile:", e);
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [routeHandle, viewerUid]);

  /* ------- Load block state ------- */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!profile?.uid || !viewerUid || viewerUid === profile.uid) {
        if (!cancelled) { setBlocked(false); setBlockedByThem(false); }
        return;
      }

      try {
        const [a, b] = await Promise.all([
          isBlocked(viewerUid, profile.uid),
          isBlockedBy(viewerUid, profile.uid),
        ]);
        if (!cancelled) { setBlocked(!!a); setBlockedByThem(!!b); }
      } catch (e) {
        console.error("Failed to check block state:", e);
      }
    })();

    return () => { cancelled = true; };
  }, [viewerUid, profile?.uid]);

  /* ------- Load follow state ------- */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!profile?.uid || !viewerUid || viewerUid === profile.uid || blockedEitherWay) {
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

    return () => { cancelled = true; };
  }, [profile?.uid, viewerUid, blockedEitherWay]);

  /* ------- Load posts ------- */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!profile?.uid) return;

      if (viewerUid && viewerUid !== profile.uid && blockedEitherWay) {
        if (!cancelled) { setPosts([]); setPostsLoading(false); }
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
        console.error("Failed to load posts:", e);
        if (!cancelled) setPosts([]);
      } finally {
        if (!cancelled) setPostsLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [profile?.uid, viewerUid, blockedEitherWay]);

  /* ------- Load visits count ------- */
  useEffect(() => {
    if (!profile?.uid) return;
    let cancelled = false;

    (async () => {
      const count = await getVisitsCount(profile.uid);
      if (!cancelled) setVisits(count);
    })();

    return () => { cancelled = true; };
  }, [profile?.uid]);

  /* ------- Load similar places (other users only) ------- */
  useEffect(() => {
    if (!profile?.uid || !viewerUid || viewerUid === profile.uid) {
      setSimilarPlaces([]);
      return;
    }
    let cancelled = false;

    (async () => {
      const places = await getSimilarPlaces(viewerUid, profile.uid);
      if (!cancelled) setSimilarPlaces(places);
    })();

    return () => { cancelled = true; };
  }, [profile?.uid, viewerUid]);

  /* ------- Follow toggle ------- */
  const toggleFollow = async () => {
    if (!viewerUid || !profile?.uid || viewerUid === profile.uid || blockedEitherWay) return;

    const next = !isFollowingState;
    setFollowBusy(true);
    setIsFollowingState(next);
    setFollowersCount((c) => Math.max(0, c + (next ? 1 : -1)));

    try {
      await setFollowing(viewerUid, profile.uid, next);
    } catch (e) {
      console.error("Follow toggle failed:", e);
      setIsFollowingState(!next);
      setFollowersCount((c) => Math.max(0, c + (next ? -1 : 1)));
    } finally {
      setFollowBusy(false);
    }
  };

  /* ------- Block toggle ------- */
  const toggleBlock = async () => {
    if (!viewerUid || !profile?.uid || viewerUid === profile.uid) return;

    const next = !blocked;
    setBlockBusy(true);
    setBlocked(next);

    try {
      if (next) {
        await blockUser(viewerUid, profile.uid);
        if (isFollowingState) {
          setIsFollowingState(false);
          setFollowersCount((c) => Math.max(0, c - 1));
          try { await setFollowing(viewerUid, profile.uid, false); } catch {}
        }
      } else {
        await unblockUser(viewerUid, profile.uid);
      }
    } catch (e) {
      console.error("Block toggle failed:", e);
      setBlocked(!next);
    } finally {
      setBlockBusy(false);
    }
  };

  /* ------- Render ------- */
  if (!ready) {
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

  if (loading) {
    return (
      <div style={styles.page}>
        <Header />
        <Sidebar userDoc={userDoc} />
        <div style={styles.content}>
          <div style={styles.loadingText}>Loading profile...</div>
        </div>
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div style={styles.page}>
        <Header />
        <Sidebar userDoc={userDoc} />
        <div style={styles.content}>
          <div style={styles.loadingText}>User not found</div>
        </div>
      </div>
    );
  }

  if (blockedByThem) {
    return (
      <div style={styles.page}>
        <Header />
        <Sidebar userDoc={userDoc} />
        <div style={styles.content}>
          <div style={styles.loadingText}>User not found</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Header />
      <Sidebar userDoc={userDoc} />

      <div style={styles.content}>
        {/* Profile Header */}
        <ProfileHeader profile={profile} isOwnProfile={isOwnProfile} />

        {/* Stats */}
        <ProfileStats
          visits={visits}
          followers={followersCount}
          following={followingCount}
        />

        {/* Action buttons */}
        <div style={styles.actionRow}>
          {isOwnProfile ? (
            <button
              onClick={() => navigate("/profile/edit")}
              style={styles.editBtn}
            >
              Edit Profile
            </button>
          ) : (
            <>
              {showViewerActions && !blocked && (
                <button
                  onClick={toggleFollow}
                  disabled={followBusy || blockedEitherWay}
                  style={{
                    ...styles.followBtn,
                    background: isFollowingState ? "#E0E0E0" : "linear-gradient(135deg, #F26522, #FF8A50)",
                    color: isFollowingState ? "#1A1A1A" : "#fff",
                    opacity: followBusy ? 0.6 : 1,
                  }}
                >
                  {isFollowingState ? "Following" : "Follow"}
                </button>
              )}
              {showViewerActions && (
                <button
                  onClick={toggleBlock}
                  disabled={blockBusy}
                  style={{
                    ...styles.blockBtn,
                    background: blocked ? "#FEE2E2" : "#F5F5F5",
                    color: blocked ? "#DC2626" : "#666",
                    opacity: blockBusy ? 0.6 : 1,
                  }}
                >
                  {blocked ? "Blocked" : "Block"}
                </button>
              )}
            </>
          )}
        </div>

        {/* Similar Places (other users only) */}
        {!isOwnProfile && <SimilarPlaces places={similarPlaces} />}

        {/* Blocked message */}
        {blockedEitherWay && !isOwnProfile ? (
          <div style={styles.blockedMsg}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>
              You blocked @{profile.handle}
            </div>
            <div style={{ marginTop: 6, color: "#999" }}>
              Unblock to view their posts.
            </div>
          </div>
        ) : (
          <>
            {/* Tab bar */}
            <div style={styles.tabBar}>
              {TABS.map((tab) => {
                const active = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      ...styles.tab,
                      color: active ? "#F26522" : "#999",
                      borderBottom: active ? "2px solid #F26522" : "2px solid transparent",
                      fontWeight: active ? 700 : 500,
                    }}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Tab content */}
            <div style={styles.tabContent}>
              {activeTab === "Posts" && (
                <PostsGrid
                  posts={posts}
                  loading={postsLoading}
                  onSelectPost={(p) => {
                    if (p?._docId) navigate(`/p/${p._docId}`);
                  }}
                  emptyText={isOwnProfile ? "You haven't posted yet." : "No posts yet."}
                />
              )}

              {activeTab === "Saved" && (
                <SavedPlaces uid={profile.uid} isOwnProfile={isOwnProfile} />
              )}

              {activeTab === "Routes" && (
                <ProfileRoutes uid={profile.uid} isOwnProfile={isOwnProfile} />
              )}

              {activeTab === "Reviews" && (
                <ReviewsList
                  posts={posts}
                  loading={postsLoading}
                  onSelectPost={(p) => {
                    if (p?._docId) navigate(`/p/${p._docId}`);
                  }}
                />
              )}
            </div>
          </>
        )}
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
  actionRow: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    padding: "14px 24px",
  },
  editBtn: {
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid #E0E0E0",
    background: "#FFFFFF",
    color: "#1A1A1A",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
  },
  followBtn: {
    padding: "10px 28px",
    borderRadius: 10,
    border: "none",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
  },
  blockBtn: {
    padding: "10px 20px",
    borderRadius: 10,
    border: "none",
    fontWeight: 600,
    fontSize: 13,
    cursor: "pointer",
  },
  tabBar: {
    display: "flex",
    justifyContent: "center",
    gap: 32,
    padding: "0 24px",
    borderBottom: "1px solid #E0E0E0",
  },
  tab: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "12px 4px",
    fontSize: 14,
    letterSpacing: 0.3,
    transition: "color 0.2s",
  },
  tabContent: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  blockedMsg: {
    textAlign: "center",
    padding: "32px 24px",
    color: "#1A1A1A",
  },
};
