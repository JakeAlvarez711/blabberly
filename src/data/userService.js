// src/data/userService.js
import { db } from "../firebaseConfig";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

/* ----------------------------
   Helpers
----------------------------- */
export const normalizeHandle = (h) => (h || "").trim().toLowerCase();

export const isValidHandle = (h) => {
  if (!h) return false;
  if (h.length < 3 || h.length > 20) return false;
  return /^[a-z0-9_]+$/.test(h);
};

/* ----------------------------
   Ensure user doc on login
   - does NOT overwrite createdAt if it already exists
----------------------------- */
export async function ensureUserDoc(user) {
  if (!user?.uid) return;

  const ref = doc(db, "users", user.uid);

  await setDoc(
    ref,
    {
      uid: user.uid,
      isAnonymous: !!user.isAnonymous,
      providerId: user.providerData?.[0]?.providerId || "anonymous",

      // "createdAt" can be written on first create; merge won't overwrite existing
      createdAt: serverTimestamp(),

      lastSeenAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/* ----------------------------
   Public profile read (by uid)
   - used for comments, feed UI, etc.
----------------------------- */
export async function getPublicUser(uid) {
  if (!uid) return null;

  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;

  const data = snap.data();

  return {
    uid,
    handle: data.handle || null,
    displayName: data.displayName || null,
    photoURL: data.photoURL || null,
    bio: data.bio || null,
    reputation: typeof data.reputation === "number" ? data.reputation : 0,
    activity: typeof data.activity === "number" ? data.activity : 0,
  };
}

/* ----------------------------
   Public profile read (by handle)
   - used for /u/:handle routes
----------------------------- */
export async function getPublicUserByHandle(rawHandle) {
  const handle = normalizeHandle(rawHandle);
  if (!isValidHandle(handle)) return null;

  const handleSnap = await getDoc(doc(db, "handles", handle));
  if (!handleSnap.exists()) return null;

  const { uid } = handleSnap.data() || {};
  if (!uid) return null;

  return await getPublicUser(uid);
}

/* ----------------------------
   Reserve / change unique handle
   handles/{handle} = { uid, handle, createdAt }
   users/{uid}.handle = handle

   - atomic
   - releases old handle if changed
----------------------------- */
export async function setHandle(uid, rawHandle) {
  const handle = normalizeHandle(rawHandle);

  if (!uid) throw new Error("Missing uid");
  if (!isValidHandle(handle)) throw new Error("Invalid handle");

  const userRef = doc(db, "users", uid);
  const handleRef = doc(db, "handles", handle);

  await runTransaction(db, async (tx) => {
    const userSnap = await tx.get(userRef);
    const handleSnap = await tx.get(handleRef);

    const currentHandle = userSnap.exists() ? userSnap.data().handle : null;

    // Already taken by someone else
    if (handleSnap.exists() && handleSnap.data().uid !== uid) {
      throw new Error("Username already taken");
    }

    // Reserve handle (or no-op if it already belongs to uid)
    if (!handleSnap.exists()) {
      tx.set(handleRef, { uid, handle, createdAt: serverTimestamp() });
    }

    // Update user doc with new handle
    tx.set(
      userRef,
      { uid, handle, updatedAt: serverTimestamp() },
      { merge: true }
    );

    // Release old handle if changed
    if (currentHandle && normalizeHandle(currentHandle) !== handle) {
      tx.delete(doc(db, "handles", normalizeHandle(currentHandle)));
    }
  });

  return handle;
}

/* ----------------------------
   Optional: clear handle (release it)
   - useful if you ever add "delete account" or "change handle later" UX
----------------------------- */
export async function clearHandle(uid) {
  if (!uid) throw new Error("Missing uid");

  const userRef = doc(db, "users", uid);

  await runTransaction(db, async (tx) => {
    const userSnap = await tx.get(userRef);
    if (!userSnap.exists()) return;

    const currentHandle = userSnap.data().handle;
    if (currentHandle) {
      tx.delete(doc(db, "handles", normalizeHandle(currentHandle)));
    }

    tx.set(userRef, { handle: null, updatedAt: serverTimestamp() }, { merge: true });
  });
}

/* ----------------------------
   Update profile fields
----------------------------- */
export async function updateProfile(uid, { displayName, bio, photoURL } = {}) {
  if (!uid) throw new Error("Missing uid");

  const ref = doc(db, "users", uid);

  const patch = { updatedAt: serverTimestamp() };

  if (displayName !== undefined) {
    patch.displayName = String(displayName).trim().slice(0, 40);
  }

  if (bio !== undefined) {
    patch.bio = String(bio).trim().slice(0, 160);
  }

  if (photoURL !== undefined) {
    patch.photoURL = photoURL || null;
  }

  await updateDoc(ref, patch);
}

/* ----------------------------
   Reputation / Activity (for your profile mock)
   - call these from places where you want to award points
----------------------------- */
export async function bumpReputation(uid, delta = 0) {
  if (!uid) throw new Error("Missing uid");
  if (!Number.isFinite(delta) || delta === 0) return;

  const userRef = doc(db, "users", uid);

  await runTransaction(db, async (tx) => {
    const snap = await tx.get(userRef);
    const cur = snap.exists() ? snap.data() : {};
    const current = typeof cur.reputation === "number" ? cur.reputation : 0;

    tx.set(
      userRef,
      {
        reputation: Math.max(0, current + delta),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  });
}

export async function bumpActivity(uid, delta = 0) {
  if (!uid) throw new Error("Missing uid");
  if (!Number.isFinite(delta) || delta === 0) return;

  const userRef = doc(db, "users", uid);

  await runTransaction(db, async (tx) => {
    const snap = await tx.get(userRef);
    const cur = snap.exists() ? snap.data() : {};
    const current = typeof cur.activity === "number" ? cur.activity : 0;

    tx.set(
      userRef,
      {
        activity: Math.max(0, current + delta),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  });
}
