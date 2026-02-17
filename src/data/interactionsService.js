// src/data/interactionsService.js
import { db } from "../firebaseConfig";
import {
  doc,
  getDoc,
  runTransaction,
  increment,
  serverTimestamp,
} from "firebase/firestore";

const isPermissionDenied = (e) => {
  const code = e?.code || e?.message || "";
  return String(code).includes("permission-denied");
};

/* ---------------------------------
   Save / Unsave a post
   - posts/{postId}.saves counter
   - posts/{postId}.lastEngagementAt
   - users/{uid}/savedPosts/{postId} tracking doc
---------------------------------- */
export async function toggleSave(postId, uid, nextSaved, postSnapshot = {}) {
  if (!postId) throw new Error("Missing postId");
  if (!uid) throw new Error("Missing uid");

  const postRef = doc(db, "posts", postId);
  const savedRef = doc(db, "users", uid, "savedPosts", postId);

  try {
    await runTransaction(db, async (tx) => {
      const savedSnap = await tx.get(savedRef);

      if (nextSaved) {
        if (!savedSnap.exists()) {
          tx.set(savedRef, {
            savedAt: serverTimestamp(),
            postData: {
              restaurant: postSnapshot.restaurant || null,
              dish: postSnapshot.dish || null,
              videoURL: postSnapshot.videoURL || null,
              authorId: postSnapshot.authorId || null,
            },
          });
          tx.update(postRef, {
            saves: increment(1),
            lastEngagementAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
      } else {
        if (savedSnap.exists()) {
          tx.delete(savedRef);
          tx.update(postRef, {
            saves: increment(-1),
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
   Check if a post is saved
---------------------------------- */
export async function isSaved(postId, uid) {
  if (!postId || !uid) return false;

  try {
    const snap = await getDoc(doc(db, "users", uid, "savedPosts", postId));
    return snap.exists();
  } catch {
    return false;
  }
}

/* ---------------------------------
   Check saved state for multiple posts
   Returns a Set of saved postIds
---------------------------------- */
export async function checkSavedBatch(postIds, uid) {
  if (!uid || !postIds?.length) return new Set();

  const saved = new Set();

  await Promise.all(
    postIds.map(async (postId) => {
      try {
        const snap = await getDoc(doc(db, "users", uid, "savedPosts", postId));
        if (snap.exists()) saved.add(postId);
      } catch {
        // ignore
      }
    })
  );

  return saved;
}
