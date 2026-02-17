// src/data/firestoreFeedService.js
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  runTransaction,
  increment,
  serverTimestamp,
} from "firebase/firestore";

/* ---------------------------------
   Helpers
---------------------------------- */
const safeNumber = (v, fallback = 0) => (typeof v === "number" ? v : fallback);

const normalizeIdList = (arr) => {
  const list = Array.isArray(arr) ? arr : [];
  return Array.from(new Set(list.filter(Boolean).map(String)));
};

const isPermissionDenied = (e) => {
  const code = e?.code || e?.message || "";
  return String(code).includes("permission-denied");
};

/* ---------------------------------
   Feed: load posts (MVP)
   - loads posts list
   - ✅ supports hard blocks:
       - optional query-level "not-in" when blockedIds.length <= 10
       - always client-filter as backstop
       - safe fallback if query fails
   - attaches liked state for viewer uid (if present)
   - does NOT load comments (use loadCommentsForPost on demand)
---------------------------------- */
export async function loadFeedFromFirestore({
  uid = null,
  limitCount = 50,
  blockedIds = [], // ✅ pass viewer's blocked list here (uids)
} = {}) {
  const blocked = normalizeIdList(blockedIds);

  // Base query constraints
  const base = [orderBy("createdAt", "desc"), limit(limitCount)];

  // Try query-level NOT-IN optimization (only when 1..10 values)
  let snap = null;

  if (blocked.length > 0 && blocked.length <= 10) {
    try {
      const q = query(
        collection(db, "posts"),
        where("authorId", "not-in", blocked),
        ...base
      );
      snap = await getDocs(q);
    } catch (e) {
      console.warn("Feed not-in query failed, falling back to normal feed:", e);
      // fall back below
    }
  }

  // Fallback: normal feed query
  if (!snap) {
    try {
      const q = query(collection(db, "posts"), ...base);
      snap = await getDocs(q);
    } catch (e) {
      // With hard-block rules, a feed read could theoretically permission-deny in some edge cases.
      // Treat as empty (UI should not look broken).
      if (isPermissionDenied(e)) return [];
      throw e;
    }
  }

  // Client-side filter backstop (always)
  const docs = blocked.length
    ? snap.docs.filter((d) => !blocked.includes(d.data()?.authorId))
    : snap.docs;

  const posts = await Promise.all(
    docs.map(async (d) => {
      const data = d.data();
      const postId = d.id;

      let liked = false;
      if (uid) {
        try {
          const likeSnap = await getDoc(doc(db, "posts", postId, "likes", uid));
          liked = likeSnap.exists();
        } catch (e) {
          // If hard-block rules deny reading likes, treat as not liked.
          liked = false;
        }
      }

      return {
        ...data,
        _docId: postId,
        likes: safeNumber(data.likes, 0),
        commentsCount: safeNumber(data.commentsCount, 0),
        saves: safeNumber(data.saves, 0),
        liked,
      };
    })
  );

  return posts;
}

/* ---------------------------------
   Feed: load LOCAL posts (filter by city)
   - loads posts where city matches the user's homeCity
   - same blocked-user filtering and like-check logic as loadFeedFromFirestore
---------------------------------- */
export async function loadLocalFeed({
  uid = null,
  city = null,
  blockedIds = [],
  limitCount = 50,
} = {}) {
  if (!city) return [];

  const blocked = normalizeIdList(blockedIds);

  const constraints = [
    where("city", "==", city),
    orderBy("createdAt", "desc"),
    limit(limitCount),
  ];

  let snap = null;
  try {
    const q = query(collection(db, "posts"), ...constraints);
    snap = await getDocs(q);
  } catch (e) {
    if (isPermissionDenied(e)) return [];
    throw e;
  }

  const docs = blocked.length
    ? snap.docs.filter((d) => !blocked.includes(d.data()?.authorId))
    : snap.docs;

  const posts = await Promise.all(
    docs.map(async (d) => {
      const data = d.data();
      const postId = d.id;

      let liked = false;
      if (uid) {
        try {
          const likeSnap = await getDoc(doc(db, "posts", postId, "likes", uid));
          liked = likeSnap.exists();
        } catch (e) {
          liked = false;
        }
      }

      return {
        ...data,
        _docId: postId,
        likes: safeNumber(data.likes, 0),
        commentsCount: safeNumber(data.commentsCount, 0),
        saves: safeNumber(data.saves, 0),
        liked,
      };
    })
  );

  return posts;
}

