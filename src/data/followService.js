// src/data/followService.js
import { db } from "../firebaseConfig";
import { doc, getDoc, runTransaction, serverTimestamp } from "firebase/firestore";

/**
 * Schema:
 * users/{viewerUid}/following/{targetUid}  { uid: viewerUid, targetUid, createdAt }
 * users/{targetUid}/followers/{viewerUid}  { uid: viewerUid, targetUid, createdAt }  ✅ matches your “B” schema
 *
 * Optional counters on users docs:
 * users/{viewerUid}.followingCount
 * users/{targetUid}.followersCount
 *
 * Notes:
 * - We DO NOT use increment() because your security rules require these fields to be ints
 *   and check the delta in [-1,0,1]. We compute the next int values in-transaction.
 * - We also (optionally) prevent follow if either side has blocked the other.
 */

function safeInt(v, fallback = 0) {
  return Number.isInteger(v) ? v : fallback;
}

export async function isFollowing(viewerUid, targetUid) {
  if (!viewerUid || !targetUid) return false;

  const ref = doc(db, "users", viewerUid, "following", targetUid);
  const snap = await getDoc(ref);
  return snap.exists();
}

export async function setFollowing(viewerUid, targetUid, shouldFollow) {
  if (!viewerUid) throw new Error("Missing viewerUid");
  if (!targetUid) throw new Error("Missing targetUid");
  if (viewerUid === targetUid) throw new Error("Cannot follow yourself");

  const followingRef = doc(db, "users", viewerUid, "following", targetUid);
  const followerRef = doc(db, "users", targetUid, "followers", viewerUid);

  const viewerUserRef = doc(db, "users", viewerUid);
  const targetUserRef = doc(db, "users", targetUid);

  // Optional: block checks (works with your updated rules)
  const viewerBlocksTargetRef = doc(db, "users", viewerUid, "blocks", targetUid);
  const targetBlocksViewerRef = doc(db, "users", targetUid, "blocks", viewerUid);

  await runTransaction(db, async (tx) => {
    // Read current state
    const [followingSnap, viewerSnap, targetSnap, viewerBlocksSnap, targetBlocksSnap] =
      await Promise.all([
        tx.get(followingRef),
        tx.get(viewerUserRef),
        tx.get(targetUserRef),
        tx.get(viewerBlocksTargetRef),
        tx.get(targetBlocksViewerRef),
      ]);

    // If either side has blocked the other, disallow follow
    if (viewerBlocksSnap.exists()) {
      throw new Error("You have blocked this user.");
    }
    if (targetBlocksSnap.exists()) {
      throw new Error("You are blocked by this user.");
    }

    const alreadyFollowing = followingSnap.exists();

    // Current counters (default to 0 if missing)
    const viewerData = viewerSnap.exists() ? viewerSnap.data() : {};
    const targetData = targetSnap.exists() ? targetSnap.data() : {};

    const currentFollowingCount = safeInt(viewerData.followingCount, 0);
    const currentFollowersCount = safeInt(targetData.followersCount, 0);

    if (shouldFollow) {
      if (alreadyFollowing) return;

      // Create list docs
      tx.set(followingRef, {
        uid: viewerUid,
        targetUid,
        createdAt: serverTimestamp(),
      });

      tx.set(followerRef, {
        uid: viewerUid,
        targetUid,
        createdAt: serverTimestamp(),
      });

      // Counters: explicit ints (+1)
      tx.set(
        viewerUserRef,
        {
          followingCount: currentFollowingCount + 1,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      tx.set(
        targetUserRef,
        {
          followersCount: currentFollowersCount + 1,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } else {
      if (!alreadyFollowing) return;

      // Delete list docs
      tx.delete(followingRef);
      tx.delete(followerRef);

      // Counters: explicit ints (-1), never go below 0
      tx.set(
        viewerUserRef,
        {
          followingCount: Math.max(0, currentFollowingCount - 1),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      tx.set(
        targetUserRef,
        {
          followersCount: Math.max(0, currentFollowersCount - 1),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    }
  });

  return true;
}
