import { auth, db, storage } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  deleteUser,
  sendEmailVerification,
} from "firebase/auth";
import {
  doc,
  getDoc,
  deleteDoc,
  collection,
  getDocs,
  writeBatch,
  query,
  where,
} from "firebase/firestore";
import { ref, listAll, deleteObject } from "firebase/storage";
import { normalizeHandle } from "./userService";

const ERROR_MAP = {
  "auth/email-already-in-use":
    "An account with this email already exists. Try signing in.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/weak-password": "Password must be at least 6 characters.",
  "auth/wrong-password": "Incorrect password. Try again or reset it.",
  "auth/user-not-found": "No account found with this email.",
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
  "auth/network-request-failed": "Network error. Check your connection.",
  "auth/popup-closed-by-user": "Sign-in popup was closed. Try again.",
  "auth/cancelled-popup-request": "Only one sign-in popup can be open at a time.",
  "auth/popup-blocked": "Sign-in popup was blocked by the browser.",
};

export function friendlyError(error) {
  return ERROR_MAP[error?.code] || error?.message || "Something went wrong.";
}

export async function signUpWithEmail(email, password) {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function signInWithEmail(email, password) {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

export async function signInWithApple() {
  const provider = new OAuthProvider("apple.com");
  provider.addScope("email");
  provider.addScope("name");
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

/* ─────────────────────────────────────────────
   Settings: re-auth, change email/password, delete account
   ───────────────────────────────────────────── */

export async function reauthenticate(password) {
  const user = auth.currentUser;
  if (!user || !user.email) throw new Error("Not signed in");
  const credential = EmailAuthProvider.credential(user.email, password);
  await reauthenticateWithCredential(user, credential);
}

export async function changeEmail(currentPassword, newEmail) {
  if (!newEmail?.trim()) throw new Error("Email is required");
  await reauthenticate(currentPassword);
  const user = auth.currentUser;
  await updateEmail(user, newEmail.trim());
  await sendEmailVerification(user);
}

export async function changePassword(currentPassword, newPassword) {
  if (!newPassword || newPassword.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
  await reauthenticate(currentPassword);
  await updatePassword(auth.currentUser, newPassword);
}

export async function deleteAccount(currentPassword) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not signed in");

  await reauthenticate(currentPassword);
  const uid = user.uid;

  // Load user doc to get handle
  const userSnap = await getDoc(doc(db, "users", uid));
  const userData = userSnap.exists() ? userSnap.data() : {};
  const handle = userData.handle ? normalizeHandle(userData.handle) : null;

  // Delete subcollections: followers, following, blocks
  for (const sub of ["followers", "following", "blocks"]) {
    const subSnap = await getDocs(collection(db, "users", uid, sub));
    if (!subSnap.empty) {
      const batch = writeBatch(db);
      subSnap.docs.forEach((d) => batch.delete(d.ref));
      await batch.commit();
    }
  }

  // Delete user's posts
  const postsSnap = await getDocs(
    query(collection(db, "posts"), where("authorId", "==", uid))
  );
  if (!postsSnap.empty) {
    const batch = writeBatch(db);
    postsSnap.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();
  }

  // Delete user's routes
  const routesSnap = await getDocs(
    query(collection(db, "routes"), where("userId", "==", uid))
  );
  if (!routesSnap.empty) {
    const batch = writeBatch(db);
    routesSnap.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();
  }

  // Delete handle reservation
  if (handle) {
    try { await deleteDoc(doc(db, "handles", handle)); } catch (_) {}
  }

  // Delete Storage files
  for (const folder of [`posts/${uid}`, `profiles/${uid}`]) {
    try {
      const folderRef = ref(storage, folder);
      const files = await listAll(folderRef);
      await Promise.all(files.items.map((item) => deleteObject(item)));
    } catch (_) {}
  }

  // Delete user document
  await deleteDoc(doc(db, "users", uid));

  // Delete Firebase Auth account (must be last)
  await deleteUser(user);
}

/**
 * Collect all user data for JSON export.
 */
export async function collectUserData(uid) {
  if (!uid) throw new Error("Missing uid");

  const userSnap = await getDoc(doc(db, "users", uid));
  const profile = userSnap.exists() ? userSnap.data() : {};

  const postsSnap = await getDocs(
    query(collection(db, "posts"), where("authorId", "==", uid))
  );
  const posts = postsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

  const routesSnap = await getDocs(
    query(collection(db, "routes"), where("userId", "==", uid))
  );
  const routes = routesSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

  const followingSnap = await getDocs(collection(db, "users", uid, "following"));
  const following = followingSnap.docs.map((d) => d.id);

  const followersSnap = await getDocs(collection(db, "users", uid, "followers"));
  const followers = followersSnap.docs.map((d) => d.id);

  const blocksSnap = await getDocs(collection(db, "users", uid, "blocks"));
  const blocks = blocksSnap.docs.map((d) => ({ blockedUid: d.id, ...d.data() }));

  return { exportDate: new Date().toISOString(), profile, posts, routes, following, followers, blocks };
}
