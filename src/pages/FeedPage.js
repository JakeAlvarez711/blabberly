// src/pages/FeedPage.js
import { useEffect, useState } from "react";
import { Heart, MessageCircle, Bookmark, ChevronRight, ChevronLeft, BadgeCheck, Star, Users, ExternalLink, Send } from "lucide-react";
import FoodCard from "../components/Feed/FoodCard";
import Header from "../components/Layout/Header";
import Sidebar from "../components/Layout/Sidebar";
import { useAuth } from "../hooks/useAuth";

import {
  loadLocalFeed,
  loadFriendsFeed,
  loadCommentsForPost,
  updateLike,
  addCommentToPost,
} from "../data/firestoreFeedService";

import { getFollowingIds } from "../data/followService";
import { loadBlockedIds } from "../data/blockService";

import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import { getPublicUser } from "../data/userService";

const generateId = () =>
  `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

/* ----------------------------
   Ranking helpers
----------------------------- */
const toMillis = (v) => {
  if (!v) return 0;
  if (typeof v === "number") return v;
  if (typeof v?.toMillis === "function") return v.toMillis();
  return 0;
};

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const scorePost = (p) => {
  const ageMs = Date.now() - toMillis(p?.createdAt);
  const ageHours = ageMs / (1000 * 60 * 60);
  const recency = 1 - clamp(ageHours / 72, 0, 1);

  const likes = typeof p?.likes === "number" ? p.likes : 0;
  const commentsCount =
    typeof p?.commentsCount === "number"
      ? p.commentsCount
      : Array.isArray(p?.comments)
      ? p.comments.length
      : 0;

  const engagement = clamp((likes + commentsCount * 2) / 25, 0, 1);

  const distance = typeof p?.distance === "number" ? p.distance : null;
  const proximity = distance == null ? 0.5 : 1 - clamp(distance / 10, 0, 1);

  return recency * 0.55 + engagement * 0.3 + proximity * 0.15;
};

const rankFeed = (posts, mode = "forYou") => {
  const list = Array.isArray(posts) ? [...posts] : [];

  if (mode === "latest") {
    return list.sort((a, b) => toMillis(b?.createdAt) - toMillis(a?.createdAt));
  }

  return list.sort((a, b) => scorePost(b) - scorePost(a));
};

const isPermissionDenied = (e) => {
  const code = e?.code || e?.message || "";
  return String(code).includes("permission-denied");
};

function FeedPage({ user }) {
  const { userDoc } = useAuth();
  const [uid, setUid] = useState(user?.uid || null);
  const [activeTab, setActiveTab] = useState("local");
  const [localFeed, setLocalFeed] = useState([]);
  const [friendsFeed, setFriendsFeed] = useState([]);
  const [userMap, setUserMap] = useState({});

  // ✅ blocked user ids (Set)
  const [blockedIds, setBlockedIds] = useState(() => new Set());

  /* ----------------------------
     Auth
  ----------------------------- */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUid(u?.uid || null));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (user?.uid) setUid(user.uid);
  }, [user?.uid]);

  /* ----------------------------
     Load blocked users (viewer’s block list)
  ----------------------------- */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!uid) {
        setBlockedIds(new Set());
        return;
      }

      try {
        const ids = await loadBlockedIds(uid); // may return Set or Array
        if (!cancelled) {
          if (ids instanceof Set) setBlockedIds(ids);
          else if (Array.isArray(ids)) setBlockedIds(new Set(ids));
          else setBlockedIds(new Set());
        }
      } catch (e) {
        console.error("Failed to load blocked list:", e);
        if (!cancelled) setBlockedIds(new Set());
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [uid]);

  // Helper: get the setter for the currently active tab's feed
  const feed = activeTab === "local" ? localFeed : friendsFeed;
  const setFeed = activeTab === "local" ? setLocalFeed : setFriendsFeed;

  /* ----------------------------
     User hydration helpers (comment authors)
  ----------------------------- */
  const extractCommentUserIds = (posts) => {
    const ids = new Set();
    (Array.isArray(posts) ? posts : []).forEach((p) => {
      (p?.comments || []).forEach((c) => {
        if (c?.userId) ids.add(c.userId);
      });
    });
    return [...ids];
  };

  const hydrateUsersForFeed = async (posts) => {
    const ids = extractCommentUserIds(posts);
    const missing = ids.filter((id) => !(id in userMap));
    if (missing.length === 0) return;

    try {
      const results = await Promise.all(missing.map((id) => getPublicUser(id)));

      setUserMap((prev) => {
        const next = { ...prev };
        results.forEach((u) => {
          if (u?.uid) next[u.uid] = u;
        });
        return next;
      });
    } catch (e) {
      console.error("Failed to hydrate users:", e);
    }
  };

  /* ----------------------------
     Load LOCAL feed
  ----------------------------- */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const blockedArr = uid ? Array.from(blockedIds) : [];
        const city = userDoc?.homeCity || "";
        if (!city) {
          if (!cancelled) setLocalFeed([]);
          return;
        }
        const posts = await loadLocalFeed({
          uid,
          city,
          blockedIds: blockedArr,
          limitCount: 50,
        });
        if (!cancelled && Array.isArray(posts)) {
          setLocalFeed(posts);
        }
      } catch (e) {
        if (isPermissionDenied(e)) {
          if (!cancelled) setLocalFeed([]);
          return;
        }
        console.error("Failed to load local feed:", e);
      }
    })();

    return () => { cancelled = true; };
  }, [uid, blockedIds, userDoc?.homeCity]);

  /* ----------------------------
     Load FRIENDS feed
  ----------------------------- */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        if (!uid) {
          if (!cancelled) setFriendsFeed([]);
          return;
        }
        const blockedArr = Array.from(blockedIds);
        const followingIds = await getFollowingIds(uid);
        if (!cancelled && followingIds.length === 0) {
          setFriendsFeed([]);
          return;
        }
        const posts = await loadFriendsFeed({
          uid,
          followingIds,
          blockedIds: blockedArr,
          limitCount: 50,
        });
        if (!cancelled && Array.isArray(posts)) {
          setFriendsFeed(posts);
        }
      } catch (e) {
        if (isPermissionDenied(e)) {
          if (!cancelled) setFriendsFeed([]);
          return;
        }
        console.error("Failed to load friends feed:", e);
      }
    })();

    return () => { cancelled = true; };
  }, [uid, blockedIds]);

  /* ----------------------------
     Comments
  ----------------------------- */
  const loadComments = async (postId) => {
    try {
      const comments = await loadCommentsForPost(postId, 50);

      setFeed((prev) =>
        prev.map((p) => (p._docId === postId ? { ...p, comments } : p))
      );

      hydrateUsersForFeed([{ comments }]);
    } catch (e) {
      console.error("Failed to load comments:", e);
    }
  };

  /* ----------------------------
     Likes
     - optimistic UI
     - hard-block rules may deny; revert on permission-denied
  ----------------------------- */
  const toggleLike = async (postId) => {
    if (!uid) return;

    let prior = null;
    let nextLiked = false;

    setFeed((prev) =>
      prev.map((item) => {
        if (item._docId !== postId) return item;

        prior = item;
        nextLiked = !item.liked;
        const baseLikes = typeof item.likes === "number" ? item.likes : 0;

        return {
          ...item,
          liked: nextLiked,
          likes: Math.max(0, baseLikes + (nextLiked ? 1 : -1)),
        };
      })
    );

    try {
      await updateLike(postId, uid, nextLiked);
    } catch (e) {
      console.error("Failed to persist like:", e);

      // revert on denial / failure
      if (prior) {
        setFeed((prev) =>
          prev.map((item) => (item._docId === postId ? prior : item))
        );
      }
    }
  };

  /* ----------------------------
     Add comment
     - optimistic UI
     - hard-block rules may deny; revert on permission-denied
  ----------------------------- */
  const addComment = async (postId, text) => {
    if (!uid) return;

    const trimmed = (text || "").trim();
    if (!trimmed) return;

    const optimisticComment = {
      id: generateId(),
      userId: uid,
      userHandle: "anon",
      text: trimmed,
      createdAt: Date.now(),
    };

    // snapshot prior for revert
    let prior = null;

    setFeed((prev) =>
      prev.map((item) => {
        if (item._docId !== postId) return item;

        prior = item;
        const existing = item.comments || [];
        return {
          ...item,
          comments: [...existing, optimisticComment],
          commentsCount: (item.commentsCount || 0) + 1,
        };
      })
    );

    hydrateUsersForFeed([{ comments: [optimisticComment] }]);

    try {
      await addCommentToPost(postId, optimisticComment);
      await loadComments(postId); // refresh canonical list from Firestore
    } catch (e) {
      console.error("Failed to add comment:", e);

      // revert on denial / failure
      if (prior) {
        setFeed((prev) =>
          prev.map((item) => (item._docId === postId ? prior : item))
        );
      }
    }
  };

  /* ----------------------------
     Filter blocked + rank
  ----------------------------- */
  const ranked = rankFeed(
    feed.filter((p) => !blockedIds.has(p?.authorId)),
    activeTab === "local" ? "forYou" : "latest"
  );

  /* ----------------------------
     Mock cards (shown when Firestore feed is empty)
  ----------------------------- */
  const MOCK_CARDS = [
    {
      id: "mock1",
      username: "@mia.eats",
      place: "The Gilded Fox",
      city: "Chicago, IL",
      tags: "Cozy · Cocktails · Date Night",
      duration: "0:24",
      likes: 342,
      comments: 28,
      bookmarks: 56,
      image: "https://picsum.photos/seed/fox1/400/700",
    },
    {
      id: "mock2",
      username: "@tastewithjon",
      place: "Mama Lu's Dumpling House",
      city: "Los Angeles, CA",
      tags: "Cheap Eats · Street Food · Late Night",
      duration: "0:18",
      likes: 1024,
      comments: 87,
      bookmarks: 203,
      image: "https://picsum.photos/seed/mama2/400/700",
    },
    {
      id: "mock3",
      username: "@brunch.queen",
      place: "Sunny Side Cafe",
      city: "Austin, TX",
      tags: "Brunch · Coffee · Outdoor Patio",
      duration: "0:31",
      likes: 578,
      comments: 45,
      bookmarks: 112,
      image: "https://picsum.photos/seed/sunny3/400/700",
    },
    {
      id: "mock4",
      username: "@nomadfork",
      place: "Sakura Omakase",
      city: "New York, NY",
      tags: "Sushi · Fine Dining · Trendy",
      duration: "0:42",
      likes: 2100,
      comments: 156,
      bookmarks: 430,
      image: "https://picsum.photos/seed/sakura4/400/700",
    },
  ];

  const formatCount = (n) => {
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return String(n);
  };

  const showMock = ranked.length === 0;

  const [detailOpen, setDetailOpen] = useState(false);

  const MOCK_DETAIL = {
    name: "The Gilded Fox",
    verified: true,
    cuisine: "New American · Cocktail Bar",
    price: "$$",
    distance: "0.4 mi",
    open: true,
    rating: 4.6,
    friendAvatars: ["M", "S", "J"],
    friendText: "3 friends have been here",
    saves: 342,
    visits: 1_280,
    whyBullets: [
      "Known for handcrafted cocktails & seasonal plates",
      "Intimate date-night vibe with dim lighting",
      "Featured in Chicago Magazine 'Best New Bars'",
    ],
    comments: [
      { user: "@mia.eats", text: "The old fashioned here is unreal. Get the truffle fries too.", time: "2h" },
      { user: "@tastewithjon", text: "Went on a Tuesday — no wait, perfect energy.", time: "5h" },
      { user: "@brunch.queen", text: "A bit pricey but absolutely worth it for a special night.", time: "1d" },
    ],
  };

  return (
    <div style={styles.page}>
      <Header />
      <Sidebar userDoc={userDoc} />

      {/* ── Feed area (centers the feed between sidebar and right edge / panel) ── */}
      <div style={{
        ...styles.feedArea,
        marginRight: detailOpen ? 320 : 0,
        transition: "margin-right 0.3s ease",
      }}>

      <div style={styles.feedWrap}>
        {/* ── Tab switcher ── */}
        <div style={styles.tabBar}>
          {["local", "friends"].map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  ...styles.tab,
                  color: active ? "#F26522" : "#999",
                  fontWeight: active ? 700 : 500,
                  borderBottom: active ? "2px solid #F26522" : "2px solid transparent",
                }}
              >
                {tab.toUpperCase()}
              </button>
            );
          })}
        </div>
        <main className="feed-snap-scroll" style={styles.feed}>
          {/* FRIENDS empty state */}
          {activeTab === "friends" && ranked.length === 0 && !showMock ? (
            <div style={styles.emptyState}>
              <Users size={40} color="#999" />
              <div style={styles.emptyText}>Follow people to see their posts here</div>
            </div>
          ) : showMock
            ? MOCK_CARDS.map((card) => (
                <div key={card.id} style={styles.snapCard}>
                  <div style={styles.card}>
                    {/* Image */}
                    <img src={card.image} alt="" style={styles.cardImage} />

                    {/* Bottom overlay */}
                    <div style={styles.cardOverlay}>
                      <div style={styles.cardUsername}>{card.username}</div>
                      <div style={styles.cardPlace}>{card.place}</div>
                      <div style={styles.cardCity}>{card.city}</div>
                      <div style={styles.cardTags}>{card.tags}</div>
                    </div>

                    {/* Duration badge */}
                    <div style={styles.durationBadge}>{card.duration}</div>

                    {/* Right action buttons */}
                    <div style={styles.cardActions}>
                      <button style={styles.actionBtn}>
                        <Heart size={24} color="#fff" style={styles.actionIcon} />
                        <span style={styles.actionCount}>
                          {formatCount(card.likes)}
                        </span>
                      </button>
                      <button style={styles.actionBtn}>
                        <MessageCircle size={24} color="#fff" style={styles.actionIcon} />
                        <span style={styles.actionCount}>
                          {formatCount(card.comments)}
                        </span>
                      </button>
                      <button style={styles.actionBtn}>
                        <Bookmark size={24} color="#fff" style={styles.actionIcon} />
                        <span style={styles.actionCount}>
                          {formatCount(card.bookmarks)}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : ranked.map((food) => (
                <div key={food._docId} style={styles.snapCard}>
                  <FoodCard
                    food={food}
                    liked={!!food.liked}
                    likes={food.likes || 0}
                    comments={food.comments || []}
                    userMap={userMap}
                    disabled={blockedIds.has(food?.authorId)}
                    onToggleLike={() => toggleLike(food._docId)}
                    onAddComment={(text) => addComment(food._docId, text)}
                    onOpenComments={() => loadComments(food._docId)}
                  />
                </div>
              ))}
        </main>

        {/* ── Detail toggle button (right edge of feed) ── */}
        <button
          onClick={() => setDetailOpen((o) => !o)}
          style={styles.detailToggle}
          title={detailOpen ? "Close details" : "Open details"}
        >
          {detailOpen ? <ChevronRight size={18} color="#666" /> : <ChevronLeft size={18} color="#666" />}
        </button>
      </div>
      </div>

      {/* ── Right detail panel ── */}
      <aside
        style={{
          ...styles.detailPanel,
          transform: detailOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Place header */}
        <div style={styles.detailHeader}>
          <div style={styles.detailNameRow}>
            <span style={styles.detailName}>{MOCK_DETAIL.name}</span>
            {MOCK_DETAIL.verified && <BadgeCheck size={16} color="#F26522" />}
          </div>
          <div style={styles.detailMeta}>
            {MOCK_DETAIL.price} · {MOCK_DETAIL.cuisine}
          </div>
          <div style={styles.detailMeta}>
            {MOCK_DETAIL.distance} away
            <span style={{
              ...styles.openBadge,
              color: MOCK_DETAIL.open ? "#22C55E" : "#EF4444",
            }}>
              {MOCK_DETAIL.open ? "Open now" : "Closed"}
            </span>
          </div>
        </div>

        {/* Rating + friends */}
        <div style={styles.detailSection}>
          <div style={styles.ratingRow}>
            <Star size={16} color="#F59E0B" fill="#F59E0B" />
            <span style={styles.ratingText}>{MOCK_DETAIL.rating}</span>
          </div>
          <div style={styles.friendRow}>
            <div style={styles.friendAvatars}>
              {MOCK_DETAIL.friendAvatars.map((letter, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.friendAvatar,
                    marginLeft: i > 0 ? -8 : 0,
                    zIndex: 3 - i,
                  }}
                >
                  {letter}
                </div>
              ))}
            </div>
            <span style={styles.friendText}>{MOCK_DETAIL.friendText}</span>
          </div>
        </div>

        {/* Engagement stats */}
        <div style={styles.statsRow}>
          <div style={styles.stat}>
            <Bookmark size={14} color="#999" />
            <span style={styles.statNum}>{formatCount(MOCK_DETAIL.saves)}</span>
            <span style={styles.statLabel}>saves</span>
          </div>
          <div style={styles.stat}>
            <Users size={14} color="#999" />
            <span style={styles.statNum}>{formatCount(MOCK_DETAIL.visits)}</span>
            <span style={styles.statLabel}>visits</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div style={styles.ctaRow}>
          <button style={styles.ctaBtn}>
            <ExternalLink size={14} />
            <span>Book</span>
          </button>
          <button style={{ ...styles.ctaBtn, ...styles.ctaBtnSecondary }}>
            <ExternalLink size={14} />
            <span>Order</span>
          </button>
        </div>

        <div style={styles.detailDivider} />

        {/* Why people come here */}
        <div style={styles.detailSection}>
          <div style={styles.sectionTitle}>Why people come here</div>
          {MOCK_DETAIL.whyBullets.map((b, i) => (
            <div key={i} style={styles.bulletRow}>
              <div style={styles.bulletDot} />
              <span style={styles.bulletText}>{b}</span>
            </div>
          ))}
        </div>

        <div style={styles.detailDivider} />

        {/* Comments */}
        <div style={styles.detailSection}>
          <div style={styles.sectionTitle}>Comments</div>
          {MOCK_DETAIL.comments.map((c, i) => (
            <div key={i} style={styles.commentItem}>
              <div style={styles.commentTop}>
                <span style={styles.commentUser}>{c.user}</span>
                <span style={styles.commentTime}>{c.time}</span>
              </div>
              <div style={styles.commentText}>{c.text}</div>
            </div>
          ))}
        </div>

        {/* Comment input */}
        <div style={styles.commentInputWrap}>
          <input
            type="text"
            placeholder="Add a comment..."
            style={styles.commentInput}
            readOnly
          />
          <button style={styles.commentSendBtn}>
            <Send size={16} color="#F26522" />
          </button>
        </div>
      </aside>

      {/* Global CSS overrides */}
      <style>{`
        aside[style*="detailPanel"] { transition: transform 0.3s ease; }
        .feed-snap-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .feed-snap-scroll::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#FFFFFF",
    color: "#1A1A1A",
  },

  /* ── Feed area (centers feed between sidebar and right edge) ── */
  feedArea: {
    position: "fixed",
    top: 65,
    left: 240,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  /* ── Tab bar ── */
  tabBar: {
    display: "flex",
    justifyContent: "center",
    gap: 32,
    width: "100%",
    flexShrink: 0,
  },
  tab: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "8px 4px 6px",
    fontSize: 13,
    letterSpacing: 1,
    transition: "color 0.2s, border-color 0.2s",
  },

  /* ── Empty state (FRIENDS tab) ── */
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    color: "#999",
    fontWeight: 500,
    textAlign: "center",
  },

  /* ── Feed wrapper (positions feed + toggle together) ── */
  feedWrap: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    /* Full height of the feed area */
    height: "calc(100vh - 65px)",
    /* Width = exactly 9/16 of the card height (card area minus tab bar and padding) */
    width: "calc((100vh - 65px - 36px - 32px) * 9 / 16)",
    maxWidth: 420,
    flexShrink: 0,
  },

  /* ── Feed (snap scroll) ── */
  feed: {
    width: "100%",
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
    scrollSnapType: "y mandatory",
    scrollBehavior: "smooth",
  },

  /* ── Cards ── */
  snapCard: {
    /* Each snap slot fills the feed viewport */
    width: "100%",
    height: "100%",
    scrollSnapAlign: "start",
    flexShrink: 0,
    /* Vertical padding creates gap between card edge and top bar / bottom */
    padding: "16px 0",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    position: "relative",
    /* Card fills the snap slot minus padding, keeps 9:16 via aspect-ratio */
    width: "100%",
    aspectRatio: "9 / 16",
    maxHeight: "100%",
    borderRadius: 16,
    overflow: "hidden",
    background: "#000",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 60,
    padding: "40px 16px 16px",
    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
  },
  cardUsername: {
    fontSize: 15,
    fontWeight: 700,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  cardPlace: {
    fontSize: 16,
    fontWeight: 800,
    color: "#FFFFFF",
    marginBottom: 2,
  },
  cardCity: {
    fontSize: 13,
    fontWeight: 400,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 6,
  },
  cardTags: {
    fontSize: 12,
    fontWeight: 500,
    color: "rgba(255,255,255,0.6)",
  },
  durationBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    background: "rgba(0,0,0,0.5)",
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: 600,
    padding: "3px 8px",
    borderRadius: 6,
  },
  cardActions: {
    position: "absolute",
    right: 12,
    bottom: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  actionBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },
  actionIcon: {
    filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.5))",
  },
  actionCount: {
    fontSize: 12,
    fontWeight: 600,
    color: "#FFFFFF",
    textShadow: "0 1px 3px rgba(0,0,0,0.5)",
  },

  /* ── Detail toggle ── */
  detailToggle: {
    position: "absolute",
    top: "50%",
    right: -20,
    transform: "translateY(-50%)",
    zIndex: 110,
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "1px solid #E0E0E0",
    background: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  /* ── Detail panel ── */
  detailPanel: {
    position: "fixed",
    top: 65,
    right: 0,
    bottom: 0,
    width: 320,
    background: "#FFFFFF",
    borderLeft: "1px solid #EEEEEE",
    zIndex: 95,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s ease",
  },
  detailHeader: {
    padding: "20px 20px 0",
  },
  detailNameRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  detailName: {
    fontSize: 20,
    fontWeight: 800,
    color: "#1A1A1A",
  },
  detailMeta: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  openBadge: {
    fontSize: 12,
    fontWeight: 700,
  },

  /* Rating / friends */
  detailSection: {
    padding: "14px 20px",
  },
  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 15,
    fontWeight: 700,
    color: "#1A1A1A",
  },
  friendRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  friendAvatars: {
    display: "flex",
    alignItems: "center",
  },
  friendAvatar: {
    width: 26,
    height: 26,
    borderRadius: "50%",
    background: "#F26522",
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #FFFFFF",
    position: "relative",
  },
  friendText: {
    fontSize: 12,
    color: "#999",
    fontWeight: 500,
  },

  /* Stats */
  statsRow: {
    display: "flex",
    gap: 24,
    padding: "0 20px 14px",
  },
  stat: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  statNum: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1A1A1A",
  },
  statLabel: {
    fontSize: 12,
    color: "#999",
    fontWeight: 400,
  },

  /* CTA buttons */
  ctaRow: {
    display: "flex",
    gap: 8,
    padding: "0 20px 14px",
  },
  ctaBtn: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: "10px 0",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(135deg, #F26522, #FF8A50)",
    color: "#FFFFFF",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
  },
  ctaBtnSecondary: {
    background: "#F5F5F5",
    color: "#1A1A1A",
  },

  detailDivider: {
    height: 1,
    background: "#F0F0F0",
    margin: "0 20px",
  },

  /* Why bullets */
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1A1A1A",
    marginBottom: 10,
  },
  bulletRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 8,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#F26522",
    flexShrink: 0,
    marginTop: 5,
  },
  bulletText: {
    fontSize: 13,
    color: "#444",
    lineHeight: "1.4",
  },

  /* Comments */
  commentItem: {
    marginBottom: 12,
  },
  commentTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  commentUser: {
    fontSize: 13,
    fontWeight: 700,
    color: "#1A1A1A",
  },
  commentTime: {
    fontSize: 11,
    color: "#999",
  },
  commentText: {
    fontSize: 13,
    color: "#444",
    lineHeight: "1.4",
  },
  commentInputWrap: {
    padding: "12px 20px",
    borderTop: "1px solid #F0F0F0",
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginTop: "auto",
  },
  commentInput: {
    flex: 1,
    border: "none",
    background: "#F5F5F5",
    borderRadius: 999,
    padding: "10px 14px",
    fontSize: 13,
    outline: "none",
    color: "#1A1A1A",
  },
  commentSendBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 4,
    display: "flex",
    alignItems: "center",
  },
};

export default FeedPage;