/* ---------------------------------
   Feed: load FRIENDS posts (filter by followingIds)
   - loads posts where authorId is in the user's following list
   - Firestore `in` operator limited to 30 values — batches if needed
   - same blocked-user filtering and like-check logic
---------------------------------- */
export async function loadFriendsFeed({
  uid = null,
  followingIds = [],
  blockedIds = [],
  limitCount = 50,
} = {}) {
  if (!followingIds.length) return [];

  const blocked = normalizeIdList(blockedIds);

  // Filter out blocked users from the followingIds before querying
  const filtered = blocked.length
    ? followingIds.filter((id) => !blocked.includes(id))
    : followingIds;

  if (!filtered.length) return [];

  // Firestore `in` supports up to 30 values — batch if needed
  const BATCH_SIZE = 30;
  const batches = [];
  for (let i = 0; i < filtered.length; i += BATCH_SIZE) {
    batches.push(filtered.slice(i, i + BATCH_SIZE));
  }

  let allDocs = [];
  for (const batch of batches) {
    try {
      const q = query(
        collection(db, "posts"),
        where("authorId", "in", batch),
        orderBy("createdAt", "desc"),
        limit(limitCount)
      );
      const snap = await getDocs(q);
      allDocs = allDocs.concat(snap.docs);
    } catch (e) {
      if (isPermissionDenied(e)) continue;
      throw e;
    }
  }

  // Sort all docs by createdAt desc and take limitCount
  allDocs.sort((a, b) => {
    const aTime = a.data()?.createdAt?.toMillis?.() || 0;
    const bTime = b.data()?.createdAt?.toMillis?.() || 0;
    return bTime - aTime;
  });
  allDocs = allDocs.slice(0, limitCount);

  const posts = await Promise.all(
    allDocs.map(async (d) => {
      const data = d.data();
      const postId = d.id;

      let liked = false;
      if (uid) {
        try {
          const likeSnap = await getDoc(doc(db, "posts", postId, "likes", uid));
          liked = likeSnap.exists();
        } catch (e) {
          liked = false;
        }
      }

      return {
        ...data,
        _docId: postId,
        likes: safeNumber(data.likes, 0),
        commentsCount: safeNumber(data.commentsCount, 0),
        saves: safeNumber(data.saves, 0),
        liked,
      };
    })
  );

  return posts;
}

/* ---------------------------------
   Public profile: load posts by author
   - ✅ hard-block safe:
       - if read is denied, return [] (profile UI handles "not found"/blocked states)
---------------------------------- */
export async function loadPostsByAuthor({
  authorId,
  uid = null,
  limitCount = 30,
} = {}) {
  if (!authorId) return [];

  const q = query(
    collection(db, "posts"),
    where("authorId", "==", authorId),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );

  let snap;
  try {
    snap = await getDocs(q);
  } catch (e) {
    if (isPermissionDenied(e)) return [];
    throw e;
  }

  const posts = await Promise.all(
    snap.docs.map(async (d) => {
      const data = d.data();
      const postId = d.id;

      let liked = false;
      if (uid) {
        try {
          const likeSnap = await getDoc(doc(db, "posts", postId, "likes", uid));
          liked = likeSnap.exists();
        } catch (e) {
          liked = false;
        }
      }

      return {
        ...data,
        _docId: postId,
        likes: safeNumber(data.likes, 0),
        commentsCount: safeNumber(data.commentsCount, 0),
        saves: safeNumber(data.saves, 0),
        liked,
      };
    })
  );

  return posts;
}

