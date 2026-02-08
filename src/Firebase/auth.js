// src/Firebase/auth.js
import { auth, db } from "../firebaseConfig.js";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export function initAuth({ onUser } = {}) {
  const unsub = onAuthStateChanged(auth, async (user) => {
    try {
      if (!user) {
        await signInAnonymously(auth);
        return;
      }

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          isAnonymous: user.isAnonymous,
          createdAt: serverTimestamp(),
          lastSeenAt: serverTimestamp(),
        },
        { merge: true }
      );

      if (typeof onUser === "function") onUser(user);
    } catch (e) {
      console.error("initAuth error:", e);
    }
  });

  return unsub;
}
