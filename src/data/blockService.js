// src/data/blockService.js
import { db } from "../firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  collection,
  getDocs,
} from "firebase/firestore";

/**
 * Schema:
 * users/{viewerUid}/blocks/{blockedUid} { blockedUid, createdAt }
 *
 * With your updated rules:
 * - Owner can read/write their block list
 * - Blocked user can read the single doc that blocks them:
 *   users/{otherUid}/blocks/{viewerUid}
 */

export async function isBlocked(viewerUid, otherUid) {
  if (!viewerUid || !otherUid) return false;

  const ref = doc(db, "users", viewerUid, "blocks", otherUid);
  const snap = await getDoc(ref);
  return snap.exists();
}

/**
 * ✅ Detect "they blocked me"
 * Checks whether otherUid has blocked viewerUid.
 */
export async function isBlockedBy(viewerUid, otherUid) {
  if (!viewerUid || !otherUid) return false;

  const ref = doc(db, "users", otherUid, "blocks", viewerUid);
  const snap = await getDoc(ref);
  return snap.exists();
}

/**
 * Convenience: true if either user has blocked the other.
 */
export async function isMutuallyBlocked(viewerUid, otherUid) {
  if (!viewerUid || !otherUid) return false;
  const [a, b] = await Promise.all([
    isBlocked(viewerUid, otherUid),
    isBlockedBy(viewerUid, otherUid),
  ]);
  return a || b;
}

/**
 * ✅ Load all blocked IDs for a viewer (for feed filtering)
 * Returns a Set<string> of blocked user ids (doc ids).
 */
export async function loadBlockedIds(viewerUid) {
  if (!viewerUid) return new Set();

  const colRef = collection(db, "users", viewerUid, "blocks");
  const snap = await getDocs(colRef);

  const ids = new Set();
  snap.forEach((d) => ids.add(d.id)); // docId == blockedUid
  return ids;
}

export async function blockUser(viewerUid, blockedUid) {
  if (!viewerUid) throw new Error("Missing viewerUid");
  if (!blockedUid) throw new Error("Missing blockedUid");
  if (viewerUid === blockedUid) throw new Error("Cannot block yourself");

  const ref = doc(db, "users", viewerUid, "blocks", blockedUid);

  await setDoc(
    ref,
    {
      blockedUid: String(blockedUid),
      createdAt: serverTimestamp(),
      // optional metadata (not required by rules)
      uid: viewerUid,
    },
    { merge: false }
  );

  return true;
}

export async function unblockUser(viewerUid, blockedUid) {
  if (!viewerUid) throw new Error("Missing viewerUid");
  if (!blockedUid) throw new Error("Missing blockedUid");

  const ref = doc(db, "users", viewerUid, "blocks", blockedUid);
  await deleteDoc(ref);

  return true;
}
