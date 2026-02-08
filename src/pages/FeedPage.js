// src/pages/FeedPage.js
import { useEffect, useState } from "react";
import FoodCard from "../components/Feed/FoodCard";

import {
  loadFeedFromFirestore,
  loadCommentsForPost,
  updateLike,
  addCommentToPost,
} from "../data/firestoreFeedService";

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
  const [feed, setFeed] = useState([]);
  const [uid, setUid] = useState(user?.uid || null);
  const [feedMode, setFeedMode] = useState("forYou");
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
     Load feed (Firestore)
     - passes blockedIds array so service can do not-in <= 10 optimization
     - still filters client-side as a backstop
  ----------------------------- */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const blockedArr = uid ? Array.from(blockedIds) : [];
        const posts = await loadFeedFromFirestore({
          uid,
          blockedIds: blockedArr,
          limitCount: 50,
        });

        if (!cancelled && Array.isArray(posts)) {
          setFeed(posts);
        }
      } catch (e) {
        if (isPermissionDenied(e)) {
          if (!cancelled) setFeed([]);
          return;
        }
        console.error("Failed to load feed:", e);
      }
    })();

    return () => {
      cancelled = true;
    };
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
    feedMode
  );

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <button
          onClick={() => setFeedMode("forYou")}
          style={{ ...styles.tab, opacity: feedMode === "forYou" ? 1 : 0.6 }}
        >
          For You
        </button>
        <button
          onClick={() => setFeedMode("latest")}
          style={{ ...styles.tab, opacity: feedMode === "latest" ? 1 : 0.6 }}
        >
          Latest
        </button>
      </div>

      {ranked.map((food) => (
  <FoodCard
    key={food._docId}
    food={food}
    liked={!!food.liked}
    likes={food.likes || 0}
    comments={food.comments || []}
    userMap={userMap}
    disabled={blockedIds.has(food?.authorId)}   // ✅ THIS IS THE MISSING LINK
    onToggleLike={() => toggleLike(food._docId)}
    onAddComment={(text) => addComment(food._docId, text)}
    onOpenComments={() => loadComments(food._docId)}
  />
))}
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    overflowY: "scroll",
    scrollSnapType: "y mandatory",
    WebkitOverflowScrolling: "touch",
    position: "relative",
  },
  topBar: {
    position: "fixed",
    top: 12,
    right: 12,
    zIndex: 9999,
    display: "flex",
    gap: 8,
  },
  tab: {
    padding: "8px 12px",
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    opacity: 0.85,
  },
};

export default FeedPage;
