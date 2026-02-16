import { db } from "../firebaseConfig";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export async function saveTasteProfile(uid, tastePrefs) {
  if (!uid) throw new Error("Missing uid");

  const ref = doc(db, "users", uid);
  await setDoc(
    ref,
    { tastePrefs, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

export async function getTasteProfile(uid) {
  if (!uid) return null;

  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return snap.data().tastePrefs || null;
}

export async function saveFineTunePreferences(uid, prefs) {
  if (!uid) throw new Error("Missing uid");

  const ref = doc(db, "users", uid);
  await setDoc(
    ref,
    { fineTune: prefs, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

export async function completeOnboarding(uid) {
  if (!uid) throw new Error("Missing uid");

  const ref = doc(db, "users", uid);
  await setDoc(
    ref,
    {
      onboardingCompleted: true,
      onboardingCompletedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