/* ---------------------------------
   Single post: load by id (for /p/:postId)
   - ✅ hard-block safe: return null on permission denied
---------------------------------- */
export async function loadPostById({ postId, uid = null } = {}) {
  if (!postId) throw new Error("Missing postId");

  let postSnap;
  try {
    postSnap = await getDoc(doc(db, "posts", postId));
  } catch (e) {
    if (isPermissionDenied(e)) return null;
    throw e;
  }

  if (!postSnap.exists()) return null;

  const data = postSnap.data();

  let liked = false;
  if (uid) {
    try {
      const likeSnap = await getDoc(doc(db, "posts", postId, "likes", uid));
      liked = likeSnap.exists();
    } catch (e) {
      liked = false;
    }
  }

  return {
    ...data,
    _docId: postId,
    likes: safeNumber(data.likes, 0),
    commentsCount: safeNumber(data.commentsCount, 0),
    liked,
  };
}

/* ---------------------------------
   Comments: load on demand (open modal)
   - ✅ hard-block safe: return [] on permission denied
---------------------------------- */
export async function loadCommentsForPost(postId, commentsLimit = 50) {
  if (!postId) throw new Error("Missing postId");

  const q = query(
    collection(db, "posts", postId, "comments"),
    orderBy("createdAt", "asc"),
    limit(commentsLimit)
  );

  try {
    const snap = await getDocs(q);
    return snap.docs.map((d) => d.data());
  } catch (e) {
    if (isPermissionDenied(e)) return [];
    throw e;
  }
}

/* ---------------------------------
   Like/unlike using subcollection + counter
   - Like doc: posts/{postId}/likes/{uid}
   - Counter: posts/{postId}.likes
   - Also updates posts/{postId}.updatedAt (matches your rules)
   - ✅ hard-block safe: surface permission denied as a clear error
---------------------------------- */
export async function updateLike(postId, uid, nextLiked) {
  if (!postId) throw new Error("Missing postId");
  if (!uid) throw new Error("Missing uid");

  const postRef = doc(db, "posts", postId);
  const likeRef = doc(db, "posts", postId, "likes", uid);
  const likedPostRef = doc(db, "users", uid, "likedPosts", postId);

  try {
    await runTransaction(db, async (tx) => {
      const likeSnap = await tx.get(likeRef);

      if (nextLiked) {
        if (!likeSnap.exists()) {
          tx.set(likeRef, { uid, createdAt: serverTimestamp() });
          tx.set(likedPostRef, { likedAt: serverTimestamp() });
          tx.update(postRef, {
            likes: increment(1),
            lastEngagementAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
      } else {
        if (likeSnap.exists()) {
          tx.delete(likeRef);
          tx.delete(likedPostRef);
          tx.update(postRef, {
            likes: increment(-1),
            lastEngagementAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
      }
    });
  } catch (e) {
    if (isPermissionDenied(e)) {
      const err = new Error("permission-denied");
      err.code = "permission-denied";
      throw err;
    }
    throw e;
  }
}

/* ---------------------------------
   Add comment doc + counter
   - Comment doc: posts/{postId}/comments/{commentId}
   - Counter: posts/{postId}.commentsCount
   - Also updates posts/{postId}.updatedAt (matches your rules)
   - ✅ hard-block safe: surface permission denied as a clear error
---------------------------------- */
export async function addCommentToPost(postId, comment) {
  if (!postId) throw new Error("Missing postId");

  const postRef = doc(db, "posts", postId);

  const commentId =
    comment?.id || `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  const commentRef = doc(db, "posts", postId, "comments", commentId);

  try {
    await runTransaction(db, async (tx) => {
      tx.set(commentRef, {
        ...comment,
        id: commentId,
        createdAt: serverTimestamp(),
      });

      tx.update(postRef, {
        commentsCount: increment(1),
        lastEngagementAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    });

    return commentId;
  } catch (e) {
    if (isPermissionDenied(e)) {
      const err = new Error("permission-denied");
      err.code = "permission-denied";
      throw err;
    }
    throw e;
  }
}
